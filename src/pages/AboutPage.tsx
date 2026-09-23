import React from 'react';
import { PageRoute, SiteLegalConfig } from '../types';
import { Shield, Sparkles, MapPin, CheckCircle2, ChevronRight, Key, Award, HeartHandshake, Compass } from 'lucide-react';
import { AnnecyMap } from '../components/AnnecyMap';

interface AboutPageProps {
  navigate: (path: PageRoute) => void;
  legalConfig: SiteLegalConfig;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate, legalConfig }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 block">
            Notre Histoire & Notre Territoire
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight">
            Un service de proximité ancré dans le bassin annécien
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Fondé sur des valeurs de transparence, de discrétion et d&apos;amour du travail bien fait, Les Alpes Multiservices est votre partenaire propreté de référence à Annecy.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 block">
              La rigueur comme signature
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Pourquoi nous confier votre lieu de vie ?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ouvrir la porte de son domicile demande une confiance totale. C&apos;est pourquoi nous avons fait le choix délibéré d&apos;une structure locale à taille humaine, où vous n&apos;êtes pas un simple numéro de dossier parmi des milliers.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Que vous résidiez dans un appartement de charme de la vieille ville d&apos;Annecy, une maison contemporaine à Annecy-le-Vieux ou une villa sur les rives du lac, nous abordons chaque logement avec le même niveau d&apos;exigence et de respect des lieux.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Key className="w-5 h-5 text-teal-700 mb-2" />
                <h3 className="font-bold text-sm text-slate-900 mb-1">Gestion sécurisée des clés</h3>
                <p className="text-xs text-slate-600">Protocole strict d&apos;anonymisation et coffre dédié pour vos accès.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Award className="w-5 h-5 text-teal-700 mb-2" />
                <h3 className="font-bold text-sm text-slate-900 mb-1">Assurance professionnelle</h3>
                <p className="text-xs text-slate-600">Couverture complète en responsabilité civile pour votre tranquillité.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-gradient-to-br from-teal-800 to-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-serif">Nos engagements intangibles</h3>
              <ul className="space-y-4 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Interlocuteur unique :</strong> Pas de turnover incessant. Vous échangez en direct avec la personne responsable de votre propreté.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Transparence tarifaire :</strong> Devis clair, sans frais d&apos;adhésion ni engagement captif. Vous arrêtez quand vous voulez.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Ponctualité alpine :</strong> Nous respectons scrupuleusement les horaires et les jours convenus.
                  </div>
                </li>
              </ul>

              <div className="pt-4 border-t border-teal-700/50">
                <button
                  onClick={() => navigate('/contact')}
                  className="min-h-[44px] w-full py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors text-center cursor-pointer inline-flex items-center justify-center"
                >
                  Prendre contact avec nous
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zone d'intervention Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 block mb-1">
            Périmètre d&apos;action
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
            Notre zone de déplacement en Haute-Savoie
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Basés à Annecy, nous desservons l&apos;intégralité de la première et seconde couronne du Grand Annecy ainsi que les rives du lac.
          </p>
        </div>

        <AnnecyMap />
      </section>

      {/* Call to action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-8 rounded-3xl bg-slate-100 border border-slate-200 space-y-4">
          <h3 className="text-xl font-bold font-serif text-slate-900">
            Un projet ou une question sur votre secteur ?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Nous répondons volontiers à vos interrogations concernant la logistique, la fréquence ou le déroulement d&apos;une première visite.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition-colors"
            >
              <span>Accéder au formulaire de contact</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
