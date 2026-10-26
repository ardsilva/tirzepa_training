"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RestTimer } from "@/components/RestTimer";
import { getExercise } from "@/data/exercises";
import { SERIES_ADAPTACAO } from "@/data/workouts";
import type { Workout } from "@/data/types";
import { formatCronometro, formatDescanso, formatReps } from "@/lib/format";
import {
  apagarSessao,
  concluirTreino,
  emAdaptacao,
  lerSessao,
  salvarSessao,
  type SessaoAtiva,
  useAppState,
} from "@/lib/storage";

export function WorkoutSession({ workout }: { workout: Workout }) {
  const router = useRouter();
  const { state, update, carregado } = useAppState();
  const [sessao, setSessao] = useState<SessaoAtiva | null>(null);
  const [descansoAte, setDescansoAte] = useState<number | null>(null);

  useEffect(() => {
    setSessao(lerSessao(workout.id));
  }, [workout.id]);

  function mudarSessao(novo: SessaoAtiva) {
    setSessao(novo);
    salvarSessao(workout.id, novo);
  }

  if (!carregado || !sessao) return null;

  const { feitas } = sessao;
  const comecou = sessao.inicio !== null;

  function comecar() {
    mudarSessao({ ...sessao!, inicio: new Date().toISOString() });
  }

  const adaptacao = emAdaptacao(state);
  const seriesDe = (n: number) => (adaptacao ? Math.min(n, SERIES_ADAPTACAO) : n);
  const total = workout.itens.reduce((acc, i) => acc + seriesDe(i.series), 0);
  const concluidas = workout.itens.reduce(
    (acc, i) => acc + Math.min(feitas[i.exerciseId] ?? 0, seriesDe(i.series)),
    0,
  );

  function marcarSerie(exerciseId: string, indice: number, descansoSeg: number) {
    const atual = feitas[exerciseId] ?? 0;
    // Tocar numa série já feita desmarca a partir dela.
    const novo = indice < atual ? indice : indice + 1;
    mudarSessao({
      ...sessao!,
      // Marcar uma série antes de tocar em Começar já inicia o treino.
      inicio: sessao!.inicio ?? new Date().toISOString(),
      feitas: { ...feitas, [exerciseId]: novo },
    });
    if (novo > atual) setDescansoAte(Date.now() + descansoSeg * 1000);
  }

  function descartar() {
    apagarSessao(workout.id);
    setSessao(lerSessao(workout.id));
    setDescansoAte(null);
  }

  function encerrar() {
    if (concluidas === 0) {
      if (window.confirm("Nenhuma série marcada. Descartar este treino sem salvar?")) {
        descartar();
      }
      return;
    }
    update((s) => concluirTreino(s, workout, sessao!, seriesDe));
    apagarSessao(workout.id);
    router.push("/historico");
  }

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-1">
        <Link href="/treinos" className="text-sm text-muted">
          ← Treinos
        </Link>
        <h1 className="text-3xl font-bold">
          {workout.id} · {workout.nome}
        </h1>
        <p className="text-muted">{workout.foco}</p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${(concluidas / total) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted">
          {concluidas} de {total} séries
          {adaptacao && " · fase de adaptação (2 séries, carga leve)"}
        </p>
        {comecou ? (
          <div className="mt-2 flex items-center justify-between rounded-2xl bg-accent/10 px-4 py-3">
            <span className="text-sm text-accent">Treino em andamento</span>
            <Cronometro inicio={sessao.inicio!} />
          </div>
        ) : (
          <button
            type="button"
            onClick={comecar}
            className="mt-2 rounded-2xl bg-accent py-4 text-lg font-bold text-accent-ink"
          >
            Começar treino
          </button>
        )}
      </header>

      <ol className="flex flex-col gap-3">
        {workout.itens.map((item, n) => {
          const ex = getExercise(item.exerciseId);
          if (!ex) return null;
          const series = seriesDe(item.series);
          const feitasEx = feitas[item.exerciseId] ?? 0;
          return (
            <li
              key={item.exerciseId}
              className={`rounded-2xl border p-4 ${
                feitasEx >= series ? "border-accent/40 bg-accent/5" : "border-border bg-surface"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <Link href={`/exercicios/${ex.id}`} className="flex-1">
                  <p className="text-xs text-muted">{n + 1}</p>
                  <p className="font-semibold leading-snug">{ex.nome}</p>
                  <p className="text-sm text-muted">
                    {series} x {formatReps(item)} · descanso {formatDescanso(item.descansoSeg)}
                  </p>
                </Link>
                <Link
                  href={`/exercicios/${ex.id}`}
                  className="shrink-0 rounded-xl bg-surface-2 px-3 py-2 text-xs font-semibold text-accent"
                >
                  ▶ Vídeo
                </Link>
              </div>

              <div className="mt-3 flex items-center gap-2">
                {Array.from({ length: series }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Série ${i + 1}`}
                    onClick={() => marcarSerie(item.exerciseId, i, item.descansoSeg)}
                    className={`flex size-11 items-center justify-center rounded-xl text-sm font-bold ${
                      i < feitasEx ? "bg-accent text-accent-ink" : "bg-surface-2 text-muted"
                    }`}
                  >
                    {i < feitasEx ? "✓" : i + 1}
                  </button>
                ))}
                <label className="ml-auto flex items-center gap-1 text-sm text-muted">
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    defaultValue={state.cargas[item.exerciseId] ?? ""}
                    onBlur={(e) => {
                      const kg = Number(e.target.value);
                      if (!Number.isFinite(kg) || kg <= 0) return;
                      update((s) => ({ ...s, cargas: { ...s.cargas, [item.exerciseId]: kg } }));
                    }}
                    className="w-16 rounded-lg bg-surface-2 px-2 py-2 text-right text-foreground"
                  />
                  kg
                </label>
              </div>
            </li>
          );
        })}
      </ol>

      {comecou && (
        <>
          <label className="flex flex-col gap-2 text-sm text-muted">
            Anotação (opcional)
            <textarea
              rows={2}
              value={sessao.nota}
              onChange={(e) => mudarSessao({ ...sessao, nota: e.target.value })}
              placeholder="Ex.: ombro incomodou no desenvolvimento"
              className="rounded-xl bg-surface-2 px-3 py-2 text-base text-foreground"
            />
          </label>

          <button
            type="button"
            onClick={encerrar}
            className={`rounded-2xl py-4 text-lg font-bold ${
              concluidas >= total ? "bg-accent text-accent-ink" : "bg-surface-2 text-foreground"
            }`}
          >
            Encerrar e salvar treino
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Descartar este treino? Nada será salvo no histórico.")) descartar();
            }}
            className="-mt-2 min-h-11 text-sm text-muted"
          >
            Descartar treino
          </button>
        </>
      )}

      <RestTimer fimEm={descansoAte} onFechar={() => setDescansoAte(null)} />
    </div>
  );
}

function Cronometro({ inicio }: { inicio: string }) {
  const [agora, setAgora] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setAgora(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const seg = Math.max(0, Math.floor((agora - new Date(inicio).getTime()) / 1000));
  return <span className="text-xl font-semibold tabular-nums text-accent">{formatCronometro(seg)}</span>;
}
