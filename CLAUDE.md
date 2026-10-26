# Tirzepa Training

PWA de treino de musculação para homens de 30+ anos que usam ou usaram Mounjaro (tirzepatida) e já treinaram alguma vez. Objetivo do usuário: perder gordura sem perder massa magra, treinando sozinho na academia (sem personal). O app é aberto principalmente no Safari do iPhone e instalado na tela de início.

O plano completo do produto está em `docs/plano.md`.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (tokens de cor em `src/app/globals.css`, via `@theme inline`)
- PWA: `src/app/manifest.ts` + `public/sw.js` (registrado só em produção por `src/components/RegisterSW.tsx`)
- Deploy: Vercel, a partir da branch `main`
- Fase 2 (ainda não existe): Supabase para login, medidas e fotos

## Comandos

```bash
npm run dev     # http://localhost:3000
npm run build   # precisa passar antes de qualquer PR
npm run lint
npx tsc --noEmit
```

## Estrutura

```
src/
  app/
    page.tsx                 Hoje: próximo treino da sequência (redireciona p/ onboarding)
    boas-vindas/             Onboarding: aviso médico + escolha 3x/4x
    treinos/                 Lista de treinos
    treinos/[id]/            Sessão: Começar/Encerrar, séries, carga, cronômetro de descanso
    historico/               Treinos encerrados (data, duração, séries, cargas, anotação)
    exercicios/[id]/         Animação, dicas, erro comum, alternativa
    guia/ e guia/[slug]/     Artigos curtos
  components/                BottomNav, RestTimer, ExerciseAnimation, Disclaimer, RegisterSW
  data/                      Conteúdo: exercises.ts, workouts.ts, guide.ts, types.ts
  lib/
    storage.ts               Estado no localStorage (hook useAppState)
    format.ts                Formatação de reps, descanso, timer
docs/plano.md                Plano do produto
```

## Regras do produto (não quebrar)

- **Aviso médico obrigatório.** O texto fica em `AVISO_MEDICO` (`src/data/guide.ts`) e aparece no onboarding (com checkbox), no guia e no fim de cada artigo. Nunca remover.
- **Sem prescrição.** O app não indica dose de remédio, dieta, calorias nem gramas de proteína para o usuário. Pode citar referências gerais sempre dizendo para validar com nutricionista ou médico.
- **Plano padrão: 3x por semana** (A Empurrar, B Puxar, C Perna). O 4x adiciona D (Superior + braços).
- **Sequência, não dias fixos.** Se o usuário falta, o próximo treino continua sendo o que ele não fez (`proximoIndex` em `storage.ts`). Na tela Hoje ele pode escolher qualquer treino (ex.: começar pelo C no meio da semana); a sequência sugerida continua a partir do treino feito.
- **Começar/Encerrar.** O treino tem início e fim. Ao encerrar, salva em `historico` (`TreinoFeito`) data, duração, séries feitas por exercício, carga e anotação. O treino em andamento fica em `tirzepa-training:sessao:<id>` para sobreviver a reload. Registros antigos podem não ter os campos novos (são opcionais).
- **Fase de adaptação:** semanas 1 e 2 com 2 séries por exercício (`SEMANAS_ADAPTACAO`, `SERIES_ADAPTACAO`).
- **Prescrição de treino para déficit calórico:** compostos 6-12 reps com 2-3 min de descanso; isolados 10-15 reps com 60-90 s; parar a 1-2 reps da falha. Mudanças nessas faixas devem seguir `docs/plano.md`.
- **Animações em vez de vídeos:** cada exercício mostra dois quadros (início e fim) alternando como um GIF, em `public/animacoes/<id>/0.jpg` e `1.jpg`. Fonte: [Free Exercise DB](https://github.com/yuhonas/free-exercise-db) (Unlicense, domínio público); o campo `animacao.origem` guarda a pasta de lá. Exercício parado (prancha) usa `estatica: true`. Não usar GIFs do ExerciseDB, Solinca, Technogym ou similares: são protegidos por direito autoral. Ao adicionar exercício, baixar os quadros, reduzir para 600 px e conferir visualmente se batem com o exercício.
- **Idioma:** toda a interface e o conteúdo em português do Brasil. Nomes de variáveis do domínio também em português (`series`, `descansoSeg`, `feitas`), código de infraestrutura em inglês.

## Convenções de código

- Componentes de servidor por padrão; `"use client"` só onde há estado, `localStorage` ou eventos.
- Rotas dinâmicas usam `generateStaticParams` (tudo é estático) e `params` como `Promise` (Next 15).
- Conteúdo novo (exercício, treino, artigo) entra em `src/data/`, nunca hardcoded na página.
- Ao adicionar exercício: preencher `dicas` (3), `erroComum` e, se fizer sentido, `alternativaId`.
- Mobile first: largura máxima `max-w-lg`, alvos de toque com pelo menos 44 px, respeitar `env(safe-area-inset-*)`.
- Acesso ao `localStorage` sempre dentro de `try/catch` (o modo privado do Safari pode bloquear).
- Cores só pelos tokens (`bg-surface`, `text-muted`, `text-accent`...), sem hex solto nos componentes.

## Fluxo de trabalho

- Branch por mudança, PR para `main`. O Alexandre faz os comandos de git e o deploy na Vercel manualmente.
- Antes de abrir PR: `npm run lint && npx tsc --noEmit && npm run build`.
- Testar no iPhone: abrir a URL de preview da Vercel no Safari > Compartilhar > Adicionar à Tela de Início.

## Fase 2 (planejada)

- Supabase Auth com link mágico por e-mail.
- Tabelas: `medidas` (peso, cintura, braço, coxa, peito por data), `treinos_feitos`, `cargas`.
- Supabase Storage privado para fotos (frente, lado, costas) com RLS por `user_id`.
- Migrar o que hoje está em `localStorage` (`AppState` em `src/lib/storage.ts`) para o banco, mantendo o modo offline.
- Variáveis em `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Nunca commitar chaves.
