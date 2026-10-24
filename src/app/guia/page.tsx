import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { guide } from "@/data/guide";

export const metadata = { title: "Guia · Tirzepa Training" };

export default function Guia() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Guia</h1>
      <p className="text-muted">Leituras de 1 minuto para treinar melhor no Mounjaro.</p>
      <ul className="flex flex-col gap-3">
        {guide.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/guia/${a.slug}`}
              className="block rounded-2xl border border-border bg-surface p-4"
            >
              <p className="font-semibold">{a.titulo}</p>
              <p className="text-sm text-muted">{a.resumo}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Disclaimer />
    </div>
  );
}
