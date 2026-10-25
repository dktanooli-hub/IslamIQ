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
  ChevronRight,
  Scale,
  MessageSquare,
  Globe,
  CheckCircle2,
  BookmarkCheck,
  Tag,
  Languages
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

  const isSiteUrdu = contentLang === 'urdu';

  // Selected item for full reader detail view
  const [selectedQA, setSelectedQA] = useState<ScholarQALibraryItem | null>(null);

  // Active language inside the detail view reader ('english' | 'urdu')
  const [readerLang, setReaderLang] = useState<'english' | 'urdu'>('english');

  // Search and Category filters on directory listing
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  // Read URL query params on mount to support direct deep-linking (/scholars-library?q=[slug])
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
          handleSelectQA(found);
        }
      }
    } catch {
      // Ignored
    }
  }, [publicScholarLibrary]);

  // Handle selecting an entry to open dedicated detail view
  const handleSelectQA = (item: ScholarQALibraryItem) => {
    setSelectedQA(item);

    // Determine initial language for the selected item
    const hasEn = Boolean(item.titleEn && item.questionEn) || (item.language !== 'urdu' && Boolean(item.title));
    const hasUr = Boolean(item.titleUrdu && item.questionUrdu) || (item.language === 'urdu' && Boolean(item.title));

    if (isSiteUrdu && hasUr) {
      setReaderLang('urdu');
    } else if (hasEn) {
      setReaderLang('english');
    } else if (hasUr) {
      setReaderLang('urdu');
    } else {
      setReaderLang('english');
    }

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        const newUrl = new URL(window.location.href);
        newUrl.pathname = '/scholars-library';
        newUrl.searchParams.set('q', item.slug);
        newUrl.searchParams.delete('id');
        window.history.pushState(null, '', newUrl.toString());
      } catch {}
    }
  };

  // Handle returning to headings-only list view
  const handleBackToList = () => {
    setSelectedQA(null);
    if (typeof window !== 'undefined') {
      try {
        const newUrl = new URL(window.location.href);
        newUrl.pathname = '/scholars-library';
        newUrl.searchParams.delete('q');
        newUrl.searchParams.delete('id');
        window.history.pushState(null, '', newUrl.toString());
      } catch {}
    }
  };

  // Dynamic document title for SEO & bookmarking
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (selectedQA) {
      const activeTitle = (readerLang === 'urdu' ? selectedQA.titleUrdu : selectedQA.titleEn) || selectedQA.title;
      document.title = `${activeTitle} • Scholars Islamic Q&A Library | IslamIQ`;
    } else {
      document.title = 'Public Scholars Library • Islamic Q&A, Masail & Fatwas | IslamIQ';
    }
  }, [selectedQA, readerLang]);

  // Copy shareable link
  const handleCopyLink = () => {
    if (!selectedQA) return;
    const shareUrl = `${window.location.origin}/scholars-library?q=${selectedQA.slug}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedLink(true);
        showToast(isSiteUrdu ? 'مستقل لنک کاپی ہو گیا!' : 'Permanent link copied to clipboard! 📋');
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

  // Filtered published entries for Headings-Only listing
  const filteredEntries = useMemo(() => {
    return publicScholarLibrary.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = (item.title || '').toLowerCase().includes(q);
        const matchTitleEn = (item.titleEn || '').toLowerCase().includes(q);
        const matchTitleUr = (item.titleUrdu || '').toLowerCase().includes(q);
        const matchQEn = (item.questionEn || item.question || '').toLowerCase().includes(q);
        const matchQUr = (item.questionUrdu || '').toLowerCase().includes(q);
        const matchCat = (item.category || '').toLowerCase().includes(q);
        if (!matchTitle && !matchTitleEn && !matchTitleUr && !matchQEn && !matchQUr && !matchCat) {
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
  /* Complete content in strict order: Title -> Question -> Answer -> Ref      */
  /* ========================================================================== */
  if (selectedQA) {
    // Check translation availability on this specific record
    const hasEnglish = Boolean(selectedQA.titleEn && selectedQA.questionEn && selectedQA.answerEn) || (selectedQA.language !== 'urdu' && Boolean(selectedQA.title && selectedQA.question));
    const hasUrdu = Boolean(selectedQA.titleUrdu && selectedQA.questionUrdu && selectedQA.answerUrdu) || (selectedQA.language === 'urdu' && Boolean(selectedQA.title && selectedQA.question));
    const isBilingual = hasEnglish && hasUrdu;

    // Resolve active content according to readerLang
    const isDisplayUrdu = readerLang === 'urdu' && hasUrdu;

    const displayTitle = (isDisplayUrdu ? selectedQA.titleUrdu : selectedQA.titleEn) || selectedQA.title;
    const displayQuestion = (isDisplayUrdu ? selectedQA.questionUrdu : selectedQA.questionEn) || selectedQA.question;
    const displayAnswer = (isDisplayUrdu ? selectedQA.answerUrdu : selectedQA.answerEn) || selectedQA.answer;
    const displayReferences = (isDisplayUrdu ? selectedQA.referencesDetailsUrdu : selectedQA.referencesDetailsEn) || selectedQA.referencesDetails || '';

    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fadeIn pb-16">
        
        {/* Navigation & Header Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={handleBackToList}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isSiteUrdu ? 'فہرست کی طرف واپسی' : 'Back to Library Headings'}</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Language Switcher: Only displayed if BOTH English and Urdu translations exist */}
            {isBilingual && (
              <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 gap-1">
                <button
                  type="button"
                  onClick={() => setReaderLang('english')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    readerLang === 'english'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Switch to English translation"
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setReaderLang('urdu')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer urdu-text ${
                    readerLang === 'urdu'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="اردو ترجمہ ملاحظہ فرمائیں"
                >
                  اردو
                </button>
              </div>
            )}

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-all shadow-2xs cursor-pointer"
              title="Copy permanent shareable link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedLink ? (isSiteUrdu ? 'کاپی شدہ' : 'Copied!') : (isSiteUrdu ? 'لنک شیئر کریں' : 'Copy Link')}</span>
            </button>

            <button
              onClick={() => setActiveTab('ask-a-scholar')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isSiteUrdu ? 'نیا سوال پوچھیں' : 'Ask a Scholar'}</span>
            </button>
          </div>
        </div>

        {/* Article Container: Complete Content in strict hierarchy */}
        <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Header Meta Badges */}
          <div className="space-y-3 border-b border-slate-100 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-bold text-xs">
                <Tag className="w-3 h-3 text-teal-600" />
                <span>{selectedQA.category}</span>
              </span>

              {/* Language availability indicator */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs">
                <Languages className="w-3 h-3 text-slate-500" />
                <span>
                  {isBilingual
                    ? (isDisplayUrdu ? 'اردو ترجمہ (انگریزی بھی دستیاب ہے)' : 'English Version (Urdu available)')
                    : (isDisplayUrdu ? 'صرف اردو' : 'English Only')}
                </span>
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

            {/* 1. TITLE (Prominently displayed first) */}
            <h1
              className={`text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight ${
                isDisplayUrdu ? 'urdu-text text-right font-urdu text-2xl sm:text-3xl lg:text-4xl leading-relaxed' : ''
              }`}
            >
              {displayTitle}
            </h1>
          </div>

          {/* 2. QUESTION (Displayed complete second) */}
          <div className="rounded-2xl bg-teal-50/70 border border-teal-200/80 p-5 space-y-2">
            <div className={`flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wider ${
              isDisplayUrdu ? 'justify-end' : ''
            }`}>
              <BookOpen className="w-4 h-4 text-teal-700" />
              <span>{isDisplayUrdu ? 'استفسار / مسئلہ (Question)' : 'Question / Seeker Inquiry'}</span>
            </div>
            <p
              className={`text-sm sm:text-base font-semibold text-slate-800 leading-relaxed ${
                isDisplayUrdu ? 'urdu-text text-right font-urdu text-base sm:text-lg leading-loose' : ''
              }`}
            >
              {displayQuestion}
            </p>
          </div>

          {/* 3. FULL ANSWER (Displayed complete third) */}
          <div className="space-y-3 pt-2">
            <div className={`flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider ${
              isDisplayUrdu ? 'justify-end' : ''
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isDisplayUrdu ? 'مستند شرعی جواب (Scholarly Ruling)' : 'Verified Scholarly Answer'}</span>
            </div>

            <div
              className={`space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal ${
                isDisplayUrdu ? 'urdu-text text-right font-urdu text-base sm:text-lg leading-loose' : ''
              }`}
            >
              {displayAnswer.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* 4. REFERENCES & DETAILS (Placed strictly at the very end per requirement) */}
          {displayReferences && displayReferences.trim() && (
            <div className="pt-4 border-t border-slate-200">
              <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-5 space-y-2.5">
                <div className={`flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider ${
                  isDisplayUrdu ? 'justify-end' : ''
                }`}>
                  <Scale className="w-4 h-4 text-amber-700" />
                  <span>{isDisplayUrdu ? 'حوالہ جات و فقہی تفاصیل (References & Details)' : 'References & Jurisprudential Details'}</span>
                </div>

                <div
                  className={`text-xs sm:text-sm text-amber-950 font-mono whitespace-pre-line leading-relaxed bg-white/70 p-3.5 rounded-xl border border-amber-200/60 ${
                    isDisplayUrdu ? 'urdu-text text-right font-urdu text-sm sm:text-base leading-loose font-normal' : ''
                  }`}
                >
                  {displayReferences}
                </div>

                <p className={`text-[11px] text-amber-800/80 leading-normal ${isDisplayUrdu ? 'text-right urdu-text' : ''}`}>
                  {isDisplayUrdu
                    ? 'تمام قرآنی آیات، احادیث نبویہ اور فقہی حوالے معتبر ائمہ اور کتبِ فقہ کی تصریحات کے مطابق ہیں۔'
                    : 'All citations, verses, and hadiths are based on established Islamic jurisprudence and authentic classical sources.'}
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
              <span>{isSiteUrdu ? 'تمام سوالات کے عنوانات' : 'All Scholars Library Headings'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-600" />
              <span>{isSiteUrdu ? 'شیئر کریں' : 'Share Article'}</span>
            </button>
          </div>

        </article>

        {/* Related Q&As Section (Headings only) */}
        {relatedEntries.length > 0 && (
          <div className="space-y-3 pt-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-600" />
              <span>{isSiteUrdu ? 'اسی موضوع سے متعلق مزید عنوانات' : `More in ${selectedQA.category}`}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {relatedEntries.map(item => {
                const relTitle = (isDisplayUrdu && item.titleUrdu ? item.titleUrdu : item.titleEn) || item.title;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectQA(item)}
                    className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all text-left flex flex-col justify-between space-y-2 cursor-pointer"
                  >
                    <h4 className={`font-bold text-xs text-slate-900 line-clamp-2 leading-snug ${
                      isDisplayUrdu && item.titleUrdu ? 'urdu-text text-right font-urdu text-sm' : ''
                    }`}>
                      {relTitle}
                    </h4>
                    <span className="text-[11px] text-teal-700 font-bold inline-flex items-center gap-1">
                      <span>{isSiteUrdu ? 'مطالعہ فرمائیں' : 'Read Ruling'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    );
  }

  /* ========================================================================== */
  /* LIST VIEW: PUBLIC SCHOLARS LIBRARY DIRECTORY                               */
  /* Clean Headings-Only Listing: Titles only, no long descriptions or answers  */
  /* ========================================================================== */
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-950 p-6 sm:p-8 text-white overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-bold uppercase tracking-wider">
            <Library className="w-3.5 h-3.5 text-teal-400" />
            <span>{isSiteUrdu ? 'عوامی لائبریری برائے علماء' : 'Public Scholars Library'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {isSiteUrdu
              ? 'مستند اسلامی مسائل اور شرعی رہنمائی کا ذخیرہ'
              : 'Scholarly Islamic Q&A Library'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isSiteUrdu
              ? 'فقہ، طہارت، صوم، نماز اور روزمرہ معاملات پر تصدیق شدہ شرعی جوابات کے عنوانات ملاحظہ فرمائیں۔ کسی بھی عنوان پر کلک کر کے مکمل سوال، جواب اور مستند حوالہ جات دیکھیں۔'
              : 'Browse verified Islamic rulings and jurisprudential guidance. Click on any title below to open its dedicated page with the complete question, scholarly answer, and authentic citations.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('ask-a-scholar')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isSiteUrdu ? 'نیا سوال ارسال کریں' : 'Submit Private Question'}</span>
            </button>

            <button
              onClick={() => setActiveTab('ask-a-scholar')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all cursor-pointer"
            >
              <BookmarkCheck className="w-4 h-4 text-teal-300" />
              <span>{isSiteUrdu ? 'پہلے سے بھیجے گئے سوال کی صورتحال' : 'Check Inquiry Status'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Topic Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isSiteUrdu ? 'عنوان یا موضوع تلاش کریں...' : 'Search by title or topic...'}
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
            <span>{filteredEntries.length} {filteredEntries.length === 1 ? (isSiteUrdu ? 'عنوان' : 'Ruling') : (isSiteUrdu ? 'عنوانات' : 'Rulings')}</span>
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
            {isSiteUrdu ? 'تمام موضوعات' : 'All Topics'}
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

      {/* Directory Grid: Headings-Only Listing */}
      {isLoadingScholarLibrary ? (
        <div className="p-12 text-center text-slate-500 space-y-2">
          <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold">
            {isSiteUrdu ? 'لائبریری لوڈ ہو رہی ہے...' : 'Loading Scholars Library...'}
          </p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <Library className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">
            {isSiteUrdu ? 'کوئی عنوان دستیاب نہیں' : 'No Public Q&A Headings Found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {searchQuery || selectedCategory !== 'all'
              ? (isSiteUrdu ? 'مطلوبہ تلاش کے مطابق کوئی اندراج نہیں ملا۔ فلٹر تبدیل کر کے دوبارہ کوشش فرمائیں۔' : 'No entries matched your search query. Try clearing filters or searching for different keywords.')
              : (isSiteUrdu ? 'فی الوقت کوئی نیا عوامی اندراج موجود نہیں۔' : 'New verified rulings are being added regularly by the scholars.')}
          </p>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              {isSiteUrdu ? 'فلٹرز ختم کریں' : 'Reset Filters'}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredEntries.map(item => {
            const hasEn = Boolean(item.titleEn && item.questionEn) || (item.language !== 'urdu' && Boolean(item.title));
            const hasUr = Boolean(item.titleUrdu && item.questionUrdu) || (item.language === 'urdu' && Boolean(item.title));
            const isBilingual = hasEn && hasUr;

            // Preferred title based on active site language
            const primaryTitle = (isSiteUrdu && item.titleUrdu ? item.titleUrdu : item.titleEn) || item.title;
            const secondaryTitle = (isSiteUrdu && item.titleUrdu ? item.titleEn : (item.titleUrdu !== primaryTitle ? item.titleUrdu : null));

            return (
              <div
                key={item.id}
                onClick={() => handleSelectQA(item)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-teal-500 p-4 sm:p-5 transition-all hover:shadow-sm cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1.5 flex-1">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold">
                      {item.category}
                    </span>

                    {/* Language Badge */}
                    {isBilingual ? (
                      <span className="px-2 py-0.5 rounded-md bg-teal-100/70 border border-teal-300 text-teal-900 text-[10px] font-bold">
                        🇬🇧 English + 🇵🇰 اردو
                      </span>
                    ) : hasUr ? (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold">
                        🇵🇰 اردو
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        🇬🇧 English
                      </span>
                    )}

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

                  {/* Clickable Heading (Only Title, strictly no answers or summaries on listing) */}
                  <h2
                    className={`text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors leading-snug ${
                      isSiteUrdu && item.titleUrdu ? 'urdu-text text-right font-urdu text-base sm:text-lg' : ''
                    }`}
                  >
                    {primaryTitle}
                  </h2>

                  {/* Secondary title subtitle if bilingual */}
                  {secondaryTitle && (
                    <p className={`text-xs text-slate-400 line-clamp-1 ${
                      isSiteUrdu ? '' : 'urdu-text font-urdu'
                    }`}>
                      {secondaryTitle}
                    </p>
                  )}
                </div>

                {/* Read Action Button */}
                <div className="flex items-center gap-1 text-xs font-bold text-teal-700 group-hover:text-teal-900 shrink-0 self-end sm:self-center">
                  <span>{isSiteUrdu ? 'مکمل فتویٰ و دلائل' : 'Read Ruling & Evidence'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Seeker Guidance Footer Banner */}
      <div className="rounded-2xl bg-slate-100 border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">
              {isSiteUrdu ? 'کیا آپ کا کوئی ذاتی فقہی مسئلہ ہے؟' : 'Have a personal question for accredited scholars?'}
            </h4>
            <p className="text-slate-500 mt-0.5">
              {isSiteUrdu
                ? 'اپنا سوال رازداری کے ساتھ تصدیق شدہ علماء کرام کو پیش کریں۔ آپ کو نجی ٹریکنگ کوڈ فراہم کیا جائے گا۔'
                : 'Inquiries are kept confidential and answered directly by qualified Islamic scholars.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('ask-a-scholar')}
          className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold shrink-0 transition-all shadow-xs cursor-pointer"
        >
          {isSiteUrdu ? 'سوال ارسال کریں' : 'Ask a Scholar'}
        </button>
      </div>

    </div>
  );
};
