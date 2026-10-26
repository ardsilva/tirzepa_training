import { notFound } from "next/navigation";
import { getTreino, tituloTreino, treinosFamosos, workouts } from "@/data/workouts";
import { WorkoutSession } from "./WorkoutSession";

export function generateStaticParams() {
  return [...workouts, ...treinosFamosos].map((w) => ({ id: w.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const w = getTreino(id);
  return { title: w ? `Treino ${tituloTreino(w)}` : "Treino" };
}

export default async function TreinoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = getTreino(id);
  if (!workout) notFound();
  return <WorkoutSession workout={workout} />;
}
