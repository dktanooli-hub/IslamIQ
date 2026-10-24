import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Library,
  BookOpen,
  Search,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Sparkles,
  ChevronRight,
  Scale,
  MessageSquare,
  Globe,
  FileText,
  CheckCircle2,
  BookmarkCheck,
  Tag
} from 'lucide-react';
import { ScholarQALibraryItem } from '../../types';

export const PublicScholarsLibraryPage: React.FC = () => {
  const {
    contentLang,
    setActiveTab,
    showToast,
    publicScholarLibrary,
    isLoadingScholarLibrary
  } = useApp();

  const isUrdu = contentLang === 'urdu';

  // Selected item for full reader view
  const [selectedQA, setSelectedQA] = useState<ScholarQALibraryItem | null>(null);

  // Search and Category filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  // Read URL query params on mount to support direct deep-linking
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const url = new URL(window.location.href);
      const slugParam = url.searchParams.get('q') || url.searchParams.get('slug');
      const idParam = url.searchParams.get('id');

      if (slugParam || idParam) {
        const found = publicScholarLibrary.find(
          item => (slugParam && item.slug === slugParam) || (idParam && item.id === idParam)
        );
        if (found) {
          setSelectedQA(found);
        }
      }
    } catch {
      // Ignored
    }
  }, [publicScholarLibrary]);

  // Handle selecting an entry
  const handleSelectQA = (item: ScholarQALibraryItem) => {
    setSelectedQA(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const newUrl = new URL(window.location.href);
      newUrl.pathname = '/scholars-library';
      newUrl.searchParams.set('q', item.slug);
      newUrl.searchParams.delete('id');
      window.history.pushState(null, '', newUrl.toString());
    } catch {}
  };

  // Handle returning to list view
  const handleBackToList = () => {
    setSelectedQA(null);
    try {
      const newUrl = new URL(window.location.href);
      newUrl.pathname = '/scholars-library';
      newUrl.searchParams.delete('q');
      newUrl.searchParams.delete('id');
      window.history.pushState(null, '', newUrl.toString());
    } catch {}
  };

  // Copy shareable link
  const handleCopyLink = () => {
    if (!selectedQA) return;
    const shareUrl = `${window.location.origin}/scholars-library?q=${selectedQA.slug}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedLink(true);
        showToast(isUrdu ? 'لنک کاپی ہو گیا!' : 'Shareable link copied to clipboard! 📋');
        setTimeout(() => setCopiedLink(false), 2500);
      });
    } else {
      showToast(shareUrl);
    }
  };

  // Available categories derived from library
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    publicScholarLibrary.forEach(item => {
      if (item.category) set.add(item.category);
    });
    return Array.from(set).sort();
  }, [publicScholarLibrary]);

  // Filtered published entries
  const filteredEntries = useMemo(() => {
    return publicScholarLibrary.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchQ = item.question.toLowerCase().includes(q);
        const matchA = item.answer.toLowerCase().includes(q);
        const matchRef = (item.referencesDetails || '').toLowerCase().includes(q);
        const matchCat = (item.category || '').toLowerCase().includes(q);
        if (!matchTitle && !matchQ && !matchA && !matchRef && !matchCat) {
          return false;
        }
      }
      return true;
    });
  }, [publicScholarLibrary, selectedCategory, searchQuery]);

  // Related entries for detail view
  const relatedEntries = useMemo(() => {
    if (!selectedQA) return [];
    return publicScholarLibrary
      .filter(item => item.id !== selectedQA.id && item.category === selectedQA.category)
      .slice(0, 3);
  }, [publicScholarLibrary, selectedQA]);

  /* ========================================================================== */
  /* DETAIL VIEW: SINGLE SCHOLAR Q&A READER                                    */
  /* ========================================================================== */
  if (selectedQA) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fadeIn pb-16">
        
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={handleBackToList}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'عوامی لائبریری کی طرف واپسی' : 'Back to Scholars Library'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-all shadow-2xs"
              title="Copy permanent shareable link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedLink ? (isUrdu ? 'کاپی شدہ' : 'Copied!') : (isUrdu ? 'لنک شیئر کریں' : 'Copy Link')}</span>
            </button>

            <button
              onClick={() => setActiveTab('ask-a-scholar')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isUrdu ? 'اپنا سوال پوچھیں' : 'Ask a Scholar'}</span>
            </button>
          </div>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Header Meta */}
          <div className="space-y-3 border-b border-slate-100 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-bold text-xs">
                <Tag className="w-3 h-3 text-teal-600" />
                <span>{selectedQA.category}</span>
              </span>

              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs uppercase font-mono">
                {selectedQA.language === 'urdu' ? 'اردو' : 'English'}
              </span>

              {selectedQA.publishedAt && (
                <span className="text-xs text-slate-400 font-medium">
                  {new Date(selectedQA.publishedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
            </div>

            {/* Title (Prominently displayed) */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
              {selectedQA.title}
            </h1>
          </div>

          {/* Section 1: Complete Question (Displayed first) */}
          <div className="rounded-2xl bg-teal-50/70 border border-teal-200/80 p-5 space-y-2">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-teal-700" />
              <span>{isUrdu ? 'مسئلہ / استفسار (The Question)' : 'Question / Seeker Inquiry'}</span>
            </div>
            <p className={`text-sm sm:text-base font-semibold text-slate-800 leading-relaxed ${
              selectedQA.language === 'urdu' ? 'urdu-text text-base sm:text-lg' : ''
            }`}>
              {selectedQA.question}
            </p>
          </div>

          {/* Section 2: Scholarly Answer */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isUrdu ? 'مستند شرعی جواب (Scholarly Answer)' : 'Verified Scholarly Answer'}</span>
            </div>

            <div className={`space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal ${
              selectedQA.language === 'urdu' ? 'urdu-text text-base sm:text-lg leading-loose' : ''
            }`}>
              {selectedQA.answer.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Section 3: References & Details (Placed strictly at the very end per requirement) */}
          {selectedQA.referencesDetails && (
            <div className="pt-4 border-t border-slate-200">
              <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <Scale className="w-4 h-4 text-amber-700" />
                  <span>{isUrdu ? 'حوالہ جات و تفاصیل (References & Details)' : 'References & Jurisprudential Details'}</span>
                </div>
                <div className="text-xs sm:text-sm text-amber-950 font-mono whitespace-pre-line leading-relaxed bg-white/70 p-3 rounded-xl border border-amber-200/60">
                  {selectedQA.referencesDetails}
                </div>
                <p className="text-[11px] text-amber-800/80 leading-normal">
                  All citations, verses, and hadiths are based on established Islamic jurisprudence and authentic classical sources.
                </p>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-1.5 font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'تمام سوالات کی فہرست' : 'All Scholars Library Q&As'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-600" />
              <span>{isUrdu ? 'شیئر کریں' : 'Share Article'}</span>
            </button>
          </div>

        </article>

        {/* Related Q&As Section */}
        {relatedEntries.length > 0 && (
          <div className="space-y-3 pt-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>{isUrdu ? 'اسی موضوع سے متعلق دیگر سوالات' : `More in ${selectedQA.category}`}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {relatedEntries.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelectQA(item)}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-xs transition-all text-left flex flex-col justify-between space-y-2 cursor-pointer"
                >
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-teal-700 font-bold inline-flex items-center gap-1">
                    <span>{isUrdu ? 'مطالعہ کریں' : 'Read Answer'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    );
  }

  /* ========================================================================== */
  /* LIST VIEW: PUBLIC SCHOLARS LIBRARY DIRECTORY                               */
  /* ========================================================================== */
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-950 p-6 sm:p-8 text-white overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-bold uppercase tracking-wider">
            <Library className="w-3.5 h-3.5 text-teal-400" />
            <span>{isUrdu ? 'عوامی لائبریری برائے علماء' : 'Public Scholars Library'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {isUrdu
              ? 'مستند اسلامی مسائل اور شرعی رہنمائی کا ذخیرہ'
              : 'Scholarly Islamic Q&A Library'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isUrdu
              ? 'فقہ، طہارت، صوم، نماز اور عام معاملات پر معتبر اور مستند فتاویٰ و تحقیقی جوابات کا مطالعہ فرمائیں۔'
              : 'Browse verified Islamic answers, jurisprudential rulings, and authentic evidence on fasting, prayer, purification, zakat, and daily living.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('ask-a-scholar')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isUrdu ? 'نیا سوال ارسال کریں' : 'Submit Private Question'}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('ask-a-scholar');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all"
            >
              <BookmarkCheck className="w-4 h-4 text-teal-300" />
              <span>{isUrdu ? 'پہلے سے بھیجے گئے سوال کی صورتحال' : 'Check Inquiry Status'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isUrdu ? 'سوال، موضوع یا حوالہ تلاش کریں...' : 'Search questions, rulings, or references...'}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="text-xs font-semibold text-slate-500 shrink-0">
            <span>{filteredEntries.length} {filteredEntries.length === 1 ? 'Entry' : 'Entries'}</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isUrdu ? 'تمام موضوعات' : 'All Topics'}
          </button>

          {availableCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      {isLoadingScholarLibrary ? (
        <div className="p-12 text-center text-slate-500 space-y-2">
          <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold">
            {isUrdu ? 'لائبریری لوڈ ہو رہی ہے...' : 'Loading Scholars Library...'}
          </p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <Library className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">
            {isUrdu ? 'کوئی جواب دستیاب نہیں' : 'No Public Q&As Found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {searchQuery || selectedCategory !== 'all'
              ? (isUrdu ? 'مطلوبہ تلاش کے مطابق کوئی اندراج نہیں ملا۔ فلٹر تبدیل کر کے دوبارہ کوشش فرمائیں۔' : 'No entries matched your search query. Try clearing filters or searching for different keywords.')
              : (isUrdu ? 'فی الوقت کوئی نیا عوامی اندراج موجود نہیں۔' : 'New verified answers are being published regularly by the scholars.')}
          </p>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
            >
              {isUrdu ? 'فلٹرز ختم کریں' : 'Reset Filters'}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEntries.map(item => (
            <div
              key={item.id}
              onClick={() => handleSelectQA(item)}
              className="bg-white rounded-3xl border border-slate-200 hover:border-teal-400 p-5 sm:p-6 transition-all hover:shadow-md cursor-pointer space-y-3 group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold uppercase font-mono">
                    {item.language === 'urdu' ? 'اردو' : 'English'}
                  </span>
                </div>

                {item.publishedAt && (
                  <span className="text-[11px] text-slate-400 font-medium">
                    {new Date(item.publishedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
                {item.title}
              </h2>

              {/* Question summary */}
              <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70 text-xs text-slate-700">
                <span className="font-bold text-teal-800 mr-1.5">
                  {isUrdu ? 'سوال:' : 'Question:'}
                </span>
                <span className={`line-clamp-2 ${item.language === 'urdu' ? 'urdu-text' : ''}`}>
                  {item.question}
                </span>
              </div>

              {/* Answer summary */}
              <p className={`text-xs text-slate-600 line-clamp-2 leading-relaxed ${
                item.language === 'urdu' ? 'urdu-text' : ''
              }`}>
                {item.answer}
              </p>

              {/* Bottom footer */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                <span className="text-[11px] text-slate-400">
                  {item.referencesDetails ? (isUrdu ? 'مستند حوالہ جات کے ساتھ' : 'Authentic citations included') : ''}
                </span>

                <span className="text-teal-700 font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{isUrdu ? 'مکمل شرعی جواب پڑھیں' : 'Read Full Answer'}</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Informative Guidance Banner */}
      <div className="rounded-2xl bg-slate-100 border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">
              {isUrdu ? 'اپنے ذاتی فقہی سوال کا حل چاہیے؟' : 'Have a personal question for the scholars?'}
            </h4>
            <p className="text-slate-500 mt-0.5">
              {isUrdu
                ? 'آپ کا سوال رازداری کے ساتھ تصدیق شدہ علماء کرام کو پیش کیا جاتا ہے۔'
                : 'Inquiries are kept confidential and answered by accredited Islamic scholars.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('ask-a-scholar')}
          className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold shrink-0 transition-all shadow-xs"
        >
          {isUrdu ? 'سوال ارسال کریں' : 'Ask a Scholar'}
        </button>
      </div>

    </div>
  );
};
