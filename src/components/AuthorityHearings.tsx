import React from 'react';

interface Props {
  onNavigate: (page: any) => void;
}

const hearings = [
  { 
    date: '18 MAR 2026', 
    time: '10:30 AM',
    caseId: 'CIV-1023/2026', 
    court: 'District Court - Room 4B',
    type: 'Preliminary Hearing',
    priority: 'High'
  },
  { 
    date: '22 MAR 2026', 
    time: '02:00 PM',
    caseId: 'CRM-1045/2025', 
    court: 'Sessions Court - Room 12',
    type: 'Evidence Review',
    priority: 'Normal'
  },
];

export default function AuthorityHearings({ onNavigate }: Props) {
  return (
    <div className="h-screen w-full bg-[#030712] text-slate-100 overflow-hidden font-sans flex flex-col p-8 lg:p-12 relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] bg-emerald-600/5 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col h-full">
        
        {/* Header Section */}
        <header className="mb-12 animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">Upcoming Hearings</h1>
              <p className="text-emerald-500 font-bold text-[10px] tracking-[0.4em] uppercase mt-2">
                Judicial Calendar • 2026 Schedule
              </p>
            </div>
            <button
              onClick={() => onNavigate('authority-dashboard')}
              className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
            >
              ← Back to Overview
            </button>
          </div>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
        </header>

        {/* Timeline Content */}
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-6 pb-12">
          {hearings.map((h, i) => (
            <div 
              key={i}
              style={{ animationDelay: `${i * 150}ms` }}
              className="group relative animate-in fade-in slide-in-from-bottom-8 fill-mode-both duration-700"
            >
              <div className="bg-slate-900/40 border border-white/10 backdrop-blur-xl rounded-[2rem] p-8 transition-all duration-500 hover:border-emerald-500/30 hover:bg-slate-800/60 shadow-xl flex items-center gap-8">
                
                {/* Date/Time Block */}
                <div className="shrink-0 text-center border-r border-white/10 pr-8">
                  <p className="text-[10px] font-black text-emerald-500 tracking-tighter mb-1">{h.time}</p>
                  <p className="text-2xl font-black text-white tracking-tighter leading-none">{h.date.split(' ')[0]}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">{h.date.split(' ').slice(1).join(' ')}</p>
                </div>

                {/* Information Block */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {h.caseId}
                    </h3>
                    <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${
                      h.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {h.priority} Priority
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-tight">{h.court}</p>
                  <p className="text-slate-500 text-xs mt-1 italic">{h.type}</p>
                </div>

                {/* Interaction Arrow */}
                <div className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 text-emerald-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #10b981; }
      `}</style>
    </div>
  );
}