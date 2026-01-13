import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface CaseItem {
  id: string;
  status: string;
  date: string;
  type: string;
}

export default function AuthorityDashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const stats = [
    { label: 'Total Portfolio', value: 24, color: 'text-emerald-400', delay: 'delay-200' },
    { label: 'Active Litigation', value: 14, color: 'text-blue-400', delay: 'delay-300' },
    { label: 'Scheduled Hearings', value: 6, color: 'text-purple-400', delay: 'delay-400' },
    { label: 'Pending Review', value: 4, color: 'text-amber-400', delay: 'delay-500' },
  ];

  const caseData: CaseItem[] = [
    { id: 'CIV-2026-001', status: 'In Review', date: 'JAN 10', type: 'CIVIL' },
    { id: 'CRM-2025-088', status: 'Scheduled', date: 'JAN 12', type: 'CRIMINAL' },
    { id: 'FAM-2026-104', status: 'Pending', date: 'JAN 13', type: 'FAMILY' },
    { id: 'LND-2026-004', status: 'In Review', date: 'JAN 13', type: 'LAND' },
  ];

  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(16, 185, 129); 
      doc.text("JUDICIAL INTELLIGENCE COCKPIT", 14, 20);
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("OFFICIAL CASE LEDGER", 14, 28);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 34);

      autoTable(doc, {
        head: [["Reference ID", "Category", "Status", "Entry Date"]],
        body: caseData.map(item => [item.id, item.type, item.status, item.date]),
        startY: 45,
        theme: 'grid',
        headStyles: { fillColor: [16, 185, 129] }
      });

      doc.save(`Judicial_Cockpit_Report_${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF Export failed:", err);
      alert("System could not generate PDF. Please ensure jspdf-autotable is installed.");
    }
  };

  return (
    <div className="h-screen w-full bg-[#030712] text-slate-100 overflow-hidden font-sans flex flex-col p-8 lg:p-10 relative box-border">
      
      {/* Background Visual Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[10%] w-[45%] h-[45%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-[-5%] right-[10%] w-[45%] h-[45%] bg-emerald-600/10 blur-[150px] rounded-full animate-pulse opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto h-full flex flex-col gap-8">
        
        {/* Header Section */}
        <header className={`flex justify-between items-end shrink-0 transition-all duration-1000 ease-premium ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-white uppercase ">Judicial Intelligence Cockpit</h1>
            <p className="text-emerald-500 font-bold text-[10px] tracking-[0.4em] uppercase"> Secure Access Mode</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => onNavigate('authority-cases')} className="px-10 py-3 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl hover:bg-emerald-400 transition-all shadow-xl active:scale-95">
              BROWSE CASES
            </button>
            <button onClick={exportPDF} className="px-10 py-3 bg-slate-800/80 border border-white/20 text-xs font-black rounded-xl hover:bg-slate-700 transition-all uppercase tracking-widest text-emerald-400">
              DOWNLOAD PDF
            </button>
          </div>
        </header>

        {/* Metrics Section */}
        <div className="grid grid-cols-4 gap-6 shrink-0">
          {stats.map((s, i) => (
            <div key={i} className={`transition-all duration-700 ease-premium ${s.delay} ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
              <div className="bg-slate-900/50 border border-white/10 backdrop-blur-3xl p-8 rounded-[2rem] shadow-2xl transition-all hover:border-white/20">
                <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] mb-4">{s.label}</p>
                <div className={`text-6xl font-black tracking-tighter ${s.color}`}>
                  {s.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ledger & Alerts */}
        <div className={`grid grid-cols-12 gap-8 min-h-0 flex-1 pb-4 transition-all duration-1000 delay-700 ease-premium ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="col-span-8 bg-slate-900/30 border border-white/10 rounded-[2.5rem] p-10 flex flex-col min-h-0 relative shadow-2xl overflow-hidden">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-8 italic">Official Case Ledger</h3>
            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              <table className="w-full text-left border-separate border-spacing-y-3">
                <thead className="sticky top-0 bg-[#070b14] z-20">
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <th className="pb-4 pl-4">Reference</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-center">Entry</th>
                    <th className="pb-4 text-right pr-4">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {caseData.map((row, i) => (
                    <tr key={i} className="group bg-white/[0.02] hover:bg-white/[0.08] transition-all duration-300">
                      <td className="py-6 pl-6 rounded-l-2xl font-bold text-white border-y border-l border-white/5">{row.id}</td>
                      <td className="py-6 border-y border-white/5 font-bold text-emerald-400/80 tracking-tighter uppercase">{row.status}</td>
                      <td className="py-6 text-center text-slate-300 font-mono font-bold border-y border-white/5">{row.date}</td>
                      <td className="py-6 pr-6 rounded-r-2xl text-right border-y border-r border-white/5">
                        <button onClick={() => onNavigate('authority-cases')} className="text-[10px] font-black text-emerald-400/40 hover:text-emerald-400 transition-colors uppercase">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-4 bg-slate-950/60 border border-white/10 rounded-[2.5rem] p-10 flex flex-col shadow-2xl">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-10 italic">Priority Review</h3>
            <div className="space-y-8 flex-1">
              {[
                { title: 'Affidavit Verification Required', time: '2H', color: 'bg-emerald-500' },
                { title: 'Signature Discrepancy Found', time: '5H', color: 'bg-amber-500' },
                { title: 'New Evidence Submitted', time: '1D', color: 'bg-blue-500' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-6 group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-all">
                  <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${alert.color} shadow-[0_0_15px_currentcolor] animate-pulse`} />
                  <div>
                    <p className="text-xs font-bold text-slate-100 group-hover:text-emerald-400 transition-colors tracking-tight leading-tight">{alert.title}</p>
                    <span className="text-[10px] text-slate-500 font-black mt-2 block tracking-widest uppercase">{alert.time} AGO</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}