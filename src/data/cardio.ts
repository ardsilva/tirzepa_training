import type { Cardio } from "./types";

// Cardio para queimar gordura sem roubar a recuperação do treino de força.
// Intensidade pelo teste da fala (zona 2), não por frequência cardíaca:
// dá para usar sem relógio e sem calcular FC máxima.
export const ZONA_2 =
  "Zona 2 é o ritmo em que a respiração acelera, mas você ainda consegue conversar em frases completas. Se só sai uma palavra por vez, está forte demais; se dá para cantar, está leve demais.";

export const regrasCardio: string[] = [
  "Musculação é a prioridade: é ela que protege a massa magra. O cardio ajuda a gastar energia e faz bem ao coração, mas não substitui o treino de força.",
  "Nos dias sem musculação, faça 30 a 45 minutos em zona 2 ou caminhe 8 a 10 mil passos.",
  "Nos dias de musculação, o cardio vem depois do treino, com até 20 minutos e leve. Antes do treino, só 5 a 10 minutos de aquecimento.",
  "Evite cardio forte no dia anterior ao treino de perna: a perna cansada rende menos no leg press e no agachamento.",
  "Sem HIIT, corrida forte ou tiros nesta fase. Comendo pouco, cardio intenso compete com o músculo pela recuperação.",
  "Como referência geral, a OMS recomenda de 150 a 300 minutos por semana de atividade moderada para adultos. Valide o seu volume com seu médico.",
  "Leve água e coma algo leve antes. Tontura, falta de ar desproporcional ou dor no peito: pare na hora.",
];

export const cardios: Cardio[] = [
  {
    id: "esteira-inclinada",
    nome: "Caminhada inclinada na esteira",
    duracao: "30 a 40 min",
    intensidade: "Zona 2 · inclinação 6 a 12%, velocidade 4 a 5,5 km/h",
    quando: "Dias sem musculação, ou 15 a 20 min depois do treino de superior",
    comoFazer: [
      "Comece com 5 min plano para aquecer.",
      "Suba a inclinação aos poucos até chegar na zona 2. Ajuste a velocidade, não só a inclinação.",
      "Tronco reto e passos normais, sem se pendurar no corrimão.",
      "Termine com 3 a 5 min plano e mais devagar.",
    ],
    erroComum:
      "Segurar no corrimão com a inclinação no máximo. O esforço cai muito e a lombar sofre.",
  },
  {
    id: "bike",
    nome: "Bicicleta ergométrica",
    duracao: "20 a 40 min",
    intensidade: "Zona 2 · carga leve a moderada, 70 a 90 pedaladas por minuto",
    quando: "Qualquer dia; a melhor opção para quem tem dor no joelho ou está pesado",
    comoFazer: [
      "Ajuste o banco: com o pedal embaixo, o joelho fica quase esticado.",
      "Comece 5 min com carga baixa e depois suba até a zona 2.",
      "Mantenha a cadência constante e a carga em que consegue conversar.",
    ],
    erroComum:
      "Banco baixo demais, com o joelho muito dobrado embaixo. Força o joelho e cansa mais rápido.",
  },
  {
    id: "eliptico",
    nome: "Elíptico (transport)",
    duracao: "20 a 30 min",
    intensidade: "Zona 2 · resistência moderada",
    quando: "Dias sem musculação; bom para variar e poupar as articulações",
    comoFazer: [
      "Pés inteiros nos pedais, sem ficar na ponta.",
      "Use os braços junto, empurrando e puxando as alças.",
      "Suba a resistência antes da velocidade para chegar na zona 2.",
    ],
    erroComum:
      "Resistência zero e velocidade alta. Parece muito, mas o esforço real é pequeno.",
  },
  {
    id: "caminhada-rua",
    nome: "Caminhada ao ar livre",
    duracao: "30 a 45 min ou 8 a 10 mil passos",
    intensidade: "Zona 2 · passo firme, como quem está atrasado",
    quando: "Dias sem musculação, ou depois do almoço e do jantar em blocos de 10 a 15 min",
    comoFazer: [
      "Tênis confortável e uma garrafa de água.",
      "Ritmo firme o bastante para a respiração acelerar.",
      "Ladeiras contam como a esteira inclinada: aproveite se tiver perto.",
    ],
    erroComum:
      "Contar só o passeio lento como cardio. Ajuda nos passos, mas não chega na zona 2.",
  },
];
