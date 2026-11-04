"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = { fallback: string; children: React.ReactNode };

// Volta para a tela anterior (ex.: a sessão do treino que abriu o exercício).
// Se a página foi aberta direto, sem tela anterior, vai para o fallback.
export function BackLink({ fallback, children }: Props) {
  const router = useRouter();
  return (
    <Link
      href={fallback}
      onClick={(e) => {
        if (window.history.length > 1) {
          e.preventDefault();
          router.back();
        }
      }}
      className="text-sm text-muted"
    >
      {children}
    </Link>
  );
}
