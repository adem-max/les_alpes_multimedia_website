import React, { useState, useEffect } from 'react';
import { PageRoute, SiteLegalConfig } from './types';
import { INITIAL_LEGAL_CONFIG } from './config/siteConfig';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OwnerChecklistModal } from './components/OwnerChecklistModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { MentionsLegalesPage } from './pages/MentionsLegalesPage';
import { ConfidentialitePage } from './pages/ConfidentialitePage';
import { CgvPage } from './pages/CgvPage';
import { Settings, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function App() {
  // Normalize initial path to known route
  const getInitialPath = (): PageRoute => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const validPaths: PageRoute[] = [
        '/',
        '/services',
        '/a-propos',
        '/contact',
        '/mentions-legales',
        '/confidentialite',
        '/cgv',
      ];
      if (validPaths.includes(path as PageRoute)) {
        return path as PageRoute;
      }
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<PageRoute>(getInitialPath);
  const [legalConfig, setLegalConfig] = useState<SiteLegalConfig>(INITIAL_LEGAL_CONFIG);
  const [checklistOpen, setChecklistOpen] = useState<boolean>(false);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as PageRoute;
      const validPaths: PageRoute[] = [
        '/',
        '/services',
        '/a-propos',
        '/contact',
        '/mentions-legales',
        '/confidentialite',
        '/cgv',
      ];
      if (validPaths.includes(path)) {
        setCurrentPath(path);
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: PageRoute) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateLegalConfig = (newConfig: Partial<SiteLegalConfig>) => {
    setLegalConfig((prev) => ({ ...prev, ...newConfig }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900 font-sans">
      {/* Top Main Navigation */}
      <Navbar
        currentPath={currentPath}
        navigate={navigate}
        sapDeclared={legalConfig.sapDeclared}
        onOpenChecklist={() => setChecklistOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {currentPath === '/' && (
          <HomePage navigate={navigate} legalConfig={legalConfig} />
        )}
        {currentPath === '/services' && (
          <ServicesPage navigate={navigate} legalConfig={legalConfig} />
        )}
        {currentPath === '/a-propos' && (
          <AboutPage navigate={navigate} legalConfig={legalConfig} />
        )}
        {currentPath === '/contact' && (
          <ContactPage navigate={navigate} legalConfig={legalConfig} />
        )}
        {currentPath === '/mentions-legales' && (
          <MentionsLegalesPage
            navigate={navigate}
            legalConfig={legalConfig}
            onOpenChecklist={() => setChecklistOpen(true)}
          />
        )}
        {currentPath === '/confidentialite' && (
          <ConfidentialitePage
            navigate={navigate}
            legalConfig={legalConfig}
            onOpenChecklist={() => setChecklistOpen(true)}
          />
        )}
        {currentPath === '/cgv' && (
          <CgvPage
            navigate={navigate}
            legalConfig={legalConfig}
            onOpenChecklist={() => setChecklistOpen(true)}
          />
        )}
      </main>

      {/* Footer with Mandatory Legal Links on Every Page */}
      <Footer
        navigate={navigate}
        legalConfig={legalConfig}
        onOpenChecklist={() => setChecklistOpen(true)}
      />

      {/* Owner Floating Helper Badge */}
      <aside aria-label="Contrôles propriétaire" className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setChecklistOpen(true)}
          className="group flex items-center gap-2 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold px-3.5 py-2.5 rounded-full shadow-lg border border-slate-700 hover:border-teal-400 transition-all cursor-pointer backdrop-blur-xs"
          title="Consulter la checklist propriétaire et les placeholders [TODO]"
        >
          <Settings className="w-3.5 h-3.5 text-teal-400 group-hover:rotate-45 transition-transform" />
          <span className="hidden sm:inline">Contrôle Propriétaire</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" title="Mentions légales validées"></span>
        </button>
      </aside>

      {/* Owner Checklist & SAP Toggle Modal */}
      <OwnerChecklistModal
        isOpen={checklistOpen}
        onClose={() => setChecklistOpen(false)}
        legalConfig={legalConfig}
        onUpdateLegalConfig={handleUpdateLegalConfig}
      />
    </div>
  );
}
