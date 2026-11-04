// Lightweight, zero-dependency canvas confetti and gold sparkle emitter.
// Runs smoothly at 60fps on both mobile and desktop browsers.

let canvas = null;
let ctx = null;
let particles = [];
let animationId = null;

function getCanvas() {
  if (canvas && document.body.contains(canvas)) return { canvas, ctx };
  canvas = document.createElement("canvas");
  canvas.id = "royal-confetti-canvas";
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");

  const resize = () => {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    if (ctx) ctx.scale(dpr, dpr);
  };
  resize();
  window.addEventListener("resize", resize);
  return { canvas, ctx };
}

const GOLD_COLORS = [
  "#FFD700",
  "#F5D061",
  "#D4AF37",
  "#FFF3B0",
  "#E6C687",
  "#F7E7CE",
  "#E9D5FF",
  "#9333EA",
];

export function fireConfetti({
  count = 70,
  origin = { x: 0.5, y: 0.5 },
  spread = 80,
  colors = GOLD_COLORS,
} = {}) {
  const { ctx } = getCanvas();
  if (!ctx) return;

  const startX = origin.x * window.innerWidth;
  const startY = origin.y * window.innerHeight;

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI / 180) * (-90 + (Math.random() - 0.5) * spread * 2);
    const speed = 7 + Math.random() * 12;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 5 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 12,
      gravity: 0.28,
      drag: 0.96,
      opacity: 1,
      shape: Math.random() > 0.4 ? "rect" : Math.random() > 0.5 ? "circle" : "star",
    });
  }

  if (!animationId) {
    loop();
  }
}

export function fireGoldSparkles(xRatio = 0.5, yRatio = 0.5) {
  fireConfetti({
    count: 45,
    origin: { x: xRatio, y: yRatio },
    spread: 60,
    colors: ["#FFE082", "#FFD54F", "#FFCA28", "#FFC107", "#FFF8E1", "#E9D5FF"],
  });
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

function loop() {
  if (!canvas || !ctx) {
    animationId = null;
    return;
  }

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.vx *= p.drag;
    p.vy = p.vy * p.drag + p.gravity;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.vRotation;
    p.opacity -= 0.012;

    if (p.opacity <= 0 || p.y > window.innerHeight + 50) {
      particles.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.fillStyle = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);

    if (p.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === "star") {
      drawStar(ctx, 0, 0, 5, p.size, p.size / 2.5);
    } else {
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size * 1.5);
    }
    ctx.restore();
  }

  if (particles.length > 0) {
    animationId = requestAnimationFrame(loop);
  } else {
    animationId = null;
    if (ctx) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

