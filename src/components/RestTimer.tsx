"use client";

import { useEffect, useState } from "react";
import { formatTimer } from "@/lib/format";

type Props = {
  /** Momento (ms) em que o descanso termina; null esconde o timer. */
  fimEm: number | null;
  onFechar: () => void;
};

export function RestTimer({ fimEm, onFechar }: Props) {
  const [agora, setAgora] = useState(() => Date.now());

  useEffect(() => {
    if (fimEm === null) return;
    const id = window.setInterval(() => setAgora(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [fimEm]);

  const restante =
    fimEm === null ? 0 : Math.max(0, Math.ceil((fimEm - agora) / 1000));
  const acabou = fimEm !== null && restante === 0;

  useEffect(() => {
    // Safari do iOS ignora vibrate; no Android funciona.
    if (acabou && "vibrate" in navigator) navigator.vibrate?.([200, 100, 200]);
  }, [acabou]);

  if (fimEm === null) return null;

  return (
    <div className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-30 px-4">
      <div
        className={`mx-auto flex max-w-lg items-center justify-between rounded-2xl px-5 py-4 shadow-lg ${
          acabou ? "bg-accent text-accent-ink" : "bg-surface-2 text-foreground"
        }`}
      >
        <div>
          <p className="text-xs uppercase tracking-wide opacity-70">
            {acabou ? "Próxima série" : "Descanso"}
          </p>
          <p className="text-3xl font-semibold tabular-nums">
            {acabou ? "Bora!" : formatTimer(restante)}
          </p>
        </div>
        <button
          type="button"
          onClick={onFechar}
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            acabou ? "bg-accent-ink text-accent" : "bg-border"
          }`}
        >
          {acabou ? "Fechar" : "Pular"}
        </button>
      </div>
    </div>
  );
}
