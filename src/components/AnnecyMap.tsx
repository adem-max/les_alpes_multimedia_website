import React, { useState } from 'react';
import { MapPin, Navigation, Check, Clock, Car } from 'lucide-react';
import { INTERVENTION_COMMUNES } from '../config/siteConfig';

export const AnnecyMap: React.FC = () => {
  const [selectedCommune, setSelectedCommune] = useState<string | null>('Annecy (Centre, Vieille Ville)');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-medium border border-teal-500/30 mb-2">
            <Navigation className="w-3.5 h-3.5" />
            <span>Rayon de déplacement : ~20 km autour d&apos;Annecy</span>
          </div>
          <h3 className="text-xl font-bold font-serif text-white">
            Bassin d&apos;intervention Annecy & Tour du Lac
          </h3>
          <p className="text-sm text-slate-300">
            Aucun frais de déplacement supplémentaire sur les communes de la première couronne.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <Car className="w-4 h-4 text-teal-400" />
            <span>Véhiculé & ponctuel</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Intervention 8h - 19h</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Visual Map Render (SVG - Zero Cookies / Zero Trackers) */}
        <div className="lg:col-span-7 bg-slate-50 p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200 relative min-h-[380px]">
          <div className="w-full max-w-md relative">
            <svg
              viewBox="0 0 500 440"
              className="w-full h-auto drop-shadow-sm select-none"
              aria-label="Carte stylisée de la zone d'intervention autour du Lac d'Annecy"
            >
              {/* Mountainous backdrops */}
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

              {/* Lake Annecy stylized shape */}
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

              {/* Coverage circle centered on Annecy */}
              <circle cx="210" cy="150" r="160" fill="url(#coverageRadius)" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="210" cy="150" r="80" fill="none" stroke="#0d9488" strokeWidth="1" strokeOpacity="0.4" />

              {/* Lake Annecy (Grand Lac & Petit Lac) */}
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

              {/* Stylized Lake label */}
              <text x="252" y="270" fill="#ffffff" fontSize="11" fontWeight="600" letterSpacing="1" transform="rotate(75 252 270)">
                LAC D&apos;ANNECY
              </text>

              {/* Commune Hotspots */}
              {/* 1. Annecy Centre */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedCommune('Annecy (Centre, Vieille Ville)')}
              >
                <circle cx="210" cy="140" r="8" fill="#0f766e" className="group-hover:scale-125 transition-transform" />
                <circle cx="210" cy="140" r="14" fill="#14b8a6" fillOpacity="0.3" className="animate-ping origin-center" />
                <rect x="150" y="105" width="120" height="24" rx="4" fill="#0f172a" />
                <text x="210" y="121" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Annecy Centre
                </text>
              </g>

              {/* 2. Annecy-le-Vieux */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedCommune('Annecy-le-Vieux')}
              >
                <circle cx="260" cy="120" r="6" fill="#0f766e" />
                <rect x="235" y="92" width="105" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <text x="287" y="106" fill="#1e293b" fontSize="10" fontWeight="600" textAnchor="middle">
                  Annecy-le-Vieux
                </text>
              </g>

              {/* 3. Seynod */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedCommune('Seynod')}
              >
                <circle cx="160" cy="190" r="6" fill="#0f766e" />
                <rect x="125" y="198" width="70" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <text x="160" y="212" fill="#1e293b" fontSize="10" fontWeight="600" textAnchor="middle">
                  Seynod
                </text>
              </g>

              {/* 4. Cran-Gevrier */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedCommune('Cran-Gevrier')}
              >
                <circle cx="170" cy="140" r="5" fill="#0f766e" />
                <text x="135" y="135" fill="#334155" fontSize="9" fontWeight="bold">
                  Cran-Gevrier
                </text>
              </g>

              {/* 5. Epagny Metz-Tessy */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedCommune('Epagny Metz-Tessy')}
              >
                <circle cx="150" cy="80" r="5" fill="#0f766e" />
                <rect x="95" y="55" width="115" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <text x="152" y="69" fill="#1e293b" fontSize="10" fontWeight="600" textAnchor="middle">
                  Epagny Metz-Tessy
                </text>
              </g>

              {/* 6. Poisy */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedCommune('Poisy')}
              >
                <circle cx="110" cy="120" r="5" fill="#0f766e" />
                <text x="75" y="123" fill="#334155" fontSize="9" fontWeight="bold">
                  Poisy
                </text>
              </g>

              {/* 7. Veyrier-du-Lac */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedCommune('Veyrier-du-Lac')}
              >
                <circle cx="285" cy="180" r="6" fill="#0f766e" />
                <rect x="275" y="190" width="95" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <text x="322" y="204" fill="#1e293b" fontSize="10" fontWeight="600" textAnchor="middle">
                  Veyrier-du-Lac
                </text>
              </g>

              {/* 8. Sévrier */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedCommune('Sévrier')}
              >
                <circle cx="195" cy="240" r="6" fill="#0f766e" />
                <rect x="135" y="245" width="60" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <text x="165" y="259" fill="#1e293b" fontSize="10" fontWeight="600" textAnchor="middle">
                  Sévrier
                </text>
              </g>

              {/* 9. Menthon-Saint-Bernard */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedCommune('Menthon-Saint-Bernard')}
              >
                <circle cx="300" cy="245" r="5" fill="#0f766e" />
                <text x="312" y="248" fill="#334155" fontSize="9" fontWeight="bold">
                  Menthon-St-Bernard
                </text>
              </g>

              {/* 10. Saint-Jorioz */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedCommune('Saint-Jorioz')}
              >
                <circle cx="205" cy="310" r="5" fill="#0f766e" />
                <text x="140" y="315" fill="#334155" fontSize="9" fontWeight="bold">
                  Saint-Jorioz
                </text>
              </g>
            </svg>

            {/* Privacy stamp */}
            <div className="absolute bottom-2 left-2 text-[10px] text-slate-500 bg-white/90 px-2 py-0.5 rounded border border-slate-200">
              Cartographie vectorielle autonome • 100% respectueux des données (sans API Google)
            </div>
          </div>
        </div>

        {/* List of communes & sector selector */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-white">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Communes desservies en Haute-Savoie (74)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {INTERVENTION_COMMUNES.map((com) => {
                const isSelected = selectedCommune === com.name;
                return (
                  <button
                    key={com.name}
                    onClick={() => setSelectedCommune(com.name)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/70 text-teal-950 font-semibold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <span className="block truncate max-w-[130px]">{com.name}</span>
                      <span className="text-[10px] text-slate-500">{com.postalCode}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-semibold text-slate-900">
                  Votre commune n&apos;apparaît pas dans la liste ?
                </h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Nous nous déplaçons également sur les communes limitrophes du bassin annécien (Groisy, Allonzier-la-Caille, Lovagny...). Précisez votre adresse lors de la demande de devis pour confirmer la faisabilité sans surcoût.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
