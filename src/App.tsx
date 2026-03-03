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
  Facebook
} from 'lucide-react';

type Theme = 'landing' | 'pizzeria' | 'tavola-calda' | 'standard' | 'luxury';

interface ThemeConfig {
  id: Theme;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  image: string;
}

const THEMES: ThemeConfig[] = [
  {
    id: 'pizzeria',
    title: 'Pizzeria Bella Napoli',
    subtitle: 'Vibrante & Popolare',
    description: 'Il cuore pulsante della tradizione. Pizza cotta a legna, ingredienti freschi e un\'atmosfera che celebra la gioia di stare insieme.',
    icon: Pizza,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'tavola-calda',
    title: 'Fast & Good',
    subtitle: 'Pratico & Veloce',
    description: 'La soluzione ideale per la tua pausa pranzo. Piatti caldi pronti in pochi minuti, senza rinunciare al gusto della cucina casalinga.',
    icon: UtensilsCrossed,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'standard',
    title: 'Trattoria da Nonna',
    subtitle: 'Accogliente & Familiare',
    description: 'Un rifugio di sapori autentici. Dove ogni ricetta racconta una storia e ogni ospite è parte della nostra grande famiglia.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'luxury',
    title: 'L\'Essenza',
    subtitle: 'Elegante & Minimalista',
    description: 'Un viaggio sensoriale d\'élite. Minimalismo estetico e ricerca gastronomica si fondono in un\'esperienza indimenticabile.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000',
  }
];

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('landing');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const renderLanding = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50"
    >
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-extrabold tracking-tighter text-slate-900 mb-4">
          The Gastronomic <span className="text-blue-600 italic">Hub</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Quattro anime, un'unica destinazione. Scegli l'esperienza che desideri vivere oggi.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {THEMES.map((theme, index) => (
          <motion.button
            key={theme.id}
            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 1 : -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentTheme(theme.id)}
            className="relative group overflow-hidden rounded-3xl aspect-[3/4] shadow-2xl"
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
              <h2 className="text-3xl font-bold text-white mb-2">{theme.title}</h2>
              <p className="text-white/70 text-sm uppercase tracking-widest">{theme.subtitle}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <footer className="mt-20 text-slate-400 text-sm flex items-center gap-2">
        <ChefHat size={16} />
        <span>Beta 0.0.1 • Gastronomic Hub Project</span>
      </footer>
    </motion.div>
  );

  const renderThemeContent = () => {
    const theme = THEMES.find(t => t.id === currentTheme);
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
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Torna all'Hub</span>
          </button>
          <div className="text-xl font-bold tracking-tighter">
            {theme.title}
          </div>
          <div className="flex gap-4">
            <Instagram size={20} className="cursor-pointer hover:text-[var(--accent)]" />
            <Facebook size={20} className="cursor-pointer hover:text-[var(--accent)]" />
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
                  <span key={i} className={i % 2 !== 0 ? 'italic font-serif' : ''}>{word} </span>
                ))}
              </h1>
              <p className="text-xl opacity-80 max-w-lg mb-12 leading-relaxed">
                {theme.description}
              </p>
              <button className="bg-[var(--accent)] text-[var(--bg)] px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                Prenota un Tavolo
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
            <h3 className="text-xl font-bold mb-2">Orari</h3>
            <p className="opacity-70">Lun - Dom: 12:00 - 23:00</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <MapPin className="mb-4 text-[var(--accent)]" size={32} />
            <h3 className="text-xl font-bold mb-2">Posizione</h3>
            <p className="opacity-70">Via del Gusto, 42 - Roma</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Phone className="mb-4 text-[var(--accent)]" size={32} />
            <h3 className="text-xl font-bold mb-2">Contatti</h3>
            <p className="opacity-70">+39 06 123 4567</p>
          </div>
        </section>

        {/* Menu Preview (Asymmetric Layout) */}
        <section className="p-12 lg:p-24 bg-current/5">
          <h2 className="text-4xl font-bold mb-16 text-center">Specialità della Casa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                whileHover={{ y: -10 }}
                className="bg-[var(--bg)] p-8 rounded-3xl shadow-lg border border-current/5"
              >
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center mb-6">
                  <ChefHat className="text-[var(--accent)]" />
                </div>
                <h4 className="text-2xl font-bold mb-4">Piatto Signature {item}</h4>
                <p className="opacity-70 mb-6">Un'esplosione di sapori curata dai nostri chef con ingredienti a km zero.</p>
                <span className="text-2xl font-bold text-[var(--accent)]">€{15 + item * 5},00</span>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="p-12 text-center border-t border-current/10 opacity-50 text-sm">
          © 2026 The Gastronomic Hub • Beta 0.0.1 • Tutti i diritti riservati
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
