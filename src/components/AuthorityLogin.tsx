import React, { useState } from 'react';

interface AuthorityLoginProps {
  onLogin: () => void;
}

export default function AuthorityLogin({ onLogin }: AuthorityLoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      <div className="relative bg-slate-900/60 border border-white/10 rounded-[2rem] p-10 w-full max-w-md backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-500">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">
            {isSignUp ? 'New Authority' : 'Authority Login'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isSignUp ? 'Apply for credentials' : 'Enter your secure credentials'}
          </p>
        </div>

        <div className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Legal Name"
              className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-emerald-500/50 transition-all outline-none"
            />
          )}
          <input
            type="text"
            placeholder="Authority ID (e.g., JD-102)"
            className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-emerald-500/50 transition-all outline-none"
          />
          <input
            type="password"
            placeholder="Secure Password"
            className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-emerald-500/50 transition-all outline-none"
          />
        </div>

        <button
          onClick={onLogin}
          className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all active:scale-95"
        >
          {isSignUp ? 'Request Access' : 'Sign In'}
        </button>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            {isSignUp ? "Already have an account? Sign in" : "Need access? Sign up here"}
          </button>
        </div>
      </div>
    </div>
  );
}