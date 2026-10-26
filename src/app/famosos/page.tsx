import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { programasFamosos } from "@/data/famosos";

export const metadata = { title: "Treinos de famosos · Tirzepa Training" };

export default function Famosos() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/treinos" className="text-sm text-muted">
        ← Treinos
      </Link>
      <h1 className="text-3xl font-bold">Treinos de famosos</h1>
      <p className="text-muted">
        Rotinas conhecidas, adaptadas para quem treina sozinho e está perdendo
        peso: sem treino até a falha e com os exercícios do app. Fazer um deles
        não muda a sequência do seu plano.
      </p>
      <ul className="flex flex-col gap-3">
        {programasFamosos.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/famosos/${p.slug}`}
              className="block rounded-2xl border border-border bg-surface p-4"
            >
              <p className="text-xs font-semibold text-accent">{p.famoso}</p>
              <p className="font-semibold">{p.nome}</p>
              <p className="text-sm text-muted">{p.resumo}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Disclaimer />
    </div>
  );
}
