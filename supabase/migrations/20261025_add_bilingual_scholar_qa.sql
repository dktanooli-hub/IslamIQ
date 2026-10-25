-- =============================================================================
-- Migration: Add Bilingual English & Urdu Columns to scholar_qa_library
-- File: supabase/migrations/20261025_add_bilingual_scholar_qa.sql
-- Description:
--   Extends public.scholar_qa_library so a single Q&A record can store both
--   English and Urdu versions of the Title, Question, Answer, and References.
--   Fully backward-compatible with existing single-language records.
-- =============================================================================

-- 1. Add bilingual content columns if they do not already exist
ALTER TABLE public.scholar_qa_library
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS question_en TEXT,
  ADD COLUMN IF NOT EXISTS answer_en TEXT,
  ADD COLUMN IF NOT EXISTS references_details_en TEXT,
  ADD COLUMN IF NOT EXISTS title_ur TEXT,
  ADD COLUMN IF NOT EXISTS question_ur TEXT,
  ADD COLUMN IF NOT EXISTS answer_ur TEXT,
  ADD COLUMN IF NOT EXISTS references_details_ur TEXT;

-- 2. Update language CHECK constraint to allow 'both' and 'bilingual'
ALTER TABLE public.scholar_qa_library 
  DROP CONSTRAINT IF EXISTS scholar_qa_library_language_check;

ALTER TABLE public.scholar_qa_library 
  ADD CONSTRAINT scholar_qa_library_language_check 
  CHECK (language IN ('english', 'urdu', 'both', 'bilingual'));

-- 3. Backfill existing legacy records so neither English nor Urdu is lost
UPDATE public.scholar_qa_library
SET 
  title_en = COALESCE(title_en, CASE WHEN language != 'urdu' THEN title ELSE NULL END),
  question_en = COALESCE(question_en, CASE WHEN language != 'urdu' THEN question ELSE NULL END),
  answer_en = COALESCE(answer_en, CASE WHEN language != 'urdu' THEN answer ELSE NULL END),
  references_details_en = COALESCE(references_details_en, CASE WHEN language != 'urdu' THEN references_details ELSE NULL END),
  title_ur = COALESCE(title_ur, CASE WHEN language = 'urdu' THEN title ELSE NULL END),
  question_ur = COALESCE(question_ur, CASE WHEN language = 'urdu' THEN question ELSE NULL END),
  answer_ur = COALESCE(answer_ur, CASE WHEN language = 'urdu' THEN answer ELSE NULL END),
  references_details_ur = COALESCE(references_details_ur, CASE WHEN language = 'urdu' THEN references_details ELSE NULL END);

-- 4. Seed verified Urdu translations for our initial published library records
UPDATE public.scholar_qa_library
SET 
  language = 'both',
  title_en = COALESCE(title_en, title),
  question_en = COALESCE(question_en, question),
  answer_en = COALESCE(answer_en, answer),
  references_details_en = COALESCE(references_details_en, references_details),
  title_ur = 'کیا فجر سے پہلے روزے کی نیت نہ کرنے پر روزہ صحیح ہو جاتا ہے؟',
  question_ur = 'اگر کوئی شخص رات کو نیت کیے بغیر فجر کے بعد بیدار ہو تو کیا شریعتِ اسلامیہ میں اس کا روزہ صحیح اور معتبر ہوگا؟',
  answer_ur = 'فرض اور نفل روزے کے درمیان فقہی طور پر ایک واضح اور بنیادی فرق ہے:

۱. فرض روزہ (رمضان، قضا یا کفارہ):
جمہور علمائے کرام (مالکی، شافعی اور حنبلی) کے نزدیک فرض روزے کے لیے رات کے وقت صبح صادق (فجر) سے پہلے نیت کرنا شرط ہے۔ فقہ حنفی میں رمضان المبارک کے لیے ضحوۃ کبریٰ (نصف النہار شرعی، یعنی ظہر سے تقریباً ایک گھنٹہ قبل) تک نیت کی گنجائش ہے بشرطیکہ فجر کے بعد کچھ کھایا پیا نہ ہو۔ تاہم تمام ائمہ کے اختلاف سے بچنے کے لیے فجر سے قبل ہی نیت کر لینا احتیاط ہے۔

۲. نفل روزہ:
چاروں فقہی مذاہب کا اس پر اتفاق ہے کہ نفل روزے کے لیے صبح کے وقت بھی نیت کی جا سکتی ہے، بشرطیکہ فجر کے بعد کوئی منافی صوم کام (کھانا پینا وغیرہ) نہ کیا ہو، جیسا کہ نبی کریم ﷺ کے معمول مبارک سے ثابت ہے۔',
  references_details_ur = 'حدیث مبارکہ کے مستند حوالہ جات:
۱. صحیح مسلم (حدیث 1154): ام المومنین حضرت عائشہ صدیقہ رضی اللہ عنہا سے روایت ہے کہ نبی کریم ﷺ ایک دن تشریف لائے اور دریافت فرمایا: "کیا تمہارے پاس کھانے کو کچھ ہے؟" انہوں نے عرض کیا: "نہیں"۔ آپ ﷺ نے فرمایا: "تو پھر میں روزے سے ہوں۔"
۲. سنن ابی داؤد (2454) و جامع ترمذی (730): حضرت حفصہ رضی اللہ عنہا سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: "جس نے فجر سے پہلے روزے کا پختہ ارادہ (نیت) نہ کیا، اس کا روزہ نہیں (یعنی فرض روزہ)۔"'
WHERE slug = 'is-fasting-valid-if-one-forgets-intention-before-fajr';

UPDATE public.scholar_qa_library
SET 
  language = 'both',
  title_en = COALESCE(title_en, title),
  question_en = COALESCE(question_en, question),
  answer_en = COALESCE(answer_en, answer),
  references_details_en = COALESCE(references_details_en, references_details),
  title_ur = 'نماز میں رکعتوں کی تعداد میں شک واقع ہو جائے تو کیا کرنا چاہیے؟',
  question_ur = 'اگر کوئی شخص نماز پڑھ رہا ہو اور اسے شک ہو جائے کہ اس نے ۳ رکعتیں پڑھی ہیں یا ۴، تو سنتِ نبوی کے مطابق نماز کی اصلاح کیسے کی جائے؟',
  answer_ur = 'نماز میں شک واقع ہونے کی صورت میں سنتِ نبوی ﷺ نے واضح رہنمائی فرمائی ہے:

۱. یقین پر بنا کرنا (کم تعداد پر بنیاد):
رسول اللہ ﷺ نے یہ سنہری اصول ارشاد فرمایا کہ شک کو دور کر کے یقین (جو کہ کم تعداد ہے) پر بنیاد رکھی جائے۔ چنانچہ اگر ۳ اور ۴ میں شک ہو تو ۳ قرار دے کر چوتھی رکعت مکمل کریں، تشہد میں بیٹھیں اور سجدہ سہو کریں۔

۲. سجدہ سہو کا طریقہ:
احادیث صحیحہ کی روشنی میں سجدہ سہو سلام پھیرنے سے پہلے بھی کیا جا سکتا ہے اور سلام پھیرنے کے بعد بھی دو سجدے کر کے دوبارہ سلام پھیرا جا سکتا ہے۔ دونوں طریقے سنت سے ثابت اور درست ہیں۔',
  references_details_ur = 'حدیث مبارکہ کے مستند حوالہ جات:
۱. صحیح مسلم (حدیث 571): حضرت ابو سعید خدری رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: "جب تم میں سے کسی کو نماز میں شک ہو جائے اور معلوم نہ ہو کہ تین رکعتیں پڑھی ہیں یا چار، تو شک کو چھوڑ دے اور جس پر یقین ہے اس پر بنیاد رکھے، پھر سلام سے پہلے دو سجدے کرے۔"
۲. صحیح بخاری (حدیث 401، 1226): نماز میں کمی بیشی پر سجدہ سہو سے متعلق روایات۔'
WHERE slug = 'forgetting-rakat-in-salah-sujud-sahw';

UPDATE public.scholar_qa_library
SET 
  language = 'both',
  title_en = COALESCE(title_en, title),
  question_en = COALESCE(question_en, question),
  answer_en = COALESCE(answer_en, answer),
  references_details_en = COALESCE(references_details_en, references_details),
  title_ur = 'کیا واٹر پروف نیل پالش یا تہہ دار کاسمیٹکس سے وضو ہو جاتا ہے؟',
  question_ur = 'کیا کوئی مسلمان ناخنوں پر واٹر پروف نیل پالش، میک اپ یا تیل نما تہہ جمی ہونے کی حالت میں وضو کر سکتا ہے؟',
  answer_ur = 'اسلامی فقہ میں وضو کی صحت کے لیے بنیادی شرط یہ ہے کہ پانی اعضائے وضو (چہرہ، کہنیوں سمیت دونوں ہاتھ، سر کا مسح، اور ٹخنوں سمیت پاؤں) کی کھال تک بلا رکاوٹ پہنچے (سورۃ المائدہ ۵:۶)۔

۱. پانی کو روکنے والی نیل پالش:
عام کمرشل نیل پالش ناخن پر ایک پلاسٹک نما تہہ جما دیتی ہے جو پانی کو ناخن تک پہنچنے سے روکتی ہے۔ اس لیے ایسی نیل پالش پر وضو چاروں فقہی ائمہ کے متفقہ فیصلے کے مطابق باطل اور غیر معتبر ہے۔

۲. سانس لینے والی (حلال / Breathable) پالش:
جو پروڈکٹس حلال یا بریتھیبل کہلاتی ہیں وہ صرف اسی صورت میں معتبر ہیں جب سائنسی طور پر ثابت ہو کہ وضو کے معمول کے وقت میں پانی ناخن تک پہنچ جاتا ہے۔ تاہم اکثر علمائے کرام احتیاط کا مشورہ دیتے ہیں کہ نماز کے لیے وضو سے قبل اسے صاف کر لیا جائے۔',
  references_details_ur = 'قرآنی و فقہی حوالہ جات:
۱. سورۃ المائدہ (۵:۶): "اے ایمان والو! جب تم نماز کے لیے اٹھو تو اپنے چہروں کو اور اپنے ہاتھوں کو کہنیوں تک دھو لو اور اپنے سروں کا مسح کرو اور اپنے پاؤں ٹخنوں تک دھو لو..."
۲. المجموع شرح المہذب (امام نووی ۱/۴۹۲): "اگر جسم کے کسی عضو پر موم، آٹا، گوند یا ایسی چیز لگی ہو جو پانی کو کھال تک پہنچنے سے روکے تو طہارت صحیح نہیں ہوگی۔"'
WHERE slug = 'taharah-wudu-nail-polish-and-barrier-rules';
