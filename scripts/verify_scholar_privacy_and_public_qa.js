// =============================================================================
// IslamIQ — Scholar Privacy Choice & Public Q&A Test Suite (PGlite Runtime)
// File: scripts/verify_scholar_privacy_and_public_qa.js
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import { PGlite } from '@electric-sql/pglite';
import { pgcrypto } from '@electric-sql/pglite/contrib/pgcrypto';
import { uuid_ossp } from '@electric-sql/pglite/contrib/uuid_ossp';

const BASE_MIGRATION_PATH = path.resolve('supabase/migrations/20261016_create_scholar_inquiries.sql');
const NEW_MIGRATION_PATH = path.resolve('supabase/migrations/20261026_add_scholar_inquiry_privacy_and_public_qa.sql');

const baseMigrationSql = fs.readFileSync(BASE_MIGRATION_PATH, 'utf-8');
const newMigrationSql = fs.readFileSync(NEW_MIGRATION_PATH, 'utf-8');

let db;
const adminUserId = 'a0000000-0000-0000-0000-000000000001';
const regularUserId = 'b0000000-0000-0000-0000-000000000001';

async function setAdminContext() {
  await db.exec(`SET request.jwt.claim.sub = '${adminUserId}';`);
}

async function setAnonymousContext() {
  await db.exec("SET request.jwt.claim.sub = '';");
}

test('1. [PRIVACY & PUBLIC QA] Initialize PGlite and apply migrations', async () => {
  db = new PGlite({
    extensions: { pgcrypto, uuid_ossp }
  });

  await db.exec(`
    CREATE SCHEMA IF NOT EXISTS extensions;
    CREATE EXTENSION IF NOT EXISTS pgcrypto SCHEMA extensions;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
        CREATE ROLE anon NOLOGIN;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
        CREATE ROLE authenticated NOLOGIN;
      END IF;
    END $$;

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

    INSERT INTO auth.users (id, email) VALUES ('${adminUserId}', 'admin@learnislamiq.com')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.app_admins (user_id, email, role, active)
    VALUES ('${adminUserId}', 'admin@learnislamiq.com', 'super_admin', true)
    ON CONFLICT (user_id) DO NOTHING;
  `);

  // Apply base migration first
  await db.exec(baseMigrationSql);

  // Apply new migration
  await db.exec(newMigrationSql);

  // Check columns exist on table
  const cols = await db.query(`
    SELECT column_name, data_type, column_default 
    FROM information_schema.columns 
    WHERE table_name = 'scholar_inquiries' 
      AND column_name IN ('share_publicly', 'consent_timestamp', 'published_at');
  `);
  assert.equal(cols.rows.length, 3, 'All 3 new columns must exist on scholar_inquiries');
});

test('2. [LEGACY COMPATIBILITY] Default behavior without selection is strictly PRIVATE', async () => {
  await setAnonymousContext();

  // Call legacy 6-arg signature or omit share_publicly
  const res = await db.query(`
    SELECT * FROM public.submit_scholar_inquiry(
      'Question on Fasting Legacy',
      'This is a question submitted without specifying privacy preference explicitly.',
      'Sawm',
      'Hanafi',
      'Legacy Seeker',
      'legacy@example.com'
    );
  `);
  assert.equal(res.rows.length, 1);
  const inqNum = res.rows[0].inquiry_number;

  // Verify in database that share_publicly is false
  const inq = await db.query(`
    SELECT share_publicly, consent_timestamp, published_at, status 
    FROM public.scholar_inquiries 
    WHERE inquiry_number = $1;
  `, [inqNum]);

  assert.equal(inq.rows[0].share_publicly, false, 'Default share_publicly must be false');
  assert.equal(inq.rows[0].published_at, null, 'published_at must be null');
});

test('3. [PATH A: PRIVATE WORKFLOW] Private submission -> Admin Answer -> Private Retrieval ONLY', async () => {
  await setAnonymousContext();

  // Submit with explicit share_publicly = false
  const submitRes = await db.query(`
    SELECT * FROM public.submit_scholar_inquiry(
      'Private Family Inheritance Question',
      'Detailed confidential question about family division that must not be shared.',
      'Family',
      'General',
      'Fatima Confidential',
      'fatima@example.com',
      false
    );
  `);

  const { inquiry_number, access_token } = submitRes.rows[0];
  assert.ok(inquiry_number);
  assert.ok(access_token);

  // Get inquiry ID
  const row = await db.query(`SELECT id, share_publicly FROM public.scholar_inquiries WHERE inquiry_number = $1`, [inquiry_number]);
  const inqId = row.rows[0].id;
  assert.equal(row.rows[0].share_publicly, false);

  // Admin processes inquiry: pending_review -> sent_to_scholar -> answer_received -> answered
  await setAdminContext();

  await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1,
      p_status => 'sent_to_scholar'
    );
  `, [inqId]);

  await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1,
      p_status => 'answer_received',
      p_answer_text => 'Draft answer for confidential family matter.'
    );
  `, [inqId]);

  await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1,
      p_status => 'answered',
      p_scholar_name => 'Mufti Muhammad Ibrahim',
      p_scholar_qualification => 'Darul Ifta Certified',
      p_answer_text => 'Here is the verified scholarly ruling regarding the confidential family matter.',
      p_reference => 'Al-Mughni Vol 6, p. 120'
    );
  `, [inqId]);

  // Verify in DB that published_at is NULL because share_publicly is false
  const updatedRow = await db.query(`SELECT status, share_publicly, published_at FROM public.scholar_inquiries WHERE id = $1`, [inqId]);
  assert.equal(updatedRow.rows[0].status, 'answered');
  assert.equal(updatedRow.rows[0].share_publicly, false);
  assert.equal(updatedRow.rows[0].published_at, null, 'Private inquiry must NEVER have published_at set');

  // Verify private seeker lookup succeeds
  await setAnonymousContext();
  const seekerLookup = await db.query(`
    SELECT * FROM public.get_scholar_inquiry($1, $2);
  `, [inquiry_number, access_token]);

  assert.equal(seekerLookup.rows.length, 1, 'Seeker must be able to retrieve private answered inquiry');
  assert.equal(seekerLookup.rows[0].status, 'answered');
  assert.equal(seekerLookup.rows[0].scholar_name, 'Mufti Muhammad Ibrahim');
  assert.ok(seekerLookup.rows[0].answer_text.includes('confidential family matter'));

  // CRITICAL: Verify public Q&A RPC does NOT return this private inquiry
  const publicList = await db.query(`
    SELECT * FROM public.get_public_answered_scholar_inquiries(50, 0, NULL, 'confidential');
  `);
  assert.equal(publicList.rows.length, 0, 'Public Q&A RPC must NEVER return private inquiries');
});

test('4. [PATH B: PUBLIC WORKFLOW] Public Consent -> Admin Answer -> Automatically Appears in Public Q&A', async () => {
  await setAnonymousContext();

  // Submit with explicit share_publicly = true
  const submitRes = await db.query(`
    SELECT * FROM public.submit_scholar_inquiry(
      'Ruling on Praying on an Airplane During Flight',
      'What is the method of performing obligatory prayers during long haul flights when standing or facing the Qibla is difficult?',
      'Salah',
      'Hanafi',
      'Frequent Traveler',
      'traveler@example.com',
      true
    );
  `);

  const { inquiry_number, access_token } = submitRes.rows[0];
  const row = await db.query(`SELECT id, share_publicly, consent_timestamp FROM public.scholar_inquiries WHERE inquiry_number = $1`, [inquiry_number]);
  const inqId = row.rows[0].id;
  assert.equal(row.rows[0].share_publicly, true);
  assert.ok(row.rows[0].consent_timestamp, 'consent_timestamp must be recorded');

  // Before being answered, public RPC must NOT show it
  const beforeAnswer = await db.query(`
    SELECT * FROM public.get_public_answered_scholar_inquiries(50, 0, NULL, 'Airplane');
  `);
  assert.equal(beforeAnswer.rows.length, 0, 'Unanswered inquiry must NEVER appear in public section');

  // Admin answers the inquiry
  await setAdminContext();

  await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1,
      p_status => 'sent_to_scholar'
    );
  `, [inqId]);

  await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1,
      p_status => 'answer_received',
      p_answer_text => 'Drafting airplane prayer ruling...'
    );
  `, [inqId]);

  await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1,
      p_status => 'answered',
      p_scholar_name => 'Shaykh Ahmadullah Qasmi',
      p_scholar_qualification => 'Senior Hadith & Fiqh Lecturer',
      p_answer_text => 'A passenger on an aircraft must make their best effort to stand and face the Qibla for obligatory prayers. If physical standing or finding space is strictly impossible, one prays while seated with gestures (Isharah), and according to the Hanafi school repeats the prayer upon landing as a precautionary measure.',
      p_reference => 'Radd al-Muhtar (Ibn Abidin 2/42); Fatawa Hindiyyah 1/144.'
    );
  `, [inqId]);

  // Check that published_at was AUTOMATICALLY populated
  const afterAnswerRow = await db.query(`
    SELECT status, share_publicly, published_at FROM public.scholar_inquiries WHERE id = $1
  `, [inqId]);
  assert.equal(afterAnswerRow.rows[0].status, 'answered');
  assert.equal(afterAnswerRow.rows[0].share_publicly, true);
  assert.ok(afterAnswerRow.rows[0].published_at, 'published_at must be automatically set on answered public inquiry');

  // Seeker can retrieve privately as normal
  await setAnonymousContext();
  const seekerLookup = await db.query(`
    SELECT * FROM public.get_scholar_inquiry($1, $2);
  `, [inquiry_number, access_token]);
  assert.equal(seekerLookup.rows.length, 1);
  assert.equal(seekerLookup.rows[0].status, 'answered');

  // PUBLIC SECTION: Automatically displays in public Q&A without asking user for permission again
  const publicList = await db.query(`
    SELECT * FROM public.get_public_answered_scholar_inquiries(50, 0, NULL, 'Airplane');
  `);
  assert.equal(publicList.rows.length, 1, 'Public Q&A RPC must return the answered inquiry with public consent');
  
  const publicItem = publicList.rows[0];
  assert.equal(publicItem.subject, 'Ruling on Praying on an Airplane During Flight');
  assert.equal(publicItem.scholar_name, 'Shaykh Ahmadullah Qasmi');
  assert.ok(publicItem.answer_text.includes('passenger on an aircraft'));
  assert.ok(publicItem.published_at);

  // SANITIZATION AUDIT: Ensure sensitive columns are NOT in the return table
  assert.equal(publicItem.seeker_name, undefined, 'seeker_name must NOT exist on public output');
  assert.equal(publicItem.seeker_email, undefined, 'seeker_email must NOT exist on public output');
  assert.equal(publicItem.inquiry_number, undefined, 'inquiry_number must NOT exist on public output');
  assert.equal(publicItem.access_token_hash, undefined, 'access_token_hash must NOT exist on public output');
  assert.equal(publicItem.admin_notes, undefined, 'admin_notes must NOT exist on public output');
  assert.equal(publicItem.user_id, undefined, 'user_id must NOT exist on public output');
});

test('5. [COUNTER ACCURACY & PRIVACY] Public counter strictly hides private inquiries count from anonymous callers', async () => {
  // Anonymous / Public caller: MUST ONLY see public counts (never discovers total private inquiries count)
  await setAnonymousContext();
  const anonCounts = await db.query(`SELECT * FROM public.get_scholar_inquiries_answered_count();`);
  assert.equal(anonCounts.rows.length, 1);
  assert.equal(Number(anonCounts.rows[0].total_answered), 1, 'Public caller total_answered must reflect ONLY public answered count');
  assert.equal(Number(anonCounts.rows[0].total_public_answered), 1, 'Public caller total_public_answered must reflect public count');

  // Authenticated Admin caller: Can audit total volume (1 private + 1 public = 2 total)
  await setAdminContext();
  const adminCounts = await db.query(`SELECT * FROM public.get_scholar_inquiries_answered_count();`);
  assert.equal(adminCounts.rows.length, 1);
  assert.equal(Number(adminCounts.rows[0].total_answered), 2, 'Admin caller sees all answered inquiries (private + public)');
  assert.equal(Number(adminCounts.rows[0].total_public_answered), 1, 'Admin caller sees public count accurately');
});

test('6. [NEGATIVE TEST: REJECTION & DRAFTS] Rejected or pending inquiries with public consent NEVER appear in public Q&A', async () => {
  await setAnonymousContext();

  // Submit with share_publicly = true
  const submitRes = await db.query(`
    SELECT * FROM public.submit_scholar_inquiry(
      'Rejected Question Test',
      'This question will be rejected by administration and must never be exposed publicly.',
      'General',
      'General',
      'Test User',
      'test@example.com',
      true
    );
  `);
  const { inquiry_number } = submitRes.rows[0];
  const row = await db.query(`SELECT id FROM public.scholar_inquiries WHERE inquiry_number = $1`, [inquiry_number]);
  const inqId = row.rows[0].id;

  // 1. While in pending_review: must not appear
  let pub = await db.query(`SELECT * FROM public.get_public_answered_scholar_inquiries(50, 0, NULL, 'Rejected Question');`);
  assert.equal(pub.rows.length, 0);

  // Admin rejects it
  await setAdminContext();
  await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1,
      p_status => 'rejected',
      p_rejection_reason => 'Duplicate or out of scope inquiry.'
    );
  `, [inqId]);

  // 2. While in rejected: must not appear even though share_publicly was true
  await setAnonymousContext();
  pub = await db.query(`SELECT * FROM public.get_public_answered_scholar_inquiries(50, 0, NULL, 'Rejected Question');`);
  assert.equal(pub.rows.length, 0, 'Rejected inquiry must NEVER appear in public Q&A');
});

test('7. [UNPUBLISHING AUDIT] Admin unpublishing removes entry from public Q&A', async () => {
  // Take the airplane prayer inquiry answered in Test 4
  const row = await db.query(`
    SELECT id FROM public.scholar_inquiries 
    WHERE subject = 'Ruling on Praying on an Airplane During Flight'
  `);
  const inqId = row.rows[0].id;

  // Unpublish back to answer_received for revision
  await setAdminContext();
  await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1,
      p_status => 'answer_received'
    );
  `, [inqId]);

  // Verify published_at was cleared to NULL
  const dbRow = await db.query(`SELECT status, published_at FROM public.scholar_inquiries WHERE id = $1`, [inqId]);
  assert.equal(dbRow.rows[0].status, 'answer_received');
  assert.equal(dbRow.rows[0].published_at, null);

  // Verify public section no longer shows it
  await setAnonymousContext();
  const pub = await db.query(`SELECT * FROM public.get_public_answered_scholar_inquiries(50, 0, NULL, 'Airplane');`);
  assert.equal(pub.rows.length, 0, 'Unpublished entry must disappear from public Q&A immediately');
});

test('8. [PAGINATION COUNT WITH ZERO ROWS] get_public_answered_scholar_inquiries_count returns accurate total count', async () => {
  await setAdminContext();
  // Re-publish the airplane prayer inquiry
  const row = await db.query(`SELECT id FROM public.scholar_inquiries WHERE subject = 'Ruling on Praying on an Airplane During Flight'`);
  const inqId = row.rows[0].id;
  await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1,
      p_status => 'answered',
      p_scholar_name => 'Shaykh Ahmadullah Qasmi',
      p_answer_text => 'A passenger on an aircraft must make their best effort to stand and face the Qibla for obligatory prayers.'
    );
  `, [inqId]);

  await setAnonymousContext();
  // Request offset 100 on page with 0 rows
  const emptyPage = await db.query(`SELECT * FROM public.get_public_answered_scholar_inquiries(10, 100, 'Salah', NULL);`);
  assert.equal(emptyPage.rows.length, 0, 'Page beyond records must return 0 rows');

  // get_public_answered_scholar_inquiries_count returns exact accurate total count
  const countRes = await db.query(`SELECT public.get_public_answered_scholar_inquiries_count('Salah', NULL) AS total;`);
  assert.equal(Number(countRes.rows[0].total), 1, 'Total count must accurately reflect 1 matching inquiry even on empty tail pages');
});

test('9. [REVISING ANSWER REMOVES FROM PUBLIC RESULTS] Modifying answer text unpublishes until re-verified', async () => {
  const row = await db.query(`SELECT id FROM public.scholar_inquiries WHERE subject = 'Ruling on Praying on an Airplane During Flight'`);
  const inqId = row.rows[0].id;

  // Admin edits answer text without passing p_status = 'answered'
  await setAdminContext();
  await db.query(`
    SELECT * FROM public.admin_update_scholar_inquiry(
      p_id => $1,
      p_answer_text => 'Updated revised draft for airplane prayer with additional nuances.'
    );
  `, [inqId]);

  // Status must be unverified to 'answer_received' and published_at cleared
  const dbRow = await db.query(`SELECT status, published_at FROM public.scholar_inquiries WHERE id = $1`, [inqId]);
  assert.equal(dbRow.rows[0].status, 'answer_received');
  assert.equal(dbRow.rows[0].published_at, null, 'Revising answer must unpublish from public view');

  // Public query must NOT return it
  await setAnonymousContext();
  const pub = await db.query(`SELECT * FROM public.get_public_answered_scholar_inquiries(50, 0, NULL, 'Airplane');`);
  assert.equal(pub.rows.length, 0, 'Inquiry undergoing answer revision must NOT appear in public results');
});

test('10. [SECURITY DEFINER & GRANTS] Anonymous caller cannot call admin_update_scholar_inquiry', async () => {
  await setAnonymousContext();
  const row = await db.query(`SELECT id FROM public.scholar_inquiries LIMIT 1`);
  const inqId = row.rows[0].id;

  await assert.rejects(
    async () => {
      await db.query(`
        SELECT * FROM public.admin_update_scholar_inquiry(
          p_id => $1,
          p_status => 'answered'
        );
      `, [inqId]);
    },
    /Access denied: Administrator privileges required/
  );
});


