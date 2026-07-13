/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { playBeep } from '../utils/audio';
import { 
  HeartPulse, 
  Flame, 
  Utensils, 
  Droplet, 
  AlertTriangle, 
  Check, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface TriajePanelProps {
  onHighlightSymptom: (id: string) => void;
}

export const TriajePanel: React.FC<TriajePanelProps> = ({ onHighlightSymptom }) => {
  const [fiebre, setFiebre] = useState(false);
  const [llagas, setLlagas] = useState(false);
  const [vomito, setVomito] = useState(false);
  const [diarrea, setDiarrea] = useState(false);

  // Trigger evaluation whenever checkboxes change
  const handleCheckboxChange = (
    type: 'fiebre' | 'llagas' | 'vomito' | 'diarrea',
    checked: boolean
  ) => {
    if (type === 'fiebre') {
      setFiebre(checked);
      if (checked) {
        playBeep(290, 'sawtooth', 0.4);
      } else {
        playBeep(350, 'sine', 0.08);
      }
    } else if (type === 'llagas') {
      setLlagas(checked);
      playBeep(checked ? 440 : 350, 'sine', 0.1);
    } else if (type === 'vomito') {
      setVomito(checked);
      playBeep(checked ? 440 : 350, 'sine', 0.1);
    } else if (type === 'diarrea') {
      setDiarrea(checked);
      playBeep(checked ? 440 : 350, 'sine', 0.1);
    }
  };

  // Determine severity
  let severity: 'none' | 'moderate' | 'critical' = 'none';
  if (fiebre) {
    severity = 'critical';
  } else if (llagas || vomito || diarrea) {
    severity = 'moderate';
  }

  // Determine gauge rotation angle
  let rotationAngle = -90; // Left (Green)
  if (severity === 'critical') {
    rotationAngle = 90; // Right (Red)
  } else if (severity === 'moderate') {
    rotationAngle = 0; // Center (Yellow)
  }

  return (
    <section 
      id="triaje-seccion" 
      className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl mb-12 border border-teal-100/50"
    >
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left Hand Checkbox Control Panel */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <span className="text-teal-600 font-extrabold text-xs tracking-wider uppercase mb-1 block">
              Asistente Clínico de Autocuidado
            </span>
            <h2 id="titulo-triaje" className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Triaje de Síntomas Dinámico
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Seleccione activamente los síntomas que experimenta hoy. Nuestro sistema evaluará de forma inmediata el nivel de alerta médica según los parámetros oficiales de oncología.
            </p>
          </div>
          
          <div className="space-y-3.5">
            {/* 1. Fiebre */}
            <label 
              id="label-chk-fiebre"
              className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer border smooth-transition group ${
                fiebre 
                  ? 'bg-rose-50 border-rose-300 shadow-sm' 
                  : 'bg-slate-50/80 border-slate-100 hover:bg-rose-50/50 hover:border-rose-200'
              }`}
            >
              <input 
                type="checkbox" 
                id="chk-fiebre" 
                checked={fiebre}
                onChange={(e) => handleCheckboxChange('fiebre', e.target.checked)}
                className="mt-1 w-5 h-5 accent-rose-600 rounded cursor-pointer transform group-hover:scale-110 smooth-transition"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
                  Fiebre en casa (≥ 38.0 °C)
                </span>
                <span className="text-xs text-slate-500 mt-0.5">
                  Lectura tomada con termómetro axilar o digital. Complicación frecuente.
                </span>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onHighlightSymptom('neutropenia');
                  }}
                  className="text-left text-[11px] text-rose-600 hover:underline font-semibold mt-1"
                >
                  Ver protocolo clínico &rarr;
                </button>
              </div>
            </label>
            
            {/* 2. Llagas */}
            <label 
              id="label-chk-vocal"
              className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer border smooth-transition group ${
                llagas 
                  ? 'bg-amber-50 border-amber-300 shadow-sm' 
                  : 'bg-slate-50/80 border-slate-100 hover:bg-teal-50/40 hover:border-teal-200'
              }`}
            >
              <input 
                type="checkbox" 
                id="chk-vocal" 
                checked={llagas}
                onChange={(e) => handleCheckboxChange('llagas', e.target.checked)}
                className="mt-1 w-5 h-5 accent-teal-600 rounded cursor-pointer transform group-hover:scale-110 smooth-transition"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-teal-600" />
                  Llagas dolorosas en la boca (Mucositis)
                </span>
                <span className="text-xs text-slate-500 mt-0.5">
                  Enrojecimiento, ardor o dolor al comer alimentos.
                </span>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onHighlightSymptom('mucositis');
                  }}
                  className="text-left text-[11px] text-teal-700 hover:underline font-semibold mt-1"
                >
                  Ver recomendaciones bucales &rarr;
                </button>
              </div>
            </label>
            
            {/* 3. Vomito */}
            <label 
              id="label-chk-vomito"
              className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer border smooth-transition group ${
                vomito 
                  ? 'bg-amber-50 border-amber-300 shadow-sm' 
                  : 'bg-slate-50/80 border-slate-100 hover:bg-teal-50/40 hover:border-teal-200'
              }`}
            >
              <input 
                type="checkbox" 
                id="chk-vomito" 
                checked={vomito}
                onChange={(e) => handleCheckboxChange('vomito', e.target.checked)}
                className="mt-1 w-5 h-5 accent-teal-600 rounded cursor-pointer transform group-hover:scale-110 smooth-transition"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-teal-600" />
                  Náuseas o Vómitos recurrentes
                </span>
                <span className="text-xs text-slate-500 mt-0.5">
                  Incapacidad para retener líquidos o sólidos por más de 12 horas.
                </span>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onHighlightSymptom('nauseas');
                  }}
                  className="text-left text-[11px] text-teal-700 hover:underline font-semibold mt-1"
                >
                  Ver pautas de alimentación &rarr;
                </button>
              </div>
            </label>
            
            {/* 4. Diarrea */}
            <label 
              id="label-chk-diarrea"
              className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer border smooth-transition group ${
                diarrea 
                  ? 'bg-amber-50 border-amber-300 shadow-sm' 
                  : 'bg-slate-50/80 border-slate-100 hover:bg-teal-50/40 hover:border-teal-200'
              }`}
            >
              <input 
                type="checkbox" 
                id="chk-diarrea" 
                checked={diarrea}
                onChange={(e) => handleCheckboxChange('diarrea', e.target.checked)}
                className="mt-1 w-5 h-5 accent-teal-600 rounded cursor-pointer transform group-hover:scale-110 smooth-transition"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-teal-600" />
                  Diarrea abundante o líquida
                </span>
                <span className="text-xs text-slate-500 mt-0.5">
                  3 o más evacuaciones líquidas en un mismo día.
                </span>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onHighlightSymptom('diarrea');
                  }}
                  className="text-left text-[11px] text-teal-700 hover:underline font-semibold mt-1"
                >
                  Ver control de hidratación &rarr;
                </button>
              </div>
            </label>
          </div>
        </div>

        {/* Right Hand Live Gauge Dial + Diagnostic Cards */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100/80 rounded-2xl p-6 border border-slate-200/60 shadow-inner relative overflow-hidden">
          
          {/* Gauge Widget */}
          <div className="w-48 h-32 relative flex flex-col justify-center items-center mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 60">
              {/* Background Arc */}
              <path 
                d="M10 50 A40 40 0 0 1 90 50" 
                fill="none" 
                stroke="#e2e8f0" 
                strokeWidth="7" 
                strokeLinecap="round"
              />
              
              {/* Color Arcs: Green - Yellow - Red */}
              <path 
                d="M10 50 A40 40 0 0 1 36.6 20" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="7" 
                strokeLinecap="round"
              />
              <path 
                d="M36.6 20 A40 40 0 0 1 63.3 20" 
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="7" 
                strokeLinecap="round"
              />
              <path 
                d="M63.3 20 A40 40 0 0 1 90 50" 
                fill="none" 
                stroke="#ef4444" 
                strokeWidth="7" 
                strokeLinecap="round"
              />
              
              {/* Rotating Indicator Needle */}
              <line 
                id="gauge-needle" 
                x1="50" 
                y1="50" 
                x2="50" 
                y2="15" 
                stroke="#334155" 
                strokeWidth="3.5" 
                strokeLinecap="round"
                style={{
                  transformOrigin: '50px 50px',
                  transform: `rotate(${rotationAngle}deg)`,
                  transition: 'transform 1s cubic-bezier(0.25, 0.8, 0.25, 1.25)'
                }}
              />
              {/* Central Pivot circle */}
              <circle cx="50" cy="50" r="4.5" fill="#334155" />
            </svg>
            
            <div className="absolute bottom-1 text-center">
              {severity === 'none' && (
                <span id="txt-escala-riesgo" className="text-xs font-black tracking-wider text-teal-600 uppercase">
                  Sin Alertas Activas
                </span>
              )}
              {severity === 'moderate' && (
                <span id="txt-escala-riesgo" className="text-xs font-black tracking-wider text-amber-600 uppercase">
                  Alerta Moderada
                </span>
              )}
              {severity === 'critical' && (
                <span id="txt-escala-riesgo" className="text-xs font-black tracking-wider text-rose-600 uppercase animate-pulse">
                  Alerta Crítica
                </span>
              )}
            </div>
          </div>

          {/* Diagnostic Box Output */}
          <div 
            id="diagnostico-box" 
            className="w-full text-center smooth-transition flex flex-col justify-center items-center min-h-[140px]"
          >
            {severity === 'none' && (
              <div className="flex flex-col items-center">
                <HeartPulse className="w-12 h-12 text-teal-500 mb-3 animate-pulse" />
                <h4 className="font-bold text-slate-800 mb-1">En Espera de Selección</h4>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                  Active alguna de las casillas de la izquierda para desplegar el análisis sintomático en tiempo real y guiar sus acciones preventivas.
                </p>
              </div>
            )}

            {severity === 'moderate' && (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-center w-full shadow-sm animate-fade-in">
                <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                <h4 className="font-extrabold text-amber-950 text-sm mb-1">Vigilancia de Síntomas</h4>
                <p className="text-xs text-amber-800 leading-relaxed mb-2">
                  Se detecta:{' '}
                  <strong>
                    {[
                      llagas ? 'Mucositis' : null,
                      vomito ? 'Vómitos/Náuseas' : null,
                      diarrea ? 'Diarrea' : null,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </strong>
                  . Siga con precisión los consejos de hidratación y dietas blandas astringentes descritos en las tarjetas de autocuidado. Comunique la evolución a su oncólogo.
                </p>
                <span className="inline-block text-[9px] bg-amber-500 text-white font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Control de Evolución Proactivo
                </span>
              </div>
            )}

            {severity === 'critical' && (
              <div className="p-4 bg-rose-100 rounded-2xl border border-rose-300 text-center w-full shadow-md animate-pulse">
                <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto mb-2 animate-bounce" />
                <h4 className="font-black text-rose-950 text-base mb-1">CÓDIGO: HORA DORADA</h4>
                <p className="text-xs text-rose-900 leading-normal mb-3">
                  La fiebre en pacientes bajo quimioterapia es un signo de alta urgencia clínica. 
                  <strong> Debe recibir antibióticos en los primeros 60 minutos</strong> de llegada. No se automedique ni espere para ver si disminuye.
                </p>
                <span className="inline-block text-[10px] bg-rose-600 text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
                  Acuda Directo a Urgencias Médicas
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
