import React from 'react';
import { PageRoute, SiteLegalConfig } from '../types';
import { Shield, FileText, CheckCircle2, ChevronRight, Server, Building2, Mail, Phone, MapPin } from 'lucide-react';

interface MentionsLegalesPageProps {
  navigate: (path: PageRoute) => void;
  legalConfig: SiteLegalConfig;
}

export const MentionsLegalesPage: React.FC<MentionsLegalesPageProps> = ({
  navigate,
  legalConfig,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>Conformité Loi pour la Confiance dans l&apos;Économie Numérique (LCEN art. 6-III)</span>
        </div>
        <h1 className="text-3xl font-bold font-serif text-slate-900">
          Mentions Légales
        </h1>
        <p className="text-sm text-slate-500">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Structure Exactement Conforme au Cahier des Charges (§3) */}
      <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-200 shadow-xs overflow-hidden">
        {/* 1. Éditeur du site */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>1. Éditeur de la plateforme</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Le présent site internet <strong>Les Alpes Multiservices</strong> est édité et exploité par :
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-slate-500 font-medium mb-1">Identité de l&apos;exploitant / Dénomination :</dt>
              <dd className="font-mono font-semibold text-slate-900 text-sm">
                {legalConfig.publisherName}
              </dd>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-slate-500 font-medium mb-1">Statut juridique & capital :</dt>
              <dd className="font-mono font-semibold text-slate-900 text-sm">
                {legalConfig.legalStatus}
              </dd>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-slate-500 font-medium mb-1">Numéro SIRET (INSEE) :</dt>
              <dd className="font-mono font-semibold text-slate-900 text-sm">
                {legalConfig.siretNumber}
              </dd>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-slate-500 font-medium mb-1">Adresse professionnelle / de domiciliation :</dt>
              <dd className="font-mono font-semibold text-slate-900 text-sm">
                {legalConfig.professionalAddress}
              </dd>
            </div>
          </dl>
        </div>

        {/* 2. Coordonnées de contact */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
            <Mail className="w-4 h-4" />
            <span>2. Coordonnées de contact</span>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-slate-500 font-medium mb-1">Courrier électronique (Email) :</dt>
              <dd className="font-mono font-semibold text-teal-800 text-sm break-all">
                {legalConfig.contactEmail}
              </dd>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-slate-500 font-medium mb-1">Téléphone de contact (optionnel) :</dt>
              <dd className="font-mono font-semibold text-slate-900 text-sm">
                {legalConfig.contactPhone}
              </dd>
            </div>
          </dl>
        </div>

        {/* 3. Direction de la publication */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>3. Directeur de la publication</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Conformément à l&apos;article 6-III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique, le directeur de la publication est :
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <span className="font-semibold font-mono text-slate-900 text-sm block">
              {legalConfig.publicationDirector}
            </span>
            <span className="text-slate-500 text-[11px] mt-0.5 block">
              (Identique au responsable et exploitant mentionné ci-dessus)
            </span>
          </div>
        </div>

        {/* 4. Hébergement du site */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
            <Server className="w-4 h-4" />
            <span>4. Hébergeur de la plateforme</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Le site est hébergé conformément aux exigences légales par :
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
            <span className="font-bold text-slate-900 block text-sm">{legalConfig.hostName}</span>
            <span className="text-slate-600 block">{legalConfig.hostAddress}</span>
            <a
              href={legalConfig.hostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 hover:text-teal-900 underline block pt-1"
            >
              vercel.com
            </a>
          </div>
        </div>

        {/* 5. Déclaration SAP (Services à la Personne) - Conditionnelle */}
        {legalConfig.sapDeclared && (
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>5. Activité de Services à la Personne (SAP)</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <span className="font-bold block text-sm">
                Déclaration d&apos;activité Services à la Personne enregistrée
              </span>
              <p className="text-emerald-800 leading-relaxed">
                L&apos;entreprise a satisfait à la déclaration préalable d&apos;activité de Services à la Personne auprès de la préfecture compétente via le portail officiel NOVA sous le numéro :
              </p>
              <div className="pt-1 font-mono font-bold text-emerald-900 text-sm">
                Numéro d&apos;enregistrement SAP : {legalConfig.sapNumber}
              </div>
              <p className="text-[11px] text-emerald-700 pt-1">
                Cette déclaration ouvre droit pour les clients particuliers à un crédit d&apos;impôt de 50% sur les dépenses engagées, dans les conditions prévues par l&apos;article 199 sexdecies du Code général des impôts.
              </p>
            </div>
          </div>
        )}

        {/* 6. Propriété intellectuelle & Contenus */}
        <div className="p-6 sm:p-8 space-y-3 text-xs text-slate-600 leading-relaxed">
          <h2 className="text-sm font-bold text-slate-900">
            6. Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble de ce site (textes, logos, arborescence, structure et éléments graphiques) relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Toute reproduction, distribution ou modification, totale ou partielle, sans accord écrit préalable de l&apos;exploitant est strictement interdite.
          </p>
        </div>

        {/* 7. Médiation des litiges de la consommation (Art. L. 612-1 et R. 616-1) */}
        <div className="p-6 sm:p-8 space-y-3 text-xs text-slate-600 leading-relaxed">
          <h2 className="text-sm font-bold text-slate-900">
            7. Médiation des litiges de la consommation
          </h2>
          <p>
            Conformément aux articles L. 612-1 et R. 616-1 du Code de la consommation, en cas de litige non résolu à l&apos;amiable avec notre service, le consommateur a le droit de recourir gratuitement à un médiateur de la consommation :
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
            <span className="font-semibold text-slate-900 block">CNPM Médiation Consommation</span>
            <span className="text-slate-600 block">27, avenue de la Libération — 42400 Saint-Chamond</span>
            <a
              href="https://cnpm-mediation-consommation.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 hover:text-teal-900 underline block pt-0.5"
            >
              cnpm-mediation-consommation.eu
            </a>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Plateforme européenne de règlement en ligne des litiges (RLL) :{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-teal-700"
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
        </div>
      </div>

      {/* Bottom navigation links to other mandatory pages */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 text-xs">
        <button
          onClick={() => navigate('/confidentialite')}
          className="text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-4"
        >
          Consulter la Politique de Confidentialité (RGPD) →
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
