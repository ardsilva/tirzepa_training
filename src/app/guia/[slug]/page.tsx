import Link from "next/link";
import { notFound } from "next/navigation";
import { Disclaimer } from "@/components/Disclaimer";
import { guide } from "@/data/guide";

export function generateStaticParams() {
  return guide.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: guide.find((a) => a.slug === slug)?.titulo ?? "Guia" };
}

export default async function ArtigoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artigo = guide.find((a) => a.slug === slug);
  if (!artigo) notFound();

  return (
    <article className="flex flex-col gap-4">
      <Link href="/guia" className="text-sm text-muted">
        ← Guia
      </Link>
      <h1 className="text-2xl font-bold leading-tight">{artigo.titulo}</h1>
      {artigo.paragrafos.map((p) => (
        <p key={p} className="leading-relaxed">
          {p}
        </p>
      ))}
      {artigo.slug !== "aviso-medico" && <Disclaimer />}
    </article>
  );
}
