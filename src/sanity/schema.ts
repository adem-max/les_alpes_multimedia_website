/**
 * Sanity CMS Schema definition for Les Alpes Multiservices
 * Extends the existing Sanity Studio setup on Vercel / Next.js.
 * 
 * Includes the conditional SAP declaration fields:
 * - sapDeclared: boolean
 * - sapNumber: string
 */

export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Paramètres du site & Légal',
  type: 'document',
  fields: [
    {
      name: 'businessName',
      title: 'Nom commercial',
      type: 'string',
      initialValue: 'Les Alpes Multiservices',
    },
    {
      name: 'publisherName',
      title: 'Identité de l\'exploitant / Raison sociale',
      type: 'string',
      description: 'Obligatoire (LCEN art. 1-1, loi SREN) : Nom et prénom ou dénomination sociale',
    },
    {
      name: 'legalStatus',
      title: 'Forme juridique',
      type: 'string',
      description: 'Auto-entrepreneur / Entreprise individuelle / SARL / SAS + capital social',
    },
    {
      name: 'siret',
      title: 'Numéro SIRET',
      type: 'string',
      description: 'Identifiant légal INSEE (14 chiffres)',
    },
    {
      name: 'professionalAddress',
      title: 'Adresse professionnelle / domiciliation',
      type: 'string',
    },
    {
      name: 'contactEmail',
      title: 'Email public de contact',
      type: 'string',
    },
    {
      name: 'contactPhone',
      title: 'Numéro de téléphone (optionnel)',
      type: 'string',
    },
    {
      name: 'publicationDirector',
      title: 'Directeur de la publication',
      type: 'string',
      description: 'Généralement identique à l\'exploitant',
    },
    {
      name: 'sapDeclared',
      title: 'Déclaration SAP (Services à la Personne) validée ?',
      type: 'boolean',
      description: 'Active l\'affichage du crédit d\'impôt de 50% sur le site et le numéro SAP dans les mentions légales.',
      initialValue: false,
    },
    {
      name: 'sapNumber',
      title: 'Numéro de déclaration SAP NOVA',
      type: 'string',
      description: 'Exemple : SAP/XXXXXXXXX (délivré via nova.entreprises.gouv.fr)',
      hidden: ({ parent }: { parent: { sapDeclared?: boolean } }) => !parent?.sapDeclared,
    },
  ],
};

export const leadSchema = {
  name: 'lead',
  title: 'Demandes de devis / Leads',
  type: 'document',
  fields: [
    { name: 'fullName', title: 'Nom complet', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Téléphone', type: 'string' },
    { name: 'serviceType', title: 'Prestation demandée', type: 'string' },
    { name: 'frequency', title: 'Fréquence', type: 'string' },
    { name: 'surfaceApprox', title: 'Superficie approx. (m²)', type: 'string' },
    { name: 'addressOrCity', title: 'Commune / Adresse', type: 'string' },
    { name: 'message', title: 'Message / Précisions', type: 'text' },
    { name: 'earlyStartRequested', title: 'Demande d\'exécution anticipée (renonciation délai 14j)', type: 'boolean' },
    { name: 'createdAt', title: 'Date de réception', type: 'datetime' },
  ],
};
