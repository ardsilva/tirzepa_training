export type GrupoMuscular =
  | "peito"
  | "ombro"
  | "triceps"
  | "costas"
  | "biceps"
  | "quadriceps"
  | "posterior"
  | "gluteo"
  | "panturrilha"
  | "core";

export type Exercise = {
  id: string;
  nome: string;
  grupos: GrupoMuscular[];
  /** ID do vídeo no YouTube (o trecho depois de `watch?v=`). */
  videoId: string;
  canal: string;
  dicas: string[];
  erroComum: string;
  /** Exercício para usar quando o aparelho estiver ocupado. */
  alternativaId?: string;
};

export type WorkoutId = "A" | "B" | "C" | "D";

export type WorkoutItem = {
  exerciseId: string;
  series: number;
  repsMin: number;
  repsMax: number;
  /** Quando true, reps são segundos (ex.: prancha). */
  isometrico?: boolean;
  /** Indica que a contagem é por lado (ex.: serrote). */
  porLado?: boolean;
  descansoSeg: number;
};

export type Workout = {
  /** "A" a "D" no plano do app; slug nos treinos de famosos. */
  id: string;
  nome: string;
  foco: string;
  duracaoMin: number;
  itens: WorkoutItem[];
};

export type Plano = 3 | 4;

export type GuideArticle = {
  slug: string;
  titulo: string;
  resumo: string;
  paragrafos: string[];
};

export type ProgramaFamoso = {
  slug: string;
  nome: string;
  famoso: string;
  resumo: string;
  frequencia: string;
  /** De onde veio o treino original, em 1 ou 2 frases. */
  origem: string;
  /** O que mudamos no original e por quê. */
  adaptacoes: string[];
  fonte: { titulo: string; url: string };
  treinos: Workout[];
};

export type Cardio = {
  id: string;
  nome: string;
  duracao: string;
  intensidade: string;
  quando: string;
  comoFazer: string[];
  erroComum: string;
};
