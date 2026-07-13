/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { playBeep } from '../utils/audio';
import { MousePointerClick, Heart, ShieldAlert, Sparkles, Flame, Eye } from 'lucide-react';

interface BodyMapProps {
  onHighlightSymptom: (id: string) => void;
}

export const BodyMap: React.FC<BodyMapProps> = ({ onHighlightSymptom }) => {
  const handleHotspotClick = (id: string, frequency: number) => {
    playBeep(frequency, 'triangle', 0.25);
    onHighlightSymptom(id);
  };

  return (
    <section 
      id="mapa-corporal-seccion"
      className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl mb-12 border border-slate-100"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        
        {/* Interactive SVG Anatomical Figure Column */}
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative w-64 h-[420px] bg-white/60 backdrop-blur-md rounded-3xl border border-slate-200/50 p-4 shadow-sm flex items-center justify-center">
            
            {/* Simple Medical SVG Silhouette */}
            <svg 
              className="w-full h-full max-h-[380px] select-none" 
              viewBox="0 0 200 400" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Human Head and Body Silhouette (styled off-gray) */}
              <path 
                d="M100 60 C110 60 115 50 115 40 C115 30 110 20 100 20 C90 20 85 30 85 40 C85 50 90 60 100 60 Z" 
                fill="#cbd5e1" 
              />
              <path 
                d="M100 65 C85 65 75 75 75 90 L70 180 C68 190 75 195 80 195 L85 195 L85 340 C85 350 95 350 95 340 L95 240 L105 240 L105 340 C105 350 115 350 115 340 L115 195 L120 195 C125 195 132 190 130 180 L125 90 C125 75 115 65 100 65 Z" 
                fill="#cbd5e1" 
              />
              
              {/* Hotspot 1: Head (Alopecia) */}
              <circle 
                id="hotspot-head"
                className="cursor-pointer fill-teal-500 stroke-white stroke-[2px] transition-all duration-300 hover:scale-125 hover:fill-teal-600 active:scale-95" 
                cx="100" 
                cy="35" 
                r="8" 
                style={{ transformOrigin: '100px 35px' }}
                onClick={() => handleHotspotClick('alopecia', 440)}
              >
                <title>Dermatológico: Alopecia (Caída de Cabello)</title>
              </circle>
              {/* Pulsing indicator for head */}
              <circle cx="100" cy="35" r="14" fill="none" stroke="rgba(20, 184, 166, 0.4)" strokeWidth="1.5" className="animate-ping pointer-events-none" />

              {/* Hotspot 2: Mouth (Mucositis) */}
              <circle 
                id="hotspot-mouth"
                className="cursor-pointer fill-teal-500 stroke-white stroke-[2px] transition-all duration-300 hover:scale-125 hover:fill-teal-600 active:scale-95" 
                cx="100" 
                cy="52" 
                r="6.5" 
                style={{ transformOrigin: '100px 52px' }}
                onClick={() => handleHotspotClick('mucositis', 494)}
              >
                <title>Cavidad Oral: Mucositis (Llagas)</title>
              </circle>

              {/* Hotspot 3: Heart/Blood (Neutropenia / Fever) */}
              <circle 
                id="hotspot-blood"
                className="cursor-pointer fill-rose-500 stroke-white stroke-[2px] transition-all duration-300 hover:scale-125 hover:fill-rose-600 active:scale-95" 
                cx="100" 
                cy="100" 
                r="10" 
                style={{ transformOrigin: '100px 100px' }}
                onClick={() => handleHotspotClick('neutropenia', 523)}
              >
                <title>Hematológico: Neutropenia y Fiebre Crítica</title>
              </circle>
              <circle cx="100" cy="100" r="18" fill="none" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1.5" className="animate-ping pointer-events-none" />

              {/* Hotspot 4: Stomach (Náuseas / Vómitos / Diarrea) */}
              <circle 
                id="hotspot-stomach"
                className="cursor-pointer fill-teal-500 stroke-white stroke-[2px] transition-all duration-300 hover:scale-125 hover:fill-teal-600 active:scale-95" 
                cx="100" 
                cy="140" 
                r="8.5" 
                style={{ transformOrigin: '100px 140px' }}
                onClick={() => handleHotspotClick('nauseas', 587)}
              >
                <title>Aparato Digestivo: Náuseas, Vómitos y Diarrea</title>
              </circle>

              {/* Hotspot 5: Body/Battery (Fatiga / Cansancio) */}
              <circle 
                id="hotspot-fatigue"
                className="cursor-pointer fill-teal-500 stroke-white stroke-[2px] transition-all duration-300 hover:scale-125 hover:fill-teal-600 active:scale-95" 
                cx="120" 
                cy="220" 
                r="8" 
                style={{ transformOrigin: '120px 220px' }}
                onClick={() => handleHotspotClick('cansancio', 659)}
              >
                <title>Sistémico: Cansancio y Fatiga Oncológica</title>
              </circle>
            </svg>

            {/* Instruction Badge */}
            <span className="absolute top-4 left-4 bg-teal-50 border border-teal-200 text-teal-800 text-[10px] px-2.5 py-1 rounded-md font-extrabold uppercase shadow-sm flex items-center gap-1">
              <MousePointerClick className="w-3 h-3 text-teal-600 animate-bounce" />
              Pulsa Zonas
            </span>
          </div>
        </div>

        {/* Informative Grid Columns */}
        <div className="w-full md:w-2/3 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs bg-teal-100/80 text-teal-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-teal-200/50">
            <Eye className="w-3.5 h-3.5" />
            Explorador Clínico Visual
          </span>
          <h3 id="titulo-mapa-corporal" className="text-2xl font-black text-slate-900 tracking-tight">
            Mapeo del Cuerpo y Síntomas
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Interactúe directamente con el avatar médico pulsando sobre los puntos de calor anatómicos. Al hacerlo, la interfaz enfocará de forma inmediata el desglose clínico y las recomendaciones de cuidado de la sección correspondiente para evitar búsquedas lentas en momentos de estrés.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            <button 
              id="btn-hotspot-neutropenia"
              onClick={() => handleHotspotClick('neutropenia', 523)} 
              className="p-3 text-left bg-white hover:bg-rose-50/70 rounded-xl border border-slate-200 hover:border-rose-300 text-xs font-bold text-slate-700 flex items-center gap-2.5 smooth-transition shadow-sm hover:shadow active:scale-98"
            >
              <span className="w-3 h-3 bg-rose-500 rounded-full shrink-0 animate-pulse"></span>
              <span>Hematológico: Neutropenia y Fiebre</span>
            </button>
            <button 
              id="btn-hotspot-mucositis"
              onClick={() => handleHotspotClick('mucositis', 494)} 
              className="p-3 text-left bg-white hover:bg-teal-50/70 rounded-xl border border-slate-200 hover:border-teal-300 text-xs font-bold text-slate-700 flex items-center gap-2.5 smooth-transition shadow-sm hover:shadow active:scale-98"
            >
              <span className="w-3 h-3 bg-teal-500 rounded-full shrink-0"></span>
              <span>Cavidad Oral: Mucositis</span>
            </button>
            <button 
              id="btn-hotspot-nauseas"
              onClick={() => handleHotspotClick('nauseas', 587)} 
              className="p-3 text-left bg-white hover:bg-teal-50/70 rounded-xl border border-slate-200 hover:border-teal-300 text-xs font-bold text-slate-700 flex items-center gap-2.5 smooth-transition shadow-sm hover:shadow active:scale-98"
            >
              <span className="w-3 h-3 bg-teal-500 rounded-full shrink-0"></span>
              <span>Aparato Digestivo: Náuseas / Vómitos</span>
            </button>
            <button 
              id="btn-hotspot-diarrea"
              onClick={() => handleHotspotClick('diarrea', 587)} 
              className="p-3 text-left bg-white hover:bg-teal-50/70 rounded-xl border border-slate-200 hover:border-teal-300 text-xs font-bold text-slate-700 flex items-center gap-2.5 smooth-transition shadow-sm hover:shadow active:scale-98"
            >
              <span className="w-3 h-3 bg-teal-500 rounded-full shrink-0"></span>
              <span>Aparato Digestivo: Diarrea</span>
            </button>
            <button 
              id="btn-hotspot-alopecia"
              onClick={() => handleHotspotClick('alopecia', 440)} 
              className="p-3 text-left bg-white hover:bg-teal-50/70 rounded-xl border border-slate-200 hover:border-teal-300 text-xs font-bold text-slate-700 flex items-center gap-2.5 smooth-transition shadow-sm hover:shadow active:scale-98"
            >
              <span className="w-3 h-3 bg-teal-500 rounded-full shrink-0"></span>
              <span>Dermatológico: Alopecia</span>
            </button>
            <button 
              id="btn-hotspot-cansancio"
              onClick={() => handleHotspotClick('cansancio', 659)} 
              className="p-3 text-left bg-white hover:bg-teal-50/70 rounded-xl border border-slate-200 hover:border-teal-300 text-xs font-bold text-slate-700 flex items-center gap-2.5 smooth-transition shadow-sm hover:shadow active:scale-98"
            >
              <span className="w-3 h-3 bg-teal-500 rounded-full shrink-0"></span>
              <span>Sistémico: Cansancio y Fatiga</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
