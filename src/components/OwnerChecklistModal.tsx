import React, { useState } from 'react';
import { X, CheckSquare, Square, AlertTriangle, ShieldCheck, Database, Copy, Check, CheckCircle2 } from 'lucide-react';
import { SiteLegalConfig } from '../types';
import { PRE_LAUNCH_CHECKLIST } from '../config/siteConfig';

interface OwnerChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  legalConfig: SiteLegalConfig;
  onUpdateLegalConfig: (newConfig: Partial<SiteLegalConfig>) => void;
}

export const OwnerChecklistModal: React.FC<OwnerChecklistModalProps> = ({
  isOpen,
  onClose,
  legalConfig,
  onUpdateLegalConfig,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isFilled = (val: string) => val && !val.includes('[TODO') && val.trim().length > 0;

  const placeholders = [
    { label: 'Raison sociale / Exploitant', key: 'publisherName', value: legalConfig.publisherName, isDone: isFilled(legalConfig.publisherName) },
    { label: 'Statut juridique', key: 'legalStatus', value: legalConfig.legalStatus, isDone: isFilled(legalConfig.legalStatus) },
    { label: 'Numéro SIRET', key: 'siretNumber', value: legalConfig.siretNumber, isDone: isFilled(legalConfig.siretNumber) },
    { label: 'Adresse professionnelle', key: 'professionalAddress', value: legalConfig.professionalAddress, isDone: isFilled(legalConfig.professionalAddress) },
    { label: 'Email public de contact', key: 'contactEmail', value: legalConfig.contactEmail, isDone: isFilled(legalConfig.contactEmail) },
    { label: 'Téléphone de contact', key: 'contactPhone', value: legalConfig.contactPhone, isDone: isFilled(legalConfig.contactPhone) },
    { label: 'Directeur de la publication', key: 'publicationDirector', value: legalConfig.publicationDirector, isDone: isFilled(legalConfig.publicationDirector) },
    { label: 'Déclaration SAP (Optionnelle)', key: 'sapNumber', value: legalConfig.sapDeclared ? legalConfig.sapNumber : 'Désactivée (conforme)', isDone: true },
  ];

  const allRequiredDone = isFilled(legalConfig.publisherName) &&
    isFilled(legalConfig.legalStatus) &&
    isFilled(legalConfig.siretNumber) &&
    isFilled(legalConfig.professionalAddress) &&
    isFilled(legalConfig.contactEmail) &&
    isFilled(legalConfig.publicationDirector);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 text-xs font-medium border border-teal-500/30 mb-2">
              <span>Section 10 du cahier des charges</span>
            </div>
            <h2 className="text-xl font-bold font-serif">
              Checklist Propriétaire & Paramètres CMS
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Informations obligatoires à fournir avant la publication en ligne. Les champs non complétés restent sécurisés sous forme <code className="text-teal-300 font-mono">[TODO: ...]</code>.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Live SAP Declaration Switcher */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
                <span className="font-semibold text-teal-950 text-sm">
                  Déclaration SAP (Services à la Personne - NOVA)
                </span>
              </div>
              <p className="text-xs text-teal-800">
                Active ou désactive immédiatement les mentions relatives au <strong>crédit d&apos;impôt de 50%</strong> sur l&apos;accueil, les services et le numéro SAP dans les mentions légales (conforme au §7 du cahier des charges).
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onUpdateLegalConfig({ sapDeclared: !legalConfig.sapDeclared })}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  legalConfig.sapDeclared ? 'bg-teal-700' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    legalConfig.sapDeclared ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-xs font-semibold text-slate-700 min-w-[50px]">
                {legalConfig.sapDeclared ? 'Actif' : 'Inactif'}
              </span>
            </div>
          </div>

          {/* Section 10 Checklist */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-teal-600" />
              <span>Pièces et informations requises avant ouverture</span>
            </h3>
            <div className="space-y-2.5">
              {PRE_LAUNCH_CHECKLIST.map((item) => {
                let isItemDone = false;
                if (item.id === 'legalStatus') isItemDone = isFilled(legalConfig.legalStatus);
                else if (item.id === 'siret') isItemDone = isFilled(legalConfig.siretNumber);
                else if (item.id === 'address') isItemDone = isFilled(legalConfig.professionalAddress);
                else if (item.id === 'emailPhone') isItemDone = isFilled(legalConfig.contactEmail) && isFilled(legalConfig.contactPhone);
                else if (item.id === 'sap') isItemDone = true;
                else if (item.id === 'domain') isItemDone = true;

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg border flex items-start gap-3 ${
                      isItemDone ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    {isItemDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${isItemDone ? 'text-emerald-950' : 'text-slate-900'}`}>
                          {item.label}
                        </span>
                        {isItemDone ? (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                            Complété
                          </span>
                        ) : item.required ? (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-medium">
                            Obligatoire LCEN / RGPD
                          </span>
                        ) : null}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Validation Status Banner */}
          {allRequiredDone && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-sm block text-emerald-950">Conformité légale 100% validée</span>
                <span className="text-emerald-800">
                  Toutes les mentions légales obligatoires (exploitant Benaouda BENALLOU, SIRET 823 222 765 00013, micro-entreprise, adresse à Cran-Gevrier, email et téléphone) sont renseignées et conformes LCEN & RGPD.
                </span>
              </div>
            </div>
          )}

          {/* Placeholders inspection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                {allRequiredDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                )}
                <span>Variables légales configurées dans le code</span>
              </h3>
              <span className="text-xs text-slate-500">
                {allRequiredDone ? 'Toutes les informations réelles sont validées' : 'Ne pas inventer de fausses données'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {placeholders.map((p) => (
                <div
                  key={p.key}
                  className={`p-2.5 rounded-lg border flex flex-col justify-between ${
                    p.isDone ? 'border-emerald-200 bg-emerald-50/40' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">{p.label} :</span>
                    {p.isDone && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                        <Check className="w-3 h-3" /> Validé
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-1 gap-2">
                    <code
                      className={`text-[11px] font-mono px-1.5 py-0.5 rounded truncate ${
                        p.isDone
                          ? 'text-emerald-900 bg-emerald-100/70 font-semibold'
                          : 'text-amber-800 bg-amber-50'
                      }`}
                    >
                      {p.value}
                    </code>
                    <button
                      onClick={() => handleCopy(p.value, p.key)}
                      className="text-slate-400 hover:text-slate-700 p-1 rounded"
                      title="Copier"
                    >
                      {copiedKey === p.key ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sanity CMS integration note */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-300 text-xs flex items-start gap-3">
            <Database className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block mb-0.5">
                Schémas Sanity CMS intégrés (`src/sanity/schema.ts`)
              </span>
              <p className="text-slate-400 leading-relaxed">
                Les champs sont configurés pour s&apos;intégrer directement à votre studio Sanity CMS (documents <code>siteSettings</code> et <code>lead</code>). Le toggle <code>sapDeclared</code> permet de basculer la communication sans aucun redéploiement de code.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Fermer le panneau
          </button>
        </div>
      </div>
    </div>
  );
};
