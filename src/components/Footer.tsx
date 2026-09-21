import React from 'react';
import { PageRoute, SiteLegalConfig } from '../types';
import { Sparkles, MapPin, Mail, Phone, Shield, FileText, CheckCircle2, Lock } from 'lucide-react';

interface FooterProps {
  navigate: (path: PageRoute) => void;
  legalConfig: SiteLegalConfig;
  onOpenChecklist: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  navigate,
  legalConfig,
  onOpenChecklist,
}) => {
  const handleNav = (path: PageRoute) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Col 1: Brand & Presentation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-lg font-bold font-serif tracking-tight">
                  Les Alpes Multiservices
                </span>
                <span className="block text-xs text-teal-400 font-medium tracking-wide">
                  Annecy & Bassin Annécien
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Prestations soignées de ménage à domicile et d&apos;entretien pour particuliers : régulier, ponctuel, grand nettoyage et fin de bail. Rigueur alpine, confiance et discrétion.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 text-teal-300 text-xs border border-slate-700">
                <Shield className="w-3.5 h-3.5 text-teal-400" />
                Intervention assurée & déclarée
              </span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Prestations
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Ménage régulier (semaine / quinzaine)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Grand nettoyage ponctuel / de saison
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  État des lieux & fin de bail
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Entretien des vitres & baies vitrées
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Repassage & soin du linge
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Zone d'intervention & Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Zone d&apos;intervention
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Rayon d&apos;action sur tout le Grand Annecy et les rives du lac :
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs text-slate-300 mb-4">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Annecy</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Annecy-le-Vieux</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Seynod</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Cran-Gevrier</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Epagny</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Poisy</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Veyrier-du-Lac</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Sévrier</span>
            </div>
            <button
              onClick={() => handleNav('/a-propos')}
              className="text-xs text-teal-400 hover:text-teal-300 underline underline-offset-4"
            >
              Consulter la carte complète de la zone →
            </button>
          </div>

          {/* Col 4: Contact & Placeholders */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contact & Informations
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-xs">Adresse / Siège :</span>
                  <span className="text-slate-200 block text-xs">{legalConfig.professionalAddress}</span>
                  <span className="text-teal-400/80 text-[11px]">Bassin Annécien & agglomération</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div className="overflow-hidden">
                  <span className="text-slate-400 block text-xs">Email :</span>
                  <a
                    href={`mailto:${legalConfig.contactEmail}`}
                    className="text-teal-300 hover:text-teal-200 underline font-mono text-xs break-all"
                  >
                    {legalConfig.contactEmail}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-xs">Téléphone :</span>
                  <a
                    href={`tel:${legalConfig.contactPhone.replace(/\s+/g, '')}`}
                    className="text-slate-200 hover:text-teal-300 font-mono text-xs font-semibold"
                  >
                    {legalConfig.contactPhone}
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-slate-800">
              <button
                onClick={onOpenChecklist}
                className="inline-flex items-center gap-2 text-xs bg-slate-900 hover:bg-slate-800 text-teal-400 border border-slate-700 px-3 py-1.5 rounded-md transition-colors"
              >
                <span>Vérifier la conformité légale</span>
              </button>
            </div>
          </div>
        </div>

        {/* Legal Links Bar - MANDATORY: Footer on every page must link to all three legal pages (5-7) */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
            <button
              onClick={() => handleNav('/mentions-legales')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Mentions Légales
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => handleNav('/confidentialite')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Politique de Confidentialité (RGPD)
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => handleNav('/cgv')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Conditions Générales de Vente & Service (CGV)
            </button>
          </div>

          <div className="text-center md:text-right text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-teal-500" />
              <span>Zéro traceur tiers • Respect CNIL & RGPD</span>
            </span>
            <span className="block text-[11px] text-slate-400 mt-1">
              © {new Date().getFullYear()} Les Alpes Multiservices — Tous droits réservés.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
