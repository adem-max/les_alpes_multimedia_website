import React from 'react';
import { PageRoute, SiteLegalConfig } from '../types';
import { Sparkles, Home, Calendar, Clock, CheckCircle2, ShieldCheck, ChevronRight, HelpCircle, Wind, Droplets, HeartHandshake } from 'lucide-react';

interface ServicesPageProps {
  navigate: (path: PageRoute) => void;
  legalConfig: SiteLegalConfig;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ navigate, legalConfig }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 block">
            Prestations à domicile • Annecy & Agglomération
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight">
            Des services de ménage sur-mesure, pensés pour votre confort
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Chaque intérieur possède ses particularités. Nous établissons ensemble un cahier des charges précis adapté à vos pièces de vie, vos matériaux et vos préférences.
          </p>

          {/* Conditional SAP Announcement (§7) */}
          {legalConfig.sapDeclared && (
            <div className="mt-6 p-4 rounded-xl bg-teal-950/80 border border-teal-500/40 text-left max-w-2xl mx-auto flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-teal-200 text-sm block">
                  Avantage fiscal : 50% de crédit d&apos;impôt sur nos prestations
                </span>
                <span className="text-xs text-teal-300/90 leading-relaxed block mt-0.5">
                  Grâce à notre déclaration Services à la Personne (déclaration NOVA : {legalConfig.sapNumber}), les particuliers bénéficient d&apos;une réduction ou d&apos;un crédit d&apos;impôt sur le revenu de 50% des sommes engagées pour les prestations d&apos;entretien du domicile (selon dispositions de l&apos;art. 199 sexdecies du CGI).
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Service 1: Ménage Régulier */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold">
              <Home className="w-4 h-4 text-teal-600" />
              <span>Formule récurrente</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              Ménage d&apos;entretien régulier
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Idéal pour les actifs, familles ou résidents souhaitant préserver un logement net et accueillant en permanence sans y consacrer leurs moments de repos.
            </p>

            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Prestations incluses à chaque passage :
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Dépoussiérage des meubles et plinthes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Nettoyage & désinfection sanitaires / salle d&apos;eau</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Aspiration & lavage soigné des sols</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Cuisine : plan de travail, évier, façades</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Vidage des corbeilles et aération des pièces</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Changement des draps (sur demande)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 flex flex-col justify-between border border-slate-200/80">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Rythme & Organisation
              </span>
              <div className="mt-3 space-y-2 text-xs text-slate-600">
                <p>• <strong>Fréquence recommandée :</strong> 1 fois par semaine (2h à 4h) ou 1 fois tous les 15 jours.</p>
                <p>• <strong>Créneau fixe :</strong> Le même jour et la même heure chaque semaine.</p>
                <p>• <strong>Intervenant :</strong> Toujours la même personne à votre domicile pour une totale confiance.</p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>Demander un devis régulier</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Service 2: Grand Nettoyage & Remise à niveau */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Intervention ponctuelle intensive</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              Grand nettoyage ponctuel & de saison
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nettoyage approfondi après une réception, avant l&apos;hiver ou au printemps. Nous traitons les zones habituellement délaissées lors des entretiens ordinaires.
            </p>

            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Focus sur les détails exigeants :
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Dégraissage complet du four et de la hotte</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Détartrage intensif des parois de douche et faïences</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Intérieur des placards et tiroirs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Lavage des encadrements de fenêtres & plinthes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Déplacement des meubles légers pour aspiration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Traitement assainissant des surfaces</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 flex flex-col justify-between border border-slate-200/80">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Format Forfaitaire
              </span>
              <div className="mt-3 space-y-2 text-xs text-slate-600">
                <p>• <strong>Durée :</strong> Demi-journée ou journée complète selon superficie.</p>
                <p>• <strong>Équipement :</strong> Matériel adapté aux salissures tenaces et au calcaire montagnard.</p>
                <p>• <strong>Résultat :</strong> Un intérieur régénéré et purifié.</p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>Planifier un grand nettoyage</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Service 3: État des lieux & Déménagement */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Fin de bail & Déménagement</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              Nettoyage d&apos;état des lieux & fin de bail
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pour locataires et propriétaires souhaitant une restitution sans litige. Un protocole rigoureux conforme aux attentes strictes des agences immobilières d&apos;Annecy.
            </p>

            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Points de contrôle agence :
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Détartrage des robinetteries & mousseurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Nettoyage des volets roulants & fenêtres</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Traces sur les portes, poignées et interrupteurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Nettoyage des radiateurs et bouches VMC</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 flex flex-col justify-between border border-slate-200/80">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Garantie restitution
              </span>
              <div className="mt-3 space-y-2 text-xs text-slate-600">
                <p>• <strong>Facture détaillée :</strong> Valable comme justificatif auprès de votre propriétaire ou bailleur.</p>
                <p>• <strong>Réactivité :</strong> Créneaux d&apos;urgence possibles selon calendrier de fin de préavis.</p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>Devis nettoyage état des lieux</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products & Eco-commitments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 block mb-1">
              Engagement environnemental
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Des produits respectueux de votre santé et de la faune alpine
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Vivre au bord du lac d&apos;Annecy, c&apos;est chérir un cadre naturel exceptionnel. Nous privilégions des produits écocertifiés, biodégradables, sans composés organiques volatils (COV) agressifs, pour un air intérieur pur et sain pour vos enfants et animaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <Droplets className="w-6 h-6 text-teal-600 mb-2" />
              <h3 className="font-bold text-sm text-slate-900 mb-1">Formules biodégradables</h3>
              <p className="text-xs text-slate-600">Produits non polluants pour les réseaux d&apos;eaux du bassin annécien.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <Wind className="w-6 h-6 text-teal-600 mb-2" />
              <h3 className="font-bold text-sm text-slate-900 mb-1">Qualité de l&apos;air intérieur</h3>
              <p className="text-xs text-slate-600">Pas de parfums chimiques de synthèse étouffants, fraîcheur naturelle.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <HeartHandshake className="w-6 h-6 text-teal-600 mb-2" />
              <h3 className="font-bold text-sm text-slate-900 mb-1">Flexibilité totale</h3>
              <p className="text-xs text-slate-600">Possibilité d&apos;utiliser vos propres produits ou matériels selon vos préférences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-bold font-serif text-slate-900 text-center">
          Questions fréquentes sur nos interventions
        </h2>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Dois-je être présent(e) pendant le ménage ?</span>
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Non. Vous êtes libre d&apos;être présent(e) ou de nous confier un double de clés sécurisé. Une première visite préalable est systématiquement organisée ensemble avant le début des prestations afin de valider vos consignes et vos habitudes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Qui fournit les produits et l&apos;aspirateur ?</span>
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Par défaut, nous pouvons utiliser vos équipements pour éviter tout risque de contamination croisée entre domiciles, ou apporter notre propre matériel sur demande préalable.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Quels sont les délais d&apos;intervention ?</span>
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Pour une prestation régulière, le créneau hebdomadaire est généralement mis en place sous 3 à 7 jours ouvrés suivant l&apos;accord sur le devis.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            <span>Obtenir un devis personnalisé pour mon domicile</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
