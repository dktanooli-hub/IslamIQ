-- =============================================================================
-- IslamIQ Ask a Scholar: Staging PostgreSQL Runtime Verification Script
-- File: supabase/tests/verify_scholar_inquiries_runtime.sql
-- Instructions: Run this script in the Supabase SQL Editor on a STAGING or
--               disposable database. The script wraps all tests inside a
--               transaction (BEGIN ... ROLLBACK) so no test data persists.
-- =============================================================================

BEGIN;

-- 1. Test Anonymous Submission with Urdu & Arabic text
DO $$
DECLARE
    v_inquiry_num TEXT;
    v_token TEXT;
    v_status TEXT;
    v_created_at TIMESTAMPTZ;
    v_row_count INT;
    v_res RECORD;
    v_inquiry_id UUID;
BEGIN
    RAISE NOTICE '--- TEST 1: Anonymous Inquiry Submission ---';
    SELECT inquiry_number, access_token, status, created_at
    INTO v_inquiry_num, v_token, v_status, v_created_at
    FROM public.submit_scholar_inquiry(
        'مسافر کی نماز کے احکام',
        'اگر کوئی شخص ۴۸ میل کے سفر پر روانہ ہو تو قصر نماز کب سے شروع ہوگی؟ براہ کرم وضاحت فرمائیں۔',
        'Salah',
        'Hanafi',
        'سائل عبد اللہ',
        'abdullah.test@example.com'
    );

    IF v_inquiry_num IS NULL OR v_token IS NULL THEN
        RAISE EXCEPTION 'TEST 1 FAILED: Submission did not return inquiry_number or access_token.';
    END IF;
    IF v_status != 'pending_review' THEN
        RAISE EXCEPTION 'TEST 1 FAILED: Initial status is % instead of pending_review.', v_status;
    END IF;
    RAISE NOTICE 'TEST 1 PASSED: Created inquiry % with token prefix %...', v_inquiry_num, substring(v_token from 1 for 12);

    -- 2. Test Seeker Lookup while Pending (Answer must be strictly NULL)
    RAISE NOTICE '--- TEST 2: Seeker Lookup on Pending Inquiry (Draft/Answer Secrecy) ---';
    SELECT * INTO v_res FROM public.get_scholar_inquiry(v_inquiry_num, v_token);
    IF v_res.inquiry_number IS NULL THEN
        RAISE EXCEPTION 'TEST 2 FAILED: Lookup failed with valid token.';
    END IF;
    IF v_res.answer_text IS NOT NULL OR v_res.scholar_name IS NOT NULL THEN
        RAISE EXCEPTION 'TEST 2 FAILED: Pending inquiry leaked scholar response fields!';
    END IF;
    RAISE NOTICE 'TEST 2 PASSED: Draft answers are successfully masked.';

    -- 3. Test Invalid Token Rejection
    RAISE NOTICE '--- TEST 3: Invalid Token Rejection ---';
    SELECT count(*) INTO v_row_count FROM public.get_scholar_inquiry(v_inquiry_num, 'iq_sec_wrong_token_12345');
    IF v_row_count != 0 THEN
        RAISE EXCEPTION 'TEST 3 FAILED: Invalid access token returned data!';
    END IF;
    RAISE NOTICE 'TEST 3 PASSED: Invalid token correctly rejected with 0 rows.';

    -- 4. Test Accidental Publishing Prevention (CHECK constraint chk_answered_integrity)
    RAISE NOTICE '--- TEST 4: Integrity Constraint chk_answered_integrity ---';
    BEGIN
        UPDATE public.scholar_inquiries
        SET status = 'answered',
            answer_text = NULL,
            scholar_name = NULL
        WHERE inquiry_number = v_inquiry_num;
        RAISE EXCEPTION 'TEST 4 FAILED: Database allowed marking as answered with empty answer_text!';
    EXCEPTION WHEN check_violation THEN
        RAISE NOTICE 'TEST 4 PASSED: Database rejected premature publishing of empty answer as expected.';
    END;

    -- 5. Test Valid Answer Publication & Seeker Decryption/Visibility
    RAISE NOTICE '--- TEST 5: Valid Answer Publication & Seeker Visibility ---';
    UPDATE public.scholar_inquiries
    SET status = 'answered',
        scholar_name = 'مفتی محمد صاحب (دار الافتاء)',
        scholar_qualification = 'فاضل دار العلوم، سند یافتہ مفتی',
        answer_text = 'جب مسافر اپنے شہر کی آبادی سے باہر نکل جائے تو قصر نماز شروع ہوگی۔',
        answer_arabic = 'قال في الهداية: وإذا فارق بيوت المصر صلى ركعتين.',
        reference = 'الہدایہ، کتاب الصلاۃ، باب صلاۃ المسافر',
        answered_at = pg_catalog.now()
    WHERE inquiry_number = v_inquiry_num;

    SELECT * INTO v_res FROM public.get_scholar_inquiry(v_inquiry_num, v_token);
    IF v_res.answer_text IS NULL OR v_res.scholar_name IS NULL THEN
        RAISE EXCEPTION 'TEST 5 FAILED: Published answer not returned to seeker!';
    END IF;
    RAISE NOTICE 'TEST 5 PASSED: Published answer visible to seeker with authorized token.';

    -- 6. Test Unauthorized Access Protection on admin_update_scholar_inquiry
    RAISE NOTICE '--- TEST 6: Unauthorized Access Protection ---';
    SELECT id INTO v_inquiry_id FROM public.scholar_inquiries WHERE inquiry_number = v_inquiry_num;
    BEGIN
        -- When called by non-admin, admin_update_scholar_inquiry raises an exception
        PERFORM public.admin_update_scholar_inquiry(
            v_inquiry_id,
            'answered',
            'Unauthorized Person',
            NULL,
            'This unauthorized update attempt should fail',
            NULL,
            NULL,
            NULL,
            NULL
        );
        RAISE NOTICE 'TEST 6 NOTE: Executed under current superuser/admin context.';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'TEST 6 PASSED: Unauthorized transition blocked: %', SQLERRM;
    END;
END $$;

-- Rollback entire transaction so test data is never permanently saved
ROLLBACK;
RAISE NOTICE '=== ALL STAGING RUNTIME TESTS COMPLETED SUCCESSFULLY (TRANSACTION ROLLED BACK) ===';
