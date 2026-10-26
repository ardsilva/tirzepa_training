"use client";

import Link from "next/link";
import { getExercise } from "@/data/exercises";
import { getTreino, tituloTreino } from "@/data/workouts";
import { formatDuracao } from "@/lib/format";
import { removerDoHistorico, type TreinoFeito, useAppState } from "@/lib/storage";

const formatoData = new Intl.DateTimeFormat("pt-BR", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const maiuscula = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const formatoHora = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });

export function Historico() {
  const { state, update, carregado } = useAppState();
  if (!carregado) return null;

  const treinos = [...state.historico].reverse();

  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1 className="text-3xl font-bold">Histórico</h1>
        <p className="text-muted">
          {treinos.length
            ? `${treinos.length} ${treinos.length === 1 ? "treino salvo" : "treinos salvos"} neste aparelho`
            : "Os treinos que você encerrar aparecem aqui."}
        </p>
      </header>

      {treinos.length === 0 && (
        <Link
          href="/"
          className="rounded-2xl bg-accent py-4 text-center text-lg font-bold text-accent-ink"
        >
          Ir para o treino de hoje
        </Link>
      )}

      <ol className="flex flex-col gap-3">
        {treinos.map((t) => (
          <li key={t.data}>
            <Registro
              treino={t}
              onApagar={() => {
                if (window.confirm("Apagar este treino do histórico?")) {
                  update((s) => removerDoHistorico(s, t.data));
                }
              }}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

function Registro({ treino, onApagar }: { treino: TreinoFeito; onApagar: () => void }) {
  const workout = getTreino(treino.workoutId);
  const fim = new Date(treino.data);
  const inicio = treino.inicio ? new Date(treino.inicio) : null;
  const exercicios = treino.exercicios ?? [];
  const feitas = exercicios.reduce((acc, e) => acc + e.seriesFeitas, 0);
  const previstas = exercicios.reduce((acc, e) => acc + e.seriesPrevistas, 0);

  return (
    <details className="group rounded-2xl border border-border bg-surface">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs text-muted">{maiuscula(formatoData.format(fim))}</p>
          <p className="font-semibold">
            {workout ? tituloTreino(workout) : treino.workoutId}
          </p>
          <p className="text-sm text-muted">
            {inicio && `${formatoHora.format(inicio)} às ${formatoHora.format(fim)}`}
            {treino.duracaoSeg !== undefined && ` · ${formatDuracao(treino.duracaoSeg)}`}
            {previstas > 0 && ` · ${feitas}/${previstas} séries`}
          </p>
        </div>
        <span aria-hidden className="mt-1 text-muted transition-transform group-open:rotate-90">
          ›
        </span>
      </summary>

      <div className="flex flex-col gap-3 border-t border-border px-4 py-3">
        {exercicios.length > 0 ? (
          <ul className="flex flex-col gap-2 text-sm">
            {exercicios.map((e) => (
              <li key={e.exerciseId} className="flex justify-between gap-3">
                <span className={e.seriesFeitas === 0 ? "text-muted line-through" : ""}>
                  {getExercise(e.exerciseId)?.nome ?? e.exerciseId}
                </span>
                <span className="shrink-0 text-muted tabular-nums">
                  {e.seriesFeitas}/{e.seriesPrevistas}
                  {e.cargaKg ? ` · ${e.cargaKg} kg` : ""}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">Registro antigo, sem detalhes por exercício.</p>
        )}
        {treino.nota && (
          <p className="rounded-xl bg-surface-2 px-3 py-2 text-sm">{treino.nota}</p>
        )}
        <button type="button" onClick={onApagar} className="min-h-11 self-start text-sm text-danger">
          Apagar do histórico
        </button>
      </div>
    </details>
  );
}
