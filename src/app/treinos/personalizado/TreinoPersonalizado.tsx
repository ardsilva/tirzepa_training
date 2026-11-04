"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAppState } from "@/lib/storage";
import { WorkoutSession } from "../[id]/WorkoutSession";

// Treinos do assistente ficam só no localStorage, então a sessão é montada
// no cliente a partir do id na URL (/treinos/personalizado?id=ia-...).
export function TreinoPersonalizado() {
  const id = useSearchParams().get("id");
  const { state, carregado } = useAppState();
  if (!carregado) return null;

  const workout = state.treinosPersonalizados.find((w) => w.id === id);
  if (!workout) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">Treino não encontrado</h1>
        <p className="text-muted">Ele pode ter sido montado em outro aparelho ou já ter saído da lista.</p>
        <Link href="/assistente" className="text-accent">
          Montar outro com o assistente →
        </Link>
      </div>
    );
  }
  return <WorkoutSession workout={workout} />;
}
