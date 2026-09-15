import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { Compass, BookOpen, Star, ShieldCheck, Award, Layers, Users, Sparkles } from 'lucide-react';

export const IslamicGeneralKnowledgeHub: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  const topics = [
    {
      id: 'pillars',
      titleUrdu: 'ارکانِ اسلام (5 Pillars of Islam)',
      titleEn: '5 Pillars of Islam',
      itemsUrdu: [
        'شہادت: اللہ کے سوا کوئی معبود نہیں اور محمدﷺ اللہ کے رسول ہیں۔',
        'صلاۃ: روزانہ پانچ وقت کی نماز باقاعدگی سے ادا کرنا۔',
        'زکوٰۃ: صاحبِ نصاب مسلمانوں کی طرف سے سالانہ مال کا مخصوص حصہ غریبوں کو دینا۔',
        'صوم: ماہِ رمضان المبارک کے روزے رکھنا۔',
        'حج: استطاعت رکھنے والوں کے لیے زندگی میں ایک بار بیت اللہ کا حج کرنا۔',
      ],
      itemsEn: [
        'Shahadah: Sincere declaration of faith in the oneness of Allah and the prophethood of Muhammad ﷺ.',
        'Salah: Establishing the 5 daily ritual prayers.',
        'Zakat: Giving obligatory annual charity on surplus wealth to eligible categories.',
        'Sawm: Fasting during the holy month of Ramadan from dawn to dusk.',
        'Hajj: Pilgrimage to Makkah once in a lifetime for those financially and physically capable.',
      ],
    },
    {
      id: 'iman',
      titleUrdu: 'ایمانیات کے بنیادی ارکان (Pillars of Faith)',
      titleEn: 'Pillars of Iman (Faith)',
      itemsUrdu: [
        'اللہ تعالیٰ کی وحدانیت پر ایمان',
        'اللہ کے معصوم فرشتوں (جیسے حضرت جبرائیل، میکائیل) پر ایمان',
        'آسمانی کتب (تورات، زبور، انجیل، اور آخری کتاب قرآنِ مجید) پر ایمان',
        'اللہ کے تمام سچے انبیاء و رسل علیہم السلام پر ایمان',
        'یومِ آخرت (قیامت، حساب و کتاب، جنت و دوزخ) پر ایمان',
        'تقدیر کی اچھائی اور برائی اللہ کی مشیت سے ہونے پر ایمان',
      ],
      itemsEn: [
        'Belief in the Oneness of Allah (Tawheed)',
        'Belief in Allah\'s Angels (including Jibreel, Mikaeel, etc.)',
        'Belief in Divine Revelations (Torah, Zabur, Injeel, and the Final Quran)',
        'Belief in all the Prophets & Messengers of Allah',
        'Belief in the Day of Judgment (Resurrection, Reckoning, Jannah & Jahannam)',
        'Belief in Divine Decree (Qadar, good and hardship)',
      ],
    },
    {
      id: 'prophets',
      titleUrdu: 'انبیاء کرام علیہم السلام (The Prophets in Islam)',
      titleEn: 'The Blessed Prophets in Islam',
      itemsUrdu: [
        'حضرت آدم علیہ السلام: نسلِ انسانی کے جدِ امجد اور سب سے پہلے نبی۔',
        'حضرت نوح علیہ السلام: طوفان کے دوران اہل ایمان کی کشتی بنا کر رہنمائی کی۔',
        'حضرت ابراہیم علیہ السلام: خلیل اللہ، کعبہ شریف کے بانی اور توحید کے امام۔',
        'حضرت موسیٰ علیہ السلام: کلیم اللہ، جنہیں بنی اسرائیل کی طرف مبعوث کیا گیا۔',
        'حضرت عیسیٰ علیہ السلام: اللہ کے برگزیدہ رسول اور روح اللہ۔',
        'حضرت محمد مصطفیٰ ﷺ: خاتم النبیین اور تمام جہانوں کے لیے رحمت۔',
      ],
      itemsEn: [
        'Prophet Adam (AS): The first human being and the first prophet.',
        'Prophet Nuh (AS): Prophet who built the Ark by divine command during the great deluge.',
        'Prophet Ibrahim (AS): The Friend of Allah (Khalilullah) and patriarch of monotheism.',
        'Prophet Musa (AS): Kalimullah, sent with divine signs to Pharaoh and Bani Israel.',
        'Prophet Isa (AS): A revered noble prophet and Spirit from Allah.',
        'Prophet Muhammad ﷺ: The Seal of the Prophets (Khatam an-Nabiyyin), sent as mercy to all mankind.',
      ],
    },
    {
      id: 'quran_facts',
      titleUrdu: 'قرآنِ مجید سے متعلق ضروری معلومات',
      titleEn: 'Essential Quran Facts',
      itemsUrdu: [
        'قرآن مجید میں کل 114 سورتیں اور 30 پارے ہیں۔',
        'سب سے بڑی سورۃ: سورۃ البقرہ (286 آیات)۔',
        'سب سے چھوٹی سورۃ: سورۃ الکوثر (3 آیات)۔',
        'قرآنِ مجید کی پہلی وحی: غارِ حرا میں سورۃ العلق کی ابتدائی 5 آیات۔',
        'سورۃ التوبہ کے شروع میں بسم اللہ نہیں لکھی جاتی، جبکہ سورۃ النمل میں دو بار بسم اللہ ہے۔',
      ],
      itemsEn: [
        'The Holy Quran consists of 114 Surahs and 30 Juz (Paras).',
        'Longest Surah: Surah Al-Baqarah (286 Ayahs).',
        'Shortest Surah: Surah Al-Kawthar (3 Ayahs).',
        'First Revelation: The first 5 verses of Surah Al-Alaq in Cave Hira.',
        'Surah At-Tawbah begins without Bismillah, while Surah An-Naml contains Bismillah twice.',
      ],
    },
  ];

  const filteredTopics = selectedTopic === 'all'
    ? topics
    : topics.filter((t) => t.id === selectedTopic);

  const seoTitle = isUrdu
    ? 'اسلامی جنرل نالج • تاریخ، انبیاء، ارکان اور اہم معلومات | IslamIQ'
    : 'Islamic General Knowledge – Pillars, Prophets & Quran Facts | IslamIQ';

  const seoDescription = isUrdu
    ? 'اسلامی تاریخ، 5 ارکانِ اسلام، ارکانِ ایمان، انبیاء کرام اور قرآن پاک سے متعلق مستند اور بنیادی اسلامی جنرل نالج۔'
    : 'Comprehensive Islamic general knowledge guide covering the 5 Pillars of Islam, 6 Pillars of Faith, Prophets in the Quran, and Islamic historical milestones.';

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/islamic-general-knowledge"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: 'Islamic General Knowledge', url: '/islamic-general-knowledge' }
        ]}
      />

      {/* Hero */}
      <header className="bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'دینی معلومات کا انسائیکلوپیڈیا' : 'Encyclopedia of Islamic Knowledge'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
          {isUrdu ? 'اسلامی جنرل نالج (Islamic General Knowledge)' : 'Islamic General Knowledge – Key Pillars & Quran Facts'}
        </h1>

        <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl">
          {isUrdu
            ? 'ارکانِ اسلام، ارکانِ ایمان، انبیائے کرام کی سیرت اور قرآنِ پاک کے بارے میں اہم اور مصدقہ معلومات جو ہر مسلمان بچے اور بڑے کے علم میں ہونی چاہییں۔'
            : 'Explore foundational knowledge regarding monotheism, the noble Messengers, the Holy Quran, and the core practices that define Islam.'}
        </p>

        <div className="pt-2 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('islamic-quiz')}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            <span>{isUrdu ? 'کوئز میں معلومات آزمائیں' : 'Test in Islamic Quiz'}</span>
          </button>
        </div>
      </header>

      {/* Topics Filters */}
      <section className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTopic('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            selectedTopic === 'all'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {isUrdu ? 'تمام موضوعات' : 'All Topics'}
        </button>
        {topics.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTopic(t.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedTopic === t.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isUrdu ? t.titleUrdu.split('(')[0] : t.titleEn}
          </button>
        ))}
      </section>

      {/* Cards List */}
      <section className="space-y-4">
        {filteredTopics.map((topic, idx) => (
          <div
            key={topic.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4 hover:border-emerald-300 transition-colors"
          >
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 text-sm font-black flex items-center justify-center">
                {idx + 1}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {isUrdu ? topic.titleUrdu : topic.titleEn}
              </h2>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {(isUrdu ? topic.itemsUrdu : topic.itemsEn).map((point, pIdx) => (
                <li key={pIdx} className="flex items-start gap-3 p-2 rounded-xl bg-slate-50/70 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <RelatedIslamicLearning currentTab="islamic-general-knowledge" />
    </article>
  );
};
