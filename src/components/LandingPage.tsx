import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../translate';

interface LandingPageProps {
  onLanguageSelect: (lang: string) => void;
}

export default function LandingPage({ onLanguageSelect }: LandingPageProps) {
  const { i18n } = useTranslation();
  const [showOthers, setShowOthers] = useState(false);
  const otherRef = useRef<HTMLDivElement | null>(null);

  const primaryLanguages = [
    { id: 'en', label: 'English', sub: 'PRIMARY' },
    { id: 'hi', label: 'हिन्दी', sub: 'HINDI' },
    { id: 'ta', label: 'தமிழ்', sub: 'TAMIL' },
  ];

  const otherLanguages = [
    { id: 'bn', label: 'বাংলা' },
    { id: 'mr', label: 'मराठी' },
    { id: 'te', label: 'తెలుగు' },
    { id: 'ml', label: 'മലയാളം' },
    { id: 'kn', label: 'ಕನ್ನಡ' },
  ];

  const selectLanguage = async (lang: string) => {
    localStorage.setItem('auto_lang', lang);
    try {
      await i18n.changeLanguage(lang);
    } catch (e) {
      // swallow; still navigate
    }
    // Change Google Translate language immediately
    changeLanguage(lang);
    onLanguageSelect(lang);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (otherRef.current && !otherRef.current.contains(e.target as Node)) {
        setShowOthers(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white px-6 overflow-hidden">
      
      {/* Dynamic Background Glows */}
      <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none opacity-40" />

      {/* ===== Hero Section ===== */}
      <div className="relative z-10 flex flex-col items-center mb-14 text-center">
        
        {/* Branding Sphere */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 mb-10 group transform-gpu transition-transform duration-500 hover:scale-105">
          {/* Inner Content Container */}
          <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center shadow-2xl" 
               style={{ background: 'radial-gradient(60% 60% at 30% 20%, rgba(16,185,129,0.2), rgba(2,6,23,0.4) 55%, rgba(2,6,23,0.8))' }}>
            
            {/* The Image - Increased Opacity for better visibility */}
            <img 
              src="/legal-bg.jpeg" 
              alt="Legal Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-100 grayscale-[20%] transition-transform duration-700 group-hover:scale-110"
              style={{ objectPosition: 'center' }}
            />
            
            {/* Glassy frosted overlay - Slightly reduced blur to show image detail */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/60 backdrop-blur-[2px] pointer-events-none" />
            
            {/* Animated Sheen */}
            <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-[100%] pointer-events-none" />
            
            {/* Centered Text Content */}
            <div className="relative z-10 flex items-center justify-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
               <h1 className="flex items-baseline gap-1.5 select-none">
                 <span className="text-2xl sm:text-3xl font-serif italic text-white tracking-tight">Legal</span>
                 <span className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tighter uppercase">Edge</span>
               </h1>
            </div>
          </div>
          
          {/* Subtle Outer Animated Ring */}
          <div className="absolute inset-[-6px] rounded-full border border-emerald-500/30 animate-[pulse_4s_infinite] pointer-events-none" />
        </div>

        <p className="text-slate-500 font-black tracking-[0.5em] uppercase text-[9px] sm:text-[11px]">
          Choose Your Preferred Language
        </p>
      </div>

      {/* ===== 4-Box Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl z-10">
        
        {primaryLanguages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => selectLanguage(lang.id)}
            className="group relative py-10 rounded-2xl bg-white/[0.03] border border-white/5 
                       hover:border-emerald-500/40 hover:bg-emerald-500/[0.03]
                       transition-all duration-300 flex flex-col items-center justify-center 
                       hover:-translate-y-1.5 shadow-xl"
          >
            <span className="text-3xl font-bold text-white group-hover:text-emerald-50 transition-colors">
              {lang.label}
            </span>
            <span className="text-[10px] text-slate-500 font-black tracking-[0.25em] mt-4 uppercase group-hover:text-emerald-400 transition-colors">
              {lang.sub}
            </span>
          </button>
        ))}

        {/* More Languages Dropdown */}
        <div ref={otherRef} className="relative">
          <button
            onClick={() => setShowOthers(!showOthers)}
            className={`w-full py-10 h-full rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center 
                       ${showOthers 
                         ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.3)]' 
                         : 'bg-white/[0.03] border-white/10 text-slate-400 hover:border-emerald-500/40'}`}
          >
            <span className="text-base font-black tracking-[0.2em] uppercase">Others</span>
            <span className={`text-[10px] mt-2 transition-transform duration-300 ${showOthers ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {showOthers && (
            <div className="absolute bottom-full mb-4 left-0 right-0
                            bg-[#0a0f1e] backdrop-blur-3xl border border-white/10 rounded-2xl
                            shadow-2xl z-50 overflow-hidden 
                            animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-200">
              <div className="flex flex-col divide-y divide-white/5 max-h-64 overflow-y-auto custom-scrollbar">
                {otherLanguages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      selectLanguage(lang.id);
                      setShowOthers(false);
                    }}
                    className="w-full py-4 text-center text-slate-300 hover:bg-emerald-500 hover:text-slate-950 transition-all text-lg font-bold"
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== Footer ===== */}
      <footer className="mt-24 text-slate-600">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-[1px] bg-emerald-500/20" />
            <p className="text-[10px] font-mono tracking-widest uppercase opacity-40">
              Authorized Legal Access Platform
            </p>
          </div>
      </footer>
    </div>
  );
}