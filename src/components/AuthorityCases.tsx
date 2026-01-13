import React, { useEffect, useState } from 'react';

export default function AuthorityCases({ onNavigate }: any) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  const cases = [
    { id: 'CIV-1023/2026', title: 'Property Ownership Dispute', type: 'Civil Division', date: '18 MAR 2026' },
    { id: 'CRM-1045/2025', title: 'State vs Ramesh Kumar', type: 'Criminal Division', date: '22 MAR 2026' },
    { id: 'FAM-1088/2026', title: 'Divorce Petition', type: 'Family Division', date: '30 MAR 2026' },
    { id: 'TAX-1092/2026', title: 'Corporate Tax Evasion', type: 'Fiscal Division', date: '05 APR 2026' },
    { id: 'LND-1104/2026', title: 'Agricultural Land Acquisition', type: 'Land Division', date: '12 APR 2026' },
  ];

  return (
    <div className="h-screen w-full bg-[#030712] text-slate-100 flex flex-col p-12 overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Header - Fixed Position */}
      <header className={`mb-12 shrink-0 transition-all duration-1000 ease-premium ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
        <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white">Assigned Portfolio</h1>
        <button onClick={() => onNavigate('authority-dashboard')} className="mt-4 text-emerald-500 text-xs font-bold tracking-[0.4em] hover:text-white transition-colors uppercase">
          ← Return to Cockpit
        </button>
      </header>

      {/* Main Content Layout - Two Columns */}
      <div className="flex flex-1 gap-12 min-h-0">
        
        {/* Left: Scrollable Case List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-6">
          {cases.map((c, i) => (
            <div 
              key={c.id} 
              style={{ transitionDelay: `${(i + 1) * 150}ms` }} 
              className={`transition-all duration-700 ease-premium ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-y-12'}`}
            >
              <div className="group relative bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl hover:border-emerald-500/40 transition-all shadow-2xl">
                <div className="flex justify-between items-center">
                  <div className="space-y-3 text-left">
                    <span className="text-[10px] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded tracking-tighter italic">{c.id}</span>
                    <h3 className="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors tracking-tight">{c.title}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{c.type} • Next Hearing: {c.date}</p>
                  </div>
                  <button 
                    onClick={() => onNavigate('authority-case-detail', { caseId: c.id })}
                    className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-slate-950 transition-all shrink-0"
                  >
                    Examine Record
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Internal spacer to ensure the last item scrolls fully */}
          <div className="h-12 shrink-0"></div>
        </div>

        {/* Right: Fixed Judicial Intelligence Image */}
        <div className={`w-[450px] hidden lg:flex flex-col items-center justify-center transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative text-center">
            {/* Emerald Background Glow */}
            <div className="absolute inset-0 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
            
            <div className="relative z-10 flex flex-col items-center">
               {/* Digital Scale Iconography */}
               <div className="w-[350px] h-[350px] mb-10 flex items-center justify-center">
                  {/* REPLACE 'scale.png' with your actual file name in the public folder */}
                  <img 
                    src="/scalee.jpeg" 
                    alt="Judicial Registry Seal" 
                    className="w-full h-auto drop-shadow-[0_0_30px_rgba(16,185,129,0.4)] contrast-125 grayscale brightness-110" 
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/350/030712/10b981?text=REGISTRY+SEAL'; // Fallback if file not found
                    }}
                  />
               </div>
               
               <div className="space-y-4">
                 <h2 className="text-emerald-500/60 font-black text-lg tracking-[0.5em] uppercase italic">Registry Database</h2>
               </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.2); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #10b981; }
      `}</style>
    </div>
  );
}