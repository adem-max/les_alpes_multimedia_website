import React, { useState } from 'react';
import { Menu, X, ShieldCheck, ChevronRight } from 'lucide-react';
import { PageRoute } from '../types';
import brandLogo from '../assets/images/alpes_multiservices_logo_1790023154905.jpg';

interface NavbarProps {
  currentPath: PageRoute;
  navigate: (path: PageRoute) => void;
  sapDeclared: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  navigate,
  sapDeclared,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { path: PageRoute; label: string }[] = [
    { path: '/', label: 'Accueil' },
    { path: '/services', label: 'Nos Services' },
    { path: '/a-propos', label: 'À propos & Zone' },
    { path: '/contact', label: 'Contact & Devis' },
  ];

  const handleNavigate = (path: PageRoute) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro-bar for local presence & trust */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Ménage à domicile & entretien soigné à Annecy et ses environs</span>
            {sapDeclared && (
              <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 font-medium px-2 py-0.5 rounded text-[11px] border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" />
                Éligible Crédit d&apos;impôt 50% (SAP)
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <span className="hidden sm:inline text-slate-400">Grand Annecy & Rives du Lac</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-teal-300 font-medium">Devis gratuit sous 24h</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <button
            onClick={() => handleNavigate('/')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform duration-200 border border-slate-200/80 bg-slate-900 shrink-0">
              <img
                src={brandLogo}
                alt="Logo Les Alpes Multiservices"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block text-xl font-bold tracking-tight text-slate-900 font-serif">
                Les Alpes Multiservices
              </span>
              <span className="block text-xs font-medium text-teal-700 tracking-wide uppercase">
                Ménage à domicile • Annecy
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavigate(link.path)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Right */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavigate('/contact')}
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              <span>Demander un devis</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavigate(link.path)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => handleNavigate('/contact')}
              className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 rounded-lg shadow-sm"
            >
              <span>Demander un devis gratuit</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
