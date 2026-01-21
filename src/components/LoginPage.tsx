import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Fingerprint, User, ShieldCheck, ArrowRight, 
  Calendar, Phone, Lock, Users, CreditCard, CheckCircle2, 
  ChevronLeft, ChevronDown, UserPlus, Shield, Nfc
} from 'lucide-react';

type SubStep = 'MODE_SELECT' | 'REGISTRATION' | 'OTP' | 'EXISTING_TAP' | 'BIO' | 'NFC_ISSUE';

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

  // OTP Timer Logic
  useEffect(() => {
    let interval: any;
    if (subStep === 'OTP' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [subStep, timer]);

  // Helper to show success overlay with custom text
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

  // NFC Tap Success Logic
  const handleNFCTap = () => {
    setFormData({ ...formData, name: 'Sanjay' }); // Simulated card data fetch
    triggerSuccess("CARD MATCHED", "Hello, Sanjay", 'BIO');
  };

  // Biometric Scan Success Logic (3 seconds)
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative bg-[#020617] font-sans selection:bg-emerald-500/30">
      
      {/* --- SHARED SUCCESS POPUP --- */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="bg-[#0a0f1d] border border-emerald-500/30 p-10 rounded-[3rem] text-center shadow-[0_0_100px_rgba(16,185,129,0.15)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
              <motion.div initial={{ rotate: -20, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", damping: 12 }}>
                <CheckCircle2 size={80} className="text-emerald-500 mx-auto mb-6" />
              </motion.div>
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">{successMessage.title.split(' ')[0]} <span className="text-emerald-500">{successMessage.title.split(' ')[1]}</span></h3>
              <p className="text-slate-400 text-xs font-bold tracking-[0.3em] uppercase mt-4 opacity-70">{successMessage.sub}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={onBack} className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-white uppercase text-[10px] font-bold tracking-widest transition-all italic group">
        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      <motion.div layout className="w-full max-w-md bg-[#0a0f1d] rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* --- STEP 0: ACCESS PORTAL (MODE SELECT) --- */}
          {subStep === 'MODE_SELECT' && (
            <motion.div key="mode" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8 text-center">
              <div>
                <h2 className="text-4xl font-black uppercase text-white tracking-tighter italic leading-none">ACCESS <span className="text-emerald-500">PORTAL</span></h2>
                <p className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mt-3">Select Identity Type</p>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => { setIsExistingUser(false); setSubStep('REGISTRATION'); }}
                  className="w-full p-6 bg-[#111827] border border-white/5 rounded-3xl flex items-center gap-6 hover:bg-emerald-500 group transition-all"
                >
                  <div className="p-4 bg-emerald-500/10 rounded-2xl group-hover:bg-black/20 text-emerald-500 group-hover:text-black transition-colors">
                    <UserPlus size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-white group-hover:text-black uppercase italic leading-none">New User</p>
                    <p className="text-[9px] text-slate-500 group-hover:text-black/60 uppercase font-bold mt-1">Create Profile</p>
                  </div>
                  <ArrowRight size={18} className="ml-auto text-slate-700 group-hover:text-black" />
                </button>

                <button 
                  onClick={() => { setIsExistingUser(true); setSubStep('EXISTING_TAP'); }}
                  className="w-full p-6 bg-[#111827] border border-white/5 rounded-3xl flex items-center gap-6 hover:bg-emerald-500 group transition-all"
                >
                  <div className="p-4 bg-emerald-500/10 rounded-2xl group-hover:bg-black/20 text-emerald-500 group-hover:text-black transition-colors">
                    <Shield size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-white group-hover:text-black uppercase italic leading-none">Existing User</p>
                    <p className="text-[9px] text-slate-500 group-hover:text-black/60 uppercase font-bold mt-1">Kiosk Handshake</p>
                  </div>
                  <ArrowRight size={18} className="ml-auto text-slate-700 group-hover:text-black" />
                </button>
              </div>
            </motion.div>
          )}

          {/* --- EXISTING USER: CARD TAP --- */}
          {subStep === 'EXISTING_TAP' && (
            <motion.div key="tap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-10">
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-emerald-500/10 rounded-full blur-2xl" />
                <Nfc size={100} className="text-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase text-white italic tracking-tighter">TAP <span className="text-emerald-500">CARD</span></h2>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed">Place your Digital Justice Card on the reader</p>
              </div>
              <button onClick={handleNFCTap} className="w-full py-5 bg-white text-black font-black rounded-2xl uppercase tracking-widest text-[11px] shadow-xl">Simulate Card Tap</button>
            </motion.div>
          )}

          {/* --- NEW USER: REGISTRATION --- */}
          {subStep === 'REGISTRATION' && (
            <motion.div key="reg" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-5">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black uppercase text-white tracking-tighter italic leading-none">CREATE <span className="text-emerald-500">IDENTITY</span></h2>
                <p className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">Unified Justice Registration</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2 italic tracking-widest ml-1"><User size={12}/> Name as per Aadhaar</label>
                  <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Enter full name" className="w-full p-4 bg-[#111827] border border-white/10 rounded-2xl outline-none focus:bg-white focus:text-black text-white transition-all text-sm font-bold placeholder:text-slate-600" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2 italic tracking-widest ml-1"><Calendar size={12}/> Date of Birth</label>
                    <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full p-4 bg-[#111827] border border-white/10 rounded-2xl outline-none focus:bg-white focus:text-black text-white text-[11px] font-bold transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2 italic tracking-widest ml-1"><Users size={12}/> Gender</label>
                    <div className="relative group">
                        <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full p-4 bg-[#111827] border border-white/10 rounded-2xl outline-none focus:bg-white focus:text-black text-white text-sm font-bold appearance-none cursor-pointer">
                            <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-focus-within:text-black" size={16} />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2 italic tracking-widest ml-1"><Phone size={12}/> Mobile Number</label>
                  <input type="tel" maxLength={10} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Enter 10-digit number" className="w-full p-4 bg-[#111827] border border-white/10 rounded-2xl outline-none focus:bg-white focus:text-black text-white transition-all text-sm font-bold placeholder:text-slate-600" />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2 italic tracking-widest ml-1"><Lock size={12}/> Aadhaar Number</label>
                  <input type="text" maxLength={12} value={formData.aadhaar} onChange={e => setFormData({...formData, aadhaar: e.target.value})} placeholder="Enter 12-digit number" className="w-full p-4 bg-[#111827] border border-white/10 rounded-2xl outline-none focus:bg-white focus:text-black text-white transition-all text-sm font-bold placeholder:text-slate-600" />
                </div>
              </div>
              <label className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer group hover:bg-white/[0.08] transition-colors">
                <input type="checkbox" checked={formData.consent} onChange={e => setFormData({...formData, consent: e.target.checked})} className="mt-1 accent-emerald-500 w-5 h-5 shrink-0" />
                <span className="text-[9px] text-slate-500 uppercase font-black leading-relaxed group-hover:text-slate-300 transition-colors text-left">
                  I authorize Legal Edge to verify my Aadhaar and store my biometric anchor.
                </span>
              </label>
              <motion.button whileHover={isFormValid ? { scale: 1.02 } : {}} whileTap={isFormValid ? { scale: 0.98 } : {}} disabled={!isFormValid} onClick={() => setSubStep('OTP')} className={`w-full py-5 rounded-2xl uppercase tracking-widest text-[11px] font-black transition-all flex items-center justify-center gap-2 ${isFormValid ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
                Verify OTP <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          )}

          {/* --- NEW USER: OTP VERIFICATION --- */}
          {subStep === 'OTP' && (
            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center space-y-8">
              <h2 className="text-4xl font-black uppercase text-white tracking-tighter italic leading-none">VERIFY <span className="text-emerald-500">OTP</span></h2>
              <div className="flex justify-center gap-3">
                {otp.map((d, i) => (
                  <motion.input key={i} id={`otp-${i}`} type="text" maxLength={1} value={d} onChange={(e) => handleOtpInput(e.target.value, i)} className="w-14 h-18 bg-[#111827] border border-white/10 text-white focus:bg-white focus:text-black text-center text-3xl font-black rounded-xl outline-none transition-all shadow-lg focus:shadow-emerald-500/10" />
                ))}
              </div>
              <div className="space-y-4">
                <motion.button disabled={otp.some(d => d === '')} onClick={() => triggerSuccess("OTP VERIFIED", "Identity Confirmed Successfully", 'BIO')} className="w-full py-5 bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-black font-black rounded-2xl uppercase tracking-widest text-[11px]">Verify & Continue</motion.button>
              </div>
            </motion.div>
          )}

          {/* --- SHARED: BIOMETRIC SCANNING (3 SECONDS) --- */}
          {subStep === 'BIO' && (
            <motion.div key="bio" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-10">
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: isScanning ? 2 : 8, repeat: Infinity, ease: "linear" }} className={`absolute inset-0 rounded-full border border-dashed ${isScanning ? 'border-emerald-500' : 'border-emerald-500/30'}`} />
                <AnimatePresence>
                  {isScanning && (
                    <>
                      <motion.div initial={{ opacity: 0 }} animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }} exit={{ opacity: 0 }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-4 rounded-full bg-emerald-500/20 blur-xl" />
                      <motion.div initial={{ top: '10%' }} animate={{ top: ['10%', '90%', '10%'] }} exit={{ opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="absolute left-1/2 -translate-x-1/2 w-32 h-[2px] bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)] z-10" />
                    </>
                  )}
                </AnimatePresence>
                <Fingerprint size={90} className={`relative z-0 transition-all duration-500 ${isScanning ? 'text-emerald-400 scale-110 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'text-emerald-500/40'}`} />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase text-white italic tracking-tighter leading-none">
                  {isExistingUser ? `Hello, ${formData.name}` : 'ANCHORING IDENTITY'}
                </h2>
                <p className="text-slate-500 text-[9px] font-bold tracking-[0.4em] uppercase">{isScanning ? 'PROCESSING...' : 'PLACE FINGER FOR SCANNING'}</p>
              </div>
              <motion.button disabled={isScanning} onClick={handleStartScan} className={`w-full py-5 rounded-2xl uppercase tracking-widest text-[11px] font-black transition-all ${isScanning ? 'bg-slate-800 text-slate-500 cursor-wait' : 'bg-emerald-500 text-black shadow-2xl shadow-emerald-500/20'}`}>
                {isScanning ? 'Please Wait...' : 'Capture Biometric'}
              </motion.button>
            </motion.div>
          )}

          {/* --- NEW USER ONLY: NFC ISSUE --- */}
          {subStep === 'NFC_ISSUE' && (
            <motion.div key="nfc" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-10">
              <motion.div initial={{ rotateY: -30, scale: 0.9 }} animate={{ rotateY: 0, scale: 1 }} transition={{ type: "spring", stiffness: 100 }} className="relative w-64 h-40 mx-auto bg-gradient-to-br from-emerald-500 to-teal-800 rounded-2xl p-6 shadow-2xl overflow-hidden border border-white/20 preserve-3d">
                <div className="absolute top-0 left-[-150%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] animate-shimmer" />
                <div className="h-full flex flex-col justify-between text-left relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-8 bg-yellow-500/20 rounded-md border border-yellow-500/30" />
                    <ShieldCheck className="text-white/40" size={20} />
                  </div>
                  <div>
                    <p className="text-[7px] font-bold text-white/50 uppercase tracking-[0.2em]">Digital Justice Identity</p>
                    <p className="text-lg font-black text-white uppercase mt-1 leading-none tracking-tighter">{formData.name || "CITIZEN"}</p>
                  </div>
                </div>
              </motion.div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white uppercase italic leading-none">CARD <span className="text-emerald-500">ISSUED</span></h2>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest px-8 leading-relaxed">Collect your hardware identity anchor from the dispenser.</p>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onSuccess(role)} className="w-full py-5 bg-white text-black font-black rounded-3xl uppercase tracking-widest text-[11px] hover:bg-emerald-50 transition-colors shadow-2xl shadow-white/5">Enter Portal</motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
      <p className="mt-8 text-slate-600 text-[10px] uppercase font-bold tracking-[0.4em] italic">Legal Edge • Digital Justice Redefined</p>
      <style>{`
        @keyframes shimmer { 0% { left: -150%; } 100% { left: 150%; } }
        .animate-shimmer { animation: shimmer 3s infinite; }
        .preserve-3d { transform-style: preserve-3d; perspective: 1000px; }
      `}</style>
    </div>
  );
}