"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Disclaimer } from "@/components/Disclaimer";
import { ExerciseAnimation } from "@/components/ExerciseAnimation";
import { getExercise } from "@/data/exercises";
import { getTreino, tituloTreino } from "@/data/workouts";
import type { Workout } from "@/data/types";
import {
  LIMITE_CARACTERES,
  LIMITE_FALAS,
  type Fala,
  type RespostaAssistente,
} from "@/lib/assistente/tipos";
import { formatDescanso, formatReps } from "@/lib/format";
import {
  emAdaptacao,
  lerSessao,
  salvarSessao,
  salvarTreinoPersonalizado,
  useAppState,
} from "@/lib/storage";

const SUGESTOES = [
  "Quero treinar braço",
  "Ombro e peito",
  "Perna leve",
  "Só tenho 30 minutos",
  "Como fazer o stiff sem doer a lombar?",
];

/** Uma troca na tela: a fala do usuário e o que o assistente respondeu. */
type Item =
  | { tipo: "usuario"; texto: string }
  | { tipo: "assistente"; resposta: RespostaAssistente }
  | { tipo: "erro"; texto: string };

const CHAVE_CONVERSA = "tirzepa-training:assistente";

export function Assistente() {
  const router = useRouter();
  const { state, update, carregado } = useAppState();
  const [itens, setItens] = useState<Item[]>([]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const fimRef = useRef<HTMLDivElement>(null);

  // A conversa dura a aba aberta (sessionStorage), para sobreviver a um reload.
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(CHAVE_CONVERSA);
      if (raw) setItens(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(CHAVE_CONVERSA, JSON.stringify(itens.slice(-20)));
    } catch {}
    fimRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [itens]);

  if (!carregado) return null;

  async function enviar(mensagem: string) {
    const limpa = mensagem.trim();
    if (!limpa || enviando) return;
    if (!navigator.onLine) {
      setItens((v) => [...v, { tipo: "erro", texto: "Sem internet. O assistente precisa de conexão; os treinos A, B e C funcionam offline." }]);
      return;
    }
    const novos: Item[] = [...itens, { tipo: "usuario", texto: limpa }];
    setItens(novos);
    setTexto("");
    setEnviando(true);

    const falas: Fala[] = novos
      .flatMap((i): Fala[] => {
        if (i.tipo === "usuario") return [{ papel: "usuario", texto: i.texto }];
        if (i.tipo === "assistente") {
          const t = i.resposta.treino;
          const resumo = t ? ` [Treino montado: ${t.itens.map((x) => x.exerciseId).join(", ")}]` : "";
          return [{ papel: "assistente", texto: i.resposta.mensagem + resumo }];
        }
        return [];
      })
      .slice(-LIMITE_FALAS);
    const ultimo = state.historico.at(-1);
    const ultimoTreino = ultimo
      ? (() => {
          const w = getTreino(ultimo.workoutId);
          return w ? tituloTreino(w) : ultimo.nome;
        })()
      : undefined;

    try {
      const res = await fetch("/api/assistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          falas,
          contexto: { plano: state.plano, emAdaptacao: emAdaptacao(state), ultimoTreino },
        }),
      });
      const dados = await res.json().catch(() => null);
      if (!res.ok || !dados || "erro" in dados) {
        setItens((v) => [...v, { tipo: "erro", texto: dados?.erro ?? "O assistente está indisponível agora." }]);
      } else {
        setItens((v) => [...v, { tipo: "assistente", resposta: dados as RespostaAssistente }]);
      }
    } catch {
      setItens((v) => [...v, { tipo: "erro", texto: "Não consegui falar com o assistente. Tente de novo." }]);
    } finally {
      setEnviando(false);
    }
  }

  function comecar(workout: Workout) {
    update((s) => salvarTreinoPersonalizado(s, workout));
    const sessao = lerSessao(workout.id);
    if (!sessao.inicio) salvarSessao(workout.id, { ...sessao, inicio: new Date().toISOString() });
    router.push(`/treinos/personalizado?id=${encodeURIComponent(workout.id)}`);
  }

  function limpar() {
    setItens([]);
  }

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-1">
        <Link href="/" className="text-sm text-muted">
          ← Hoje
        </Link>
        <h1 className="text-3xl font-bold">Assistente de treino</h1>
        <p className="text-muted">
          Diga o que quer treinar ou pergunte como fazer um exercício. Ele usa só os exercícios do app.
        </p>
      </header>

      <Disclaimer />

      {itens.length === 0 && state.treinosPersonalizados.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-muted">Montados recentemente</h2>
          {state.treinosPersonalizados.map((w) => (
            <Link
              key={w.id}
              href={`/treinos/personalizado?id=${encodeURIComponent(w.id)}`}
              className="flex min-h-11 items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3"
            >
              <span>
                <span className="font-semibold">{w.nome}</span>
                <span className="text-sm text-muted"> · {w.itens.length} exercícios · ~{w.duracaoMin} min</span>
              </span>
              <span className="text-muted" aria-hidden>›</span>
            </Link>
          ))}
        </section>
      )}

      <ol className="flex flex-col gap-3" aria-live="polite">
        {itens.map((item, n) => (
          <li key={n}>
            {item.tipo === "usuario" && (
              <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-2 text-accent-ink">
                {item.texto}
              </p>
            )}
            {item.tipo === "erro" && (
              <p className="rounded-2xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm">{item.texto}</p>
            )}
            {item.tipo === "assistente" && <Resposta resposta={item.resposta} onComecar={comecar} />}
          </li>
        ))}
        {enviando && (
          <li className="w-fit rounded-2xl bg-surface-2 px-4 py-2 text-sm text-muted">Montando…</li>
        )}
      </ol>
      <div ref={fimRef} />

      {itens.length === 0 && (
        <div className="flex flex-wrap gap-2">
          {SUGESTOES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => enviar(s)}
              className="min-h-11 rounded-full border border-border bg-surface px-4 text-sm"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          enviar(texto);
        }}
        className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] flex gap-2 rounded-2xl bg-background py-2"
      >
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          maxLength={LIMITE_CARACTERES}
          placeholder="Ex.: quero treinar braço"
          aria-label="Mensagem para o assistente"
          enterKeyHint="send"
          className="min-h-11 flex-1 rounded-xl bg-surface-2 px-3 text-base text-foreground"
        />
        <button
          type="submit"
          disabled={enviando || !texto.trim()}
          className="min-h-11 rounded-xl bg-accent px-4 font-semibold text-accent-ink disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
      {itens.length > 0 && (
        <button type="button" onClick={limpar} className="-mt-3 min-h-11 text-sm text-muted">
          Nova conversa
        </button>
      )}
    </div>
  );
}

function Resposta({
  resposta,
  onComecar,
}: {
  resposta: RespostaAssistente;
  onComecar: (w: Workout) => void;
}) {
  const { mensagem, treino, exercicios } = resposta;
  return (
    <div className="flex flex-col gap-3">
      <p className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-surface-2 px-4 py-2 leading-relaxed">
        {mensagem}
      </p>

      {treino && (
        <div className="flex flex-col gap-3 rounded-3xl border border-border bg-surface p-4">
          <div>
            <p className="text-lg font-bold">{treino.nome}</p>
            <p className="text-sm text-muted">
              {treino.foco} · {treino.itens.length} exercícios · ~{treino.duracaoMin} min
            </p>
          </div>
          <ol className="flex flex-col gap-2">
            {treino.itens.map((item) => {
              const ex = getExercise(item.exerciseId);
              if (!ex) return null;
              return (
                <li key={item.exerciseId}>
                  <details className="group rounded-2xl bg-surface-2">
                    <summary className="flex cursor-pointer list-none items-center gap-3 p-2 [&::-webkit-details-marker]:hidden">
                      <ExerciseAnimation exercicio={ex} miniatura />
                      <div className="flex-1">
                        <p className="font-semibold leading-snug">{ex.nome}</p>
                        <p className="text-sm text-muted">
                          {item.series} x {formatReps(item)} · descanso {formatDescanso(item.descansoSeg)}
                        </p>
                      </div>
                      <span aria-hidden className="pr-1 text-muted transition-transform group-open:rotate-90">
                        ›
                      </span>
                    </summary>
                    <Instrucoes id={ex.id} />
                  </details>
                </li>
              );
            })}
          </ol>
          <p className="text-xs text-muted">
            Pare a 1 ou 2 repetições da falha. Nas 2 primeiras semanas o app reduz para 2 séries.
          </p>
          <button
            type="button"
            onClick={() => onComecar(treino)}
            className="rounded-2xl bg-accent py-4 text-lg font-bold text-accent-ink"
          >
            Começar este treino
          </button>
        </div>
      )}

      {exercicios.map((id) => {
        const ex = getExercise(id);
        if (!ex) return null;
        return (
          <div key={id} className="flex flex-col gap-2 rounded-3xl border border-border bg-surface p-4">
            <p className="font-semibold">{ex.nome}</p>
            <ExerciseAnimation exercicio={ex} />
            <Instrucoes id={id} />
          </div>
        );
      })}
    </div>
  );
}

/** Dicas e erro comum vêm do app (exercises.ts), nunca do modelo. */
function Instrucoes({ id }: { id: string }) {
  const ex = getExercise(id);
  if (!ex) return null;
  return (
    <div className="flex flex-col gap-2 px-3 pb-3 text-sm leading-relaxed">
      <ul className="flex flex-col gap-1">
        {ex.dicas.map((d) => (
          <li key={d} className="flex gap-2">
            <span className="text-accent">●</span>
            {d}
          </li>
        ))}
      </ul>
      <p>
        <span className="font-semibold text-danger">Erro comum: </span>
        {ex.erroComum}
      </p>
      <Link href={`/exercicios/${ex.id}`} className="min-h-11 py-2 text-accent">
        Ver exercício completo →
      </Link>
    </div>
  );
}
