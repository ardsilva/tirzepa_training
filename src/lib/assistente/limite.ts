// Limite simples por IP, em memória. A regra no Firewall da Vercel não pôde
// ser criada pela API neste projeto, então o limite fica no código. Cada
// instância da função tem o próprio mapa: não é exato, mas segura abusos.
// Como o Groq é grátis, o pior caso é esgotar a cota do dia, não gastar dinheiro.
const JANELA_MS = 60 * 60 * 1000;
export const LIMITE_POR_HORA = 10;
const pedidos = new Map<string, number[]>();

export function ipDe(req: Request): string {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "desconhecido"
  );
}

/** Registra o pedido e diz se o IP passou do limite na última hora. */
export function excedeuLimite(ip: string, agora = Date.now()): boolean {
  const recentes = (pedidos.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  if (recentes.length >= LIMITE_POR_HORA) {
    pedidos.set(ip, recentes);
    return true;
  }
  recentes.push(agora);
  pedidos.set(ip, recentes);
  // Evita que o mapa cresça sem fim numa instância que vive muito.
  if (pedidos.size > 5000) {
    for (const [chave, ts] of pedidos) if (ts.every((t) => agora - t >= JANELA_MS)) pedidos.delete(chave);
  }
  return false;
}
