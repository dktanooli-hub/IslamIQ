import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { VERIFIED_QURAN_VERSES, VERIFIED_HADITHS, VERIFIED_DUAS } from '../data/verifiedContent';
import { Download, Share2, Copy, Check, Sparkles, RefreshCw, Palette, Type } from 'lucide-react';

interface StatusCreatorProps {
  initialText?: string;
  initialRef?: string;
}

interface TemplateStyle {
  id: string;
  name: string;
  bgClass: string;
  textColor: string;
  accentColor: string;
  cardBorder: string;
  badgeBg: string;
}

const TEMPLATES: TemplateStyle[] = [
  {
    id: 'emerald',
    name: 'Emerald Mosque',
    bgClass: 'bg-gradient-to-br from-[#064e3b] via-[#043327] to-[#022119]',
    textColor: 'text-white',
    accentColor: '#d4af37',
    cardBorder: 'border-[#d4af37]/40',
    badgeBg: 'bg-[#d4af37]/20 text-[#fef08a] border border-[#d4af37]/40'
  },
  {
    id: 'midnight',
    name: 'Midnight Gold',
    bgClass: 'bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900',
    textColor: 'text-white',
    accentColor: '#fbbf24',
    cardBorder: 'border-amber-400/30',
    badgeBg: 'bg-amber-400/20 text-amber-200 border border-amber-400/30'
  },
  {
    id: 'sand',
    name: 'Parchment Sand',
    bgClass: 'bg-gradient-to-br from-[#fefbf6] via-[#fbf7ee] to-[#f4ece0]',
    textColor: 'text-slate-900',
    accentColor: '#854d0e',
    cardBorder: 'border-amber-700/20',
    badgeBg: 'bg-amber-800/10 text-amber-900 border border-amber-700/20'
  },
  {
    id: 'royal',
    name: 'Royal Lapis',
    bgClass: 'bg-gradient-to-br from-sky-950 via-blue-900 to-indigo-950',
    textColor: 'text-white',
    accentColor: '#38bdf8',
    cardBorder: 'border-sky-400/30',
    badgeBg: 'bg-sky-400/20 text-sky-200 border border-sky-400/30'
  }
];

export const StatusCreator: React.FC<StatusCreatorProps> = ({
  initialText = 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا • إِنَّ مَعَ الْعُسْرِ يُسْرًا\n\nپس یقیناً مشکل کے ساتھ آسانی ہے، بے شک مشکل کے ساتھ آسانی ہے۔',
  initialRef = 'Surah Ash-Sharh (94:5-6)'
}) => {
  const { contentLang, showToast } = useApp();

  const [statusText, setStatusText] = useState<string>(initialText);
  const [statusRef, setStatusRef] = useState<string>(initialRef);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateStyle>(TEMPLATES[0]);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const previewCardRef = useRef<HTMLDivElement>(null);

  // Quick Presets from verified content
  const loadPreset = (type: 'verse' | 'hadith' | 'dua') => {
    if (type === 'verse') {
      const v = VERIFIED_QURAN_VERSES[Math.floor(Math.random() * VERIFIED_QURAN_VERSES.length)];
      setStatusText(`${v.arabic}\n\n${contentLang === 'urdu' ? v.translationUrdu : v.translationEn}`);
      setStatusRef(`Surah ${v.surahNameEn} (${v.surahNumber}:${v.ayahNumber})`);
    } else if (type === 'hadith') {
      const h = VERIFIED_HADITHS[Math.floor(Math.random() * VERIFIED_HADITHS.length)];
      setStatusText(`${h.arabic}\n\n${contentLang === 'urdu' ? h.textUrdu : h.textEn}`);
      setStatusRef(`${h.source} #${h.hadithNumber}`);
    } else {
      const d = VERIFIED_DUAS[Math.floor(Math.random() * VERIFIED_DUAS.length)];
      setStatusText(`${d.arabic}\n\n${d.transliteration}\n\n${contentLang === 'urdu' ? d.translationUrdu : d.translationEn}`);
      setStatusRef(d.reference);
    }
    showToast('Loaded Islamic preset ✨');
  };

  const handleCopyText = () => {
    const full = `${statusText}\n\n— ${statusRef}\nShared via IslamIQ (Learn • Quiz • Grow)`;
    navigator.clipboard.writeText(full);
    setIsCopied(true);
    showToast('Status text copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Generate image using canvas for download
  const handleDownloadImage = async () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement('canvas');
      const width = 1080;
      const height = 1350; // Standard 4:5 Instagram / WhatsApp Status ratio
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No canvas context');

      // 1. Draw Background Gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      if (selectedTemplate.id === 'emerald') {
        gradient.addColorStop(0, '#064e3b');
        gradient.addColorStop(0.6, '#043327');
        gradient.addColorStop(1, '#022119');
      } else if (selectedTemplate.id === 'midnight') {
        gradient.addColorStop(0, '#020617');
        gradient.addColorStop(0.6, '#1e1b4b');
        gradient.addColorStop(1, '#0f172a');
      } else if (selectedTemplate.id === 'sand') {
        gradient.addColorStop(0, '#fefbf6');
        gradient.addColorStop(0.6, '#fbf7ee');
        gradient.addColorStop(1, '#f4ece0');
      } else {
        gradient.addColorStop(0, '#082f49');
        gradient.addColorStop(0.6, '#1e3a8a');
        gradient.addColorStop(1, '#030712');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Decorative Islamic Border
      ctx.strokeStyle = selectedTemplate.accentColor;
      ctx.lineWidth = 6;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      ctx.lineWidth = 2;
      ctx.strokeRect(55, 55, width - 110, height - 110);

      // Corner ornaments
      const corners = [
        [55, 55],
        [width - 55, 55],
        [55, height - 55],
        [width - 55, height - 55]
      ];
      ctx.fillStyle = selectedTemplate.accentColor;
      corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Header: "IslamIQ • Learn • Quiz • Grow"
      ctx.textAlign = 'center';
      ctx.fillStyle = selectedTemplate.accentColor;
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('IslamIQ', width / 2, 130);

      ctx.font = '24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Learn • Quiz • Grow', width / 2, 170);

      // 4. Main Body Text
      const isLight = selectedTemplate.id === 'sand';
      ctx.fillStyle = isLight ? '#1e293b' : '#ffffff';
      ctx.font = '40px "Amiri", "Noto Nastaliq Urdu", serif';

      const lines = statusText.split('\n');
      let currentY = 320;
      const maxWidth = width - 200;

      lines.forEach(line => {
        if (!line.trim()) {
          currentY += 40;
          return;
        }
        // Simple word wrap
        const words = line.split(' ');
        let currentLine = '';
        for (let i = 0; i < words.length; i++) {
          const testLine = currentLine ? currentLine + ' ' + words[i] : words[i];
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(currentLine, width / 2, currentY);
            currentLine = words[i];
            currentY += 60;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          ctx.fillText(currentLine, width / 2, currentY);
          currentY += 60;
        }
      });

      // 5. Reference at the bottom
      ctx.fillStyle = selectedTemplate.accentColor;
      ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`— ${statusRef}`, width / 2, height - 140);

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `IslamIQ-Status-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      showToast('Status image downloaded! 🖼️');
    } catch (err) {
      showToast('Could not export image.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: 'IslamIQ Status',
      text: `${statusText}\n\n— ${statusRef}\nShared via IslamIQ (Learn • Quiz • Grow)`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Cancelled
      }
    } else {
      handleCopyText();
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      
      {/* Title */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold mb-1">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Status & Card Creator • اسلامی کارڈ میکر</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Islamic Status Creator
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Design high-resolution Islamic cards for WhatsApp, Instagram, and social media with authentic verses and hadiths.
        </p>

        {/* Quick presets buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500">Quick Presets:</span>
          <button
            onClick={() => loadPreset('verse')}
            className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-all"
          >
            Random Ayah
          </button>
          <button
            onClick={() => loadPreset('hadith')}
            className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 transition-all"
          >
            Random Hadith
          </button>
          <button
            onClick={() => loadPreset('dua')}
            className="px-3 py-1 rounded-xl text-xs font-bold bg-teal-50 text-teal-800 hover:bg-teal-100 transition-all"
          >
            Random Dua
          </button>
        </div>
      </div>

      {/* LIVE CARD PREVIEW */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-500">
          <span>Live Preview</span>
          <span>Card Aspect 4:5</span>
        </div>

        <div
          ref={previewCardRef}
          className={`w-full min-h-[360px] p-6 sm:p-8 rounded-3xl transition-all shadow-xl relative overflow-hidden border-4 flex flex-col justify-between ${
            selectedTemplate.bgClass
          } ${selectedTemplate.cardBorder} ${selectedTemplate.textColor}`}
        >
          {/* Subtle Islamic corner decoration */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-current opacity-40" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-current opacity-40" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-current opacity-40" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-current opacity-40" />

          {/* Top Brand Tag */}
          <div className="flex items-center justify-between z-10">
            <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${selectedTemplate.badgeBg}`}>
              IslamIQ • Learn • Quiz • Grow
            </span>
            <Sparkles className="w-4 h-4 text-goldAccent" />
          </div>

          {/* Center Main Text */}
          <div className="my-8 text-center z-10 space-y-3">
            <div className="arabic-text text-xl sm:text-2xl leading-loose drop-shadow-sm font-semibold whitespace-pre-line">
              {statusText}
            </div>
          </div>

          {/* Bottom Reference Citation */}
          <div className="text-center z-10 pt-4 border-t border-white/10">
            <p className="text-xs sm:text-sm font-bold tracking-wide" style={{ color: selectedTemplate.accentColor }}>
              — {statusRef}
            </p>
          </div>
        </div>
      </div>

      {/* Theme Picker */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
          <Palette className="w-4 h-4 text-emerald-600" />
          <span>Select Background Theme:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TEMPLATES.map(tmpl => (
            <button
              key={tmpl.id}
              onClick={() => setSelectedTemplate(tmpl)}
              className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                selectedTemplate.id === tmpl.id
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <span className="text-xs font-bold">{tmpl.name}</span>
              <div
                className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: tmpl.accentColor }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Text Customization Input */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
          <Type className="w-4 h-4 text-emerald-600" />
          <span>Edit Islamic Content / Custom Text:</span>
        </div>

        <textarea
          rows={4}
          value={statusText}
          onChange={e => setStatusText(e.target.value)}
          className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium whitespace-pre-line leading-relaxed"
          placeholder="Enter Arabic, Urdu, or English verse/hadith..."
        />

        <div>
          <label className="text-xs font-semibold text-slate-500 mb-1 block">Reference (حوالہ):</label>
          <input
            type="text"
            value={statusRef}
            onChange={e => setStatusRef(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            placeholder="e.g. Sahih Bukhari 5027"
          />
        </div>

        {/* Action Buttons: Download, Share, Copy */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          <button
            onClick={handleDownloadImage}
            disabled={isGenerating}
            className="w-full py-3 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{isGenerating ? 'Generating...' : 'Download Image'}</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Status</span>
          </button>

          <button
            onClick={handleCopyText}
            className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center justify-center gap-2"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{isCopied ? 'Copied' : 'Copy Text'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
