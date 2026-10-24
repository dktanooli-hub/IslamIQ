import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { routes } from './prerenderRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const baseHtmlPath = path.resolve(distDir, 'index.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8');

function generatePrerenderedHtml(route) {
  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

  // Replace or add Meta Description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.desc}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${route.desc}" />\n  </head>`);
  }

  // Ensure Canonical tag is https://www.learnislamiq.com/${route.path}
  const canonicalUrl = `https://www.learnislamiq.com/${route.path}`;
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
  }

  // Open Graph URL and metadata
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.desc}" />`);

  // Inject Static Article Content inside <div id="root">
  const staticContent = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 896px; margin: 0 auto; padding: 24px; color: #1e293b; line-height: 1.6;">
      <header style="margin-bottom: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;">
        <nav style="margin-bottom: 12px; font-size: 14px;">
          <a href="/" style="color: #059669; text-decoration: none; font-weight: 600;">Home</a> &raquo;
          <span style="color: #64748b;">${route.title.split('•')[0].split('|')[0].trim()}</span>
        </nav>
        <h1 style="font-size: 28px; font-weight: 800; color: #0f172a; margin-top: 8px; margin-bottom: 8px;">${route.h1}</h1>
        <p style="font-size: 15px; color: #475569; margin: 0;">${route.desc}</p>
      </header>
      <main style="font-size: 15px;">
        ${route.content}
      </main>
      <footer style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b; text-align: center;">
        <p><strong>IslamIQ</strong> — Authentic Islamic Learning for Kids &amp; Adults</p>
        <p><a href="/" style="color: #059669; text-decoration: none;">Home</a> | <a href="/how-to-perform-salah" style="color: #059669; text-decoration: none;">Salah Guide</a> | <a href="/5-pillars-of-islam" style="color: #059669; text-decoration: none;">5 Pillars</a> | <a href="/about" style="color: #059669; text-decoration: none;">About</a> | <a href="/contact" style="color: #059669; text-decoration: none;">Contact</a> | <a href="/privacy-policy" style="color: #059669; text-decoration: none;">Privacy</a> | <a href="/disclaimer" style="color: #059669; text-decoration: none;">Disclaimer</a></p>
        <p>&copy; 2026 IslamIQ (https://www.learnislamiq.com). All rights reserved.</p>
      </footer>
    </div>
  `;

  html = html.replace('<div id="root"></div>', `<div id="root">${staticContent}</div>`);
  return html;
}

// 1. Generate Static Files for all routes
let generatedCount = 0;
for (const route of routes) {
  const rendered = generatePrerenderedHtml(route);

  // Generate directory-based route (dist/${route.path}/index.html)
  const dirPath = path.resolve(distDir, route.path);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.resolve(dirPath, 'index.html'), rendered, 'utf-8');

  // Also write clean HTML file (dist/${route.path}.html) for Vercel cleanUrls
  fs.writeFileSync(path.resolve(distDir, `${route.path}.html`), rendered, 'utf-8');
  generatedCount++;
}

// 2. Also inject rich crawlable home directory fallback inside root dist/index.html
const homeFallback = `
  <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 896px; margin: 0 auto; padding: 24px; color: #1e293b; line-height: 1.6;">
    <header style="text-align: center; margin-bottom: 32px; border-bottom: 1px solid #e2e8f0; padding-bottom: 24px;">
      <h1 style="font-size: 32px; font-weight: 800; color: #047857; margin-bottom: 8px;">IslamIQ • Learn • Quiz • Grow</h1>
      <p style="font-size: 16px; color: #475569; max-width: 650px; margin: 0 auto;">Authentic Islamic learning platform featuring step-by-step guides, interactive quizzes, daily Quran &amp; Hadith, and essential daily tools for Kids and Adults.</p>
    </header>
    <main>
      <section style="margin-bottom: 32px;">
        <h2 style="font-size: 22px; font-weight: 700; color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 8px;">Essential Islamic Educational Guides</h2>
        <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-top: 16px;">
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/how-to-perform-salah" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">How to Perform Salah (Namaz) &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Complete step-by-step prayer guide with rakats, postures, and authentic Hadith.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/how-to-perform-wudu" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">How to Perform Wudu (Ablution) &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">The 4 Quranic Fard obligations, full Sunnah sequence, and post-wudu dua.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/5-pillars-of-islam" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">The 5 Pillars of Islam &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Shahadah, Salah, Zakat, Sawm, and Hajj explained with Quran &amp; Hadith.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/six-articles-of-faith" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">6 Articles of Faith (Iman) &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">In-depth creed: Allah, Angels, Books, Prophets, Day of Judgment, and Qadr.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/salah-for-beginners" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Salah for Beginners &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Gentle Namaz guide with transliterations, rakat charts, and beginner reassurances.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/seerah-of-prophet-muhammad" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Seerah of Prophet Muhammad ﷺ &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Chronological biography from birth in Makkah to the Farewell Pilgrimage.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/hajj-umrah-guide" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Hajj &amp; Umrah Complete Guide &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Complete rites: Ihram, Tawaf, Sa'i, Mina, Arafah, Muzdalifah, and Jamarat.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/zakat-basics" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Zakat Basics &amp; Nisab Thresholds &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Gold &amp; silver Nisab standards, 2.5% calculation, and 8 Quranic categories.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/ramadan-guide" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Ramadan &amp; Fasting Guide &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Sawm essentials, Suhoor and Iftar duas, medical exemptions, and Laylat al-Qadr.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/stories-of-the-prophets" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Stories of the Prophets &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Complete guide to all 25 Prophets named in the Quran from Adam to Muhammad ﷺ.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/rights-in-islam" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Rights in Islam (Huqooq-ul-Ibad) &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Rights of parents, children, spouses, neighbors, orphans, and workers.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/islamic-daily-life" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Islamic Daily Life &amp; Sunnah Routine &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">24-hour Sunnah routine, morning/evening adhkar, and everyday etiquette.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/ghusl-taharah-guide" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Complete Ghusl &amp; Taharah Guide &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">The 3 obligatory Faraid, full Sunnah bath method, and ritual purity rules.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/tayammum-guide" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Tayammum (Dry Ablution) Guide &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Dry ablution with clean earth, conditions of permission, and Sunnah method.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/quran-learning-guide" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Quran Learning &amp; Tajweed Guide &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Master Noorani Qaida, articulation points (Makharij), and Noon Sakinah rules.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/hadith-learning-guide" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Hadith Learning Guide &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Understanding Isnad and Matn, authenticity classifications, and Kutub al-Sittah.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/islamic-manners-for-kids" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Islamic Manners for Kids &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Sunnah etiquettes of eating, greeting with Salam, and honoring parents.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/islamic-general-knowledge" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Islamic General Knowledge &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">The 25 Prophets in the Quran, 114 Surahs, and the 4 Rightly Guided Caliphs.</p></li>
        </ul>
      </section>
      <section style="margin-bottom: 32px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px;">
        <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0;">Interactive Islamic Tools</h2>
        <p style="font-size: 14px; color: #475569;">Access our suite of client-side Islamic tools: <a href="/salah" style="color: #047857; font-weight: 600;">Salah Tracker</a>, <a href="/tasbih" style="color: #047857; font-weight: 600;">Digital Tasbih Counter</a>, <a href="/qibla" style="color: #047857; font-weight: 600;">Qibla Compass</a>, <a href="/zakat-calculator" style="color: #047857; font-weight: 600;">Zakat Calculator</a>, <a href="/islamic-calendar" style="color: #047857; font-weight: 600;">Hijri Calendar</a>, <a href="/nearby-mosques" style="color: #047857; font-weight: 600;">Nearby Mosques</a>, and <a href="/ask-a-scholar" style="color: #047857; font-weight: 600;">Ask a Scholar Portal</a>.</p>
      </section>
    </main>
    <footer style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b; text-align: center;">
      <p><strong>IslamIQ</strong> — Authentic Islamic Learning Platform (https://www.learnislamiq.com)</p>
      <p><a href="/about" style="color: #059669; text-decoration: none;">About Us</a> | <a href="/contact" style="color: #059669; text-decoration: none;">Contact Us</a> | <a href="/privacy-policy" style="color: #059669; text-decoration: none;">Privacy Policy</a> | <a href="/terms" style="color: #059669; text-decoration: none;">Terms of Service</a> | <a href="/disclaimer" style="color: #059669; text-decoration: none;">Disclaimer</a></p>
      <p>Contact: learnislamiq@gmail.com | All content cited from verified Islamic sources.</p>
    </footer>
  </div>
`;

let rootHtml = baseHtml.replace('<div id="root"></div>', `<div id="root">${homeFallback}</div>`);
// Ensure root canonical is https://www.learnislamiq.com/
rootHtml = rootHtml.replace(/<link rel="canonical" href=".*?" \/>/, '<link rel="canonical" href="https://www.learnislamiq.com/" />');
rootHtml = rootHtml.replace(/<meta property="og:url" content=".*?" \/>/, '<meta property="og:url" content="https://www.learnislamiq.com" />');
fs.writeFileSync(baseHtmlPath, rootHtml, 'utf-8');

console.log(`Successfully prerendered ${generatedCount} static routes and enhanced root index.html!`);
