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
    subtitle: "Acerte os Guaxinins travessos antes que fujam!",
    grid: [3, 3],
    duration: 38,
    targetScore: 850,
    spawnInterval: [0.85, 1.35],
    stayTime: [1.25, 1.85],
    maxActive: 2,
    weights: { normal: 82, golden: 10, bandit: 8, helmet: 0, bomb: 0, decoy: 0, clock: 0 },
    theme: { sky: [95, 185, 248], hills: [88, 178, 86], lawn: [74, 162, 68], accent: "#ffd73c" },
  },
  {
    num: 2,
    name: "Horta da Vovó",
    subtitle: "Cuidado com as Bombas! Não bata nelas!",
    grid: [3, 3],
    duration: 42,
    targetScore: 1650,
    spawnInterval: [0.68, 1.15],
    stayTime: [1.05, 1.55],
    maxActive: 3,
    weights: { normal: 58, bandit: 16, golden: 10, bomb: 13, clock: 3, helmet: 0, decoy: 0 },
    theme: { sky: [115, 200, 242], hills: [102, 174, 74], lawn: [82, 154, 58], accent: "#ffa532" },
  },
  {
    num: 3,
    name: "Acampamento da Floresta",
    subtitle: "Guaxinins de Capacete precisam de 2 marretadas!",
    grid: [3, 4],
    duration: 45,
    targetScore: 2700,
    spawnInterval: [0.55, 0.95],
    stayTime: [0.92, 1.40],
    maxActive: 4,
    weights: { normal: 42, bandit: 18, helmet: 18, golden: 8, bomb: 10, clock: 4, decoy: 0 },
    theme: { sky: [238, 148, 96], hills: [78, 134, 74], lawn: [60, 122, 62], accent: "#ff8241" },
  },
  {
    num: 4,
    name: "Noite dos Guaxinins",
    subtitle: "Proteja a Amiguinha Rosa (Flor)! Bater nela tira pontos!",
    grid: [3, 4],
    duration: 48,
    targetScore: 4000,
    spawnInterval: [0.45, 0.82],
    stayTime: [0.80, 1.25],
    maxActive: 4,
    weights: { normal: 32, bandit: 20, helmet: 18, golden: 9, bomb: 10, decoy: 7, clock: 4 },
    theme: { sky: [28, 38, 78], hills: [38, 74, 78], lawn: [34, 92, 64], accent: "#8cdcff" },
  },
  {
    num: 5,
    name: "Festival do Caos",
    subtitle: "Eles fazem fintas rápidas! Fique atento!",
    grid: [4, 4],
    duration: 52,
    targetScore: 5600,
    spawnInterval: [0.35, 0.68],
    stayTime: [0.72, 1.12],
    maxActive: 5,
    weights: { normal: 26, bandit: 24, helmet: 20, golden: 10, bomb: 10, decoy: 6, clock: 4 },
    theme: { sky: [64, 34, 88], hills: [64, 78, 54], lawn: [52, 104, 54], accent: "#ff6ec3" },
  },
  {
    num: 6,
    name: "Reino do Rei Guaxinim",
    subtitle: "Desafio Final! Velocidade máxima e chuva de pontos!",
    grid: [4, 4],
    duration: 58,
    targetScore: 7800,
    spawnInterval: [0.26, 0.54],
    stayTime: [0.64, 1.00],
    maxActive: 6,
    weights: { normal: 20, bandit: 25, helmet: 22, golden: 13, bomb: 10, decoy: 6, clock: 4 },
    theme: { sky: [42, 18, 54], hills: [82, 48, 64], lawn: [44, 88, 60], accent: "#ffd72d" },
  },
];

function getDynamicLevel(levelIdx) {
  if (levelIdx < LEVELS.length) {
    return JSON.parse(JSON.stringify(LEVELS[levelIdx]));
  }
  const extra = levelIdx - LEVELS.length + 1;
  const base = JSON.parse(JSON.stringify(LEVELS[LEVELS.length - 1]));
  base.num = levelIdx + 1;
  base.name = `Insanidade Guaxinim #${extra + 1}`;
  base.subtitle = "Modo Mestre Infinito — Até onde seus reflexos chegam?";
  base.targetScore = Math.round(base.targetScore + extra * 2400);
  const sMin = Math.max(0.18, base.spawnInterval[0] * Math.pow(0.92, extra));
  const sMax = Math.max(0.35, base.spawnInterval[1] * Math.pow(0.92, extra));
  const tMin = Math.max(0.48, base.stayTime[0] * Math.pow(0.94, extra));
  const tMax = Math.max(0.78, base.stayTime[1] * Math.pow(0.94, extra));
  base.spawnInterval = [sMin, sMax];
  base.stayTime = [tMin, tMax];
  base.maxActive = Math.min(8, 6 + Math.floor(extra / 2));
  return base;
}

// ---------------------------------------------------------------------------
// 2. SINTETIZADOR DE ÁUDIO ARCADE (WEB AUDIO API - ZERO DEPENDÊNCIAS EXTERNAS)
// ---------------------------------------------------------------------------
class SoundBank {
  constructor() {
    this.ctx = null;
    this.muted = false;
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
    if (this.state === "empty" || this.state === "bonked" || this.progress < 0.18) {
      return false;
    }
    // Hitbox generosa para toque confortável no mobile e precisão no mouse
    const w = 162 * this.scale;
    const h = 165 * this.scale * this.progress;
    const topY = this.y - 125 * this.scale * this.progress - 22 * this.scale;
    const leftX = this.x - w / 2;
    return px >= leftX && px <= leftX + w && py >= topY && py <= topY + h + 42 * this.scale;
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

    // No celular em modo retrato (vertical), gira a grade 3x4 para 4x3 para aproveitar toda a tela vertical!
    if (isPortrait && rows < cols) {
      const tmp = rows;
      rows = cols;
      cols = tmp;
    }

    const playTop = this.horizonY + (isPortrait ? 58 : 54);
    const playBottom = this.vh - (isPortrait ? 52 : 58);
    const availH = Math.max(160, playBottom - playTop);

    const sideMargin = Math.max(54, Math.min(155, this.vw * (isPortrait ? 0.14 : 0.135)));
    const playLeft = sideMargin;
    const playRight = this.vw - sideMargin;
    const availW = Math.max(160, playRight - playLeft);

    const rowStep = rows > 1 ? availH / (rows - 1) : 0;
    const colStep = cols > 1 ? availW / (cols - 1) : 0;

    // Calcula escala ideal de cada toca para caber com folga tanto em largura quanto em altura
    const maxHoleW = cols > 1 ? colStep * 0.88 : availW * 0.6;
    const maxHoleH = rows > 1 ? rowStep * 0.92 : availH * 0.6;
    const scaleByW = maxHoleW / 225;
    const scaleByH = maxHoleH / 145;
    const baseScale = Math.max(0.38, Math.min(1.08, Math.min(scaleByW, scaleByH)));

    const totalHoles = rows * cols;
    const newHoles = [];

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const depthFactor = 0.9 + 0.16 * (rows > 1 ? r / (rows - 1) : 0.5);
        const hx = Math.round(playLeft + c * colStep);
        const hy = Math.round(playTop + r * rowStep);
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
      this.updateMenuUI();
    });

    document.getElementById("btn-next-lvl").addEventListener("click", () => {
      this.sounds.play("click");
      this.levelIdx = Math.min(LEVELS.length - 1, this.levelIdx + 1);
      this.lvlCfg = getDynamicLevel(this.levelIdx);
      this.bgCacheKey = "";
      this.updateMenuUI();
    });

    // Botão Jogar Agora
    document.getElementById("btn-play").addEventListener("click", () => {
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
    this.menuLevelLabel.textContent = `Fase Selecionada: Fase ${info.num} — ${info.name}`;
    this.menuFooterRecord.innerHTML = `Melhor Pontuação: ${this.highScore} pts &nbsp;|&nbsp; Toque na tela ou use o Mouse / Teclas 1-9!`;
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
    this.levelIdx = levelIdx;
    if (resetTotal) {
      this.score = 0;
      this.combo = 0;
      this.maxCombo = 0;
      this.lives = this.maxLives;
    } else {
      this.lives = Math.min(this.maxLives, this.lives + 1);
    }

    this.lvlCfg = getDynamicLevel(levelIdx);
    this.timeLeft = this.lvlCfg.duration;
    this.freezeTimer = 0.0;
    this.frenzyTimer = 0.0;
    this.spawnCd = 0.65;
    this.particles = [];
    this.impactBursts = [];
    this.floatingTexts = [];
    this.holes = [];

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
  }

  goToMainMenu() {
    this.closeModal();
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
      this.setupLevel(this.levelIdx + 1, false);
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

  triggerWhack(mx, my) {
    this.malletAnim = 0.16;

    let hitHole = null;
    for (let i = this.holes.length - 1; i >= 0; i--) {
      if (this.holes[i].containsPoint(mx, my)) {
        hitHole = this.holes[i];
        break;
      }
    }

    if (!hitHole) {
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
      this.shakeTimer = 0.4;
      this.shakeMag = 14;
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
      this.shakeTimer = 0.22;
      this.shakeMag = 8;
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

    const timeRate = this.freezeTimer > 0 ? 0.25 : 1.0;
    this.timeLeft -= dt * timeRate;

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
      this.saveProgress();

      if (this.score >= this.lvlCfg.targetScore) {
        this.sounds.play("levelup");
        if (this.levelIdx === LEVELS.length - 1) {
          this.state = "VICTORY";
          this.openModal(
            "assets/golden_laugh.png",
            "CAMPEÃO DE WACKO RACCOON!",
            "Você venceu todas as 6 fases principais! Quer encarar o Modo Infinito?",
            [
              `Pontuação Final: ${this.score} pts`,
              `Maior Combo: ${this.maxCombo}x`,
              `Novo Recorde: ${this.highScore} pts`,
            ],
            "CONTINUAR NO MODO INFINITO! >>"
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
              "Bônus: +1 Vida Recuperada!",
            ],
            `PRÓXIMA FASE: FASE ${this.lvlCfg.num + 1} >>`
          );
        }
      } else {
        this.sounds.play("gameover");
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

    const backImg = this.images["hole_back"];
    const frontImg = this.images["hole_front"];

    if (backImg && backImg.complete) {
      ctx.drawImage(backImg, bx, by, bw, bh);
    }

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

    if (frontImg && frontImg.complete) {
      ctx.drawImage(frontImg, bx, by, bw, bh);
    }

    if (hole.idx < 9 && this.state === "PLAYING" && !this.isTouchDevice) {
      const badgeX = hole.x;
      const badgeY = hole.y + 30 * hole.scale;
      ctx.save();
      ctx.font = `800 ${Math.max(11, Math.round(14 * hole.scale))}px 'Nunito', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#26160c";
      ctx.strokeText(String(hole.idx + 1), badgeX, badgeY);
      ctx.fillStyle = "#f5e8cd";
      ctx.fillText(String(hole.idx + 1), badgeX, badgeY);
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
