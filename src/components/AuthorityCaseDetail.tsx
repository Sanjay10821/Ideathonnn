import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Props {
  caseId: string;
  onBack: () => void;
}

export default function AuthorityCaseDetail({ caseId, onBack }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Entrance animation trigger
    setLoaded(true);
  }, []);

  // Robust PDF Generation Logic
  const exportCaseSummary = () => {
    try {
      const doc = new jsPDF();
      
      // Document Header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(16, 185, 129); // Emerald
      doc.text("JUDICIAL INTELLIGENCE CASE SUMMARY", 14, 20);
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Reference ID: ${caseId}`, 14, 28);
      doc.text(`Export Timestamp: ${new Date().toLocaleString()}`, 14, 34);

      // Milestone Table
      autoTable(doc, {
        startY: 45,
        head: [['Milestone Date', 'Event Description', 'Registry Status']],
        body: [
          ['12 JAN 2026', 'Initial Filing and Document Sealing', 'COMPLETED'],
          ['05 FEB 2026', 'Evidence Validation & Preliminary Review', 'COMPLETED'],
          ['18 MAR 2026', 'Scheduled Judicial Session', 'PENDING SESSION'],
        ],
        theme: 'grid',
        headStyles: { fillColor: [16, 185, 129] },
        styles: { fontSize: 10 }
      });

      doc.save(`Judicial_Ref_${caseId}.pdf`);
    } catch (err) {
      console.error("PDF Export failed:", err);
      alert("System could not generate PDF. Please ensure the page has fully loaded.");
    }
  };

  return (
    <div className="h-screen w-full bg-[#030712] text-slate-100 overflow-hidden font-sans flex flex-col p-8 lg:p-12 relative">
      
      {/* Dynamic Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] bg-emerald-600/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full h-full flex flex-col">
        
        {/* Header - Fixed Alignment */}
        <header className={`mb-10 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="flex justify-between items-end">
            <div className="space-y-1 text-left">
              <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">Case Intelligence Reference</h1>
              <p className="text-emerald-500 font-bold text-[10px] tracking-[0.4em] uppercase mt-2">
                Secure Document Vault • Encrypted Record
              </p>
            </div>
            <div className="flex gap-6 items-center">
              <button 
                onClick={exportCaseSummary}
                className="text-[10px] font-black uppercase tracking-widest text-emerald-400 border border-emerald-400/30 px-6 py-2 rounded-xl hover:bg-emerald-400/10 transition-all"
              >
                Download Evidence
              </button>
              <button
                onClick={onBack}
                className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all border-b border-transparent hover:border-white pb-1"
              >
                ← Return to Portfolio
              </button>
            </div>
          </div>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
        </header>

        {/* Dashboard Grid - Fixed Viewport Layout */}
        <div className="grid grid-cols-12 gap-8 flex-1 min-h-0 pb-6">
          
          {/* Left Metadata Panel (Fixed) */}
          <div className={`col-span-4 space-y-6 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl">
              <div className="space-y-8 text-left">
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 italic">Registry Identifier</p>
                  <p className="text-2xl font-bold font-mono text-white tracking-tighter">{caseId}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 italic">Judicial Status</p>
                  <div className="flex items-center gap-3 text-emerald-400">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                    <p className="text-lg font-bold uppercase tracking-tighter">Hearing Scheduled</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-8 group transition-all hover:bg-emerald-500/10 text-left">
               <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-2">Priority Level</p>
               <p className="text-white font-bold tracking-tight italic text-lg group-hover:scale-[1.02] transition-transform origin-left">Tier 1 • Urgent Review Required</p>
            </div>
          </div>

          {/* Right Detailed Panel (Internal Scrolling Enabled) */}
          <div className={`col-span-8 flex flex-col gap-6 min-h-0 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Narrative Summary */}
            <div className="bg-slate-900/20 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-sm shadow-xl shrink-0">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-6 italic text-left">Judicial Narrative</h3>
              <p className="text-slate-300 text-lg font-light leading-relaxed text-left">
                Legal dispute regarding <span className="text-white font-medium border-b border-emerald-500/50 pb-0.5">complex property ownership rights</span> and 
                evidence provided by state registry. All documentation is cryptographically sealed for judicial review only.
              </p>
            </div>

            {/* SCROLLABLE MILESTONE TIMELINE */}
            <div className="flex-1 bg-slate-950/60 border border-white/10 rounded-[2.5rem] p-10 flex flex-col min-h-0 shadow-inner">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-10 italic text-left">Milestone Tracking</h3>
              
              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                                <div className="relative pl-8 border-l border-white/10 ml-2 space-y-12 text-left pb-10">
                  
                  {/* Milestone Item 1 */}
                  <div className="relative group">
                    <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#030712] z-10 shadow-[0_0_10px_#10b981]" />
                    <p className="text-emerald-500 font-mono text-[10px] font-bold mb-1 tracking-widest uppercase">12 Jan 2026</p>
                    <h4 className="text-white font-bold text-lg tracking-tight">Initial Filing and Document Sealing</h4>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2 bg-white/5 inline-block px-2 py-1 rounded">Status: Completed</p>
                  </div>

                  {/* Milestone Item 2 */}
                  <div className="relative group">
                    <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#030712] z-10 shadow-[0_0_10px_#10b981]" />
                    <p className="text-emerald-500 font-mono text-[10px] font-bold mb-1 tracking-widest uppercase">05 Feb 2026</p>
                    <h4 className="text-white font-bold text-lg tracking-tight">Evidence Validation & Preliminary Review</h4>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2 bg-white/5 inline-block px-2 py-1 rounded">Status: Completed</p>
                  </div>

                  {/* Milestone Item 3 */}
                  <div className="relative group">
                    <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-slate-700 border-4 border-[#030712] z-10 group-hover:bg-blue-500 transition-colors" />
                    <p className="text-slate-400 font-mono text-[10px] font-bold mb-1 tracking-widest uppercase italic">18 Mar 2026</p>
                    <h4 className="text-white/60 font-bold text-lg tracking-tight group-hover:text-white transition-colors">Scheduled Judicial Session</h4>
                    <p className="text-blue-400/60 text-[10px] font-black uppercase tracking-[0.2em] mt-2 bg-blue-500/5 inline-block px-2 py-1 rounded">Status: Pending Session</p>
                  </div>

                </div>
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