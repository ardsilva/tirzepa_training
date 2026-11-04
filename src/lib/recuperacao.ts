// Sugestão do dia: qual treino faz sentido hoje, dado o que já trabalhou.
// Tudo em dias de calendário local (não em horas). Ver docs/plano.md.

import { getAtividade } from "@/data/atividades";
import { getExercise } from "@/data/exercises";
import {
  ehDoPlano,
  getTreino,
  getWorkout,
  sequenciaPorPlano,
  tituloTreino,
} from "@/data/workouts";
import type { Esforco, GrupoMuscular, WorkoutId } from "@/data/types";
import { type AppState, proximoTreino, type TreinoFeito } from "@/lib/storage";

/** Dias de descanso exigidos depois de cada esforço. Leve não conta. */
const DIAS_DE_DESCANSO: Record<Esforco, number> = {
  pesado: 2,
  moderado: 1,
  leve: 0,
};

export type Sugestao =
  | { tipo: "treino"; workoutId: WorkoutId; motivo: string }
  | { tipo: "descanso"; motivo: string };

export type EntradaRecente = {
  nome: string;
  /** ISO, como foi salvo. */
  data: string;
  tipo: "treino" | "atividade";
};

/** Esforço já feito: treino do plano/famoso no histórico, ou atividade avulsa. */
type EsforcoFeito = {
  nome: string;
  data: Date;
  esforco: Esforco;
  grupos: GrupoMuscular[];
};

const NOMES_GRUPO: Partial<Record<GrupoMuscular, string>> = {
  quadriceps: "quadríceps",
  posterior: "posterior de coxa",
  gluteo: "glúteo",
  triceps: "tríceps",
  biceps: "bíceps",
};

/** Dias de calendário entre duas datas (b - a), ignorando a hora. */
export function diasEntre(a: Date, b: Date): number {
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((ub - ua) / 86_400_000);
}

function nomeTreino(t: TreinoFeito): string {
  const w = getTreino(t.workoutId);
  return w ? tituloTreino(w) : (t.nome ?? t.workoutId);
}

function gruposDosExercicios(ids: string[]): GrupoMuscular[] {
  const grupos = new Set<GrupoMuscular>();
  for (const id of ids) {
    for (const g of getExercise(id)?.grupos ?? []) grupos.add(g);
  }
  return [...grupos];
}

/**
 * Grupos que o treino cansou: `principais` no plano; senão, os exercícios feitos
 * (treinos do assistente não ficam no catálogo) ou, em registros antigos, os do treino.
 */
function gruposDoTreino(t: TreinoFeito): GrupoMuscular[] {
  const w = getTreino(t.workoutId);
  if (ehDoPlano(t.workoutId) && w?.principais) return w.principais;
  const feitos = (t.exercicios ?? []).filter((e) => e.seriesFeitas > 0).map((e) => e.exerciseId);
  if (feitos.length) return gruposDosExercicios(feitos);
  return gruposDosExercicios((w?.itens ?? []).map((i) => i.exerciseId));
}

function esforcosDoEstado(state: AppState): EsforcoFeito[] {
  const lista: EsforcoFeito[] = [];
  for (const t of state.historico) {
    const data = new Date(t.data);
    if (Number.isNaN(data.getTime())) continue;
    lista.push({ nome: nomeTreino(t), data, esforco: "pesado", grupos: gruposDoTreino(t) });
  }
  for (const a of state.atividades ?? []) {
    const data = new Date(a.data);
    const at = getAtividade(a.atividadeId);
    if (Number.isNaN(data.getTime()) || !at) continue;
    lista.push({ nome: at.nome, data, esforco: at.esforco, grupos: at.grupos });
  }
  return lista;
}

/** Esforços não leves que ainda não cumpriram o descanso para esse grupo. */
function bloqueios(grupo: GrupoMuscular, esforcos: EsforcoFeito[], hoje: Date): EsforcoFeito[] {
  return esforcos.filter(
    (e) =>
      e.esforco !== "leve" &&
      e.grupos.includes(grupo) &&
      // Data no futuro (relógio do aparelho mudou) não bloqueia.
      diasEntre(e.data, hoje) >= 0 &&
      diasEntre(e.data, hoje) < DIAS_DE_DESCANSO[e.esforco],
  );
}

function juntar(itens: string[]): string {
  if (itens.length <= 1) return itens.join("");
  return `${itens.slice(0, -1).join(", ")} e ${itens[itens.length - 1]}`;
}

function nomeGrupo(g: GrupoMuscular): string {
  return NOMES_GRUPO[g] ?? g;
}

export function sugestaoDoDia(state: AppState, agora = new Date()): Sugestao {
  const esforcos = esforcosDoEstado(state);
  const naoLeves = esforcos.filter((e) => e.esforco !== "leve");

  // a. Já treinou hoje.
  const doHoje = naoLeves.find((e) => diasEntre(e.data, agora) === 0);
  if (doHoje) {
    return {
      tipo: "descanso",
      motivo: `Hoje você já fez ${doHoje.nome}. Descanse ou faça uma caminhada leve.`,
    };
  }

  // b. Três dias seguidos de esforço (ontem, anteontem e há três dias).
  const tresDias = [1, 2, 3].every((d) =>
    naoLeves.some((e) => diasEntre(e.data, agora) === d),
  );
  if (tresDias) {
    return {
      tipo: "descanso",
      motivo: "Três dias seguidos de esforço. Hoje é dia de descanso ou caminhada leve em zona 2.",
    };
  }

  // c. Primeiro treino da sequência (a partir do próximo) com os músculos descansados.
  const seq = sequenciaPorPlano[state.plano];
  const proximo = proximoTreino(state);
  const inicio = seq.indexOf(proximo);
  for (let i = 0; i < seq.length; i++) {
    const id = seq[(inicio + i) % seq.length];
    const workout = getWorkout(id);
    const principais = workout?.principais ?? [];
    const cansados = principais.filter((g) => bloqueios(g, esforcos, agora).length > 0);
    if (!workout || cansados.length > 0) continue;

    if (i === 0) {
      return {
        tipo: "treino",
        workoutId: id,
        motivo: `${tituloTreino(workout)} é o próximo da sequência e esses músculos já descansaram.`,
      };
    }

    const proximoW = getWorkout(proximo)!;
    const cansadosProximo = (proximoW.principais ?? []).filter(
      (g) => bloqueios(g, esforcos, agora).length > 0,
    );
    const culpados = cansadosProximo.flatMap((g) => bloqueios(g, esforcos, agora));
    const maisRecente = culpados.reduce((a, b) =>
      diasEntre(b.data, agora) < diasEntre(a.data, agora) ? b : a,
    );
    const dias = diasEntre(maisRecente.data, agora);
    const quando = dias === 1 ? "ontem" : `há ${dias} dias`;
    const verbo = cansadosProximo.length > 1 ? "trabalharam" : "trabalhou";
    return {
      tipo: "treino",
      workoutId: id,
      motivo: `${tituloTreino(proximoW)} ainda não: ${juntar(
        cansadosProximo.map(nomeGrupo),
      )} ${verbo} ${quando} (${maisRecente.nome}). ${tituloTreino(workout)} já descansou.`,
    };
  }

  // d. Nenhum treino do plano com os músculos descansados.
  return {
    tipo: "descanso",
    motivo: "Os músculos dos treinos ainda estão se recuperando. Descanse ou faça uma caminhada leve.",
  };
}

/** Treinos e atividades dos últimos `dias` dias (inclui hoje), mais recentes primeiro. */
export function ultimosDias(state: AppState, dias = 3, agora = new Date()): EntradaRecente[] {
  const entradas: EntradaRecente[] = [
    ...state.historico.map((t) => ({
      nome: nomeTreino(t),
      data: t.data,
      tipo: "treino" as const,
    })),
    ...(state.atividades ?? []).map((a) => ({
      nome: getAtividade(a.atividadeId)?.nome ?? a.atividadeId,
      data: a.data,
      tipo: "atividade" as const,
    })),
  ];
  return entradas
    .filter((e) => {
      const d = new Date(e.data);
      if (Number.isNaN(d.getTime())) return false;
      const diff = diasEntre(d, agora);
      return diff >= 0 && diff < dias;
    })
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
}
