import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Fingerprint, ArrowRight, ShieldCheck, Search, ChevronDown, UserPlus, LogIn, Calendar, Users } from 'lucide-react';
import Navigation from './Navigation';

export default function LoginPage({ onLoginSuccess, onNavigate }: {
  onLoginSuccess?: (target?: any) => void;
  onNavigate: (p: any) => void;
}) {
  const { t } = useTranslation();

  // Mode & State
  const [authMode, setAuthMode] = useState<'identity' | 'cnr'>('identity');
  const [isNewUser, setIsNewUser] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  
  // Input Fields
  const [docType, setDocType] = useState('aadhaar');
  const [idNumber, setIdNumber] = useState('');
  const [cnrNumber, setCnrNumber] = useState('');
  const [pin, setPin] = useState(''); 
  const [fullName, setFullName] = useState('');
  
  // ✅ NEW FIELDS FOR EXPANDED PROFILE
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  // Biometric Flow
  const [showBioModal, setShowBioModal] = useState(false);
  const [bioVerified, setBioVerified] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Dynamic Validation Logic
  const getDocLimit = () => {
    if (docType === 'aadhaar') return 12;
    if (docType === 'voter' || docType === 'pan') return 10;
    return 16;
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleVerifyClick = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isCnrInvalid = authMode === 'cnr' && cnrNumber.length < 16;
    const isIdInvalid = authMode === 'identity' && idNumber.length !== getDocLimit();
    const isPinInvalid = pin.length !== 6;
    const isNameInvalid = isNewUser && fullName.trim().length < 3;
    // ✅ NEW VALIDATION
    const isDemographicsInvalid = isNewUser && (!age || !gender);

    if (isCnrInvalid || isIdInvalid || isPinInvalid || isNameInvalid || isDemographicsInvalid) {
      triggerShake();
      return;
    }

    setShowBioModal(true);
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setBioVerified(true);
    }, 2000);
  };

  const handleFinalSuccess = () => {
    const target = authMode === 'cnr' ? 'tracking' : 'home';
    onLoginSuccess ? onLoginSuccess(target) : onNavigate(target);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#030712] overflow-hidden font-sans">
      <Navigation currentPage="login" onNavigate={onNavigate} compact />

      <main className="flex-1 flex items-center justify-center px-6">
        <div className={`w-full max-w-lg bg-[#0a0f1d] rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative transition-all duration-500 ${isShaking ? 'animate-shake' : ''}`}>
          
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              {isNewUser ? (
                <UserPlus className="w-10 h-10 text-emerald-400 animate-in zoom-in duration-300" />
              ) : (
                <ShieldCheck className="w-10 h-10 text-emerald-400 animate-in zoom-in duration-300" />
              )}
            </div>
          </div>

          <h2 className="text-4xl font-black text-white text-center uppercase tracking-tighter mb-10">
            {isNewUser ? 'Create Account' : 'Access Portal'}
          </h2>

          <form onSubmit={handleVerifyClick} className="space-y-6">
            
            {/* ✅ EXPANDED REGISTRATION SECTION */}
            {isNewUser && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest ml-1">Full Legal Name</label>
                  <input 
                    type="text" required placeholder="Justice / Citizen Name"
                    className="w-full bg-[#111827] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-emerald-500/50 outline-none transition"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest ml-1">Age</label>
                    <input 
                      type="number" required placeholder="Years"
                      className="w-full bg-[#111827] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-emerald-500/50 outline-none transition"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest ml-1">Gender</label>
                    <div className="relative">
                      <select 
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full bg-[#111827] border border-white/10 rounded-2xl px-6 py-4 text-emerald-400 font-bold text-sm focus:border-emerald-500/50 outline-none appearance-none cursor-pointer">
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-emerald-500/50 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={`grid ${authMode === 'identity' ? 'grid-cols-2' : 'grid-cols-1'} gap-4 transition-all duration-300`}>
              {authMode === 'identity' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-500">
                  <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest ml-1">Document</label>
                  <div className="relative">
                    <select 
                      value={docType}
                      onChange={(e) => { setDocType(e.target.value); setIdNumber(''); }}
                      className="w-full bg-[#111827] border border-white/10 rounded-2xl px-4 py-4 text-emerald-400 font-bold text-sm focus:border-emerald-500/50 outline-none appearance-none cursor-pointer">
                      <option value="aadhaar">Aadhaar Card</option>
                      <option value="voter">Voter ID</option>
                      <option value="pan">PAN Card</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-emerald-500/50 pointer-events-none" />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest ml-1">
                  {authMode === 'identity' ? 'ID Number' : 'CNR Number'}
                </label>
                <div className="relative">
                  <input 
                    type="text" required
                    maxLength={authMode === 'identity' ? getDocLimit() : 16}
                    placeholder={authMode === 'identity' ? `${getDocLimit()} Digit No.` : "16 Digit CNR Number"}
                    value={authMode === 'identity' ? idNumber : cnrNumber}
                    onChange={(e) => authMode === 'identity' ? setIdNumber(e.target.value) : setCnrNumber(e.target.value.toUpperCase())}
                    className="w-full bg-[#111827] border border-white/10 rounded-2xl px-6 py-4 text-white font-mono focus:border-emerald-500/50 outline-none transition"
                  />
                  {authMode === 'cnr' && <Search className="absolute right-4 top-4 text-emerald-500/30 w-5 h-5" />}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest ml-1 text-center block">Security PIN (6 Digits)</label>
              <div className="relative group">
                <input 
                  type="password" required maxLength={6} value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-white text-transparent rounded-2xl py-5 text-center text-3xl tracking-[1.5em] font-black focus:ring-4 ring-emerald-500/20 outline-none transition caret-transparent"
                  placeholder=" "
                />
                <div className="absolute inset-0 flex items-center justify-between px-[15%] pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        pin.length > i ? 'bg-[#0a0f1d] scale-110 shadow-sm' : 'bg-slate-300 scale-90 opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="space-y-3 min-w-[120px]">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="mode" checked={authMode === 'identity'} onChange={() => setAuthMode('identity')} className="hidden" />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${authMode === 'identity' ? 'border-emerald-400 bg-emerald-400/20' : 'border-slate-600'}`}>
                    {authMode === 'identity' && <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />}
                  </div>
                  <span className={`text-[10px] font-black uppercase leading-tight ${authMode === 'identity' ? 'text-white' : 'text-slate-500'}`}>Identity<br/>Login</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="mode" checked={authMode === 'cnr'} onChange={() => setAuthMode('cnr')} className="hidden" />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${authMode === 'cnr' ? 'border-emerald-400 bg-emerald-400/20' : 'border-slate-600'}`}>
                    {authMode === 'cnr' && <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />}
                  </div>
                  <span className={`text-[10px] font-black uppercase leading-tight ${authMode === 'cnr' ? 'text-white' : 'text-slate-500'}`}>CNR<br/>Search</span>
                </label>
              </div>

              <button 
                type="submit"
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-[#020617] py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                {isNewUser ? 'Create Profile' : 'Verify'} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => setIsNewUser(!isNewUser)} 
              className="group flex items-center justify-center gap-2 mx-auto text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-emerald-400 transition"
            >
              {isNewUser ? <LogIn className="w-3 h-3" /> : <UserPlus className="w-3 h-3" />}
              {isNewUser ? 'Back to Secure Login' : 'First Time? Create Legal Account'}
            </button>
          </div>
        </div>
      </main>

      {showBioModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/95 backdrop-blur-xl px-6 transition-all duration-500">
          <div className="w-full max-w-sm bg-[#0a0f1d] border border-emerald-500/30 rounded-[3rem] p-10 text-center shadow-[0_0_100px_rgba(16,185,129,0.15)] relative overflow-hidden">
            {!bioVerified ? (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                <div className="relative inline-block mb-10">
                  <div className={`absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl transition-opacity duration-1000 ${isScanning ? 'opacity-100' : 'opacity-40'}`} />
                  <Fingerprint className={`w-24 h-24 relative z-10 transition-colors duration-500 ${isScanning ? 'text-emerald-300' : 'text-emerald-500/40'}`} />
                  {isScanning && <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-scan z-20" />}
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Kiosk Verification</h3>
                <p className="text-slate-400 text-[11px] leading-relaxed font-bold uppercase tracking-widest px-4">Place thumb on kiosk sensor.</p>
                <button onClick={simulateScan} disabled={isScanning} className={`mt-10 w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${isScanning ? 'bg-slate-800 text-slate-500' : 'bg-emerald-500 text-[#020617]'}`}>
                  {isScanning ? 'Analyzing Patterns...' : 'Initialize Scan'}
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-700 py-6">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 rotate-6 shadow-[0_20px_40px_rgba(16,185,129,0.4)]">
                  <ShieldCheck className="w-12 h-12 text-[#020617]" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Identity<br/>Confirmed</h3>
                <button onClick={handleFinalSuccess} className="mt-12 w-full py-5 bg-white text-[#020617] rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-slate-200 shadow-xl transition-all">
                  Launch Portal
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes scan { 0% { top: 0; opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); } 20%, 40%, 60%, 80% { transform: translateX(6px); } }
        .animate-scan { animation: scan 2s linear infinite; }
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </div>
  );
}