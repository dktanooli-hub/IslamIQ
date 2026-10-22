import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Route metadata dictionary
const routes = [
  {
    path: 'about',
    title: 'About Us • IslamIQ — Learn • Quiz • Grow',
    desc: 'Learn about IslamIQ, an educational platform dedicated to authentic Islamic learning, quizzes, and daily tools for kids and adults.',
    h1: 'About IslamIQ — Authentic Islamic Learning Platform',
    content: `
      <h2>Our Mission & Core Purpose</h2>
      <p>IslamIQ (https://www.learnislamiq.com) is an educational platform designed to make Islamic knowledge easier, simpler, and more engaging for Kids and Adults.</p>
      <p>Our goal is to provide authentic Islamic quizzes, verified educational content, and daily Islamic tools in an intuitive, accessible environment.</p>
      <h2>What IslamIQ Includes</h2>
      <ul>
        <li>Interactive Islamic Quizzes for Adults and Kids with verified sources</li>
        <li>Step-by-Step Educational Guides (Salah, Wudu, Ghusl, Tayammum, Hajj, Umrah, Zakat)</li>
        <li>Core Creed & Practice: The 5 Pillars of Islam and 6 Articles of Faith (Iman)</li>
        <li>Daily Quran Verses, Authentic Sahih Hadith, and Masnoon Duas</li>
        <li>Practical Islamic Tools: Salah Tracker, Digital Tasbih, Qibla Direction Compass, Zakat Calculator, and Hijri Calendar</li>
      </ul>
      <h2>Important Islamic Guidance & Scholarly Notice</h2>
      <p>IslamIQ is an educational resource and is not a replacement for a qualified Islamic scholar or Mufti. Where matters involve disputed jurisprudential issues or personal fatwas, users are advised to consult recognized Islamic scholars.</p>
      <p>Contact Us: learnislamiq@gmail.com | Website: https://www.learnislamiq.com</p>
    `
  },
  {
    path: 'contact',
    title: 'Contact Us • IslamIQ — Official Support & Feedback',
    desc: 'Contact IslamIQ at learnislamiq@gmail.com for feedback, technical inquiries, content corrections, and feature suggestions.',
    h1: 'Contact IslamIQ Editorial & Support Team',
    content: `
      <p>We welcome your questions, feedback, suggestions, and corrections regarding any Islamic content or technical functionality.</p>
      <h2>Official Contact Information</h2>
      <p><strong>Email:</strong> learnislamiq@gmail.com</p>
      <p><strong>Official Website:</strong> https://www.learnislamiq.com</p>
      <h2>Reporting Islamic Content Corrections</h2>
      <p>If you identify any discrepancy in Quranic verses, Hadith numbering, Arabic vowelization, or translations, please write to us immediately with the relevant scholarly reference so our editorial team can review and update it promptly.</p>
    `
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy • IslamIQ — Offline-First & Data Protection',
    desc: 'Review the official IslamIQ privacy policy covering local device storage, guest mode, kids privacy, and Google AdSense/AdMob compliance.',
    h1: 'IslamIQ Privacy Policy & Data Handling',
    content: `
      <p>IslamIQ (https://www.learnislamiq.com) is built with an offline-first and privacy-by-design architecture. By default, users interact in Guest Mode without being required to create an account or provide personal information.</p>
      <h2>Data Storage & Local Storage</h2>
      <p>User preferences, quiz scores, XP points, Salah tracker checkmarks, and Tasbih counter logs are stored locally on your device via browser LocalStorage.</p>
      <h2>Advertising Disclosures (Google AdSense & AdMob)</h2>
      <p>We use Google AdSense to display non-intrusive advertisements on the website. Third-party vendors, including Google, use cookies to serve ads based on prior visits. Users can opt out of personalized advertising by visiting Google's Ads Settings.</p>
      <h2>Children's Privacy & Kids Mode</h2>
      <p>In accordance with child privacy standards (COPPA), Kids Mode is 100% free of commercial advertisements and collects no personal data.</p>
      <p>Contact: learnislamiq@gmail.com</p>
    `
  },
  {
    path: 'terms',
    title: 'Terms & Conditions • IslamIQ — Educational Use Agreement',
    desc: 'Read the official terms and conditions for using IslamIQ website and application services.',
    h1: 'IslamIQ Terms & Conditions',
    content: `
      <p>By using the IslamIQ website (https://www.learnislamiq.com) or mobile application, you agree to these Terms and Conditions.</p>
      <h2>Educational Nature</h2>
      <p>IslamIQ provides educational materials, quizzes, and lifestyle tools for general knowledge and spiritual enrichment. It is not a formal fatwa institution or legal authority.</p>
      <h2>Intellectual Property & Fair Use</h2>
      <p>Quranic text and authentic Hadith are the sacred heritage of the Ummah. Original editorial guides, quiz structures, and visual designs are protected for educational distribution.</p>
    `
  },
  {
    path: 'disclaimer',
    title: 'Disclaimer • IslamIQ — Islamic Educational Notice',
    desc: 'Official Islamic educational disclaimer: IslamIQ is an educational platform and not a replacement for a qualified Islamic scholar or Mufti.',
    h1: 'IslamIQ Islamic Educational Disclaimer',
    content: `
      <blockquote>
        “IslamIQ is an educational Islamic learning platform. The information provided through IslamIQ is intended for general educational and informational purposes. Islamic questions can sometimes involve detailed evidence, scholarly differences and matters of jurisprudence. IslamIQ should not be considered a Mufti or a substitute for a qualified and trusted Islamic scholar. Where a question involves a personal, complex or disputed religious matter, users should consult a qualified Islamic scholar or Mufti.”
      </blockquote>
      <p>We make reasonable efforts to verify references against authoritative sources including Sahih al-Bukhari, Sahih Muslim, and classical commentaries, but recommend consulting qualified scholars for binding personal religious guidance.</p>
    `
  },
  {
    path: 'how-to-perform-salah',
    title: 'How to Perform Salah (Namaz) Step by Step Guide | IslamIQ',
    desc: 'Learn how to perform Salah step by step with authentic Hadith references. Complete guide covering prayer prerequisites, postures, recitations, common mistakes, and FAQs.',
    h1: 'How to Perform Salah (Namaz) — Complete Step-by-Step Prayer Guide',
    content: `
      <p>Salah (the daily ritual prayer) is the second pillar of Islam and the foundation of Muslim spiritual life. The Prophet Muhammad ﷺ instructed: <em>"Pray as you have seen me praying"</em> (Sahih al-Bukhari 6008).</p>
      <h2>Prerequisites of Prayer (Shurut as-Salah)</h2>
      <ol>
        <li><strong>Ritual Purity (Taharah & Wudu):</strong> Ensuring freedom from minor and major impurities (Sahih Muslim 224).</li>
        <li><strong>Cleanliness of Body, Clothing & Location:</strong> Surah Al-Muddaththir 74:4.</li>
        <li><strong>Covering the Awrah:</strong> Modest clothing covering required body parts (Sahih al-Bukhari 359).</li>
        <li><strong>Facing the Qiblah (Makkah):</strong> Turning toward al-Masjid al-Haram (Surah Al-Baqarah 2:144).</li>
        <li><strong>Prescribed Prayer Waqt (Time):</strong> Performing prayer within its window (Surah An-Nisa 4:103).</li>
        <li><strong>Intention (Niyyah):</strong> Sincere commitment in the heart (Sahih al-Bukhari 1).</li>
      </ol>
      <h2>Step-by-Step Postures & Recitations</h2>
      <p>From the opening Takbirat al-Ihram, Qiyam with Surah Al-Fatiha, Ruku (bowing with <em>Subhana Rabbiyal Azeem</em>), I'tidal, Sujud (prostrating on 7 bones with <em>Subhana Rabbiyal A'la</em>), Tashahhud, sending Salawat upon the Prophet ﷺ, to the final Tasleem (Assalamu alaykum wa rahmatullah).</p>
      <h2>The 5 Daily Prayers & Rakat Counts</h2>
      <ul>
        <li><strong>Fajr:</strong> 2 Sunnah Muakkadah + 2 Fard (Pre-dawn)</li>
        <li><strong>Dhuhr:</strong> 4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl (Post-midday)</li>
        <li><strong>Asr:</strong> 4 Sunnah Ghair Muakkadah + 4 Fard (Late afternoon)</li>
        <li><strong>Maghrib:</strong> 3 Fard + 2 Sunnah + 2 Nafl (Immediately after sunset)</li>
        <li><strong>Isha:</strong> 4 Fard + 2 Sunnah + 2 Nafl + 3 Witr (Night)</li>
      </ul>
    `
  },
  {
    path: 'how-to-perform-wudu',
    title: 'How to Perform Wudu (Ablution) Step by Step Guide | IslamIQ',
    desc: 'Complete step-by-step guide on how to perform Wudu (Islamic ablution). Learn the 4 obligatory Fard acts, full Sunnah method, nullifiers, post-wudu dua, and authentic references.',
    h1: 'How to Perform Wudu (Ablution) — Complete Step-by-Step Guide',
    content: `
      <p>Wudu is the ritual purification obligatory before Salah, touching the Mushaf of the Quran, or performing Tawaf. The Prophet ﷺ declared: <em>"Purity is half of faith"</em> (Sahih Muslim 223).</p>
      <h2>The 4 Quranic Obligations of Wudu (Faraid)</h2>
      <p>Stated in Surah Al-Ma'idah (5:6):</p>
      <ol>
        <li>Washing the entire face from hairline to chin and earlobe to earlobe.</li>
        <li>Washing both arms up to and including the elbows.</li>
        <li>Wiping over the head (Masah).</li>
        <li>Washing both feet up to and including the ankles.</li>
      </ol>
      <h2>The Full Sunnah Sequence</h2>
      <p>Making Niyyah, reciting Bismillah, washing hands thrice, rinsing the mouth (Madmadah), inhaling water into nostrils (Istinshaq), washing face, arms, head, ears, and feet thoroughly with clean water, avoiding wastefulness.</p>
      <h2>Authentic Post-Wudu Dua</h2>
      <p><em>"Ashhadu alla ilaha illallah wahdahu la shareeka lah, wa ashhadu anna Muhammadan abduhu wa rasuluh..."</em> (Sahih Muslim 234).</p>
    `
  },
  {
    path: '5-pillars-of-islam',
    title: 'The 5 Pillars of Islam Explained with Authentic References | IslamIQ',
    desc: 'Comprehensive guide to the Five Pillars of Islam (Arkan al-Islam): Shahadah, Salah, Zakat, Sawm, and Hajj. Detailed Quranic proofs, Hadith evidence, wisdom, and FAQs.',
    h1: 'The 5 Pillars of Islam (Arkan al-Islam) — Complete Educational Guide',
    content: `
      <p>The Messenger of Allah ﷺ stated: <em>"Islam is built upon five: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, paying Zakat, performing Hajj, and fasting during Ramadan"</em> (Sahih al-Bukhari 8, Sahih Muslim 16).</p>
      <h2>1. Shahadah (Declaration of Faith)</h2>
      <p>Bearing witness with firm conviction that none has the right to be worshipped except Allah alone, and that Muhammad ﷺ is His final Messenger (Surah Muhammad 47:19).</p>
      <h2>2. Salah (The Five Daily Prayers)</h2>
      <p>The spiritual cornerstone performed five times daily: Fajr, Dhuhr, Asr, Maghrib, and Isha.</p>
      <h2>3. Zakat (Obligatory Almsgiving)</h2>
      <p>Annual 2.5% purification of wealth above the Nisab threshold distributed to eight Quranic categories of recipients (Surah At-Tawbah 9:60).</p>
      <h2>4. Sawm (Fasting the Month of Ramadan)</h2>
      <p>Abstaining from food, drink, and intimacy from dawn to sunset with devotion and self-restraint (Surah Al-Baqarah 2:183).</p>
      <h2>5. Hajj (Pilgrimage to Makkah)</h2>
      <p>Obligatory once in a lifetime for every Muslim who is physically and financially able (Surah Ali 'Imran 3:97).</p>
    `
  },
  {
    path: 'six-articles-of-faith',
    title: '6 Articles of Faith in Islam (Arkan al-Iman) Explained | IslamIQ',
    desc: 'In-depth guide to the 6 Articles of Faith (Iman) in Islam: Belief in Allah, Angels, Books, Prophets, Day of Judgment, and Divine Decree (Qadr) with Quranic and Hadith proofs.',
    h1: 'The 6 Articles of Faith in Islam (Arkan al-Iman)',
    content: `
      <p>Documented in the renowned Hadith of Jibreel (Sahih Muslim 8) and Surah Al-Baqarah (2:285), the six pillars of Iman form the core Islamic theology (Aqeedah):</p>
      <ol>
        <li><strong>Belief in Allah (Tawheed):</strong> His Lordship, exclusive right to worship, and divine Names and Attributes.</li>
        <li><strong>Belief in the Angels (Mala'ikah):</strong> Created from light, obedient servants of Allah including Jibril, Mikail, Israfil, and Malik al-Mawt.</li>
        <li><strong>Belief in the Revealed Scriptures (Kutub):</strong> Including the Tawrat (Torah), Zabur (Psalms), Injeel (Gospel), and the final preserved Quran.</li>
        <li><strong>Belief in the Messengers & Prophets (Rusul):</strong> From Adam (AS) to Prophet Muhammad ﷺ, the Seal of the Prophets.</li>
        <li><strong>Belief in the Day of Judgment (Yawm al-Qiyamah):</strong> Bodily resurrection, the Scale (Mizan), the Bridge (Sirat), and eternal accountability.</li>
        <li><strong>Belief in the Divine Decree (Al-Qadr):</strong> Allah's eternal knowledge, writing in al-Lawh al-Mahfuz, sovereign will, and divine creation of all things.</li>
      </ol>
    `
  },
  {
    path: 'salah-for-beginners',
    title: 'Salah for Beginners: Complete Step-by-Step Namaz Guide | IslamIQ',
    desc: 'Gentle, comprehensive beginner guide to Islamic prayer (Salah / Namaz). Learn exact postures, simple phonetic transliterations, translations, rakat counts, and overcome common beginner anxieties.',
    h1: 'Salah for Beginners — Step-by-Step Guide to Islamic Prayer',
    content: `
      <p>A welcoming, structured introduction designed for new Muslims and beginners learning to pray Namaz with confidence.</p>
      <h2>Beginner Reassurance</h2>
      <p>Do not be overwhelmed by reciting everything in Arabic immediately. You are rewarded for your sincere effort while learning. Begin with the essential postures and short recitations.</p>
    `
  },
  {
    path: 'islamic-manners-for-kids',
    title: 'Islamic Manners for Kids (Adab & Akhlaq Guide) | IslamIQ',
    desc: 'Engaging, practical guide teaching Islamic manners (Adab & Akhlaq) to kids and parents. Learn eating etiquette, greetings, honoring parents, kindness to friends, and Sunnah phrases.',
    h1: 'Islamic Manners for Kids (Adab & Akhlaq Guide)',
    content: `
      <p>Instilling prophetic character (Akhlaq) in Muslim children with joyful, practical lessons from the Sunnah.</p>
      <h2>Essential Daily Manners</h2>
      <ul>
        <li><strong>Eating & Drinking:</strong> Saying Bismillah, eating with the right hand, and reciting Alhamdulillah.</li>
        <li><strong>Islamic Greeting:</strong> Saying <em>Assalamu Alaykum wa Rahmatullahi wa Barakatuh</em> to bring peace.</li>
        <li><strong>Honoring Parents:</strong> Speaking gently, smiling, and helping with household chores.</li>
        <li><strong>Truthfulness:</strong> The Prophet ﷺ taught that honesty leads to righteousness, and righteousness leads to Paradise (Sahih al-Bukhari 6094).</li>
      </ul>
    `
  },
  {
    path: 'islamic-general-knowledge',
    title: 'Islamic General Knowledge: Pillars, Prophets, Quran & History | IslamIQ',
    desc: 'Comprehensive, authentic Islamic general knowledge guide covering the Five Pillars, Articles of Faith, Prophets in the Quran, Quranic statistics, and Islamic historical milestones with references.',
    h1: 'Islamic General Knowledge — Comprehensive Encyclopedia Guide',
    content: `
      <p>Verified information on Islamic history, the 25 Prophets mentioned in the Quran, the 114 Surahs of the Holy Quran, the early Caliphs, and foundational Islamic concepts.</p>
    `
  },
  {
    path: 'quran-learning-guide',
    title: 'Quran Learning Guide: Tajweed, Reading & Daily Routine | IslamIQ',
    desc: 'Step-by-step Quran learning guide for beginners and intermediate students. Master Noorani Qaida, essential Tajweed rules, correct pronunciation, and daily Quran routine.',
    h1: 'Quran Learning & Tajweed Guide — From Basics to Fluency',
    content: `
      <p>The Prophet ﷺ said: <em>"The best of you are those who learn the Quran and teach it"</em> (Sahih al-Bukhari 5027).</p>
      <p>Covers Noorani Qaida stages, correct Arabic articulation points (Makharij), rules of Noon Sakinah and Tanween (Idh-har, Idgham, Iqlab, Ikhfa), and establishing a consistent daily Tilawah habit.</p>
    `
  },
  {
    path: 'hadith-learning-guide',
    title: 'Hadith Learning Guide: Traditions, Authenticity & Books | IslamIQ',
    desc: 'Comprehensive Hadith guide explaining Isnad and Matn, Sahih/Hasan/Da\'if classifications, Kutub al-Sittah compilers, and authenticity verification principles.',
    h1: 'Hadith Learning Guide — Understanding the Prophetic Traditions',
    content: `
      <p>Introduction to the science of Hadith (Mustalah al-Hadith). Explains the chain of narration (Isnad), text (Matn), criteria of authenticity according to Imam al-Bukhari and Imam Muslim, and the major compilations (Kutub al-Sittah).</p>
    `
  },
  {
    path: 'ramadan-guide',
    title: 'Ramadan Guide: Fasting Rules, Suhoor, Iftar & Worship | IslamIQ',
    desc: 'Complete Ramadan educational guide covering Sawm essentials, pre-dawn Suhoor, Iftar duas, medical exemptions (inhalers/drops), Laylat al-Qadr, and Zakat al-Fitr.',
    h1: 'Ramadan & Fasting Guide — Complete Rules & Spiritual Wisdom',
    content: `
      <p>Fasting during the holy month of Ramadan is an obligatory act of devotion (Surah Al-Baqarah 2:183). Learn the rulings of Suhoor, authentic Iftar duas, exemptions for travel and illness, Taraweeh prayer, and seeking Laylat al-Qadr.</p>
    `
  },
  {
    path: 'zakat-basics',
    title: 'Zakat Basics: Nisab, Calculation & Eligible Recipients | IslamIQ',
    desc: 'Essential guide to the 3rd Pillar of Islam (Zakat). Learn gold and silver Nisab thresholds, 2.5% rate on cash/investments, Hawl rule, and 8 Quranic recipient categories.',
    h1: 'Zakat Basics — Nisab, Calculation & 8 Eligible Categories',
    content: `
      <p>Zakat is the annual 2.5% obligatory transfer of surplus wealth above the Nisab threshold. Detailed explanation of gold and silver Nisab standards, deducting short-term liabilities, and the 8 Quranic categories of recipients specified in Surah At-Tawbah (9:60).</p>
    `
  },
  {
    path: 'seerah-of-prophet-muhammad',
    title: 'Seerah of Prophet Muhammad ﷺ: Complete Life, Milestones & Lessons | IslamIQ',
    desc: 'Comprehensive Seerah guide covering the life of Prophet Muhammad ﷺ from birth, Prophethood, Makkan persecution, Hijrah, Madinah, to the Farewell Hajj with authentic sources.',
    h1: 'Seerah of Prophet Muhammad ﷺ — Complete Life, Milestones & Lessons',
    content: `
      <p>Comprehensive historical and spiritual biography of the Final Messenger of Allah ﷺ. Covers early life before Prophethood, the first revelation in Cave Hira, persecution in Makkah, the Miraculous Night Journey (Isra and Mi'raj), the Hijrah to Madinah, the establishment of the prophetic community, and the Farewell Sermon (Khutbat al-Wada').</p>
    `
  },
  {
    path: 'ghusl-taharah-guide',
    title: 'Complete Ghusl & Taharah Guide: Step-by-Step, Faraid & Sunnah | IslamIQ',
    desc: 'Complete step-by-step guide to Islamic Ghusl (ritual bath) and Taharah. Learn the 3 obligatory acts, Sunnah method, reasons for obligation, and common mistakes.',
    h1: 'Complete Ghusl & Taharah Guide — Ritual Purity in Islam',
    content: `
      <p>Comprehensive guide to the ritual bath (Ghusl). Details the three obligatory acts (Faraid): rinsing the mouth thoroughly, clearing the nostrils with water, and washing the entire body leaving no dry spot. Includes full Sunnah method per Sahih al-Bukhari 248.</p>
    `
  },
  {
    path: 'tayammum-guide',
    title: 'Tayammum Guide: Dry Ablution in Islam, Method & Rules | IslamIQ',
    desc: 'Learn how to perform Tayammum (dry ablution) step by step with clean earth. Understand when it is permitted, conditions, nullifiers, and Quranic evidence.',
    h1: 'Tayammum Guide — Dry Ablution Method & Rulings',
    content: `
      <p>Allah states in Surah An-Nisa (4:43): <em>"...and you find no water, then seek clean earth and wipe over your faces and hands [with it]."</em></p>
      <p>Details the valid circumstances for Tayammum (unavailability of water, medical harm, severe freezing temperatures without heating means) and the authentic single-strike Sunnah method.</p>
    `
  },
  {
    path: 'hajj-umrah-guide',
    title: 'Hajj & Umrah Complete Guide: Step-by-Step Rites, Rules & Duas | IslamIQ',
    desc: 'Comprehensive Hajj and Umrah pilgrimage guide. Master Ihram, Miqat, Tawaf, Sa\'i, Mina, Arafat, Muzdalifah, and authentic duas with reliable references.',
    h1: 'Hajj & Umrah Complete Guide — Step-by-Step Pilgrimage Rites',
    content: `
      <p>The definitive guide to the pilgrimage to the Holy House of Allah in Makkah. Details Ihram from the Miqat, Tawaf al-Qudum, Sa'i between Safa and Marwah, the Day of Tarwiyah in Mina, standing on the plains of Arafah, Muzdalifah, the stoning of Jamarat, Eid al-Adha sacrifice, and Tawaf al-Wada'.</p>
    `
  },
  {
    path: 'stories-of-the-prophets',
    title: 'Stories of the Prophets: Authentic Quranic Accounts & Lessons | IslamIQ',
    desc: 'Authentic educational guide to the Stories of the Prophets in the Quran: Adam, Nuh, Ibrahim, Yusuf, Musa, and Isa (AS) with reliable lessons and references.',
    h1: 'Stories of the Prophets (Qasas al-Anbiya) — Authentic Quranic Accounts',
    content: `
      <p>Explores the prophetic journeys of Adam, Nuh, Ibrahim, Yusuf, Musa, and Isa (peace be upon them all). Highlights their steadfast monotheism (Tawheed), perseverance through hardship, sincere repentance, and enduring moral lessons for our times.</p>
    `
  },
  {
    path: 'rights-in-islam',
    title: 'Rights in Islam (Huqooq-ul-Ibad): Parents, Spouses, Neighbors & Workers | IslamIQ',
    desc: 'Comprehensive guide to social rights in Islam (Huqooq-ul-Ibad). Discover rights of parents, children, spouses, neighbors, relatives, orphans, and workers with Quran and Hadith evidence.',
    h1: 'Rights in Islam (Huqooq-ul-Ibad) — Social Justice & Ethics',
    content: `
      <p>In Islam, personal devotion to Allah (Huqooq-Allah) must be accompanied by fulfilling social obligations toward fellow human beings (Huqooq-ul-Ibad). Covers the sacred rights of parents, children, spouses, neighbors, relatives (Silat ar-Rahim), vulnerable orphans, and workers and domestic laborers.</p>
    `
  },
  {
    path: 'zakat-calculator',
    title: 'Zakat Calculator: Nisab, Cash, Gold & Trade Assets | IslamIQ',
    desc: 'Calculate your obligatory 2.5% Zakat easily with customizable gold and silver prices, Nisab threshold detection, liability deductions, and instant breakdown.',
    h1: 'Interactive Zakat Calculator — Nisab & Asset Breakdown',
    content: `
      <p>Calculate your annual 2.5% Zakat obligation across liquid cash, bank balances, gold, silver, investments, and trade merchandise. Includes dynamic Nisab threshold comparison and debt deductions.</p>
    `
  },
  {
    path: 'islamic-calendar',
    title: 'Islamic Calendar: Hijri Date Today & Monthly Calendar | IslamIQ',
    desc: 'Accurate Hijri lunar calendar with Gregorian synchronization, moon sighting adjustments, Sunnah fasting days, and major Islamic milestones.',
    h1: 'Islamic Hijri Calendar — Live Gregorian & Lunar Sync',
    content: `
      <p>Stay aligned with the Islamic lunar calendar, sacred months (Muharram, Rajab, Dhul Qi'dah, Dhul Hijjah), Sunnah fasting days (Ayyam al-Beed: 13th, 14th, 15th), and major Islamic occasions.</p>
    `
  },
  {
    path: 'islamic-quiz',
    title: 'Islamic Quiz Online • Questions & Answers | IslamIQ',
    desc: 'Test your Islamic knowledge with authentic multiple choice quiz questions on Quran, Pillars of Islam, Prophets, Salah, and Seerah with verified references.',
    h1: 'Islamic Quiz Online — Authentic Questions, Answers & Sources',
    content: `
      <p>Test and strengthen your Islamic knowledge across Quranic studies, Hadith, Fiqh of prayer, Islamic history, and the Seerah of the Prophet ﷺ with verified scholarly references.</p>
    `
  },
  {
    path: 'kids-islamic-quiz',
    title: 'Islamic Quiz for Kids • Fun Islamic Questions | IslamIQ',
    desc: 'Fun, engaging and educational Islamic quiz for Muslim children. Learn about Allah, Prophet Muhammad (PBUH), 5 Pillars of Islam, and good manners.',
    h1: 'Kids Islamic Quiz — Fun & Engaging Islamic Learning',
    content: `
      <p>Child-friendly Islamic questions with cheerful positive reinforcement, audio readings, and clear answers covering Allah, Prophet Muhammad ﷺ, the Quran, and daily manners.</p>
    `
  },
  {
    path: 'islamic-questions-answers',
    title: 'Islamic Questions & Answers: Authentic Rulings & Evidence | IslamIQ',
    desc: 'Comprehensive and authentic Islamic questions and answers on Aqeedah, Salah, Fasting, Zakat, Halal living, and modern ethics with verified Quran and Hadith evidence.',
    h1: 'Islamic Questions & Answers (Q&A Library)',
    content: `
      <p>Browse authentic questions and answers on core Islamic beliefs, prayer rules, fasting guidelines, financial purity, and daily etiquettes backed by authentic evidence from the Quran and Sunnah.</p>
    `
  },
  {
    path: 'daily-quran-verse',
    title: 'Daily Quran Verse with Translation & Meaning | IslamIQ',
    desc: 'Read inspiring Daily Quran Verses with Arabic text, authentic Urdu and English translations, Surah and Ayah numbers, and thematic reflections.',
    h1: 'Daily Quran Verse — Arabic Text, Translations & Reflections',
    content: `
      <p>Inspiring daily verses from the Holy Quran with pristine Arabic calligraphy, English translation, Urdu translation, and Surah and Ayah citations.</p>
    `
  },
  {
    path: 'daily-hadith',
    title: 'Daily Hadith • Authentic Sahih Hadith with Lessons | IslamIQ',
    desc: 'Daily authentic Hadiths from Sahih al-Bukhari and Sahih Muslim. Learn practical daily lessons, authentic narrators, and Islamic teachings.',
    h1: 'Daily Hadith — Prophetic Wisdom & Authentic Lessons',
    content: `
      <p>Daily selected traditions of the Prophet Muhammad ﷺ with authentic chain references, translations, and practical takeaways for daily life.</p>
    `
  },
  {
    path: 'daily-dua',
    title: 'Daily Dua with Meaning & Reference • Masnoon Duas | IslamIQ',
    desc: 'Essential daily Islamic supplications (Duas) with Arabic text, transliteration, authentic Urdu & English translations, and references.',
    h1: 'Daily Masnoon Duas — Authentic Supplications & Virtues',
    content: `
      <p>Authentic prayers and supplications from Hisn al-Muslim (Fortress of the Muslim) for waking up, sleeping, entering the mosque, protection, and gratitude.</p>
    `
  },
  {
    path: 'salah-learning',
    title: 'Namaz & Salah Learning • How to Pray, Rakats & Timings | IslamIQ',
    desc: 'Comprehensive Islamic guide to learning Namaz (Salah). Discover prayer methods, rakats for all 5 daily prayers, prerequisites, and tracker.',
    h1: 'Salah Learning Hub — Master the Daily Prayers',
    content: `
      <p>Centralized educational portal covering everything a Muslim needs to pray properly: Wudu purification, prayer postures, rakat counts, recitations, and daily habit tracking.</p>
    `
  },
  {
    path: 'ask-a-scholar',
    title: 'Ask a Scholar • Authentic Islamic Q&A, Masail & Fatwa | IslamIQ',
    desc: 'Dedicated Ask a Scholar portal for private, authentic Islamic guidance on Salah, Fasting, Zakat, everyday matters, Masail, and formal Fatwa across the four Fiqh schools.',
    h1: 'Ask a Scholar — Authentic Scholarly Guidance & Fatwa Services',
    content: `
      <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0; font-weight: 700; color: #065f46;">STATUS: Active Service • Confidential Scholar Q&amp;A</p>
        <p style="margin: 4px 0 0; font-size: 14px; color: #047857;">IslamIQ provides a dedicated, confidential portal connecting Muslims with qualified scholars and accredited Muftis.</p>
      </div>
      <h2>Four Key Service Pillars</h2>
      <ul>
        <li><strong>Everyday Islamic Matters:</strong> Questions about Salah, fasting (Sawm), Zakat calculations, and daily worship.</li>
        <li><strong>Private Access to Questions &amp; Answers:</strong> Confidential reference dashboard with zero public tracking.</li>
        <li><strong>Personal Information Protection:</strong> Privacy-by-design with identity sanitization before review.</li>
        <li><strong>Qualified Scholarly Guidance:</strong> Direct access to verified scholars and certified Muftis.</li>
      </ul>
      <h2>Three Structured Tracks</h2>
      <h3>1. General Islamic Q&amp;A</h3>
      <p>Foundational knowledge, Quranic verses, Sahih Hadith, Seerah, and personal character development.</p>
      <h3>2. Masail (Practical Rulings)</h3>
      <p>Applied jurisprudence for Taharah, prayer invalidators, medical fasting rules, and trade transactions.</p>
      <h3>3. Fatwa (Formal Religious Decrees)</h3>
      <p>Formal legal rulings on complex, family, inheritance, matrimonial, or financial matters requiring certified Ifta' review.</p>
      <h2>Fiqh Choices for Fatwa</h2>
      <p>Questioners can select their preferred school of jurisprudence (Madhhab):</p>
      <ul>
        <li><strong>Hanafi (فقہ حنفی):</strong> Imam Abu Hanifa (d. 150 AH)</li>
        <li><strong>Shafi'i (فقہ شافعی):</strong> Imam al-Shafi'i (d. 204 AH)</li>
        <li><strong>Maliki (فقہ مالکی):</strong> Imam Malik ibn Anas (d. 179 AH)</li>
        <li><strong>Hanbali (فقہ حنبلی):</strong> Imam Ahmad ibn Hanbal (d. 241 AH)</li>
        <li><strong>“I am unsure / need guidance”:</strong> General scholarly consensus (Jumhur) for seekers not adhering to a specific school.</li>
      </ul>
      <p>Notice: All categories are currently informational. Submissions will open upon completion of the scholarly accreditation and privacy protocols.</p>
    `
  },
  {
    path: 'nearby-mosques',
    title: 'Nearby Mosques Finder • Masjids Near Me with Directions | IslamIQ',
    desc: 'Find nearby mosques and masjids on an interactive map. Search by radius, view distances, wudu facilities, and open turn-by-turn Google Maps directions.',
    h1: 'Nearby Mosques & Masjids Finder — Interactive Map & Directions',
    content: `
      <h2>Locate Mosques Near You</h2>
      <p>IslamIQ Nearby Mosques finder connects you to local masjids and places of worship using OpenStreetMap community-verified geospatial data and real-time device geolocation.</p>
      <h2>Key Features</h2>
      <ul>
        <li><strong>Interactive Map:</strong> Visual exploration powered by OpenStreetMap tiles and custom masjid markers.</li>
        <li><strong>Distance &amp; Travel Times:</strong> Calculated distance with estimated walking and driving times.</li>
        <li><strong>Turn-by-Turn Directions:</strong> Instant one-tap navigation via Google Maps.</li>
        <li><strong>Custom Search Radii:</strong> Filter by 1 km (walking distance), 5 km, 10 km, or 25 km.</li>
        <li><strong>Amenities &amp; Facilities:</strong> Information on Wudu areas, women's prayer spaces, and Jumu'ah services where recorded in OpenStreetMap.</li>
        <li><strong>100% Private:</strong> Your GPS coordinates remain entirely on-device and are never saved or sent to any remote database.</li>
      </ul>
      <h2>Sunnah Etiquette of the Masjid</h2>
      <p>Enter the masjid with the right foot, recite the entering supplication (Allahumma iftah li abwaba rahmatik), offer two rakats of Tahiyyat al-Masjid before sitting, and maintain serene tranquility within the house of Allah.</p>
    `
  },
  {
    path: 'salah',
    title: 'Salah Tracker • Daily Namaz Tracker & Timings | IslamIQ',
    desc: 'Track your five daily obligatory prayers, view weekly streaks, and build consistent Salah habits with IslamIQ Salah Tracker.',
    h1: 'Salah Tracker — Daily Namaz & Prayer Habit Tracker',
    content: `
      <h2>Build a Consistent Daily Prayer Habit</h2>
      <p>Salah (the daily ritual prayer) is the second pillar of Islam and the foundation of Muslim spiritual life. The Prophet Muhammad ﷺ instructed: <em>"Pray as you have seen me praying"</em> (Sahih al-Bukhari 6008).</p>
      <h2>Key Features of Salah Tracker</h2>
      <ul>
        <li><strong>Daily Prayer Checklist:</strong> Record Fajr, Dhuhr, Asr, Maghrib, and Isha as you complete them each day.</li>
        <li><strong>Consistency &amp; Streaks:</strong> Monitor weekly streaks and prayer completion percentages to maintain steadfast worship.</li>
        <li><strong>Voluntary Night Prayers:</strong> Track Tahajjud and Sunnah nawafil prayers alongside obligatory prayers.</li>
        <li><strong>Private &amp; Offline-First:</strong> All prayer tracking data stays secure and private on your device in LocalStorage.</li>
      </ul>
      <h2>Educational Salah Resources</h2>
      <p>Learn proper prayer mechanics and ablution in our step-by-step educational guides: <a href="/how-to-perform-salah" style="color: #059669; font-weight: 600;">How to Perform Salah</a>, <a href="/how-to-perform-wudu" style="color: #059669; font-weight: 600;">How to Perform Wudu</a>, and <a href="/salah-learning" style="color: #059669; font-weight: 600;">Salah Learning Hub</a>.</p>
    `
  },
  {
    path: 'quiz',
    title: 'Islamic Quiz • Test Your Knowledge | IslamIQ',
    desc: 'Interactive Islamic quiz with authentic questions, multiple levels, and verified references for kids and adults.',
    h1: 'Islamic Quiz — Authentic Questions, Answers & Verified Sources',
    content: `
      <h2>Test & Expand Your Islamic Knowledge</h2>
      <p>Challenge yourself and your family with authentic multiple-choice questions covering the Holy Quran, the Sunnah, the Prophets, Islamic history, and foundational morals.</p>
      <h2>Key Features of IslamIQ Quiz</h2>
      <ul>
        <li><strong>Beginner to Advanced Levels:</strong> Adaptive difficulties suitable for both new learners and knowledgeable students.</li>
        <li><strong>Dedicated Kids Mode:</strong> Cheerful interface with tailored questions and encouraging positive feedback.</li>
        <li><strong>Verified References:</strong> Every answer is referenced with Quranic Surahs and Sahih Hadith collections.</li>
        <li><strong>Gamified Learning:</strong> Earn experience points (XP), maintain daily learning streaks, and unlock Islamic knowledge badges.</li>
      </ul>
      <h2>More Quizzes & Q&amp;A</h2>
      <p>Explore our specialized hubs: <a href="/islamic-quiz" style="color: #059669; font-weight: 600;">Islamic Quiz Online</a>, <a href="/kids-islamic-quiz" style="color: #059669; font-weight: 600;">Kids Islamic Quiz</a>, and <a href="/islamic-questions-answers" style="color: #059669; font-weight: 600;">Questions &amp; Answers</a>.</p>
    `
  },
  {
    path: 'search',
    title: 'Islamic Q&A Search • Knowledge Finder | IslamIQ',
    desc: 'Search authentic Islamic questions and answers, Quranic topics, Hadith references, and educational guides.',
    h1: 'Islamic Knowledge & Q&A Search Engine',
    content: `
      <h2>Instant Access to Verified Islamic Learning</h2>
      <p>Quickly search hundreds of verified questions and answers, articles of faith, prayer guidelines, and moral lessons backed by Quran and Sunnah evidence.</p>
      <h2>Search Capabilities</h2>
      <ul>
        <li><strong>Fast Keyword Search:</strong> Search topics across Salah, Wudu, Fasting, Zakat, Hajj, Aqeedah, and Family relations.</li>
        <li><strong>Authentic Sources:</strong> Direct references to Sahih al-Bukhari, Sahih Muslim, and classical scholars of Islam.</li>
        <li><strong>Bilingual Search:</strong> Full support for English and Urdu search terms and reading.</li>
        <li><strong>Direct Guide Links:</strong> Connect directly to comprehensive step-by-step guides for in-depth study.</li>
      </ul>
      <h2>Looking for Scholarly Answers?</h2>
      <p>Consult our confidential scholarly service: <a href="/ask-a-scholar" style="color: #059669; font-weight: 600;">Ask a Scholar Portal</a>.</p>
    `
  },
  {
    path: 'tasbih',
    title: 'Tasbih Counter • Digital Dhikr | IslamIQ',
    desc: 'Digital Tasbih counter for daily Dhikr and remembrance of Allah with preset Duas, Arabic text, and counters.',
    h1: 'Digital Tasbih Counter — Daily Dhikr & Remembrance',
    content: `
      <h2>Remembrance of Allah (Dhikr)</h2>
      <p>Keep your heart and tongue connected to Allah with our digital Tasbih counter. Choose from preset Sunnah supplications such as SubhanAllah, Alhamdulillah, and Allahu Akbar, or create your own custom dhikr targets.</p>
    `
  },
  {
    path: 'qibla',
    title: 'Qibla Direction • Kaaba Compass | IslamIQ',
    desc: 'Find the accurate Qibla direction towards the Holy Kaaba in Makkah with real-time compass alignment.',
    h1: 'Qibla Direction Compass — Accurate Kaaba Locator',
    content: `
      <h2>Face the Sacred Qibla (Kaaba) Anywhere</h2>
      <p>Determine the precise compass direction to the Kaaba in Makkah using your device sensors and location. Designed with high precision and offline compass fallback.</p>
    `
  }
];

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

  // Open Graph URL
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
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/seerah-of-prophet-muhammad" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Seerah of Prophet Muhammad ﷺ &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Chronological biography from birth in Makkah to the Farewell Pilgrimage.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/hajj-umrah-guide" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Hajj &amp; Umrah Complete Guide &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Complete rites: Ihram, Tawaf, Sa'i, Mina, Arafah, Muzdalifah, and Jamarat.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/zakat-basics" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Zakat Basics &amp; Nisab Thresholds &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Gold &amp; silver Nisab standards, 2.5% calculation, and 8 Quranic categories.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/stories-of-the-prophets" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Stories of the Prophets &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Lessons from Adam, Nuh, Ibrahim, Yusuf, Musa, and Isa (AS) in the Quran.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/rights-in-islam" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Rights in Islam (Huqooq-ul-Ibad) &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Rights of parents, children, spouses, neighbors, orphans, and workers.</p></li>
          <li style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;"><a href="/islamic-manners-for-kids" style="color: #047857; font-weight: 700; text-decoration: none; font-size: 16px;">Islamic Manners for Kids &raquo;</a><p style="font-size: 13px; color: #64748b; margin-top: 4px;">Sunnah etiquettes of eating, greeting with Salam, and honoring parents.</p></li>
        </ul>
      </section>
      <section style="margin-bottom: 32px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px;">
        <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0;">Interactive Islamic Tools</h2>
        <p style="font-size: 14px; color: #475569;">Access our suite of client-side Islamic tools: <a href="/salah" style="color: #047857; font-weight: 600;">Salah Tracker</a>, <a href="/tasbih" style="color: #047857; font-weight: 600;">Digital Tasbih Counter</a>, <a href="/qibla" style="color: #047857; font-weight: 600;">Qibla Compass</a>, <a href="/zakat-calculator" style="color: #047857; font-weight: 600;">Zakat Calculator</a>, and <a href="/islamic-calendar" style="color: #047857; font-weight: 600;">Hijri Calendar</a>.</p>
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
