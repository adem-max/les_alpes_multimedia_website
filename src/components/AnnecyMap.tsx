import React, { useState } from 'react';
import { MapPin, Navigation, Check, Clock, Car, ExternalLink, Layers, Sparkles, Building2 } from 'lucide-react';
import { INTERVENTION_COMMUNES } from '../config/siteConfig';

const BUSINESS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d583.6347531790844!2d6.107156120243558!3d45.906303194652416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b852e993cd721%3A0xe6f58a9e8412ca0f!2sLes%20alpes%20multiservices!5e0!3m2!1sen!2sdz!4v1790188022505!5m2!1sen!2sdz';

const BUSINESS_EXTERNAL_URL =
  'https://www.google.com/maps/place/Les+alpes+multiservices/@45.9063032,6.1071561,19z/data=!4m6!3m5!1s0x478b852e993cd721:0xe6f58a9e8412ca0f!8m2!3d45.9063032!4d6.1071561!16s%2Fg%2F11y1_9y8k7';

export const AnnecyMap: React.FC = () => {
  // 'business' is default to point to the exact business location provided
  const [selectedTarget, setSelectedTarget] = useState<string>('business');
  const [mapMode, setMapMode] = useState<'google' | 'zone'>('google');

  const isBusinessSelected = selectedTarget === 'business';

  // Compute map URL: exact business place embed or selected commune
  const googleMapsUrl = isBusinessSelected
    ? BUSINESS_EMBED_URL
    : `https://maps.google.com/maps?q=${encodeURIComponent(`${selectedTarget}, Haute-Savoie, France`)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  const externalDirectionsUrl = isBusinessSelected
    ? BUSINESS_EXTERNAL_URL
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedTarget}, Haute-Savoie, France`)}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-medium border border-teal-500/30">
              <Navigation className="w-3.5 h-3.5" />
              <span>Rayon de déplacement : ~20 km autour d&apos;Annecy</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs border border-slate-700">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <span>Google Maps™ • Fiche officielle</span>
            </span>
          </div>

          <h3 className="text-xl font-bold font-serif text-white">
            Localisation & Bassin d&apos;intervention Annecy & Lac
          </h3>
          <p className="text-sm text-slate-300 mt-0.5">
            4 rue des Tisserands, 74960 Annecy (Cran-Gevrier) • Déplacements sans surcoût sur la première couronne.
          </p>
        </div>

        {/* View toggles & info pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex p-1 rounded-xl bg-slate-950/70 border border-slate-700 text-xs">
            <button
              onClick={() => setMapMode('google')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                mapMode === 'google'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </button>
            <button
              onClick={() => setMapMode('zone')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                mapMode === 'zone'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Vue Périmètre</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Car className="w-4 h-4 text-teal-400" />
              <span>Véhiculé & ponctuel</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Intervention 8h - 19h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Map Display Column */}
        <div className="lg:col-span-7 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 relative min-h-[440px] flex flex-col">
          {mapMode === 'google' ? (
            /* Interactive Google Maps Embed with Exact Business Location */
            <div className="relative w-full h-full min-h-[440px] flex-1 flex flex-col">
              <iframe
                title={
                  isBusinessSelected
                    ? 'Localisation exacte de Les Alpes Multiservices sur Google Maps'
                    : `Carte Google Maps - ${selectedTarget}`
                }
                src={googleMapsUrl}
                className="w-full h-full min-h-[440px] border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />

              {/* Float badge displaying currently selected sector */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-md flex items-center gap-2 text-xs font-semibold text-slate-800 pointer-events-none max-w-[90%]">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                <div className="truncate">
                  <span className="block text-[10px] text-slate-500 uppercase font-medium">
                    {isBusinessSelected ? 'Entreprise locale' : 'Secteur sélectionné'}
                  </span>
                  <span className="text-slate-900 font-bold truncate">
                    {isBusinessSelected ? 'Les Alpes Multiservices (Annecy)' : selectedTarget}
                  </span>
                </div>
              </div>

              {/* Direct external Google Maps link banner */}
              <div className="bg-slate-100/95 backdrop-blur-xs border-t border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600 gap-2">
                <span className="truncate">
                  {isBusinessSelected
                    ? '4 rue des Tisserands, 74960 Annecy • Coordonnées : 45.9063, 6.1075'
                    : 'Cliquez sur « Localiser le siège » pour revenir à l’adresse principale.'}
                </span>
                <a
                  href={externalDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-teal-700 hover:text-teal-800 transition-colors shrink-0"
                >
                  <span>Ouvrir dans Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            /* Vector Coverage Radius Visual */
            <div className="w-full h-full p-6 flex flex-col items-center justify-center relative min-h-[440px]">
              <div className="w-full max-w-md relative">
                <svg
                  viewBox="0 0 500 440"
                  className="w-full h-auto drop-shadow-sm select-none"
                  aria-label="Carte stylisée de la zone d'intervention autour du Lac d'Annecy"
                >
                  <path
                    d="M 50,70 Q 150,20 250,60 T 450,40 L 490,120 L 10,120 Z"
                    fill="#e2e8f0"
                    opacity="0.5"
                  />
                  <path
                    d="M 350,120 Q 420,180 480,260 L 480,420 L 320,420 Z"
                    fill="#f1f5f9"
                    opacity="0.8"
                  />

                  <defs>
                    <linearGradient id="lakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#0284c7" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
                    </linearGradient>
                    <radialGradient id="coverageRadius" cx="45%" cy="30%" r="50%">
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.15" />
                      <stop offset="60%" stopColor="#14b8a6" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <circle cx="210" cy="150" r="160" fill="url(#coverageRadius)" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="210" cy="150" r="80" fill="none" stroke="#0d9488" strokeWidth="1" strokeOpacity="0.4" />

                  <path
                    d="M 230,165 
                       C 260,170 280,200 275,240 
                       C 270,270 285,310 270,350 
                       C 255,380 240,410 230,415 
                       C 220,415 220,380 225,350 
                       C 230,310 215,270 210,230 
                       C 205,195 210,170 230,165 Z"
                    fill="url(#lakeGradient)"
                    stroke="#0284c7"
                    strokeWidth="1.5"
                  />

                  <text x="252" y="270" fill="#ffffff" fontSize="11" fontWeight="600" letterSpacing="1" transform="rotate(75 252 270)">
                    LAC D&apos;ANNECY
                  </text>

                  {/* Cran-Gevrier Siège marker */}
                  <g className="cursor-pointer group" onClick={() => { setSelectedTarget('business'); setMapMode('google'); }}>
                    <circle cx="160" cy="145" r="9" fill="#0f766e" stroke="#ffffff" strokeWidth="2" className="group-hover:scale-125 transition-transform" />
                    <text x="75" y="150" fill="#0f766e" fontSize="11" fontWeight="bold">
                      ★ Siège (Cran-Gevrier)
                    </text>
                  </g>

                  <g className="cursor-pointer group" onClick={() => { setSelectedTarget('Annecy'); setMapMode('google'); }}>
                    <circle cx="210" cy="140" r="7" fill="#0f766e" />
                    <text x="175" y="130" fill="#0f172a" fontSize="10" fontWeight="bold">
                      Annecy Centre
                    </text>
                  </g>
                  <g className="cursor-pointer group" onClick={() => { setSelectedTarget('Annecy-le-Vieux'); setMapMode('google'); }}>
                    <circle cx="260" cy="130" r="6" fill="#0f766e" />
                    <text x="272" y="134" fill="#1e293b" fontSize="10" fontWeight="600">
                      Annecy-le-Vieux
                    </text>
                  </g>
                  <g className="cursor-pointer group" onClick={() => { setSelectedTarget('Veyrier-du-Lac'); setMapMode('google'); }}>
                    <circle cx="290" cy="190" r="6" fill="#0f766e" />
                    <text x="302" y="194" fill="#1e293b" fontSize="10" fontWeight="600">
                      Veyrier-du-Lac
                    </text>
                  </g>
                  <g className="cursor-pointer group" onClick={() => { setSelectedTarget('Sévrier'); setMapMode('google'); }}>
                    <circle cx="195" cy="230" r="6" fill="#0f766e" />
                    <text x="145" y="234" fill="#1e293b" fontSize="10" fontWeight="600">
                      Sévrier
                    </text>
                  </g>
                </svg>

                <div className="text-center text-xs text-slate-500 mt-2">
                  Périmètre d&apos;intervention garanti sans surcoût kilométrique.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* List of communes & sector selector */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-white">
          <div>
            {/* Top Primary Button: Exact Business Headquarters */}
            <div className="mb-4">
              <button
                onClick={() => {
                  setSelectedTarget('business');
                  setMapMode('google');
                }}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isBusinessSelected
                    ? 'border-teal-600 bg-teal-50/90 text-teal-950 ring-2 ring-teal-600/20 shadow-sm'
                    : 'border-slate-200 hover:border-teal-500 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isBusinessSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs uppercase tracking-wide text-teal-800">
                        Siège de l&apos;entreprise
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 font-mono">
                        Repère exact
                      </span>
                    </div>
                    <span className="block font-semibold text-slate-900 text-sm">
                      Les Alpes Multiservices
                    </span>
                    <span className="text-xs text-slate-500 block">
                      4 rue des Tisserands, Cran-Gevrier, 74960 Annecy
                    </span>
                  </div>
                </div>
                {isBusinessSelected && <Check className="w-4 h-4 text-teal-600 shrink-0" />}
              </button>
            </div>

            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Secteurs & communes d&apos;intervention (74)
              </h4>
              <span className="text-[11px] text-teal-700 font-medium">
                {INTERVENTION_COMMUNES.length} zones
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs max-h-[220px] overflow-y-auto pr-1">
              {INTERVENTION_COMMUNES.map((com) => {
                const isSelected = selectedTarget === com.name;
                return (
                  <button
                    key={com.name}
                    onClick={() => {
                      setSelectedTarget(com.name);
                      setMapMode('google');
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/80 text-teal-950 font-semibold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <span className="block truncate max-w-[120px]">{com.name}</span>
                      <span className="text-[10px] text-slate-500">{com.postalCode}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-slate-900">
                    Intervention directe sur place
                  </h5>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Déplacements quotidiens avec matériel professionnel sur Annecy et toutes les communes du tour du lac.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={externalDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>
                {isBusinessSelected
                  ? 'Voir la fiche Les Alpes Multiservices sur Google Maps'
                  : `Ouvrir ${selectedTarget} dans Google Maps`}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
