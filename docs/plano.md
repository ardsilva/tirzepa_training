# Plano do produto: Tirzepa Training

Versão editável e comentada: [Claude Doc do plano](https://claude.ai/artifact/KDWHY3us2GLmQVKnz1H9KA). Atualizado em 24/10/2026.

Os treinos, os exercícios e as animações vivem no código e são a fonte da verdade:
`src/data/workouts.ts`, `src/data/exercises.ts` e `src/data/guide.ts`. Este arquivo explica o porquê.

## Para quem é

Homens de 30+ anos que tomam ou tomaram Mounjaro (tirzepatida), já treinaram alguma vez e vão à academia sem personal. Objetivo: perder gordura sem perder massa magra.

O remédio corta o apetite e acelera a perda de peso. Sem treino de força e proteína suficiente, parte do peso perdido é músculo. O app existe para proteger essa massa magra.

**Aviso obrigatório:** "Este app não substitui acompanhamento médico, nutricional ou de educador físico. Converse com seu médico antes de começar a treinar, principalmente se você tem hipertensão, problemas cardíacos ou articulares."

## Telas

| Tela | O que mostra | Fase |
| --- | --- | --- |
| Boas-vindas | Para quem é, aviso médico com "Li e entendi", escolha 3x ou 4x | MVP |
| Hoje | Próximo treino da sequência, duração, botão Começar | MVP |
| Treino | Exercícios com séries x reps x descanso, marcação por série, carga | MVP |
| Exercício | Animação de execução, 3 dicas, erro comum, alternativa | MVP |
| Descanso | Cronômetro que inicia ao marcar a série | MVP |
| Guia | 8 textos curtos | MVP |
| Login | Link mágico (Supabase Auth) | Fase 2 |
| Progresso | Peso e medidas por semana, gráfico, fotos frente/lado/costas | Fase 2 |
| Histórico | Treinos feitos e cargas por exercício | Fase 2 |

## Princípios do treino em déficit calórico

- **Carga alta, volume moderado:** 3 séries nos principais, 2 a 3 nos acessórios; cerca de 8 a 12 séries por grupo muscular na semana.
- **Repetições:** 6 a 12 nos compostos, 10 a 15 nos isolados e máquinas.
- **Esforço:** parar com 1 a 2 repetições na reserva (RIR 1-2). Sem falha nos compostos.
- **Descanso:** 2 a 3 min nos compostos, 60 a 90 s nos isolados.
- **Progressão dupla:** bateu o topo da faixa em todas as séries, sobe 2 a 5 kg. Em déficit, manter a carga já é vitória.
- **Máquinas e halteres** de preferência: menos técnica exigida, mais segurança sem personal.
- **Adaptação:** semanas 1 e 2 com 2 séries por exercício e carga confortável (RIR 3-4).
- **Cardio:** caminhada de 30 a 45 min ou 8 a 10 mil passos. Sem HIIT pesado no início. Opções em zona 2 (teste da fala, sem FC) em `src/data/cardio.ts`: esteira inclinada, bike, elíptico e caminhada. Nos dias de musculação, só depois do treino e até 20 min.
- **Proteína e água:** só referências gerais no guia, sempre "valide com seu nutricionista".
- **Sinais para parar:** tontura, náusea forte, dor no peito, falta de ar desproporcional.

## Divisão

Sequência, não dias fixos: se o usuário faltar, o próximo treino continua sendo o que ele não fez.

| Plano | Seg | Ter | Qua | Qui | Sex | Sáb/Dom |
| --- | --- | --- | --- | --- | --- | --- |
| 3x (padrão) | A Empurrar | Caminhada | B Puxar | Caminhada | C Perna | Caminhada |
| 4x | A Empurrar | B Puxar | Caminhada | C Perna | D Superior + braços | Caminhada |

- **A Empurrar:** peito, ombro, tríceps (6 exercícios)
- **B Puxar:** costas, posterior de ombro, bíceps (6 exercícios)
- **C Perna:** quadríceps, posterior, glúteo, panturrilha, core (7 exercícios)
- **D Superior + braços:** só no plano 4x (6 exercícios)

## Treinos de famosos

Rotinas públicas adaptadas às regras acima (`src/data/famosos.ts`), sempre com os exercícios que já existem no app e com a fonte citada. Ficam fora da sequência do plano: fazer um deles não muda o próximo treino sugerido.

- **Golden Six (Arnold Schwarzenegger):** corpo todo, 3x/sem, 6 exercícios.
- **Corpo clássico (Steve Reeves):** corpo todo, 3x/sem, reduzido de 13 para 8 exercícios.
- **Wolverine (Hugh Jackman):** 4 dias (peito e tríceps, perna, costas, ombro e braços); o 4x5 por % de 1RM virou 3 x 6-10 com RIR 1-2.

## Animações

Em 26/10/2026 os vídeos do YouTube foram trocados por animações no estilo dos apps de academia (Solinca, Technogym): dois quadros, início e fim do movimento, alternando em loop. As imagens vêm do [Free Exercise DB](https://github.com/yuhonas/free-exercise-db), em domínio público (Unlicense), e ficam no próprio app (`public/animacoes/`, cerca de 1,8 MB), então abrem rápido e funcionam offline. Também aparecem como miniatura na tela do treino.

Fontes avaliadas e descartadas: ExerciseDB (GIFs bons, mas licença comercial paga), wger (CC-BY-SA, poucas imagens para os nossos exercícios), Solinca e Technogym (conteúdo proprietário).

## Fase 2: Supabase

- Auth com link mágico.
- Tabelas `medidas`, `treinos_feitos`, `cargas`, todas com `user_id` e RLS.
- Storage privado para fotos de progresso.
- Migrar o estado do `localStorage` para o banco mantendo funcionamento offline.
- Sem pagamento por enquanto.
