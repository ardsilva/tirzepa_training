import { getExercise } from "@/data/exercises";
import { workouts } from "@/data/workouts";
import type { Workout, WorkoutItem } from "@/data/types";
import type { RespostaAssistente } from "./tipos";

const MAX_ITENS = 8;
const limitar = (n: unknown, min: number, max: number, padrao: number) => {
  const v = typeof n === "number" && Number.isFinite(n) ? Math.round(n) : padrao;
  return Math.min(max, Math.max(min, v));
};
const texto = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Exercícios contados por lado nos treinos do plano (ex.: serrote).
const porLado = new Set(
  workouts.flatMap((w) => w.itens.filter((i) => i.porLado).map((i) => i.exerciseId)),
);

/** Ajusta um item às faixas do plano; undefined se o exercício não existe. */
export function validarItem(bruto: unknown): WorkoutItem | undefined {
  if (!bruto || typeof bruto !== "object") return undefined;
  const b = bruto as Record<string, unknown>;
  const ex = typeof b.exerciseId === "string" ? getExercise(b.exerciseId) : undefined;
  if (!ex) return undefined;

  const series = limitar(b.series, 2, 4, 3);
  if (ex.animacao.estatica) {
    return { exerciseId: ex.id, series, repsMin: 30, repsMax: 45, isometrico: true, descansoSeg: 60 };
  }
  const [rMin, rMax, dMin, dMax] = ex.tipo === "composto" ? [6, 12, 120, 180] : [10, 15, 60, 90];
  let repsMin = limitar(b.repsMin, rMin, rMax, rMin + 2);
  let repsMax = limitar(b.repsMax, rMin, rMax, rMax);
  if (repsMin > repsMax) [repsMin, repsMax] = [repsMax, repsMin];
  const descansoSeg = limitar(b.descansoSeg, dMin, dMax, dMin);
  return {
    exerciseId: ex.id,
    series,
    repsMin,
    repsMax,
    descansoSeg,
    ...(porLado.has(ex.id) ? { porLado: true } : {}),
  };
}

/** Estimativa: ~45 s por série + descanso + 5 min de aquecimento. */
function duracao(itens: WorkoutItem[]): number {
  const seg = itens.reduce((acc, i) => acc + i.series * (45 + i.descansoSeg), 0);
  return Math.round(seg / 60 / 5) * 5 + 5;
}

/** Transforma a resposta crua do modelo em algo seguro para a tela. */
export function validarResposta(bruto: unknown, idTreino: string): RespostaAssistente {
  const b = (bruto && typeof bruto === "object" ? bruto : {}) as Record<string, unknown>;
  const mensagem = texto(b.mensagem, 800) || "Não entendi. Pode pedir de outro jeito?";

  let treino: Workout | null = null;
  const t = b.treino as Record<string, unknown> | null | undefined;
  if (t && typeof t === "object" && Array.isArray(t.itens)) {
    const vistos = new Set<string>();
    const itens = t.itens
      .map(validarItem)
      .filter((i): i is WorkoutItem => !!i && !vistos.has(i.exerciseId) && !!vistos.add(i.exerciseId))
      .slice(0, MAX_ITENS);
    // Compostos antes dos isolados, mantendo a ordem do modelo dentro de cada grupo.
    itens.sort(
      (a, c) =>
        Number(getExercise(a.exerciseId)?.tipo === "isolado") -
        Number(getExercise(c.exerciseId)?.tipo === "isolado"),
    );
    if (itens.length > 0) {
      treino = {
        id: idTreino,
        nome: texto(t.nome, 40) || "Treino do assistente",
        foco: texto(t.foco, 80) || "Montado pelo assistente",
        duracaoMin: duracao(itens),
        itens,
      };
    }
  }

  const exercicios = Array.isArray(b.exercicios)
    ? [...new Set(b.exercicios.filter((id): id is string => typeof id === "string" && !!getExercise(id)))].slice(0, 4)
    : [];

  return { mensagem, treino, exercicios };
}

// Sinais de alerta: a rota responde sem chamar a IA.
const ALERTA = /dor no peito|falta de ar|desmai|tontura|palpita|vis[aã]o turva|dor forte/i;

export function ehAlerta(textoUsuario: string): boolean {
  return ALERTA.test(textoUsuario);
}

export const RESPOSTA_ALERTA: RespostaAssistente = {
  mensagem:
    "Pare o treino agora e procure um médico. Dor no peito, falta de ar, tontura ou desmaio não são normais durante o exercício, principalmente em quem usa Mounjaro. Se for forte, ligue para o SAMU (192).",
  treino: null,
  exercicios: [],
};
