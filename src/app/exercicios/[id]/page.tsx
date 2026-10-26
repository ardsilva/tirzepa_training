import Link from "next/link";
import { notFound } from "next/navigation";
import { ExerciseAnimation } from "@/components/ExerciseAnimation";
import { exercises, getExercise } from "@/data/exercises";

export function generateStaticParams() {
  return exercises.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: getExercise(id)?.nome ?? "Exercício" };
}

export default async function ExercicioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ex = getExercise(id);
  if (!ex) notFound();
  const alternativa = ex.alternativaId ? getExercise(ex.alternativaId) : undefined;

  return (
    <div className="flex flex-col gap-5">
      <Link href="/treinos" className="text-sm text-muted">
        ← Treinos
      </Link>
      <h1 className="text-2xl font-bold leading-tight">{ex.nome}</h1>

      <ExerciseAnimation exercicio={ex} />
      <p className="-mt-3 text-xs text-muted">
        Imagens:{" "}
        <a
          href="https://github.com/yuhonas/free-exercise-db"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Free Exercise DB
        </a>{" "}
        (domínio público)
      </p>

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">Como fazer</h2>
        <ul className="flex flex-col gap-2">
          {ex.dicas.map((d) => (
            <li key={d} className="flex gap-2 text-sm leading-relaxed">
              <span className="text-accent">●</span>
              {d}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-danger/30 bg-danger/5 p-4">
        <h2 className="text-sm font-semibold text-danger">Erro comum</h2>
        <p className="text-sm leading-relaxed">{ex.erroComum}</p>
      </section>

      {alternativa && (
        <Link
          href={`/exercicios/${alternativa.id}`}
          className="rounded-2xl border border-border bg-surface p-4"
        >
          <p className="text-xs text-muted">Aparelho ocupado? Troque por</p>
          <p className="font-semibold">{alternativa.nome} →</p>
        </Link>
      )}
    </div>
  );
}
