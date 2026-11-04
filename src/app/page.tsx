"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { atividades } from "@/data/atividades";
import {
  getTreino,
  getWorkout,
  sequenciaPorPlano,
  tituloTreino,
  treinosFamosos,
} from "@/data/workouts";
import type { WorkoutId } from "@/data/types";
import { diasEntre, sugestaoDoDia, ultimosDias } from "@/lib/recuperacao";
import {
  emAdaptacao,
  lerSessao,
  proximoTreino,
  registrarAtividade,
  salvarSessao,
  treinoEmAndamento,
  useAppState,
} from "@/lib/storage";

export default function Hoje() {
  const router = useRouter();
  const { state, update, carregado } = useAppState();
  // null = segue a sugestão do dia; o usuário pode escolher qualquer treino.
  const [escolhido, setEscolhido] = useState<WorkoutId | null>(null);
  const [emAndamento, setEmAndamento] = useState<string | null>(null);
  const [registrando, setRegistrando] = useState(false);
  const [diaAtividade, setDiaAtividade] = useState<"hoje" | "ontem">("hoje");

  useEffect(() => {
    if (carregado && !state.aceitouAviso) router.replace("/boas-vindas");
  }, [carregado, state.aceitouAviso, router]);

  useEffect(() => {
    if (carregado) setEmAndamento(
        treinoEmAndamento([...sequenciaPorPlano[state.plano], ...treinosFamosos.map((w) => w.id)]),
      );
  }, [carregado, state.plano]);

  if (!carregado || !state.aceitouAviso) return null;

  const sugerido = proximoTreino(state);
  const sugestao = sugestaoDoDia(state);
  const padrao: WorkoutId = sugestao.tipo === "treino" ? sugestao.workoutId : sugerido;
  const workout = getWorkout(escolhido ?? padrao)!;
  const eSugestao = sugestao.tipo === "treino" && workout.id === sugestao.workoutId;
  const adaptacao = emAdaptacao(state);
  const seq = sequenciaPorPlano[state.plano];
  const ultimo = state.historico.at(-1);
  const ultimoTreino = ultimo && getTreino(ultimo.workoutId);
  const treinoAndamento = emAndamento ? getTreino(emAndamento) : undefined;
  const tituloAndamento = treinoAndamento ? tituloTreino(treinoAndamento) : emAndamento;
  const recentes = ultimosDias(state);

  function comecar() {
    const sessao = lerSessao(workout.id);
    if (!sessao.inicio) salvarSessao(workout.id, { ...sessao, inicio: new Date().toISOString() });
    router.push(`/treinos/${workout.id}`);
  }

  function registrar(atividadeId: string) {
    const dia = new Date();
    if (diaAtividade === "ontem") dia.setDate(dia.getDate() - 1);
    update((s) => registrarAtividade(s, atividadeId, dia));
    setRegistrando(false);
  }

  return (
    <div className="flex flex-col gap-6">
      {emAndamento && emAndamento !== workout.id && (
        <Link
          href={`/treinos/${emAndamento}`}
          className="flex items-center justify-between rounded-2xl bg-accent/10 px-4 py-3 text-accent"
        >
          <span className="text-sm">{tituloAndamento} em andamento</span>
          <span className="text-sm font-semibold">Continuar →</span>
        </Link>
      )}

      <section className="flex flex-col gap-2 rounded-3xl border border-border bg-surface p-5">
        <p className="text-sm text-muted">Sugestão de hoje</p>
        {sugestao.tipo === "descanso" && (
          <p className="text-lg font-bold">Descanso ou caminhada</p>
        )}
        <p>{sugestao.motivo}</p>
        {sugestao.tipo === "descanso" && (
          <>
            <Link href="/cardio" className="inline-flex min-h-11 items-center self-start text-sm font-semibold text-accent">
              Ver opções de cardio →
            </Link>
            <p className="text-sm text-muted">
              Quer treinar mesmo assim? Escolha o treino abaixo.
            </p>
          </>
        )}
      </section>

      <header>
        <p className="text-sm text-muted">
          {eSugestao
            ? "Treino sugerido"
            : escolhido === null
              ? "Próximo da sequência"
              : "Treino escolhido"}
        </p>
        <h1 className="text-3xl font-bold">
          {workout.id} · {workout.nome}
        </h1>
        <p className="text-muted">{workout.foco}</p>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-muted">Qual treino hoje?</h2>
        <div className="flex gap-2" role="radiogroup" aria-label="Escolha o treino">
          {seq.map((id) => {
            const ativo = id === workout.id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={ativo}
                onClick={() => setEscolhido(id)}
                className={`relative flex size-12 items-center justify-center rounded-xl text-lg font-bold ${
                  ativo
                    ? "bg-accent text-accent-ink"
                    : "bg-surface-2 text-muted"
                }`}
              >
                {id}
                {id === padrao && (
                  <span
                    aria-hidden
                    className={`absolute -top-1 -right-1 size-3 rounded-full border-2 border-background ${
                      ativo ? "bg-foreground" : "bg-accent"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted">
          O ponto marca o sugerido para hoje. Escolheu outro? A sequência
          continua a partir dele.
        </p>
      </section>

      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-5">
        <div className="flex gap-6 text-sm">
          <Stat label="Exercícios" valor={String(workout.itens.length)} />
          <Stat label="Duração" valor={`~${workout.duracaoMin} min`} />
          <Stat label="Plano" valor={`${state.plano}x/sem`} />
        </div>
        {adaptacao && (
          <p className="rounded-xl bg-accent/10 px-3 py-2 text-sm text-accent">
            Fase de adaptação: 2 séries por exercício e carga confortável.
          </p>
        )}
        <button
          type="button"
          onClick={comecar}
          className="rounded-2xl bg-accent py-4 text-center text-lg font-bold text-accent-ink"
        >
          {workout.id === emAndamento ? "Continuar" : "Começar"} treino {workout.id}
        </button>
      </div>

      <Link
        href="/assistente"
        className="flex min-h-11 items-center justify-between rounded-2xl border border-accent/40 bg-accent/5 p-4"
      >
        <span>
          <span className="block font-semibold">Montar treino com IA</span>
          <span className="block text-sm text-muted">
            &quot;Quero treinar braço&quot;, &quot;só tenho 30 minutos&quot;, dúvidas de execução
          </span>
        </span>
        <span className="text-accent" aria-hidden>
          →
        </span>
      </Link>

      {ultimo ? (
        <Link href="/historico" className="text-sm text-muted">
          Último treino: {ultimoTreino ? tituloTreino(ultimoTreino) : ultimo.workoutId} em{" "}
          {new Date(ultimo.data).toLocaleDateString("pt-BR")}.{" "}
          {state.historico.length} no total.{" "}
          <span className="text-accent">Ver histórico →</span>
        </Link>
      ) : (
        <p className="text-sm text-muted">
          Nos dias sem treino, faça um cardio leve ou caminhe de 30 a 45 minutos.
        </p>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-muted">Fez outra coisa?</h2>
        <button
          type="button"
          aria-expanded={registrando}
          onClick={() => setRegistrando((v) => !v)}
          className="min-h-11 rounded-2xl border border-border bg-surface px-4 py-3 text-left font-semibold"
        >
          Registrar atividade
        </button>
        {registrando && (
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4">
            <div className="flex gap-2" role="radiogroup" aria-label="Dia da atividade">
              {(["hoje", "ontem"] as const).map((op) => {
                const ativo = diaAtividade === op;
                return (
                  <button
                    key={op}
                    type="button"
                    role="radio"
                    aria-checked={ativo}
                    onClick={() => setDiaAtividade(op)}
                    className={`min-h-11 flex-1 rounded-xl text-sm font-semibold ${
                      ativo ? "bg-accent text-accent-ink" : "bg-surface-2 text-muted"
                    }`}
                  >
                    {op === "hoje" ? "Hoje" : "Ontem"}
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {atividades.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => registrar(a.id)}
                  className="min-h-11 rounded-xl bg-surface-2 px-3 py-2 text-left text-sm font-medium"
                >
                  {a.nome}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {recentes.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-muted">Últimos 3 dias</h2>
          <ul className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-4 text-sm">
            {recentes.map((e) => (
              <li key={`${e.tipo}-${e.data}`}>
                {rotuloDia(e.data)} · {e.nome}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Link href="/cardio" className="rounded-2xl border border-border bg-surface p-4">
          <p className="font-semibold">Cardio</p>
          <p className="text-sm text-muted">Para os dias sem musculação</p>
        </Link>
        <Link href="/famosos" className="rounded-2xl border border-border bg-surface p-4">
          <p className="font-semibold">Treinos de famosos</p>
          <p className="text-sm text-muted">Arnold, Reeves, Wolverine</p>
        </Link>
      </div>
    </div>
  );
}

function rotuloDia(data: string): string {
  const diff = diasEntre(new Date(data), new Date());
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Ontem";
  return `Há ${diff} dias`;
}

function Stat({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <p className="text-muted">{label}</p>
      <p className="font-semibold">{valor}</p>
    </div>
  );
}
