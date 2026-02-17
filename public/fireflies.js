// ===== CONFIGURAÇÕES =====
const CONFIG = {
  quantidade: 15,       // número fixo de bolas
  velocidadeMin: 0.1,   // velocidade mínima
  velocidadeMax: 0.8,   // velocidade máxima
  tamanhoMin: 20,        // raio mínimo
  tamanhoMax: 36,       // raio máximo
  cor: "#cd4fffff",
  variacaoDirecao: 0.05 // quanto muda a direção a cada frame
};

// ===== CANVAS =====
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ===== CRIAÇÃO DAS BOLAS =====
const bolas = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function criarBola() {
  const angulo = random(0, Math.PI * 2);
  const velocidade = random(CONFIG.velocidadeMin, CONFIG.velocidadeMax);

  return {
    x: random(0, canvas.width),
    y: random(0, canvas.height),
    r: random(CONFIG.tamanhoMin, CONFIG.tamanhoMax),
    vx: Math.cos(angulo) * velocidade,
    vy: Math.sin(angulo) * velocidade
  };
}

for (let i = 0; i < CONFIG.quantidade; i++) {
  bolas.push(criarBola());
}

// ===== ANIMAÇÃO =====
function atualizar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bolas.forEach(bola => {
    // movimento "orgânico" tipo mosca
    bola.vx += random(-CONFIG.variacaoDirecao, CONFIG.variacaoDirecao);
    bola.vy += random(-CONFIG.variacaoDirecao, CONFIG.variacaoDirecao);

    // limitar velocidade para não acelerar infinitamente
    const vel = Math.hypot(bola.vx, bola.vy);
    const maxVel = CONFIG.velocidadeMax;
    if (vel > maxVel) {
      bola.vx = (bola.vx / vel) * maxVel;
      bola.vy = (bola.vy / vel) * maxVel;
    }

    bola.x += bola.vx;
    bola.y += bola.vy;

    // colisão com bordas (rebate)
    if (bola.x < bola.r || bola.x > canvas.width - bola.r) {
      bola.vx *= -1;
    }
    if (bola.y < bola.r || bola.y > canvas.height - bola.r) {
      bola.vy *= -1;
    }

    // desenhar
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.r, 0, Math.PI * 2);
    ctx.fillStyle = CONFIG.cor;
    ctx.fill();
  });

  requestAnimationFrame(atualizar);
}

atualizar();
