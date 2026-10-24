import Link from "next/link";
import { workouts } from "@/data/workouts";

export const metadata = { title: "Treinos · Tirzepa Training" };

export default function Treinos() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Treinos</h1>
      <p className="text-muted">
        Plano 3x: A, B e C. Plano 4x: adiciona o D. Você pode trocar o plano no
        início do app.
      </p>
      <ul className="flex flex-col gap-3">
        {workouts.map((w) => (
          <li key={w.id}>
            <Link
              href={`/treinos/${w.id}`}
              className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-xl font-bold text-accent">
                {w.id}
              </span>
              <span className="flex flex-col">
                <span className="font-semibold">{w.nome}</span>
                <span className="text-sm text-muted">
                  {w.foco} · {w.itens.length} exercícios · ~{w.duracaoMin} min
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
