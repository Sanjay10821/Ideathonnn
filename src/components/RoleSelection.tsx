import React from 'react';

interface RoleSelectionProps {
  onSelectRole: (role: 'user' | 'authority') => void;
}

export default function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  return (
    <div className="relative min-h-screen bg-[#020617] flex items-center justify-center text-white px-6 overflow-hidden">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] animate-pulse" />

      <div className="relative z-10 max-w-5xl w-full">
        <div className="text-center mb-16 animate-in fade-in zoom-in duration-700">
          <h2 className="text-slate-500 uppercase tracking-[0.6em] text-xs font-bold mb-4">
            Unified Justice Portal
          </h2>
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
            Select Your Access Portal
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Citizen Portal */}
          <button
            onClick={() => onSelectRole('user')}
            className="group relative rounded-[2.5rem] bg-slate-900/40 border border-white/10 p-12 text-left
                       hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-4
                       backdrop-blur-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/30">
                <span className="text-3xl">⚖️</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">Public Kiosk</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Guided legal assistance, case tracking, and citizen information services.
              </p>
            </div>
          </button>

          {/* Authority Portal */}
          <button
            onClick={() => onSelectRole('authority')}
            className="group relative rounded-[2.5rem] bg-slate-900/40 border border-white/10 p-12 text-left
                       hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-4
                       backdrop-blur-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/30">
                <span className="text-3xl">🏛️</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Legal Authority</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Administrative dashboard for judicial review, hearing management, and analytics.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}