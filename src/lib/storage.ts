"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PLANO_PADRAO,
  SEMANAS_ADAPTACAO,
  sequenciaPorPlano,
} from "@/data/workouts";
import type { Plano, Workout, WorkoutId } from "@/data/types";

// MVP sem login: tudo fica no localStorage do aparelho.
// Na fase 2 isso migra para o Supabase (ver docs/plano.md).
const KEY = "tirzepa-training:v1";

/** O que foi feito em um exercício numa sessão. */
export type ExercicioFeito = {
  exerciseId: string;
  seriesFeitas: number;
  seriesPrevistas: number;
  /** Carga (kg) usada; ausente se o usuário não anotou. */
  cargaKg?: number;
};

// Mesmo formato da futura tabela `treinos_feitos` no Supabase.
// Registros antigos (antes do Começar/Encerrar) só têm workoutId e data.
export type TreinoFeito = {
  /** "A" a "D" no plano ou o id de um treino de famoso. */
  workoutId: string;
  /** Fim do treino (ISO). */
  data: string;
  /** Início do treino (ISO). */
  inicio?: string;
  duracaoSeg?: number;
  exercicios?: ExercicioFeito[];
  nota?: string;
};

/** Treino em andamento, salvo para sobreviver a um reload no meio da academia. */
export type SessaoAtiva = {
  /** Início (ISO); null enquanto o usuário não tocou em Começar. */
  inicio: string | null;
  /** Séries marcadas por exercício. */
  feitas: Record<string, number>;
  nota: string;
};

export type AppState = {
  aceitouAviso: boolean;
  plano: Plano;
  /** Data (ISO) do primeiro treino, usada para a fase de adaptação. */
  inicio: string | null;
  proximoIndex: number;
  historico: TreinoFeito[];
  /** Última carga usada (kg) por exercício. */
  cargas: Record<string, number>;
};

const estadoInicial: AppState = {
  aceitouAviso: false,
  plano: PLANO_PADRAO,
  inicio: null,
  proximoIndex: 0,
  historico: [],
  cargas: {},
};

function ler(): AppState {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return estadoInicial;
    return { ...estadoInicial, ...JSON.parse(raw) };
  } catch {
    return estadoInicial;
  }
}

function salvar(state: AppState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Modo privado do Safari pode bloquear o storage; o app segue sem salvar.
  }
}

export function useAppState() {
  const [state, setState] = useState<AppState>(estadoInicial);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setState(ler());
    setCarregado(true);
  }, []);

  // Salva de forma síncrona: a página pode navegar logo depois do update
  // (ex.: onboarding), e um updater do setState nunca chegaria a rodar.
  const update = useCallback((fn: (s: AppState) => AppState) => {
    const novo = fn(ler());
    salvar(novo);
    setState(novo);
  }, []);

  return { state, update, carregado };
}

export function proximoTreino(state: AppState): WorkoutId {
  const seq = sequenciaPorPlano[state.plano];
  return seq[state.proximoIndex % seq.length];
}

export function emAdaptacao(state: AppState, hoje = new Date()): boolean {
  if (!state.inicio) return true;
  const dias = (hoje.getTime() - new Date(state.inicio).getTime()) / 86_400_000;
  return dias < SEMANAS_ADAPTACAO * 7;
}

export function concluirTreino(
  state: AppState,
  workout: Workout,
  sessao: SessaoAtiva,
  seriesDe: (n: number) => number,
): AppState {
  const seq = sequenciaPorPlano[state.plano];
  const idx = seq.indexOf(workout.id as WorkoutId);
  const fim = new Date();
  const inicio = sessao.inicio ?? fim.toISOString();
  const exercicios: ExercicioFeito[] = workout.itens.map((item) => {
    const seriesPrevistas = seriesDe(item.series);
    const seriesFeitas = Math.min(sessao.feitas[item.exerciseId] ?? 0, seriesPrevistas);
    const cargaKg = seriesFeitas > 0 ? state.cargas[item.exerciseId] : undefined;
    return { exerciseId: item.exerciseId, seriesFeitas, seriesPrevistas, cargaKg };
  });
  const nota = sessao.nota.trim();
  const registro: TreinoFeito = {
    workoutId: workout.id,
    data: fim.toISOString(),
    inicio,
    duracaoSeg: Math.max(0, Math.round((fim.getTime() - new Date(inicio).getTime()) / 1000)),
    exercicios,
    ...(nota ? { nota } : {}),
  };
  return {
    ...state,
    inicio: state.inicio ?? inicio,
    // Se o treino feito não era o próximo, a sequência continua a partir dele.
    // Treino de famoso (fora do plano) não mexe na sequência.
    proximoIndex: idx >= 0 ? idx + 1 : state.proximoIndex,
    historico: [...state.historico, registro],
  };
}

export function removerDoHistorico(state: AppState, data: string): AppState {
  return { ...state, historico: state.historico.filter((t) => t.data !== data) };
}

// --- Sessão em andamento (uma chave por treino) ---

const sessaoKey = (id: string) => `tirzepa-training:sessao:${id}`;
const sessaoVazia: SessaoAtiva = { inicio: null, feitas: {}, nota: "" };

export function lerSessao(id: string): SessaoAtiva {
  try {
    const raw = window.localStorage.getItem(sessaoKey(id));
    if (!raw) return sessaoVazia;
    const dados = JSON.parse(raw);
    // Formato antigo: só o mapa de séries feitas.
    if (!("feitas" in dados)) return { ...sessaoVazia, feitas: dados };
    return { ...sessaoVazia, ...dados };
  } catch {
    return sessaoVazia;
  }
}

export function salvarSessao(id: string, sessao: SessaoAtiva) {
  try {
    window.localStorage.setItem(sessaoKey(id), JSON.stringify(sessao));
  } catch {}
}

export function apagarSessao(id: string) {
  try {
    window.localStorage.removeItem(sessaoKey(id));
  } catch {}
}

/** Treino já começado e ainda não encerrado, se houver. */
export function treinoEmAndamento(ids: string[]): string | null {
  return ids.find((id) => lerSessao(id).inicio !== null) ?? null;
}
