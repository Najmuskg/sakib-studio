"use client";

import { useState, useRef, useEffect } from "react";

/* ─────────────────────────────────────────────
   ANIMATION DATA
   Each item: id, title, tags, type(CSS|JS|Canvas),
   preview component, html+css code snippet
───────────────────────────────────────────── */
const ANIMATIONS = [
  {
    id: 1,
    title: "Pulse Ring",
    desc: "Expanding rings from a dot",
    tags: ["loaders", "css"],
    type: "CSS",
    code: `.pulse {
  width: 52px; height: 52px;
  border-radius: 50%;
  background: #6366f1;
  position: relative;
}
.pulse::before,
.pulse::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid #6366f1;
  animation: pulse-ring 2s ease-out infinite;
}
.pulse::after { animation-delay: 1s; }

@keyframes pulse-ring {
  0%   { transform: scale(1); opacity: .8; }
  100% { transform: scale(2.4); opacity: 0; }
}`,
  },
  {
    id: 2,
    title: "Shimmer Skeleton",
    desc: "Loading placeholder sweep",
    tags: ["loaders", "css"],
    type: "CSS",
    code: `.skeleton {
  height: 14px;
  border-radius: 7px;
  background: linear-gradient(
    90deg,
    #1e1e2e 25%,
    #2e2e42 50%,
    #1e1e2e 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}`,
  },
  {
    id: 3,
    title: "Neon Orbit",
    desc: "Dot orbiting a glowing core",
    tags: ["loaders", "css"],
    type: "CSS",
    code: `.orbit-wrap {
  width: 64px; height: 64px;
  position: relative;
}
.core {
  width: 18px; height: 18px;
  border-radius: 50%;
  background: #f97316;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  box-shadow: 0 0 18px #f97316;
}
.ring {
  width: 64px; height: 64px;
  border-radius: 50%;
  border: 1.5px solid rgba(249,115,22,.4);
  position: absolute;
  animation: spin 2s linear infinite;
}
.dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #f97316;
  position: absolute;
  top: -5px; left: 50%;
  transform: translateX(-50%);
}
@keyframes spin {
  to { transform: rotate(360deg); }
}`,
  },
  {
    id: 4,
    title: "Typewriter",
    desc: "Classic cursor blink effect",
    tags: ["text", "css"],
    type: "CSS",
    code: `.typewriter {
  font-family: monospace;
  font-size: 20px;
  border-right: 2px solid #a78bfa;
  white-space: nowrap;
  overflow: hidden;
  width: 14ch;
  animation:
    type 2.5s steps(14) infinite alternate,
    blink .6s step-end infinite;
}
@keyframes type {
  from { width: 0; }
  to   { width: 14ch; }
}
@keyframes blink {
  50% { border-color: transparent; }
}`,
  },
  {
    id: 5,
    title: "Magnetic Dots",
    desc: "Dots that follow your cursor",
    tags: ["interactive", "js"],
    type: "JS",
    code: `const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const dots = Array.from({length: 40}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: 0, vy: 0,
  ox: 0, oy: 0,
}));
let mx = canvas.width/2, my = canvas.height/2;
canvas.onmousemove = e => {
  const r = canvas.getBoundingClientRect();
  mx = e.clientX - r.left;
  my = e.clientY - r.top;
};
dots.forEach(d => { d.ox = d.x; d.oy = d.y; });

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  dots.forEach(d => {
    const dx = mx - d.x, dy = my - d.y;
    const dist = Math.hypot(dx, dy);
    const force = Math.min(80 / dist, 3);
    d.vx += dx * force * .001;
    d.vy += dy * force * .001;
    d.vx += (d.ox - d.x) * .05;
    d.vy += (d.oy - d.y) * .05;
    d.vx *= .85; d.vy *= .85;
    d.x += d.vx; d.y += d.vy;
    ctx.beginPath();
    ctx.arc(d.x, d.y, 4, 0, Math.PI*2);
    ctx.fillStyle = "#818cf8";
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();`,
  },
  {
    id: 6,
    title: "Liquid Blob",
    desc: "Morphing organic shape loop",
    tags: ["backgrounds", "css"],
    type: "CSS",
    code: `.blob {
  width: 120px; height: 120px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border-radius: 60% 40% 30% 70% /
                 60% 30% 70% 40%;
  animation: morph 6s ease-in-out infinite;
}
@keyframes morph {
  0%,100% {
    border-radius:
      60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  25% {
    border-radius:
      30% 70% 70% 30% / 30% 30% 70% 70%;
  }
  50% {
    border-radius:
      50% 50% 30% 70% / 50% 70% 30% 50%;
  }
  75% {
    border-radius:
      70% 30% 50% 50% / 40% 60% 40% 60%;
  }
}`,
  },
  {
    id: 7,
    title: "Flip Card",
    desc: "3D perspective flip on hover",
    tags: ["interactions", "css"],
    type: "CSS",
    code: `.scene {
  width: 120px; height: 80px;
  perspective: 600px;
}
.card {
  width: 100%; height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform .7s cubic-bezier(.4,0,.2,1);
}
.scene:hover .card {
  transform: rotateY(180deg);
}
.front, .back {
  position: absolute;
  inset: 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  backface-visibility: hidden;
}
.front { background: #6366f1; color: #fff; }
.back  {
  background: #f97316;
  color: #fff;
  transform: rotateY(180deg);
}`,
  },
  {
    id: 8,
    title: "Particle Burst",
    desc: "Canvas explosion on click",
    tags: ["interactions", "canvas"],
    type: "Canvas",
    code: `const c = document.getElementById("c");
const ctx = c.getContext("2d");
let particles = [];

function burst(x, y) {
  for (let i = 0; i < 60; i++) {
    const angle = (Math.PI * 2 / 60) * i;
    const speed = Math.random() * 4 + 1;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: \`hsl(\${Math.random()*360},80%,65%)\`,
      r: Math.random() * 4 + 2,
    });
  }
}
c.onclick = e => {
  const r = c.getBoundingClientRect();
  burst(e.clientX-r.left, e.clientY-r.top);
};
burst(c.width/2, c.height/2);

function draw() {
  ctx.fillStyle = "rgba(10,10,18,.2)";
  ctx.fillRect(0,0,c.width,c.height);
  particles = particles.filter(p => p.alpha > .01);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    p.vy += .08; p.alpha *= .96;
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}
draw();`,
  },
  {
    id: 9,
    title: "Stagger Bars",
    desc: "Sequential bar equalizer",
    tags: ["loaders", "css"],
    type: "CSS",
    code: `.bars {
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 48px;
}
.bar {
  width: 8px;
  background: #22d3ee;
  border-radius: 4px 4px 0 0;
  animation: bounce 1s ease-in-out infinite alternate;
}
.bar:nth-child(1) { animation-delay: 0s;   height: 40%; }
.bar:nth-child(2) { animation-delay: .1s;  height: 70%; }
.bar:nth-child(3) { animation-delay: .2s;  height: 50%; }
.bar:nth-child(4) { animation-delay: .3s;  height: 90%; }
.bar:nth-child(5) { animation-delay: .4s;  height: 60%; }
.bar:nth-child(6) { animation-delay: .5s;  height: 30%; }

@keyframes bounce {
  from { transform: scaleY(.3); }
  to   { transform: scaleY(1); }
}`,
  },
  {
    id: 10,
    title: "Spotlight Cursor",
    desc: "Radial mask follows mouse",
    tags: ["backgrounds", "js"],
    type: "JS",
    code: `const el = document.getElementById("spotlight");
document.addEventListener("mousemove", e => {
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  el.style.background = \`
    radial-gradient(
      circle 120px at \${x}px \${y}px,
      rgba(99,102,241,.25) 0%,
      transparent 100%
    )
  \`;
});`,
  },
  {
    id: 11,
    title: "Ripple Click",
    desc: "Material-style water ripple",
    tags: ["interactions", "js"],
    type: "JS",
    code: `document.querySelectorAll(".ripple-btn")
  .forEach(btn => {
    btn.addEventListener("click", e => {
      const r = btn.getBoundingClientRect();
      const circle = document.createElement("span");
      const size = Math.max(btn.offsetWidth, btn.offsetHeight);
      circle.style.cssText = \`
        position:absolute;
        width:\${size}px; height:\${size}px;
        left:\${e.clientX-r.left-size/2}px;
        top:\${e.clientY-r.top-size/2}px;
        border-radius:50%;
        background:rgba(255,255,255,.35);
        transform:scale(0);
        animation:ripple .5s linear;
        pointer-events:none;
      \`;
      btn.appendChild(circle);
      circle.addEventListener("animationend",
        () => circle.remove());
    });
  });

/* CSS needed:
@keyframes ripple {
  to { transform: scale(2.5); opacity: 0; }
}
.ripple-btn { position: relative; overflow: hidden; } */`,
  },
  {
    id: 12,
    title: "Glitch Text",
    desc: "RGB-split glitch effect",
    tags: ["text", "css"],
    type: "CSS",
    code: `.glitch {
  font-size: 32px;
  font-weight: 900;
  color: #fff;
  position: relative;
  animation: glitch 2.5s infinite;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}
.glitch::before {
  color: #f0f; left: 2px;
  clip-path: polygon(0 0,100% 0,100% 45%,0 45%);
  animation: glitch-top 2.5s infinite;
}
.glitch::after {
  color: #0ff; left: -2px;
  clip-path: polygon(0 55%,100% 55%,100% 100%,0 100%);
  animation: glitch-bot 2.5s infinite;
}
@keyframes glitch {
  2%,64% { transform: translate(2px,0) skew(0deg); }
  4%,60% { transform: translate(-2px,0) skew(0deg); }
  62%    { transform: translate(0,0) skew(5deg); }
}
@keyframes glitch-top {
  2%,64% { transform: translate(2px,-2px); }
  4%,60% { transform: translate(-2px,2px); }
  62%    { transform: translate(13px,-1px) skew(-13deg); }
}
@keyframes glitch-bot {
  2%,64% { transform: translate(-2px,0); }
  4%,60% { transform: translate(-2px,0); }
  62%    { transform: translate(-10px,5px) skew(1deg); }
}`,
  },
];

const ALL_TAGS = ["all", "loaders", "text", "interactions", "backgrounds", "canvas"];
const TYPE_COLOR = {
  CSS: { bg: "#1e3a5f", text: "#60a5fa" },
  JS: { bg: "#3b2f0a", text: "#fbbf24" },
  Canvas: { bg: "#1a3028", text: "#34d399" },
};

/* ─── Live animation previews ─── */
function PulseRing() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#6366f1", position: "relative" }}>
        <style>{`
          @keyframes pr { 0%{transform:scale(1);opacity:.8} 100%{transform:scale(2.4);opacity:0} }
          .pr::before,.pr::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #6366f1;animation:pr 2s ease-out infinite;}
          .pr::after{animation-delay:1s}
        `}</style>
        <div className="pr" style={{ position: "absolute", inset: 0, borderRadius: "50%" }} />
      </div>
    </div>
  );
}

function ShimmerSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "75%", padding: "8px 0" }}>
      <style>{`@keyframes sh{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>
      {[100, 70, 90, 55].map((w, i) => (
        <div key={i} style={{ height: 12, width: `${w}%`, borderRadius: 6, background: "linear-gradient(90deg,#1e1e2e 25%,#3a3a5c 50%,#1e1e2e 75%)", backgroundSize: "200% 100%", animation: `sh 1.6s ${i * 0.1}s infinite` }} />
      ))}
    </div>
  );
}

function NeonOrbit() {
  return (
    <div style={{ position: "relative", width: 64, height: 64 }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#f97316", boxShadow: "0 0 16px #f97316", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div style={{ width: 64, height: 64, borderRadius: "50%", border: "1.5px solid rgba(249,115,22,.5)", position: "absolute", animation: "spin 2s linear infinite" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f97316", position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)", boxShadow: "0 0 8px #f97316" }} />
      </div>
    </div>
  );
}

function TypewriterAnim() {
  return (
    <div style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 600, color: "#a78bfa", display: "flex", alignItems: "center" }}>
      <style>{`
        @keyframes tp{from{width:0}to{width:11ch}}
        @keyframes bl{50%{border-color:transparent}}
        .tw{border-right:2px solid #a78bfa;white-space:nowrap;overflow:hidden;width:11ch;animation:tp 2.5s steps(11) infinite alternate,bl .6s step-end infinite;}
      `}</style>
      <span className="tw">Hello World</span>
    </div>
  );
}

function MagneticDots() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const dots = Array.from({ length: 28 }, () => {
      const x = Math.random() * W, y = Math.random() * H;
      return { x, y, vx: 0, vy: 0, ox: x, oy: y };
    });
    let mx = W / 2, my = H / 2;
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
    };
    canvas.addEventListener("mousemove", onMove);
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        const dx = mx - d.x, dy = my - d.y;
        const dist = Math.hypot(dx, dy) || 1;
        const force = Math.min(80 / dist, 3);
        d.vx += dx * force * 0.001 + (d.ox - d.x) * 0.05;
        d.vy += dy * force * 0.001 + (d.oy - d.y) * 0.05;
        d.vx *= 0.85; d.vy *= 0.85;
        d.x += d.vx; d.y += d.vy;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#818cf8";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener("mousemove", onMove); };
  }, []);
  return <canvas ref={canvasRef} width={200} height={140} style={{ display: "block" }} />;
}

function LiquidBlob() {
  return (
    <div>
      <style>{`
        @keyframes morph{
          0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}
          25%{border-radius:30% 70% 70% 30%/30% 30% 70% 70%}
          50%{border-radius:50% 50% 30% 70%/50% 70% 30% 50%}
          75%{border-radius:70% 30% 50% 50%/40% 60% 40% 60%}
        }
        .blob{width:90px;height:90px;background:linear-gradient(135deg,#6366f1,#a855f7);animation:morph 6s ease-in-out infinite;}
      `}</style>
      <div className="blob" />
    </div>
  );
}

function FlipCard() {
  return (
    <div style={{ perspective: 600, width: 110, height: 70 }}>
      <style>{`
        @keyframes fp{0%,100%{transform:rotateY(0)}50%{transform:rotateY(180deg)}}
        .flip-c{width:100%;height:100%;position:relative;transform-style:preserve-3d;animation:fp 3s 1s ease-in-out infinite;}
        .flip-f,.flip-b{position:absolute;inset:0;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;backface-visibility:hidden;}
        .flip-f{background:#6366f1;color:#fff}
        .flip-b{background:#f97316;color:#fff;transform:rotateY(180deg)}
      `}</style>
      <div className="flip-c">
        <div className="flip-f">FRONT</div>
        <div className="flip-b">BACK</div>
      </div>
    </div>
  );
}

function ParticleBurst() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const burst = (x, y) => {
      for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 / 50) * i;
        const speed = Math.random() * 3.5 + 1;
        particles.current.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, alpha: 1, color: `hsl(${Math.random() * 360},80%,65%)`, r: Math.random() * 3.5 + 1.5 });
      }
    };
    const onClick = (e) => {
      const r = canvas.getBoundingClientRect();
      burst(e.clientX - r.left, e.clientY - r.top);
    };
    canvas.addEventListener("click", onClick);
    burst(W / 2, H / 2);
    let raf;
    const draw = () => {
      ctx.fillStyle = "rgba(10,10,18,.18)";
      ctx.fillRect(0, 0, W, H);
      particles.current = particles.current.filter(p => p.alpha > 0.02);
      particles.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.alpha *= 0.96;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener("click", onClick); };
  }, []);
  return <canvas ref={canvasRef} width={200} height={140} style={{ display: "block", cursor: "crosshair" }} />;
}

function StaggerBars() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 52 }}>
      <style>{`@keyframes sb{from{transform:scaleY(.25)}to{transform:scaleY(1)}}`}</style>
      {[40, 70, 50, 90, 60, 35].map((h, i) => (
        <div key={i} style={{ width: 9, height: `${h}%`, background: "#22d3ee", borderRadius: "4px 4px 0 0", transformOrigin: "bottom", animation: `sb 1s ${i * 0.1}s ease-in-out infinite alternate` }} />
      ))}
    </div>
  );
}

function SpotlightCursor() {
  const ref = useRef(null);
  const handleMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    ref.current.style.background = `radial-gradient(circle 80px at ${x}px ${y}px, rgba(99,102,241,.35) 0%, transparent 100%)`;
  };
  return (
    <div ref={ref} onMouseMove={handleMove} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#6b7280", cursor: "none", borderRadius: 8 }}>
      Move cursor here
    </div>
  );
}

function RippleClick() {
  const btnRef = useRef(null);
  const handleClick = (e) => {
    const btn = btnRef.current;
    const r = btn.getBoundingClientRect();
    const size = Math.max(btn.offsetWidth, btn.offsetHeight);
    const span = document.createElement("span");
    span.style.cssText = `position:absolute;width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px;border-radius:50%;background:rgba(255,255,255,.3);transform:scale(0);animation:rp .55s linear;pointer-events:none;`;
    btn.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  };
  return (
    <div>
      <style>{`@keyframes rp{to{transform:scale(2.6);opacity:0}}`}</style>
      <button ref={btnRef} onClick={handleClick} style={{ position: "relative", overflow: "hidden", padding: "12px 30px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
        Click me
      </button>
    </div>
  );
}

function GlitchText() {
  return (
    <div style={{ position: "relative" }}>
      <style>{`
        @keyframes gt{2%,64%{transform:translate(2px,0) skew(0)}4%,60%{transform:translate(-2px,0)}62%{transform:translate(0,0) skew(5deg)}}
        @keyframes gt2{2%,64%{transform:translate(2px,-2px)}4%,60%{transform:translate(-2px,2px)}62%{transform:translate(13px,-1px) skew(-13deg)}}
        @keyframes gt3{2%,64%{transform:translate(-2px,0)}4%,60%{transform:translate(-2px,0)}62%{transform:translate(-10px,5px) skew(1deg)}}
        .glitch-w{font-size:28px;font-weight:900;color:#fff;position:relative;display:inline-block;animation:gt 2.5s infinite;}
        .glitch-w::before,.glitch-w::after{content:attr(data-text);position:absolute;inset:0;font-size:28px;font-weight:900;}
        .glitch-w::before{color:#f0f;left:2px;clip-path:polygon(0 0,100% 0,100% 45%,0 45%);animation:gt2 2.5s infinite;}
        .glitch-w::after{color:#0ff;left:-2px;clip-path:polygon(0 55%,100% 55%,100% 100%,0 100%);animation:gt3 2.5s infinite;}
      `}</style>
      <span className="glitch-w" data-text="GLITCH">GLITCH</span>
    </div>
  );
}

const PREVIEWS = {
  1: PulseRing,
  2: ShimmerSkeleton,
  3: NeonOrbit,
  4: TypewriterAnim,
  5: MagneticDots,
  6: LiquidBlob,
  7: FlipCard,
  8: ParticleBurst,
  9: StaggerBars,
  10: SpotlightCursor,
  11: RippleClick,
  12: GlitchText,
};

/* ─── Main Component ─── */
export default function AnimationGallery() {
  const [activeTag, setActiveTag] = useState("all");
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);

  const filtered = ANIMATIONS.filter(a =>
    activeTag === "all" || a.tags.includes(activeTag)
  );

  const handleSelect = (item) => {
    setSelected(item);
    setCopied(false);
    document.getElementById("ag-panel")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const handleCopy = () => {
    if (!selected) return;
    navigator.clipboard.writeText(selected.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="px-6 md:px-20 py-28" style={{ minHeight: "100vh", color: "#e2e8f0" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #13131f; }
        ::-webkit-scrollbar-thumb { background: #2e2e4a; border-radius: 3px; }
      `}</style>

      <div >

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6366f1", margin: "0 0 12px", fontWeight: 600 }}>
            Animation Collection
          </p>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, margin: "0 0 14px", lineHeight: 1.1, color: "#f8fafc" }}>
            Crafted CSS & JS Animations
          </h2>
          <p style={{ fontSize: 15, color: "#64748b", margin: 0, maxWidth: 480 }}>
            Click any card to preview and copy its source code instantly.
          </p>
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => { setActiveTag(tag); setSelected(null); }}
              style={{
                padding: "6px 18px",
                borderRadius: 999,
                border: activeTag === tag ? "1px solid #6366f1" : "1px solid #1e1e30",
                background: activeTag === tag ? "#6366f1" : "transparent",
                color: activeTag === tag ? "#fff" : "#64748b",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all .2s",
                textTransform: "capitalize",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {filtered.map(item => {
            const Preview = PREVIEWS[item.id];
            const typeStyle = TYPE_COLOR[item.type];
            const isSelected = selected?.id === item.id;
            return (
              <div
              className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
                key={item.id}
                onClick={() => handleSelect(item)}
                style={{
                  border: isSelected ? "1.5px solid #6366f1" : "1px solid transparent",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all .2s",
                  transform: isSelected ? "translateY(-3px)" : "none",
                  boxShadow: isSelected ? "0 0 24px rgba(99,102,241,.2)" : "none",
                }}
              >
                {/* Preview area */}
                <div style={{ height: 150, background: "#080810", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <Preview />
                  {/* Type badge */}
                  <span style={{
                    position: "absolute", top: 10, right: 10,
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                    padding: "3px 9px", borderRadius: 999,
                    background: typeStyle.bg, color: typeStyle.text,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {item.type}
                  </span>
                </div>

                {/* Card info */}
                <div style={{ padding: "14px 16px", borderTop: "1px solid #1a1a2e" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#f1f5f9", marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#475569" }}>{item.desc}</div>
                  <div style={{ display: "flex", gap: 5, marginTop: 10, flexWrap: "wrap" }}>
                    {item.tags.map(t => (
                      <span key={t} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: "#13131f", color: "#475569", border: "1px solid #1e1e30", textTransform: "capitalize" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Code Panel */}
        {selected && (
          <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md" id="ag-panel" style={{ marginTop: "2.5rem",  overflow: "hidden" }}>

            {/* Panel Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 22px", borderBottom: "1px solid #1a1a2e", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9" }}>{selected.title}</div>
                <div style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>{selected.desc}</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={handleCopy}
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "8px 18px",
                    borderRadius: 8,
                    border: copied ? "1px solid #34d399" : "1px solid #1e1e30",
                    background: copied ? "rgba(52,211,153,.1)" : "#13131f",
                    color: copied ? "#34d399" : "#94a3b8",
                    fontSize: 13, fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit",
                    transition: "all .2s",
                  }}
                >
                  {copied ? (
                    <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Copied!</>
                  ) : (
                    <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg> Copy code</>
                  )}
                </button>
              </div>
            </div>

            {/* Code block */}
            <div style={{ padding: "22px 24px", overflowX: "auto" }}>
              <pre style={{
                margin: 0,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                lineHeight: 1.8,
                color: "#94a3b8",
                whiteSpace: "pre",
              }}>
                {selected.code.split("\n").map((line, i) => {
                  // Simple syntax highlight
                  const hl = line
                    .replace(/(@keyframes|@import|animation|transform|border-radius|background|color|position|display|width|height|content|opacity|font[-\w]*|cursor)/g, '<span style="color:#818cf8">$1</span>')
                    .replace(/(\/\*[\s\S]*?\*\/|\/\/.*)/g, '<span style="color:#475569">$1</span>')
                    .replace(/(".*?"|'.*?'|`.*?`)/g, '<span style="color:#34d399">$1</span>')
                    .replace(/\b(const|let|var|function|return|new|this|document|forEach|addEventListener|requestAnimationFrame|Math|Array)\b/g, '<span style="color:#f472b6">$1</span>');
                  return (
                    <div key={i} style={{ display: "flex", gap: 20 }}>
                      <span style={{ userSelect: "none", color: "#2e2e4a", minWidth: 28, textAlign: "right", flexShrink: 0 }}>{i + 1}</span>
                      <span dangerouslySetInnerHTML={{ __html: hl }} />
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>
        )}

        {!selected && (
          <div style={{ marginTop: "2.5rem", textAlign: "center", padding: "3rem", border: "1px dashed #1a1a2e", borderRadius: 16, color: "#2e2e4a", fontSize: 14 }}>
            ↑ Select an animation to view its code
          </div>
        )}
      </div>
    </section>
  );
}
