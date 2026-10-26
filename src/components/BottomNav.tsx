"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const abas = [
  { href: "/", label: "Hoje", icon: IconHoje },
  { href: "/treinos", label: "Treinos", icon: IconTreinos },
  { href: "/historico", label: "Histórico", icon: IconHistorico },
  { href: "/guia", label: "Guia", icon: IconGuia },
];

export function BottomNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/boas-vindas")) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 backdrop-blur">
      <ul className="mx-auto flex max-w-lg justify-around pb-[env(safe-area-inset-bottom)]">
        {abas.map(({ href, label, icon: Icon }) => {
          const ativo =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex min-w-18 flex-col items-center gap-1 px-3 py-2.5 text-xs font-medium ${
                  ativo ? "text-accent" : "text-muted"
                }`}
              >
                <Icon />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function IconHoje() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IconTreinos() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12" />
    </svg>
  );
}

function IconGuia() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5Z" />
      <path d="M8 7h6" />
    </svg>
  );
}

function IconHistorico() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 10h16M9 3v4M15 3v4M8 14l2 2 4-4" />
    </svg>
  );
}
