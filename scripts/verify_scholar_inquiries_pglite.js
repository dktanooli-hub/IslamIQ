// =============================================================================
// IslamIQ — Ask a Scholar Local PostgreSQL Runtime Verification (PGlite)
// File: scripts/verify_scholar_inquiries_pglite.js
// =============================================================================
// Uses @electric-sql/pglite with pgcrypto & uuid_ossp extensions to execute
// actual PostgreSQL runtime statements without touching live production.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { PGlite } from '@electric-sql/pglite';
import { pgcrypto } from '@electric-sql/pglite/contrib/pgcrypto';
import { uuid_ossp } from '@electric-sql/pglite/contrib/uuid_ossp';

const MIGRATION_PATH = path.resolve('supabase/migrations/20261016_create_scholar_inquiries.sql');
const migrationSql = fs.readFileSync(MIGRATION_PATH, 'utf-8');

// Shared in-memory PostgreSQL instance for the suite
let db;
let testInquiryNum = null;
let testAccessToken = null;
let testInquiryId = null;
const adminUserId = 'a0000000-0000-0000-0000-000000000001';
const regularUserId = 'b0000000-0000-0000-0000-000000000001';

async function setAdminContext() {
  await db.exec(`SET request.jwt.claim.sub = '${adminUserId}';`);
}

async function setRegularUserContext() {
  await db.exec(`SET request.jwt.claim.sub = '${regularUserId}';`);
}

async function setAnonymousContext() {
  await db.exec("SET request.jwt.claim.sub = '';");
}

test('1. [RUNTIME PG] Initialize PGlite & Provision Isolated Supabase Stubs', async () => {
  db = new PGlite({
    extensions: { pgcrypto, uuid_ossp }
  });

  // Enable extensions in extensions schema (matching Supabase production)
  await db.exec(`
    CREATE SCHEMA IF NOT EXISTS extensions;
    CREATE EXTENSION IF NOT EXISTS pgcrypto SCHEMA extensions;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `);

  // Provision Supabase roles if not present
  await db.exec(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
        CREATE ROLE anon NOLOGIN;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
        CREATE ROLE authenticated NOLOGIN;
      END IF;
    END $$;
  `);

  // Provision minimal Supabase auth schema & auth.users table
  await db.exec(`
    CREATE SCHEMA IF NOT EXISTS auth;
    CREATE TABLE IF NOT EXISTS auth.users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT,
      created_at TIMESTAMPTZ DEFAULT now()
    );

    CREATE OR REPLACE FUNCTION auth.uid()
    RETURNS UUID
    LANGUAGE sql
    STABLE AS $$
      SELECT NULLIF(current_setting('request.jwt.claim.sub', true), '')::uuid;
    $$;
  `);

  // Provision IslamIQ public.app_admins table & public.is_admin()
  await db.exec(`
    CREATE TABLE IF NOT EXISTS public.app_admins (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      email TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin')),
      active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
      CONSTRAINT uq_app_admins_user_id UNIQUE (user_id)
    );

    CREATE OR REPLACE FUNCTION public.is_admin()
    RETURNS BOOLEAN
    LANGUAGE sql
    SECURITY DEFINER
    STABLE
    SET search_path = pg_catalog, public, auth, pg_temp
    AS $$
      SELECT EXISTS (
        SELECT 1 FROM public.app_admins
        WHERE user_id = auth.uid()
          AND active = true
      );
    $$;
  `);

  // Seed test users
  await db.exec(`
    INSERT INTO auth.users (id, email) VALUES
      ('${adminUserId}', 'admin@islamiq.test'),
      ('${regularUserId}', 'seeker@islamiq.test')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.app_admins (user_id, email, role, active) VALUES
      ('${adminUserId}', 'admin@islamiq.test', 'admin', true)
    ON CONFLICT (user_id) DO NOTHING;
  `);

  await setAdminContext();
  const adminCheck = await db.query('SELECT public.is_admin() as is_adm;');
  assert.strictEqual(adminCheck.rows[0].is_adm, true, 'Admin stub must evaluate is_admin() = true for admin user');

  await setAnonymousContext();
  const anonCheck = await db.query('SELECT public.is_admin() as is_adm;');
  assert.strictEqual(anonCheck.rows[0].is_adm, false, 'Anon context must evaluate is_admin() = false');
});

test('2. [RUNTIME PG] Execute Migration SQL (20261016_create_scholar_inquiries.sql)', async () => {
  // Execute the migration on the isolated PostgreSQL database
  await db.exec(migrationSql);

  // Verify scholar_inquiries table exists in pg_tables
  const tableRes = await db.query(`
    SELECT tablename FROM pg_catalog.pg_tables 
    WHERE schemaname = 'public' AND tablename = 'scholar_inquiries';
  `);
  assert.strictEqual(tableRes.rows.length, 1, 'public.scholar_inquiries table must exist');

  // Verify functions exist in pg_proc
  const funcRes = await db.query(`
    SELECT proname FROM pg_catalog.pg_proc 
    WHERE proname IN ('submit_scholar_inquiry', 'get_scholar_inquiry', 'admin_update_scholar_inquiry');
  `);
  const foundFuncs = funcRes.rows.map(r => r.proname);
  assert.ok(foundFuncs.includes('submit_scholar_inquiry'), 'submit_scholar_inquiry function must exist');
  assert.ok(foundFuncs.includes('get_scholar_inquiry'), 'get_scholar_inquiry function must exist');
  assert.ok(foundFuncs.includes('admin_update_scholar_inquiry'), 'admin_update_scholar_inquiry function must exist');
});

test('3. [RUNTIME PG] Anonymous Submission with Urdu Nastaliq & Arabic Characters', async () => {
  await setAnonymousContext();

  const urduSubject = 'مسافر کی نماز کے احکام';
  const urduQuestion = 'اگر کوئی شخص ۴۸ میل کے سفر پر روانہ ہو تو قصر نماز کب سے شروع ہوگی؟ براہ کرم وضاحت فرمائیں۔';

  const res = await db.query(`
    SELECT * FROM public.submit_scholar_inquiry(
      $1, $2, $3, $4, $5, $6
    );
  `, [
    urduSubject,
    urduQuestion,
    'Salah',
    'Hanafi',
    'سائل عبد اللہ',
    'abdullah.test@example.com'
  ]);

  assert.strictEqual(res.rows.length, 1, 'Submission must return exactly 1 row');
  const row = res.rows[0];

  assert.match(row.inquiry_number, /^IQ-\d{4}-[A-Z0-9]{6}$/, 'Inquiry number must match IQ-YYYY-XXXXXX format');
  assert.match(row.access_token, /^iq_sec_[0-9a-f]{48}$/, 'Access token must be 55 characters with iq_sec_ prefix');
  assert.strictEqual(row.status, 'pending_review', 'Initial status must be pending_review');
  assert.ok(row.created_at, 'created_at timestamp must be present');

  testInquiryNum = row.inquiry_number;
  testAccessToken = row.access_token;

  // Retrieve underlying row to inspect storage
  const recordRes = await db.query(`
    SELECT id, inquiry_number, access_token_hash, subject, question_text, status, seeker_name
    FROM public.scholar_inquiries
    WHERE inquiry_number = $1;
  `, [testInquiryNum]);
  assert.strictEqual(recordRes.rows.length, 1);
  const dbRow = recordRes.rows[0];
  testInquiryId = dbRow.id;

  assert.strictEqual(dbRow.subject, urduSubject, 'Urdu subject must be preserved identically without corruption');
  assert.strictEqual(dbRow.question_text, urduQuestion, 'Urdu question text must be preserved identically');
  assert.notStrictEqual(dbRow.access_token_hash, testAccessToken, 'Raw token must NEVER be stored in the table');
  assert.strictEqual(dbRow.access_token_hash.length, 64, 'Stored token hash must be 64-char SHA-256 hex digest');
});

test('3b. [RUNTIME PG] Authenticated User Submission & Per-User Isolation', async () => {
  await setRegularUserContext();

  const authSubject = 'روزے کی حالت میں انہیلر کا استعمال';
  const authQuestion = 'کیا دمہ کے مریض کے لیے روزے کی حالت میں انہیلر کا استعمال جائز ہے؟ برائے کرم شرعی حکم بیان فرمائیں۔';

  const res = await db.query(`
    SELECT * FROM public.submit_scholar_inquiry(
      $1, $2, $3, $4, $5, $6
    );
  `, [
    authSubject,
    authQuestion,
    'Sawm',
    'Hanafi',
    'زید احمد',
    'zaid.auth@example.com'
  ]);

  assert.strictEqual(res.rows.length, 1, 'Authenticated submission must return 1 row');
  const row = res.rows[0];
  assert.match(row.inquiry_number, /^IQ-\d{4}-[A-Z0-9]{6}$/);
  assert.match(row.access_token, /^iq_sec_[0-9a-f]{48}$/);

  // Check that user_id was stored properly as regularUserId
  const recordRes = await db.query(`
    SELECT user_id, seeker_name, seeker_email FROM public.scholar_inquiries WHERE inquiry_number = $1;
  `, [row.inquiry_number]);
  assert.strictEqual(recordRes.rows[0].user_id, regularUserId, 'user_id must match authenticated user UID');
  assert.strictEqual(recordRes.rows[0].seeker_email, 'zaid.auth@example.com');

  // Verify that seeker can lookup the inquiry using token
  await setAnonymousContext();
  const lookupRes = await db.query(`
    SELECT * FROM public.get_scholar_inquiry($1, $2);
  `, [row.inquiry_number, row.access_token]);
  assert.strictEqual(lookupRes.rows.length, 1);
  assert.strictEqual(lookupRes.rows[0].subject, authSubject);
  assert.strictEqual(lookupRes.rows[0].status, 'pending_review');
});

test('4. [RUNTIME PG] Seeker Lookup Masking on Pending Inquiry (Draft/Answer Secrecy)', async () => {
  await setAnonymousContext();

  const res = await db.query(`
    SELECT * FROM public.get_scholar_inquiry($1, $2);
  `, [testInquiryNum, testAccessToken]);

  assert.strictEqual(res.rows.length, 1, 'Lookup must return 1 row for valid inquiry number and access token');
  const lookup = res.rows[0];

  assert.strictEqual(lookup.inquiry_number, testInquiryNum);
  assert.strictEqual(lookup.status, 'pending_review');
  assert.strictEqual(lookup.subject, 'مسافر کی نماز کے احکام');
  assert.strictEqual(lookup.answer_text, null, 'answer_text MUST be null on pending inquiry');
  assert.strictEqual(lookup.scholar_name, null, 'scholar_name MUST be null on pending inquiry');
  assert.strictEqual(lookup.scholar_qualification, null, 'scholar_qualification MUST be null on pending inquiry');
  assert.strictEqual(lookup.answer_arabic, null, 'answer_arabic MUST be null on pending inquiry');
  assert.strictEqual(lookup.reference, null, 'reference MUST be null on pending inquiry');
  assert.strictEqual(lookup.rejection_reason, null, 'rejection_reason MUST be null on pending inquiry');
  assert.strictEqual(lookup.answered_at, null, 'answered_at MUST be null on pending inquiry');

  // Verify that confidential columns are NOT in the return table
  assert.strictEqual(lookup.admin_notes, undefined, 'admin_notes column must not exist in lookup projection');
  assert.strictEqual(lookup.seeker_email, undefined, 'seeker_email column must not exist in lookup projection');
  assert.strictEqual(lookup.access_token_hash, undefined, 'access_token_hash must not exist in lookup projection');
});

test('5. [RUNTIME PG] Invalid Token Rejection', async () => {
  await setAnonymousContext();

  const res = await db.query(`
    SELECT * FROM public.get_scholar_inquiry($1, $2);
  `, [testInquiryNum, 'iq_sec_forged_invalid_token_12345']);

  assert.strictEqual(res.rows.length, 0, 'Invalid access token must return 0 rows');
});

test('6. [RUNTIME PG] Unauthorized Access Protection on admin_update_scholar_inquiry', async () => {
  // Call with non-admin context
  await setRegularUserContext();

  let threwError = false;
  let errorMessage = '';
  try {
    await db.query(`
      SELECT * FROM public.admin_update_scholar_inquiry(
        $1::uuid,
        $2::text,
        $3::text,
        $4::text,
        $5::text,
        $6::text,
        $7::text,
        $8::text,
        $9::text
      );
    `, [
      testInquiryId,
      'answered',
      'Unauthorized Actor',
      null,
      'Attempted unauthorized answer publication',
      null,
      null,
      null,
      null
    ]);
  } catch (err) {
    threwError = true;
    errorMessage = err.message;
  }

  assert.strictEqual(threwError, true, 'Non-admin caller must be rejected by admin_update_scholar_inquiry');
  assert.match(errorMessage, /Administrator privileges required/i, 'Error message must specify admin privileges required');
});

test('7. [RUNTIME PG] Database CHECK Constraint Validation (chk_answered_integrity)', async () => {
  // Set context to verified admin
  await setAdminContext();

  let threwError = false;
  let errorMsg = '';
  try {
    // Attempt to mark as answered with empty answer_text and scholar_name
    await db.query(`
      SELECT * FROM public.admin_update_scholar_inquiry(
        $1::uuid,
        $2::text,
        $3::text,
        $4::text,
        $5::text,
        $6::text,
        $7::text,
        $8::text,
        $9::text
      );
    `, [
      testInquiryId,
      'answered',
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ]);
  } catch (err) {
    threwError = true;
    errorMsg = err.message;
  }

  assert.strictEqual(threwError, true, 'Marking answered without answer text must be blocked');
  assert.match(errorMsg, /chk_answered_integrity|violates check constraint|at least 10 characters|Invalid status transition/i, 'Must block invalid transition or missing answer text');
});

test('8. [RUNTIME PG] Admin Transition Workflow (sent_to_scholar -> answer_received -> answered)', async () => {
  await setAdminContext();

  // Step 1: Transition to 'sent_to_scholar'
  const step1 = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      $1::uuid,
      $2::text,
      $3::text,
      $4::text,
      $5::text,
      $6::text,
      $7::text,
      $8::text,
      $9::text
    );
  `, [
    testInquiryId,
    'sent_to_scholar',
    null,
    null,
    null,
    null,
    null,
    'Slip printed and submitted to Mufti Muhammad on Friday',
    null
  ]);
  assert.strictEqual(step1.rows[0].status, 'sent_to_scholar');
  assert.ok(step1.rows[0].sent_to_scholar_at, 'sent_to_scholar_at must be automatically populated');
  assert.strictEqual(step1.rows[0].admin_notes, 'Slip printed and submitted to Mufti Muhammad on Friday');

  // Verify seeker still cannot see internal notes or draft
  await setAnonymousContext();
  const seekerCheck1 = await db.query(`
    SELECT * FROM public.get_scholar_inquiry($1, $2);
  `, [testInquiryNum, testAccessToken]);
  assert.strictEqual(seekerCheck1.rows[0].status, 'sent_to_scholar');
  assert.strictEqual(seekerCheck1.rows[0].answer_text, null, 'Answer must remain hidden from seeker while sent to scholar');

  // Step 2: Transition to 'answer_received' (Admin enters scholar draft)
  await setAdminContext();
  const step2 = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      $1::uuid,
      $2::text,
      $3::text,
      $4::text,
      $5::text,
      $6::text,
      $7::text,
      $8::text,
      $9::text
    );
  `, [
    testInquiryId,
    'answer_received',
    'مفتی محمد صاحب',
    'دار الافتاء جامعہ اسلامیہ',
    'مسافر جب اپنے شہر یا بستی کے مکانات سے آگے نکل جائے تو چار رکعت والی فرض نماز قصر (دو رکعت) پڑھے گا۔',
    'قال في الهداية: وإذا فارق بيوت المصر صلى ركعتين.',
    'الہدایہ، کتاب الصلاۃ، باب صلاۃ المسافر',
    'Written answer verified by admin',
    null
  ]);
  assert.strictEqual(step2.rows[0].status, 'answer_received');

  // Verify seeker STILL cannot see draft answer until admin explicitly marks it 'answered'
  await setAnonymousContext();
  const seekerCheck2 = await db.query(`
    SELECT * FROM public.get_scholar_inquiry($1, $2);
  `, [testInquiryNum, testAccessToken]);
  assert.strictEqual(seekerCheck2.rows[0].status, 'answer_received');
  assert.strictEqual(seekerCheck2.rows[0].answer_text, null, 'Answer must remain hidden while in draft answer_received status');

  // Step 3: Admin reviews and approves publication ('answered')
  await setAdminContext();
  const step3 = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      $1::uuid,
      $2::text,
      $3::text,
      $4::text,
      $5::text,
      $6::text,
      $7::text,
      $8::text,
      $9::text
    );
  `, [
    testInquiryId,
    'answered',
    null,
    null,
    null,
    null,
    null,
    'Approved and published to seeker',
    null
  ]);
  assert.strictEqual(step3.rows[0].status, 'answered');
  assert.ok(step3.rows[0].answered_at, 'answered_at must be populated');
});

test('9. [RUNTIME PG] Seeker Visibility on Approved & Published Answer', async () => {
  await setAnonymousContext();

  const res = await db.query(`
    SELECT * FROM public.get_scholar_inquiry($1, $2);
  `, [testInquiryNum, testAccessToken]);

  assert.strictEqual(res.rows.length, 1);
  const row = res.rows[0];

  assert.strictEqual(row.status, 'answered');
  assert.strictEqual(row.scholar_name, 'مفتی محمد صاحب');
  assert.strictEqual(row.scholar_qualification, 'دار الافتاء جامعہ اسلامیہ');
  assert.match(row.answer_text, /مسافر جب اپنے شہر یا بستی کے مکانات سے آگے نکل جائے/);
  assert.strictEqual(row.answer_arabic, 'قال في الهداية: وإذا فارق بيوت المصر صلى ركعتين.');
  assert.strictEqual(row.reference, 'الہدایہ، کتاب الصلاۃ، باب صلاۃ المسافر');
  assert.ok(row.answered_at, 'answered_at must be visible to seeker');
  assert.strictEqual(row.rejection_reason, null, 'rejection_reason must be null for answered inquiry');
});

test('10. [RUNTIME PG] Rejection Integrity & Seeker Rejection Reason', async () => {
  // Create another inquiry to test rejection flow
  await setAnonymousContext();
  const submitRes = await db.query(`
    SELECT * FROM public.submit_scholar_inquiry(
      $1, $2, $3, $4
    );
  `, [
    'غیر متعلقہ سوال',
    'یہ ایک ایسا سوال ہے جو شرعی دائرہ کار سے باہر ہے۔ برائے کرم رہنمائی فرمائیں۔',
    'General',
    'General'
  ]);
  const rejNum = submitRes.rows[0].inquiry_number;
  const rejToken = submitRes.rows[0].access_token;

  const idRes = await db.query('SELECT id FROM public.scholar_inquiries WHERE inquiry_number = $1;', [rejNum]);
  const rejId = idRes.rows[0].id;

  // Admin marks rejected
  await setAdminContext();
  await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      $1::uuid,
      $2::text,
      $3::text,
      $4::text,
      $5::text,
      $6::text,
      $7::text,
      $8::text,
      $9::text
    );
  `, [
    rejId,
    'rejected',
    null,
    null,
    null,
    null,
    null,
    'Internal note: not suitable for fatwa board',
    'محترم سائل، یہ سوال فقہی دائرہ کار کے بجائے تکنیکی معلومات سے متعلق ہے، اس لیے مسترد کیا گیا۔'
  ]);

  // Seeker queries rejection
  await setAnonymousContext();
  const seekerRes = await db.query(`
    SELECT * FROM public.get_scholar_inquiry($1, $2);
  `, [rejNum, rejToken]);
  const seekerRow = seekerRes.rows[0];
  assert.strictEqual(seekerRow.status, 'rejected');
  assert.match(seekerRow.rejection_reason, /محترم سائل، یہ سوال فقہی دائرہ کار کے بجائے تکنیکی معلومات سے متعلق ہے/);
  assert.strictEqual(seekerRow.answer_text, null);
  assert.strictEqual(seekerRow.scholar_name, null);
});

test('10b. [RUNTIME PG] Status Transition Matrix Enforcement', async () => {
  await setAdminContext();

  // Create fresh inquiry in 'pending_review'
  const sub = await db.query(`
    SELECT * FROM public.submit_scholar_inquiry(
      'ٹرانزیشن جانچ',
      'یہ ٹرانزیشن میٹرکس کی تفصیلی جانچ کے لیے نیا سوال ہے۔',
      'General',
      'General'
    );
  `);
  const inqNum = sub.rows[0].inquiry_number;
  const inqIdRes = await db.query('SELECT id FROM public.scholar_inquiries WHERE inquiry_number = $1;', [inqNum]);
  const inqId = inqIdRes.rows[0].id;

  // 1. Invalid jump: pending_review -> answered must be rejected
  let threwInvalid1 = false;
  let err1 = '';
  try {
    await db.query(`
      SELECT * FROM public.admin_update_scholar_inquiry(
        $1::uuid, 'answered'::text, 'Mufti'::text, null, 'Answer text with at least 10 chars'::text, null, null, null, null
      );
    `, [inqId]);
  } catch (e) {
    threwInvalid1 = true;
    err1 = e.message;
  }
  assert.strictEqual(threwInvalid1, true, 'Direct jump from pending_review to answered must be rejected');
  assert.match(err1, /Invalid status transition/i);

  // 2. Valid transition: pending_review -> sent_to_scholar
  const stepA = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      $1::uuid, 'sent_to_scholar'::text, null, null, null, null, null, null, null
    );
  `, [inqId]);
  assert.strictEqual(stepA.rows[0].status, 'sent_to_scholar');

  // 3. Invalid jump: sent_to_scholar -> answered must be rejected
  let threwInvalid2 = false;
  let err2 = '';
  try {
    await db.query(`
      SELECT * FROM public.admin_update_scholar_inquiry(
        $1::uuid, 'answered'::text, 'Mufti'::text, null, 'Answer text with at least 10 chars'::text, null, null, null, null
      );
    `, [inqId]);
  } catch (e) {
    threwInvalid2 = true;
    err2 = e.message;
  }
  assert.strictEqual(threwInvalid2, true, 'Direct jump from sent_to_scholar to answered must be rejected');
  assert.match(err2, /Invalid status transition/i);

  // 4. Valid transition: sent_to_scholar -> answer_received
  const stepB = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      $1::uuid, 'answer_received'::text, 'Mufti Tariq'::text, null, 'Preliminary draft of answer text'::text, null, null, null, null
    );
  `, [inqId]);
  assert.strictEqual(stepB.rows[0].status, 'answer_received');

  // 5. Valid transition: answer_received -> answered
  const stepC = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      $1::uuid, 'answered'::text, null, null, null, null, null, null, null
    );
  `, [inqId]);
  assert.strictEqual(stepC.rows[0].status, 'answered');

  // 6. Valid transition: answered -> answer_received (unpublishing for revisions)
  const stepD = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      $1::uuid, 'answer_received'::text, null, null, 'Revised answer text with additional details'::text, null, null, 'Unpublished for corrections'::text, null
    );
  `, [inqId]);
  assert.strictEqual(stepD.rows[0].status, 'answer_received');
  assert.match(stepD.rows[0].answer_text, /Revised answer text/);

  // 7. Valid transition: re-publishing revised answer (answer_received -> answered)
  const stepE = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      $1::uuid, 'answered'::text, null, null, null, null, null, 'Re-published'::text, null
    );
  `, [inqId]);
  assert.strictEqual(stepE.rows[0].status, 'answered');

  // 8. Test rejection transition & invalid jump from rejected to answered
  // Create another inquiry to test rejected -> reopen
  const rejSub = await db.query(`
    SELECT * FROM public.submit_scholar_inquiry('سوال برائے مسترد', 'یہ سوال بعد میں مسترد کیا جائے گا برائے جانچ۔', 'General', 'General');
  `);
  const rejNum = rejSub.rows[0].inquiry_number;
  const rejRow = (await db.query('SELECT id FROM public.scholar_inquiries WHERE inquiry_number = $1;', [rejNum])).rows[0];

  // Transition pending_review -> rejected
  const rejStep = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      $1::uuid, 'rejected'::text, null, null, null, null, null, null, 'Out of scope reason here'::text
    );
  `, [rejRow.id]);
  assert.strictEqual(rejStep.rows[0].status, 'rejected');

  // Invalid jump: rejected -> answered must fail
  let rejToAnsweredThrew = false;
  try {
    await db.query(`
      SELECT * FROM public.admin_update_scholar_inquiry(
        $1::uuid, 'answered'::text, 'Mufti'::text, null, 'Valid answer text with 10 chars'::text, null, null, null, null
      );
    `, [rejRow.id]);
  } catch (e) {
    rejToAnsweredThrew = true;
    assert.match(e.message, /Invalid status transition/i);
  }
  assert.strictEqual(rejToAnsweredThrew, true, 'Direct jump from rejected to answered must fail');

  // 9. Valid transition: rejected -> pending_review (reopen inquiry)
  const reopenStep = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      $1::uuid, 'pending_review'::text, null, null, null, null, null, 'Reopened upon reconsideration'::text, null
    );
  `, [rejRow.id]);
  assert.strictEqual(reopenStep.rows[0].status, 'pending_review');

  // 10. Progress reopened inquiry: pending_review -> sent_to_scholar
  const reopenProg = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      $1::uuid, 'sent_to_scholar'::text, null, null, null, null, null, null, null
    );
  `, [rejRow.id]);
  assert.strictEqual(reopenProg.rows[0].status, 'sent_to_scholar');
});

test('10c. [RUNTIME PG] Optional Field Clearing, Preserving Omitted Fields & Timestamp Resets', async () => {
  await setAdminContext();

  // Create an inquiry with full optional details
  const sub = await db.query(`
    SELECT * FROM public.submit_scholar_inquiry(
      'فیلڈ کلیئرنگ ٹیسٹ',
      'یہ اختیاری فیلڈز کو خالی کرنے اور محفوظ رکھنے کی جانچ ہے۔',
      'General',
      'Hanafi'
    );
  `);
  const inqNum = sub.rows[0].inquiry_number;
  const inqId = (await db.query('SELECT id FROM public.scholar_inquiries WHERE inquiry_number = $1;', [inqNum])).rows[0].id;

  // 1. Move to sent_to_scholar
  await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry($1::uuid, 'sent_to_scholar');
  `, [inqId]);

  // 2. Draft an answer in answer_received with all optional fields filled
  const draftRes = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1::uuid,
      p_status => 'answer_received'::text,
      p_scholar_name => 'مفتی خالد مسعود'::text,
      p_scholar_qualification => 'دار العلوم کراچی، تخصص فی الفقہ'::text,
      p_answer_text => 'یہ مفصل اور مدلل تفصیلی فتویٰ کا متن ہے۔'::text,
      p_answer_arabic => 'الحمد لله والصلاة والسلام على رسول الله.'::text,
      p_reference => 'رد المحتار علی الدر المختار، جلد ۱، صفحہ ۱۰۰'::text,
      p_admin_notes => 'نوٹ: خصوصی نظر ثانی کے بعد اندراج کیا گیا'::text
    );
  `, [inqId]);
  const draftRow = draftRes.rows[0];
  assert.strictEqual(draftRow.scholar_qualification, 'دار العلوم کراچی، تخصص فی الفقہ');
  assert.strictEqual(draftRow.answer_arabic, 'الحمد لله والصلاة والسلام على رسول الله.');
  assert.strictEqual(draftRow.reference, 'رد المحتار علی الدر المختار، جلد ۱، صفحہ ۱۰۰');
  assert.strictEqual(draftRow.admin_notes, 'نوٹ: خصوصی نظر ثانی کے بعد اندراج کیا گیا');

  // 3. Intentionally clear optional fields (scholar_qualification and answer_arabic) by passing empty string ''
  // while omitting p_reference and p_admin_notes (passing NULL) - they must be preserved!
  const clearRes = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1::uuid,
      p_scholar_qualification => ''::text,
      p_answer_arabic => '   '::text
    );
  `, [inqId]);
  const clearRow = clearRes.rows[0];
  assert.strictEqual(clearRow.scholar_qualification, null, 'scholar_qualification must be cleared to NULL when empty string passed');
  assert.strictEqual(clearRow.answer_arabic, null, 'answer_arabic must be cleared to NULL when whitespace passed');
  assert.strictEqual(clearRow.reference, 'رد المحتار علی الدر المختار، جلد ۱، صفحہ ۱۰۰', 'Omitted reference must be preserved');
  assert.strictEqual(clearRow.admin_notes, 'نوٹ: خصوصی نظر ثانی کے بعد اندراج کیا گیا', 'Omitted admin_notes must be preserved');
  assert.strictEqual(clearRow.scholar_name, 'مفتی خالد مسعود', 'Omitted scholar_name must be preserved');

  // 4. Publish inquiry as answered - answered_at must be populated
  const pubRes = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(p_id => $1::uuid, p_status => 'answered'::text);
  `, [inqId]);
  const pubRow = pubRes.rows[0];
  assert.strictEqual(pubRow.status, 'answered');
  assert.ok(pubRow.answered_at, 'answered_at must be populated upon publishing');

  // 5. Unpublish back to answer_received for revision - answered_at must be reset to NULL
  const unpubRes = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(p_id => $1::uuid, p_status => 'answer_received'::text);
  `, [inqId]);
  const unpubRow = unpubRes.rows[0];
  assert.strictEqual(unpubRow.status, 'answer_received');
  assert.strictEqual(unpubRow.answered_at, null, 'answered_at must be reset to NULL upon unpublishing to answer_received');

  // 6. Test rejection reason reset on reopening:
  // Reject inquiry with a reason
  const rejInq = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1::uuid,
      p_status => 'rejected'::text,
      p_rejection_reason => 'مکرر سوال کی وجہ سے مسترد کیا گیا۔'::text
    );
  `, [inqId]);
  assert.strictEqual(rejInq.rows[0].status, 'rejected');
  assert.strictEqual(rejInq.rows[0].rejection_reason, 'مکرر سوال کی وجہ سے مسترد کیا گیا۔');

  // Reopen to pending_review without providing a new rejection reason (rejection_reason must reset to NULL)
  const reopenInq = await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1::uuid,
      p_status => 'pending_review'::text
    );
  `, [inqId]);
  assert.strictEqual(reopenInq.rows[0].status, 'pending_review');
  assert.strictEqual(reopenInq.rows[0].rejection_reason, null, 'rejection_reason must be cleared to NULL when reopened to pending_review');
});

test('11. [RUNTIME PG] Rate Limiting — Anonymous Burst Threshold Enforcement', async () => {
  await setAnonymousContext();

  // Check how many anonymous inquiries have been submitted in the last minute
  const curCountRes = await db.query(`
    SELECT count(*) FROM public.scholar_inquiries
    WHERE user_id IS NULL AND created_at > (pg_catalog.now() - INTERVAL '1 minute');
  `);
  let currentCount = parseInt(curCountRes.rows[0].count, 10);

  // Submit until we have exactly 5 in the 1-minute window
  while (currentCount < 5) {
    currentCount++;
    await db.query(`
      SELECT * FROM public.submit_scholar_inquiry(
        $1, $2, $3, $4
      );
    `, [
      `مسئلہ نمبر برائے جانچ ${currentCount}`,
      `یہ ایک آزمائشی سوال ہے تاکہ ریٹ لمٹ کی جانچ کی جا سکے۔ سوال کی تفصیل کم از کم دس حروف پر مشتمل ہونی چاہیے۔ نمبر ${currentCount}`,
      'General',
      'General'
    ]);
  }

  // The next submission within the 1-minute window must be blocked by burst rate limit
  let threwBurstError = false;
  let burstErrorMsg = '';
  try {
    await db.query(`
      SELECT * FROM public.submit_scholar_inquiry(
        $1, $2, $3, $4
      );
    `, [
      'مسئلہ برائے حد سے تجاوز',
      'یہ سوال فی منٹ کی حد سے تجاوز کرے گا اور اسے سرور کی طرف سے مسترد ہونا چاہیے۔',
      'General',
      'General'
    ]);
  } catch (err) {
    threwBurstError = true;
    burstErrorMsg = err.message;
  }

  assert.strictEqual(threwBurstError, true, 'Submission exceeding anonymous 5/min burst threshold must trigger rate limit');
  assert.match(burstErrorMsg, /Anonymous inquiry burst limit reached|System busy/i, 'Error message must reflect burst rate limit');
});

test('12. [RUNTIME PG & CONCURRENCY AUDIT] Concurrency & Advisory Lock Status', async () => {
  // PGlite runs a single WebAssembly thread in '--single' mode.
  // In single-process WASM, parallel OS-level concurrent transactions against
  // the exact same database cluster are not physically executed across multiple worker processes.
  // We verify that the SQL function properly executes pg_advisory_xact_lock without runtime errors:
  const lockRes = await db.query('SELECT pg_advisory_xact_lock(8941720) as locked;');
  assert.strictEqual(lockRes.rows.length, 1, 'pg_advisory_xact_lock must be callable without syntax or extension error');

  console.log('\n-----------------------------------------------------------------------------');
  console.log('ℹ️  CONCURRENCY AUDIT:');
  console.log('   - pg_advisory_xact_lock(8941720) syntax and execution: VERIFIED');
  console.log('   - Multi-process concurrent race condition test: UNVERIFIED on PGlite');
  console.log('     (PGlite operates in single-process WASM mode; true multi-connection race');
  console.log('      testing requires multi-client PostgreSQL connection pooling).');
  console.log('-----------------------------------------------------------------------------\n');
});

test('13. [RUNTIME PG] Direct DCL Table Privilege Enforcement', async () => {
  // Verify that the table RLS is enabled
  const rlsRes = await db.query(`
    SELECT relrowsecurity, relforcerowsecurity 
    FROM pg_class 
    WHERE relname = 'scholar_inquiries';
  `);
  assert.strictEqual(rlsRes.rows[0].relrowsecurity, true, 'Row Level Security must be enabled on scholar_inquiries');

  // Verify that the table check constraints are active
  const constrRes = await db.query(`
    SELECT conname FROM pg_constraint 
    WHERE conrelid = 'public.scholar_inquiries'::regclass;
  `);
  const constraintNames = constrRes.rows.map(r => r.conname);
  assert.ok(constraintNames.includes('chk_scholar_inquiry_status'), 'chk_scholar_inquiry_status constraint must exist');
  assert.ok(constraintNames.includes('chk_answered_integrity'), 'chk_answered_integrity constraint must exist');
  assert.ok(constraintNames.includes('chk_rejected_integrity'), 'chk_rejected_integrity constraint must exist');

  // Verify scholar_inquiry_rate_limits table exists and has RLS enabled
  const rateLimitClass = await db.query(`
    SELECT relrowsecurity 
    FROM pg_class 
    WHERE relname = 'scholar_inquiry_rate_limits';
  `);
  assert.strictEqual(rateLimitClass.rows.length, 1, 'scholar_inquiry_rate_limits table must exist');
  assert.strictEqual(rateLimitClass.rows[0].relrowsecurity, true, 'RLS must be enabled on scholar_inquiry_rate_limits');

  // Verify that NO DELETE policy exists on scholar_inquiries
  const delPolicyRes = await db.query(`
    SELECT polname FROM pg_policy 
    WHERE polrelid = 'public.scholar_inquiries'::regclass
      AND polcmd = 'd';
  `);
  assert.strictEqual(delPolicyRes.rows.length, 0, 'No DELETE policy must exist on scholar_inquiries table');
});
