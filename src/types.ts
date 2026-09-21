export type PageRoute = 
  | '/'
  | '/services'
  | '/a-propos'
  | '/contact'
  | '/mentions-legales'
  | '/confidentialite'
  | '/cgv';

export type ServiceType = 
  | 'menage-regulier'
  | 'menage-ponctuel'
  | 'grand-nettoyage'
  | 'etat-des-lieux'
  | 'autre';

export interface SiteLegalConfig {
  publisherName: string;
  legalStatus: string;
  siretNumber: string;
  professionalAddress: string;
  contactEmail: string;
  contactPhone: string;
  publicationDirector: string;
  hostName: string;
  hostAddress: string;
  hostUrl: string;
  sapDeclared: boolean;
  sapNumber: string;
}

export interface QuoteFormState {
  fullName: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  frequency: string;
  surfaceApprox: string;
  addressOrCity: string;
  message: string;
  earlyStartRequested: boolean;
  honeypot: string; // Anti-spam trap
}

export interface CommuneZone {
  name: string;
  postalCode: string;
  sector: 'Centre & Lac' | 'Bassin Ouest' | 'Bassin Nord / Est' | 'Rives du Lac';
  highlight?: boolean;
}
