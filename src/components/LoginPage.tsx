import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Fingerprint, ShieldCheck, ArrowRight, 
  Calendar, CheckCircle2, ChevronLeft, 
  ChevronDown, UserPlus, Shield, RefreshCw
} from 'lucide-react';

// Added NFC_TAP to SubStep type
type SubStep = 'MODE_SELECT' | 'REGISTRATION' | 'OTP' | 'NFC_TAP' | 'BIO' | 'NFC_ISSUE';

export default function LoginPage({ onSuccess, onBack }: any) {
  const [subStep, setSubStep] = useState<SubStep>('MODE_SELECT');
  const [role, setRole] = useState<'citizen' | 'authority'>('citizen');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', sub: '' });
  const [isScanning, setIsScanning] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', dob: '', gender: 'Male', phone: '', aadhaar: '', consent: false
  });

  useEffect(() => {
    let interval: any;
    if (subStep === 'OTP' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [subStep, timer]);

  const triggerSuccess = (title: string, sub: string, nextStep: SubStep | 'COMPLETE') => {
    setSuccessMessage({ title, sub });
    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
      if (nextStep === 'COMPLETE') {
        onSuccess(role);
      } else {
        setSubStep(nextStep);
      }
    }, 2200);
  };

  // Logic for Existing User NFC Tap
  const handleNFCTap = () => {
    // Simulate finding the user "Sanjay" from the card
    setFormData(prev => ({ ...prev, name: 'Sanjay' }));
    triggerSuccess("CARD MATCHED", "Hello, Sanjay. Please verify biometrics.", 'BIO');
  };

  const handleStartScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      if (isExistingUser) {
        triggerSuccess("ACCESS GRANTED", "Identity Verified Successfully", 'COMPLETE');
      } else {
        triggerSuccess("BIOMETRIC ANCHORED", "Security profile created", 'NFC_ISSUE');
      }
    }, 3000);
  };

  const isFormValid = formData.name && formData.dob && formData.phone.length === 10 && formData.aadhaar.length === 12 && formData.consent;

  const handleOtpInput = (val: string, i: number) => {
    if (val.length <= 1 && /^\d*$/.test(val)) {
      const newOtp = [...otp];
      newOtp[i] = val;
      setOtp(newOtp);
      if (val && i < 3) document.getElementById(`otp-${i + 1}`)?.focus();
    }
  };

  const handleResendOtp = () => {
    setTimer(30);
    setOtp(['', '', '', '']);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden font-sans">
      
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-[#0a0f1d] border border-emerald-500/30 p-10 rounded-[3rem] text-center shadow-2xl"
            >
              <CheckCircle2 size={80} className="text-emerald-500 mx-auto mb-6" />
              <h3 className="text-3xl font-black uppercase italic tracking-tighter">
                {successMessage.title.split(' ')[0]} <span className="text-emerald-500">{successMessage.title.split(' ')[1]}</span>
              </h3>
              <p className="text-slate-400 text-xs font-bold tracking-widest mt-4 uppercase">{successMessage.sub}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={onBack} className="absolute top-10 left-10 z-50 flex items-center gap-2 text-slate-500 hover:text-white uppercase text-[10px] font-bold tracking-widest transition-all italic group">
        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-center px-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-7xl font-black italic leading-none tracking-tighter">
              {subStep === 'REGISTRATION' || subStep === 'OTP' ? 'CREATE' : 'ACCESS'} 
              <br />
              <span className="text-emerald-400">IDENTITY</span>
            </h1>
            <p className="mt-8 max-w-md text-slate-400 text-lg leading-relaxed">
              Unified Justice Registration for secure, biometric-backed legal identity across kiosks and digital systems.
            </p>
            <div className="mt-12 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="text-emerald-500" size={24} />
              </div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Aadhaar Verified & Secured</p>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-center p-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <motion.div layout className="w-full max-w-md bg-[#0a0f1d] rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden z-10">
            <AnimatePresence mode="wait">
              
              {subStep === 'MODE_SELECT' && (
                <motion.div key="mode" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8 text-center font-sans">
                  <h2 className="text-4xl font-black uppercase text-white italic tracking-tighter leading-none">ACCESS <span className="text-emerald-500">PORTAL</span></h2>
                  <div className="space-y-4">
                    <button onClick={() => { setIsExistingUser(false); setSubStep('REGISTRATION'); }} className="w-full p-6 bg-[#111827] border border-white/5 rounded-3xl flex items-center gap-6 hover:bg-emerald-500 group transition-all text-left">
                      <UserPlus size={24} className="text-emerald-500 group-hover:text-black" />
                      <div className="text-white group-hover:text-black uppercase italic leading-none font-black">New User</div>
                      <ArrowRight size={18} className="ml-auto text-slate-700 group-hover:text-black" />
                    </button>
                    <button onClick={() => { setIsExistingUser(true); setSubStep('NFC_TAP'); }} className="w-full p-6 bg-[#111827] border border-white/5 rounded-3xl flex items-center gap-6 hover:bg-emerald-500 group transition-all text-left">
                      <Shield size={24} className="text-emerald-500 group-hover:text-black" />
                      <div className="text-white group-hover:text-black uppercase italic leading-none font-black">Existing User</div>
                      <ArrowRight size={18} className="ml-auto text-slate-700 group-hover:text-black" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* NEW STEP: NFC TAP FOR EXISTING USERS */}
              {subStep === 'NFC_TAP' && (
                <motion.div key="nfc_tap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-10 py-6">
                  <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 rounded-full bg-emerald-500/5 border border-emerald-500/20" />
                    <ShieldCheck size={80} className="text-emerald-500/40" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">TAP <span className="text-emerald-500">IDENTITY CARD</span></h2>
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed px-6">
                      Please hold your issued Legal Identity Card against the scanner to continue.
                    </p>
                  </div>
                  <button onClick={handleNFCTap} className="w-full py-5 bg-emerald-500 text-black font-black rounded-[2rem] uppercase text-[12px] tracking-widest">
                    Simulate Card Tap
                  </button>
                </motion.div>
              )}

              {subStep === 'REGISTRATION' && (
                <motion.div key="reg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5 font-sans">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-black uppercase text-white italic tracking-tighter leading-none">CREATE <span className="text-emerald-400 font-black">PROFILE</span></h2>
                  </div>
                  <div className="space-y-3">
                    <input 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      placeholder="Name as per Aadhaar" 
                      className="w-full p-4 bg-[#111827] border border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 text-white transition-all text-sm font-bold placeholder:text-slate-500" 
                    />
                    <div className="grid grid-cols-[1.4fr,1fr] gap-3">
                      <div className="relative">
                        <input 
                          type="text" placeholder="dd-mm-yyyy"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                          value={formData.dob} 
                          onChange={e => setFormData({...formData, dob: e.target.value})} 
                          className="w-full p-4 bg-[#111827] border border-white/5 rounded-2xl text-white text-sm font-bold outline-none focus:border-emerald-500/50" 
                        />
                        <Calendar className="absolute right-4 top-4 text-slate-600 pointer-events-none" size={16} />
                      </div>
                      <div className="relative">
                        <select 
                          value={formData.gender} 
                          onChange={e => setFormData({...formData, gender: e.target.value})} 
                          className="w-full p-4 bg-[#111827] border border-white/5 rounded-2xl text-white text-sm font-bold outline-none appearance-none focus:border-emerald-500/50 cursor-pointer"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Rather not to say">Rather not to say</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-4 text-slate-600 pointer-events-none" size={16} />
                      </div>
                    </div>
                    <input type="tel" maxLength={10} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Mobile Number" className="w-full p-4 bg-[#111827] border border-white/5 rounded-2xl text-white text-sm font-bold outline-none focus:border-emerald-500/50 placeholder:text-slate-500" />
                    <input type="text" maxLength={12} value={formData.aadhaar} onChange={e => setFormData({...formData, aadhaar: e.target.value})} placeholder="Aadhaar Number" className="w-full p-4 bg-[#111827] border border-white/5 rounded-2xl text-white text-sm font-bold outline-none focus:border-emerald-500/50 placeholder:text-slate-500" />
                  </div>
                  <div className="flex items-start gap-3 px-1 pt-2">
                    <div onClick={() => setFormData({...formData, consent: !formData.consent})} className={`mt-0.5 min-w-[18px] h-[18px] rounded border transition-all cursor-pointer flex items-center justify-center ${formData.consent ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'}`}>
                      {formData.consent && <CheckCircle2 size={12} className="text-black" />}
                    </div>
                    <p className="text-[11px] text-slate-400 font-bold leading-snug cursor-pointer select-none" onClick={() => setFormData({...formData, consent: !formData.consent})}>
                      I consent to biometric authentication for identity verification.
                    </p>
                  </div>
                  <button disabled={!isFormValid} onClick={() => setSubStep('OTP')} className={`w-full py-5 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest text-[11px] font-black transition-all ${isFormValid ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-[#1e293b]/50 text-slate-600 cursor-not-allowed'}`}>
                    VERIFY OTP <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}

              {subStep === 'OTP' && (
                <motion.div key="otp" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8 font-sans py-4">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">VERIFY <span className="text-emerald-400">OTP</span></h2>
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 mt-4 text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                      Secure code sent to <span className="text-emerald-400"> +91 {formData.phone}</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 py-2">
                    {otp.map((d, i) => (
                      <input key={i} id={`otp-${i}`} type="text" maxLength={1} value={d} onChange={(e) => handleOtpInput(e.target.value, i)} className="w-16 h-20 bg-[#111827] border border-white/5 text-white focus:border-emerald-500/50 focus:bg-[#1a2236] text-center text-3xl font-black rounded-2xl outline-none transition-all" />
                    ))}
                  </div>
                  <div className="space-y-6">
                    <button onClick={() => triggerSuccess("OTP VERIFIED", "Welcome", 'BIO')} className="w-full py-5 bg-emerald-500 text-black font-black rounded-[2rem] uppercase text-[12px] tracking-widest hover:scale-[1.02] transition-transform">Continue</button>
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-[1px] w-12 bg-white/10 mb-2" />
                      {timer > 0 ? (
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Resend code in <span className="text-emerald-400 ml-1">{timer}s</span></p>
                      ) : (
                        <button onClick={handleResendOtp} className="group flex items-center gap-2 text-[10px] text-emerald-400 font-black uppercase tracking-widest hover:text-white transition-colors">
                          <RefreshCw size={12} className="group-hover:rotate-180 transition-transform duration-500" /> Resend OTP Now
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {subStep === 'BIO' && (
                <motion.div key="bio" className="text-center space-y-10 font-sans">
                  <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className={`absolute inset-0 rounded-full border border-dashed ${isScanning ? 'border-emerald-500' : 'border-emerald-500/30'}`} />
                    <AnimatePresence>
                      {isScanning && (
                        <>
                          <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-4 rounded-full bg-emerald-500/20 blur-xl" />
                          <motion.div animate={{ top: ['10%', '90%', '10%'] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute left-0 right-0 h-[2px] bg-emerald-400 shadow-glow z-10" />
                        </>
                      )}
                    </AnimatePresence>
                    <Fingerprint size={90} className={`transition-all duration-500 ${isScanning ? 'text-emerald-400 scale-110' : 'text-emerald-500/40'}`} />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
                      {isScanning ? 'SCANNING...' : 'PLACE FINGER'}
                    </h2>
                    {isExistingUser && !isScanning && (
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse text-center">
                    <span className="block">
                      Hello {formData.name}
                    </span>
                    <span className="block mt-1">
                      Place your registered finger to verify identity
                    </span>
                  </p>

                    )}
                  </div>
                  <button disabled={isScanning} onClick={handleStartScan} className="w-full py-5 bg-emerald-500 text-black font-black rounded-[2rem] uppercase text-[12px] tracking-widest">Start Scan</button>
                </motion.div>
              )}

              {subStep === 'NFC_ISSUE' && (
                <motion.div key="nfc" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-10 font-sans">
                  <motion.div animate={{ rotateY: [0, 360] }} transition={{ duration: 2.5, repeat: 0 }} className="relative w-64 h-40 mx-auto bg-gradient-to-br from-[#4ade80] to-[#166534] rounded-2xl p-6 shadow-[0_20px_50px_rgba(74,222,128,0.2)] overflow-hidden border border-white/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-[shimmer_3s_infinite]" />
                    <div className="h-full flex flex-col justify-between text-left">
                      <ShieldCheck className="text-white/60" size={32} />
                      <div>
                        <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em] mb-1">Legal Identity Card</p>
                        <p className="text-lg font-black text-white uppercase tracking-tighter leading-none">{formData.name || "CITIZEN"}</p>
                      </div>
                    </div>
                  </motion.div>
                  <div className="space-y-3">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">CARD <span className="text-emerald-400 font-black">ISSUED</span></h2>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 mx-auto max-w-[280px] text-[11px] text-emerald-400 font-black uppercase tracking-widest leading-relaxed">
                      Please collect your physical identity card from the <span className="text-white underline decoration-emerald-500 underline-offset-4">Dispenser Slot</span> below.
                    </div>
                  </div>
                  <button onClick={() => onSuccess(role)} className="w-full py-5 bg-white text-black font-black rounded-[2rem] uppercase text-[12px] tracking-[0.2em] hover:scale-[1.02] transition-transform">ENTER PORTAL</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0% { left: -150%; } 100% { left: 150%; } }
        .shadow-glow { box-shadow: 0 0 15px rgba(52, 211, 153, 1); }
      `}</style>
    </div>
  );
}