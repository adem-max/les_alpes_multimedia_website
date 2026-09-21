import { SiteLegalConfig, CommuneZone } from '../types';

export const INITIAL_LEGAL_CONFIG: SiteLegalConfig = {
  publisherName: 'Benaouda BENALLOU (EI)',
  legalStatus: 'Micro-entreprise (Entreprise Individuelle - EI)',
  siretNumber: '823 222 765 00013',
  professionalAddress: '4 rue des Tisserands, Cran-Gevrier, 74960 Annecy',
  contactEmail: 'alpesmultiservices@icloud.com',
  contactPhone: '+33 7 67 57 56 59',
  publicationDirector: 'Benaouda BENALLOU',
  hostName: 'Cloudflare Pages (Cloudflare, Inc.)',
  hostAddress: '101 Townsend St, San Francisco, CA 94107, USA',
  hostUrl: 'https://pages.cloudflare.com',
  sapDeclared: false, // Strict compliance: false by default, no unverified tax credit claims
  sapNumber: '',
};

export const INTERVENTION_COMMUNES: CommuneZone[] = [
  { name: 'Annecy (Centre, Vieille Ville)', postalCode: '74000', sector: 'Centre & Lac', highlight: true },
  { name: 'Annecy-le-Vieux', postalCode: '74940', sector: 'Centre & Lac', highlight: true },
  { name: 'Cran-Gevrier', postalCode: '74960', sector: 'Bassin Ouest' },
  { name: 'Seynod', postalCode: '74600', sector: 'Bassin Ouest', highlight: true },
  { name: 'Meythet', postalCode: '74960', sector: 'Bassin Ouest' },
  { name: 'Pringy', postalCode: '74370', sector: 'Bassin Nord / Est' },
  { name: 'Epagny Metz-Tessy', postalCode: '74370', sector: 'Bassin Nord / Est', highlight: true },
  { name: 'Poisy', postalCode: '74330', sector: 'Bassin Ouest' },
  { name: 'Veyrier-du-Lac', postalCode: '74290', sector: 'Rives du Lac', highlight: true },
  { name: 'Menthon-Saint-Bernard', postalCode: '74290', sector: 'Rives du Lac' },
  { name: 'Sévrier', postalCode: '74320', sector: 'Rives du Lac', highlight: true },
  { name: 'Saint-Jorioz', postalCode: '74410', sector: 'Rives du Lac' },
  { name: 'Villaz', postalCode: '74370', sector: 'Bassin Nord / Est' },
  { name: 'Argonay', postalCode: '74370', sector: 'Bassin Nord / Est' },
];
