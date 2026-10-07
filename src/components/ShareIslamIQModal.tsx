import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useApp } from '../context/AppContext';
import { SHARE_CONFIG } from '../config/shareConfig';
import {
  X,
  Share2,
  Download,
  Copy,
  Check,
  Sparkles,
  QrCode,
  ExternalLink,
  MessageCircle,
  HeartHandshake
} from 'lucide-react';

export const ShareIslamIQModal: React.FC = () => {
  const { isShareOpen, setIsShareOpen, contentLang, showToast } = useApp();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [canNativeShareFiles, setCanNativeShareFiles] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isUrdu = contentLang === 'urdu';

  // Generate real scannable QR Code on mount or whenever destination changes
  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(SHARE_CONFIG.QR_DESTINATION_URL, {
      width: 400,
      margin: 1,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#064e3b', // Deep Islamic emerald
        light: '#ffffff'
      }
    })
      .then((url) => {
        if (isMounted) setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('QR generation failed:', err);
      });

    // Check native sharing capabilities
    if (typeof navigator !== 'undefined' && typeof navigator.canShare === 'function') {
      try {
        const dummyFile = new File([''], 'test.png', { type: 'image/png' });
        setCanNativeShareFiles(navigator.canShare({ files: [dummyFile] }));
      } catch {
        setCanNativeShareFiles(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsShareOpen(false);
    };
    if (isShareOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isShareOpen, setIsShareOpen]);

  if (!isShareOpen) return null;

  /**
   * Helper to draw wrapped text on HTML5 Canvas with proper RTL support
   */
  const drawWrappedTextRtl = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    startY: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const words = text.split(' ');
    let currentLine = '';
    let y = startY;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? currentLine + ' ' + words[i] : words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(currentLine, x, y);
        currentLine = words[i];
        y += lineHeight;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      ctx.fillText(currentLine, x, y);
      y += lineHeight;
    }
    return y;
  };

  /**
   * Helper to draw rounded rectangle on Canvas
   */
  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  /**
   * Render High-Resolution 1080x1350 Share Card on Canvas
   */
  const generateCanvasImage = async (): Promise<HTMLCanvasElement> => {
    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = 1350; // Standard 4:5 vertical social ratio
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // 1. Soft Elegant Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#f8faf9');
    bgGradient.addColorStop(0.35, '#ffffff');
    bgGradient.addColorStop(0.75, '#f0fdf4');
    bgGradient.addColorStop(1, '#ecfdf5');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative Islamic top arches (subtle watermarks)
    ctx.save();
    ctx.strokeStyle = 'rgba(5, 150, 105, 0.08)';
    ctx.lineWidth = 12;
    for (let radius = 180; radius <= 420; radius += 60) {
      ctx.beginPath();
      ctx.arc(width / 2, -40, radius, 0, Math.PI);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Outer & Inner Ornamental Borders
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 4;
    roundRect(ctx, 36, 36, width - 72, height - 72, 36);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(217, 119, 6, 0.55)'; // Gold accent
    ctx.lineWidth = 2;
    roundRect(ctx, 48, 48, width - 96, height - 96, 30);
    ctx.stroke();

    // Corner decorative rosettes
    const corners = [
      [48, 48],
      [width - 48, 48],
      [48, height - 48],
      [width - 48, height - 48]
    ];
    ctx.fillStyle = '#d97706';
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Header Branding & Emblem
    const emblemX = width / 2;
    const emblemY = 115;
    const emblemSize = 74;

    // Logo badge background
    const emblemGrad = ctx.createLinearGradient(
      emblemX - emblemSize / 2,
      emblemY - emblemSize / 2,
      emblemX + emblemSize / 2,
      emblemY + emblemSize / 2
    );
    emblemGrad.addColorStop(0, '#047857');
    emblemGrad.addColorStop(1, '#064e3b');
    ctx.fillStyle = emblemGrad;
    roundRect(
      ctx,
      emblemX - emblemSize / 2,
      emblemY - emblemSize / 2,
      emblemSize,
      emblemSize,
      20
    );
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // "IQ" text inside logo emblem
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('IQ', emblemX, emblemY + 2);

    // App Name & Tagline
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#064e3b';
    ctx.font = '800 42px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(SHARE_CONFIG.APP_NAME, width / 2, 202);

    ctx.fillStyle = '#059669';
    ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(SHARE_CONFIG.TAGLINE, width / 2, 235);

    // 4. Prominent Header Banner: "✦ SHARE ISLAMIQ ✦"
    const bannerY = 265;
    const bannerW = 460;
    const bannerH = 54;
    const bannerX = (width - bannerW) / 2;

    const bannerGrad = ctx.createLinearGradient(bannerX, bannerY, bannerX + bannerW, bannerY);
    bannerGrad.addColorStop(0, '#064e3b');
    bannerGrad.addColorStop(0.5, '#047857');
    bannerGrad.addColorStop(1, '#064e3b');
    ctx.fillStyle = bannerGrad;
    roundRect(ctx, bannerX, bannerY, bannerW, bannerH, 27);
    ctx.fill();
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.7)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`✦ ${SHARE_CONFIG.CARD_HEADING} ✦`, width / 2, bannerY + 36);

    // Subtitle
    ctx.fillStyle = '#047857';
    ctx.font = 'bold 22px "Noto Nastaliq Urdu", "Amiri", serif';
    ctx.fillText('صدقہ جاریہ • دعوتِ خیر و برکت', width / 2, bannerY + 84);

    // 5. Main Urdu Message Container Card
    const msgCardX = 85;
    const msgCardY = 385;
    const msgCardW = width - 170;
    const msgCardH = 340;

    ctx.fillStyle = '#ffffff';
    roundRect(ctx, msgCardX, msgCardY, msgCardW, msgCardH, 28);
    ctx.fill();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Subtle inner tint
    ctx.fillStyle = 'rgba(236, 253, 245, 0.65)';
    roundRect(ctx, msgCardX + 8, msgCardY + 8, msgCardW - 16, msgCardH - 16, 22);
    ctx.fill();

    // Urdu message text with RTL alignment
    ctx.textAlign = 'right';
    ctx.fillStyle = '#064e3b';
    ctx.font = '600 31px "Noto Nastaliq Urdu", "Amiri", serif';
    const textStartX = msgCardX + msgCardW - 38;
    const textStartY = msgCardY + 68;
    const textMaxWidth = msgCardW - 76;
    const textLineHeight = 52;

    drawWrappedTextRtl(
      ctx,
      SHARE_CONFIG.MAIN_URDU_MESSAGE,
      textStartX,
      textStartY,
      textMaxWidth,
      textLineHeight
    );

    // 6. Scannable QR Code Section
    const qrContainerX = 140;
    const qrContainerY = 755;
    const qrContainerW = width - 280;
    const qrContainerH = 350;

    ctx.fillStyle = '#ffffff';
    roundRect(ctx, qrContainerX, qrContainerY, qrContainerW, qrContainerH, 28);
    ctx.fill();
    ctx.strokeStyle = 'rgba(5, 150, 105, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw real QR Code Image if available
    if (qrDataUrl) {
      const qrImg = new Image();
      qrImg.crossOrigin = 'anonymous';
      qrImg.src = qrDataUrl;
      await new Promise((resolve) => {
        qrImg.onload = resolve;
        qrImg.onerror = resolve; // Continue even if load fails
      });
      const qrSize = 220;
      const qrX = width / 2 - qrSize / 2;
      const qrY = qrContainerY + 24;
      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
    }

    // Label: "Scan to Open IslamIQ"
    ctx.textAlign = 'center';
    ctx.fillStyle = '#064e3b';
    ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(SHARE_CONFIG.QR_LABEL_EN, width / 2, qrContainerY + 276);

    ctx.fillStyle = '#059669';
    ctx.font = 'bold 20px "Noto Nastaliq Urdu", "Amiri", serif';
    ctx.fillText(SHARE_CONFIG.QR_LABEL_URDU, width / 2, qrContainerY + 306);

    // URL badge pill
    ctx.fillStyle = '#047857';
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`🔗 ${SHARE_CONFIG.APP_DOMAIN}`, width / 2, qrContainerY + 334);

    // 7. Clear "SHARE NOW" Button on the card
    const btnY = 1130;
    const btnW = 440;
    const btnH = 68;
    const btnX = (width - btnW) / 2;

    const btnGrad = ctx.createLinearGradient(btnX, btnY, btnX + btnW, btnY + btnH);
    btnGrad.addColorStop(0, '#064e3b');
    btnGrad.addColorStop(1, '#047857');
    ctx.fillStyle = btnGrad;
    roundRect(ctx, btnX, btnY, btnW, btnH, 34);
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.font = '800 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`📲 ${SHARE_CONFIG.BUTTON_SHARE_NOW_EN} • ${SHARE_CONFIG.BUTTON_SHARE_NOW_URDU}`, width / 2, btnY + 44);

    // 8. Footer Brand Credits
    ctx.fillStyle = '#64748b';
    ctx.font = '600 19px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(
      'IslamIQ • Daily Quran, Authentic Hadith, Salah Tracker & Islamic Quizzes',
      width / 2,
      1240
    );

    ctx.fillStyle = '#059669';
    ctx.font = 'bold 17px "Noto Nastaliq Urdu", "Amiri", serif';
    ctx.fillText('قیامت تک جاری صدقہ جاریہ • مفت اسلامی تعلیمی ایپ', width / 2, 1272);

    return canvas;
  };

  /**
   * Main Share Action: Native Phone Share Sheet with Generated Image
   */
  const handleShareNow = async () => {
    setIsGenerating(true);
    try {
      const canvas = await generateCanvasImage();

      // Convert to blob
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/png')
      );

      if (!blob) throw new Error('Failed to generate image blob');

      const file = new File([blob], 'IslamIQ-Share-Card.png', {
        type: 'image/png',
        lastModified: Date.now()
      });

      // 1. If native sharing supports file attachments (Mobile browsers)
      if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'IslamIQ • Share with Family & Friends',
          text: SHARE_CONFIG.SHARE_TEXT_FULL
        });
        showToast('Shared successfully! جزاکم اللہ خیراً ✨');
      } else if (typeof navigator !== 'undefined' && navigator.share) {
        // 2. Fallback to standard native share with text + download image
        await navigator.share({
          title: 'IslamIQ • Learn • Quiz • Grow',
          text: SHARE_CONFIG.SHARE_TEXT_FULL,
          url: SHARE_CONFIG.QR_DESTINATION_URL
        });
        showToast('Shared! ✨');
      } else {
        // 3. Fallback on desktop / non-share browsers: Download image + copy text
        handleDownloadImage();
        handleCopyLink();
      }
    } catch (err: unknown) {
      if ((err as Error)?.name !== 'AbortError') {
        console.error('Sharing failed:', err);
        // Fallback to downloading image directly
        handleDownloadImage();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Download the generated card image as PNG
   */
  const handleDownloadImage = async () => {
    setIsGenerating(true);
    try {
      const canvas = await generateCanvasImage();
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `IslamIQ-Share-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      showToast('Share card image downloaded! 🖼️');
    } catch (err) {
      console.error('Download failed:', err);
      showToast('Could not download image.');
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * WhatsApp direct share with text and link
   */
  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(SHARE_CONFIG.SHARE_TEXT_FULL);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  /**
   * Copy the destination link
   */
  const handleCopyLink = () => {
    navigator.clipboard.writeText(SHARE_CONFIG.QR_DESTINATION_URL);
    setIsCopied(true);
    showToast('Link copied to clipboard! (لنک کاپی ہو گیا)');
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div className="relative w-full max-w-lg my-auto bg-white rounded-3xl shadow-2xl border border-emerald-800/30 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#064e3b] text-white shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-goldAccent/20 border border-goldAccent/40 flex items-center justify-center text-goldAccent font-bold text-sm">
              IQ
            </div>
            <div>
              <h2 id="share-modal-title" className="text-sm sm:text-base font-extrabold tracking-wide text-white flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-goldAccent" />
                <span>{isUrdu ? 'ایپ شیئر کریں (صدقہ جاریہ)' : 'Share IslamIQ'}</span>
              </h2>
              <p className="text-[10px] sm:text-xs text-emerald-200">
                {SHARE_CONFIG.CARD_SUBHEADING_URDU}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsShareOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/20 active:scale-95 text-white/90 hover:text-white transition-all focus:outline-none"
            aria-label="Close Share Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable Preview */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-slate-800">
          
          {/* Informational intro banner */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold text-emerald-950">
                {isUrdu ? 'دعوتِ خیر اور صدقہ جاریہ' : 'Sadaqah Jariyah Opportunity'}
              </p>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                {isUrdu
                  ? 'اس خوبصورت کارڈ کو اپنے واٹس ایپ اسٹیٹس، گروپس اور دوستوں کے ساتھ شیئر کریں اور قیامت تک جاری ثواب حاصل کریں۔'
                  : 'Share this elegant Islamic card on WhatsApp Status, Facebook, or Instagram to earn continuous rewards.'}
              </p>
            </div>
          </div>

          {/* Interactive Live Preview of the Islamic Share Card */}
          <div
            ref={cardRef}
            className="relative rounded-3xl border-2 border-emerald-600/40 p-4 sm:p-5 bg-gradient-to-b from-[#f8faf9] via-white to-emerald-50/50 shadow-md overflow-hidden text-center"
          >
            {/* Corner gold rosettes */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-goldAccent" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-goldAccent" />
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-goldAccent" />
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-goldAccent" />

            {/* Card Logo & Header */}
            <div className="flex flex-col items-center justify-center space-y-1 mb-2.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-950 text-goldAccent font-extrabold text-xl flex items-center justify-center shadow-md border-2 border-goldAccent/50">
                IQ
              </div>
              <h3 className="text-lg font-black tracking-tight text-emerald-950">
                {SHARE_CONFIG.APP_NAME}
              </h3>
              <p className="text-[11px] font-semibold text-emerald-700">
                {SHARE_CONFIG.TAGLINE}
              </p>
            </div>

            {/* Pill Banner: SHARE ISLAMIQ */}
            <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-goldAccent text-xs sm:text-sm font-extrabold tracking-widest shadow-sm border border-goldAccent/40 mb-3">
              ✦ {SHARE_CONFIG.CARD_HEADING} ✦
            </div>

            {/* Main Urdu Message Box (Clean, Elegant, RTL) */}
            <div
              dir="rtl"
              className="bg-white/95 rounded-2xl p-3.5 sm:p-4 border-2 border-emerald-500/40 shadow-xs mb-4 text-right"
            >
              <p className="text-xs sm:text-sm leading-relaxed text-emerald-950 font-medium urdu-text select-text">
                {SHARE_CONFIG.MAIN_URDU_MESSAGE}
              </p>
            </div>

            {/* QR Code Container with real scannable code */}
            <div className="bg-white rounded-2xl p-3 border border-emerald-200/80 shadow-xs max-w-[260px] mx-auto flex flex-col items-center justify-center space-y-2 mb-3">
              {qrDataUrl ? (
                <div className="p-1 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <img
                    src={qrDataUrl}
                    alt="Scan to Open IslamIQ QR Code"
                    className="w-36 h-36 sm:w-40 sm:h-40 object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-36 h-36 flex items-center justify-center bg-slate-50 rounded-xl">
                  <QrCode className="w-8 h-8 text-emerald-600 animate-pulse" />
                </div>
              )}

              <div className="space-y-0.5 text-center">
                <p className="text-xs font-extrabold text-emerald-950 tracking-tight">
                  {SHARE_CONFIG.QR_LABEL_EN}
                </p>
                <p className="text-[11px] font-bold text-emerald-700 urdu-text">
                  {SHARE_CONFIG.QR_LABEL_URDU}
                </p>
                <span className="inline-block text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full mt-1">
                  🌐 {SHARE_CONFIG.APP_DOMAIN}
                </span>
              </div>
            </div>

            {/* Embedded "SHARE NOW" badge on the card */}
            <div className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-gradient-to-r from-emerald-800 to-emerald-900 text-goldAccent text-xs sm:text-sm font-extrabold shadow-sm border border-goldAccent/40">
              <Share2 className="w-3.5 h-3.5 mr-1.5" />
              <span>{SHARE_CONFIG.BUTTON_SHARE_NOW_EN} • {SHARE_CONFIG.BUTTON_SHARE_NOW_URDU}</span>
            </div>

            <p className="text-[10px] text-slate-400 mt-2 font-medium">
              IslamIQ • Free Islamic Educational Platform
            </p>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="space-y-2 pt-1">
            
            {/* Primary Action: SHARE NOW */}
            <button
              onClick={handleShareNow}
              disabled={isGenerating}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 hover:from-emerald-800 hover:to-emerald-950 text-white font-extrabold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-md transition-all active:scale-[0.98] disabled:opacity-70 border border-goldAccent/30"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  <span>{isUrdu ? 'کارڈ تیار کیا جا رہا ہے...' : 'Generating Share Card...'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-goldAccent" />
                  <span>{SHARE_CONFIG.BUTTON_SHARE_NOW_EN}</span>
                  <span className="opacity-80 text-xs">({SHARE_CONFIG.BUTTON_SHARE_NOW_URDU})</span>
                </>
              )}
            </button>

            {/* Secondary Actions Grid */}
            <div className="grid grid-cols-3 gap-2">
              
              {/* WhatsApp Direct */}
              <button
                onClick={handleWhatsAppShare}
                className="py-2.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-2xs"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </button>

              {/* Download PNG */}
              <button
                onClick={handleDownloadImage}
                disabled={isGenerating}
                className="py-2.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-2xs disabled:opacity-50"
                title="Download High-Resolution Image"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>{isUrdu ? 'تصویر ڈاؤن لوڈ' : 'Download'}</span>
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="py-2.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-2xs"
                title="Copy Destination Link"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">{isUrdu ? 'کاپی شدہ' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-600" />
                    <span>{isUrdu ? 'لنک کاپی' : 'Copy Link'}</span>
                  </>
                )}
              </button>

            </div>

            {/* Note on Google Play ready configuration */}
            <div className="pt-1 text-center">
              <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <span>QR Destination:</span>
                <a
                  href={SHARE_CONFIG.QR_DESTINATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline font-semibold flex items-center gap-0.5"
                >
                  <span>{SHARE_CONFIG.QR_DESTINATION_URL}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
