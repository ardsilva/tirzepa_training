"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Disclaimer } from "@/components/Disclaimer";
import { useAppState } from "@/lib/storage";
import type { Plano } from "@/data/types";

export default function BoasVindas() {
  const router = useRouter();
  const { update } = useAppState();
  const [plano, setPlano] = useState<Plano>(3);
  const [aceitou, setAceitou] = useState(false);

  function comecar() {
    update((s) => ({ ...s, aceitouAviso: true, plano }));
    router.replace("/");
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Tirzepa Training
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          Perca gordura. Mantenha o músculo.
        </h1>
        <p className="text-muted">
          Treinos de academia para homens de 30+ que usam ou usaram Mounjaro e
          já treinaram alguma vez. Sem personal, com a animação de cada exercício.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="font-semibold">Quantas vezes por semana?</h2>
        <div className="grid grid-cols-2 gap-3">
          {([3, 4] as Plano[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlano(p)}
              className={`rounded-2xl border p-4 text-left ${
                plano === p
                  ? "border-accent bg-accent/10"
                  : "border-border bg-surface"
              }`}
            >
              <span className="block text-2xl font-bold">{p}x</span>
              <span className="text-sm text-muted">
                {p === 3 ? "Empurrar, Puxar, Perna" : "+ Superior e braços"}
              </span>
            </button>
          ))}
        </div>
      </section>

      <Disclaimer />

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={aceitou}
          onChange={(e) => setAceitou(e.target.checked)}
          className="mt-0.5 size-5 accent-[var(--accent)]"
        />
        Li e entendi o aviso.
      </label>

      <button
        type="button"
        disabled={!aceitou}
        onClick={comecar}
        className="rounded-2xl bg-accent py-4 text-lg font-bold text-accent-ink disabled:opacity-40"
      >
        Começar
      </button>
    </div>
  );
}
