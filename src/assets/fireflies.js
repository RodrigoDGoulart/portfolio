let c = init("canvas"),
  w = (canvas.width = window.innerWidth),
  h = (canvas.height = window.innerHeight);

// Converte "#RRGGBB" -> "rgba(r,g,b,a)"
function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

class Firefly {
  constructor(color) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;

    // ✅ TAMANHO MAIOR (range)
    this.s = 80 + Math.random() * 60; // 80..140

    this.ang = Math.random() * 2 * Math.PI;
    this.v = 2;

    this.color = color;

    // ✅ FADE IN / OUT
    this.age = 0;
    this.lifespan = 240 + Math.random() * 180; // frames (4s..7s a 60fps)
    this.alpha = 0;

    // quando termina a vida, ao invés de sumir instant, começa "morrendo"
    this.dead = false;
  }

  move() {
    this.x += this.v * Math.cos(this.ang);
    this.y += this.v * Math.sin(this.ang);
    this.ang += (Math.random() * 20 * Math.PI) / 180 - (10 * Math.PI) / 180;

    this.age++;

    // controla alpha (0->1->0) com uma curva suave
    // progresso 0..1
    const t = Math.min(this.age / this.lifespan, 1);

    // curva senoidal: começa 0, sobe até 1 no meio, volta a 0 no fim
    this.alpha = Math.sin(t * Math.PI);

    // marca como "morta" quando acabou
    if (this.age >= this.lifespan) this.dead = true;
  }

  show() {
    c.beginPath();
    c.arc(this.x, this.y, this.s, 0, 2 * Math.PI);

    // aplica alpha na cor
    c.fillStyle = hexToRgba(this.color, this.alpha * 0.75); // 0.75 = intensidade máxima
    c.fill();
  }

  isOutOfBounds() {
    return this.x < -this.s || this.x > w + this.s || this.y < -this.s || this.y > h + this.s;
  }
}

let f = [];

function draw(color, quantity = 76) {
  // quantidade total e taxa de spawn (ajustáveis)
  const MAX = quantity;
  const SPAWN_PER_FRAME = 2; // antes era 10 por chamada; com 2 fica mais leve e suave

  if (f.length < MAX) {
    for (let j = 0; j < SPAWN_PER_FRAME; j++) {
      f.push(new Firefly(color));
    }
  }

  for (let i = f.length - 1; i >= 0; i--) {
    f[i].move();
    f[i].show();

    // remove quando terminou a vida OU saiu muito da tela
    if (f[i].dead || f[i].isOutOfBounds()) {
      f.splice(i, 1);
    }
  }
}

let mouse = {};
let last_mouse = {};

canvas.addEventListener(
  "mousemove",
  function (e) {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;

    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
  },
  false
);

function init(elemid) {
  let canvas = document.getElementById(elemid),
    c = canvas.getContext("2d"),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight);
  c.fillStyle = "rgba(30,30,30,1)";
  c.fillRect(0, 0, w, h);
  return c;
}

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback);
    }
  );
})();

function loop() {
  window.requestAnimFrame(loop);
  c.clearRect(0, 0, w, h);
  draw("#d64fffff");
}

window.addEventListener("resize", function () {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

loop();

// ✅ IMPORTANTE: remova esse setInterval, ele duplica a animação e pode causar “pulos”
// setInterval(loop, 1000 / 60);
