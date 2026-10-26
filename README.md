# Tirzepa Training

Treinos de musculação para quem usa ou usou Mounjaro: perder gordura sem perder massa magra.

PWA em Next.js pensado para o iPhone: 3 treinos por semana (Empurrar, Puxar, Perna), ou 4 com Superior + braços, animação de cada exercício, cronômetro de descanso e um guia curto.

> Este app não substitui acompanhamento médico, nutricional ou de educador físico.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Para testar no celular na mesma rede: `npm run dev -- -H 0.0.0.0` e acesse o IP do computador.

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build |
| `npm run lint` | ESLint |

## Deploy na Vercel

1. Em vercel.com, **Add New > Project** e importe `ardsilva/tirzepa_training`.
2. Framework: Next.js (detectado sozinho). Sem variáveis de ambiente por enquanto.
3. Deploy. Cada PR ganha uma URL de preview.

## Instalar no iPhone

Abra a URL no **Safari** > botão **Compartilhar** > **Adicionar à Tela de Início**. O app abre em tela cheia e as páginas já visitadas funcionam sem internet, inclusive as animações dos exercícios.

## Onde mexer

- Treinos, séries e descanso: `src/data/workouts.ts`
- Exercícios: `src/data/exercises.ts` (animações em `public/animacoes/`)
- Textos do guia e aviso médico: `src/data/guide.ts`
- Plano do produto: `docs/plano.md`
- Contexto para o Claude Code: `CLAUDE.md`
