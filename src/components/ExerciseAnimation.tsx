import type { Exercise } from "@/data/types";

type Props = {
  exercicio: Pick<Exercise, "id" | "nome" | "animacao">;
  /** Miniatura quadrada para listas; sem ela, ocupa a largura toda. */
  miniatura?: boolean;
};

// Dois quadros empilhados: o de cima some e aparece, imitando um GIF com
// poucos KB e funcionando offline. Com "reduzir movimento" fica parado.
export function ExerciseAnimation({ exercicio, miniatura }: Props) {
  const base = `/animacoes/${exercicio.id}`;
  const { estatica } = exercicio.animacao;
  return (
    <div
      className={`relative overflow-hidden border border-border bg-surface ${
        miniatura ? "size-16 rounded-xl" : "aspect-[3/2] w-full rounded-2xl"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- imagens estáticas locais, sem otimização */}
      <img
        src={`${base}/${estatica ? 1 : 0}.jpg`}
        alt={`${exercicio.nome}: posição inicial`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!estatica && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${base}/1.jpg`}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full animate-alternar-quadro object-cover opacity-0 motion-reduce:animate-none"
        />
      )}
    </div>
  );
}
