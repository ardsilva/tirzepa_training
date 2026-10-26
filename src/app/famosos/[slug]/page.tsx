import Link from "next/link";
import { notFound } from "next/navigation";
import { Disclaimer } from "@/components/Disclaimer";
import { getExercise } from "@/data/exercises";
import { getPrograma, programasFamosos } from "@/data/famosos";
import { formatReps } from "@/lib/format";

export function generateStaticParams() {
  return programasFamosos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPrograma(slug);
  return { title: p ? `${p.nome} · ${p.famoso}` : "Treino de famoso" };
}

export default async function ProgramaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programa = getPrograma(slug);
  if (!programa) notFound();

  return (
    <article className="flex flex-col gap-5">
      <header className="flex flex-col gap-1">
        <Link href="/famosos" className="text-sm text-muted">
          ← Treinos de famosos
        </Link>
        <p className="text-sm font-semibold text-accent">{programa.famoso}</p>
        <h1 className="text-3xl font-bold">{programa.nome}</h1>
        <p className="text-muted">{programa.frequencia}</p>
      </header>

      <p className="leading-relaxed">{programa.origem}</p>

      <section className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-4">
        <h2 className="font-semibold">O que adaptamos</h2>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted">
          {programa.adaptacoes.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      {programa.treinos.map((w) => (
        <section key={w.id} className="flex flex-col gap-3">
          <div>
            <h2 className="text-xl font-bold">{w.nome}</h2>
            <p className="text-sm text-muted">
              {w.foco} · {w.itens.length} exercícios · ~{w.duracaoMin} min
            </p>
          </div>
          <ol className="flex flex-col gap-2">
            {w.itens.map((item) => {
              const ex = getExercise(item.exerciseId);
              if (!ex) return null;
              return (
                <li key={item.exerciseId}>
                  <Link
                    href={`/exercicios/${ex.id}`}
                    className="flex justify-between gap-3 rounded-xl bg-surface-2 px-3 py-3 text-sm"
                  >
                    <span>{ex.nome}</span>
                    <span className="shrink-0 text-muted">
                      {item.series} x {formatReps(item)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <Link
            href={`/treinos/${w.id}`}
            className="rounded-2xl bg-accent py-4 text-center text-lg font-bold text-accent-ink"
          >
            Começar {w.nome}
          </Link>
        </section>
      ))}

      <p className="text-xs text-muted">
        Fonte do treino original:{" "}
        <a href={programa.fonte.url} target="_blank" rel="noopener noreferrer" className="underline">
          {programa.fonte.titulo}
        </a>
        . Inspirado em rotina pública; sem relação com {programa.famoso}.
      </p>
      <Disclaimer />
    </article>
  );
}
