"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PLANO_PADRAO,
  SEMANAS_ADAPTACAO,
  sequenciaPorPlano,
} from "@/data/workouts";
import type { Plano, WorkoutId } from "@/data/types";

// MVP sem login: tudo fica no localStorage do aparelho.
// Na fase 2 isso migra para o Supabase (ver docs/plano.md).
const KEY = "tirzepa-training:v1";

/** `workoutId` é "A" a "D" no plano ou o id de um treino de famoso. */
export type TreinoFeito = { workoutId: string; data: string };

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
  workoutId: string,
): AppState {
  const seq = sequenciaPorPlano[state.plano];
  const idx = seq.indexOf(workoutId as WorkoutId);
  const agora = new Date().toISOString();
  return {
    ...state,
    inicio: state.inicio ?? agora,
    // Se o treino feito não era o próximo, a sequência continua a partir dele.
    // Treino de famoso (fora do plano) não mexe na sequência.
    proximoIndex: idx >= 0 ? idx + 1 : state.proximoIndex,
    historico: [...state.historico, { workoutId, data: agora }],
  };
}
