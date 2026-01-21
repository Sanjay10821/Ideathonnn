import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronRight, Sparkles, MousePointer2 } from 'lucide-react';

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import AuthorityLogin from './components/AuthorityLogin';

import HomePage from './components/HomePage';
import KioskDemo from './components/KioskDemo';
import FeaturesPage from './components/FeaturesPage';
import CaseTrackingPage from './components/CaseTrackingPage';
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
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  useEffect(() => {
    const savedLang = localStorage.getItem('auto_lang') || 'en';
    i18n.changeLanguage(savedLang);
    changeLanguage(savedLang);
    setCurrentPage('landing');
  }, []);

  const nextTourStep = () => {
    if (tourStep < TOUR_STEPS.length - 1) {
      const nextIdx = tourStep + 1;
      setTourStep(nextIdx);
      setCurrentPage(TOUR_STEPS[nextIdx].page);
    } else {
      setIsTourActive(false);
      setCurrentPage('home');
    }
  };

  const handleLangSelect = (lng: string) => {
    localStorage.setItem('auto_lang', lng);
    i18n.changeLanguage(lng);
    changeLanguage(lng);
    // Skip RoleSelection and go straight to the Auth Hub (LoginPage)
    navigate('login');
  };

  const navigate = (page: Page, state: Record<string, any> = {}) => {
    if (isTourActive) return;
    window.history.pushState({ page, ...state }, '', `#${page}`);
    setCurrentPage(page);
    if (state.caseId) setCurrentCaseId(state.caseId);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onLanguageSelect={handleLangSelect} />;

      case 'login':
        return (
          <LoginPage
            onNavigate={navigate}
            onSuccess={(role: string) => 
              role === 'authority' ? navigate('authority-dashboard') : navigate('home')
            }
            onBack={() => setCurrentPage('landing')}
          />
        );

      case 'home':
        return <HomePage onNavigate={navigate} />;

      case 'kiosk':
        return <KioskDemo onNavigate={navigate} />;

      case 'features':
        return <FeaturesPage onNavigate={navigate} />;

      case 'tracking':
        return <CaseTrackingPage onNavigate={navigate} onViewCase={(id) => navigate('case', { caseId: id })} />;

      case 'case':
        // Direct require for CaseDetails to keep your original structure
        return currentCaseId ? require('./components/CaseDetails').default({
          caseId: currentCaseId,
          onBack: () => navigate('tracking'),
        }) : <CaseTrackingPage onNavigate={navigate} />;

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
        return <AuthorityCaseDetail caseId={currentCaseId || 'CASE-XXXX'} onBack={() => navigate('authority-cases')} />;

      case 'authority-hearings':
        return <AuthorityHearings onNavigate={navigate} />;

      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 relative">
      {/* Global signature at the bottom */}
      <div className="fixed bottom-6 left-0 w-full text-center pointer-events-none z-0">
         <p className="text-slate-700 text-[10px] uppercase font-bold tracking-[0.4em] italic opacity-40">
            Legal Edge • Digital Justice Redefined
         </p>
      </div>

      <div className={`transition-all duration-700 ${isTourActive ? "blur-md pointer-events-none scale-[0.98]" : ""}`}>
        {renderPage()}
      </div>

      {/* --- TOUR SPEECH CLOUD --- */}
      {isTourActive && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[220px] animate-bounce">
            <MousePointer2 className="w-14 h-14 text-emerald-400 fill-emerald-400 rotate-[160deg] drop-shadow-[0_0_20px_rgba(16,185,129,0.7)]" />
          </div>
          <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-10 shadow-2xl pointer-events-auto relative text-center">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rotate-45" />
            <div className="relative space-y-6">
              <h3 className="text-2xl font-black text-slate-900 uppercase italic leading-none">{t(TOUR_STEPS[tourStep].title)}</h3>
              <p className="text-slate-500 text-sm">{t(TOUR_STEPS[tourStep].desc)}</p>
              <div className="flex items-center justify-between pt-4">
                <button onClick={() => setIsTourActive(false)} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('skip')}</button>
                <button onClick={nextTourStep} className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase flex items-center gap-3">
                  {tourStep === TOUR_STEPS.length - 1 ? t('finish') : t('next_step')} <ChevronRight size={16} />
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