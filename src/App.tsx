/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Pizza,
  UtensilsCrossed,
  Home,
  Sparkles,
  ArrowLeft,
  ChefHat,
  Clock,
  MapPin,
  Phone,
  Instagram,
  Facebook,
} from 'lucide-react';

type Theme = 'landing' | 'pizzeria' | 'tavola-calda' | 'standard' | 'luxury';
type Language = 'it' | 'en' | 'es' | 'th';

const LANG_INFO: Record<Language, { code: string; flag: string; alt: string; nextLabel: string }> = {
  it: {
    code: 'IT',
    flag: 'https://flagcdn.com/w40/it.png',
    alt: 'Italiano',
    nextLabel: 'Switch to English',
  },
  en: {
    code: 'EN',
    flag: 'https://flagcdn.com/w40/gb.png',
    alt: 'English',
    nextLabel: 'Cambiar a Español',
  },
  es: {
    code: 'ES',
    flag: 'https://flagcdn.com/w40/es.png',
    alt: 'Español',
    nextLabel: 'เปลี่ยนเป็นภาษาไทย (Switch to Thai)',
  },
  th: {
    code: 'TH',
    flag: 'https://flagcdn.com/w40/th.png',
    alt: 'ไทย',
    nextLabel: 'Passa a Italiano',
  },
};

interface DishItem {
  name: string;
  description: string;
  price: string;
}

interface ThemeTranslation {
  id: Exclude<Theme, 'landing'>;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  image: string;
  dishes: DishItem[];
}

interface I18nContent {
  hubTitlePrefix: string;
  hubTitleAccent: string;
  hubSubtitle: string;
  hubFooter: string;
  backToHub: string;
  bookTable: string;
  hoursTitle: string;
  hoursValue: string;
  locationTitle: string;
  locationValue: string;
  contactTitle: string;
  contactValue: string;
  specialtiesHeading: string;
  themeFooter: string;
  themes: ThemeTranslation[];
}

const CONTENT: Record<Language, I18nContent> = {
  it: {
    hubTitlePrefix: 'The Gastronomic',
    hubTitleAccent: 'Hub',
    hubSubtitle:
      "Quattro anime, un'unica destinazione. Scegli l'esperienza che desideri vivere oggi.",
    hubFooter: 'Beta 0.0.1 • Progetto Gastronomic Hub',
    backToHub: "Torna all'Hub",
    bookTable: 'Prenota un Tavolo',
    hoursTitle: 'Orari',
    hoursValue: 'Lun - Dom: 12:00 - 23:00',
    locationTitle: 'Posizione',
    locationValue: 'Via del Gusto, 42 - Roma',
    contactTitle: 'Contatti',
    contactValue: '+39 06 123 4567',
    specialtiesHeading: 'Specialità della Casa',
    themeFooter: '© 2026 The Gastronomic Hub • Beta 0.0.1 • Tutti i diritti riservati',
    themes: [
      {
        id: 'pizzeria',
        title: 'Pizzeria Bella Napoli',
        subtitle: 'Vibrante & Popolare',
        description:
          "Il cuore pulsante della tradizione. Pizza cotta a legna, ingredienti freschi e un'atmosfera che celebra la gioia di stare insieme.",
        icon: Pizza,
        image:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000',
        dishes: [
          {
            name: 'Margherita Verace DOP',
            description:
              'Pomodoro San Marzano DOP, mozzarella di bufala campana, basilico fresco e olio extravergine.',
            price: '€14,00',
          },
          {
            name: 'Diavola del Vesuvio',
            description:
              "Salame piccante artigianale, fior di latte d'Agerola, peperoncino calabrese e miele agli agrumi.",
            price: '€18,00',
          },
          {
            name: 'Oro di Pistacchio',
            description:
              'Crema di pistacchio di Bronte, mortadella Bologna IGP, burrata fresca e granella tostata.',
            price: '€20,00',
          },
        ],
      },
      {
        id: 'tavola-calda',
        title: 'Fast & Good',
        subtitle: 'Pratico & Veloce',
        description:
          'La soluzione ideale per la tua pausa pranzo. Piatti caldi pronti in pochi minuti, senza rinunciare al gusto della cucina casalinga.',
        icon: UtensilsCrossed,
        image:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000',
        dishes: [
          {
            name: 'Lasagna Tradizionale Express',
            description:
              "Sfoglia fresca all'uovo, ragù lento alla bolognese, besciamella cremosa e Parmigiano 24 mesi.",
            price: '€12,00',
          },
          {
            name: 'Bowl Mediterranea Gourmet',
            description:
              'Farro biologico, salmone scottato, avocado, pomodorini confit, olive taggiasche e dressing al limone.',
            price: '€14,00',
          },
          {
            name: 'Pollo Croccante alle Erbe',
            description:
              'Filetto di pollo ruspante panato alle erbe aromatiche con patate novelle al forno.',
            price: '€13,00',
          },
        ],
      },
      {
        id: 'standard',
        title: 'Trattoria da Nonna',
        subtitle: 'Accogliente & Familiare',
        description:
          'Un rifugio di sapori autentici. Dove ogni ricetta racconta una storia e ogni ospite è parte della nostra grande famiglia.',
        icon: Home,
        image:
          'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000',
        dishes: [
          {
            name: 'Tagliatelle al Ragù Antico',
            description:
              'Pasta tirata a mano al mattarello con ragù della domenica cotto lentamente per sei ore.',
            price: '€18,00',
          },
          {
            name: 'Ossobuco alla Milanese',
            description:
              'Tenero ossobuco di vitello brasato servito con risotto cremoso allo zafferano in pistilli.',
            price: '€24,00',
          },
          {
            name: 'Tiramisù della Casa',
            description:
              'Savoiardi artigianali, crema al mascarpone fresco, caffè espresso in moka e cacao amaro.',
            price: '€10,00',
          },
        ],
      },
      {
        id: 'luxury',
        title: "L'Essenza",
        subtitle: 'Elegante & Minimalista',
        description:
          "Un viaggio sensoriale d'élite. Minimalismo estetico e ricerca gastronomica si fondono in un'esperienza indimenticabile.",
        icon: Sparkles,
        image:
          'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000',
        dishes: [
          {
            name: 'Capesante, Oro & Caviale',
            description:
              "Capesante scottate, spuma di topinambur, caviale Oscietra Royal e foglia d'oro 24k.",
            price: '€45,00',
          },
          {
            name: 'Risotto Assoluto al Tartufo Bianco',
            description:
              "Riso Carnaroli Riserva, burro d'alpeggio affumicato, riduzione di Barolo e tartufo bianco d'Alba.",
            price: '€55,00',
          },
          {
            name: 'Wagyu A5 & Fumo di Bosco',
            description:
              'Controfiletto di Wagyu Miyazaki A5, jus ai mirtilli neri fermentati e radici invernali.',
            price: '€75,00',
          },
        ],
      },
    ],
  },
  en: {
    hubTitlePrefix: 'The Gastronomic',
    hubTitleAccent: 'Hub',
    hubSubtitle:
      'Four souls, one destination. Choose the culinary experience you wish to live today.',
    hubFooter: 'Beta 0.0.1 • Gastronomic Hub Project',
    backToHub: 'Back to Hub',
    bookTable: 'Book a Table',
    hoursTitle: 'Opening Hours',
    hoursValue: 'Mon - Sun: 12:00 PM - 11:00 PM',
    locationTitle: 'Location',
    locationValue: 'Via del Gusto, 42 - Rome',
    contactTitle: 'Contact',
    contactValue: '+39 06 123 4567',
    specialtiesHeading: 'House Specialties',
    themeFooter: '© 2026 The Gastronomic Hub • Beta 0.0.1 • All rights reserved',
    themes: [
      {
        id: 'pizzeria',
        title: 'Pizzeria Bella Napoli',
        subtitle: 'Vibrant & Traditional',
        description:
          'The beating heart of tradition. Wood-fired pizza, fresh ingredients, and an atmosphere that celebrates the joy of being together.',
        icon: Pizza,
        image:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000',
        dishes: [
          {
            name: 'Authentic Margherita DOP',
            description:
              'San Marzano DOP tomatoes, Campana buffalo mozzarella, fresh basil, and extra virgin olive oil.',
            price: '€14.00',
          },
          {
            name: 'Vesuvius Diavola',
            description:
              'Artisanal spicy salami, Agerola fior di latte, Calabrian chili pepper, and citrus honey.',
            price: '€18.00',
          },
          {
            name: 'Bronte Pistachio Gold',
            description:
              'Bronte pistachio cream, IGP Bologna mortadella, fresh burrata, and toasted pistachio crumble.',
            price: '€20.00',
          },
        ],
      },
      {
        id: 'tavola-calda',
        title: 'Fast & Good',
        subtitle: 'Practical & Quick',
        description:
          'The ideal solution for your lunch break. Hot dishes ready in minutes, without sacrificing the taste of home-style cooking.',
        icon: UtensilsCrossed,
        image:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000',
        dishes: [
          {
            name: 'Express Traditional Lasagna',
            description:
              'Fresh egg pasta sheets, slow-cooked Bolognese ragù, creamy béchamel, and 24-month Parmigiano.',
            price: '€12.00',
          },
          {
            name: 'Gourmet Mediterranean Bowl',
            description:
              'Organic spelt, seared salmon, avocado, confit cherry tomatoes, Taggiasca olives, and lemon dressing.',
            price: '€14.00',
          },
          {
            name: 'Crispy Herb Chicken',
            description:
              'Free-range chicken fillet breaded with aromatic herbs, served with roasted baby potatoes.',
            price: '€13.00',
          },
        ],
      },
      {
        id: 'standard',
        title: 'Trattoria da Nonna',
        subtitle: 'Cozy & Family-Style',
        description:
          'A haven of authentic flavors. Where every recipe tells a story and every guest becomes part of our big family.',
        icon: Home,
        image:
          'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000',
        dishes: [
          {
            name: 'Hand-Rolled Tagliatelle al Ragù',
            description:
              'Rolling-pin handmade pasta with Sunday meat ragù slow-simmered for six hours.',
            price: '€18.00',
          },
          {
            name: 'Ossobuco alla Milanese',
            description:
              'Tender braised veal shank served with creamy saffron thread risotto.',
            price: '€24.00',
          },
          {
            name: 'House Classic Tiramisù',
            description:
              'Artisanal ladyfingers, fresh mascarpone cream, moka espresso coffee, and bitter cocoa.',
            price: '€10.00',
          },
        ],
      },
      {
        id: 'luxury',
        title: "L'Essenza",
        subtitle: 'Elegant & Minimalist',
        description:
          'An elite sensory journey. Aesthetic minimalism and gastronomic research merge into an unforgettable fine dining experience.',
        icon: Sparkles,
        image:
          'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000',
        dishes: [
          {
            name: 'Scallops, Gold & Caviar',
            description:
              'Seared scallops, Jerusalem artichoke foam, Royal Oscietra caviar, and 24k gold leaf.',
            price: '€45.00',
          },
          {
            name: 'Absolute White Truffle Risotto',
            description:
              'Reserve Carnaroli rice, smoked alpine butter, Barolo reduction, and Alba white truffle.',
            price: '€55.00',
          },
          {
            name: 'A5 Wagyu & Forest Smoke',
            description:
              'Miyazaki A5 Wagyu striploin, fermented wild blueberry jus, and winter root textures.',
            price: '€75.00',
          },
        ],
      },
    ],
  },
  th: {
    hubTitlePrefix: 'ศูนย์รวม',
    hubTitleAccent: 'ศาสตร์แห่งอาหาร',
    hubSubtitle:
      'สี่จิตวิญญาณ หนึ่งจุดหมายปลายทาง เลือกประสบการณ์ความอร่อยที่คุณต้องการสัมผัสในวันนี้',
    hubFooter: 'Beta 0.0.1 • โครงการ Gastronomic Hub',
    backToHub: 'กลับสู่หน้าหลัก',
    bookTable: 'จองโต๊ะอาหาร',
    hoursTitle: 'เวลาทำการ',
    hoursValue: 'จันทร์ - อาทิตย์: 12:00 - 23:00 น.',
    locationTitle: 'สถานที่ตั้ง',
    locationValue: 'Via del Gusto, 42 - โรม, อิตาลี',
    contactTitle: 'ติดต่อเรา',
    contactValue: '+39 06 123 4567',
    specialtiesHeading: 'เมนูซิกเนเจอร์ประจำร้าน',
    themeFooter: '© 2026 The Gastronomic Hub • Beta 0.0.1 • สงวนลิขสิทธิ์ทั้งหมด',
    themes: [
      {
        id: 'pizzeria',
        title: 'Pizzeria Bella Napoli',
        subtitle: 'มีชีวิตชีวาและต้นตำรับแท้',
        description:
          'หัวใจสำคัญแห่งประเพณีดั้งเดิม พิซซ่าเตาถ่านหอมกรุ่น วัตถุดิบสดใหม่ และบรรยากาศที่เฉลิมฉลองความสุขของการมาพบปะกัน',
        icon: Pizza,
        image:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000',
        dishes: [
          {
            name: 'พิซซ่ามาร์เกริต้าต้นตำรับ DOP',
            description:
              'มะเขือเทศซานมาร์ซาโน DOP มอสซาเรลล่าชีสนมควาย โหระพาสด และน้ำมันมะกอกสกัดเย็น',
            price: '€14.00',
          },
          {
            name: 'พิซซ่าเดียโวล่าแห่งเวซูเวียส',
            description:
              'ซาลามี่รสเผ็ดทำมือ ชีสฟิออร์ดิลาตเต้ พริกคาลาเบรีย และน้ำผึ้งกลิ่นซิตรัส',
            price: '€18.00',
          },
          {
            name: 'พิซซ่าทองคำพิสตาชิโอ',
            description:
              'ครีมพิสตาชิโอแห่งบรอนเต้ มอร์ทาเดลล่าโบโลญญ่า IGP บูราต้าชีสสด และพิสตาชิโอคั่วบด',
            price: '€20.00',
          },
        ],
      },
      {
        id: 'tavola-calda',
        title: 'Fast & Good',
        subtitle: 'สะดวก รวดเร็ว และอร่อย',
        description:
          'ทางเลือกที่สมบูรณ์แบบสำหรับมื้อกลางวันของคุณ อาหารจานร้อนพร้อมเสิร์ฟในไม่กี่นาที โดยไม่ลดทอนรสชาติแบบโฮมเมดแท้ๆ',
        icon: UtensilsCrossed,
        image:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000',
        dishes: [
          {
            name: 'ลาซานญ่าต้นตำรับเสิร์ฟด่วน',
            description:
              'แผ่นพาสต้าไข่สด ซอสเนื้อโบโลเนสเคี่ยวพิถีพิถัน เบชาเมลครีมมี่ และชีสพาร์มิเจียโนบ่ม 24 เดือน',
            price: '€12.00',
          },
          {
            name: 'เมดิเตอร์เรเนียนกูร์เมต์โบวล์',
            description:
              'ธัญพืชออร์แกนิก แซลมอนย่างสุกกำลังดี อะโวคาโด มะเขือเทศเชอร์รี่กงฟี มะกอกทักจาสกา และน้ำสลัดเลมอน',
            price: '€14.00',
          },
          {
            name: 'ไก่กรอบสมุนไพรหอม',
            description:
              'เนื้ออกไก่เลี้ยงอิสระชุบเกล็ดขนมปังสมุนไพรทอดกรอบ เสิร์ฟพร้อมมันฝรั่งอ่อนอบโรสแมรี่',
            price: '€13.00',
          },
        ],
      },
      {
        id: 'standard',
        title: 'Trattoria da Nonna',
        subtitle: 'อบอุ่นและคุ้นเคยเหมือนบ้าน',
        description:
          'ที่พักพิงแห่งรสชาติต้นตำรับแท้ ที่ซึ่งทุกสูตรอาหารบอกเล่าเรื่องราว และแขกทุกคนคือส่วนหนึ่งของครอบครัวใหญ่ของเรา',
        icon: Home,
        image:
          'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000',
        dishes: [
          {
            name: 'ตัลยาเตลเลซอสเนื้อสูตรคุณยาย',
            description:
              'เส้นพาสต้านวดมือด้วยไม้นวดแป้ง คลุกเคล้าซอสเนื้อสูตรวันอาทิตย์ที่เคี่ยวนานกว่าหกชั่วโมง',
            price: '€18.00',
          },
          {
            name: 'ออสโซบูโกสไตล์มิลาน',
            description:
              'น่องลูกวัวตุ๋นจนนุ่มละลายในปาก เสิร์ฟคู่กับรีซอตโตหญ้าฝรั่นหอมกรุ่นเนื้อครีมมี่',
            price: '€24.00',
          },
          {
            name: 'ทีรามิสุสูตรประจำบ้าน',
            description:
              'เลดี้ฟิงเกอร์ทำมือ ครีมมาสคาร์โปเน่สด กาแฟเอสเปรสโซต้มสด และผงโกโก้เข้มข้น',
            price: '€10.00',
          },
        ],
      },
      {
        id: 'luxury',
        title: "L'Essenza",
        subtitle: 'หรูหราและมินิมอลระดับไฟน์ไดนิ่ง',
        description:
          'การเดินทางแห่งประสาทสัมผัสระดับสูง ความงามแบบมินิมอลและงานวิจัยด้านศาสตร์อาหารหลอมรวมเป็นประสบการณ์อันมิอาจลืมเลือน',
        icon: Sparkles,
        image:
          'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000',
        dishes: [
          {
            name: 'หอยเชลล์ ทองคำ และคาเวียร์',
            description:
              'หอยเชลล์ย่างไฟอ่อน โฟมแก่นตะวัน คาเวียร์ Royal Oscietra และแผ่นทองคำบริสุทธิ์ 24k',
            price: '€45.00',
          },
          {
            name: 'รีซอตโตเห็ดทรัฟเฟิลขาวแห่งอัลบา',
            description:
              'ข้าวคาร์นาโรลีคัดพิเศษ เนยอัลไพน์รมควัน ซอสบาโรโลเคี่ยวเข้มข้น และเห็ดทรัฟเฟิลขาวอัลบา',
            price: '€55.00',
          },
          {
            name: 'วากิว A5 และกลิ่นควันพงไพร',
            description:
              'เนื้อวากิวมิยาซากิ A5 ซอสบลูเบอร์รี่ป่าหมักบ่ม และรากไม้ฤดูหนาวหลากรสสัมผัส',
            price: '€75.00',
          },
        ],
      },
    ],
  },
};

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang')?.toLowerCase();
    if (urlLang === 'it' || urlLang === 'en' || urlLang === 'th') {
      return urlLang;
    }
    const saved = localStorage.getItem('ristorante_lang')?.toLowerCase();
    if (saved === 'it' || saved === 'en' || saved === 'th') {
      return saved;
    }
  }
  return 'it';
}

function LanguageSwitchButton({
  lang,
  onToggle,
  variant = 'light',
}: {
  lang: Language;
  onToggle: () => void;
  variant?: 'light' | 'theme';
}) {
  const info = LANG_INFO[lang];
  return (
    <button
      onClick={onToggle}
      title={info.nextLabel}
      className={
        variant === 'light'
          ? 'flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/90 hover:bg-white border border-slate-200 shadow-sm text-slate-800 transition-all cursor-pointer'
          : 'flex items-center gap-2 px-3 py-1.5 rounded-lg border border-current/20 hover:border-[var(--accent)] bg-current/5 transition-all cursor-pointer'
      }
    >
      <img
        src={info.flag}
        alt={info.alt}
        className="w-5 h-auto rounded-[2px]"
      />
      <span className="text-xs font-bold tracking-wider">{info.code}</span>
    </button>
  );
}

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('landing');
  const [lang, setLang] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const toggleLanguage = () => {
    setLang((prev) => {
      const order: Language[] = ['it', 'en', 'es', 'th'];
      const next = order[(order.indexOf(prev) + 1) % order.length];
      try {
        localStorage.setItem('ristorante_lang', next);
      } catch {}
      return next;
    });
  };

  const t = CONTENT[lang];

  const renderLanding = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50"
    >
      {/* Top Bar with Language Switcher */}
      <div className="fixed top-6 right-6 z-50">
        <LanguageSwitchButton lang={lang} onToggle={toggleLanguage} variant="light" />
      </div>

      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-center mb-16 mt-12 md:mt-0"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-slate-900 mb-4">
          {t.hubTitlePrefix}{' '}
          <span className="text-blue-600 italic">{t.hubTitleAccent}</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          {t.hubSubtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {t.themes.map((theme, index) => (
          <motion.button
            key={theme.id}
            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 1 : -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentTheme(theme.id)}
            className="relative group overflow-hidden rounded-3xl aspect-[3/4] shadow-2xl cursor-pointer"
          >
            <img
              src={theme.image}
              alt={theme.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
              <theme.icon className="w-12 h-12 text-white mb-4 opacity-80" />
              <h2 className="text-3xl font-bold text-white mb-2">
                {theme.title}
              </h2>
              <p className="text-white/70 text-sm uppercase tracking-widest">
                {theme.subtitle}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <footer className="mt-20 text-slate-400 text-sm flex items-center gap-2">
        <ChefHat size={16} />
        <span>{t.hubFooter}</span>
      </footer>
    </motion.div>
  );

  const renderThemeContent = () => {
    const theme = t.themes.find((item) => item.id === currentTheme);
    if (!theme) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="min-h-screen flex flex-col"
      >
        {/* Navigation */}
        <nav className="p-6 flex justify-between items-center border-b border-current/10 sticky top-0 bg-[var(--bg)] z-50">
          <button
            onClick={() => setCurrentTheme('landing')}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">{t.backToHub}</span>
          </button>
          <div className="text-xl font-bold tracking-tighter hidden sm:block">
            {theme.title}
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitchButton
              lang={lang}
              onToggle={toggleLanguage}
              variant="theme"
            />
            <Instagram
              size={20}
              className="cursor-pointer hover:text-[var(--accent)]"
            />
            <Facebook
              size={20}
              className="cursor-pointer hover:text-[var(--accent)]"
            />
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex-1 grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 lg:p-24 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-[var(--accent)] font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
                {theme.subtitle}
              </span>
              <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight">
                {theme.title.split(' ').map((word, i) => (
                  <span
                    key={i}
                    className={i % 2 !== 0 ? 'italic font-serif' : ''}
                  >
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-xl opacity-80 max-w-lg mb-12 leading-relaxed">
                {theme.description}
              </p>
              <button className="bg-[var(--accent)] text-[var(--bg)] px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl cursor-pointer">
                {t.bookTable}
              </button>
            </motion.div>
          </div>

          <div className="relative h-[60vh] lg:h-auto overflow-hidden">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={theme.image}
              alt={theme.title}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] to-transparent lg:block hidden" />
          </div>
        </section>

        {/* Info Grid */}
        <section className="p-12 lg:p-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-current/10">
          <div className="flex flex-col items-center text-center">
            <Clock className="mb-4 text-[var(--accent)]" size={32} />
            <h3 className="text-xl font-bold mb-2">{t.hoursTitle}</h3>
            <p className="opacity-70">{t.hoursValue}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <MapPin className="mb-4 text-[var(--accent)]" size={32} />
            <h3 className="text-xl font-bold mb-2">{t.locationTitle}</h3>
            <p className="opacity-70">{t.locationValue}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Phone className="mb-4 text-[var(--accent)]" size={32} />
            <h3 className="text-xl font-bold mb-2">{t.contactTitle}</h3>
            <p className="opacity-70">{t.contactValue}</p>
          </div>
        </section>

        {/* Menu Preview */}
        <section className="p-12 lg:p-24 bg-current/5">
          <h2 className="text-4xl font-bold mb-16 text-center">
            {t.specialtiesHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {theme.dishes.map((dish, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-[var(--bg)] p-8 rounded-3xl shadow-lg border border-current/5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                    <ChefHat className="text-[var(--accent)]" />
                  </div>
                  <h4 className="text-2xl font-bold mb-4">{dish.name}</h4>
                  <p className="opacity-70 mb-6">{dish.description}</p>
                </div>
                <span className="text-2xl font-bold text-[var(--accent)]">
                  {dish.price}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="p-12 text-center border-t border-current/10 opacity-50 text-sm">
          {t.themeFooter}
        </footer>
      </motion.div>
    );
  };

  return (
    <div className="overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentTheme === 'landing' ? renderLanding() : renderThemeContent()}
      </AnimatePresence>
    </div>
  );
}
