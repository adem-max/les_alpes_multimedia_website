import React, { useState } from 'react';
import { PageRoute, SiteLegalConfig } from '../types';
import { FileText, Copy, Check, AlertCircle, ShieldAlert, CheckCircle2, ChevronRight, CornerDownRight } from 'lucide-react';

interface CgvPageProps {
  navigate: (path: PageRoute) => void;
  legalConfig: SiteLegalConfig;
}

export const CgvPage: React.FC<CgvPageProps> = ({
  navigate,
  legalConfig,
}) => {
  const [copiedForm, setCopiedForm] = useState(false);

  const withdrawalFormTemplate = `FORMULAIRE DE RÉTRACTATION (CONTRAT À DISTANCE)
(À adresser par lettre recommandée ou par courrier électronique uniquement si vous souhaitez vous rétracter de votre commande de prestation de services)

À l'attention de :
${legalConfig.publisherName}
Les Alpes Multiservices
Adresse : ${legalConfig.professionalAddress}
Courriel : ${legalConfig.contactEmail}

Je / Nous vous notifie / notifions par la présente ma / notre rétractation du contrat portant sur la prestation de services de ménage à domicile ci-dessous :

- Devis n° / Référence : ...........................................................
- Date d'acceptation du devis / de commande : .................................
- Nom du client : ................................................................
- Adresse du client : .............................................................
- Adresse du lieu d'intervention (si différente) : ...............................

Date : ..........................................
Signature du client (uniquement en cas de notification sur papier) :`;

  const handleCopyForm = () => {
    navigator.clipboard.writeText(withdrawalFormTemplate);
    setCopiedForm(true);
    setTimeout(() => setCopiedForm(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5 text-teal-600" />
          <span>Code de la Consommation (Contrats conclus à distance et hors établissement)</span>
        </div>
        <h1 className="text-3xl font-bold font-serif text-slate-900">
          Conditions Générales de Vente et de Prestations de Services (CGV)
        </h1>
        <p className="text-sm text-slate-500">
          Applicables aux prestations de ménage à domicile commandées auprès de Les Alpes Multiservices.
        </p>
      </div>

      {/* Warning Box */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1 leading-relaxed">
        <span className="font-semibold text-slate-900 block">Champ d&apos;application :</span>
        Les présentes conditions régissent l&apos;ensemble des relations contractuelles entre <strong>{legalConfig.publisherName}</strong> (exploitant sous l&apos;enseigne commerciale <em>Les Alpes Multiservices</em>) et toute personne physique non professionnelle (le « Client ») passant commande d&apos;une prestation de nettoyage ou d&apos;entretien ménager à domicile.
      </div>

      {/* CGV Sections */}
      <div className="space-y-8 text-xs text-slate-700 leading-relaxed">
        {/* Article 1: Nature des prestations & Modalités de devis */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800">
            Article 1 — Prestations proposées et formation du contrat
          </h2>
          <p>
            Les Alpes Multiservices propose des prestations d&apos;entretien et d&apos;aide ménagère au domicile des particuliers résidant sur la commune d&apos;Annecy et son bassin limitrophe :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-800">
            <li>Ménage courant récurrent (hebdomadaire ou bimensuel)</li>
            <li>Nettoyages approfondis ou saisonniers (printemps, rentrée)</li>
            <li>Nettoyage ponctuel de fin de bail / état des lieux de sortie</li>
            <li>Entretien de la vitrerie et des baies vitrées</li>
            <li>Prestations complémentaires de repassage à domicile</li>
          </ul>
          <p className="pt-1">
            <strong>Processus de commande :</strong> Toute prestation donne lieu à l&apos;émission préalable d&apos;un devis gratuit et personnalisé, établi sur la base des informations transmises via le formulaire en ligne ou lors d&apos;une visite d&apos;évaluation préalable. Le contrat est réputé définitivement formé dès la signature du devis (électronique ou manuscrite) par le Client et confirmation de planification par Les Alpes Multiservices.
          </p>
        </div>

        {/* Article 2: Tarifs & Modalités de facturation */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800">
            Article 2 — Tarifs et modalités de règlement
          </h2>
          <p>
            Les prix des prestations sont exprimés en euros nets (TVA non applicable, article 293 B du Code général des impôts sous le régime de la micro-entreprise). Ils sont fermes et précisés sur chaque devis personnalisé avant validation.
          </p>
          <p>
            Le règlement s&apos;effectue à réception de facture, par virement bancaire, chèque ou prélèvement bancaire convenu entre les parties. Aucun paiement en ligne direct par carte bancaire n&apos;est recueilli sur le site vitrine.
          </p>
          {legalConfig.sapDeclared && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
              <strong>Avantage fiscal (SAP) :</strong> Si l&apos;entreprise est déclarée Services à la Personne (n° {legalConfig.sapNumber}), une attestation fiscale annuelle est remise au Client au plus tard le 31 mars de l&apos;année suivante afin de lui permettre de faire valoir son crédit d&apos;impôt de 50% sur sa déclaration fiscale (art. 199 sexdecies du CGI).
            </div>
          )}
        </div>

        {/* Article 3: Droit légal de rétractation (14 jours) - MANDATORY §6 */}
        <div className="p-6 rounded-2xl bg-white border-2 border-teal-600/40 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-wider">
            <ShieldAlert className="w-5 h-5 text-teal-700" />
            <span>Article 3 — Droit légal de rétractation de 14 jours</span>
          </div>

          <p>
            Conformément aux dispositions des articles L. 221-18 et suivants du Code de la consommation régissant la vente à distance et hors établissement :
          </p>

          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-teal-950 font-medium text-xs space-y-2">
            <p>
              Le Client dispose d&apos;un délai légal de <strong>quatorze (14) jours francs</strong> pour exercer son droit de rétractation à compter de la date d&apos;acceptation du devis, <strong>sans avoir à justifier de motifs ni à payer de pénalités</strong>.
            </p>
            <p>
              Pour exercer ce droit, le Client doit notifier sa décision de rétractation au moyen d&apos;une déclaration dénuée d&apos;ambiguïté (par exemple, lettre envoyée par la poste ou courrier électronique) adressée à :
            </p>
            <div className="bg-white p-2.5 rounded-lg border border-teal-300 font-mono text-xs">
              Email : {legalConfig.contactEmail} <br />
              Courrier : {legalConfig.publisherName}, {legalConfig.professionalAddress}
            </div>
          </div>

          <p>
            Le Client peut utiliser le modèle de formulaire de rétractation ci-dessous, mais ce n&apos;est pas obligatoire.
          </p>
        </div>

        {/* Formulaire type de rétractation - MANDATORY §6 */}
        <div className="p-6 rounded-2xl bg-slate-900 text-slate-200 space-y-4 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 block">
                Annexe réglementaire (Art. R. 221-1 du Code de la consommation)
              </span>
              <h3 className="text-base font-bold font-serif text-white">
                Modèle de formulaire type de rétractation
              </h3>
            </div>
            <button
              onClick={handleCopyForm}
              className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              {copiedForm ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copié dans le presse-papiers !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier le modèle de formulaire</span>
                </>
              )}
            </button>
          </div>

          <pre className="text-[11px] font-mono whitespace-pre-wrap bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 overflow-x-auto leading-relaxed">
            {withdrawalFormTemplate}
          </pre>
        </div>

        {/* Article 4: Exécution anticipée & Renonciation - MANDATORY §6 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800">
            Article 4 — Demande d&apos;exécution anticipée de la prestation
          </h2>
          <p>
            Si le Client souhaite expressément que la prestation d&apos;entretien ou de ménage débute <strong>avant l&apos;expiration du délai légal de quatorze jours</strong>, il doit en faire la demande expresse et recueillie sur support durable (notamment par la mention ou case à cocher prévue à cet effet sur le devis ou le formulaire de contact).
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs">
            <p>
              Conformément à l&apos;article L. 221-25 du Code de la consommation :
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>
                Si le Client exerce son droit de rétractation d&apos;un contrat de prestation de services dont l&apos;exécution a commencé, à sa demande expresse, avant la fin du délai de rétractation, il verse au professionnel un montant correspondant au service fourni jusqu&apos;à la communication de sa décision de se rétracter.
              </li>
              <li>
                Si la prestation a été <strong>pleinement exécutée</strong> avant l&apos;exercice du droit de rétractation, le droit de rétractation ne peut plus être exercé conformément à l&apos;article L. 221-28 1° du Code de la consommation.
              </li>
            </ul>
          </div>
        </div>

        {/* Article 5: Modalités de remboursement - MANDATORY §6 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800">
            Article 5 — Délais et modalités de remboursement
          </h2>
          <p>
            En cas de rétractation valide du Client, Les Alpes Multiservices remboursera tous les paiements reçus de sa part au titre de la commande concernée.
          </p>
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-semibold text-xs">
            Ce remboursement sera effectué sans retard excessif et, en tout état de cause, au plus tard dans les quatorze (14) jours à compter du jour où Les Alpes Multiservices est informée de la décision du Client de se rétracter du présent contrat.
          </div>
          <p>
            Le remboursement sera effectué en utilisant le même moyen de paiement que celui utilisé par le Client pour la transaction initiale, sauf accord exprès des parties pour un moyen différent, et sans occasionner de frais supplémentaires pour le consommateur.
          </p>
        </div>

        {/* Article 6: Responsabilité & Assurances */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800">
            Article 6 — Responsabilité et assurances professionnelles
          </h2>
          <p>
            Les Alpes Multiservices est titulaire d&apos;une police d&apos;assurance Responsabilité Civile Professionnelle (RC Pro) couvrant l&apos;ensemble des dommages matériels ou corporels accidentels survenant au cours de l&apos;exécution des prestations au domicile du Client.
          </p>
          <p>
            Le Client s&apos;engage à signaler immédiatement et au plus tard dans les 48 heures suivant l&apos;intervention tout incident ou anomalie constatée.
          </p>
        </div>

        {/* Article 7: Médiation de la consommation (Art. L. 612-1 et R. 616-1) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-teal-800">
            Article 7 — Règlement des litiges et médiation de la consommation
          </h2>
          <p>
            En cas de réclamation ou litige, le Client s&apos;adressera en priorité à Les Alpes Multiservices par écrit à <code>{legalConfig.contactEmail}</code> ou par courrier postal pour tenter de trouver une solution amiable.
          </p>
          <p>
            Conformément à l&apos;article L. 612-1 du Code de la consommation, le consommateur a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable du litige l&apos;opposant au professionnel.
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-semibold text-slate-900 block">Médiateur référent : CNPM Médiation Consommation</span>
            <span className="text-slate-600 block">27, avenue de la Libération — 42400 Saint-Chamond</span>
            <p className="text-slate-600 pt-0.5">
              Dépôt de dossier en ligne :{' '}
              <a
                href="https://cnpm-mediation-consommation.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 hover:text-teal-900 underline font-medium"
              >
                https://cnpm-mediation-consommation.eu
              </a>
            </p>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Conformément à l&apos;article 14 du Règlement (UE) n°524/2013, la Commission Européenne met également à disposition une plateforme de Règlement en Ligne des Litiges (RLL) :{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            .
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
          onClick={() => navigate('/confidentialite')}
          className="text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-4"
        >
          Consulter la Politique de Confidentialité (RGPD) →
        </button>
      </div>
    </div>
  );
};
