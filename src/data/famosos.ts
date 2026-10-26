import type { ProgramaFamoso } from "./types";

// Treinos públicos de famosos, adaptados às regras do app (ver docs/plano.md):
// só exercícios que já existem em exercises.ts, compostos 6-12 reps com 2-3 min,
// isolados 10-15 reps com 60-90 s, RIR 1-2 (nada até a falha).
// Fontes conferidas em 26/10/2026.
export const programasFamosos: ProgramaFamoso[] = [
  {
    slug: "golden-six",
    nome: "Golden Six",
    famoso: "Arnold Schwarzenegger",
    resumo: "6 exercícios, corpo todo, 3x por semana. Simples e direto.",
    frequencia: "3x por semana, em dias alternados (ex.: seg, qua, sex)",
    origem:
      "Rotina que o Arnold usava no começo da carreira, antes das divisões de alto volume da época de profissional. O original: agachamento 4x10, supino 3x10, barra fixa 3x até a falha, desenvolvimento por trás da nuca 4x10, rosca direta 3x10 e abdominal 3x até a falha.",
    adaptacoes: [
      "Agachamento livre virou agachamento goblet: mais seguro treinando sozinho, sem precisar de alguém para ajudar.",
      "Barra fixa até a falha virou puxada frontal de 8 a 12 reps: dá para ajustar a carga e parar com 1 a 2 reps na reserva.",
      "Desenvolvimento por trás da nuca virou desenvolvimento com halteres na frente: a versão atrás da nuca força o ombro.",
      "Abdominal até a falha virou prancha.",
    ],
    fonte: {
      titulo: "Fitness Volt: Arnold's Golden Six Routine",
      url: "https://fitnessvolt.com/arnold-golden-six-routine/",
    },
    treinos: [
      {
        id: "golden-six",
        nome: "Golden Six",
        foco: "Corpo todo",
        duracaoMin: 50,
        itens: [
          { exerciseId: "agachamento-goblet", series: 4, repsMin: 8, repsMax: 12, descansoSeg: 150 },
          { exerciseId: "supino-reto-halteres", series: 3, repsMin: 8, repsMax: 10, descansoSeg: 150 },
          { exerciseId: "puxada-frontal", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
          { exerciseId: "desenvolvimento-halteres", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
          { exerciseId: "rosca-direta-halteres", series: 3, repsMin: 10, repsMax: 12, descansoSeg: 75 },
          { exerciseId: "prancha", series: 3, repsMin: 30, repsMax: 45, isometrico: true, descansoSeg: 60 },
        ],
      },
    ],
  },
  {
    slug: "steve-reeves",
    nome: "Corpo clássico",
    famoso: "Steve Reeves",
    resumo: "O Hércules dos anos 50. Corpo todo, 3x por semana, 8 a 12 reps.",
    frequencia: "3x por semana, em dias alternados (ex.: seg, qua, sex)",
    origem:
      "Steve Reeves, Mr. Universo e o Hércules do cinema, treinava o corpo todo 3 vezes por semana, com 3 séries de 8 a 12 repetições e movimentos controlados. A rotina original tem 13 exercícios e leva até 2 horas.",
    adaptacoes: [
      "Cortamos de 13 para 8 exercícios (cerca de 1 hora): comendo pouco, sessões muito longas atrapalham a recuperação.",
      "Saíram remada alta, bom-dia e o exercício de pescoço, que pedem técnica mais fina e forçam ombro e lombar.",
      "Agachamento com barra virou leg press, e levantamento terra virou stiff com halteres.",
      "Descanso maior que o original (era 30 a 60 s) para seguir a regra do app nos compostos.",
    ],
    fonte: {
      titulo: "Fitness Volt: Steve Reeves Bodybuilding Workout",
      url: "https://fitnessvolt.com/steve-reeves-workout/",
    },
    treinos: [
      {
        id: "steve-reeves",
        nome: "Corpo clássico",
        foco: "Corpo todo",
        duracaoMin: 60,
        itens: [
          { exerciseId: "remada-unilateral", series: 3, repsMin: 8, repsMax: 12, porLado: true, descansoSeg: 90 },
          { exerciseId: "supino-inclinado-halteres", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
          { exerciseId: "elevacao-lateral", series: 3, repsMin: 12, repsMax: 15, descansoSeg: 75 },
          { exerciseId: "leg-press", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 150 },
          { exerciseId: "stiff-halteres", series: 3, repsMin: 8, repsMax: 10, descansoSeg: 150 },
          { exerciseId: "triceps-corda", series: 3, repsMin: 10, repsMax: 15, descansoSeg: 75 },
          { exerciseId: "rosca-direta-halteres", series: 3, repsMin: 10, repsMax: 12, descansoSeg: 75 },
          { exerciseId: "panturrilha-em-pe", series: 3, repsMin: 12, repsMax: 15, descansoSeg: 60 },
        ],
      },
    ],
  },
  {
    slug: "wolverine",
    nome: "Wolverine",
    famoso: "Hugh Jackman",
    resumo: "Divisão em 4 dias, com um exercício pesado abrindo cada treino.",
    frequencia: "4x por semana (ex.: seg, ter, qui, sex)",
    origem:
      "Hugh Jackman preparou o físico do Wolverine dividindo a semana em peito e tríceps, perna, costas, e ombro e braços. Cada treino começa com um exercício pesado (supino, agachamento, barra fixa com peso ou levantamento terra) em 4x5 por porcentagem da carga máxima, seguido de séries combinadas.",
    adaptacoes: [
      "O 4x5 por porcentagem da carga máxima virou 3 séries de 6 a 10 reps com 1 a 2 na reserva: sem teste de carga máxima e sem precisar de alguém para ajudar.",
      "Agachamento com barra virou leg press; levantamento terra virou stiff com halteres; barra fixa com peso virou puxada frontal.",
      "Mergulho no banco saiu (força o ombro) e entrou tríceps testa.",
      "Os trisets viraram exercícios em sequência normal, com o descanso do app.",
    ],
    fonte: {
      titulo: "Muscle & Strength: Hugh Jackman Workout Routine",
      url: "https://www.muscleandstrength.com/workouts/hugh-jackman-workout-routine",
    },
    treinos: [
      {
        id: "wolverine-1",
        nome: "Wolverine 1 · Peito e tríceps",
        foco: "Peito, tríceps e core",
        duracaoMin: 50,
        itens: [
          { exerciseId: "supino-reto-halteres", series: 3, repsMin: 6, repsMax: 10, descansoSeg: 150 },
          { exerciseId: "supino-inclinado-halteres", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
          { exerciseId: "crucifixo-maquina", series: 3, repsMin: 12, repsMax: 15, descansoSeg: 75 },
          { exerciseId: "triceps-corda", series: 3, repsMin: 10, repsMax: 15, descansoSeg: 75 },
          { exerciseId: "prancha", series: 3, repsMin: 30, repsMax: 45, isometrico: true, descansoSeg: 60 },
        ],
      },
      {
        id: "wolverine-2",
        nome: "Wolverine 2 · Perna",
        foco: "Quadríceps, posterior, panturrilha e core",
        duracaoMin: 50,
        itens: [
          { exerciseId: "leg-press", series: 3, repsMin: 6, repsMax: 10, descansoSeg: 150 },
          { exerciseId: "agachamento-goblet", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
          { exerciseId: "mesa-flexora", series: 3, repsMin: 10, repsMax: 15, descansoSeg: 75 },
          { exerciseId: "panturrilha-em-pe", series: 3, repsMin: 12, repsMax: 15, descansoSeg: 60 },
          { exerciseId: "prancha", series: 3, repsMin: 30, repsMax: 45, isometrico: true, descansoSeg: 60 },
        ],
      },
      {
        id: "wolverine-3",
        nome: "Wolverine 3 · Costas",
        foco: "Costas e posterior de ombro",
        duracaoMin: 50,
        itens: [
          { exerciseId: "puxada-frontal", series: 3, repsMin: 6, repsMax: 10, descansoSeg: 150 },
          { exerciseId: "remada-maquina-neutra", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
          { exerciseId: "remada-baixa", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
          { exerciseId: "face-pull", series: 3, repsMin: 12, repsMax: 15, descansoSeg: 75 },
        ],
      },
      {
        id: "wolverine-4",
        nome: "Wolverine 4 · Ombro e braços",
        foco: "Posterior, ombro, bíceps e tríceps",
        duracaoMin: 55,
        itens: [
          { exerciseId: "stiff-halteres", series: 3, repsMin: 6, repsMax: 10, descansoSeg: 150 },
          { exerciseId: "desenvolvimento-halteres", series: 3, repsMin: 8, repsMax: 12, descansoSeg: 120 },
          { exerciseId: "elevacao-lateral", series: 3, repsMin: 12, repsMax: 15, descansoSeg: 75 },
          { exerciseId: "rosca-direta-halteres", series: 3, repsMin: 10, repsMax: 12, descansoSeg: 75 },
          { exerciseId: "triceps-testa-barra-w", series: 3, repsMin: 10, repsMax: 12, descansoSeg: 75 },
        ],
      },
    ],
  },
];

export function getPrograma(slug: string): ProgramaFamoso | undefined {
  return programasFamosos.find((p) => p.slug === slug);
}
