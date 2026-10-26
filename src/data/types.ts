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
  /**
   * Animação de execução: dois quadros (início e fim) em
   * `public/animacoes/<id>/0.jpg` e `1.jpg`, alternados na tela como um GIF.
   */
  animacao: {
    /** Pasta de origem no Free Exercise DB, para conferir ou trocar a imagem. */
    origem: string;
    /** Mostra só o quadro final (exercícios parados, como a prancha). */
    estatica?: boolean;
  };
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
  id: WorkoutId;
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
