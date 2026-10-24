import { notFound } from "next/navigation";
import { getWorkout, workouts } from "@/data/workouts";
import { WorkoutSession } from "./WorkoutSession";

export function generateStaticParams() {
  return workouts.map((w) => ({ id: w.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const w = getWorkout(id);
  return { title: w ? `Treino ${w.id} · ${w.nome}` : "Treino" };
}

export default async function TreinoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = getWorkout(id);
  if (!workout) notFound();
  return <WorkoutSession workout={workout} />;
}
