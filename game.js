/**
 * WACKO RACCOON! - Edição Deluxe HD (Web & Mobile 100% Responsivo)
 */

// ---------------------------------------------------------------------------
// 1. CONFIGURAÇÃO DAS FASES PROGRESSIVAS E MODO INFINITO
// ---------------------------------------------------------------------------
const LEVELS = [
  {
    num: 1,
    name: "Quintal Ensolarado",
    subtitle: "Acerte os guaxinins! Cuidado: clicar em buraco vazio tira 1 vida!",
    grid: [3, 3],
    duration: 38,
    targetScore: 750,
    spawnInterval: [0.90, 1.35],
    stayTime: [1.35, 1.85],
    maxActive: 2,
    weights: { normal: 85, golden: 10, bandit: 5, helmet: 0, bomb: 0, decoy: 0, clock: 0 },
    theme: { sky: [95, 185, 248], hills: [88, 178, 86], lawn: [74, 162, 68], accent: "#ffd73c" },
  },
  {
    num: 2,
    name: "Horta da Vovó",
    subtitle: "Cuidado com as Bombas e não clique em buracos vazios!",
    grid: [3, 3],
    duration: 40,
    targetScore: 1400,
    spawnInterval: [0.80, 1.25],
    stayTime: [1.20, 1.65],
    maxActive: 3,
    weights: { normal: 60, bandit: 15, golden: 12, bomb: 9, clock: 4, helmet: 0, decoy: 0 },
    theme: { sky: [115, 200, 242], hills: [102, 174, 74], lawn: [82, 154, 58], accent: "#ffa532" },
  },
  {
    num: 3,
    name: "Acampamento da Floresta",
    subtitle: "Guaxinins de Capacete precisam de 2 marretadas!",
    grid: [3, 3],
    duration: 42,
    targetScore: 2200,
    spawnInterval: [0.72, 1.15],
    stayTime: [1.10, 1.55],
    maxActive: 3,
    weights: { normal: 46, bandit: 18, helmet: 16, golden: 10, bomb: 6, clock: 4, decoy: 0 },
    theme: { sky: [238, 148, 96], hills: [78, 134, 74], lawn: [60, 122, 62], accent: "#ff8241" },
  },
  {
    num: 4,
    name: "Noite dos Guaxinins",
    subtitle: "Proteja a Florzinha rosa! Bater nela tira pontos!",
    grid: [3, 4],
    duration: 44,
    targetScore: 3000,
    spawnInterval: [0.65, 1.05],
    stayTime: [1.05, 1.45],
    maxActive: 4,
    weights: { normal: 38, bandit: 20, helmet: 16, golden: 10, bomb: 7, decoy: 5, clock: 4 },
    theme: { sky: [28, 38, 78], hills: [38, 74, 78], lawn: [34, 92, 64], accent: "#8cdcff" },
  },
  {
    num: 5,
    name: "Pântano Misterioso",
    subtitle: "Fintas rápidas na neblina! Observe com atenção!",
    grid: [3, 4],
    duration: 46,
    targetScore: 3800,
    spawnInterval: [0.60, 0.98],
    stayTime: [1.00, 1.40],
    maxActive: 4,
    weights: { normal: 34, bandit: 22, helmet: 16, golden: 12, bomb: 7, decoy: 5, clock: 4 },
    theme: { sky: [46, 68, 64], hills: [52, 92, 70], lawn: [40, 110, 58], accent: "#75ffad" },
  },
  {
    num: 6,
    name: "Mina Dourada Perdida",
    subtitle: "Chuva de Guaxinins Dourados! Aproveite para pontuar alto!",
    grid: [3, 4],
    duration: 48,
    targetScore: 4800,
    spawnInterval: [0.55, 0.92],
    stayTime: [0.95, 1.35],
    maxActive: 4,
    weights: { normal: 26, bandit: 20, helmet: 14, golden: 26, bomb: 6, decoy: 4, clock: 4 },
    theme: { sky: [78, 54, 30], hills: [96, 72, 38], lawn: [72, 98, 48], accent: "#ffd72d" },
  },
  {
    num: 7,
    name: "Dunas do Deserto Escaldante",
    subtitle: "Grade 4x4 ampla! Mantenha a calma e foque nos alvos!",
    grid: [4, 4],
    duration: 50,
    targetScore: 5800,
    spawnInterval: [0.50, 0.88],
    stayTime: [0.90, 1.30],
    maxActive: 5,
    weights: { normal: 28, bandit: 24, helmet: 18, golden: 14, bomb: 7, decoy: 5, clock: 4 },
    theme: { sky: [245, 160, 78], hills: [185, 120, 58], lawn: [142, 134, 62], accent: "#ff9d3b" },
  },
  {
    num: 8,
    name: "Pico Nevado dos Ventos",
    subtitle: "Congele o tempo com os relógios de gelo antes que o frio vença!",
    grid: [4, 4],
    duration: 52,
    targetScore: 7000,
    spawnInterval: [0.46, 0.82],
    stayTime: [0.85, 1.25],
    maxActive: 5,
    weights: { normal: 24, bandit: 22, helmet: 18, golden: 14, bomb: 7, decoy: 5, clock: 10 },
    theme: { sky: [140, 195, 235], hills: [120, 165, 205], lawn: [105, 150, 165], accent: "#82f0ff" },
  },
  {
    num: 9,
    name: "Vulcão do Trovão",
    subtitle: "Reflexos rápidos no vulcão! Evite marretar o chão!",
    grid: [4, 4],
    duration: 54,
    targetScore: 8200,
    spawnInterval: [0.42, 0.78],
    stayTime: [0.80, 1.20],
    maxActive: 5,
    weights: { normal: 22, bandit: 25, helmet: 20, golden: 15, bomb: 8, decoy: 5, clock: 5 },
    theme: { sky: [58, 22, 28], hills: [88, 34, 42], lawn: [54, 42, 52], accent: "#ff4433" },
  },
  {
    num: 10,
    name: "Castelo Supremo do Rei Guaxinim",
    subtitle: "O Grande Duelo Final! Derrote o Rei e conquiste a Coroa!",
    grid: [4, 4],
    duration: 58,
    targetScore: 9600,
    spawnInterval: [0.38, 0.72],
    stayTime: [0.75, 1.15],
    maxActive: 6,
    weights: { normal: 20, bandit: 26, helmet: 20, golden: 18, bomb: 8, decoy: 4, clock: 4 },
    theme: { sky: [38, 16, 52], hills: [74, 38, 78], lawn: [46, 68, 62], accent: "#ffe63b" },
  },
];

function getDynamicLevel(levelIdx) {
  if (levelIdx < LEVELS.length) {
    return JSON.parse(JSON.stringify(LEVELS[levelIdx]));
  }
  const extra = levelIdx - LEVELS.length + 1;
  const base = JSON.parse(JSON.stringify(LEVELS[LEVELS.length - 1]));
  base.num = levelIdx + 1;
  base.name = `Insanidade Guaxinim #${extra}`;
  base.subtitle = "Modo Mestre Infinito — Até onde seus reflexos chegam?";
  base.targetScore = Math.round(base.targetScore + extra * 2600);
  const sMin = Math.max(0.16, base.spawnInterval[0] * Math.pow(0.92, extra));
  const sMax = Math.max(0.32, base.spawnInterval[1] * Math.pow(0.92, extra));
  const tMin = Math.max(0.44, base.stayTime[0] * Math.pow(0.94, extra));
  const tMax = Math.max(0.72, base.stayTime[1] * Math.pow(0.94, extra));
  base.spawnInterval = [sMin, sMax];
  base.stayTime = [tMin, tMax];
  base.maxActive = Math.min(8, 7 + Math.floor(extra / 2));
  return base;
}

// ---------------------------------------------------------------------------
// 2. MÚSICA TEMÁTICA PROCEDURAL PARA CADA UMA DAS 10 FASES (WEB AUDIO API)
// ---------------------------------------------------------------------------
const LEVEL_THEMES = [
  // Fase 1: Quintal Ensolarado (C Major alegre, clássico arcade estilo parque)
  {
    name: "Quintal Alegre",
    tempo: 130,
    waveType: "sine",
    cutoff: 2400,
    melody: [
      523.25, null, 659.25, 523.25, 783.99, null, 659.25, null,
      587.33, null, 523.25, null, 440.00, 493.88, 523.25, null,
      659.25, null, 659.25, 783.99, 880.00, null, 783.99, null,
      659.25, 587.33, 523.25, 440.00, 493.88, null, 523.25, null,
    ],
    bass: [
      130.81, null, 130.81, null, 174.61, null, 174.61, null,
      146.83, null, 146.83, null, 196.00, null, 196.00, null,
      174.61, null, 174.61, null, 130.81, null, 130.81, null,
      196.00, null, 196.00, null, 130.81, 164.81, 196.00, 261.63,
    ],
    chords: [
      null, [261.63, 329.63, 392.00], null, [261.63, 329.63, 392.00],
      null, [349.23, 440.00, 523.25], null, [349.23, 440.00, 523.25],
      null, [293.66, 349.23, 440.00], null, [293.66, 349.23, 440.00],
      null, [392.00, 493.88, 587.33], null, [392.00, 493.88, 587.33],
      null, [349.23, 440.00, 523.25], null, [349.23, 440.00, 523.25],
      null, [261.63, 329.63, 392.00], null, [261.63, 329.63, 392.00],
      null, [392.00, 493.88, 587.33], null, [392.00, 493.88, 587.33],
      null, [261.63, 329.63, 392.00], null, [261.63, 329.63, 392.00],
    ],
  },
  // Fase 2: Horta da Vovó (Valsa campestre caipira 3/4 rápida em F Major)
  {
    name: "Horta Caipira",
    tempo: 138,
    waveType: "triangle",
    cutoff: 2100,
    melody: [
      349.23, 440.00, 523.25, null, 587.33, 523.25, 440.00, null,
      392.00, 440.00, 523.25, null, 440.00, 392.00, 349.23, null,
      349.23, 523.25, 698.46, null, 659.25, 587.33, 523.25, null,
      587.33, 523.25, 440.00, 392.00, 349.23, null, 349.23, null,
    ],
    bass: [
      174.61, null, 261.63, 261.63, 146.83, null, 220.00, 220.00,
      196.00, null, 293.66, 293.66, 174.61, null, 261.63, 261.63,
      174.61, null, 261.63, 261.63, 116.54, null, 233.08, 233.08,
      196.00, null, 293.66, 293.66, 174.61, 220.00, 261.63, 349.23,
    ],
    chords: [
      null, [349.23, 440.00], [349.23, 440.00], null,
      null, [293.66, 349.23], [293.66, 349.23], null,
      null, [392.00, 493.88], [392.00, 493.88], null,
      null, [349.23, 440.00], [349.23, 440.00], null,
      null, [349.23, 440.00], [349.23, 440.00], null,
      null, [233.08, 293.66], [233.08, 293.66], null,
      null, [392.00, 493.88], [392.00, 493.88], null,
      null, [349.23, 440.00], [349.23, 440.00], null,
    ],
  },
  // Fase 3: Acampamento da Floresta (Marcha aventureira sincopada em Sol Maior)
  {
    name: "Marcha da Floresta",
    tempo: 132,
    waveType: "triangle",
    cutoff: 2300,
    melody: [
      392.00, null, 493.88, null, 587.33, null, 659.25, 587.33,
      493.88, null, 440.00, null, 392.00, 440.00, 493.88, null,
      587.33, null, 783.99, null, 739.99, null, 659.25, null,
      587.33, 493.88, 440.00, 493.88, 392.00, null, 392.00, null,
    ],
    bass: [
      98.00, null, 146.83, null, 98.00, null, 146.83, null,
      82.41, null, 123.47, null, 110.00, null, 146.83, null,
      98.00, null, 146.83, null, 130.81, null, 164.81, null,
      146.83, null, 146.83, null, 98.00, 123.47, 146.83, 196.00,
    ],
    chords: [
      null, [392.00, 493.88], null, [392.00, 493.88],
      null, [329.63, 392.00], null, [329.63, 392.00],
      null, [440.00, 554.37], null, [440.00, 554.37],
      null, [392.00, 493.88], null, [392.00, 493.88],
      null, [392.00, 493.88], null, [392.00, 493.88],
      null, [329.63, 392.00], null, [329.63, 392.00],
      null, [293.66, 369.99], null, [293.66, 369.99],
      null, [392.00, 493.88], null, [392.00, 493.88],
    ],
  },
  // Fase 4: Noite dos Guaxinins (Dança mágica e misteriosa em Lá Menor)
  {
    name: "Dança da Meia-Noite",
    tempo: 122,
    waveType: "sine",
    cutoff: 1900,
    melody: [
      440.00, null, 523.25, null, 659.25, null, 523.25, null,
      587.33, null, 493.88, null, 440.00, null, 415.30, null,
      440.00, 523.25, 659.25, 880.00, 783.99, null, 659.25, null,
      587.33, null, 523.25, null, 493.88, null, 440.00, null,
    ],
    bass: [
      110.00, null, 164.81, null, 110.00, null, 164.81, null,
      146.83, null, 174.61, null, 103.83, null, 164.81, null,
      110.00, null, 164.81, null, 87.31, null, 130.81, null,
      98.00, null, 146.83, null, 110.00, 130.81, 164.81, 220.00,
    ],
    chords: [
      null, [440.00, 523.25], null, [440.00, 523.25],
      null, [392.00, 493.88], null, [392.00, 493.88],
      null, [415.30, 493.88], null, [415.30, 493.88],
      null, [440.00, 523.25], null, [440.00, 523.25],
      null, [440.00, 523.25], null, [440.00, 523.25],
      null, [349.23, 440.00], null, [349.23, 440.00],
      null, [392.00, 493.88], null, [392.00, 493.88],
      null, [440.00, 523.25], null, [440.00, 523.25],
    ],
  },
  // Fase 5: Pântano Misterioso (Funk/Groove sincopado em Ré Dórico)
  {
    name: "Groove do Pântano",
    tempo: 125,
    waveType: "triangle",
    cutoff: 2100,
    melody: [
      293.66, null, 349.23, null, 392.00, 415.30, 440.00, null,
      392.00, null, 349.23, null, 293.66, null, 261.63, 293.66,
      349.23, null, 392.00, null, 440.00, null, 523.25, null,
      440.00, 392.00, 349.23, 293.66, 261.63, null, 293.66, null,
    ],
    bass: [
      73.42, 73.42, null, 87.31, 98.00, null, 103.83, 110.00,
      73.42, null, 110.00, null, 98.00, null, 87.31, null,
      73.42, 73.42, null, 87.31, 98.00, null, 110.00, null,
      130.81, null, 110.00, null, 98.00, 87.31, 73.42, null,
    ],
    chords: [
      null, [293.66, 349.23], null, [293.66, 349.23],
      null, [349.23, 440.00], null, [349.23, 440.00],
      null, [261.63, 329.63], null, [261.63, 329.63],
      null, [293.66, 349.23], null, [293.66, 349.23],
      null, [293.66, 349.23], null, [293.66, 349.23],
      null, [392.00, 466.16], null, [392.00, 466.16],
      null, [349.23, 440.00], null, [349.23, 440.00],
      null, [293.66, 349.23], null, [293.66, 349.23],
    ],
  },
  // Fase 6: Mina Dourada Perdida (Calypso tropical animado das pepitas de ouro)
  {
    name: "Calypso das Pepitas",
    tempo: 142,
    waveType: "sine",
    cutoff: 2600,
    melody: [
      523.25, null, 659.25, 783.99, null, 783.99, 880.00, null,
      783.99, null, 659.25, null, 587.33, 523.25, 587.33, null,
      659.25, null, 783.99, 880.00, null, 880.00, 1046.5, null,
      783.99, null, 659.25, null, 587.33, 493.88, 523.25, null,
    ],
    bass: [
      130.81, null, 196.00, null, 130.81, null, 196.00, null,
      146.83, null, 220.00, null, 196.00, null, 146.83, null,
      130.81, null, 196.00, null, 174.61, null, 261.63, null,
      196.00, null, 246.94, null, 130.81, 164.81, 196.00, 261.63,
    ],
    chords: [
      null, [261.63, 329.63, 392.00], null, [261.63, 329.63, 392.00],
      null, [293.66, 369.99, 440.00], null, [293.66, 369.99, 440.00],
      null, [392.00, 493.88, 587.33], null, [392.00, 493.88, 587.33],
      null, [261.63, 329.63, 392.00], null, [261.63, 329.63, 392.00],
      null, [261.63, 329.63, 392.00], null, [261.63, 329.63, 392.00],
      null, [349.23, 440.00, 523.25], null, [349.23, 440.00, 523.25],
      null, [392.00, 493.88, 587.33], null, [392.00, 493.88, 587.33],
      null, [261.63, 329.63, 392.00], null, [261.63, 329.63, 392.00],
    ],
  },
  // Fase 7: Dunas do Deserto Escaldante (Escala exótica oriental rápida)
  {
    name: "Tempestade nas Dunas",
    tempo: 136,
    waveType: "sawtooth",
    cutoff: 1750,
    melody: [
      293.66, 311.13, 369.99, null, 392.00, null, 440.00, null,
      466.16, 440.00, 392.00, 369.99, 311.13, null, 293.66, null,
      369.99, null, 392.00, null, 440.00, null, 466.16, null,
      587.33, 466.16, 440.00, 369.99, 311.13, 277.18, 293.66, null,
    ],
    bass: [
      73.42, null, 73.42, null, 77.78, null, 77.78, null,
      92.50, null, 92.50, null, 73.42, null, 73.42, null,
      73.42, null, 77.78, null, 92.50, null, 110.00, null,
      116.54, null, 92.50, null, 77.78, null, 73.42, null,
    ],
    chords: [
      null, [293.66, 369.99], null, [293.66, 369.99],
      null, [311.13, 392.00], null, [311.13, 392.00],
      null, [369.99, 440.00], null, [369.99, 440.00],
      null, [293.66, 369.99], null, [293.66, 369.99],
      null, [293.66, 369.99], null, [293.66, 369.99],
      null, [311.13, 392.00], null, [311.13, 392.00],
      null, [440.00, 466.16], null, [440.00, 466.16],
      null, [293.66, 369.99], null, [293.66, 369.99],
    ],
  },
  // Fase 8: Pico Nevado dos Ventos (Sinos de gelo cristalinos em Mi Menor)
  {
    name: "Cristais de Gelo",
    tempo: 144,
    waveType: "triangle",
    cutoff: 2800,
    melody: [
      659.25, null, 783.99, null, 987.77, null, 880.00, null,
      783.99, null, 659.25, null, 587.33, null, 659.25, null,
      783.99, null, 987.77, null, 1174.66, null, 987.77, null,
      880.00, null, 783.99, null, 659.25, 587.33, 659.25, null,
    ],
    bass: [
      82.41, null, 123.47, null, 82.41, null, 123.47, null,
      104.83, null, 130.81, null, 98.00, null, 146.83, null,
      82.41, null, 123.47, null, 110.00, null, 164.81, null,
      123.47, null, 164.81, null, 82.41, 98.00, 123.47, 164.81,
    ],
    chords: [
      null, [329.63, 392.00], null, [329.63, 392.00],
      null, [261.63, 329.63], null, [261.63, 329.63],
      null, [293.66, 392.00], null, [293.66, 392.00],
      null, [329.63, 392.00], null, [329.63, 392.00],
      null, [329.63, 392.00], null, [329.63, 392.00],
      null, [440.00, 523.25], null, [440.00, 523.25],
      null, [493.88, 587.33], null, [493.88, 587.33],
      null, [329.63, 392.00], null, [329.63, 392.00],
    ],
  },
  // Fase 9: Vulcão do Trovão (Rock arcade pesado e acelerado)
  {
    name: "Fúria Magmática",
    tempo: 146,
    waveType: "sawtooth",
    cutoff: 1900,
    melody: [
      440.00, 440.00, 523.25, null, 587.33, 622.25, 659.25, null,
      783.99, null, 659.25, null, 587.33, 523.25, 440.00, null,
      440.00, 523.25, 587.33, null, 659.25, null, 783.99, null,
      880.00, null, 783.99, null, 659.25, 587.33, 440.00, null,
    ],
    bass: [
      110.00, 110.00, null, 110.00, 130.81, null, 146.83, 155.56,
      164.81, null, 164.81, null, 146.83, null, 130.81, null,
      110.00, 110.00, null, 110.00, 146.83, null, 164.81, null,
      174.61, null, 164.81, null, 146.83, 130.81, 110.00, null,
    ],
    chords: [
      null, [440.00, 523.25], null, [440.00, 523.25],
      null, [329.63, 440.00], null, [329.63, 440.00],
      null, [392.00, 523.25], null, [392.00, 523.25],
      null, [440.00, 523.25], null, [440.00, 523.25],
      null, [440.00, 523.25], null, [440.00, 523.25],
      null, [329.63, 440.00], null, [329.63, 440.00],
      null, [349.23, 440.00], null, [349.23, 440.00],
      null, [440.00, 523.25], null, [440.00, 523.25],
    ],
  },
  // Fase 10: Castelo Supremo do Rei Guaxinim (Fanfarra Épica Triunfal)
  {
    name: "Fanfarra do Rei Supremo",
    tempo: 148,
    waveType: "triangle",
    cutoff: 2700,
    melody: [
      523.25, null, 523.25, 659.25, 783.99, null, 1046.5, null,
      987.77, null, 880.00, null, 783.99, null, 659.25, null,
      698.46, 783.99, 880.00, null, 987.77, null, 1046.5, null,
      1174.66, null, 987.77, null, 1046.5, null, 1046.5, null,
    ],
    bass: [
      130.81, null, 196.00, null, 130.81, null, 196.00, null,
      174.61, null, 220.00, null, 196.00, null, 246.94, null,
      174.61, null, 220.00, null, 196.00, null, 246.94, null,
      130.81, 164.81, 196.00, 246.94, 261.63, null, 261.63, null,
    ],
    chords: [
      null, [261.63, 329.63, 392.00], null, [261.63, 329.63, 392.00],
      null, [349.23, 440.00, 523.25], null, [349.23, 440.00, 523.25],
      null, [392.00, 493.88, 587.33], null, [392.00, 493.88, 587.33],
      null, [261.63, 329.63, 392.00], null, [261.63, 329.63, 392.00],
      null, [349.23, 440.00, 523.25], null, [349.23, 440.00, 523.25],
      null, [392.00, 493.88, 587.33], null, [392.00, 493.88, 587.33],
      null, [293.66, 369.99, 440.00], null, [293.66, 369.99, 440.00],
      null, [261.63, 329.63, 392.00], null, [261.63, 329.63, 392.00],
    ],
  },
];

class ArcadeMusic {
  constructor(soundBank) {
    this.sb = soundBank;
    this.isPlaying = false;
    this.step = 0;
    this.timer = null;
    this.gainNode = null;
    this.filterNode = null;
    this.isFrenzy = false;
    this.nextNoteTime = 0;
    this.themeIdx = 0;
    this.currentTheme = LEVEL_THEMES[0];
    this.tempo = this.currentTheme.tempo;
  }

  setLevelTheme(levelIdx) {
    const idx = Math.max(0, Math.min(LEVEL_THEMES.length - 1, levelIdx));
    this.themeIdx = idx;
    this.currentTheme = LEVEL_THEMES[idx];
    this.tempo = this.currentTheme.tempo;
    this.step = 0;
    if (this.filterNode && this.sb.ctx) {
      this.filterNode.frequency.setValueAtTime(this.currentTheme.cutoff || 2200, this.sb.ctx.currentTime);
    }
  }

  ensureNodes() {
    if (!this.sb.ctx) return false;
    if (!this.gainNode) {
      this.gainNode = this.sb.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.sb.muted ? 0.0001 : 0.15, this.sb.ctx.currentTime);

      this.filterNode = this.sb.ctx.createBiquadFilter();
      this.filterNode.type = "lowpass";
      this.filterNode.frequency.setValueAtTime(this.currentTheme.cutoff || 2200, this.sb.ctx.currentTime);

      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.sb.ctx.destination);
    }
    return true;
  }

  start() {
    this.sb.init();
    if (!this.ensureNodes()) return;
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;
    this.nextNoteTime = this.sb.ctx.currentTime + 0.05;
    this.scheduleLoop();
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  resume() {
    if (!this.isPlaying) {
      this.start();
    }
  }

  setMuted(muted) {
    if (!this.gainNode || !this.sb.ctx) return;
    const now = this.sb.ctx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.linearRampToValueAtTime(muted ? 0.0001 : 0.15, now + 0.05);
  }

  setFrenzy(frenzy) {
    this.isFrenzy = frenzy;
    const baseT = this.currentTheme ? this.currentTheme.tempo : 130;
    this.tempo = frenzy ? baseT + 22 : baseT;
  }

  scheduleLoop() {
    if (!this.isPlaying || !this.sb.ctx) return;
    const ctx = this.sb.ctx;
    const baseT = this.currentTheme ? this.currentTheme.tempo : 130;
    const currentTempo = this.isFrenzy ? baseT + 22 : baseT;
    const secondsPerBeat = 60.0 / currentTempo;
    const stepDuration = secondsPerBeat / 4; // 16th note

    while (this.nextNoteTime < ctx.currentTime + 0.20) {
      this.scheduleStep(this.step, this.nextNoteTime, stepDuration);
      this.step = (this.step + 1) % 32;
      this.nextNoteTime += stepDuration;
    }

    this.timer = setTimeout(() => this.scheduleLoop(), 40);
  }

  scheduleStep(stepIdx, time, dur) {
    if (this.sb.muted || !this.filterNode) return;
    const ctx = this.sb.ctx;
    const theme = this.currentTheme || LEVEL_THEMES[0];

    // 1. Melodia temática
    const melNote = theme.melody ? theme.melody[stepIdx] : null;
    if (melNote) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = theme.waveType || "sine";
      const freq = this.isFrenzy ? melNote * 1.5 : melNote;
      osc.frequency.setValueAtTime(freq, time);

      g.gain.setValueAtTime(0.001, time);
      g.gain.linearRampToValueAtTime(0.16, time + 0.012);
      g.gain.exponentialRampToValueAtTime(0.001, time + dur * 1.35);

      osc.connect(g);
      g.connect(this.filterNode);
      osc.start(time);
      osc.stop(time + dur * 1.35);
    }

    // 2. Linha de baixo temática
    const bassNote = theme.bass ? theme.bass[stepIdx] : null;
    if (bassNote) {
      const bOsc = ctx.createOscillator();
      const bG = ctx.createGain();
      bOsc.type = "triangle";
      bOsc.frequency.setValueAtTime(bassNote, time);

      bG.gain.setValueAtTime(0.001, time);
      bG.gain.linearRampToValueAtTime(0.22, time + 0.014);
      bG.gain.exponentialRampToValueAtTime(0.001, time + dur * 1.5);

      bOsc.connect(bG);
      bG.connect(this.filterNode);
      bOsc.start(time);
      bOsc.stop(time + dur * 1.5);
    }

    // 3. Acordes harmônicos
    const ch = theme.chords ? theme.chords[stepIdx] : null;
    if (ch && Array.isArray(ch)) {
      ch.forEach((f) => {
        const cOsc = ctx.createOscillator();
        const cG = ctx.createGain();
        cOsc.type = "triangle";
        cOsc.frequency.setValueAtTime(f, time);

        cG.gain.setValueAtTime(0.001, time);
        cG.gain.linearRampToValueAtTime(0.055, time + 0.01);
        cG.gain.exponentialRampToValueAtTime(0.001, time + dur * 1.2);

        cOsc.connect(cG);
        cG.connect(this.filterNode);
        cOsc.start(time);
        cOsc.stop(time + dur * 1.2);
      });
    }

    // 4. Ritmo percussivo suave nas contrabatidas
    if (stepIdx % 2 === 1) {
      this.playHiHat(time, dur * 0.35);
    }
  }

  playHiHat(time, dur) {
    if (this.sb.muted || !this.sb.ctx) return;
    const ctx = this.sb.ctx;
    const bufSize = Math.max(1, Math.floor(ctx.sampleRate * 0.03));
    const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.04;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.03, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + dur);
    noise.connect(g);
    g.connect(this.gainNode);
    noise.start(time);
  }
}

class SoundBank {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.music = new ArcadeMusic(this);
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    this.init();
    this.music.setMuted(this.muted);
    return this.muted;
  }

  playTone(freqStart, freqEnd, duration, waveType = "sine", volume = 0.3, noiseMix = 0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    gain.connect(this.ctx.destination);

    const osc = this.ctx.createOscillator();
    osc.type = waveType;
    osc.frequency.setValueAtTime(freqStart, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), now + duration);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + duration);

    if (noiseMix > 0) {
      const bufSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        data[i] = (Math.random() * 2 - 1) * noiseMix;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const nGain = this.ctx.createGain();
      nGain.gain.setValueAtTime(volume * noiseMix, now);
      nGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      noise.connect(nGain);
      nGain.connect(this.ctx.destination);
      noise.start(now);
    }
  }

  playChord(freqs, duration, volume = 0.22) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    freqs.forEach((f, idx) => {
      const startOffset = idx * 0.045;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, now + startOffset);
      gain.gain.setValueAtTime(0.001, now + startOffset);
      gain.gain.linearRampToValueAtTime(volume / freqs.length, now + startOffset + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + startOffset);
      osc.stop(now + duration);
    });
  }

  play(name) {
    if (this.muted) return;
    switch (name) {
      case "bonk":
        this.playTone(340, 88, 0.15, "triangle", 0.42, 0.2);
        break;
      case "golden":
        this.playChord([523.25, 659.25, 783.99, 1046.5, 1318.5], 0.42, 0.45);
        break;
      case "helmet":
        this.playTone(620, 410, 0.12, "square", 0.3, 0.12);
        break;
      case "bomb":
        this.playTone(175, 34, 0.48, "sawtooth", 0.48, 0.65);
        break;
      case "buzzer":
        // Som cômico de penalidade por bater em buraco vazio
        this.playTone(190, 75, 0.24, "sawtooth", 0.45, 0.32);
        break;
      case "decoy":
        this.playTone(320, 135, 0.28, "square", 0.32, 0.05);
        break;
      case "miss":
        this.playTone(220, 115, 0.08, "sine", 0.2, 0.1);
        break;
      case "levelup":
        this.playChord([440, 554.37, 659.25, 880, 1108.73], 0.6, 0.45);
        break;
      case "gameover":
        this.playChord([392.0, 349.23, 311.13, 261.63], 0.68, 0.42);
        break;
      case "freeze":
        this.playChord([659.25, 880.0, 1174.66, 1318.5], 0.42, 0.38);
        break;
      case "frenzy":
        this.playChord([587.33, 739.99, 880.0, 1174.66], 0.48, 0.44);
        break;
      case "pop":
        this.playTone(250, 490, 0.065, "sine", 0.14);
        break;
      case "click":
        this.playTone(680, 920, 0.055, "triangle", 0.25);
        break;
    }
  }
}

// ---------------------------------------------------------------------------
// 3. CLASSES DE EFEITOS VISUAIS E TOCAS (BURROW HOLES)
// ---------------------------------------------------------------------------
class FloatingText {
  constructor(x, y, text, color = "#fff050", size = 28) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.size = size;
    this.life = 1.05;
    this.maxLife = 1.05;
    this.vy = -85;
  }

  update(dt) {
    this.y += this.vy * dt;
    this.vy *= 0.93;
    this.life -= dt;
  }

  draw(ctx, uiScale) {
    if (this.life <= 0) return;
    const alpha = Math.max(0, Math.min(1, this.life / this.maxLife));
    const fontSize = Math.round(this.size * uiScale);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = `900 ${fontSize}px 'Fredoka', 'Segoe UI Black', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(4, Math.round(6 * uiScale));
    ctx.strokeStyle = "#180d06";
    ctx.strokeText(this.text, this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

class ImpactBurstEffect {
  constructor(x, y, burstImg, ringColor = "#ffeb5a", scale = 1.0) {
    this.x = x;
    this.y = y;
    this.burstImg = burstImg;
    this.ringColor = ringColor;
    this.baseScale = scale;
    this.life = 0.28;
    this.maxLife = 0.28;
  }

  update(dt) {
    this.life -= dt;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    const prog = 1.0 - this.life / this.maxLife;
    const alpha = Math.max(0, Math.min(1, 1.0 - Math.pow(prog, 1.6)));

    ctx.save();
    ctx.globalAlpha = alpha;

    // Onda de choque circular expansiva
    const radius = (26 + prog * 72) * this.baseScale;
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.lineWidth = Math.max(2, (7 * (1.0 - prog)) * this.baseScale);
    ctx.strokeStyle = this.ringColor;
    ctx.stroke();

    // Estrela de impacto estilo quadrinhos
    if (this.burstImg && this.burstImg.complete) {
      const s = (0.55 + 0.65 * Math.sin(Math.min(1, prog * 1.4) * (Math.PI / 2))) * this.baseScale;
      const bw = this.burstImg.width * s;
      const bh = this.burstImg.height * s;
      ctx.drawImage(this.burstImg, this.x - bw / 2, this.y - bh / 2, bw, bh);
    }

    ctx.restore();
  }
}

class Particle {
  constructor(x, y, color, speedRange = [80, 260], sizeRange = [4, 10], star = false, scale = 1.0) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const spd = (speedRange[0] + Math.random() * (speedRange[1] - speedRange[0])) * scale;
    this.vx = Math.cos(angle) * spd;
    this.vy = Math.sin(angle) * spd - (40 + Math.random() * 80) * scale;
    this.gravity = 460 * scale;
    this.color = color;
    this.size = (sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0])) * scale;
    this.life = 0.45 + Math.random() * 0.4;
    this.maxLife = this.life;
    this.star = star;
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += this.gravity * dt;
    this.life -= dt;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    const ratio = Math.max(0, this.life / this.maxLife);
    const r = Math.max(1.5, this.size * ratio);

    ctx.save();
    ctx.fillStyle = this.color;
    if (this.star) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - r * 1.6);
      ctx.lineTo(this.x + r * 0.55, this.y - r * 0.55);
      ctx.lineTo(this.x + r * 1.6, this.y);
      ctx.lineTo(this.x + r * 0.55, this.y + r * 0.55);
      ctx.lineTo(this.x, this.y + r * 1.6);
      ctx.lineTo(this.x - r * 0.55, this.y + r * 0.55);
      ctx.lineTo(this.x - r * 1.6, this.y);
      ctx.lineTo(this.x - r * 0.55, this.y - r * 0.55);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#fffff0";
      ctx.lineWidth = 1;
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(this.x - r * 0.3, this.y - r * 0.3, Math.max(0.8, r * 0.33), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

class BurrowHole {
  constructor(idx, x, y, scale = 1.0) {
    this.idx = idx;
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.state = "empty"; // empty, rising, up, bonked, sinking
    this.variant = "normal";
    this.hp = 1;
    this.progress = 0.0;
    this.timer = 0.0;
    this.stayDuration = 1.2;
    this.fakedOut = false;
    this.willFakeout = false;
    this.animTime = Math.random() * 10;
    this.errorAnim = 0.0; // Temporizador para tremor e feedback de erro
    this.lastDespawnTime = 0; // Timestamp do último guaxinim que afundou (tolerância para não punir clique atrasado)
  }

  spawn(variant, stayDuration, canFakeout = false) {
    this.variant = variant;
    this.hp = variant === "helmet" ? 2 : 1;
    this.state = "rising";
    this.progress = 0.0;
    this.stayDuration = stayDuration;
    this.timer = stayDuration;
    this.fakedOut = false;
    this.willFakeout = canFakeout && (variant === "normal" || variant === "bandit") && Math.random() < 0.22;
    this.animTime = 0.0;
  }

  update(dt, speedMult = 1.0) {
    this.animTime += dt;
    if (this.errorAnim > 0) {
      this.errorAnim = Math.max(0, this.errorAnim - dt);
    }
    const effDt = dt * speedMult;
    if (this.state === "empty") return null;

    if (this.state === "rising") {
      const riseSpd = this.variant === "bandit" ? 6.4 : 5.0;
      this.progress += effDt * riseSpd;
      if (this.progress >= 1.0) {
        this.progress = 1.0;
        this.state = "up";
      }
    } else if (this.state === "up") {
      this.timer -= effDt;
      if (this.willFakeout && !this.fakedOut && this.timer < this.stayDuration * 0.55) {
        this.fakedOut = true;
        this.progress = 0.45;
        this.state = "rising";
      } else if (this.timer <= 0) {
        this.state = "sinking";
      }
    } else if (this.state === "bonked") {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.state = "sinking";
      }
    } else if (this.state === "sinking") {
      const sinkSpd = 5.6;
      this.progress -= effDt * sinkSpd;
      if (this.progress <= 0.0) {
        this.progress = 0.0;
        this.lastDespawnTime = performance.now();
        const prevVar = this.variant;
        const wasUnhit = this.hp > 0;
        this.state = "empty";
        if (wasUnhit && (prevVar === "normal" || prevVar === "bandit" || prevVar === "helmet")) {
          return "escaped";
        }
      }
    }
    return null;
  }

  containsPoint(px, py) {
    if (this.state === "empty" || this.state === "bonked" || this.progress < 0.06) {
      return false;
    }
    // Hitbox generosa para toque confortável no mobile e precisão no mouse
    const w = 175 * this.scale;
    const h = 175 * this.scale * Math.max(0.35, this.progress);
    const topY = this.y - 130 * this.scale * this.progress - 24 * this.scale;
    const leftX = this.x - w / 2;
    return px >= leftX && px <= leftX + w && py >= topY && py <= topY + h + 46 * this.scale;
  }

  // Verifica se o clique ocorreu sobre o pedestal/compartimento deste buraco
  containsHole(px, py) {
    const rx = 106 * this.scale;
    const ry = 62 * this.scale;
    const dx = (px - this.x) / rx;
    const dy = (py - (this.y + 6 * this.scale)) / ry;
    return dx * dx + dy * dy <= 1.05;
  }

  distanceTo(px, py) {
    return Math.hypot(px - this.x, py - this.y);
  }
}

// ---------------------------------------------------------------------------
// 4. CLASSE PRINCIPAL DO JOGO (WACKO RACCOON WEB)
// ---------------------------------------------------------------------------
class WackoRaccoonWebGame {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.sounds = new SoundBank();

    // Elementos DOM de UI
    this.hudBar = document.getElementById("hud-bar");
    this.hudLevelTitle = document.getElementById("hud-level-title");
    this.hudProgressFill = document.getElementById("hud-progress-fill");
    this.hudScoreText = document.getElementById("hud-score-text");
    this.hudCombo = document.getElementById("hud-combo");
    this.hudSubstatus = document.getElementById("hud-substatus");
    this.hudHearts = document.getElementById("hud-hearts");
    this.hudTimer = document.getElementById("hud-timer");

    this.menuScreen = document.getElementById("menu-screen");
    this.menuLevelLabel = document.getElementById("menu-level-label");
    this.menuFooterRecord = document.getElementById("menu-footer-record");

    this.modalScreen = document.getElementById("modal-screen");
    this.modalMascot = document.getElementById("modal-mascot");
    this.modalTitle = document.getElementById("modal-title");
    this.modalSubtitle = document.getElementById("modal-subtitle");
    this.modalStats = document.getElementById("modal-stats");
    this.btnModalPrimary = document.getElementById("btn-modal-primary");
    this.btnModalSecondary = document.getElementById("btn-modal-secondary");

    this.btnSoundHud = document.getElementById("btn-sound-hud");
    this.btnSoundMenu = document.getElementById("btn-sound-menu");

    // Estado do jogo
    this.state = "MENU"; // MENU, LEVEL_INTRO, PLAYING, PAUSED, LEVEL_CLEAR, GAME_OVER, VICTORY
    this.levelIdx = 0;
    this.lvlCfg = getDynamicLevel(0);
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.lives = 5;
    this.maxLives = 5;
    this.timeLeft = 38.0;
    this.freezeTimer = 0.0;
    this.frenzyTimer = 0.0;
    this.spawnCd = 0.6;
    this.shakeTimer = 0.0;
    this.shakeMag = 0;
    this.globalTime = 0.0;

    // Progresso salvo no navegador
    this.highScore = 0;
    this.maxUnlockedLevel = 0;
    this.loadSave();

    // Entidades visuais
    this.holes = [];
    this.particles = [];
    this.impactBursts = [];
    this.floatingTexts = [];
    this.clouds = [];
    this.ambientMotes = [];

    // Controle da Marreta / Toque
    this.pointerX = window.innerWidth / 2;
    this.pointerY = window.innerHeight / 2;
    this.isTouchDevice = false;
    this.malletAnim = 0.0;
    this.malletVisibleTimer = 0.0;

    // Dimensões lógicas responsivas e cache de fundo
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.horizonY = 200;
    this.uiScale = 1.0;
    this.bgCanvas = document.createElement("canvas");
    this.bgCacheKey = "";

    // Carregamento dos Sprites HD
    this.images = {};
    this.loadAssets();

    // Inicializa nuvens e partículas de luz
    this.initAmbientEntities();

    // Eventos de tela e controles
    this.bindEvents();
    this.handleResize();
    this.updateMenuUI();
    this.renderHeartsHUD();

    // Loop de animação a 60+ FPS
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  // -------------------------------------------------------------------------
  // CARREGAMENTO DE SPRITES HD EXPORTADOS
  // -------------------------------------------------------------------------
  loadAssets() {
    const variants = ["normal", "bandit", "helmet", "golden", "bomb", "decoy", "clock"];
    const states = ["idle", "laugh", "dizzy"];
    variants.forEach((v) => {
      states.forEach((st) => {
        const key = `${v}_${st}`;
        const img = new Image();
        img.src = `assets/${key}.png`;
        this.images[key] = img;
      });
    });

    const extras = [
      "hole_back",
      "hole_front",
      "mallet_0",
      "mallet_1",
      "mallet_2",
      "heart_full",
      "heart_empty",
      "burst_gold",
      "burst_red",
      "burst_cyan",
      "burst_pink",
      "cloud_day",
      "cloud_night",
    ];
    extras.forEach((name) => {
      const img = new Image();
      img.src = `assets/${name}.png`;
      this.images[name] = img;
    });
  }

  initAmbientEntities() {
    this.clouds = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      yRatio: 0.04 + (i % 3) * 0.045,
      spd: 14 + Math.random() * 16,
      scale: 0.75 + (i % 3) * 0.16,
    }));

    this.ambientMotes = Array.from({ length: 24 }, () => ({
      xRatio: Math.random(),
      yRatio: 0.3 + Math.random() * 0.68,
      phase: Math.random() * Math.PI * 2,
      spd: 12 + Math.random() * 20,
    }));
  }

  // -------------------------------------------------------------------------
  // SAVE / LOAD NO LOCALSTORAGE
  // -------------------------------------------------------------------------
  loadSave() {
    try {
      const raw = localStorage.getItem("wacko_raccoon_save_v1");
      if (raw) {
        const data = JSON.parse(raw);
        this.highScore = parseInt(data.highScore || 0, 10);
        this.maxUnlockedLevel = parseInt(data.maxUnlockedLevel || 0, 10);
      }
    } catch (_) {}
  }

  saveProgress() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    if (this.levelIdx > this.maxUnlockedLevel) {
      this.maxUnlockedLevel = this.levelIdx;
    }
    try {
      localStorage.setItem(
        "wacko_raccoon_save_v1",
        JSON.stringify({
          highScore: this.highScore,
          maxUnlockedLevel: this.maxUnlockedLevel,
        })
      );
    } catch (_) {}
    this.updateMenuUI();
  }

  // -------------------------------------------------------------------------
  // RESPONSIVIDADE DE TELA E CÁLCULO DA GRADE DE TOCAS
  // -------------------------------------------------------------------------
  handleResize() {
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.round(this.vw * this.dpr);
    this.canvas.height = Math.round(this.vh * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    const isPortrait = this.vh > this.vw;
    this.uiScale = Math.max(0.68, Math.min(1.15, Math.min(this.vw, this.vh) / 680));

    // Altura da linha do horizonte (abaixo do HUD)
    const hudRect = this.hudBar.getBoundingClientRect();
    const hudBottom = hudRect.height > 0 ? hudRect.height + 14 : isPortrait ? 118 : 96;
    this.horizonY = Math.max(hudBottom + 28, Math.min(220, Math.round(this.vh * (isPortrait ? 0.23 : 0.26))));

    // Invalida cache do cenário pintado
    this.bgCacheKey = "";

    // Reposiciona as tocas mantendo o estado atual da partida!
    this.recomputeHoleLayout();
  }

  recomputeHoleLayout() {
    if (!this.lvlCfg) return;
    let [rows, cols] = this.lvlCfg.grid;
    const isPortrait = this.vh > this.vw;

    // No celular em modo retrato (vertical), inverte 3x4 para 4x3 para melhor distribuição vertical
    if (isPortrait && rows < cols) {
      const tmp = rows;
      rows = cols;
      cols = tmp;
    }

    const lawnTop = this.horizonY + (isPortrait ? 24 : 32);
    const lawnBottom = this.vh - (isPortrait ? 20 : 28);
    const availH = Math.max(180, lawnBottom - lawnTop);
    const availW = Math.max(240, this.vw * (isPortrait ? 0.94 : 0.88));

    // Distribuição celular uniforme: cada coluna e linha recebe sua célula
    const cellW = availW / cols;
    const cellH = availH / rows;

    // Garante que o pedestal de cada buraco nunca encoste nos vizinhos (respiro horizontal garantido)
    const maxHoleW = cellW * 0.76;
    const maxHoleH = cellH * 0.52;

    const scaleByW = maxHoleW / 212;
    const scaleByH = maxHoleH / 106;
    const maxAllowedScale = isPortrait ? (cols >= 4 ? 0.58 : 0.68) : (cols >= 4 ? 0.75 : 0.88);
    const baseScale = Math.max(0.30, Math.min(maxAllowedScale, Math.min(scaleByW, scaleByH)));

    // Espaçamento horizontal e vertical otimizado e uniforme
    const colStep = isPortrait ? cellW : Math.min(225, Math.max(170, cellW * 0.62));
    const maxGridH = availH * (isPortrait ? 0.72 : 0.68);
    const rowStep = rows > 1 ? Math.min(isPortrait ? 155 : 135, Math.max(isPortrait ? 98 : 85, maxGridH / (rows - 1))) : 100;

    const gridW = (cols - 1) * colStep;
    const gridH = (rows - 1) * rowStep;

    // Centraliza o bloco perfeitamente no gramado visível
    const startX = (this.vw - gridW) / 2;
    const startY = lawnTop + (availH - gridH) / 2 + (isPortrait ? 12 : 6);

    // Retângulo da arena principal do canteiro (sombra de chão suave)
    const padX = 115 * baseScale;
    const padTop = 75 * baseScale;
    const padBot = 65 * baseScale;
    this.arenaRect = {
      x: startX - padX,
      y: startY - padTop,
      w: gridW + padX * 2,
      h: gridH + padTop + padBot,
      r: 26 * baseScale,
    };

    const totalHoles = rows * cols;
    const newHoles = [];

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      // Leve profundidade 3D mantendo o alinhamento perfeitamente organizado
      const depthFactor = 0.96 + 0.06 * (rows > 1 ? r / (rows - 1) : 0.5);

      for (let c = 0; c < cols; c++) {
        const hx = Math.round(startX + c * colStep);
        const hy = Math.round(startY + r * rowStep);
        const sc = Number((baseScale * depthFactor).toFixed(3));

        if (this.holes[idx]) {
          this.holes[idx].x = hx;
          this.holes[idx].y = hy;
          this.holes[idx].scale = sc;
          newHoles.push(this.holes[idx]);
        } else {
          newHoles.push(new BurrowHole(idx, hx, hy, sc));
        }
        idx++;
      }
    }

    if (this.holes.length !== totalHoles) {
      this.holes = newHoles;
    }
  }

  // -------------------------------------------------------------------------
  // CENÁRIO PINTADO EM ALTA DEFINIÇÃO (CACHED EM OFFSCREEN CANVAS)
  // -------------------------------------------------------------------------
  ensureBackgroundRendered() {
    const theme = this.lvlCfg ? this.lvlCfg.theme : LEVELS[0].theme;
    const lvlNum = this.lvlCfg ? this.lvlCfg.num : 1;
    const key = `${this.vw}x${this.vh}_h${this.horizonY}_lvl${lvlNum}`;
    if (this.bgCacheKey === key) return;
    this.bgCacheKey = key;

    this.bgCanvas.width = Math.round(this.vw * this.dpr);
    this.bgCanvas.height = Math.round(this.vh * this.dpr);
    const bctx = this.bgCanvas.getContext("2d");
    bctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    const w = this.vw;
    const h = this.vh;
    const hz = this.horizonY;
    const sky = theme.sky;
    const hills = theme.hills;
    const lawn = theme.lawn;
    const isNight = sky[0] < 90;

    // 1. Gradiente do Céu
    const skyGrad = bctx.createLinearGradient(0, 0, 0, hz);
    skyGrad.addColorStop(0, `rgb(${sky[0]}, ${sky[1]}, ${sky[2]})`);
    skyGrad.addColorStop(
      1,
      `rgb(${Math.min(255, sky[0] + 55)}, ${Math.min(255, sky[1] + 38)}, ${Math.min(255, sky[2] + 25)})`
    );
    bctx.fillStyle = skyGrad;
    bctx.fillRect(0, 0, w, hz + 10);

    // Semente determinística para estrelas e flores
    let seed = lvlNum * 77 + 13;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    // 2. Sol ou Lua com Halo + Estrelas
    const sunX = w - Math.max(75, w * 0.13);
    const sunY = Math.max(55, hz * 0.42);
    if (isNight) {
      for (let i = 0; i < 65; i++) {
        const sx = 12 + rand() * (w - 24);
        const sy = 10 + rand() * (hz - 30);
        const sr = 1 + Math.floor(rand() * 2.2);
        bctx.fillStyle = `rgba(255, 252, 220, ${0.45 + rand() * 0.55})`;
        bctx.beginPath();
        bctx.arc(sx, sy, sr, 0, Math.PI * 2);
        bctx.fill();
      }
      const halo = bctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 68);
      halo.addColorStop(0, "rgba(210, 235, 255, 0.42)");
      halo.addColorStop(1, "rgba(210, 235, 255, 0)");
      bctx.fillStyle = halo;
      bctx.beginPath();
      bctx.arc(sunX, sunY, 68, 0, Math.PI * 2);
      bctx.fill();

      bctx.fillStyle = "#faf8e1";
      bctx.beginPath();
      bctx.arc(sunX, sunY, 30, 0, Math.PI * 2);
      bctx.fill();
    } else {
      const halo = bctx.createRadialGradient(sunX, sunY, 12, sunX, sunY, 85);
      halo.addColorStop(0, "rgba(255, 245, 165, 0.55)");
      halo.addColorStop(1, "rgba(255, 245, 165, 0)");
      bctx.fillStyle = halo;
      bctx.beginPath();
      bctx.arc(sunX, sunY, 85, 0, Math.PI * 2);
      bctx.fill();

      bctx.fillStyle = "#fff8b9";
      bctx.beginPath();
      bctx.arc(sunX, sunY, 34, 0, Math.PI * 2);
      bctx.fill();
    }

    // 3. Cadeia de Montanhas Distantes
    bctx.fillStyle = `rgba(${hills[0]}, ${hills[1]}, ${hills[2]}, 0.48)`;
    bctx.beginPath();
    bctx.moveTo(0, hz);
    const stepMtn = Math.max(70, w / 9);
    for (let x = 0; x <= w + stepMtn; x += stepMtn) {
      const py = hz - 45 - rand() * 52;
      bctx.lineTo(x, py);
    }
    bctx.lineTo(w, hz);
    bctx.closePath();
    bctx.fill();

    // 4. Colinas Verdes Sombreadas
    const hillsDark = `rgb(${Math.max(0, hills[0] - 22)}, ${Math.max(0, hills[1] - 22)}, ${Math.max(0, hills[2] - 22)})`;
    const hillsMain = `rgb(${hills[0]}, ${hills[1]}, ${hills[2]})`;
    const hillsLight = `rgb(${Math.min(255, hills[0] + 22)}, ${Math.min(255, hills[1] + 22)}, ${Math.min(255, hills[2] + 22)})`;

    bctx.fillStyle = hillsDark;
    bctx.beginPath();
    bctx.ellipse(w * 0.22, hz + 12, w * 0.42, 68, 0, 0, Math.PI * 2);
    bctx.fill();

    bctx.fillStyle = hillsMain;
    bctx.beginPath();
    bctx.ellipse(w * 0.22, hz + 16, w * 0.41, 62, 0, 0, Math.PI * 2);
    bctx.fill();

    bctx.fillStyle = hillsDark;
    bctx.beginPath();
    bctx.ellipse(w * 0.76, hz + 8, w * 0.46, 74, 0, 0, Math.PI * 2);
    bctx.fill();

    bctx.fillStyle = hillsLight;
    bctx.beginPath();
    bctx.ellipse(w * 0.76, hz + 12, w * 0.45, 68, 0, 0, Math.PI * 2);
    bctx.fill();

    // 5. Árvores Frondosas nas Laterais
    const treeXList = [w * 0.04, w * 0.11, w * 0.89, w * 0.96];
    treeXList.forEach((tx) => {
      const ty = hz - 42 - rand() * 14;
      bctx.fillStyle = "#623e24";
      bctx.strokeStyle = "#341e10";
      bctx.lineWidth = 2;
      bctx.fillRect(tx - 6, ty, 12, 46);
      bctx.strokeRect(tx - 6, ty, 12, 46);

      bctx.fillStyle = hillsDark;
      bctx.beginPath();
      bctx.ellipse(tx, ty - 12, 30, 24, 0, 0, Math.PI * 2);
      bctx.fill();
      bctx.stroke();

      bctx.fillStyle = hillsMain;
      bctx.beginPath();
      bctx.ellipse(tx, ty - 18, 26, 20, 0, 0, Math.PI * 2);
      bctx.fill();

      bctx.fillStyle = hillsLight;
      bctx.beginPath();
      bctx.ellipse(tx - 4, ty - 24, 16, 13, 0, 0, Math.PI * 2);
      bctx.fill();
    });

    // 6. Gramado Principal com Gradiente e Faixas de Campo
    const lawnGrad = bctx.createLinearGradient(0, hz, 0, h);
    lawnGrad.addColorStop(
      0,
      `rgb(${Math.min(255, lawn[0] + 16)}, ${Math.min(255, lawn[1] + 16)}, ${Math.min(255, lawn[2] + 16)})`
    );
    lawnGrad.addColorStop(
      1,
      `rgb(${Math.max(0, lawn[0] - 24)}, ${Math.max(0, lawn[1] - 24)}, ${Math.max(0, lawn[2] - 24)})`
    );
    bctx.fillStyle = lawnGrad;
    bctx.fillRect(0, hz, w, h - hz);

    bctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    for (let ry = hz + 14; ry < h; ry += 68) {
      bctx.fillRect(0, ry, w, 34);
    }

    // 7. Cerca de Madeira Rústica 3D no Horizonte
    const fenceY = hz - 38;
    bctx.fillStyle = "rgba(15, 38, 15, 0.35)";
    bctx.fillRect(0, fenceY + 38, w, 9);

    bctx.fillStyle = "#8a582e";
    bctx.strokeStyle = "#442812";
    bctx.lineWidth = 2;
    bctx.fillRect(0, fenceY + 12, w, 9);
    bctx.strokeRect(0, fenceY + 12, w, 9);
    bctx.fillStyle = "#7a4c26";
    bctx.fillRect(0, fenceY + 28, w, 9);
    bctx.strokeRect(0, fenceY + 28, w, 9);

    for (let fx = 10; fx < w; fx += 46) {
      bctx.fillStyle = "#ac7644";
      bctx.beginPath();
      bctx.moveTo(fx, fenceY + 42);
      bctx.lineTo(fx, fenceY + 6);
      bctx.lineTo(fx + 12, fenceY - 6);
      bctx.lineTo(fx + 24, fenceY + 6);
      bctx.lineTo(fx + 24, fenceY + 42);
      bctx.closePath();
      bctx.fill();
      bctx.stroke();

      // Chanfro de luz e pregos
      bctx.strokeStyle = "#cda06b";
      bctx.beginPath();
      bctx.moveTo(fx + 3, fenceY + 8);
      bctx.lineTo(fx + 3, fenceY + 40);
      bctx.stroke();
      bctx.strokeStyle = "#442812";

      bctx.fillStyle = "#372d28";
      bctx.beginPath();
      bctx.arc(fx + 12, fenceY + 16, 2, 0, Math.PI * 2);
      bctx.arc(fx + 12, fenceY + 32, 2, 0, Math.PI * 2);
      bctx.fill();
    }

    // 8. Tufos de Grama e Florzinhas Silvestres
    const flowerCols = ["#ffeb4b", "#ff91c3", "#a5e1ff", "#ffffff"];
    const grassStroke = `rgb(${Math.max(0, lawn[0] - 20)}, ${Math.max(0, lawn[1] - 20)}, ${Math.max(0, lawn[2] - 20)})`;
    for (let i = 0; i < 38; i++) {
      const gx = 20 + rand() * (w - 40);
      const gy = hz + 18 + rand() * (h - hz - 36);
      bctx.strokeStyle = grassStroke;
      bctx.lineWidth = 2;
      bctx.beginPath();
      bctx.moveTo(gx, gy);
      bctx.lineTo(gx - 5, gy - 8);
      bctx.moveTo(gx, gy);
      bctx.lineTo(gx + 1, gy - 10);
      bctx.moveTo(gx, gy);
      bctx.lineTo(gx + 6, gy - 7);
      bctx.stroke();

      if (rand() < 0.36) {
        const fc = flowerCols[Math.floor(rand() * flowerCols.length)];
        bctx.fillStyle = fc;
        bctx.beginPath();
        bctx.arc(gx, gy - 10, 3.8, 0, Math.PI * 2);
        bctx.fill();
        bctx.fillStyle = "#ffbe1e";
        bctx.beginPath();
        bctx.arc(gx, gy - 10, 1.5, 0, Math.PI * 2);
        bctx.fill();
      }
    }
  }

  // -------------------------------------------------------------------------
  // CONTROLES DE INTERFACE E FLUXO DE JOGO
  // -------------------------------------------------------------------------
  bindEvents() {
    window.addEventListener("resize", () => this.handleResize());
    window.addEventListener("orientationchange", () => setTimeout(() => this.handleResize(), 120));

    // Botões de Som
    const toggleSound = () => {
      const muted = this.sounds.toggleMute();
      const icon = muted ? "🔇" : "🔊";
      this.btnSoundHud.textContent = icon;
      this.btnSoundMenu.textContent = icon;
      if (!muted) this.sounds.play("click");
    };
    this.btnSoundHud.addEventListener("click", toggleSound);
    this.btnSoundMenu.addEventListener("click", toggleSound);

    // Botão de Pausa no HUD
    document.getElementById("btn-pause-hud").addEventListener("click", () => {
      if (this.state === "PLAYING") {
        this.sounds.play("click");
        this.showPauseModal();
      } else if (this.state === "PAUSED") {
        this.sounds.play("click");
        this.resumeGame();
      }
    });

    // Seleção de Fase no Menu
    document.getElementById("btn-prev-lvl").addEventListener("click", () => {
      this.sounds.play("click");
      this.levelIdx = Math.max(0, this.levelIdx - 1);
      this.lvlCfg = getDynamicLevel(this.levelIdx);
      this.bgCacheKey = "";
      this.sounds.music.setLevelTheme(this.levelIdx);
      this.updateMenuUI();
    });

    document.getElementById("btn-next-lvl").addEventListener("click", () => {
      this.sounds.play("click");
      this.levelIdx = Math.min(LEVELS.length - 1, this.levelIdx + 1);
      this.lvlCfg = getDynamicLevel(this.levelIdx);
      this.bgCacheKey = "";
      this.sounds.music.setLevelTheme(this.levelIdx);
      this.updateMenuUI();
    });

    // Botão Jogar Agora (bloqueia se a fase ainda não foi liberada)
    document.getElementById("btn-play").addEventListener("click", () => {
      if (this.levelIdx > this.maxUnlockedLevel) {
        this.sounds.play("decoy");
        this.triggerScreenShake(0.25, 8);
        return;
      }
      this.sounds.play("click");
      this.setupLevel(this.levelIdx, true);
    });

    // Botões do Modal
    this.btnModalPrimary.addEventListener("click", () => {
      this.sounds.play("click");
      this.handleModalPrimaryAction();
    });

    this.btnModalSecondary.addEventListener("click", () => {
      this.sounds.play("click");
      this.goToMainMenu();
    });

    // Interação no Canvas (Suporte a Toque Instantâneo Multi-touch e Mouse)
    this.canvas.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this.isTouchDevice = e.pointerType === "touch";
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.pointerX = x;
      this.pointerY = y;
      this.malletVisibleTimer = 0.55;

      if (this.state === "PLAYING") {
        this.triggerWhack(x, y);
      }
    });

    this.canvas.addEventListener("pointermove", (e) => {
      if (e.pointerType === "mouse") {
        this.isTouchDevice = false;
        const rect = this.canvas.getBoundingClientRect();
        this.pointerX = e.clientX - rect.left;
        this.pointerY = e.clientY - rect.top;
      }
    });

    // Teclas de atalho para quem joga no PC (1-9, ESC, ENTER, SPACE)
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (this.state === "PLAYING") {
          this.sounds.play("click");
          this.showPauseModal();
        } else if (this.state === "PAUSED") {
          this.sounds.play("click");
          this.resumeGame();
        } else if (this.state !== "MENU") {
          this.sounds.play("click");
          this.goToMainMenu();
        }
      } else if (this.state === "PLAYING" && e.key >= "1" && e.key <= "9") {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < this.holes.length) {
          const h = this.holes[idx];
          this.pointerX = h.x;
          this.pointerY = h.y - 30 * h.scale;
          this.malletVisibleTimer = 0.55;
          this.triggerWhack(h.x, h.y - 30 * h.scale);
        }
      } else if ((e.key === "Enter" || e.key === " ") && this.state !== "PLAYING" && this.state !== "MENU") {
        e.preventDefault();
        this.sounds.play("click");
        this.handleModalPrimaryAction();
      }
    });
  }

  updateMenuUI() {
    const info = getDynamicLevel(this.levelIdx);
    const isLocked = this.levelIdx > this.maxUnlockedLevel;
    const btnPlay = document.getElementById("btn-play");
    const theme = LEVEL_THEMES[Math.min(LEVEL_THEMES.length - 1, this.levelIdx)];
    const themeName = theme ? theme.name : "Trilha Clássica";

    if (isLocked) {
      this.menuLevelLabel.innerHTML = `Fase ${info.num}: ${info.name} <span class="badge-locked">🔒 BLOQUEADA</span>`;
      btnPlay.classList.add("btn-locked");
      btnPlay.innerHTML = `FASE BLOQUEADA 🔒`;
    } else {
      this.menuLevelLabel.innerHTML = `Fase ${info.num}: ${info.name} <span class="badge-unlocked">🎵 ${themeName}</span>`;
      btnPlay.classList.remove("btn-locked");
      btnPlay.innerHTML = `JOGAR AGORA! <span class="play-arrow">&#9654;</span>`;
    }
    this.menuFooterRecord.innerHTML = `Melhor Pontuação: ${this.highScore} pts &nbsp;|&nbsp; Progresso: ${Math.min(LEVELS.length, this.maxUnlockedLevel + 1)}/${LEVELS.length} Fases Desbloqueadas`;
  }

  renderHeartsHUD() {
    this.hudHearts.innerHTML = "";
    for (let i = 0; i < this.maxLives; i++) {
      const img = document.createElement("img");
      img.src = i < this.lives ? "assets/heart_full.png" : "assets/heart_empty.png";
      img.alt = i < this.lives ? "Vida cheia" : "Vida perdida";
      this.hudHearts.appendChild(img);
    }
  }

  updateHUD() {
    this.hudLevelTitle.textContent = `FASE ${this.lvlCfg.num}: ${this.lvlCfg.name}`;
    const target = this.lvlCfg.targetScore;
    const ratio = Math.min(1, this.score / Math.max(1, target));
    this.hudProgressFill.style.width = `${(ratio * 100).toFixed(1)}%`;
    this.hudProgressFill.classList.toggle("goal-met", ratio >= 1);
    this.hudScoreText.textContent = `PONTOS: ${this.score} / ${target}`;

    this.hudCombo.textContent = `COMBO: ${this.combo}x`;
    this.hudCombo.classList.toggle("combo-hot", this.combo >= 5);

    this.hudSubstatus.className = "hud-subtext";
    if (this.frenzyTimer > 0) {
      this.hudSubstatus.textContent = `FRENESI 2X! (${this.frenzyTimer.toFixed(1)}s)`;
      this.hudSubstatus.classList.add("frenzy-active");
    } else if (this.freezeTimer > 0) {
      this.hudSubstatus.textContent = `CONGELADO! (${this.freezeTimer.toFixed(1)}s)`;
      this.hudSubstatus.classList.add("freeze-active");
    } else {
      this.hudSubstatus.textContent = `Recorde: ${Math.max(this.highScore, this.score)} pts`;
    }

    const secs = Math.ceil(this.timeLeft);
    this.hudTimer.textContent = `${String(secs).padStart(2, "0")}s`;
    this.hudTimer.classList.toggle("low-time", this.timeLeft <= 8.0 && this.freezeTimer <= 0);
    this.hudTimer.classList.toggle("frozen-time", this.freezeTimer > 0);
  }

  // -------------------------------------------------------------------------
  // GERENCIAMENTO DE MODAIS E TRANSIÇÕES DE ESTADO
  // -------------------------------------------------------------------------
  setupLevel(levelIdx, resetTotal = false) {
    // Garante que o jogador não acesse fases não liberadas
    this.levelIdx = Math.min(levelIdx, this.maxUnlockedLevel);
    if (resetTotal) {
      this.score = 0;
      this.combo = 0;
      this.maxCombo = 0;
      this.lives = this.maxLives;
    } else {
      this.lives = Math.min(this.maxLives, this.lives + 1);
    }

    this.lvlCfg = getDynamicLevel(this.levelIdx);
    this.timeLeft = this.lvlCfg.duration;
    this.freezeTimer = 0.0;
    this.frenzyTimer = 0.0;
    this.spawnCd = 0.65;
    this.particles = [];
    this.impactBursts = [];
    this.floatingTexts = [];
    this.holes = [];

    // Define a música temática exclusiva da fase
    this.sounds.music.setLevelTheme(this.levelIdx);

    this.hudBar.classList.remove("hud-hidden");
    this.menuScreen.classList.remove("active");
    this.bgCacheKey = "";
    this.handleResize();
    this.renderHeartsHUD();
    this.updateHUD();

    this.state = "LEVEL_INTRO";
    this.sounds.play("pop");
    this.openModal(
      "assets/normal_laugh.png",
      `FASE ${this.lvlCfg.num}: ${this.lvlCfg.name}`,
      this.lvlCfg.subtitle,
      [
        `Meta de Pontos: ${this.lvlCfg.targetScore} pts`,
        `Tempo da Fase: ${this.lvlCfg.duration} segundos`,
        `Grade de Tocas: ${this.lvlCfg.grid[0]}x${this.lvlCfg.grid[1]}`,
        `Trilha Sonora: 🎵 ${this.sounds.music.currentTheme.name}`,
      ],
      "COMEÇAR FASE!"
    );
  }

  openModal(mascotSrc, title, subtitle, statsLines, primaryText, secondaryText = "MENU PRINCIPAL") {
    this.modalMascot.src = mascotSrc;
    this.modalTitle.textContent = title;
    this.modalSubtitle.textContent = subtitle;
    this.modalStats.innerHTML = statsLines
      .map((line) => `<div class="modal-stat-line">${line}</div>`)
      .join("");
    this.btnModalPrimary.textContent = primaryText;
    this.btnModalSecondary.textContent = secondaryText;
    this.modalScreen.classList.add("active");
  }

  closeModal() {
    this.modalScreen.classList.remove("active");
  }

  showPauseModal() {
    this.state = "PAUSED";
    this.sounds.music.pause();
    this.openModal(
      "assets/normal_idle.png",
      "JOGO PAUSADO",
      "Respire fundo e prepare a marreta!",
      [
        `Pontuação Atual: ${this.score} pts`,
        `Meta da Fase: ${this.lvlCfg.targetScore} pts`,
      ],
      "CONTINUAR PARTIDA"
    );
  }

  resumeGame() {
    this.closeModal();
    this.state = "PLAYING";
    this.sounds.music.setLevelTheme(this.levelIdx);
    this.sounds.music.resume();
  }

  goToMainMenu() {
    this.closeModal();
    this.sounds.music.pause();
    this.hudBar.classList.add("hud-hidden");
    this.state = "MENU";
    this.lvlCfg = getDynamicLevel(this.levelIdx);
    this.bgCacheKey = "";
    this.updateMenuUI();
    this.menuScreen.classList.add("active");
  }

  handleModalPrimaryAction() {
    if (this.state === "LEVEL_INTRO" || this.state === "PAUSED") {
      this.resumeGame();
    } else if (this.state === "LEVEL_CLEAR" || this.state === "VICTORY") {
      const nextIdx = Math.min(LEVELS.length - 1, this.levelIdx + 1);
      this.setupLevel(nextIdx, false);
    } else if (this.state === "GAME_OVER") {
      this.setupLevel(this.levelIdx, true);
    }
  }

  // -------------------------------------------------------------------------
  // MECÂNICAS DE SPAWN E MARRETADA (WHACK!)
  // -------------------------------------------------------------------------
  pickVariant() {
    if (this.frenzyTimer > 0) {
      const r = Math.random() * 100;
      if (r < 55) return "normal";
      if (r < 85) return "golden";
      return "bandit";
    }
    const weights = this.lvlCfg.weights;
    const keys = Object.keys(weights);
    let total = 0;
    keys.forEach((k) => (total += weights[k]));
    let roll = Math.random() * total;
    for (const k of keys) {
      roll -= weights[k];
      if (roll <= 0) return k;
    }
    return "normal";
  }

  spawnRaccoon() {
    const emptyHoles = this.holes.filter((h) => h.state === "empty");
    const activeCount = this.holes.length - emptyHoles.length;
    const maxAct = this.lvlCfg.maxActive + (this.frenzyTimer > 0 ? 2 : 0);
    if (emptyHoles.length === 0 || activeCount >= maxAct) return;

    const hole = emptyHoles[Math.floor(Math.random() * emptyHoles.length)];
    const variant = this.pickVariant();
    const [sMin, sMax] = this.lvlCfg.stayTime;
    let stay = sMin + Math.random() * (sMax - sMin);
    if (variant === "golden") stay *= 0.78;
    else if (variant === "bandit") stay *= 0.85;
    else if (variant === "helmet") stay *= 1.22;

    const canFake = this.levelIdx >= 3;
    hole.spawn(variant, stay, canFake);
    this.sounds.play("pop");
  }

  vibrateDevice(ms) {
    try {
      if (navigator.vibrate) navigator.vibrate(ms);
    } catch (_) {}
  }

  triggerScreenShake(duration = 0.38, magnitude = 15) {
    this.shakeTimer = duration;
    this.shakeMag = magnitude;
    const wrapper = document.getElementById("game-wrapper");
    if (wrapper) {
      wrapper.classList.remove("screen-shake");
      void wrapper.offsetWidth; // Força reflow para reiniciar animação CSS
      wrapper.classList.add("screen-shake");
      setTimeout(() => wrapper.classList.remove("screen-shake"), 390);
    }
  }

  triggerDamageFlash() {
    const flashEl = document.getElementById("damage-flash");
    if (flashEl) {
      flashEl.classList.remove("damage-flash-active");
      void flashEl.offsetWidth; // Força reflow
      flashEl.classList.add("damage-flash-active");
      setTimeout(() => flashEl.classList.remove("damage-flash-active"), 280);
    }
    this.damageFlashTimer = 0.28;
  }

  triggerWhack(mx, my) {
    this.malletAnim = 0.16;

    // 1. Procurar se acertou algum guaxinim ativo (da frente para trás)
    let hitHole = null;
    let bestDist = Infinity;
    for (let i = this.holes.length - 1; i >= 0; i--) {
      const h = this.holes[i];
      if (h.containsPoint(mx, my)) {
        const targetY = h.y - 45 * h.scale;
        const dist = Math.hypot(mx - h.x, my - targetY);
        if (dist < bestDist) {
          bestDist = dist;
          hitHole = h;
        }
      }
    }

    if (!hitHole) {
      // O jogador não acertou nenhum guaxinim ativo!
      // REGRA: Se o jogador clicar num buraco onde não tem nada, perde 1 vida!
      let emptyHole = null;
      let closestDist = Infinity;

      for (let i = 0; i < this.holes.length; i++) {
        const h = this.holes[i];
        if (h.containsHole(mx, my)) {
          emptyHole = h;
          break;
        }
        const d = h.distanceTo(mx, my);
        if (d < closestDist) {
          closestDist = d;
          if (d <= 92 * h.scale) {
            emptyHole = h;
          }
        }
      }

      if (emptyHole) {
        // Tolerância justa: se o guaxinim acabou de afundar nos últimos 280ms, perdoa a vida!
        if (performance.now() - emptyHole.lastDespawnTime < 280) {
          this.sounds.play("whoosh");
          this.floatingTexts.push(
            new FloatingText(emptyHole.x, emptyHole.y - 20 * emptyHole.scale, "QUASE!", "#ffea00", 24)
          );
          return;
        }

        // PUNIÇÃO: Errou o buraco / clicou no buraco vazio!
        this.sounds.play("buzzer");
        this.vibrateDevice([70, 40, 90]);
        this.triggerScreenShake(0.38, 15);
        this.triggerDamageFlash();

        emptyHole.errorAnim = 0.48;
        this.combo = 0;
        this.lives = Math.max(0, this.lives - 1);
        this.renderHeartsHUD();
        this.updateHUD();

        const hx = emptyHole.x;
        const hy = emptyHole.y - 12 * emptyHole.scale;

        this.impactBursts.push(
          new ImpactBurstEffect(hx, hy, this.images["burst_red"], "#ff3333", emptyHole.scale * 0.92)
        );
        this.floatingTexts.push(
          new FloatingText(hx, hy - 22, "ERROU! -1 VIDA 💔", "#ff3333", 32)
        );

        const cols = ["#ff3b30", "#ff7373", "#ffffff", "#4a4a4a"];
        for (let i = 0; i < 22; i++) {
          this.particles.push(
            new Particle(hx, hy, cols[i % cols.length], [80, 260], [4, 9], true, emptyHole.scale)
          );
        }

        if (this.lives <= 0) {
          this.sounds.play("gameover");
          this.sounds.music.pause();
          this.saveProgress();
          this.state = "GAME_OVER";
          this.openModal(
            "assets/normal_dizzy.png",
            "FIM DE JOGO!",
            "Suas vidas acabaram ao errar os buracos vazios!",
            [
              `Pontuação Alcançada: ${this.score} pts`,
              `Meta da Fase ${this.lvlCfg.num}: ${this.lvlCfg.targetScore} pts`,
              `Melhor Combo: ${this.maxCombo}x`,
              "Dica de Ouro: Espere o guaxinim subir antes de marretar!",
            ],
            "TENTAR NOVAMENTE!"
          );
        }
        return;
      }

      // Se clicou completamente fora da arena de jogo (ex: topo do céu)
      this.sounds.play("miss");
      for (let i = 0; i < 6; i++) {
        this.particles.push(new Particle(mx, my + 8, "#7db95a", [35, 95], [3, 6], false, this.uiScale));
      }
      return;
    }

    const v = hitHole.variant;
    const hx = hitHole.x;
    const hy = hitHole.y - 56 * hitHole.scale;

    if (v === "bomb") {
      this.sounds.play("bomb");
      this.vibrateDevice([60, 40, 90]);
      hitHole.state = "bonked";
      hitHole.timer = 0.46;
      this.combo = 0;
      this.lives = Math.max(0, this.lives - 1);
      this.score = Math.max(0, this.score - 150);
      this.triggerScreenShake(0.42, 16);
      this.triggerDamageFlash();
      this.renderHeartsHUD();
      this.updateHUD();

      this.impactBursts.push(
        new ImpactBurstEffect(hx, hy, this.images["burst_red"], "#ff5028", hitHole.scale)
      );
      this.floatingTexts.push(new FloatingText(hx, hy - 10, "CABUM! -150", "#ff4b3c", 36));
      const cols = ["#ff5f1e", "#ffd232", "#414148"];
      for (let i = 0; i < 28; i++) {
        const col = cols[i % cols.length];
        this.particles.push(new Particle(hx, hy, col, [120, 350], [6, 13], true, hitHole.scale));
      }

      if (this.lives <= 0) {
        this.sounds.play("gameover");
        this.sounds.music.pause();
        this.saveProgress();
        this.state = "GAME_OVER";
        this.openModal(
          "assets/normal_dizzy.png",
          "FIM DE JOGO!",
          "Suas vidas acabaram nas bombas!",
          [
            `Pontuação Alcançada: ${this.score} pts`,
            `Meta da Fase ${this.lvlCfg.num}: ${this.lvlCfg.targetScore} pts`,
            `Melhor Combo: ${this.maxCombo}x`,
          ],
          "TENTAR NOVAMENTE!"
        );
      }
      return;
    }

    if (v === "decoy") {
      this.sounds.play("decoy");
      this.vibrateDevice(45);
      hitHole.state = "bonked";
      hitHole.timer = 0.45;
      this.combo = 0;
      this.score = Math.max(0, this.score - 120);
      this.triggerScreenShake(0.24, 8);
      this.updateHUD();

      this.impactBursts.push(
        new ImpactBurstEffect(hx, hy, this.images["burst_pink"], "#ff91c3", hitHole.scale)
      );
      this.floatingTexts.push(new FloatingText(hx, hy - 10, "AI! AMIGA! -120", "#ff8cc3", 30));
      for (let i = 0; i < 14; i++) {
        this.particles.push(new Particle(hx, hy, "#ff9bcd", [65, 190], [5, 9], false, hitHole.scale));
      }
      return;
    }

    if (v === "helmet" && hitHole.hp > 1) {
      this.sounds.play("helmet");
      this.vibrateDevice(20);
      hitHole.hp = 1;
      hitHole.variant = "normal";
      hitHole.timer = Math.max(hitHole.timer, 0.78);
      this.score += 50;
      this.updateHUD();

      this.impactBursts.push(
        new ImpactBurstEffect(hx, hy - 16, this.images["burst_gold"], "#ffe150", hitHole.scale)
      );
      this.floatingTexts.push(new FloatingText(hx, hy - 18, "CRACK! +50", "#ffe65f", 26));
      for (let i = 0; i < 14; i++) {
        this.particles.push(new Particle(hx, hy - 22, "#ffd72d", [95, 250], [5, 9], false, hitHole.scale));
      }
      return;
    }

    // Acertou um Guaxinim válido!
    this.vibrateDevice(18);
    hitHole.hp = 0;
    hitHole.state = "bonked";
    hitHole.timer = 0.42;
    this.combo += 1;
    if (this.combo > this.maxCombo) {
      this.maxCombo = this.combo;
    }

    if (this.combo > 0 && this.combo % 10 === 0) {
      this.frenzyTimer = 5.5;
      this.sounds.play("frenzy");
      this.sounds.music.setFrenzy(true);
      this.floatingTexts.push(
        new FloatingText(this.vw / 2, this.horizonY + 12, "MODO FRENESI WACKO! 2X PONTOS!", "#ffeb37", 36)
      );
    }

    let mult = 1 + Math.min(4, Math.floor(this.combo / 5));
    if (this.frenzyTimer > 0) mult *= 2;

    let basePts = 100;
    let pCol = "#fff273";
    let bKey = "burst_gold";
    let label = "";

    if (v === "golden") {
      basePts = 300;
      this.sounds.play("golden");
      pCol = "#ffe641";
      bKey = "burst_gold";
      label = `DOURADO! +${basePts * mult}`;
    } else if (v === "clock") {
      basePts = 150;
      this.freezeTimer = 4.5;
      this.timeLeft += 4.0;
      this.sounds.play("freeze");
      pCol = "#78ebff";
      bKey = "burst_cyan";
      label = `+4s CONGELADO! +${basePts * mult}`;
    } else if (v === "bandit") {
      basePts = 150;
      this.sounds.play("bonk");
      pCol = "#cd9bff";
      bKey = "burst_gold";
      label = `+${basePts * mult}`;
    } else {
      basePts = 100;
      this.sounds.play("bonk");
      pCol = "#fff273";
      bKey = "burst_gold";
      label = `+${basePts * mult}`;
    }

    this.score += basePts * mult;
    if (this.combo >= 3) {
      label += ` (${this.combo}x!)`;
    }
    this.updateHUD();

    this.impactBursts.push(
      new ImpactBurstEffect(hx, hy, this.images[bKey], pCol, hitHole.scale)
    );
    this.floatingTexts.push(
      new FloatingText(hx, hy - 12, label, pCol, v === "golden" ? 32 : 26)
    );
    for (let i = 0; i < 16; i++) {
      this.particles.push(new Particle(hx, hy, pCol, [90, 260], [5, 10], true, hitHole.scale));
    }
  }

  // -------------------------------------------------------------------------
  // ATUALIZAÇÃO (UPDATE) E RENDERIZAÇÃO (DRAW)
  // -------------------------------------------------------------------------
  update(dt) {
    this.globalTime += dt;

    // Movimento das nuvens
    this.clouds.forEach((c) => {
      c.x += c.spd * dt;
      if (c.x - 200 > this.vw) {
        c.x = -190;
      }
    });

    // Movimento de pólen / vagalumes
    this.ambientMotes.forEach((m) => {
      m.phase += dt * 2.2;
      m.xRatio += (Math.sin(m.phase) * m.spd * dt) / Math.max(320, this.vw);
      m.yRatio -= (dt * 9) / Math.max(480, this.vh);
      if (m.yRatio < 0.25) m.yRatio = 0.96;
    });

    if (this.malletAnim > 0) {
      this.malletAnim = Math.max(0, this.malletAnim - dt);
    }
    if (this.malletVisibleTimer > 0) {
      this.malletVisibleTimer = Math.max(0, this.malletVisibleTimer - dt);
    }
    if (this.shakeTimer > 0) {
      this.shakeTimer = Math.max(0, this.shakeTimer - dt);
    }

    this.impactBursts = this.impactBursts.filter((ib) => {
      ib.update(dt);
      return ib.life > 0;
    });

    this.particles = this.particles.filter((p) => {
      p.update(dt);
      return p.life > 0;
    });

    this.floatingTexts = this.floatingTexts.filter((ft) => {
      ft.update(dt);
      return ft.life > 0;
    });

    if (this.state !== "PLAYING") return;

    if (this.freezeTimer > 0) {
      this.freezeTimer = Math.max(0, this.freezeTimer - dt);
    }
    if (this.frenzyTimer > 0) {
      this.frenzyTimer = Math.max(0, this.frenzyTimer - dt);
    }

    if (this.damageFlashTimer > 0) {
      this.damageFlashTimer = Math.max(0, this.damageFlashTimer - dt);
    }

    const timeRate = this.freezeTimer > 0 ? 0.25 : 1.0;
    this.timeLeft -= dt * timeRate;

    if (this.frenzyTimer <= 0 && this.sounds.music.isFrenzy) {
      this.sounds.music.setFrenzy(false);
    }

    const raccoonSpeed = this.freezeTimer > 0 ? 0.48 : 1.0;
    this.holes.forEach((hole) => {
      const res = hole.update(dt, raccoonSpeed);
      if (res === "escaped") {
        if (this.combo >= 3) {
          this.floatingTexts.push(
            new FloatingText(hole.x, hole.y - 30 * hole.scale, "ESCAPOU!", "#ffaa73", 22)
          );
        }
        this.combo = 0;
      }
    });

    this.spawnCd -= dt * (this.frenzyTimer > 0 ? 1.55 : 1.0);
    if (this.spawnCd <= 0) {
      this.spawnRaccoon();
      const [sMin, sMax] = this.lvlCfg.spawnInterval;
      this.spawnCd = sMin + Math.random() * (sMax - sMin);
    }

    this.updateHUD();

    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      this.updateHUD();

      if (this.score >= this.lvlCfg.targetScore) {
        this.sounds.play("levelup");
        this.sounds.music.pause();
        // Desbloqueia a próxima fase com sucesso!
        this.maxUnlockedLevel = Math.max(this.maxUnlockedLevel, this.levelIdx + 1);
        this.saveProgress();

        if (this.levelIdx === LEVELS.length - 1) {
          this.state = "VICTORY";
          this.openModal(
            "assets/golden_laugh.png",
            "👑 CAMPEÃO SUPREMO DE WACKO RACCOON!",
            "Você venceu com glória todas as 10 fases do jogo! É o Maior Marretador de Todos!",
            [
              `Pontuação Final: ${this.score} pts`,
              `Maior Combo: ${this.maxCombo}x`,
              `Novo Recorde: ${this.highScore} pts`,
              "Troféu Dourado: Mestre dos Guaxinins Conquistado! 🏆",
            ],
            "JOGAR MODO INFINITO! >>"
          );
        } else {
          this.state = "LEVEL_CLEAR";
          this.openModal(
            "assets/normal_laugh.png",
            `FASE ${this.lvlCfg.num} CONCLUÍDA!`,
            "Mandou muito bem! Os guaxinins ficaram tontos!",
            [
              `Pontuação Total: ${this.score} pts`,
              `Combo Máximo: ${this.maxCombo}x`,
              "Bônus: +1 Vida Recuperada! ❤️",
            ],
            `PRÓXIMA FASE: FASE ${this.lvlCfg.num + 1} >>`
          );
        }
      } else {
        this.sounds.play("gameover");
        this.sounds.music.pause();
        this.state = "GAME_OVER";
        const diff = Math.max(0, this.lvlCfg.targetScore - this.score);
        this.openModal(
          "assets/normal_dizzy.png",
          "FIM DE JOGO!",
          `Faltaram ${diff} pontos para atingir a meta da fase!`,
          [
            `Pontuação Alcançada: ${this.score} pts`,
            `Meta da Fase ${this.lvlCfg.num}: ${this.lvlCfg.targetScore} pts`,
            `Melhor Combo: ${this.maxCombo}x`,
            "Dica: Acerte os guaxinins e evite buracos vazios!",
          ],
          "TENTAR NOVAMENTE!"
        );
      }
    }
  }

  drawHoleAndRaccoon(ctx, hole) {
    const bw = 225 * hole.scale;
    const bh = 120 * hole.scale;
    const bx = hole.x - bw / 2;
    const by = hole.y - bh / 2;

    // 1. MOLDURA / COMPARTIMENTO INDIVIDUAL DO BURACO
    // Cria um pedestal destacado para cada toca, mantendo tudo super organizado e nítido
    ctx.save();
    let frameOffsetX = 0;
    let frameOffsetY = 0;
    if (hole.errorAnim > 0) {
      // Tremor visual exclusivo no buraco onde o jogador errou
      frameOffsetX = (Math.random() * 2 - 1) * 6;
      frameOffsetY = (Math.random() * 2 - 1) * 6;
    }

    const fw = 212 * hole.scale;
    const fh = 106 * hole.scale;
    const fcx = hole.x + frameOffsetX;
    const fcy = hole.y + 6 * hole.scale + frameOffsetY;

    // Sombra suave do pedestal individual
    ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
    ctx.beginPath();
    ctx.ellipse(fcx, fcy + 8 * hole.scale, fw * 0.52, fh * 0.44, 0, 0, Math.PI * 2);
    ctx.fill();

    // Base do pedestal (madeira tratada ou alerta vermelho se errou)
    const pedestalGrad = ctx.createLinearGradient(fcx, fcy - fh * 0.5, fcx, fcy + fh * 0.5);
    if (hole.errorAnim > 0) {
      pedestalGrad.addColorStop(0, "#e53935");
      pedestalGrad.addColorStop(1, "#8e0000");
    } else {
      pedestalGrad.addColorStop(0, "#5a341e");
      pedestalGrad.addColorStop(0.5, "#422413");
      pedestalGrad.addColorStop(1, "#2c170a");
    }
    ctx.fillStyle = pedestalGrad;
    ctx.beginPath();
    ctx.ellipse(fcx, fcy, fw * 0.50, fh * 0.42, 0, 0, Math.PI * 2);
    ctx.fill();

    // Borda chanfrada dourada / bronze com relevo 3D
    ctx.lineWidth = Math.max(2, 3.2 * hole.scale);
    ctx.strokeStyle = hole.errorAnim > 0 ? "#ff9999" : "#e4aa4c";
    ctx.stroke();

    // Chanfro interno
    ctx.lineWidth = Math.max(1, 1.6 * hole.scale);
    ctx.strokeStyle = hole.errorAnim > 0 ? "#ff3333" : "rgba(255, 235, 160, 0.35)";
    ctx.beginPath();
    ctx.ellipse(fcx, fcy - 2 * hole.scale, fw * 0.46, fh * 0.38, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Rebites decorativos nos 4 cantos do pedestal
    const rivetDistX = fw * 0.42;
    const rivetDistY = fh * 0.24;
    const rRadius = Math.max(2, 3.5 * hole.scale);
    const rivetColor = hole.errorAnim > 0 ? "#ffcccc" : "#ffe175";
    [
      [fcx - rivetDistX, fcy - rivetDistY],
      [fcx + rivetDistX, fcy - rivetDistY],
      [fcx - rivetDistX, fcy + rivetDistY],
      [fcx + rivetDistX, fcy + rivetDistY],
    ].forEach(([rx, ry]) => {
      ctx.fillStyle = "#1e1008";
      ctx.beginPath();
      ctx.arc(rx, ry + 1, rRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = rivetColor;
      ctx.beginPath();
      ctx.arc(rx, ry, rRadius * 0.85, 0, Math.PI * 2);
      ctx.fill();
    });

    // Se houve erro no buraco: desenha rachaduras / símbolo 'X' branco
    if (hole.errorAnim > 0) {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = Math.max(3, 4.5 * hole.scale);
      ctx.beginPath();
      const crossSize = 22 * hole.scale;
      ctx.moveTo(fcx - crossSize, fcy - crossSize * 0.7);
      ctx.lineTo(fcx + crossSize, fcy + crossSize * 0.7);
      ctx.moveTo(fcx + crossSize, fcy - crossSize * 0.7);
      ctx.lineTo(fcx - crossSize, fcy + crossSize * 0.7);
      ctx.stroke();
    }
    ctx.restore();

    // 2. FUNDO DA TOCA (HOLE_BACK)
    const backImg = this.images["hole_back"];
    const frontImg = this.images["hole_front"];

    if (backImg && backImg.complete) {
      ctx.drawImage(backImg, bx, by, bw, bh);
    }

    // 3. GUAXINIM (SE ATIVO E VISÍVEL)
    if (hole.state !== "empty" && hole.progress > 0.01) {
      const sprState =
        hole.state === "bonked" ? "dizzy" : hole.progress > 0.85 ? "laugh" : "idle";
      const sprImg = this.images[`${hole.variant}_${sprState}`];

      if (sprImg && sprImg.complete) {
        let sxMult = 1.0;
        let syMult = 1.0;
        if (hole.state === "rising") {
          sxMult = 0.93;
          syMult = 1.08;
        } else if (hole.state === "up") {
          const breath = Math.sin(hole.animTime * 7.5) * 0.025;
          sxMult = 1.0 - breath;
          syMult = 1.0 + breath;
        } else if (hole.state === "bonked") {
          sxMult = 1.15;
          syMult = 0.82;
        }

        const sw = 188 * hole.scale * sxMult;
        const sh = 188 * hole.scale * syMult;
        const maxRise = 126 * hole.scale;
        const curRise = maxRise * hole.progress;

        const clipBottom = hole.y + 16 * hole.scale;
        const sprX = hole.x - sw / 2;
        const sprY = clipBottom - curRise - 32 * hole.scale * syMult;

        ctx.save();
        ctx.beginPath();
        ctx.rect(sprX - 10, sprY - 20, sw + 20, Math.max(0, clipBottom - sprY + 20));
        ctx.clip();
        ctx.drawImage(sprImg, sprX, sprY, sw, sh);
        ctx.restore();
      }
    }

    // 4. FRENTE DA TOCA (HOLE_FRONT)
    if (frontImg && frontImg.complete) {
      ctx.drawImage(frontImg, bx, by, bw, bh);
    }

    // 5. BADGE ORGANIZADO DE IDENTIFICAÇÃO DO BURACO
    if (this.state === "PLAYING") {
      const badgeX = hole.x;
      const badgeY = hole.y + 36 * hole.scale;
      const badgeR = Math.max(10, 13 * hole.scale);

      ctx.save();
      ctx.fillStyle = "#1e1008";
      ctx.beginPath();
      ctx.arc(badgeX, badgeY + 1, badgeR + 1, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = hole.errorAnim > 0 ? "#ff4444" : "#422514";
      ctx.beginPath();
      ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = Math.max(1, 1.5 * hole.scale);
      ctx.strokeStyle = hole.errorAnim > 0 ? "#ffffff" : "#ebaf4e";
      ctx.stroke();

      ctx.font = `900 ${Math.max(10, Math.round(13 * hole.scale))}px 'Nunito', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = hole.errorAnim > 0 ? "#ffffff" : "#ffe79a";
      ctx.fillText(String(hole.idx + 1), badgeX, badgeY + 0.5);
      ctx.restore();
    }
  }

  draw() {
    this.ensureBackgroundRendered();
    const ctx = this.ctx;

    ctx.save();
    if (this.shakeTimer > 0) {
      const ox = (Math.random() * 2 - 1) * this.shakeMag;
      const oy = (Math.random() * 2 - 1) * this.shakeMag;
      ctx.translate(ox, oy);
    }

    // 1. Cenário Pintado em Cache
    ctx.drawImage(this.bgCanvas, 0, 0, this.vw, this.vh);

    // 2. Nuvens 3D em movimento
    const isNight = this.lvlCfg.theme.sky[0] < 90;
    const cloudImg = this.images[isNight ? "cloud_night" : "cloud_day"];
    if (cloudImg && cloudImg.complete) {
      this.clouds.forEach((c) => {
        const cw = 155 * c.scale * this.uiScale;
        const ch = 64 * c.scale * this.uiScale;
        const cy = Math.min(this.horizonY - ch - 12, this.vh * c.yRatio);
        if (cy > -20) {
          ctx.drawImage(cloudImg, c.x, cy, cw, ch);
        }
      });
    }

    // 3. Partículas de Luz Ambiente (Vagalumes / Pólen)
    this.ambientMotes.forEach((m) => {
      const mx = m.xRatio * this.vw;
      const my = m.yRatio * this.vh;
      ctx.fillStyle = isNight ? "#beff78" : "#fff8af";
      ctx.beginPath();
      ctx.arc(mx, my, isNight ? 2.6 : 1.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. Tocas e Guaxinins (apenas fora do menu inicial)
    if (this.state !== "MENU") {
      if (this.arenaRect) {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(this.arenaRect.x, this.arenaRect.y, this.arenaRect.w, this.arenaRect.h, this.arenaRect.r);
        } else {
          ctx.rect(this.arenaRect.x, this.arenaRect.y, this.arenaRect.w, this.arenaRect.h);
        }
        ctx.fill();
        ctx.restore();
      }
      this.holes.forEach((hole) => this.drawHoleAndRaccoon(ctx, hole));
      this.impactBursts.forEach((ib) => ib.draw(ctx));
      this.particles.forEach((p) => p.draw(ctx));
      this.floatingTexts.forEach((ft) => ft.draw(ctx, this.uiScale));
    }

    // 5. Efeitos de Borda de Power-up Ativo
    if (this.state === "PLAYING" && this.freezeTimer > 0) {
      ctx.strokeStyle = "rgba(105, 225, 255, 0.35)";
      ctx.lineWidth = 14;
      ctx.strokeRect(0, 0, this.vw, this.vh);
    }
    if (this.state === "PLAYING" && this.frenzyTimer > 0) {
      const pulse = 0.25 + 0.18 * Math.sin(this.globalTime * 12);
      ctx.strokeStyle = `rgba(255, 215, 35, ${pulse.toFixed(2)})`;
      ctx.lineWidth = 16;
      ctx.strokeRect(0, 0, this.vw, this.vh);
    }

    // 6. Marreta Animada
    const showMallet = !this.isTouchDevice || this.malletVisibleTimer > 0;
    if (showMallet && this.state === "PLAYING") {
      let frameKey = "mallet_0";
      if (this.malletAnim > 0.09) frameKey = "mallet_2";
      else if (this.malletAnim > 0) frameKey = "mallet_1";

      const mImg = this.images[frameKey];
      if (mImg && mImg.complete) {
        const mSize = 145 * Math.max(0.78, this.uiScale);
        ctx.save();
        if (this.isTouchDevice && this.malletVisibleTimer < 0.2) {
          ctx.globalAlpha = this.malletVisibleTimer / 0.2;
        }
        ctx.drawImage(mImg, this.pointerX - mSize * 0.38, this.pointerY - mSize * 0.48, mSize, mSize);
        ctx.restore();
      }
    }

    // 7. Flash Vermelho de Dano na Tela
    if (this.damageFlashTimer > 0) {
      const alpha = Math.min(0.38, this.damageFlashTimer * 1.4);
      ctx.fillStyle = `rgba(255, 30, 30, ${alpha.toFixed(2)})`;
      ctx.fillRect(0, 0, this.vw, this.vh);
    }

    ctx.restore();
  }

  loop(now) {
    const dt = Math.min(0.05, (now - this.lastTime) / 1000);
    this.lastTime = now;
    this.update(dt);
    this.draw();
    requestAnimationFrame((t) => this.loop(t));
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new WackoRaccoonWebGame();
});
