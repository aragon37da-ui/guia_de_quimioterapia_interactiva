/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { TriajePanel } from './components/TriajePanel';
import { BodyMap } from './components/BodyMap';
import { SymptomCard } from './components/SymptomCard';
import { EducationalQuiz } from './components/EducationalQuiz';
import { symptomsData } from './data/symptomsData';
import { playBeep } from './utils/audio';
import { 
  HeartPulse, 
  Search, 
  FileText, 
  ShieldAlert, 
  Sparkles, 
  HelpCircle,
  Filter,
  CheckCircle2,
  Stethoscope,
  Info
} from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'moderate' | 'comfort' | 'aesthetic'>('all');
  const [highlightedSymptomId, setHighlightedSymptomId] = useState<string | null>(null);

  // Focus and scroll on selected symptom
  const handleHighlightSymptom = (id: string) => {
    // Reset search and filter to ensure the card is visible
    setSearchTerm('');
    setSelectedFilter('all');
    setHighlightedSymptomId(id);

    // Smooth scroll delay to allow React rendering to update if needed
    setTimeout(() => {
      const element = document.getElementById(`card-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Filter symptoms based on search text and category tags
  const filteredSymptoms = symptomsData.filter(symptom => {
    const matchesSearch = symptom.searchTags.some(tag => 
      tag.toLowerCase().includes(searchTerm.toLowerCase().trim())
    ) || symptom.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) 
      || symptom.briefDescription.toLowerCase().includes(searchTerm.toLowerCase().trim());
    
    const matchesFilter = selectedFilter === 'all' || symptom.riskLevel === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const handleFilterClick = (filter: 'all' | 'critical' | 'moderate' | 'comfort' | 'aesthetic') => {
    setSelectedFilter(filter);
    playBeep(380, 'sine', 0.06);
  };

  return (
    <div id="main-app-container" className="text-slate-800 antialiased overflow-x-hidden relative min-h-screen pb-24">
      {/* 1. Cells Background Particles Canvas */}
      <ParticleCanvas />

      {/* 2. Top Navigation Bar */}
      <nav id="app-navbar" className="glass-card sticky top-0 z-50 px-6 py-4 border-b border-teal-100/40 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => playBeep(523, 'sine', 0.08)}>
          <HeartPulse className="w-6 h-6 text-teal-600 animate-pulse shrink-0" />
          <span className="font-extrabold text-sm md:text-base tracking-tight text-slate-900">
            Cuidado y efectos de la quimioterapia
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-xs font-bold text-slate-600">
          <a href="#triaje-seccion" className="hover:text-teal-600 smooth-transition" onClick={() => playBeep(330, 'sine', 0.05)}>Triaje</a>
          <a href="#mapa-corporal-seccion" className="hover:text-teal-600 smooth-transition" onClick={() => playBeep(330, 'sine', 0.05)}>Mapa Corporal</a>
          <a href="#buscador-seccion" className="hover:text-teal-600 smooth-transition" onClick={() => playBeep(330, 'sine', 0.05)}>Efectos Adversos</a>
          <a href="#cuestionario-seccion" className="hover:text-teal-600 smooth-transition" onClick={() => playBeep(330, 'sine', 0.05)}>Autoevaluación</a>
        </div>
      </nav>

      {/* 3. Main Header Section (Page 2 + Page 1 fusion) */}
      <header id="app-header" className="relative overflow-hidden pt-12 pb-24 px-4 text-center z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-950 text-xs font-bold mb-6 tracking-wide uppercase shadow-sm border border-teal-200 cursor-pointer hover:scale-105 smooth-transition" onClick={() => playBeep(440, 'sine', 0.1)}>
          <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
          Guía Clínica de Soporte e Interactividad Premium
        </div>
        
        <h1 id="app-header-title" className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-4">
          Efectos de la <span className="text-teal-600 relative inline-block">Quimioterapia<span className="absolute bottom-0.5 left-0 w-full h-1.5 bg-teal-200/80 rounded-full"></span></span>
        </h1>
        
        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mt-4">
          La quimioterapia es un tratamiento que usa medicamentos muy fuertes que se encargan de destruir las células enfermas que crecen rápido. Son tan potentes que también afectan a las células buenas del cuerpo.
        </p>
      </header>

      {/* 4. Core Content Area */}
      <main className="max-w-6xl mx-auto px-4 relative z-10 -mt-16">
        
        {/* Dynamic Concept Hero Cards */}
        <section id="heros-conceptos-seccion" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Protocol Card */}
          <div id="card-concepto-hora-dorada" className="glass-card rounded-2xl p-6 shadow-xl border-l-8 border-rose-500 smooth-transition hover:translate-y-[-4px] hover:shadow-2xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 -mt-4 -mr-4 w-24 h-24 bg-rose-100 rounded-full opacity-30 group-hover:scale-150 smooth-transition"></div>
            <div className="flex items-start gap-4 relative z-10">
              <div 
                className="p-3 bg-rose-50 text-rose-500 rounded-xl cursor-pointer hover:bg-rose-100 smooth-transition"
                onClick={() => playBeep(220, 'triangle', 0.35)}
              >
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                  Hora Dorada 
                  <span className="text-[9px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">
                    Urgencia Crítica
                  </span>
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Existe un protocolo internacional clínico: Cuando un niño con cáncer tiene fiebre, sus defensas (glóbulos blancos) suelen estar muy bajas. Esto es una urgencia médica porque su cuerpo no puede defenderse de las infecciones, por lo que debe recibir su primer antibiótico en los primeros 60 minutos desde que cruza la puerta del hospital. Esperar más tiempo pone en grave peligro su vida.
                </p>
              </div>
            </div>
          </div>

          {/* Adverse Effect Definition Card */}
          <div id="card-concepto-efecto-adverso" className="glass-card rounded-2xl p-6 shadow-xl border-l-8 border-teal-500 smooth-transition hover:translate-y-[-4px] hover:shadow-2xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 -mt-4 -mr-4 w-24 h-24 bg-teal-100 rounded-full opacity-30 group-hover:scale-150 smooth-transition"></div>
            <div className="flex items-start gap-4 relative z-10">
              <div 
                className="p-3 bg-teal-50 text-teal-600 rounded-xl cursor-pointer hover:bg-teal-100 smooth-transition"
                onClick={() => playBeep(330, 'sine', 0.15)}
              >
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  ¿Qué es un Efecto Adverso?
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Reacción o resultado nocivo, no deseado e imprevisto que ocurre como consecuencia de un tratamiento oncológico. Identificarlos a tiempo reduce riesgos y evita hospitalizaciones prolongadas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Symptom Triaje Component */}
        <TriajePanel onHighlightSymptom={handleHighlightSymptom} />

        {/* 6. Body Map Component */}
        <BodyMap onHighlightSymptom={handleHighlightSymptom} />

        {/* 7. Search & Categorization Filter Bar */}
        <section id="buscador-seccion" className="mb-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-600" />
                Desglose Clínico de Efectos Adversos
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Utilice el buscador o las pestañas para explorar cuidados de enfermería específicos.
              </p>
            </div>
            
            {/* Real-time search inputs */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input 
                type="text" 
                id="buscador-efectos" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar (mucositis, llagas, alopecia, cansancio)..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-md smooth-transition text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Quick Tags Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-5 border-b border-slate-200/60 pb-4">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filtrar por:
            </span>
            <button 
              id="tag-filtro-all"
              onClick={() => handleFilterClick('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedFilter === 'all' 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Todos los Efectos
            </button>
            <button 
              id="tag-filtro-critical"
              onClick={() => handleFilterClick('critical')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedFilter === 'critical' 
                  ? 'bg-rose-600 text-white shadow-sm' 
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-300'
              }`}
            >
              Riesgo Crítico
            </button>
            <button 
              id="tag-filtro-moderate"
              onClick={() => handleFilterClick('moderate')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedFilter === 'moderate' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200 hover:border-amber-300'
              }`}
            >
              Riesgo Moderado
            </button>
            <button 
              id="tag-filtro-comfort"
              onClick={() => handleFilterClick('comfort')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedFilter === 'comfort' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200 hover:border-blue-300'
              }`}
            >
              Control Físico
            </button>
            <button 
              id="tag-filtro-aesthetic"
              onClick={() => handleFilterClick('aesthetic')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedFilter === 'aesthetic' 
                  ? 'bg-violet-600 text-white shadow-sm' 
                  : 'bg-white text-slate-700 hover:bg-violet-50 border border-slate-200 hover:border-violet-300'
              }`}
            >
              Control Estético
            </button>
          </div>
        </section>

        {/* 8. Grid of Fused Symptom Cards */}
        <div 
          id="contenedor-efectos" 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredSymptoms.map(symptom => (
            <SymptomCard 
              key={symptom.id}
              symptom={symptom}
              highlightedSymptomId={highlightedSymptomId}
            />
          ))}
        </div>

        {/* Empty Fallback Screen */}
        {filteredSymptoms.length === 0 && (
          <div 
            id="sin-resultados" 
            className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm animate-fade-in"
          >
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-bounce" />
            <p className="text-slate-600 font-extrabold text-lg">No encontramos coincidencias</p>
            <p className="text-slate-400 text-xs mt-1 max-w-xs mx-auto">
              Pruebe utilizando términos como "fiebre", "llagas", "estómago", "vómito", "cansancio" o "caída".
            </p>
          </div>
        )}

        {/* 9. Interactive Medical Care Quiz */}
        <EducationalQuiz />

      </main>

      {/* 10. Footer Section */}
      <footer id="app-footer" className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-center mt-24 relative z-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-xs sm:text-sm leading-relaxed">
            Este portal clínico interactivo contiene exclusivamente pautas informativas generales sobre el cuidado del paciente oncológico durante la quimioterapia. No representa, bajo ninguna circunstancia, un diagnóstico clínico ni reemplaza la opinión o el criterio directo de su médico especialista u oncólogo tratante.
          </p>
          <div className="pt-2">
            <span className="text-[10px] text-teal-400 font-extrabold uppercase tracking-widest border border-teal-500/30 px-3 py-1 rounded-full bg-teal-950/20">
              Diseñado bajo directrices clínicas de soporte oncológico internacional
            </span>
          </div>
          <p className="text-[10px] text-slate-600">
            &copy; {new Date().getFullYear()} Guía Interactiva de Cuidados Oncológicos. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
