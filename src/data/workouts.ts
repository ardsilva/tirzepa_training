import type { Plano, Workout, WorkoutId } from "./types";

// Regras de prescrição (ver docs/plano.md):
// compostos 6-12 reps, 2-3 min; isolados 10-15 reps, 60-90 s; RIR 1-2.
export const workouts: Workout[] = [
  {
    id: "A",
    nome: "Empurrar",
    foco: "Peito, ombro e tríceps",
    duracaoMin: 50,
    itens: [
      { exerciseId: "supino-reto-halteres", series: 3, repsMin: 6, repsMax: 10, descansoSeg: 150 },
      { exerciseId: "supino-inclinado-maquina", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
      { exerciseId: "desenvolvimento-halteres", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
      { exerciseId: "elevacao-lateral", series: 3, repsMin: 12, repsMax: 15, descansoSeg: 75 },
      { exerciseId: "crucifixo-maquina", series: 2, repsMin: 12, repsMax: 15, descansoSeg: 75 },
      { exerciseId: "triceps-corda", series: 3, repsMin: 10, repsMax: 15, descansoSeg: 75 },
    ],
  },
  {
    id: "B",
    nome: "Puxar",
    foco: "Costas, posterior de ombro e bíceps",
    duracaoMin: 50,
    itens: [
      { exerciseId: "puxada-frontal", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
      { exerciseId: "remada-baixa", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
      { exerciseId: "remada-unilateral", series: 3, repsMin: 8, repsMax: 12, porLado: true, descansoSeg: 90 },
      { exerciseId: "face-pull", series: 3, repsMin: 12, repsMax: 15, descansoSeg: 75 },
      { exerciseId: "rosca-direta-halteres", series: 3, repsMin: 10, repsMax: 12, descansoSeg: 75 },
      { exerciseId: "rosca-martelo", series: 2, repsMin: 10, repsMax: 12, descansoSeg: 75 },
    ],
  },
  {
    id: "C",
    nome: "Perna",
    foco: "Quadríceps, posterior, glúteo, panturrilha e core",
    duracaoMin: 55,
    itens: [
      { exerciseId: "leg-press", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 150 },
      { exerciseId: "agachamento-goblet", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
      { exerciseId: "stiff-halteres", series: 3, repsMin: 8, repsMax: 10, descansoSeg: 150 },
      { exerciseId: "cadeira-extensora", series: 3, repsMin: 12, repsMax: 15, descansoSeg: 75 },
      { exerciseId: "mesa-flexora", series: 3, repsMin: 10, repsMax: 15, descansoSeg: 75 },
      { exerciseId: "panturrilha-em-pe", series: 3, repsMin: 12, repsMax: 15, descansoSeg: 60 },
      { exerciseId: "prancha", series: 3, repsMin: 30, repsMax: 45, isometrico: true, descansoSeg: 60 },
    ],
  },
  {
    id: "D",
    nome: "Superior + braços",
    foco: "Peito, costas, bíceps e tríceps",
    duracaoMin: 45,
    itens: [
      { exerciseId: "supino-inclinado-halteres", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
      { exerciseId: "remada-maquina-neutra", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
      { exerciseId: "rosca-scott-maquina", series: 3, repsMin: 10, repsMax: 12, descansoSeg: 75 },
      { exerciseId: "triceps-testa-barra-w", series: 3, repsMin: 10, repsMax: 12, descansoSeg: 75 },
      { exerciseId: "rosca-polia-baixa", series: 2, repsMin: 12, repsMax: 15, descansoSeg: 60 },
      { exerciseId: "triceps-frances-halter", series: 2, repsMin: 12, repsMax: 15, descansoSeg: 60 },
    ],
  },
];

/** Ordem dos treinos por plano. O padrão do app é 3x por semana. */
export const sequenciaPorPlano: Record<Plano, WorkoutId[]> = {
  3: ["A", "B", "C"],
  4: ["A", "B", "C", "D"],
};

export const PLANO_PADRAO: Plano = 3;

/** Semanas 1 e 2: 2 séries por exercício e carga leve (RIR 3-4). */
export const SEMANAS_ADAPTACAO = 2;
export const SERIES_ADAPTACAO = 2;

export const workoutsById: Record<WorkoutId, Workout> = Object.fromEntries(
  workouts.map((w) => [w.id, w]),
) as Record<WorkoutId, Workout>;

export function getWorkout(id: string): Workout | undefined {
  return workoutsById[id as WorkoutId];
}
