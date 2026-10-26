import { Disclaimer } from "@/components/Disclaimer";
import { cardios, regrasCardio, ZONA_2 } from "@/data/cardio";

export const metadata = { title: "Cardio · Tirzepa Training" };

export default function CardioPage() {
  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Cardio</h1>
        <p className="text-muted">
          Queimar gordura sem roubar a recuperação do músculo.
        </p>
      </header>

      <p className="rounded-2xl bg-accent/10 px-4 py-3 text-sm leading-relaxed text-accent">
        {ZONA_2}
      </p>

      <section className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-4">
        <h2 className="font-semibold">Regras para não perder massa magra</h2>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted">
          {regrasCardio.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <ul className="flex flex-col gap-3">
        {cardios.map((c) => (
          <li key={c.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4">
            <div>
              <h2 className="font-semibold">{c.nome}</h2>
              <p className="text-sm text-muted">
                {c.duracao} · {c.intensidade}
              </p>
            </div>
            <p className="text-sm">
              <span className="font-semibold">Quando: </span>
              {c.quando}
            </p>
            <ol className="flex list-decimal flex-col gap-1 pl-5 text-sm text-muted">
              {c.comoFazer.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
            <p className="rounded-xl bg-surface-2 px-3 py-2 text-sm">
              <span className="font-semibold text-danger">Erro comum: </span>
              {c.erroComum}
            </p>
          </li>
        ))}
      </ul>

      <Disclaimer />
    </div>
  );
}
