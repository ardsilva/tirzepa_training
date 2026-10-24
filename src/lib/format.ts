import type { WorkoutItem } from "@/data/types";

export function formatReps(item: WorkoutItem): string {
  const faixa =
    item.repsMin === item.repsMax
      ? `${item.repsMin}`
      : `${item.repsMin}-${item.repsMax}`;
  if (item.isometrico) return `${faixa} s`;
  return item.porLado ? `${faixa} cada lado` : faixa;
}

export function formatDescanso(seg: number): string {
  if (seg < 60) return `${seg} s`;
  const min = Math.floor(seg / 60);
  const resto = seg % 60;
  return resto ? `${min}min${resto}` : `${min} min`;
}

export function formatTimer(seg: number): string {
  const m = Math.floor(seg / 60);
  const s = seg % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
