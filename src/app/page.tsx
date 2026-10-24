"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getWorkout, sequenciaPorPlano } from "@/data/workouts";
import { emAdaptacao, proximoTreino, useAppState } from "@/lib/storage";

export default function Hoje() {
  const router = useRouter();
  const { state, carregado } = useAppState();

  useEffect(() => {
    if (carregado && !state.aceitouAviso) router.replace("/boas-vindas");
  }, [carregado, state.aceitouAviso, router]);

  if (!carregado || !state.aceitouAviso) return null;

  const workout = getWorkout(proximoTreino(state))!;
  const adaptacao = emAdaptacao(state);
  const seq = sequenciaPorPlano[state.plano];
  const ultimo = state.historico.at(-1);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-sm text-muted">Próximo treino</p>
        <h1 className="text-3xl font-bold">
          {workout.id} · {workout.nome}
        </h1>
        <p className="text-muted">{workout.foco}</p>
      </header>

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
        <Link
          href={`/treinos/${workout.id}`}
          className="rounded-2xl bg-accent py-4 text-center text-lg font-bold text-accent-ink"
        >
          Começar
        </Link>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-muted">Sua sequência</h2>
        <div className="flex gap-2">
          {seq.map((id) => (
            <span
              key={id}
              className={`flex size-11 items-center justify-center rounded-xl text-lg font-bold ${
                id === workout.id
                  ? "bg-accent text-accent-ink"
                  : "bg-surface-2 text-muted"
              }`}
            >
              {id}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted">
          {ultimo
            ? `Último treino: ${ultimo.workoutId} em ${new Date(ultimo.data).toLocaleDateString("pt-BR")}. ${state.historico.length} no total.`
            : "Nos dias sem treino, caminhe de 30 a 45 minutos."}
        </p>
      </section>
    </div>
  );
}

function Stat({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <p className="text-muted">{label}</p>
      <p className="font-semibold">{valor}</p>
    </div>
  );
}
