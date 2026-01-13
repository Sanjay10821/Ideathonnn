import React from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from './Navigation';

export default function HomePage({
  onNavigate,
}: {
  onNavigate: (p: 'home' | 'chatbot' | 'features' | 'tracking' | 'impact' | 'kiosk') => void;
}) {
  const { t } = useTranslation();

  // 🔧 SINGLE SOURCE OF TRUTH for opening chat
  const handleOpenChat = () => {
    window.dispatchEvent(new Event('open-chat'));
  };

  return (
    <div className="h-screen w-screen bg-[#020617] text-slate-200 font-sans overflow-hidden">
      {/* Background lighting */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-emerald-600/[0.04] blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[45%] h-[45%] bg-blue-600/[0.04] blur-[140px]" />
      </div>

      {/* Navigation */}
      <Navigation currentPage="home" onNavigate={onNavigate} />

      {/* PAGE CONTENT */}
      <main className="relative z-10 h-full flex flex-col items-center pt-28 px-6 overflow-y-auto">
        {/* HERO */}
        <section className="flex flex-col items-center text-center max-w-3xl space-y-10 mb-16">
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight">
            {t('bridge_to_justice')}
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {t('hero_description')}
          </p>

          {/* ✅ LAUNCH → KIOSK DEMO */}
          <button
            onClick={() => onNavigate('kiosk')}
            className="px-16 py-4 rounded-xl bg-emerald-600 text-xs font-black uppercase tracking-[0.25em] hover:bg-emerald-500 transition shadow-[0_10px_40px_rgba(16,185,129,0.35)]"
          >
            Launch System
          </button>
        </section>

        {/* CORE MODULES */}
        <section className="w-full max-w-6xl pb-20">
          <div className="flex items-center gap-6 mb-16">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="text-[16px] font-black tracking-[0.4em] uppercase text-white">
              Core Modules
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { id: 'tracking', title: 'Case Tracking', desc: 'Track cases with full transparency and accountability' },
              { id: 'features', title: 'Features', desc: 'Explore AI-powered system features and workflows' },
              { id: 'chatbot', title: 'Chatbot', desc: 'Chat with an assistant to get guidance and intake help' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  item.id === 'chatbot'
                    ? handleOpenChat()
                    : onNavigate(item.id as any)
                }
                className="group relative text-left px-12 py-14 rounded-[2.25rem] bg-gradient-to-b from-[#0b1328] to-[#060b16] ring-2 ring-white/20 hover:ring-emerald-400/70 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-[2.25rem] opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute inset-0 bg-emerald-500/15 blur-3xl" />
                </div>

                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed max-w-sm">{item.desc}</p>
                  <div className="pt-6 text-[10px] font-black uppercase tracking-[0.35em] text-emerald-400">
                    Open Module →
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
