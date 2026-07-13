/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { quizQuestions } from '../data/symptomsData';
import { playBeep } from '../utils/audio';
import { 
  Award, 
  Smile, 
  Frown, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const EducationalQuiz: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [answeredState, setAnsweredState] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
  const [score, setScore] = useState(0);

  const totalQuestions = quizQuestions.length;
  const progressPercent = ((index + (answeredState !== 'unanswered' ? 1 : 0)) / totalQuestions) * 100;

  const handleOptionClick = (correcto: boolean) => {
    if (answeredState !== 'unanswered') return; // prevent double clicks

    if (correcto) {
      setScore(prev => prev + 1);
      setAnsweredState('correct');
      // Success chord
      playBeep(587, 'sine', 0.12);
      setTimeout(() => playBeep(880, 'sine', 0.16), 80);
    } else {
      setAnsweredState('incorrect');
      // Minor sound
      playBeep(220, 'triangle', 0.28);
    }
  };

  const handleNext = () => {
    setIndex(prev => prev + 1);
    setAnsweredState('unanswered');
    playBeep(350, 'sine', 0.08);
  };

  const handleRestart = () => {
    setIndex(0);
    setScore(0);
    setAnsweredState('unanswered');
    playBeep(440, 'sine', 0.12);
    setTimeout(() => playBeep(554, 'sine', 0.12), 100);
    setTimeout(() => playBeep(659, 'sine', 0.2), 200);
  };

  // If completed all questions
  const isFinished = index >= totalQuestions;

  return (
    <section 
      id="cuestionario-seccion"
      className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl mt-12 border border-teal-100"
    >
      <div className="max-w-3xl mx-auto">
        
        {/* Quiz Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1 text-xs bg-teal-100 text-teal-800 font-black px-3 py-1 rounded-full uppercase tracking-wider border border-teal-200/50">
            <Award className="w-3.5 h-3.5" />
            Módulo de Autoevaluación
          </span>
          <h3 id="titulo-cuestionario" className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2.5 tracking-tight">
            ¿Cuánto sabe sobre el cuidado oncológico?
          </h3>
          <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
            Refuerce sus conocimientos para saber reaccionar adecuadamente ante emergencias y gestionar síntomas en casa.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-8 relative overflow-hidden shadow-inner">
          <div 
            id="quiz-progress-bar"
            className="h-full bg-teal-600 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Quiz content wrapper */}
        <div id="quiz-container-box" className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm smooth-transition">
          
          {isFinished ? (
            /* Final Score View */
            <div className="text-center py-6 flex flex-col items-center">
              <Award className="w-16 h-16 text-teal-500 mb-4 animate-bounce" />
              <h4 id="quiz-congrats" className="text-2xl font-black text-teal-950">
                ¡Evaluación Completada!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                Has completado el cuestionario de autocuidado clínico con un resultado de{' '}
                <strong className="text-teal-700">{score} de {totalQuestions}</strong> respuestas correctas. Con este conocimiento estarás más seguro al responder ante alertas oncológicas.
              </p>
              
              <button 
                id="btn-reiniciar-quiz"
                onClick={handleRestart} 
                className="mt-6 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider smooth-transition shadow-lg flex items-center gap-1.5 active:scale-98"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Repetir Autoevaluación
              </button>
            </div>
          ) : (
            /* Interactive Question View */
            <div>
              {answeredState === 'unanswered' ? (
                /* Question state */
                <div>
                  <span className="text-[10px] font-black tracking-widest text-teal-600 uppercase">
                    Pregunta {index + 1} de {totalQuestions}
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1 mb-6 leading-snug">
                    {quizQuestions[index].pregunta}
                  </h4>
                  
                  <div className="space-y-3">
                    {quizQuestions[index].opciones.map((opc, idx) => (
                      <button 
                        key={idx}
                        id={`btn-quiz-option-${idx}`}
                        onClick={() => handleOptionClick(opc.correcto)} 
                        className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-slate-50 font-semibold text-slate-700 text-xs sm:text-sm smooth-transition flex justify-between items-center group active:scale-[0.99]"
                      >
                        <span>{opc.texto}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-500 transform translate-x-0 group-hover:translate-x-1 smooth-transition" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Feedback state */
                <div className="text-center py-4 flex flex-col items-center">
                  {answeredState === 'correct' ? (
                    <>
                      <Smile className="w-14 h-14 text-teal-500 mb-3 animate-bounce" />
                      <h4 id="quiz-correct-title" className="text-xl font-bold text-teal-950">
                        ¡Respuesta Correcta!
                      </h4>
                    </>
                  ) : (
                    <>
                      <Frown className="w-14 h-14 text-rose-500 mb-3" />
                      <h4 id="quiz-incorrect-title" className="text-xl font-bold text-rose-950">
                        Respuesta Incorrecta
                      </h4>
                    </>
                  )}
                  
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2.5 leading-relaxed bg-slate-50 border border-slate-100 p-4 rounded-xl">
                    <strong className="text-slate-800 block mb-1 font-bold text-xs uppercase tracking-wider">¿Por qué es así?</strong>
                    {quizQuestions[index].explicacion}
                  </p>
                  
                  <button 
                    id="btn-quiz-next"
                    onClick={handleNext} 
                    className="mt-6 px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider smooth-transition flex items-center gap-1 shadow hover:shadow-md active:scale-98"
                  >
                    <span>{index === totalQuestions - 1 ? 'Finalizar' : 'Siguiente Pregunta'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
};
