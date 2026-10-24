import type { GuideArticle } from "./types";

export const AVISO_MEDICO =
  "Este app não substitui acompanhamento médico, nutricional ou de educador físico. Converse com seu médico antes de começar a treinar, principalmente se você tem hipertensão, problemas cardíacos ou articulares.";

export const guide: GuideArticle[] = [
  {
    slug: "por-que-treinar",
    titulo: "Por que treinar força no Mounjaro",
    resumo: "O remédio tira a fome. O treino protege o músculo.",
    paragrafos: [
      "A tirzepatida reduz o apetite e acelera a perda de peso. Sem estímulo, o corpo também perde músculo junto com a gordura.",
      "Músculo é o que mantém sua força, sua postura e seu metabolismo. Perder massa magra deixa o corpo mais fraco e facilita recuperar o peso depois.",
      "O treino de força com carga e uma boa ingestão de proteína são os dois sinais que dizem ao corpo: esse músculo continua sendo necessário.",
    ],
  },
  {
    slug: "como-usar",
    titulo: "Como usar o app",
    resumo: "Sequência A, B, C. Faltou um dia? Continue de onde parou.",
    paragrafos: [
      "O app segue uma sequência, não dias fixos. No plano de 3x por semana: A (Empurrar), B (Puxar), C (Perna). No de 4x, entra o D (Superior + braços).",
      "Nas duas primeiras semanas você está na fase de adaptação: 2 séries por exercício, com carga confortável.",
      "RIR quer dizer \"repetições na reserva\". Pare cada série quando sentir que ainda conseguiria fazer mais 1 ou 2 repetições com boa técnica.",
      "Marque cada série ao terminar. O cronômetro de descanso começa sozinho.",
    ],
  },
  {
    slug: "progressao",
    titulo: "Quando subir a carga",
    resumo: "Bateu o topo da faixa em todas as séries? Sobe o peso.",
    paragrafos: [
      "Use a progressão dupla. Exemplo: o supino pede 3 x 6-10. Comece com uma carga em que você faz 6 a 8 repetições.",
      "A cada treino, tente uma repetição a mais. Quando fizer 10 nas 3 séries, aumente 2 a 5 kg e volte a buscar 6.",
      "Comendo menos, manter a mesma carga por semanas já é uma vitória. Perder força rápido é sinal para conversar com seu médico ou nutricionista.",
    ],
  },
  {
    slug: "comer-o-suficiente",
    titulo: "Comer o suficiente com pouco apetite",
    resumo: "Proteína primeiro no prato.",
    paragrafos: [
      "Com o apetite baixo, o risco é comer pouca proteína. Comece cada refeição por ela: carne, frango, peixe, ovos, iogurte, queijos.",
      "Uma referência comum para quem treina é por volta de 1,6 g de proteína por kg de peso por dia. A sua quantidade deve ser definida com o nutricionista.",
      "Coma algo leve 1 a 2 horas antes do treino. Treinar em jejum longo aumenta o risco de tontura e mal-estar.",
    ],
  },
  {
    slug: "agua-e-efeitos",
    titulo: "Água e efeitos colaterais",
    resumo: "Hidratação ajuda na náusea, na constipação e na tontura.",
    paragrafos: [
      "Náusea, constipação e tontura são comuns, principalmente nas semanas de ajuste de dose.",
      "Leve uma garrafa para a academia e beba ao longo do dia, não só no treino.",
      "Nos dias logo após a aplicação, se estiver enjoado, prefira um treino mais leve ou só caminhada.",
    ],
  },
  {
    slug: "caminhada",
    titulo: "Caminhada e passos",
    resumo: "8 a 10 mil passos valem mais que HIIT nesta fase.",
    paragrafos: [
      "Nos dias sem treino, caminhe de 30 a 45 minutos ou busque 8 a 10 mil passos.",
      "Cardio muito intenso, comendo pouco, rouba a recuperação que o músculo precisa para o treino de força.",
    ],
  },
  {
    slug: "sinais-de-alerta",
    titulo: "Sinais de alerta",
    resumo: "Quando parar e procurar o médico.",
    paragrafos: [
      "Pare o treino imediatamente se sentir dor no peito, falta de ar desproporcional, tontura forte, visão escura ou palpitação.",
      "Dor articular aguda durante um exercício também é motivo para parar e trocar pela alternativa.",
      "Procure atendimento médico se os sintomas não passarem com repouso.",
    ],
  },
  {
    slug: "aviso-medico",
    titulo: "Aviso médico",
    resumo: "Leia antes de começar.",
    paragrafos: [AVISO_MEDICO],
  },
];
