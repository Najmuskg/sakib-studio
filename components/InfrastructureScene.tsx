// "use client";

// import { useEffect, useRef } from "react";

// export default function InfrastructureScene() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const cv = canvasRef.current!;
//     const ctx = cv.getContext("2d")!;
//     let W = 0, H = 0, DPR = 1;
//     let animId: number;
//     let hovered: number | null = null;
//     let scanY = 0;
//     let t0 = performance.now();

//     const C = {
//       blue:   [55, 138, 221],
//       teal:   [29, 158, 117],
//       purple: [127, 119, 221],
//       amber:  [186, 117, 23],
//     } as const;

//     type ColorKey = keyof typeof C;
//     type RGBColor = number[];

//     const rgba = (c: RGBColor, a: number) =>
//       `rgba(${c[0]},${c[1]},${c[2]},${a})`;

//     /* ── NODE DEFINITIONS ── */
//     const NODE_DEF = [
//       { id: 0,  key: "core",    label: "Core",    group: "blue"   as ColorKey, r: 30, info: "Primary orchestrator" },
//       { id: 1,  key: "api",     label: "API GW",  group: "teal"   as ColorKey, r: 20, info: "REST / gRPC gateway" },
//       { id: 2,  key: "db",      label: "DB",      group: "teal"   as ColorKey, r: 20, info: "Postgres primary" },
//       { id: 3,  key: "auth",    label: "Auth",    group: "purple" as ColorKey, r: 18, info: "OAuth2 / JWT service" },
//       { id: 4,  key: "cache",   label: "Cache",   group: "purple" as ColorKey, r: 18, info: "Redis cluster" },
//       { id: 5,  key: "cdn",     label: "CDN",     group: "amber"  as ColorKey, r: 16, info: "Edge delivery" },
//       { id: 6,  key: "queue",   label: "Queue",   group: "amber"  as ColorKey, r: 16, info: "Message broker" },
//       { id: 7,  key: "sdk",     label: "SDK",     group: "teal"   as ColorKey, r: 14, info: "Client SDK layer" },
//       { id: 8,  key: "ci",      label: "CI/CD",   group: "teal"   as ColorKey, r: 14, info: "Build pipeline" },
//       { id: 9,  key: "logs",    label: "Logs",    group: "amber"  as ColorKey, r: 13, info: "Log aggregation" },
//       { id: 10, key: "metrics", label: "Metrics", group: "amber"  as ColorKey, r: 13, info: "Prometheus / Grafana" },
//       { id: 11, key: "worker",  label: "Worker",  group: "teal"   as ColorKey, r: 14, info: "Background jobs" },
//       { id: 12, key: "dns",     label: "DNS",     group: "blue"   as ColorKey, r: 13, info: "Name resolution" },
//     ];

//     const EDGE_DEF = [
//       [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,12],
//       [1,7],[2,4],[1,3],[2,8],[3,9],[4,10],[5,3],[6,4],[6,11],[7,8],[11,9],[11,10],[12,5],
//     ];

//     type NodeData = typeof NODE_DEF[number] & {
//       x: number; y: number; col: RGBColor; pulse: number;
//     };

//     let NODES: NodeData[] = [];

//     /* ── PACKETS ── */
//     type Packet = {
//       x: number; y: number;
//       fx: number; fy: number;
//       tx: number; ty: number;
//       t: number; speed: number;
//       col: RGBColor; size: number;
//     };
//     const PACKETS: Packet[] = [];

//     const spawnPacket = () => {
//       if (NODES.length === 0) return;
//       const [a, b] = EDGE_DEF[Math.floor(Math.random() * EDGE_DEF.length)];
//       const rev  = Math.random() > 0.5;
//       const from = NODES[rev ? b : a];
//       const to   = NODES[rev ? a : b];
//       if (!from || !to) return;
//       PACKETS.push({
//         x: from.x, y: from.y,
//         fx: from.x, fy: from.y,
//         tx: to.x,   ty: to.y,
//         t: 0,
//         speed: 0.006 + Math.random() * 0.01,
//         col: Math.random() > 0.5 ? from.col : to.col,
//         size: 2.5 + Math.random() * 1.5,
//       });
//     };

//     /* ── FLOATS ── */
//     type Float_ = {
//       x: number; y: number; r: number;
//       col: RGBColor; vx: number; vy: number; a: number;
//     };
//     const FLOATS: Float_[] = Array.from({ length: 100 }, () => ({
//       x: Math.random() * 1200,
//       y: Math.random() * 800,
//       r: 0.4 + Math.random() * 1.4,
//       col: [C.blue, C.teal, C.purple, C.amber][Math.floor(Math.random() * 4)] as RGBColor,
//       vx: (Math.random() - 0.5) * 0.28,
//       vy: (Math.random() - 0.5) * 0.28,
//       a:  0.1 + Math.random() * 0.35,
//     }));

//     /* ── RESIZE ── */
//     const rebuildLayout = () => {
//       const cx = W / 2, cy = H / 2;
//       const positions: [number, number][] = [
//         [cx,          cy        ],
//         [cx - 170,    cy - 110  ],
//         [cx + 170,    cy - 110  ],
//         [cx - 185,    cy + 95   ],
//         [cx + 185,    cy + 95   ],
//         [cx - 310,    cy - 10   ],
//         [cx + 310,    cy - 10   ],
//         [cx - 100,    cy - 220  ],
//         [cx + 100,    cy - 220  ],
//         [cx - 130,    cy + 210  ],
//         [cx + 130,    cy + 210  ],
//         [cx + 280,    cy + 160  ],
//         [cx - 280,    cy - 185  ],
//       ];
//       NODES = NODE_DEF.map((d, i) => ({
//         ...d,
//         x: positions[i][0],
//         y: positions[i][1],
//         col: C[d.group] as RGBColor,
//         pulse: Math.random() * Math.PI * 2,
//       }));
//     };

//     const resize = () => {
//       DPR = window.devicePixelRatio || 1;
//       W   = cv.offsetWidth  || window.innerWidth;
//       H   = cv.offsetHeight || window.innerHeight;
//       cv.width  = W * DPR;
//       cv.height = H * DPR;
//       ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
//       rebuildLayout();
//     };

//     /* ── HELPERS ── */
//     const getNeighbors = (id: number): Set<number> => {
//       const s = new Set<number>();
//       for (const [a, b] of EDGE_DEF) {
//         if (a === id) s.add(b);
//         if (b === id) s.add(a);
//       }
//       return s;
//     };

//     /* ── DRAW FUNCTIONS ── */
//     const drawGrid = () => {
//       const step = 44;
//       ctx.save();
//       ctx.strokeStyle = rgba(C.blue, 0.055);
//       ctx.lineWidth = 0.5;
//       for (let x = 0; x < W; x += step) {
//         ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
//       }
//       for (let y = 0; y < H; y += step) {
//         ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
//       }
//       ctx.restore();
//     };

//     const drawEdges = (neighbors: Set<number> | null) => {
//       for (const [a, b] of EDGE_DEF) {
//         const na = NODES[a], nb = NODES[b];
//         if (!na || !nb) continue;
//         const isHot      = hovered !== null && (a === hovered || b === hovered);
//         const isNeighbor = neighbors !== null && (neighbors.has(a) || neighbors.has(b)) && hovered !== null;
//         ctx.save();
//         ctx.beginPath();
//         ctx.moveTo(na.x, na.y);
//         ctx.lineTo(nb.x, nb.y);
//         if (isHot) {
//           ctx.strokeStyle = rgba(C.blue, 0.7);
//           ctx.lineWidth   = 1.2;
//           ctx.setLineDash([]);
//         } else if (isNeighbor) {
//           ctx.strokeStyle = rgba(C.blue, 0.3);
//           ctx.lineWidth   = 0.7;
//           ctx.setLineDash([5, 7]);
//         } else {
//           ctx.strokeStyle = rgba(C.blue, hovered !== null ? 0.06 : 0.14);
//           ctx.lineWidth   = 0.5;
//           ctx.setLineDash([3, 8]);
//         }
//         ctx.stroke();
//         ctx.restore();
//       }
//     };

//     const drawPackets = () => {
//       for (let i = PACKETS.length - 1; i >= 0; i--) {
//         const p = PACKETS[i];
//         p.t += p.speed;
//         p.x  = p.fx + (p.tx - p.fx) * p.t;
//         p.y  = p.fy + (p.ty - p.fy) * p.t;
//         if (p.t >= 1) { PACKETS.splice(i, 1); spawnPacket(); continue; }
//         const alpha = hovered !== null ? 0.25 : 0.85;
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//         ctx.fillStyle = rgba(p.col, alpha);
//         ctx.fill();
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
//         ctx.fillStyle = rgba(p.col, alpha * 0.18);
//         ctx.fill();
//       }
//     };

//     const drawFloats = () => {
//       for (const f of FLOATS) {
//         f.x += f.vx; f.y += f.vy;
//         if (f.x < 0) f.x = W; if (f.x > W) f.x = 0;
//         if (f.y < 0) f.y = H; if (f.y > H) f.y = 0;
//         ctx.beginPath();
//         ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
//         ctx.fillStyle = rgba(f.col, f.a);
//         ctx.fill();
//       }
//     };

//     const drawNodes = (neighbors: Set<number> | null, now: number) => {
//       for (const n of NODES) {
//         const isHot      = hovered === n.id;
//         const isNeighbor = neighbors !== null && neighbors.has(n.id);
//         const isDimmed   = hovered !== null && !isHot && !isNeighbor;
//         const baseAlpha  = isDimmed ? 0.2 : 1;

//         n.pulse += 0.025;
//         const breathe = isHot ? 1 + Math.sin(n.pulse * 2) * 0.06 : 1;

//         // animated outer ring (hot)
//         if (isHot) {
//           const pf = (Math.sin(n.pulse * 3) * 0.5 + 0.5) * 0.35;
//           ctx.beginPath();
//           ctx.arc(n.x, n.y, n.r * breathe + 14 + Math.sin(n.pulse * 3) * 3, 0, Math.PI * 2);
//           ctx.strokeStyle = rgba(n.col, pf);
//           ctx.lineWidth = 1;
//           ctx.stroke();
//         }

//         // halo ring
//         ctx.beginPath();
//         ctx.arc(n.x, n.y, n.r * breathe + 7, 0, Math.PI * 2);
//         ctx.strokeStyle = rgba(n.col, isDimmed ? 0.05 : isHot ? 0.25 : 0.1);
//         ctx.lineWidth = isHot ? 1.2 : 0.7;
//         ctx.stroke();

//         // body
//         ctx.beginPath();
//         ctx.arc(n.x, n.y, n.r * breathe, 0, Math.PI * 2);
//         ctx.fillStyle = "rgba(5,13,26,1)";
//         ctx.fill();
//         ctx.strokeStyle = rgba(n.col, isHot ? 0.95 : isNeighbor ? 0.65 : 0.45 * baseAlpha);
//         ctx.lineWidth = isHot ? 1.5 : 0.8;
//         ctx.stroke();

//         // label
//         ctx.fillStyle = rgba(n.col, isHot ? 1 : isNeighbor ? 0.85 : 0.6 * baseAlpha);
//         ctx.font = `${isHot ? 500 : 400} ${n.r > 22 ? 12 : 10}px 'JetBrains Mono', monospace`;
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillText(n.label, n.x, n.y);

//         // core online dot
//         if (n.id === 0) {
//           const dotA = 0.5 + Math.sin(now * 2) * 0.5;
//           ctx.beginPath();
//           ctx.arc(n.x + n.r - 6, n.y - n.r + 6, 3.5, 0, Math.PI * 2);
//           ctx.fillStyle = rgba(C.teal, dotA);
//           ctx.fill();
//         }
//       }
//     };

//     const drawScanline = () => {
//       scanY = (scanY + 0.6) % H;
//       ctx.save();
//       ctx.strokeStyle = rgba(C.blue, 0.06);
//       ctx.lineWidth = 2;
//       ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(W, scanY); ctx.stroke();
//       ctx.strokeStyle = rgba(C.blue, 0.02);
//       ctx.lineWidth = 8;
//       ctx.beginPath(); ctx.moveTo(0, scanY - 4); ctx.lineTo(W, scanY - 4); ctx.stroke();
//       ctx.restore();
//     };

//     const drawCorners = () => {
//       const size = 16, pad = 12;
//       const corners: [number, number][] = [[pad, pad], [W - pad, pad], [pad, H - pad], [W - pad, H - pad]];
//       const dirs: [number, number][] = [[1,1],[-1,1],[1,-1],[-1,-1]];
//       ctx.strokeStyle = rgba(C.blue, 0.22);
//       ctx.lineWidth = 1;
//       corners.forEach(([x, y], i) => {
//         const [dx, dy] = dirs[i];
//         ctx.beginPath();
//         ctx.moveTo(x, y + dy * size); ctx.lineTo(x, y); ctx.lineTo(x + dx * size, y);
//         ctx.stroke();
//       });
//     };

//     const drawStatusBar = (now: number) => {
//       const label = hovered !== null
//         ? `node:${NODES[hovered]?.key}  status:active  packets:${PACKETS.length}`
//         : `nodes:${NODES.length}  edges:${EDGE_DEF.length}  packets:${PACKETS.length}  t:${now.toFixed(1)}s`;
//       ctx.font = "400 9px 'JetBrains Mono', monospace";
//       ctx.fillStyle = rgba(C.blue, 0.28);
//       ctx.textAlign = "left";
//       ctx.textBaseline = "bottom";
//       ctx.fillText(label, 18, H - 10);
//       for (let i = 0; i < 5; i++) {
//         const active = Math.sin(now * 1.5 + i) > -0.4;
//         ctx.beginPath();
//         ctx.arc(W - 20 - i * 10, H - 15, 2.5, 0, Math.PI * 2);
//         ctx.fillStyle = rgba(active ? C.teal : C.amber, 0.55);
//         ctx.fill();
//       }
//     };

//     /* ── MAIN LOOP ── */
//     const frame = (ts: number) => {
//       const now = (ts - t0) / 1000;
//       const neighbors = hovered !== null ? getNeighbors(hovered) : null;

//       ctx.clearRect(0, 0, W, H);
//       ctx.fillStyle = "#050d1a";
//       ctx.fillRect(0, 0, W, H);

//       drawGrid();
//       drawFloats();
//       drawEdges(neighbors);
//       drawPackets();
//       drawNodes(neighbors, now);
//       drawScanline();
//       drawCorners();
//       drawStatusBar(now);

//       animId = requestAnimationFrame(frame);
//     };

//     /* ── MOUSE ── */
//     const onMouseMove = (e: MouseEvent) => {
//       const rect = cv.getBoundingClientRect();
//       const mx = e.clientX - rect.left;
//       const my = e.clientY - rect.top;
//       hovered = null;
//       for (const n of NODES) {
//         const dx = mx - n.x, dy = my - n.y;
//         if (Math.sqrt(dx * dx + dy * dy) < n.r + 8) {
//           hovered = n.id;
//           cv.title = `${n.label} · ${n.info}`;
//           cv.style.cursor = "pointer";
//           return;
//         }
//       }
//       cv.title = "";
//       cv.style.cursor = "crosshair";
//     };

//     const onMouseLeave = () => {
//       hovered = null;
//       cv.style.cursor = "crosshair";
//     };

//     /* ── INIT ── */
//     resize();
//     for (let i = 0; i < 8; i++) spawnPacket();
//     animId = requestAnimationFrame(frame);

//     cv.addEventListener("mousemove", onMouseMove);
//     cv.addEventListener("mouseleave", onMouseLeave);
//     window.addEventListener("resize", resize);

//     return () => {
//       cancelAnimationFrame(animId);
//       cv.removeEventListener("mousemove", onMouseMove);
//       cv.removeEventListener("mouseleave", onMouseLeave);
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="w-full h-screen block"
//       style={{ cursor: "crosshair", background: "#050d1a" }}
//     />
//   );
// }