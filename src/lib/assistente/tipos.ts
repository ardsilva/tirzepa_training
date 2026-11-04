import type { Workout } from "@/data/types";

/** Uma fala na conversa com o assistente. */
export type Fala = { papel: "usuario" | "assistente"; texto: string };

/** O que o app conta ao assistente sobre o usuário (nada de saúde). */
export type ContextoUsuario = {
  plano: 3 | 4;
  emAdaptacao: boolean;
  /** Nome do último treino feito, ex.: "B · Puxar". */
  ultimoTreino?: string;
};

export type PedidoAssistente = { falas: Fala[]; contexto: ContextoUsuario };

/** Resposta já validada que a rota devolve para a tela. */
export type RespostaAssistente = {
  mensagem: string;
  /** Treino montado; null quando o pedido não era de treino. */
  treino: Workout | null;
  /** Exercícios citados numa dúvida de execução, para a tela mostrar as dicas. */
  exercicios: string[];
};

export const LIMITE_CARACTERES = 500;
export const LIMITE_FALAS = 6;
