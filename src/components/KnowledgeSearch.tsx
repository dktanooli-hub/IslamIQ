import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VERIFIED_QA_DATABASE } from '../data/verifiedContent';
import { Search, Bookmark, BookmarkCheck, ChevronDown, BookOpen, ShieldCheck, Tag, Sparkles } from 'lucide-react';

export const KnowledgeSearch: React.FC = () => {
  const { contentLang, userMode, bookmarkedQAs, toggleBookmarkQA } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('qa-1');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  const categories = ['All', 'Aqeedah', 'Salah', 'Fasting', 'Family', 'Manners'];

  const filteredQAs = VERIFIED_QA_DATABASE.filter(qa => {
    // Filter by bookmarks
    if (onlyBookmarks && !bookmarkedQAs.includes(qa.id)) {
      return false;
    }

    // Filter by category
    if (selectedCategory !== 'All' && qa.category !== selectedCategory) {
      return false;
    }

    // Filter by search query (Urdu & English)
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      qa.questionEn.toLowerCase().includes(q) ||
      qa.questionUrdu.toLowerCase().includes(q) ||
      qa.answerEn.toLowerCase().includes(q) ||
      qa.answerUrdu.toLowerCase().includes(q) ||
      qa.tags.some(tag => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      
      {/* Search Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Knowledge Database • مصدقہ اسلامی معلومات</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Islamic Q&A & Search
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Search verified answers on worship, belief, daily life, and family with authentic citations.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={contentLang === 'urdu' ? 'موضوع یا سوال تلاش کریں (مثلاً: وضو، توحید، نماز)...' : 'Search topic or question (e.g. Wudu, Tawhid, Salah)...'}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Category Pills & Bookmark Toggle */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar">
          <div className="flex items-center space-x-1.5 shrink-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1 transition-all ${
              onlyBookmarks
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {onlyBookmarks ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>Saved ({bookmarkedQAs.length})</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between px-2 text-xs font-semibold text-slate-500">
        <span>Showing {filteredQAs.length} verified answers</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-emerald-700 hover:underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Q&A Accordion List */}
      <div className="space-y-3">
        {filteredQAs.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Questions Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching with different keywords such as "Wudu", "Salah", "Tawhid", or "Parents".
            </p>
          </div>
        ) : (
          filteredQAs.map(qa => {
            const isExpanded = expandedId === qa.id;
            const isSaved = bookmarkedQAs.includes(qa.id);

            return (
              <div
                key={qa.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-sm transition-all overflow-hidden"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : qa.id)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50/70 select-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full">
                        {qa.category}
                      </span>
                    </div>
                    <h3 className={`text-base sm:text-lg font-bold text-slate-900 ${
                      contentLang === 'urdu' ? 'urdu-text text-lg leading-relaxed' : ''
                    }`}>
                      {contentLang === 'urdu' ? qa.questionUrdu : qa.questionEn}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0 mt-1">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleBookmarkQA(qa.id);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-amber-600 hover:bg-slate-100 transition-all"
                      title={isSaved ? 'Remove bookmark' : 'Bookmark this answer'}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-5 h-5 text-amber-600 fill-amber-500" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>
                    <div className="p-2 text-slate-400">
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-emerald-700' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 space-y-4">
                    {/* Verified Answer Body */}
                    <div className={`text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-slate-100 ${
                      contentLang === 'urdu' ? 'urdu-text text-base' : ''
                    }`}>
                      {contentLang === 'urdu' ? qa.answerUrdu : qa.answerEn}
                    </div>

                    {/* Verified Reference Citation */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center space-x-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl font-semibold">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Source: {qa.reference}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex items-center space-x-1">
                        {qa.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
