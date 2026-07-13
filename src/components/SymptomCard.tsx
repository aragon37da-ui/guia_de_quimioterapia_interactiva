/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Symptom } from '../types';
import { playBeep } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  XCircle, 
  AlertOctagon, 
  Flame, 
  Activity, 
  Scissors, 
  Droplet, 
  Utensils, 
  BookOpen
} from 'lucide-react';

interface SymptomCardProps {
  symptom: Symptom;
  isInitiallyExpanded?: boolean;
  highlightedSymptomId: string | null;
}

export const SymptomCard: React.FC<SymptomCardProps> = ({ 
  symptom, 
  isInitiallyExpanded = false,
  highlightedSymptomId
}) => {
  const [isOpen, setIsOpen] = useState(isInitiallyExpanded);
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Sync accordion expansion when triggered externally
  useEffect(() => {
    if (highlightedSymptomId === symptom.id) {
      setIsOpen(true);
      setIsHighlighted(true);
      
      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [highlightedSymptomId, symptom.id]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    playBeep(nextState ? 320 : 260, 'sine', 0.08);
  };

  // Icon mapping
  const getSymptomIcon = () => {
    switch (symptom.id) {
      case 'neutropenia':
        return <Flame className="w-6 h-6 text-rose-500 animate-pulse" />;
      case 'mucositis':
        return <Activity className="w-6 h-6 text-teal-600" />;
      case 'nauseas':
        return <Utensils className="w-6 h-6 text-teal-600" />;
      case 'alopecia':
        return <Scissors className="w-6 h-6 text-teal-600" />;
      case 'cansancio':
        return <BookOpen className="w-6 h-6 text-teal-600" />;
      case 'diarrea':
        return <Droplet className="w-6 h-6 text-teal-600" />;
      default:
        return <Activity className="w-6 h-6 text-teal-600" />;
    }
  };

  // Color mapping for badge & card highlights
  const getBadgeClass = () => {
    switch (symptom.riskLevel) {
      case 'critical':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'moderate':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'comfort':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'aesthetic':
        return 'bg-violet-100 text-violet-800 border-violet-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div 
      id={`card-${symptom.id}`}
      className={`bg-white rounded-3xl shadow-lg border overflow-hidden smooth-transition hover:shadow-2xl hover:-translate-y-0.5 ${
        isHighlighted 
          ? 'ring-4 ring-teal-500 scale-[1.02] border-teal-500' 
          : 'border-slate-100'
      }`}
    >
      {/* Card Header */}
      <div className="p-6 bg-slate-50 border-b border-slate-100/80 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center">
            {getSymptomIcon()}
          </span>
          <h4 className="font-extrabold text-slate-900 text-lg leading-tight">
            {symptom.name}
          </h4>
        </div>
        <span className={`text-[11px] font-black px-2.5 py-1 rounded-full uppercase border shrink-0 ${getBadgeClass()}`}>
          {symptom.riskLabel}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <p className="text-slate-700 text-sm font-semibold leading-relaxed mb-3">
          {symptom.briefDescription}
        </p>

        {symptom.imageUrl && (
          <div className="card-image-container mb-4 border border-slate-100 shadow-sm bg-slate-50">
            <img 
              src={symptom.imageUrl} 
              alt={symptom.name} 
              className="transition-transform duration-500 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        
        <p className="text-slate-600 text-xs leading-relaxed mb-5 bg-slate-50/50 p-3 rounded-xl border border-slate-100 whitespace-pre-line">
          {symptom.fullDescription}
        </p>

        {symptom.additionalNotes && symptom.additionalNotes.length > 0 && (
          <div className="mb-5 space-y-2">
            {symptom.additionalNotes.map((note, index) => (
              <div key={index} className="p-3 bg-teal-50/60 border border-teal-100 rounded-xl text-xs text-teal-900">
                <span className="font-bold block mb-0.5 uppercase tracking-wide text-[10px] text-teal-800">Nota Clínica Relevante</span>
                {note}
              </div>
            ))}
          </div>
        )}

        {/* Toggle recommendations trigger */}
        <button 
          id={`btn-toggle-rec-${symptom.id}`}
          onClick={handleToggle} 
          className="w-full py-3 bg-teal-50 hover:bg-teal-100/80 text-teal-950 rounded-2xl font-bold text-xs flex justify-center items-center gap-2 smooth-transition select-none active:scale-99"
        >
          <span>{isOpen ? 'Ocultar Recomendaciones' : 'Ver Recomendaciones de Cuidado'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-teal-800" /> : <ChevronDown className="w-3.5 h-3.5 text-teal-800" />}
        </button>

        {/* Expandable Accordion with Framer Motion */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-slate-100 space-y-4">
                
                {/* Critical warning if present */}
                {symptom.recommendations.warnings && symptom.recommendations.warnings.map((warn, i) => (
                  <div key={i} className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-950 flex gap-3 shadow-sm">
                    <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 animate-pulse" />
                    <div>
                      <span className="font-extrabold block uppercase tracking-wider text-[10px] text-rose-700 mb-1">
                        Advertencia de Emergencia
                      </span>
                      <span>{warn}</span>
                    </div>
                  </div>
                ))}

                {/* Recommendations Title */}
                <h5 className="font-extrabold text-xs uppercase tracking-wider text-teal-900 flex items-center gap-1.5 mb-1">
                  <span>{symptom.recommendations.title}</span>
                </h5>

                {/* Checklist of Dos */}
                <ul className="space-y-2.5 text-xs text-slate-600">
                  {symptom.recommendations.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Checklist of Don'ts / Avoids */}
                {symptom.recommendations.avoidItems && symptom.recommendations.avoidItems.length > 0 && (
                  <div className="pt-3 border-t border-slate-100/50">
                    <h6 className="font-extrabold text-xs uppercase tracking-wider text-rose-900 flex items-center gap-1.5 mb-2">
                      <span>Restricciones y Elementos a Evitar</span>
                    </h6>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {symptom.recommendations.avoidItems.map((avoidItem, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium text-slate-700">{avoidItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
