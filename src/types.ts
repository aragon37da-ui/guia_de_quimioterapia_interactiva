/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Recommendation {
  title: string;
  items: string[];
  warnings?: string[];
  avoidItems?: string[];
}

export interface Symptom {
  id: string;
  name: string;
  riskLevel: 'critical' | 'moderate' | 'comfort' | 'aesthetic';
  riskLabel: string;
  briefDescription: string;
  fullDescription: string;
  additionalNotes?: string[];
  recommendations: Recommendation;
  searchTags: string[]; // for search filters
  imageUrl?: string;
}

export interface QuizOption {
  texto: string;
  correcto: boolean;
}

export interface QuizQuestion {
  pregunta: string;
  opciones: QuizOption[];
  explicacion: string;
}
