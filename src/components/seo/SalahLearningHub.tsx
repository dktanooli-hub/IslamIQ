import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { CheckSquare, Clock, Heart, ShieldCheck, Sparkles, BookOpen, Compass, ArrowRight } from 'lucide-react';

export const SalahLearningHub: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';

  const prayers = [
    {
      nameUrdu: 'فجر (Fajr)',
      nameEn: 'Fajr',
      rakats: isUrdu ? '2 سنت مؤکدہ + 2 فرض = 4 رکعتیں' : '2 Sunnah Muakkadah + 2 Fard = 4 Rakats',
      timeUrdu: 'صبح صادق سے طلوع آفتاب سے پہلے تک',
      timeEn: 'From dawn until just before sunrise',
      descUrdu: 'دن کا آغاز اللہ تعالیٰ کے حضور سجدہ شکر سے ہوتا ہے، جس سے پورے دن میں برکت اور حفاظت نصیب ہوتی ہے۔',
      descEn: 'The dawn prayer marks the beginning of the day in devotion to Allah, granting divine peace and light for the day.',
    },
    {
      nameUrdu: 'ظہر (Dhuhr)',
      nameEn: 'Dhuhr',
      rakats: isUrdu ? '4 سنت مؤکدہ + 4 فرض + 2 سنت مؤکدہ + 2 نفل = 12 رکعتیں' : '4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl = 12 Rakats',
      timeUrdu: 'زوالِ آفتاب کے فوراً بعد سے شروع ہوتا ہے',
      timeEn: 'Shortly after the sun passes its zenith until Asr',
      descUrdu: 'دن کے مصروف اوقات میں دنیاوی کاموں سے وقفہ لے کر خالقِ کائنات کی یاد دل کو سکون عطا کرتی ہے۔',
      descEn: 'A midday spiritual pause reminding believers of their ultimate purpose amidst daily busy routines.',
    },
    {
      nameUrdu: 'عصر (Asr)',
      nameEn: 'Asr',
      rakats: isUrdu ? '4 سنت غیر مؤکدہ + 4 فرض = 8 رکعتیں' : '4 Sunnah Ghair-Muakkadah + 4 Fard = 8 Rakats',
      timeUrdu: 'ہر چیز کا سایہ دوگنا ہونے سے غروب آفتاب تک',
      timeEn: 'Late afternoon until shortly before sunset',
      descUrdu: 'قرآن کریم میں صلاۃِ وسطیٰ (درمیانی نماز) کی خصوصی تاکید فرمائی گئی ہے، جو کہ نمازِ عصر ہے۔',
      descEn: 'The middle prayer highlighted in Surah Al-Baqarah for special steadfastness and protection from neglect.',
    },
    {
      nameUrdu: 'مغرب (Maghrib)',
      nameEn: 'Maghrib',
      rakats: isUrdu ? '3 فرض + 2 سنت مؤکدہ + 2 نفل = 7 رکعتیں' : '3 Fard + 2 Sunnah + 2 Nafl = 7 Rakats',
      timeUrdu: 'غروب آفتاب کے فوراً بعد سے شفق غائب ہونے تک',
      timeEn: 'Immediately after sunset until the twilight disappears',
      descUrdu: 'سورج غروب ہونے کے بعد اللہ تعالیٰ کی نعمتوں اور دن کے اختتام پر شکر گزاری کا بہترین ذریعہ۔',
      descEn: 'Offered right after the sun sets, expressing gratitude for the day’s blessings and sustaining guidance.',
    },
    {
      nameUrdu: 'عشاء (Isha) و وتر',
      nameEn: 'Isha & Witr',
      rakats: isUrdu ? '4 سنت + 4 فرض + 2 سنت + 2 نفل + 3 وتر + 2 نفل = 17 رکعتیں' : '4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl + 3 Witr + 2 Nafl = 17 Rakats',
      timeUrdu: 'شفق غائب ہونے سے لے کر آدھی رات تک (فجر سے پہلے)',
      timeEn: 'Nighttime after twilight until the early dawn',
      descUrdu: 'رات کے وقت عشاء اور وتر کی ادائیگی دن کا پرسکون اور بابرکت اختتام ہے۔',
      descEn: 'The final night prayer concluding the day with serenity, followed by the Witr prayer.',
    },
  ];

  const essentials = [
    {
      titleUrdu: 'نماز کی شرائط (Pre-requisites / Shuroot):',
      titleEn: 'Prerequisites of Salah:',
      pointsUrdu: [
        'طہارت (وضو یا ضرورت کی صورت میں غسل)',
        'بدن، کپڑوں اور جائے نماز کی پاکیزگی',
        'ستر کا چھپانا (لباس کا باحیاء ہونا)',
        'قبلہ رخ ہونا (کعبۃ اللہ کی سمت)',
        'نماز کا وقت ہونا',
        'دل سے نیت کرنا',
      ],
      pointsEn: [
        'Purification (Wudu or Ghusl when required)',
        'Cleanliness of body, clothes, and prayer spot',
        'Covering the Awrah appropriately',
        'Facing the Qiblah (Direction of the Kaaba)',
        'Ascertaining the entry of the prayer time',
        'Sincere intention (Niyyah) in the heart',
      ],
    },
    {
      titleUrdu: 'نماز کے بنیادی ارکان و فرائض (Arkaan of Salah):',
      titleEn: 'Core Pillars (Arkan) of Salah:',
      pointsUrdu: [
        'تکبیرِ تحریمہ (اللہ اکبر کہہ کر نماز شروع کرنا)',
        'قیام (طاقت ہو تو سیدھا کھڑا ہونا)',
        'قراءت (سورۃ الفاتحہ اور قرآن کی تلاوت)',
        'رکوع اور اطمینان کے ساتھ اٹھنا',
        'دونوں سجدے اور دونوں کے درمیان بیٹھنا (جلسہ)',
        'قعدہ اخیرہ اور تشہد پڑھنا',
        'سلام پھیرنا',
      ],
      pointsEn: [
        'Takbirat al-Ihram (commencing with Allahu Akbar)',
        'Qiyam (standing upright for those capable)',
        'Recitation of Surah Al-Fatihah and Quran',
        'Ruku (bowing down with composure)',
        'Sujud (prostration upon the 7 bones) & Jalsah',
        'Final Sitting (Qa\'dah) and Tashahhud',
        'Tasleem (concluding greetings of peace)',
      ],
    },
  ];

  const seoTitle = isUrdu
    ? 'نماز سیکھیں • اوقات، ارکان، فرائض اور طریقہ | IslamIQ'
    : 'Namaz & Salah Learning – How to Pray, Rakats & Timings | IslamIQ';

  const seoDescription = isUrdu
    ? 'نماز کا مکمل طریقہ، 5 وقت کی نماز کی رکعتیں، شرائط، فرائض، وضو کے احکام اور روزانہ کی نماز کی پابندی کا آسان طریقہ۔'
    : 'Comprehensive Islamic guide to learning Namaz (Salah). Discover step-by-step prayer methods, rakats for all 5 daily prayers, prerequisites, and our daily interactive prayer tracker.';

  const faqs = prayers.map((p) => ({
    question: isUrdu ? `${p.nameUrdu} میں کتنی رکعتیں ہوتی ہیں اور اس کا وقت کیا ہے؟` : `How many Rakats are in ${p.nameEn} prayer and what is its time?`,
    answer: isUrdu ? `رکعتیں: ${p.rakats}۔ وقت: ${p.timeUrdu}۔` : `Rakats: ${p.rakats}. Time: ${p.timeEn}.`,
  }));

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/salah-learning"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: 'Salah Learning', url: '/salah-learning' }
        ]}
        faqs={faqs}
      />

      {/* Hero */}
      <header className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'دین کا ستون' : 'The Second Pillar of Islam'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
          {isUrdu ? 'نماز سیکھیں (Namaz & Salah Learning)' : 'Namaz & Salah Learning – Step by Step Prayer Guide'}
        </h1>

        <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl">
          {isUrdu
            ? 'نماز دین کا ستون اور مؤمن کی معراج ہے۔ پانچ وقت کی فرض نمازوں کی رکعتیں، اوقات، شرائط اور روزانہ کی پابندی کے لیے رہنمائی حاصل کریں۔'
            : 'Explore the foundations, rakats, prerequisites, and spiritual discipline of the five daily prayers in Islam. Use our interactive daily tracker to never miss a prayer.'}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('salah')}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <CheckSquare className="w-4 h-4" />
            <span>{isUrdu ? 'نماز ٹریکر کھولیں (Track Salah)' : 'Open Interactive Salah Tracker'}</span>
          </button>
          <button
            onClick={() => setActiveTab('qibla')}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-emerald-100 font-semibold text-xs rounded-xl transition-all border border-emerald-400/20 flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'قبلہ رخ معلوم کریں' : 'Find Qibla Direction'}</span>
          </button>
        </div>
      </header>

      {/* 5 Daily Prayers Breakdown */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-700" />
          <span>
            {isUrdu ? 'پانچوں نمازوں کی تفصیل و رکعتیں' : 'The Five Daily Prayers & Rakats'}
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-3.5">
          {prayers.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2 hover:border-emerald-300 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-black">
                    {idx + 1}
                  </span>
                  <span>{isUrdu ? p.nameUrdu : p.nameEn}</span>
                </h3>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200/60">
                  {isUrdu ? p.rakats : p.rakats}
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <p>
                  <strong>{isUrdu ? 'اوقات: ' : 'Time Window: '}</strong>
                  <span className="text-slate-700">{isUrdu ? p.timeUrdu : p.timeEn}</span>
                </p>
                <p className="leading-relaxed text-slate-500">
                  {isUrdu ? p.descUrdu : p.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prerequisites & Arkan */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {essentials.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-emerald-900 border-b border-slate-100 pb-2">
              {isUrdu ? item.titleUrdu : item.titleEn}
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
              {(isUrdu ? item.pointsUrdu : item.pointsEn).map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <RelatedIslamicLearning currentTab="salah-learning" />
    </article>
  );
};
