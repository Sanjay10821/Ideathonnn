import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from './Navigation';

export default function LoginPage({ 
  onLoginSuccess, 
  onNavigate 
}: { 
  onLoginSuccess?: (target?: any) => void;
  onNavigate: (p: any) => void;
}) {
  const { t } = useTranslation();
  const [nextTarget, setNextTarget] = useState<'home' | 'tracking'>('home');
  const [isNewUser, setIsNewUser] = useState(false);
  const [docType, setDocType] = useState('aadhaar');
  const [idNumber, setIdNumber] = useState('');
  const [cnrNumber, setCnrNumber] = useState('');
  const [cnrYear, setCnrYear] = useState<number>(2024);
  const [cnrStatus, setCnrStatus] = useState<'Pending' | 'Disposed' | 'Both'>('Both');
  const [fullName, setFullName] = useState('');
  const [pin, setPin] = useState('');

  // 🛠️ Dynamic Validation Configuration
  const getDocRequirements = () => {
    switch(docType) {
      case 'aadhaar': return { length: 12, placeholder: '12 Digit Aadhaar No.', pattern: '[0-9]{12}' };
      case 'voter': return { length: 10, placeholder: '10 Character Voter ID', pattern: '[A-Z0-9]{10}' };
      case 'ration': return { length: 12, placeholder: '12 Character Ration ID', pattern: '[A-Z0-9]{12}' };
      default: return { length: 16, placeholder: 'Enter ID', pattern: '.*' };
    }
  };

  const docReq = getDocRequirements();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check CNR length if that target is selected
    if (nextTarget === 'tracking' && cnrNumber.length !== 16) {
      alert("CNR Number must be exactly 16 characters.");
      return;
    }

    // Check Government ID length
    if (nextTarget === 'home' && idNumber.length !== docReq.length) {
      alert(`${docType.toUpperCase()} must be exactly ${docReq.length} characters.`);
      return;
    }

    if (onLoginSuccess) {
      onLoginSuccess(nextTarget === 'tracking' ? 'tracking' : 'home');
    } else {
      onNavigate(nextTarget === 'tracking' ? 'tracking' : 'home');
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#020617] overflow-hidden">
      <Navigation currentPage="login" onNavigate={onNavigate} compact={true} />

      <main className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/[0.02] blur-[160px] rounded-full animate-pulse" />
        </div>

        <div className="w-full max-w-lg p-[1px] rounded-[3rem] bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-2xl relative">
          <div className="w-full h-full p-10 sm:p-12 rounded-[2.9rem] bg-[#020617]/90 backdrop-blur-3xl relative overflow-hidden">
            
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-500/10 mb-6 border border-emerald-500/20 shadow-inner">
                <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">
                {isNewUser ? "Register" : "Access Portal"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {nextTarget === 'tracking' ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500/70 ml-5">CNR Number (16 Digits)</label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      value={cnrNumber}
                      onChange={(e) => setCnrNumber(e.target.value.toUpperCase())}
                      placeholder="e.g. MHTH010000012023"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none font-mono"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500/70 ml-5">Document</label>
                    <select 
                      value={docType}
                      onChange={(e) => { setDocType(e.target.value); setIdNumber(''); }}
                      className="w-full bg-slate-900 border border-white/10 text-emerald-400 font-bold rounded-2xl px-5 py-4 text-xs outline-none"
                    >
                      <option value="aadhaar">Aadhaar Card</option>
                      <option value="voter">Voter ID</option>
                      <option value="ration">Ration Card</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500/70 ml-5">ID Number</label>
                    <input 
                      type="text" 
                      required 
                      maxLength={docReq.length}
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      placeholder={docReq.placeholder}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all font-mono" 
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500/70 ml-5">Security PIN</label>
                <input 
                  type="password" 
                  required 
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••••"
                  className="w-full bg-white text-slate-900 rounded-2xl px-6 py-4 text-xl text-center tracking-[1.2em] font-black focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all shadow-xl" 
                />
              </div>

              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="flex flex-col gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="post" checked={nextTarget === 'home'} onChange={() => setNextTarget('home')} className="accent-emerald-500" />
                    Identity Login
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="post" checked={nextTarget === 'tracking'} onChange={() => setNextTarget('tracking')} className="accent-emerald-500" />
                    CNR Search
                  </label>
                </div>

                <button type="submit" className="group relative w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all shadow-lg active:scale-95">
                  <span className="flex items-center justify-center gap-3">
                    {isNewUser ? "Register" : "Verify"}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7M3 12h18" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>

            <div className="text-center mt-10">
              <button onClick={() => setIsNewUser(!isNewUser)} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition-all">
                {isNewUser ? "Switch to Secure Login" : "First Time? Create Legal Account"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}