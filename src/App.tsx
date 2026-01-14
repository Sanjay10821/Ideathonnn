import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// ✅ Keep your original imports exactly as they were
import { X, ChevronRight, Sparkles, MousePointer2 } from 'lucide-react';

import LandingPage from './components/LandingPage';
import RoleSelection from './components/RoleSelection';
import LoginPage from './components/LoginPage';
import AuthorityLogin from './components/AuthorityLogin';

import HomePage from './components/HomePage';
import KioskDemo from './components/KioskDemo';
import FeaturesPage from './components/FeaturesPage';
import CaseTrackingPage from './components/CaseTrackingPage';
import CaseSearch from './components/CaseSearch';
import ImpactPage from './components/ImpactPage';
import LegalChatbot from './components/LegalChatbot';
import LanguageSwitcher from './components/LanguageSwitcher';

import AuthorityDashboard from './components/AuthorityDashboard';
import AuthorityCases from './components/AuthorityCases';
import AuthorityCaseDetail from './components/AuthorityCaseDetail';
import AuthorityHearings from './components/AuthorityHearings';

import { changeLanguage } from './translate';
import i18n from './i18n';

type Page =
  | 'landing'
  | 'role'
  | 'login'
  | 'authority-login'
  | 'home'
  | 'kiosk'
  | 'features'
  | 'tracking'
  | 'case'
  | 'search'
  | 'impact'
  | 'chatbot'
  | 'authority-dashboard'
  | 'authority-cases'
  | 'authority-case-detail'
  | 'authority-hearings';

/* --- ✅ TOUR STEPS CONFIGURATION --- */
const TOUR_STEPS: { page: Page; title: string; desc: string }[] = [
  { page: 'home', title: 'tour_step1_title', desc: 'tour_step1_desc' },
  { page: 'features', title: 'tour_step2_title', desc: 'tour_step2_desc' },
  { page: 'tracking', title: 'tour_step3_title', desc: 'tour_step3_desc' },
  { page: 'chatbot', title: 'tour_step4_title', desc: 'tour_step4_desc' },
  { page: 'kiosk', title: 'tour_step5_title', desc: 'tour_step5_desc' },
];

function App() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentCaseId, setCurrentCaseId] = useState<string | null>(null);

  /* --- ✅ TOUR STATE --- */
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    const savedLang = localStorage.getItem('auto_lang');
    const lang = savedLang || 'en';
    i18n.changeLanguage(lang);
    changeLanguage(lang);

    setCurrentPage('landing');
    window.history.replaceState({ page: 'landing' }, '', '#landing');
  }, []);

  /* ---------------- ✅ TOUR ACTIONS ---------------- */
  const startTour = () => {
    setIsTourActive(true);
    setTourStep(0);
    setCurrentPage(TOUR_STEPS[0].page);
  };

  const nextTourStep = () => {
    if (tourStep < TOUR_STEPS.length - 1) {
      const nextIdx = tourStep + 1;
      setTourStep(nextIdx);
      setCurrentPage(TOUR_STEPS[nextIdx].page);
    } else {
      endTour();
    }
  };

  const endTour = () => {
    setIsTourActive(false);
    setCurrentPage('home');
    localStorage.setItem('has_explored_system', 'true');
  };

  /* ---------------- LANGUAGE SELECTION ---------------- */
  const handleLangSelect = (lng: string) => {
    localStorage.setItem('auto_lang', lng);
    i18n.changeLanguage(lng);
    changeLanguage(lng);

    window.history.pushState({ page: 'role' }, '', '#role');
    setCurrentPage('role');
    // startTour(); // Uncomment if you want tour to start after language select
  };

  /* ---------------- NAVIGATION ---------------- */
  const navigate = (page: Page, state: Record<string, any> = {}) => {
    if (isTourActive) return; // Prevent breaking the tour
    window.history.pushState({ page, ...state }, '', `#${page}`);
    setCurrentPage(page);
    if (state.caseId) setCurrentCaseId(state.caseId);
  };

  /* ---------------- BACK / FORWARD ---------------- */
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const state = e.state as any;
      if (state?.page) {
        setCurrentPage(state.page);
        setCurrentCaseId(state.caseId || null);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  /* ---------------- PAGE RENDERER ---------------- */
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onLanguageSelect={handleLangSelect} />;

      case 'role':
        return (
          <RoleSelection
            onSelectRole={(role) =>
              role === 'user'
                ? navigate('login')
                : navigate('authority-login')
            }
          />
        );

      case 'login':
        return (
          <LoginPage
            onNavigate={navigate}
            onLoginSuccess={(target?: Page) =>
              navigate(target || 'home')
            }
          />
        );

      case 'authority-login':
        return (
          <AuthorityLogin
            onNavigate={(page) => navigate(page as Page)}
          />
        );

      case 'home':
        return <HomePage onNavigate={navigate} />;

      case 'kiosk':
        return <KioskDemo onNavigate={navigate} />;

      case 'features':
        return <FeaturesPage onNavigate={navigate} />;

      case 'tracking':
        return (
          <CaseTrackingPage
            onNavigate={navigate}
            onViewCase={(id: string) =>
              navigate('case', { caseId: id })
            }
          />
        );

      case 'case':
        return currentCaseId ? (
          require('./components/CaseDetails').default({
            caseId: currentCaseId,
            onBack: () => navigate('tracking'),
          })
        ) : (
          <CaseTrackingPage onNavigate={navigate} />
        );

      case 'search':
        return <CaseSearch onNavigate={navigate} />;

      case 'impact':
        return <ImpactPage onNavigate={navigate} />;

      case 'chatbot':
        return (
          <div className="h-screen w-screen bg-[#020617] text-slate-200 pt-28 px-6">
            <LegalChatbot />
          </div>
        );

      case 'authority-dashboard':
        return <AuthorityDashboard onNavigate={navigate} />;

      case 'authority-cases':
        return <AuthorityCases onNavigate={navigate} />;

      case 'authority-case-detail':
        return (
          <AuthorityCaseDetail
            caseId={currentCaseId || 'CASE-XXXX'}
            onBack={() => navigate('authority-cases')}
          />
        );

      case 'authority-hearings':
        return <AuthorityHearings onNavigate={navigate} />;

      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 relative">
      {currentPage !== 'landing' && <LanguageSwitcher />}

      {/* ✅ Blurred content during tour */}
      <div className={`transition-all duration-700 ${isTourActive ? "blur-md pointer-events-none scale-[0.98]" : ""}`}>
        {renderPage()}
      </div>

      {/* --- ✅ GAME-STYLE SPEECH CLOUD TOUR --- */}
      {isTourActive && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[220px] animate-bounce">
            <MousePointer2 className="w-14 h-14 text-emerald-400 fill-emerald-400 rotate-[160deg] drop-shadow-[0_0_20px_rgba(16,185,129,0.7)]" />
          </div>

          <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-auto animate-in zoom-in-90 duration-300 relative text-center">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rotate-45" />

            <div className="relative space-y-6">
              <div className="px-3 py-1 bg-emerald-100 rounded-full border border-emerald-200 inline-block">
                <p className="text-[9px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {t('exploring')} // {tourStep + 1} / {TOUR_STEPS.length}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-3">
                  {t(TOUR_STEPS[tourStep].title)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {t(TOUR_STEPS[tourStep].desc)}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button onClick={endTour} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition">
                  {t('skip')}
                </button>
                <button 
                  onClick={nextTourStep}
                  className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-xl active:scale-95"
                >
                  {tourStep === TOUR_STEPS.length - 1 ? t('finish') : t('next_step')}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;