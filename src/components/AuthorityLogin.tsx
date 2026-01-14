import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, Lock, ArrowRight, Fingerprint } from 'lucide-react';

/**
 * AuthorityLogin Component
 * Features:
 * - Strict character limits: ID (12), Password (16)
 * - Shake animation on validation error
 * - High-fidelity biometric modal with auto-navigation logic
 */
export default function AuthorityLogin({ onNavigate }: { onNavigate: (p: string) => void }) {
  // Input States
  const [authId, setAuthId] = useState('');
  const [authPass, setAuthPass] = useState('');
  
  // UI & Animation States
  const [showBioModal, setShowBioModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [bioVerified, setBioVerified] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Character Constraints
  const ID_LIMIT = 12;
  const PASS_LIMIT = 16;

  // Triggers a 500ms shake animation for visual error feedback
  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: Require minimum lengths before allowing biometric phase
    if (authId.length < 4 || authPass.length < 6) {
      triggerShake();
      return;
    }
    setShowBioModal(true);
  };

  const simulateScan = () => {
    setIsScanning(true);
    
    // 1. Simulate the scanning process (2 seconds)
    setTimeout(() => {
      setIsScanning(false);
      setBioVerified(true);
      
      // 2. AUTOMATIC NAVIGATION
      // Wait 1 second after "Access Granted" is shown, then push to next page
      setTimeout(() => {
        onNavigate('authority-dashboard');
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6 font-sans overflow-hidden">
      
      {/* AUTH CARD CONTAINER */}
      <div className={`w-full max-w-[440px] bg-[#0a0f1d] rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative transition-all duration-500 animate-in fade-in zoom-in-95 ${isShaking ? 'animate-shake' : ''}`}>
        
        {/* Header Section */}
        <div className="text-center mb-10 animate-in slide-in-from-top-4 duration-700">
          <div className="inline-flex w-16 h-16 bg-blue-500/10 rounded-2xl items-center justify-center border border-blue-500/20 mb-4 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Authority Login
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-2">
            Secure Terminal Access Network
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-5">
            
            {/* Authority ID Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="text-[10px] font-bold text-blue-500/80 uppercase tracking-widest">Authority ID</label>
                <span className={`text-[9px] font-mono transition-colors ${authId.length === ID_LIMIT ? 'text-blue-400' : 'text-slate-600'}`}>
                  {authId.length}/{ID_LIMIT}
                </span>
              </div>
              <div className="relative group focus-within:scale-[1.01] transition-transform">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  type="text" 
                  required 
                  maxLength={ID_LIMIT}
                  value={authId}
                  onChange={(e) => setAuthId(e.target.value.toUpperCase())}
                  placeholder="ID NUMBER"
                  className="w-full bg-[#111827] border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-slate-700 outline-none focus:border-blue-500/50 transition-all font-mono"
                />
              </div>
            </div>

            {/* Secure Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="text-[10px] font-bold text-blue-500/80 uppercase tracking-widest">Access Key</label>
                <span className={`text-[9px] font-mono transition-colors ${authPass.length === PASS_LIMIT ? 'text-blue-400' : 'text-slate-600'}`}>
                  {authPass.length}/{PASS_LIMIT}
                </span>
              </div>
              <div className="relative group focus-within:scale-[1.01] transition-transform">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  type="password" 
                  required 
                  maxLength={PASS_LIMIT}
                  value={authPass}
                  onChange={(e) => setAuthPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#111827] border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-slate-700 outline-none focus:border-blue-500/50 transition-all font-mono tracking-[0.3em]"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.96] shadow-lg shadow-blue-900/20 group"
          >
            Authenticate <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>

      {/* BIOMETRIC MODAL */}
      {showBioModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/95 backdrop-blur-md px-6 animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-[#0a0f1d] border border-blue-500/20 rounded-[3rem] p-10 text-center shadow-2xl relative animate-in zoom-in-95 duration-500">
            {!bioVerified ? (
              <div className="space-y-6">
                <div className="relative inline-block">
                  <div className={`absolute inset-0 bg-blue-500/20 rounded-full blur-3xl transition-opacity duration-1000 ${isScanning ? 'opacity-100' : 'opacity-30'}`} />
                  <Fingerprint className={`w-20 h-20 relative z-10 transition-colors duration-700 ${isScanning ? 'text-blue-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'text-blue-500/20'}`} />
                  {isScanning && <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-scan z-20" />}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Biometric Identity</h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Place thumb on system scanner</p>
                </div>
                <button 
                  onClick={simulateScan} 
                  disabled={isScanning} 
                  className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${isScanning ? 'bg-slate-900 text-slate-600 border border-white/5' : 'bg-blue-600 text-white shadow-xl hover:bg-blue-500'}`}
                >
                  {isScanning ? 'Analyzing Patterns...' : 'Start Scanner'}
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-900/40 rotate-12">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Access Granted</h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Redirecting to Terminal...</p>
                </div>
                {/* Visual loading indicator while auto-navigating */}
                <div className="flex justify-center pt-4">
                  <div className="w-8 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white animate-progress w-full" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Animation Keyframes */}
      <style>{`
        @keyframes scan { 
          0% { top: 0; opacity: 0; } 
          20% { opacity: 1; } 
          80% { opacity: 1; } 
          100% { top: 100%; opacity: 0; } 
        }
        @keyframes shake { 
          0%, 100% { transform: translateX(0); } 
          25% { transform: translateX(-8px); } 
          50% { transform: translateX(8px); } 
          75% { transform: translateX(-8px); } 
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan { animation: scan 2s linear infinite; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .animate-progress { animation: progress 1s ease-in-out infinite; }
      `}</style>
    </div>
  );
}