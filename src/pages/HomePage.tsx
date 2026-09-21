import React from 'react';
import { PageRoute, SiteLegalConfig } from '../types';
import { Sparkles, Shield, Clock, CheckCircle2, ChevronRight, Home, Calendar, ArrowRight, HeartHandshake, MapPin, Award, Check } from 'lucide-react';
import { AnnecyMap } from '../components/AnnecyMap';

interface HomePageProps {
  navigate: (path: PageRoute) => void;
  legalConfig: SiteLegalConfig;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, legalConfig }) => {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Subtle decorative alpine shapes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <path d="M0,600 L200,300 L400,500 L650,200 L900,450 L1000,300 L1000,600 Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Service de proximité à Annecy & Rives du Lac</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif text-white leading-tight">
                Votre intérieur impeccable, l&apos;esprit serein au cœur des Alpes.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                <strong>Les Alpes Multiservices</strong> prend soin de votre domicile avec rigueur, discrétion et bienveillance. Ménage régulier, grand nettoyage saisonnier ou état des lieux : profitez de votre temps libre face au lac.
              </p>

              {/* Conditional SAP Announcement (Strictly §7) */}
              {legalConfig.sapDeclared && (
                <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-3 shadow-inner">
                  <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">
                      Éligible à 50% de crédit d&apos;impôt (Services à la Personne)
                    </span>
                    <span className="text-emerald-300/90 text-xs leading-normal mt-0.5 block">
                      En tant que particulier, vous bénéficiez d&apos;un avantage fiscal de 50% sur l&apos;ensemble de vos prestations d&apos;entretien ménager à domicile (déclaration NOVA : {legalConfig.sapNumber}).
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center justify-center gap-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-teal-950/20 transition-all cursor-pointer text-sm sm:text-base"
                >
                  <span>Demander un devis gratuit</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/services')}
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700/80 text-slate-200 hover:text-white font-medium px-5 py-3.5 rounded-xl border border-slate-700 transition-all cursor-pointer text-sm sm:text-base"
                >
                  <span>Découvrir nos formules</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust pills */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Sans engagement de durée</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Intervenant dédié & de confiance</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Assurance professionnelle</span>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider block">
                    Votre devis sur mesure
                  </span>
                  <h2 className="text-xl font-bold font-serif text-slate-900 mt-1">
                    Un service adapté à vos exigences
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Estimation claire et sans engagement sous 24h ouvrées.
                  </p>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-bold text-xs">
                      1
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block">Échange initial & visite conseil</span>
                      <span className="text-xs text-slate-600">Compréhension de vos habitudes, vos priorités et vos surfaces.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-bold text-xs">
                      2
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block">Devis détaillé sans frais cachés</span>
                      <span className="text-xs text-slate-600">Tarification horaire ou forfaitaire limpide, validée ensemble.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-bold text-xs">
                      3
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block">Prestation soignée et suivie</span>
                      <span className="text-xs text-slate-600">Régularité des créneaux et respect total de vos biens personnels.</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/contact')}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span>Configurer ma demande de ménage</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitments & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 block mb-1">
            Pourquoi choisir Les Alpes Multiservices
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
            La sérénité d&apos;un intervenant local dédié
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Loin des plateformes impersonnelles, nous privilégions la relation humaine, la continuité de service et la haute exigence de propreté.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Val 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Confiance & Discrétion</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Votre vie privée est sacrée. Respect scrupuleux des consignes, intégrité absolue et discrétion garantie lors de chaque passage à votre domicile.
            </p>
          </div>

          {/* Val 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Rigueur & Finitions</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dépoussiérage méticuleux, détartrage soigné des pièces d&apos;eau, aspiration dans les moindres recoins et traitement adapté à vos surfaces (parquets, marbre, faïence).
            </p>
          </div>

          {/* Val 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Ponctualité & Continuité</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Créneaux horaires fixes et respectés. Vous retrouvez le même interlocuteur pour une compréhension intuitive de vos exigences au fil des semaines.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 block mb-1">
              Prestations résidentielles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Des formules adaptées à votre rythme de vie
            </h2>
          </div>
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors"
          >
            <span>Voir le détail complet des prestations</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between p-6 sm:p-7">
            <div>
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center mb-4">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ménage Régulier</h3>
              <p className="text-xs text-teal-700 font-semibold uppercase tracking-wide mb-3">
                Hebdomadaire ou bimensuel
              </p>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                L&apos;entretien récurrent de votre lieu de vie : sols, sanitaires, cuisine, poussières et rangement régulier pour un domicile toujours accueillant.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>Planning stable chaque semaine</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>Même intervenant dédié</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>Option repassage du linge</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="w-full py-2.5 rounded-lg border border-slate-300 hover:border-slate-900 text-slate-800 hover:text-slate-900 text-xs font-semibold transition-colors"
            >
              Devis formule régulière →
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border-2 border-teal-600/30 overflow-hidden shadow-sm hover:border-teal-500 transition-all flex flex-col justify-between p-6 sm:p-7 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Recommandé
              </span>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Grand Nettoyage</h3>
              <p className="text-xs text-teal-700 font-semibold uppercase tracking-wide mb-3">
                Printemps, automne ou ponctuel
              </p>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Remise à niveau intégrale en profondeur : intérieur des placards, électroménager, détartrage intensif et vitrerie complète.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>Nettoyage en profondeur des plinthes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>Four, réfrigérateur et hotte</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>Idéal avant les saisons d&apos;accueil</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="w-full py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              Réserver un grand nettoyage →
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between p-6 sm:p-7">
            <div>
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">État des Lieux & Fin de Bail</h3>
              <p className="text-xs text-teal-700 font-semibold uppercase tracking-wide mb-3">
                Déménagement & remise des clés
              </p>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Intervention rigoureuse pour garantir la restitution intégrale de votre dépôt de garantie ou préparer l&apos;arrivée de nouveaux occupants.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>Conforme aux critères des agences</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>Intervention rapide sur créneau convenu</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span>Attestation de passage fournie</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="w-full py-2.5 rounded-lg border border-slate-300 hover:border-slate-900 text-slate-800 hover:text-slate-900 text-xs font-semibold transition-colors"
            >
              Devis fin de bail →
            </button>
          </div>
        </div>
      </section>

      {/* Intervention Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 block mb-1">
            Proximité & Réactivité
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
            Votre intervenant à Annecy et autour du lac
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Nous intervenons sur l&apos;ensemble de la communauté d&apos;agglomération du Grand Annecy et sur les rives Est et Ouest du lac d&apos;Annecy.
          </p>
        </div>

        <AnnecyMap />
      </section>

      {/* Final Lead Generation CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-teal-950 text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white">
              Libérez vos soirées et vos week-ends.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Faites appel à un professionnel du ménage à Annecy. Décrivez vos besoins en 2 minutes : nous vous recontactons sous 24h avec une proposition claire et adaptée.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-md transition-all text-sm cursor-pointer"
              >
                Demander un devis en ligne
              </button>
              <button
                onClick={() => navigate('/services')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-3.5 rounded-xl text-sm font-semibold border border-slate-700 transition-colors"
              >
                En savoir plus sur nos méthodes
              </button>
            </div>
            <p className="text-xs text-slate-400 pt-2">
              Réponse rapide garantie • Devis gratuit sans obligation • Confidentialité préservée
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
