/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Symptom, QuizQuestion } from '../types';
import neutropeniaImg from '../assets/images/Neutropenia.webp';
import mucositisImg from '../assets/images/Mucositis.webp';
import nauseasImg from '../assets/images/nauseas_bowl.jpg';
import alopeciaImg from '../assets/images/Alopecia.webp';
import cansancioImg from '../assets/images/cansancio_exhaust.jpg';
import diarreaImg from '../assets/images/Diarrea.webp';

export const symptomsData: Symptom[] = [
  {
    id: 'neutropenia',
    name: 'Neutropenia y Fiebre',
    riskLevel: 'critical',
    riskLabel: 'Riesgo Crítico',
    briefDescription: 'Es la disminución grave de un tipo de glóbulos blancos que combate las infecciones.',
    fullDescription: 'La neutropenia ocurre cuando el número de glóbulos blancos disminuye a cantidades bajas como resultado del tratamiento de quimioterapia. La neutropenia es una complicación frecuente y grave. Ante un episodio de fiebre o cualquier signo de infección (como escalofríos, tos o dolor), acuda inmediatamente a urgencias. En niños y adultos bajo tratamiento oncológico, la fiebre se considera cuando la temperatura corporal medida con termómetro digital en la axila es mayor o igual a 38.0° C.',
    additionalNotes: [
      'PROTOCOLO HORA DORADA: Consiste en un estándar clínico internacional estricto para garantizar que los pacientes oncológicos con fiebre y posible neutropenia reciban su primera dosis de antibiótico de amplio espectro en los primeros 60 minutos de su ingreso hospitalario.'
    ],
    recommendations: {
      title: 'Atención Médica Urgente y Medidas de Confort',
      items: [
        'Monitoreo preciso: Registra la temperatura corporal cada 4 horas.',
        'Ofrece o ingiere líquidos en pequeños sorbos de manera frecuente.',
        'Aplica compresas con agua tibia.',
        'Ropa ligera: Usar prendas cómodas, holgadas y frescas.'
      ],
      warnings: [
        '¡Emergencia Vital! No esperes ni administres medicamentos antipiréticos o antibióticos por tu cuenta sin indicación directa: Acude directo a emergencias hospitalarias. El inicio rápido de antibióticos en la primera hora es vital.'
      ]
    },
    searchTags: ['neutropenia', 'fiebre', 'sangre', 'globulos blancos', 'infeccion', 'temperatura', 'urgencia', 'hora dorada', 'escalofrios', 'tos', 'dolor', 'niño', 'infantil'],
    imageUrl: neutropeniaImg
  },
  {
    id: 'mucositis',
    name: 'Mucositis Bucal (Llagas)',
    riskLevel: 'moderate',
    riskLabel: 'Riesgo Moderado',
    briefDescription: 'Es cuando todo el interior de la boca y el estómago se inflama, se llena de llagas y se irrita debido a la quimioterapia.',
    fullDescription: 'Provoca dolor agudo, ardor al tragar, enrojecimiento severo y puede generar placas blancas o sangrado en la boca.',
    recommendations: {
      title: 'Higiene, Alimentación y Alivio de la Cavidad Oral',
      items: [
        'Higiene bucal adecuada: Cepillar los dientes de manera sumamente suave con un cepillo de cerdas extra blandas o cepillo de bebés después de cada comida.',
        'Revisión dental previa: Antes de iniciar el primer ciclo de quimioterapia, se aconseja realizar una revisión bucodental completa.',
        'Cuidado y lubricación labial: Hidratar los labios frecuentemente con bálsamos labiales naturales, cremas protectoras o aceite de oliva extra virgen.',
        'Modificaciones de textura y consistencia: Aumentar el consumo de líquidos.',
        'Crioterapia paliativa: Derretir pequeños trozos de hielo en la boca o masticar hielo de forma intermitente unos minutos antes de la sesión de quimioterapia puede mitigar los daños.'
      ],
      avoidItems: [
        'Evitar alimentos calientes, ácidos, fritos, amargos, picantes, muy salados o sumamente condimentados.',
        'Evitar frutas verdes, verduras crudas ásperas y bebidas gaseosas.',
        'No usar colutorios o enjuagues comerciales que contengan alcohol (puesto que resecan y empeoran la mucosa).'
      ]
    },
    searchTags: ['mucositis', 'llagas', 'boca', 'garganta', 'enjuague', 'dientes', 'labios', 'comer', 'tragar', 'ardor', 'placas', 'cepillo', 'hielo', 'colutorio'],
    imageUrl: mucositisImg
  },
  {
    id: 'nauseas',
    name: 'Náuseas y Vómitos',
    riskLevel: 'moderate',
    riskLabel: 'Riesgo Moderado',
    briefDescription: 'Malestar estomacal y reflejo de expulsión.',
    fullDescription: 'Clasificación de las náuseas y vómitos:\n\n• Náuseas agudas: Aparecen entre las primeras 2 a 6 horas después de la administración del tratamiento.\n\n• Náuseas retardadas: Se presentan después de las 24 horas y pueden durar varios días.\n\n• Náuseas anticipatorias: Ocurren incluso antes de recibir la quimioterapia. Suelen estar relacionadas con experiencias previas negativas y con la ansiedad.',
    recommendations: {
      title: 'Hábitos Alimentarios de Fácil Digestión',
      items: [
        'Fraccionamiento de porciones: Dividir la ingesta en raciones pequeñas de comida, ingiriendo menos cantidad pero con mayor frecuencia (5 o 6 veces al día).',
        'Cocciones ligeras y neutras: Preferir preparaciones culinarias al horno, hervidas, al vapor o papillas templadas.',
        'Hidratación de control: Beber pequeños y constantes sorbos de agua muy fría o infusiones suaves a lo largo de toda la jornada.',
        'Postura post-ingesta: Mantenerse sentado o ligeramente reclinado durante al menos 30 a 60 minutos después de comer para evitar el reflujo.'
      ],
      avoidItems: [
        'Evitar alimentos fritos, comidas muy grasas, salsas pesadas y condimentos intensos.',
        'Evitar olores de cocina fuertes que puedan disparar el reflejo de náusea.',
        'Evitar realizar actividades físicas intensas inmediatamente después de comer.'
      ]
    },
    searchTags: ['nauseas', 'vomitos', 'estomago', 'comida', 'digestión', 'olores', 'aguda', 'retardada', 'anticipatoria', 'ansiedad', 'vapor', 'alimentos', 'fraccionar', 'hidratacion'],
    imageUrl: nauseasImg
  },
  {
    id: 'alopecia',
    name: 'Alopecia (Caída del Cabello)',
    riskLevel: 'aesthetic',
    riskLabel: 'Control Estético',
    briefDescription: 'Pérdida temporal del cabello debido al impacto de la quimioterapia sobre las células del folículo piloso, que se reproducen de manera acelerada.',
    fullDescription: 'Los medicamentos citostáticos destruyen las células de la matriz del folículo piloso que se dividen rápidamente. Esto interrumpe el ciclo de crecimiento normal del cabello, provocando su debilitamiento progresivo y posterior desprendimiento parcial o completo. Afecta el cuero cabelludo, cejas, pestañas y vello corporal, siendo un proceso enteramente reversible tras finalizar la terapia.',
    recommendations: {
      title: 'Protección Cutánea y Estilo Personal',
      items: [
        'Peinado y cepillado suave: Utilizar cepillos de cerdas sumamente suaves o peines de dientes muy anchos para reducir la tracción capilar.',
        'Protección al dormir: Utilizar una red suave para el cabello y fundas de almohada de tejidos tersos como satén o seda para evitar la fricción nocturna y la acumulación de hebras sueltas.',
        'Corte preventivo anticipado: Muchas personas encuentran de gran ayuda recortar su cabello bien corto o realizar un rasurado completo antes de que inicie la caída masiva, facilitando el control físico y emocional.',
        'Cuidado térmico del cuero cabelludo: Utilizar gorros de algodón, turbantes, pañuelos o pelucas según la preferencia estética, y proteger siempre la piel expuesta de la radiación solar con bloqueador de factor alto.'
      ],
      avoidItems: [
        'Evitar el uso de secadores de aire caliente, planchas o rizadores.',
        'No aplicar tintes, productos decolorantes o químicos agresivos que puedan irritar el folículo piloso.'
      ]
    },
    searchTags: ['alopecia', 'cabello', 'pelo', 'caida', 'cuero cabelludo', 'peine', 'almohada', 'seda', 'turbante', 'solar', 'gorro', 'estetico', 'reversible'],
    imageUrl: alopeciaImg
  },
  {
    id: 'cansancio',
    name: 'Cansancio y Fatiga',
    riskLevel: 'comfort',
    riskLabel: 'Control Físico',
    briefDescription: 'Agotamiento extremo y persistente a nivel físico, emocional y cognitivo que no se relaciona con el esfuerzo realizado y no cede con el descanso.',
    fullDescription: 'El cansancio oncológico es una sensación persistente de agotamiento extremo físico, emocional y mental que puede deberse a la propia patología o a los tratamientos administrados. Se describe como una falta generalizada de energía vital que interfiere en las actividades de la vida diaria y que, a diferencia del cansancio habitual, no se alivia simplemente durmiendo o descansando de manera ordinaria.',
    recommendations: {
      title: 'Rutinas Estructuradas y Técnicas de Relajación',
      items: [
        'Diario de actividades y orden: Mantener una rutina diaria estructurada anotando las actividades cotidianas en un cuaderno para programar descansos intermedios y priorizar tareas indispensables.',
        'Reducción integral del estrés: Dedicar tiempo a la meditación, ejercicios de respiración guiada, musicoterapia, lectura recreativa o entablar conversaciones de apoyo con seres queridos.',
        'Higiene del sueño nocturno: Mejorar la calidad del descanso en la noche reduciendo al mínimo el consumo de alimentos o líquidos estimulantes y estableciendo un horario de sueño fijo.',
        'Actividad física moderada: Realizar paseos muy breves (de 10 a 15 minutos diarios) siempre bajo recomendación y autorización médica para combatir el desacondicionamiento muscular.'
      ],
      avoidItems: [
        'Evitar permanecer en cama de manera excesiva durante las horas diurnas para no trastornar el sueño reparador de la noche.',
        'Evitar la sobrecarga de actividades que puedan agotar las reservas de energía de un solo golpe.'
      ]
    },
    searchTags: ['cansancio', 'fatiga', 'sueño', 'agotamiento', 'energia', 'descanso', 'estrés', 'rutina', 'meditacion', 'relajacion', 'paseos', 'muscular'],
    imageUrl: cansancioImg
  },
  {
    id: 'diarrea',
    name: 'Diarrea',
    riskLevel: 'moderate',
    riskLabel: 'Riesgo Moderado',
    briefDescription: 'Evacuaciones intestinales frecuentes, blandas o líquidas (3 o más veces al día) que conllevan riesgo potencial de deshidratación.',
    fullDescription: 'La diarrea es la evacuación intestinal de heces sueltas, blandas o líquidas tres o más veces en un periodo de 24 horas. Ocurre cuando se acelera el tránsito digestivo normal e impide que las paredes del intestino absorban el agua y electrolitos de manera adecuada, planteando un riesgo constante de deshidratación clínica.',
    recommendations: {
      title: 'Dieta Astringente y Reposición Electrolítica',
      items: [
        'Reposición de líquidos: Consumir abundantes sueros de rehidratación oral o agua hervida con pequeñas adiciones de sal y azúcar para restablecer los electrolitos perdidos.',
        'Régimen dietético astringente: Seguir una dieta diseñada para ralentizar el tránsito, basada en alimentos aglutinantes como puré de manzana sin cáscara, plátanos maduros, agua de arroz y arroz blanco cocido.',
        'Comidas templadas: Ingerir alimentos a temperatura templada o fresca, evitando extremos calientes o fríos que aceleren el peristaltismo intestinal.'
      ],
      avoidItems: [
        'Evitar de manera absoluta productos que contengan lactosa (leche, quesos, yogur) o cafeína.',
        'Evitar fritos, alimentos muy grasosos, salsas de cualquier tipo o alimentos extremadamente ricos en fibra insoluble.',
        'Evitar el consumo de bebidas gaseosas o carbonatadas.'
      ]
    },
    searchTags: ['diarrea', 'estomago', 'evacuacion', 'heces', 'liquido', 'deshidratacion', 'suero', 'astringente', 'manzana', 'arroz', 'platano', 'fibra', 'lactosa'],
    imageUrl: diarreaImg
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    pregunta: "¿Qué acción inmediata debe tomar un paciente de quimioterapia si su temperatura supera los 38°C?",
    opciones: [
      { texto: 'Tomar un antipirético fuerte en casa y recostarse a dormir.', correcto: false },
      { texto: "Ir de inmediato al hospital para activar el protocolo de emergencia de la 'Hora Dorada'.", correcto: true },
      { texto: 'Esperar al siguiente día para llamar al oncólogo de cabecera.', correcto: false }
    ],
    explicacion: 'Cualquier pico febril de 38°C o superior ante un estado de posible neutropenia debe tratarse como una urgencia médica crítica. Retrasar la atención o automedicarse puede encubrir infecciones graves que derivan en sepsis.'
  },
  {
    pregunta: "¿En qué consiste exactamente el protocolo clínico internacional de la 'Hora Dorada'?",
    opciones: [
      { texto: 'Realizar exámenes de sangre exhaustivos en menos de 60 minutos.', correcto: false },
      { texto: 'Administrar la primera dosis de antibióticos de amplio espectro en los primeros 60 minutos del ingreso hospitalario.', correcto: true },
      { texto: 'Descansar obligatoriamente una hora luego de cada sesión de quimioterapia.', correcto: false }
    ],
    explicacion: 'Múltiples guías de oncología internacional demuestran que iniciar la terapia con antibióticos de amplio espectro en la primera hora de llegada reduce sustancialmente el riesgo de complicaciones de una neutropenia febril.'
  },
  {
    pregunta: 'Si se presenta una dolorosa mucositis oral o llagas en la boca, ¿cuál de los siguientes es un cuidado correcto?',
    opciones: [
      { texto: 'Hacer enjuagues suaves sin alcohol, cepillarse con cerdas muy suaves y humectar labios con aceite de oliva extra virgen.', correcto: true },
      { texto: 'Realizar gárgaras con colutorios comerciales estándar que contengan alcohol para desinfectar.', correcto: false },
      { texto: 'Consumir cítricos y alimentos muy calientes para acelerar la cicatrización natural de las encías.', correcto: false }
    ],
    explicacion: 'La boca lesionada por mucositis es sumamente sensible. El alcohol de los colutorios deshidrata y causa un dolor atroz, mientras que el cepillado delicado, la dieta suave y el aceite de oliva protegen y alivian el tejido epitelial lesionado.'
  },
  {
    pregunta: '¿Cuál es el manejo dietético más adecuado ante la presencia de náuseas o vómitos por tratamiento?',
    opciones: [
      { texto: 'Comer porciones abundantes y pesadas únicamente dos veces al día para descansar el estómago.', correcto: false },
      { texto: 'Fraccionar las raciones en comidas pequeñas, ingerir alimentos templados al horno o al vapor y beber pequeños sorbos de agua fría.', correcto: true },
      { texto: 'Comer fritos abundantes y hacer ejercicio cardiovascular de alta intensidad justo después de comer.', correcto: false }
    ],
    explicacion: 'Comer raciones más reducidas en intervalos frecuentes previene la distensión excesiva del estómago. Las cocciones suaves, no condimentadas y a temperaturas templadas disminuyen notablemente los estímulos nauseosos.'
  },
  {
    pregunta: 'Para mitigar las molestias de la caída del cabello (alopecia), ¿cuál de estas pautas es recomendable?',
    opciones: [
      { texto: 'Utilizar fundas de almohada tersas como de seda o satén, usar cepillos de cerdas extra blandas y proteger el cuero cabelludo del sol.', correcto: true },
      { texto: 'Someter el cabello a tratamientos térmicos frecuentes (secadoras o planchas) para fortalecerlo.', correcto: false },
      { texto: 'Aplicar tintes de amoníaco agresivos para pigmentar los folículos y evitar que se desprendan.', correcto: false }
    ],
    explicacion: 'El folículo piloso bajo quimioterapia está sumamente debilitado. Las fundas de satén o seda reducen el roce que provoca la caída en mechones, mientras que el sombrero y bloqueador solar protegen la piel cabelluda expuesta.'
  }
];
