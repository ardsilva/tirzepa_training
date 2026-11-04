import { exercises } from "@/data/exercises";

// Catálogo enxuto que vai no prompt: só o que a IA precisa para escolher
// exercícios e responder dúvidas com as dicas do próprio app.
export function catalogoParaIA(): string {
  return exercises
    .map((e) =>
      [
        `- id: ${e.id}`,
        `  nome: ${e.nome}`,
        `  tipo: ${e.tipo}${e.animacao.estatica ? " (isométrico, em segundos)" : ""}`,
        `  grupos: ${e.grupos.join(", ")}`,
        e.alternativaId ? `  alternativa: ${e.alternativaId}` : null,
        `  dicas: ${e.dicas.join(" | ")}`,
        `  erro comum: ${e.erroComum}`,
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");
}
