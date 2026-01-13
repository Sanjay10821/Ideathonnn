import { useEffect, useState } from 'react';

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

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentCaseId, setCurrentCaseId] = useState<string | null>(null);

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    const savedLang = localStorage.getItem('auto_lang');
    const lang = savedLang || 'en';
    i18n.changeLanguage(lang);
    changeLanguage(lang);

    setCurrentPage('landing');
    window.history.replaceState({ page: 'landing' }, '', '#landing');
  }, []);

  /* ---------------- LANGUAGE SELECTION ---------------- */
  const handleLangSelect = (lng: string) => {
    localStorage.setItem('auto_lang', lng);
    i18n.changeLanguage(lng);
    changeLanguage(lng);

    window.history.pushState({ page: 'role' }, '', '#role');
    setCurrentPage('role');
  };

  /* ---------------- NAVIGATION ---------------- */
  const navigate = (page: Page, state: Record<string, any> = {}) => {
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
            onLogin={() => navigate('authority-dashboard')}
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

      /* -------- LEGAL AUTHORITY FLOW -------- */
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
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {currentPage !== 'landing' && <LanguageSwitcher />}
      {renderPage()}
    </div>
  );
}

export default App;
