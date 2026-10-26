import type { Exercise } from "./types";

// Animações em public/animacoes/<id>/ (0.jpg início, 1.jpg fim), tiradas do
// Free Exercise DB (domínio público). Quadros conferidos um a um em 26/10/2026.
export const exercises: Exercise[] = [
  // Treino A: Empurrar
  {
    id: "supino-reto-halteres",
    nome: "Supino reto com halteres",
    grupos: ["peito", "triceps", "ombro"],
    animacao: { origem: "Dumbbell_Bench_Press" },
    dicas: [
      "Escápulas encaixadas para trás e para baixo, peito alto.",
      "Desça os halteres até a linha do peito, cotovelos a cerca de 45° do tronco.",
      "Pés firmes no chão e glúteo no banco o tempo todo.",
    ],
    erroComum: "Abrir os cotovelos a 90° do corpo, o que sobrecarrega o ombro.",
    alternativaId: "supino-inclinado-maquina",
  },
  {
    id: "supino-inclinado-maquina",
    nome: "Supino inclinado na máquina",
    grupos: ["peito", "ombro", "triceps"],
    animacao: { origem: "Leverage_Incline_Chest_Press" },
    dicas: [
      "Ajuste o banco para a pegada ficar na altura do meio do peito.",
      "Empurre sem travar totalmente os cotovelos no topo.",
      "Volte devagar, em cerca de 2 segundos.",
    ],
    erroComum: "Tirar as costas do encosto para empurrar mais peso.",
    alternativaId: "supino-inclinado-halteres",
  },
  {
    id: "desenvolvimento-halteres",
    nome: "Desenvolvimento com halteres sentado",
    grupos: ["ombro", "triceps"],
    animacao: { origem: "Dumbbell_Shoulder_Press" },
    dicas: [
      "Banco quase reto (80 a 90°), lombar apoiada.",
      "Comece com os halteres na altura das orelhas.",
      "Suba até quase estender os braços, sem bater os halteres.",
    ],
    erroComum: "Arquear muito a lombar para conseguir subir a carga.",
  },
  {
    id: "elevacao-lateral",
    nome: "Elevação lateral com halteres",
    grupos: ["ombro"],
    animacao: { origem: "Side_Lateral_Raise" },
    dicas: [
      "Cotovelos levemente flexionados durante todo o movimento.",
      "Suba até a altura dos ombros, não mais.",
      "Carga leve e controle na descida; aqui o peso é pequeno mesmo.",
    ],
    erroComum: "Balançar o corpo e usar o trapézio para jogar o peso.",
  },
  {
    id: "crucifixo-maquina",
    nome: "Crucifixo na máquina (voador)",
    grupos: ["peito"],
    animacao: { origem: "Butterfly" },
    dicas: [
      "Ajuste o banco para as pegadas ficarem na altura do peito.",
      "Feche os braços como se abraçasse uma árvore.",
      "Abra só até sentir o peito alongar, sem forçar o ombro.",
    ],
    erroComum: "Abrir demais os braços e jogar o ombro para frente.",
  },
  {
    id: "triceps-corda",
    nome: "Tríceps na polia com corda",
    grupos: ["triceps"],
    animacao: { origem: "Triceps_Pushdown_-_Rope_Attachment" },
    dicas: [
      "Cotovelos colados ao corpo e parados.",
      "No final, afaste as pontas da corda para os lados.",
      "Volte até o antebraço passar um pouco da horizontal.",
    ],
    erroComum: "Mexer os cotovelos e usar o peso do corpo para descer a corda.",
    alternativaId: "triceps-testa-barra-w",
  },

  // Treino B: Puxar
  {
    id: "puxada-frontal",
    nome: "Puxada frontal na polia",
    grupos: ["costas", "biceps"],
    animacao: { origem: "Wide-Grip_Lat_Pulldown" },
    dicas: [
      "Pegada um pouco mais aberta que os ombros.",
      "Puxe a barra até a parte de cima do peito, peito em direção à barra.",
      "Pense em levar os cotovelos para baixo e para trás.",
    ],
    erroComum: "Jogar o tronco muito para trás e puxar com o embalo.",
    alternativaId: "remada-maquina-neutra",
  },
  {
    id: "remada-baixa",
    nome: "Remada baixa sentada (triângulo)",
    grupos: ["costas", "biceps"],
    animacao: { origem: "Seated_Cable_Rows" },
    dicas: [
      "Coluna neutra e tronco quase parado.",
      "Puxe o triângulo até a altura do umbigo.",
      "Junte as escápulas no final e segure 1 segundo.",
    ],
    erroComum: "Balançar o tronco para frente e para trás a cada repetição.",
    alternativaId: "remada-maquina-neutra",
  },
  {
    id: "remada-unilateral",
    nome: "Remada unilateral com halter (serrote)",
    grupos: ["costas", "biceps"],
    animacao: { origem: "One-Arm_Dumbbell_Row" },
    dicas: [
      "Mão e joelho do mesmo lado apoiados no banco, costas retas.",
      "Puxe o halter em direção ao quadril, não ao peito.",
      "Desça até alongar bem as costas.",
    ],
    erroComum: "Girar o tronco para subir o halter.",
  },
  {
    id: "face-pull",
    nome: "Face pull na polia",
    grupos: ["ombro", "costas"],
    animacao: { origem: "Face_Pull" },
    dicas: [
      "Polia na altura do rosto, corda com pegada por cima.",
      "Puxe em direção ao rosto abrindo as mãos para os lados.",
      "Cotovelos altos, na linha dos ombros.",
    ],
    erroComum: "Usar carga demais e puxar com a lombar.",
  },
  {
    id: "rosca-direta-halteres",
    nome: "Rosca direta com halteres",
    grupos: ["biceps"],
    animacao: { origem: "Dumbbell_Bicep_Curl" },
    dicas: [
      "Cotovelos parados ao lado do corpo.",
      "Suba girando a palma para cima.",
      "Desça até estender quase todo o braço.",
    ],
    erroComum: "Balançar o tronco para ajudar a subir.",
    alternativaId: "rosca-polia-baixa",
  },
  {
    id: "rosca-martelo",
    nome: "Rosca martelo",
    grupos: ["biceps"],
    animacao: { origem: "Hammer_Curls" },
    dicas: [
      "Palmas viradas uma para a outra o tempo todo.",
      "Cotovelos colados ao corpo.",
      "Pode alternar os braços se a carga estiver pesada.",
    ],
    erroComum: "Levar o cotovelo para frente no final da subida.",
  },

  // Treino C: Perna
  {
    id: "leg-press",
    nome: "Leg press 45°",
    grupos: ["quadriceps", "gluteo"],
    animacao: { origem: "Leg_Press" },
    dicas: [
      "Pés na largura dos ombros, no meio da plataforma.",
      "Desça até onde a lombar continua encostada no banco.",
      "Não trave os joelhos no topo.",
    ],
    erroComum: "Descer demais e tirar o quadril do banco.",
    alternativaId: "agachamento-goblet",
  },
  {
    id: "agachamento-goblet",
    nome: "Agachamento goblet com halter",
    grupos: ["quadriceps", "gluteo", "core"],
    animacao: { origem: "Goblet_Squat" },
    dicas: [
      "Segure o halter colado ao peito, cotovelos para baixo.",
      "Desça empurrando o quadril para trás e os joelhos para fora.",
      "Tronco alto e calcanhares no chão.",
    ],
    erroComum: "Deixar os joelhos caírem para dentro na subida.",
  },
  {
    id: "stiff-halteres",
    nome: "Stiff com halteres",
    grupos: ["posterior", "gluteo"],
    animacao: { origem: "Stiff-Legged_Dumbbell_Deadlift" },
    dicas: [
      "Joelhos levemente flexionados e parados.",
      "Leve o quadril para trás, halteres raspando nas coxas.",
      "Desça até sentir a parte de trás da coxa alongar, coluna reta.",
    ],
    erroComum: "Arredondar as costas para descer mais.",
    alternativaId: "mesa-flexora",
  },
  {
    id: "cadeira-extensora",
    nome: "Cadeira extensora",
    grupos: ["quadriceps"],
    animacao: { origem: "Leg_Extensions" },
    dicas: [
      "Joelho alinhado com o eixo da máquina.",
      "Estenda a perna e segure 1 segundo em cima.",
      "Desça devagar, sem deixar o peso bater.",
    ],
    erroComum: "Chutar o peso e perder o controle na descida.",
  },
  {
    id: "mesa-flexora",
    nome: "Mesa flexora",
    grupos: ["posterior"],
    animacao: { origem: "Lying_Leg_Curls" },
    dicas: [
      "Joelho logo depois da borda do banco.",
      "Quadril colado no banco durante todo o movimento.",
      "Suba até perto do glúteo e desça controlando.",
    ],
    erroComum: "Levantar o quadril para ajudar a subir o peso.",
  },
  {
    id: "panturrilha-em-pe",
    nome: "Panturrilha em pé na máquina",
    grupos: ["panturrilha"],
    animacao: { origem: "Standing_Calf_Raises" },
    dicas: [
      "Ponta dos pés na borda, calcanhar livre.",
      "Desça até alongar bem e suba o máximo possível.",
      "Pause 1 segundo em cima.",
    ],
    erroComum: "Fazer meio movimento, rápido e quicando.",
    alternativaId: "panturrilha-leg-press",
  },
  {
    id: "panturrilha-leg-press",
    nome: "Panturrilha no leg press",
    grupos: ["panturrilha"],
    animacao: { origem: "Calf_Press_On_The_Leg_Press_Machine" },
    dicas: [
      "Só a ponta dos pés na parte de baixo da plataforma.",
      "Joelhos estendidos, sem travar.",
      "Empurre com a ponta dos pés e volte alongando.",
    ],
    erroComum: "Destravar a trava de segurança sem firmeza nos pés.",
  },
  {
    id: "prancha",
    nome: "Prancha abdominal",
    grupos: ["core"],
    animacao: { origem: "Plank", estatica: true },
    dicas: [
      "Cotovelos embaixo dos ombros.",
      "Corpo em linha reta da cabeça aos calcanhares.",
      "Contraia abdômen e glúteo e respire normalmente.",
    ],
    erroComum: "Deixar o quadril cair ou subir demais.",
  },

  // Treino D: Superior completo + braços
  {
    id: "supino-inclinado-halteres",
    nome: "Supino inclinado com halteres",
    grupos: ["peito", "ombro", "triceps"],
    animacao: { origem: "Incline_Dumbbell_Press" },
    dicas: [
      "Banco a cerca de 30°.",
      "Desça os halteres até a parte de cima do peito.",
      "Escápulas encaixadas, como no supino reto.",
    ],
    erroComum: "Inclinar demais o banco e transformar em exercício de ombro.",
    alternativaId: "supino-inclinado-maquina",
  },
  {
    id: "remada-maquina-neutra",
    nome: "Remada na máquina (pegada neutra)",
    grupos: ["costas", "biceps"],
    animacao: { origem: "Leverage_Iso_Row" },
    dicas: [
      "Peito apoiado no encosto, se a máquina tiver.",
      "Puxe levando os cotovelos para trás, rente ao corpo.",
      "Volte até alongar as costas, sem soltar o peso.",
    ],
    erroComum: "Tirar o peito do apoio para puxar com o tronco.",
    alternativaId: "remada-baixa",
  },
  {
    id: "rosca-scott-maquina",
    nome: "Rosca Scott na máquina",
    grupos: ["biceps"],
    animacao: { origem: "Machine_Preacher_Curls" },
    dicas: [
      "Axilas encaixadas no topo do apoio.",
      "Desça até quase estender, sem relaxar no final.",
      "Suba sem tirar os cotovelos do apoio.",
    ],
    erroComum: "Estender totalmente e soltar o peso embaixo, forçando o cotovelo.",
    alternativaId: "rosca-polia-baixa",
  },
  {
    id: "triceps-testa-barra-w",
    nome: "Tríceps testa com barra W",
    grupos: ["triceps"],
    animacao: { origem: "EZ-Bar_Skullcrusher" },
    dicas: [
      "Braços apontando para o teto, cotovelos fechados.",
      "Dobre só os cotovelos, levando a barra até perto da testa.",
      "Carga moderada: o cotovelo agradece.",
    ],
    erroComum: "Abrir os cotovelos para os lados.",
    alternativaId: "triceps-corda",
  },
  {
    id: "rosca-polia-baixa",
    nome: "Rosca na polia baixa",
    grupos: ["biceps"],
    animacao: { origem: "Standing_Biceps_Cable_Curl" },
    dicas: [
      "Fique um passo à frente da polia.",
      "Cotovelos parados ao lado do corpo.",
      "A polia mantém tensão o tempo todo: controle a descida.",
    ],
    erroComum: "Inclinar o corpo para trás para subir.",
  },
  {
    id: "triceps-frances-halter",
    nome: "Tríceps francês sentado com halter",
    grupos: ["triceps"],
    animacao: { origem: "Seated_Triceps_Press" },
    dicas: [
      "Sente com a lombar apoiada.",
      "Cotovelos apontando para cima, perto da cabeça.",
      "Desça o halter atrás da cabeça e suba estendendo os braços.",
    ],
    erroComum: "Arquear a lombar e abrir os cotovelos.",
  },
];

export const exercisesById: Record<string, Exercise> = Object.fromEntries(
  exercises.map((e) => [e.id, e]),
);

export function getExercise(id: string): Exercise | undefined {
  return exercisesById[id];
}
