import React, { useState, useEffect } from 'react';
import { PageRoute, SiteLegalConfig } from './types';
import { INITIAL_LEGAL_CONFIG } from './config/siteConfig';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { MentionsLegalesPage } from './pages/MentionsLegalesPage';
import { ConfidentialitePage } from './pages/ConfidentialitePage';
import { CgvPage } from './pages/CgvPage';

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
  const [legalConfig] = useState<SiteLegalConfig>(INITIAL_LEGAL_CONFIG);

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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900 font-sans">
      {/* Top Main Navigation */}
      <Navbar
        currentPath={currentPath}
        navigate={navigate}
        sapDeclared={legalConfig.sapDeclared}
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
          />
        )}
        {currentPath === '/confidentialite' && (
          <ConfidentialitePage
            navigate={navigate}
            legalConfig={legalConfig}
          />
        )}
        {currentPath === '/cgv' && (
          <CgvPage
            navigate={navigate}
            legalConfig={legalConfig}
          />
        )}
      </main>

      {/* Footer with Mandatory Legal Links on Every Page */}
      <Footer
        navigate={navigate}
        legalConfig={legalConfig}
      />
    </div>
  );
}
