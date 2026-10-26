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

/** Duração de um treino: "48 min", "1h05". */
export function formatDuracao(seg: number): string {
  const min = Math.round(seg / 60);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  return `${h}h${(min % 60).toString().padStart(2, "0")}`;
}

/** Cronômetro do treino em andamento: "12:34" ou "1:02:03". */
export function formatCronometro(seg: number): string {
  const h = Math.floor(seg / 3600);
  const resto = formatTimer(seg % 3600);
  return h ? `${h}:${resto.padStart(5, "0")}` : resto;
}
