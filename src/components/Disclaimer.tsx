import { AVISO_MEDICO } from "@/data/guide";

export function Disclaimer() {
  return (
    <p className="rounded-xl border border-border bg-surface px-4 py-3 text-xs leading-relaxed text-muted">
      {AVISO_MEDICO}
    </p>
  );
}
