import { useEffect, useRef, useState } from 'react';
import {
  Mic,
  FileText,
  Bell,
  HelpCircle,
  Phone,
  Search,
  Gavel,
  List,
  Monitor,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import Navigation from './Navigation';

type Page = 'home' | 'chatbot' | 'features' | 'tracking' | 'impact' | 'kiosk';

interface KioskDemoProps {
  onNavigate: (page: Page) => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function KioskDemo({ onNavigate }: KioskDemoProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [activePanel, setActivePanel] = useState<
    'home' | 'orders' | 'cause' | 'helpdesk'
  >('home');

  const recognitionRef = useRef<any>(null);

  /* ----------------------------------
     INIT SPEECH RECOGNITION
  ---------------------------------- */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      let text = '';
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    recognitionRef.current?.start();
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 overflow-hidden flex flex-col font-sans">
      <Navigation currentPage="kiosk" onNavigate={onNavigate} />

      <main className="flex-1 flex items-center justify-center p-4 mt-4">
        <div className="aspect-square w-[95vw] max-w-[820px] max-h-[82vh] bg-slate-950/40 backdrop-blur-md rounded-[2.5rem] p-4 shadow-2xl border-[3px] border-emerald-500/30 ring-4 ring-black/20 flex flex-col">
          <div className="bg-white rounded-[2rem] h-full w-full flex flex-col overflow-hidden shadow-inner">

            {/* HEADER */}
            <header className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-200" />
                <div>
                  <h1 className="text-2xl font-semibold uppercase">
                    Legal Edge Kiosk
                  </h1>
                  <p className="text-[10px] opacity-85 uppercase tracking-widest mt-1">
                    AI-Powered Public Legal Access Platform
                  </p>
                </div>
              </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
              {/* SIDEBAR */}
              <aside className="w-60 bg-slate-50 border-r border-slate-100 p-6 flex flex-col gap-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
                  Quick Services
                </p>

                {[
                  { icon: Search, label: 'CNR Search', id: 'tracking' },
                  { icon: FileText, label: 'Case Status', id: 'tracking' },
                  { icon: Gavel, label: 'Judicial Orders', id: 'orders' },
                  { icon: List, label: 'Hearing List', id: 'cause' },
                  { icon: Monitor, label: 'Virtual Proceedings', id: 'virtual' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'tracking') onNavigate('tracking');
                      if (item.id === 'orders') setActivePanel('orders');
                      if (item.id === 'cause') setActivePanel('cause');
                    }}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span className="text-xs font-semibold">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </aside>

              {/* MAIN */}
              <main className="flex-1 px-8 py-8 flex flex-col overflow-y-auto">

                {/* ADDED CONTENT PANEL */}
                {activePanel !== 'home' && (
                  <div className="mb-6 p-6 rounded-2xl bg-slate-50 border text-slate-700">
                    {activePanel === 'orders' && (
                      <>
                        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                          <Gavel className="w-5 h-5 text-emerald-600" />
                          Judicial Orders
                        </h2>
                        <ul className="text-sm space-y-2">
                          <li>• 12 Feb 2026 – Interim stay granted</li>
                          <li>• 05 Jan 2026 – Notice issued to respondent</li>
                          <li>• 18 Dec 2025 – Case admitted</li>
                        </ul>
                      </>
                    )}

                    {activePanel === 'cause' && (
                      <>
                        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                          <List className="w-5 h-5 text-emerald-600" />
                          Hearing List
                        </h2>
                        <ul className="text-sm space-y-2">
                          <li>• 15 Feb 2026 – Arguments Hearing</li>
                          <li>• 28 Apr 2026 – Evidence Review</li>
                          <li>• 10 Jun 2026 – Final Submission</li>
                        </ul>
                      </>
                    )}

                    {activePanel === 'helpdesk' && (
                      <>
                        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                          <Phone className="w-5 h-5 text-emerald-600" />
                          Contact Helpdesk
                        </h2>
                        <p className="text-sm">📞 044-2567-8899</p>
                        <p className="text-sm">🕘 10:00 AM – 5:00 PM</p>
                        <p className="text-sm">
                          📍 Chennai District Court Facilitation Center
                        </p>
                      </>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 flex-1">
                  <MenuCard
                    icon={Search}
                    title="My Case Status"
                    subtitle="Track hearings & progress"
                    onClick={() => onNavigate('tracking')}
                  />
                  <MenuCard
                    icon={HelpCircle}
                    title="Legal Assistance"
                    subtitle="AI-guided legal support"
                    onClick={() => onNavigate('chatbot')}
                  />
                  <MenuCard
                    icon={Bell}
                    title="Reminders"
                    subtitle="Hearing alerts"
                    onClick={() => {}}
                  />
                  <MenuCard
                    icon={Phone}
                    title="Contact Helpdesk"
                    subtitle="Court & legal contacts"
                    onClick={() => setActivePanel('helpdesk')}
                  />
                </div>

                {/* VOICE INPUT */}
                <div className="mt-6">
                  <button
                    onClick={startListening}
                    className={`w-full flex items-center justify-center gap-4 py-4 rounded-2xl text-xs uppercase tracking-widest text-white ${
                      isListening
                        ? 'bg-emerald-700 animate-pulse'
                        : 'bg-slate-900 hover:bg-emerald-800'
                    }`}
                  >
                    <div className="p-1.5 rounded-full bg-emerald-500">
                      <Mic className="w-4 h-4" />
                    </div>
                    {isListening ? 'Listening…' : 'Speak Your Query'}
                  </button>

                  {transcript && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-50 text-slate-700 text-sm">
                      <strong>You said:</strong> {transcript}
                    </div>
                  )}
                </div>
              </main>
            </div>

            {/* FOOTER */}
            <footer className="bg-slate-50 px-10 py-3 flex justify-between items-center text-[8px] text-slate-400 uppercase tracking-[0.2em] border-t">
              <span>LEGAL EDGE • DIGITAL JUSTICE ACCESS</span>
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-emerald-600 font-bold"
              >
                Exit Kiosk
              </button>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- MENU CARD ---------- */
function MenuCard({
  icon: Icon,
  title,
  subtitle,
  onClick,
}: {
  icon: any;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        group
        rounded-lg
        p-[2px]
        bg-gradient-to-br from-emerald-500/25 to-emerald-500/10
        hover:from-emerald-500/40 hover:to-emerald-500/15
        transition
      "
    >
      <div
        className="
          h-full w-full
          rounded-md
          bg-white border
          px-6 py-7
          flex flex-col items-center justify-center
        "
      >
        <div className="w-11 h-11 rounded-md bg-emerald-50 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>

        <p className="font-semibold text-slate-800 text-sm uppercase tracking-wide">
          {title}
        </p>

        <p className="text-[11px] text-slate-500 mt-1 text-center leading-snug">
          {subtitle}
        </p>
      </div>
    </button>
  );
}

