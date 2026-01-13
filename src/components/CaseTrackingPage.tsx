import {
  Calendar,
  MapPin,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  Shield,
  Sun,
  Moon,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';

type Page = 'home' | 'kiosk' | 'features' | 'tracking' | 'impact';

interface Props {
  onNavigate: (page: Page) => void;
  onViewCase?: (id: string) => void;
}

export default function CaseTrackingPage({ onNavigate, onViewCase }: Props) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500
        ${
          theme === 'dark'
            ? 'bg-[#020617] text-slate-200'
            : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900'
        }`}
    >
      <Navigation currentPage="tracking" onNavigate={onNavigate} />

      {/* TOP RIGHT CONTROLS (theme only; chat moved to global Navigation) */}
      <div className="fixed top-4 right-6 z-50 flex items-center gap-3">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`h-10 w-10 flex items-center justify-center rounded-xl border transition-all
            ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : 'bg-white border-slate-300 hover:bg-slate-100'
            }`}
          title="Toggle Dark / Light Mode"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>
      </div>

      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-30%] right-[-20%] w-[70%] h-[70%] bg-emerald-500/10 blur-[180px]" />
        <div className="absolute bottom-[-30%] left-[-20%] w-[70%] h-[70%] bg-blue-500/10 blur-[180px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* HEADER */}
        <div
          className={`mb-20 transition-all duration-700
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h1
  className={`text-5xl md:text-6xl font-black tracking-tight leading-[1.05]
    ${theme === 'dark' ? 'text-white' : 'text-black'}
  `}
>
  Case Tracking Dashboard
</h1>

<p
  className={`mt-4 max-w-3xl text-lg leading-relaxed
    ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}
  `}
>
  Track hearings, case progress, reminders, and verified records
  through a secure judicial interface.
</p>

        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* MAIN COLUMN */}
          <div className="lg:col-span-2 space-y-12">
            {/* CASE CARD */}
            <div className="rounded-[2.5rem] p-[2px] bg-gradient-to-br from-emerald-500/30 via-cyan-500/20 to-blue-500/20">
              <div className={`rounded-[2.4rem] p-10 ${theme === 'dark' ? 'bg-[#060c18]' : 'bg-white'}`}>
                <div className="flex flex-col md:flex-row justify-between gap-8 mb-14">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm opacity-70">Case Number</span>
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm">
                        #123456
                      </span>
                    </div>
                    <h2 className="text-2xl font-extrabold">
                      Land Dispute Case
                    </h2>
                    <p className="opacity-70 mt-1">
                      Ram Prasad Sharma vs Shyam Lal Verma
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-4">
                    <span className="px-5 py-2 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Active Case
                    </span>
                    <p className="text-sm opacity-70">
                      Filed on 15 March 2024
                    </p>

                    {onViewCase && (
                      <button
                        onClick={() => onViewCase('#123456')}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-sm hover:scale-105 transition"
                      >
                        View Full Case
                      </button>
                    )}
                  </div>
                </div>

                {/* INFO STRIP */}
                <div className="grid md:grid-cols-3 gap-4 mb-14">
                  <InfoCard icon={<Calendar />} title="Next Hearing" main="15 Jan 2026" sub="10:00 AM" />
                  <InfoCard icon={<MapPin />} title="Court" main="District Court" sub="Pune, Maharashtra" />
                  <InfoCard icon={<User />} title="Lawyer" main="A. Patel" sub="+91 98765 43210" />
                </div>

                {/* CASE PROGRESS */}
                <h3 className="text-lg font-bold mb-8 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full" />
                  Case Progress
                </h3>

                <Timeline />
              </div>
            </div>

            {/* BLOCKCHAIN */}
            <div className="rounded-[2rem] p-[2px] bg-gradient-to-br from-amber-400/40 to-orange-500/40">
              <div className={`rounded-[1.9rem] p-8 ${theme === 'dark' ? 'bg-[#0b1220]' : 'bg-white border border-slate-200'}`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Blockchain-Verified Records
                    </h3>
                    <p className="opacity-70">
                      Every case update is immutably logged to ensure transparency
                      and protection against tampering.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIDE COLUMN */}
          <div className="space-y-8">
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Upcoming Reminders
              </h3>
              <Reminder label="Court Hearing" time="15 Jan 2026, 10:00 AM" />
              <Reminder label="Document Verification" time="13 Jan 2026" />
              <Reminder label="Lawyer Meeting" time="17 Jan 2026, 3:00 PM" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function InfoCard({ icon, title, main, sub }: any) {
  return (
    <div className="rounded-xl p-4 bg-white/5 border border-white/10 hover:border-emerald-500/30 transition hover:-translate-y-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-emerald-400">{icon}</span>
        <span className="text-sm opacity-80">{title}</span>
      </div>
      <p className="text-lg font-bold">{main}</p>
      <p className="text-sm opacity-70">{sub}</p>
    </div>
  );
}

function Timeline() {
  const steps = [
    { title: 'Evidence Submitted', date: '22 Dec 2025', current: false },
    { title: 'Next Hearing Scheduled', date: '15 Jan 2026', current: true },
    { title: 'Second Hearing', date: '18 Nov 2025', current: false },
    { title: 'First Hearing', date: '20 May 2024', current: false },
  ];

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-white/20" />

      <div className="space-y-6">
        {steps.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-6 transition-all duration-500"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className="w-12 flex justify-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${s.current ? 'bg-blue-500 ring-4 ring-blue-500/30 animate-pulse' : 'bg-emerald-500'}`}
              >
                {s.current ? (
                  <Clock className="w-4 h-4 text-white" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
            </div>

            <div className={`flex-1 rounded-xl px-6 py-4 border
              ${s.current ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/10'}`}>
              <h4 className="font-semibold">{s.title}</h4>
            </div>

            <div className="w-32 text-right text-sm opacity-70">
              {s.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Reminder({ label, time }: any) {
  return (
    <div className="rounded-lg p-4 border-l-4 border-emerald-500/40 bg-emerald-500/10 mb-3">
      <p className="font-semibold text-sm">{label}</p>
      <p className="text-sm opacity-70">{time}</p>
    </div>
  );
}
