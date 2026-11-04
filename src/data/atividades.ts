import type { Atividade } from "./types";

// Atividades feitas fora do plano. Elas não entram na sequência de treinos
// (ver src/lib/recuperacao.ts para como pesam na sugestão do dia).
export const atividades: Atividade[] = [
  {
    id: "futebol",
    nome: "Futebol",
    grupos: ["quadriceps", "posterior", "gluteo", "panturrilha"],
    esforco: "pesado",
  },
  {
    id: "corrida",
    nome: "Corrida",
    grupos: ["quadriceps", "posterior", "panturrilha"],
    esforco: "moderado",
  },
  {
    id: "bike",
    nome: "Bike",
    grupos: ["quadriceps", "gluteo"],
    esforco: "moderado",
  },
  {
    id: "natacao",
    nome: "Natação",
    grupos: ["costas", "ombro"],
    esforco: "moderado",
  },
  {
    id: "upper-livre",
    nome: "Treino de superior por conta",
    grupos: ["peito", "costas", "ombro", "biceps", "triceps"],
    esforco: "pesado",
  },
  {
    id: "lower-livre",
    nome: "Treino de perna por conta",
    grupos: ["quadriceps", "posterior", "gluteo", "panturrilha"],
    esforco: "pesado",
  },
  {
    id: "caminhada",
    nome: "Caminhada",
    grupos: [],
    esforco: "leve",
  },
];

export const atividadesById: Record<string, Atividade> = Object.fromEntries(
  atividades.map((a) => [a.id, a]),
);

export function getAtividade(id: string): Atividade | undefined {
  return atividadesById[id];
}
