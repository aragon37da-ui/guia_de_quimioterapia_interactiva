# Documentación Técnica del Aplicativo: Guía Oncológica Interactiva

Esta documentación describe en detalle la arquitectura, estructura de archivos, componentes interactivos y lógica de negocio del aplicativo **Guía Oncológica Interactiva para el Manejo de Efectos Adversos de la Quimioterapia**.

---

## 🗺️ 1. Arquitectura General del Proyecto

El proyecto está construido sobre **React (v18+)**, utilizando **TypeScript** para un tipado estricto y seguro, y **Vite** como entorno de construcción ultrarrápido. El diseño visual es totalmente adaptable y moderno, implementado mediante **Tailwind CSS**.

```
                         [ App.tsx ] (Estado Global y Coordinación)
                              │
       ┌──────────────────────┼──────────────────────┬──────────────────────┐
       ▼                      ▼                      ▼                      ▼
[ ParticleCanvas ]       [ BodyMap ]           [ TriajePanel ]      [ SymptomCard / List ]
(Fondo de Células)  (Hotspots Interactivos)  (Pre-evaluación Clínica)  (Detalles de Efectos)
       │                      │                      │                      │
       └──────────────────────┴──────────────────────┼──────────────────────┘
                                                     ▼
                                            [ EducationalQuiz ]
                                           (Cuestionario Interactivo)
```

### Flujo de Datos Principal
1. **`symptomsData.ts`**: Contiene la base de datos estática de los síntomas, clasificaciones, recomendaciones, imágenes ilustrativas personalizadas y preguntas de autoevaluación.
2. **`App.tsx`**: Administra el estado principal de la aplicación, incluyendo filtros de búsqueda, selección de síntomas para el auto-desplazamiento suave (`scrollIntoView`), y renderiza el diseño unificado de la aplicación.
3. **`BodyMap.tsx`**: Representa visualmente la silueta humana en formato SVG responsivo con hotspots interactivos. Al pulsar un hotspot, este llama al callback global para desplazar la pantalla automáticamente al síntoma correspondiente en la sección de detalles.
4. **`TriajePanel.tsx`**: Un panel interactivo dinámico que guía al usuario o cuidador a través de preguntas binarias de gravedad del síntoma para orientarle sobre qué acción inmediata tomar.
5. **`audio.ts`**: Genera tonos sintéticos dinámicos utilizando la API nativa `Web Audio API` del navegador para brindar feedback auditivo instantáneo al interactuar con el mapa, los botones de filtro, el cuestionario y el triaje.

---

## 📂 2. Estructura de Archivos y Responsabilidad de cada Parte

A continuación se describe qué hace exactamente cada archivo del proyecto:

### 📁 Raíz del Proyecto
* **`package.json`**: Administra las dependencias del aplicativo (React, Lucide React, Framer Motion, Tailwind, TypeScript, Vite) y define los scripts de desarrollo, construcción y linter.
* **`vite.config.ts`**: Archivo de configuración del empaquetador Vite, que establece el servidor de desarrollo y los plugins necesarios para TypeScript y JSX.
* **`index.html`**: El punto de entrada HTML de la aplicación, encargado de montar el nodo raíz de React (`<div id="root">`) y de cargar los estilos globales.
* **`metadata.json`**: Controla el nombre oficial de la aplicación, la descripción pública y las capacidades/permisos de la plataforma.

---

### 📁 Directorio `/src`

#### 📄 `src/main.tsx`
* **Función**: Punto de entrada de ejecución de React en TypeScript.
* **Qué hace**: Importa la librería React, localiza el elemento contenedor `#root` en el archivo `index.html`, renderiza de forma estricta (`React.StrictMode`) el componente principal `App.tsx` y monta la interfaz de usuario en el navegador.

#### 📄 `src/index.css`
* **Función**: Hoja de estilos global del aplicativo.
* **Qué hace**: Carga las fuentes tipográficas estilizadas desde Google Fonts (Inter y Space Grotesk) y configura las directivas básicas de Tailwind CSS (`@import "tailwindcss";`). Define clases personalizadas como efectos de vidrio translúcido (`.glass-card`), transiciones suaves y reglas estéticas para las tarjetas interactivas.

#### 📄 `src/types.ts`
* **Función**: Definición estricta de interfaces de TypeScript.
* **Qué hace**: Asegura que la estructura de datos sea consistente en todo el aplicativo. Contiene tipos y modelos de datos cruciales como:
  * `Symptom`: Estructura detallada de un efecto adverso (id, nombre, nivel de riesgo, descripción breve, descripción extendida, notas de protocolo, recomendaciones de salud, advertencias clínicas, etiquetas de búsqueda y ruta de la imagen).
  * `Recommendation`: Representa las pautas y precauciones recomendadas para cada síntoma.
  * `QuizQuestion` y `QuizOption`: Tipos de datos para el cuestionario interactivo de autoevaluación médica.

---

### 📁 Directorio `/src/data`

#### 📄 `src/data/symptomsData.ts`
* **Función**: Base de conocimiento clínico y pedagógico del aplicativo.
* **Qué hace**:
  * Contiene los registros de texto actualizados y optimizados para cada uno de los 6 efectos adversos clave (Neutropenia y Fiebre, Mucositis Bucal, Náuseas y Vómitos, Alopecia, Cansancio y Fatiga, Diarrea).
  * Enlaza cada síntoma con las imágenes clínicas representativas alojadas de forma separada en la carpeta pública `/images`.
  * Estructura las preguntas del cuestionario educativo de autoevaluación con sus respectivas opciones de respuesta y retroalimentaciones explicativas para educar al cuidador del paciente pediátrico oncológico.

---

### 📁 Directorio `/src/utils`

#### 📄 `src/utils/audio.ts`
* **Función**: Motor de retroalimentación de audio del aplicativo.
* **Qué hace**: Implementa la función `playBeep` utilizando la **Web Audio API** del navegador. Permite generar tonos de audio sintéticos directos (sin archivos de audio pesados) especificando frecuencia (en Hz), tipo de onda (sine, triangle, sawtooth, square), duración y volumen. Se ejecuta en milisegundos en respuesta a eventos de clic del usuario para aumentar la inmersión interactiva.

---

### 📁 Directorio `/src/components`

#### 📄 `src/components/ParticleCanvas.tsx`
* **Función**: Fondo ambiental interactivo que simula la corriente sanguínea y celular.
* **Qué hace**:
  * Utiliza un elemento `<canvas>` HTML5 acoplado a un hook `useEffect` con un ciclo de renderizado `requestAnimationFrame`.
  * Genera una colección de partículas de color rojo traslúcido y verde/teal que flotan suavemente por la pantalla simulando glóbulos rojos, blancos y defensas.
  * Responde dinámicamente al tamaño de la pantalla, adaptándose sin afectar el rendimiento de la interfaz gráfica principal.

#### 📄 `src/components/BodyMap.tsx`
* **Función**: Mapa anatómico clínico interactivo en 2D.
* **Qué hace**:
  * Renderiza una silueta humana de diseño minimalista y moderno trazada en formato vectorial SVG.
  * Ubica "hotspots" (puntos calientes parpadeantes con anillos de animación de pulso) sobre las regiones anatómicas clave asociadas a los síntomas de la quimioterapia (cabeza, cavidad oral, corazón/sangre, abdomen, sistema general).
  * Al hacer clic en un hotspot, genera un sonido de retroalimentación mediante `playBeep` y ejecuta la función callback `handleHighlightSymptom` de `App.tsx` para guiar visualmente al usuario a la tarjeta informativa correspondiente.

#### 📄 `src/components/SymptomCard.tsx`
* **Función**: Tarjeta visual e interactiva detallada para cada efecto adverso.
* **Qué hace**:
  * Renderiza de manera atractiva toda la información de un síntoma específico.
  * Muestra de forma integrada y adaptativa las imágenes asociadas en la parte superior.
  * Divide la información mediante pestañas de navegación interna (Tabs) para separar las **Recomendaciones de Cuidado (Qué hacer)** de las **Precauciones o Advertencias (Qué evitar / Cuándo acudir al médico)**.
  * Destaca visualmente de manera especial si el síntoma es seleccionado por el mapa corporal utilizando animaciones de entrada dinámicas y un borde brillante para captar la atención del usuario.

#### 📄 `src/components/TriajePanel.tsx`
* **Función**: Sistema experto de soporte para pre-evaluación de triaje clínico.
* **Qué hace**:
  * Presenta un árbol de decisión interactivo y amigable para el cuidador o paciente.
  * El usuario selecciona un síntoma de sospecha (por ejemplo, llagas en la boca, fiebre, diarrea, etc.) y responde a preguntas específicas con respuestas de Sí o No.
  * Calcula dinámicamente un semáforo de alerta clínica en tres colores:
    * **Rojo (Urgencia Absoluta)**: Alertas críticas de riesgo de vida (por ejemplo, fiebre mayor a 38°C en neutropenia) recomendando acudir inmediatamente a Urgencias.
    * **Amarillo (Alerta Moderada)**: Cuidados preventivos y contacto prioritario con el médico de cabecera.
    * **Verde (Control de Confort)**: Recomendaciones de apoyo doméstico, hidratación y monitorización.

#### 📄 `src/components/EducationalQuiz.tsx`
* **Función**: Módulo pedagógico de evaluación de conocimientos.
* **Qué hace**:
  * Proporciona un test dinámico interactivo con preguntas basadas en la guía clínica (por ejemplo, el protocolo de la Hora Dorada o el cuidado de la mucositis).
  * Al seleccionar una respuesta, evalúa inmediatamente si es correcta o incorrecta mediante indicadores de color y sonido dinámico.
  * Desglosa una explicación y justificación clínica de la respuesta correcta para consolidar el conocimiento preventivo de los cuidadores.
  * Muestra una pantalla de resumen con puntajes finales y un mensaje motivador.

---

## 📸 3. Manejo de Imágenes y Recursos Multimedia

Todas las fotografías personalizadas y elementos visuales están centralizados en el directorio público `/images/` del aplicativo, facilitando un acceso rápido por parte del servidor web de desarrollo y producción:
* `neutropenia_cells_...jpg`: Microfotografía científica 3D interactiva para Neutropenia y Fiebre.
* `mucositis_sores_...jpg`: Ilustración detallada de la cavidad bucal inflamada para Mucositis Bucal.
* `nauseas_bowl_...jpg`: Fotografía que ilustra náuseas y malestar digestivo.
* `alopecia_head_...jpg`: Imagen representativa de la pérdida del cuero cabelludo asociada a la alopecia.
* `cansancio_exhausted_...jpg`: Ilustración del cansancio y la fatiga oncológica del paciente.
* `diarrea_pain_...jpg`: Imagen representativa del malestar estomacal y evacuaciones líquidas.

Las imágenes se cargan con la propiedad `referrerPolicy="no-referrer"` para asegurar la compatibilidad con todas las plataformas de visualización de forma segura.

---

## 🛠️ 4. Principales Protocolos Clínicos Destacados

El código ha sido configurado para instruir con la máxima claridad sobre situaciones de emergencia:
1. **La Hora Dorada**: Protocolo de urgencia que exige la administración de antibiótico a un niño oncológico con fiebre en los primeros 60 minutos desde que cruza la puerta del hospital. Se destaca de forma preferencial en la parte superior de la página y en el triaje.
2. **Reacción Adversa**: Clarificación terminológica para que el cuidador identifique de forma inmediata que son respuestas imprevistas y nocivas del tratamiento sobre las células sanas del organismo.
