import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../translate';
import { sendToESP32 } from '../utils/serial';

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

  // ✅ LANGUAGE SELECTION LOGIC
  const selectLanguage = async (lang: string) => {
    localStorage.setItem('auto_lang', lang);

    try {
      await i18n.changeLanguage(lang);
    } catch (e) {}

    changeLanguage(lang);
    onLanguageSelect(lang);

    // 🔌 SEND TO ESP32 (OLED)
    if (lang === 'en') sendToESP32('EN');
    if (lang === 'hi') sendToESP32('HI');
    if (lang === 'ta') sendToESP32('TA');
  };

  // ✅ CLOSE OTHERS DROPDOWN WHEN CLICKING OUTSIDE
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

      {/* Background Glow */}
      <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none opacity-40" />

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center mb-14 text-center">
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 mb-10 group">
          <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center shadow-2xl">
            <img
              src="/legal-bg.jpeg"
              alt="Legal Background"
              className="absolute inset-0 w-full h-full object-cover opacity-100"
            />
            <div className="relative z-10">
              <h1 className="flex gap-1.5">
                <span className="text-3xl font-serif italic">Legal</span>
                <span className="text-3xl font-black text-emerald-400 uppercase">Edge</span>
              </h1>
            </div>
          </div>
        </div>

        <p className="text-slate-500 font-black tracking-[0.5em] uppercase text-[10px]">
          Choose Your Preferred Language
        </p>
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl z-10">
        {primaryLanguages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => selectLanguage(lang.id)}
            className="py-10 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/40 transition-all"
          >
            <span className="text-3xl font-bold">{lang.label}</span>
            <span className="block text-[10px] mt-3 tracking-widest text-slate-500">
              {lang.sub}
            </span>
          </button>
        ))}

        {/* Others */}
        <div ref={otherRef} className="relative">
          <button
            onClick={() => setShowOthers(!showOthers)}
            className="w-full py-10 rounded-2xl border border-white/10 bg-white/[0.03]"
          >
            OTHERS ▼
          </button>

          {showOthers && (
            <div className="absolute bottom-full mb-3 w-full bg-[#0a0f1e] border border-white/10 rounded-xl">
              {otherLanguages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    selectLanguage(lang.id);
                    setShowOthers(false);
                  }}
                  className="w-full py-3 hover:bg-emerald-500 hover:text-black"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 text-slate-600 text-xs tracking-widest">
        Authorized Legal Access Platform
      </footer>
    </div>
  );
}
