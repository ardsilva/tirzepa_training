import { NextResponse } from "next/server";
import { descreverContexto, promptDeSistema } from "@/lib/assistente/prompt";
import {
  LIMITE_CARACTERES,
  LIMITE_FALAS,
  type PedidoAssistente,
  type RespostaAssistente,
} from "@/lib/assistente/tipos";
import { RESPOSTA_ALERTA, ehAlerta, validarResposta } from "@/lib/assistente/validar";
import { LIMITE_POR_HORA, excedeuLimite, ipDe } from "@/lib/assistente/limite";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Provedor compatível com a API do OpenAI. Padrão: plano grátis do Groq.
// Para trocar de provedor ou modelo, basta mudar as variáveis na Vercel.
const API_URL = process.env.ASSISTENTE_API_URL ?? "https://api.groq.com/openai/v1/chat/completions";
const MODELO = process.env.ASSISTENTE_MODELO ?? "openai/gpt-oss-120b";
const SISTEMA = promptDeSistema();

function erro(mensagem: string, status: number) {
  return NextResponse.json({ erro: mensagem }, { status });
}

function lerPedido(corpo: unknown): PedidoAssistente | null {
  if (!corpo || typeof corpo !== "object") return null;
  const { falas, contexto } = corpo as Record<string, unknown>;
  if (!Array.isArray(falas) || falas.length === 0) return null;
  const limpas = falas
    .slice(-LIMITE_FALAS)
    .filter(
      (f): f is PedidoAssistente["falas"][number] =>
        !!f &&
        typeof f === "object" &&
        (f.papel === "usuario" || f.papel === "assistente") &&
        typeof f.texto === "string",
    )
    .map((f) => ({ papel: f.papel, texto: f.texto.slice(0, LIMITE_CARACTERES * 2) }));
  const ultima = limpas.at(-1);
  if (!ultima || ultima.papel !== "usuario" || ultima.texto.length > LIMITE_CARACTERES) return null;
  const c = (contexto ?? {}) as Record<string, unknown>;
  return {
    falas: limpas,
    contexto: {
      plano: c.plano === 4 ? 4 : 3,
      emAdaptacao: c.emAdaptacao === true,
      ultimoTreino: typeof c.ultimoTreino === "string" ? c.ultimoTreino.slice(0, 60) : undefined,
    },
  };
}

export async function POST(req: Request) {
  const chave = process.env.GROQ_API_KEY ?? process.env.ASSISTENTE_API_KEY;
  if (!chave) return erro("O assistente ainda não foi configurado.", 503);

  if (excedeuLimite(ipDe(req))) {
    return erro(`Limite de ${LIMITE_POR_HORA} mensagens por hora atingido. Tente mais tarde ou use os treinos A, B e C.`, 429);
  }

  let pedido: PedidoAssistente | null = null;
  try {
    pedido = lerPedido(await req.json());
  } catch {}
  if (!pedido) return erro(`Mensagem inválida (máximo de ${LIMITE_CARACTERES} caracteres).`, 400);

  const ultima = pedido.falas.at(-1)!.texto;
  if (ehAlerta(ultima)) return NextResponse.json(RESPOSTA_ALERTA satisfies RespostaAssistente);

  const mensagens = [
    { role: "system", content: SISTEMA },
    { role: "system", content: descreverContexto(pedido.contexto) },
    ...pedido.falas.map((f) => ({
      role: f.papel === "usuario" ? "user" : "assistant",
      content: f.texto,
    })),
  ];

  let res: Response;
  try {
    res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${chave}` },
      body: JSON.stringify({
        model: MODELO,
        messages: mensagens,
        response_format: { type: "json_object" },
        max_completion_tokens: 1500,
        temperature: 0.4,
      }),
      signal: AbortSignal.timeout(25_000),
    });
  } catch {
    return erro("O assistente demorou para responder. Tente de novo.", 504);
  }

  if (res.status === 429) {
    return erro("O assistente gratuito atingiu o limite por agora. Tente mais tarde ou use os treinos A, B e C.", 429);
  }
  if (!res.ok) {
    console.error("assistente: provedor respondeu", res.status);
    return erro("O assistente está indisponível agora. Use os treinos A, B e C.", 502);
  }

  try {
    const dados = await res.json();
    const conteudo: string = dados?.choices?.[0]?.message?.content ?? "";
    const resposta = validarResposta(JSON.parse(conteudo), `ia-${Date.now()}`);
    return NextResponse.json(resposta satisfies RespostaAssistente);
  } catch {
    return erro("Não consegui montar a resposta. Pode pedir de novo?", 502);
  }
}
