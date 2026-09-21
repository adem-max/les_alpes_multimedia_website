import React from 'react';
import { PageRoute, SiteLegalConfig } from '../types';
import { Shield, Lock, CheckCircle2, Mail, Database, Clock, Eye, AlertCircle, FileText } from 'lucide-react';

interface ConfidentialitePageProps {
  navigate: (path: PageRoute) => void;
  legalConfig: SiteLegalConfig;
}

export const ConfidentialitePage: React.FC<ConfidentialitePageProps> = ({
  navigate,
  legalConfig,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5 text-teal-600" />
          <span>Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679)</span>
        </div>
        <h1 className="text-3xl font-bold font-serif text-slate-900">
          Politique de Confidentialité & Protection des Données
        </h1>
        <p className="text-sm text-slate-500">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Intro commitment */}
      <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-teal-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-teal-900">
          <Shield className="w-4 h-4 text-teal-700" />
          <span>Notre engagement pour votre vie privée</span>
        </div>
        <p className="leading-relaxed text-teal-800">
          <strong>Les Alpes Multiservices</strong> s&apos;engage à ce que la collecte et le traitement de vos données personnelles effectués à partir du présent site soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
        </p>
      </div>

      {/* Structured Sections 1 to 6 in Exact Order mandated by §4 */}
      <div className="space-y-8 text-xs text-slate-700 leading-relaxed">
        {/* Point 1: What's collected */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-mono text-xs">1</span>
            <span>Données collectées</span>
          </div>
          <p>
            Lorsque vous utilisez notre formulaire de contact ou de demande de devis, nous collectons exclusivement les données strictement nécessaires au traitement de votre requête :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-800">
            <li><strong>Nom et prénom</strong> : pour identifier votre dossier et nous adresser à vous cordialement.</li>
            <li><strong>Adresse email</strong> : pour vous envoyer notre devis chiffré et échanger par écrit.</li>
            <li><strong>Numéro de téléphone (facultatif)</strong> : si vous souhaitez être rappelé(e) pour un échange verbal ou convenir d&apos;un rendez-vous.</li>
            <li><strong>Commune / adresse et contenu du message</strong> : informations descriptives relatives à votre logement (superficie approximative, type de ménage souhaité, particularités) transmises librement par vos soins.</li>
          </ul>
        </div>

        {/* Point 2: Why (Finalités & Base légale) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-mono text-xs">2</span>
            <span>Finalité du traitement & Base légale</span>
          </div>
          <p>
            Ces informations sont recueillies pour la seule finalité de :
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium">
            Répondre à vos demandes d&apos;informations, établir des devis personnalisés et exécuter des mesures précontractuelles ou contractuelles de prestations de ménage à domicile.
          </div>
          <p>
            <strong>Base juridique :</strong> Le traitement repose sur l&apos;exécution de mesures précontractuelles prises à la demande de la personne concernée (article 6-1-b du RGPD) ainsi que sur notre intérêt légitime à répondre aux sollicitations entrantes. Aucune case à cocher obligatoire de consentement n&apos;est donc requise pour cette finalité spécifique.
          </p>
        </div>

        {/* Point 3: Who has access (Destinataires) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-mono text-xs">3</span>
            <span>Destinataires des données</span>
          </div>
          <p>
            Vos données personnelles sont traitées exclusivement par l&apos;exploitant de Les Alpes Multiservices : <strong className="text-slate-900 font-semibold">{legalConfig.publisherName}</strong>.
          </p>
          <p>
            Elles peuvent être hébergées ou transitées techniquement auprès de nos sous-traitants techniques intervenant en qualité de sous-traitants au sens du RGPD :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-800">
            <li><strong>Vercel Inc.</strong> (États-Unis / Union Européenne) : hébergeur de l&apos;infrastructure web et des fonctions de messagerie sécurisées.</li>
            <li><strong>Sanity AS</strong> (Norvège / UE) : solution de gestion de contenu assurant l&apos;archivage sécurisé des leads de contact.</li>
          </ul>
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold">
            Vos données ne sont JAMAIS vendues, louées, cédées ni partagées avec des tiers à des fins publicitaires ou de prospection commerciale.
          </div>
        </div>

        {/* Point 4: Retention (Durée de conservation) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-mono text-xs">4</span>
            <span>Durée de conservation</span>
          </div>
          <p>
            Nous conservons vos données pour des durées strictement proportionnées :
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-800">
            <li>
              <strong>En l&apos;absence de souscription de prestation :</strong> Vos coordonnées et messages sont conservés pour une durée maximale de <strong>3 ans</strong> à compter du dernier contact émanant de votre part. Au-delà, elles sont définitivement supprimées ou anonymisées.
            </li>
            <li>
              <strong>En cas de conclusion d&apos;un contrat de prestation :</strong> Les données nécessaires à la facturation et à la comptabilité sont conservées pendant les durées légales obligatoires (10 ans conformément au Code de commerce).
            </li>
          </ul>
        </div>

        {/* Point 5: Rights (Vos droits) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-mono text-xs">5</span>
            <span>Vos droits Informatique et Libertés</span>
          </div>
          <p>
            Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants concernant vos données à caractère personnel :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-900 block">Droit d&apos;accès :</span>
              Obtenir la confirmation que vos données sont traitées et en recevoir une copie.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-900 block">Droit de rectification :</span>
              Demander la modification de données inexactes ou incomplètes.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-900 block">Droit à l&apos;effacement (&quot;oubli&quot;) :</span>
              Demander la suppression de vos données personnelles de nos registres.
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-900 block">Droit d&apos;opposition :</span>
              Vous opposer à tout moment au traitement de vos données pour motifs légitimes.
            </div>
          </div>
          <p className="pt-2">
            Pour exercer l&apos;un quelconque de ces droits, il vous suffit d&apos;adresser un message écrit précisant votre demande à notre adresse électronique de contact dédiée :
          </p>
          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-2 text-teal-900 font-mono text-xs font-semibold">
            <Mail className="w-4 h-4 text-teal-700 shrink-0" />
            <span>{legalConfig.contactEmail}</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Une réponse vous sera apportée dans un délai maximum de 30 jours. Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous avez la possibilité d&apos;introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés — www.cnil.fr).
          </p>
        </div>

        {/* Point 6: No Automated Decision / Profiling */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-mono text-xs">6</span>
            <span>Absence de décision automatisée & de profilage</span>
          </div>
          <p>
            Nous confirmons formellement qu&apos;<strong>aucun processus de décision automatisée ni aucun profilage</strong> au sens de l&apos;article 22 du RGPD n&apos;est mis en œuvre sur ce site. Chaque demande reçue fait l&apos;objet d&apos;un traitement et d&apos;une étude humaine personnalisée.
          </p>
        </div>

        {/* Point 7: Cookies & Zero Trackers disclosure (§5) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
            <Eye className="w-4 h-4" />
            <span>7. Gestion des cookies & traceurs (Zéro traceur non essentiel)</span>
          </div>
          <p>
            Ce site a été expressément conçu selon les principes du <em>Privacy by Design</em> (protection de la vie privée dès la conception) :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li><strong>Aucun cookie publicitaire</strong>, ni pixel de reciblage (Facebook Pixel, TikTok, etc.).</li>
            <li><strong>Aucun outil de mesure d&apos;audience intrusif</strong> nécessitant le recueil de votre consentement préalable.</li>
            <li><strong>Aucune police externe chargée via Google CDN</strong> ni cartographie interactive Google Maps traçante (la carte du bassin annécien est nativement intégrée en vecteur local autonome).</li>
          </ul>
          <p className="text-slate-600">
            En conséquence de cette absence totale de traceurs superflus, conformément aux recommandations de la CNIL, <strong>aucun bandeau de consentement aux cookies intrusif n&apos;est imposé lors de votre navigation</strong>.
          </p>
        </div>
      </div>

      {/* Bottom navigation links */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 text-xs">
        <button
          onClick={() => navigate('/mentions-legales')}
          className="text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-4"
        >
          Consulter les Mentions Légales →
        </button>
        <button
          onClick={() => navigate('/cgv')}
          className="text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-4"
        >
          Consulter les Conditions Générales de Vente (CGV) →
        </button>
      </div>
    </div>
  );
};
