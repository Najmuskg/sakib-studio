export type AnimationType = "CSS" | "JS" | "Canvas";

export interface AnimationItem {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  type: AnimationType;
  code: string;
}

export const ANIMATIONS: AnimationItem[] = [
  {
    id: 1,
    title: "Pulse Ring",
    desc: "Expanding rings",
    tags: ["loaders", "css"],
    type: "CSS",
    code: `.pulse{width:52px;height:52px;border-radius:50%;background:#6366f1;position:relative}
.pulse::before,.pulse::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #6366f1;animation:pulse 2s infinite}
.pulse::after{animation-delay:1s}
@keyframes pulse{to{transform:scale(2.4);opacity:0}}`,
  },
  {
    id: 2,
    title: "Shimmer",
    desc: "Skeleton loading",
    tags: ["loaders"],
    type: "CSS",
    code: `.skeleton{height:14px;background:linear-gradient(90deg,#1e1e2e,#2e2e42,#1e1e2e);background-size:200%;animation:sh 1.5s infinite}
@keyframes sh{to{background-position:200%}}`,
  },
  {
    id: 3,
    title: "Orbit",
    desc: "Spinning dot",
    tags: ["loaders"],
    type: "CSS",
    code: `.ring{animation:spin 2s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}`,
  },
  {
    id: 4,
    title: "Typewriter",
    desc: "Typing text",
    tags: ["text"],
    type: "CSS",
    code: `.tw{overflow:hidden;border-right:2px solid;animation:tp 2s steps(10) infinite}
@keyframes tp{from{width:0}to{width:10ch}}`,
  },
  {
    id: 5,
    title: "Magnetic",
    desc: "Canvas dots",
    tags: ["interactions"],
    type: "JS",
    code: `// canvas logic`,
  },
  {
    id: 6,
    title: "Blob",
    desc: "Morph shape",
    tags: ["backgrounds"],
    type: "CSS",
    code: `.blob{animation:m 6s infinite}`,
  },
  {
    id: 7,
    title: "Flip",
    desc: "3D card",
    tags: ["interactions"],
    type: "CSS",
    code: `.card{transform:rotateY(180deg)}`,
  },
  {
    id: 8,
    title: "Burst",
    desc: "Particles",
    tags: ["canvas"],
    type: "Canvas",
    code: `// burst`,
  },
  {
    id: 9,
    title: "Bars",
    desc: "Equalizer",
    tags: ["loaders"],
    type: "CSS",
    code: `.bar{animation:bounce}`,
  },
  {
    id: 10,
    title: "Spotlight",
    desc: "Cursor light",
    tags: ["backgrounds"],
    type: "JS",
    code: `// spotlight`,
  },
  {
    id: 11,
    title: "Ripple",
    desc: "Click ripple",
    tags: ["interactions"],
    type: "JS",
    code: `// ripple`,
  },
  {
    id: 12,
    title: "Glitch",
    desc: "Text glitch",
    tags: ["text"],
    type: "CSS",
    code: `.glitch{animation:g}`,
  },
];

export const ALL_TAGS = ["all","loaders","text","interactions","backgrounds","canvas"];

export const TYPE_COLOR = {
  CSS: { bg: "#1e3a5f", text: "#60a5fa" },
  JS: { bg: "#3b2f0a", text: "#fbbf24" },
  Canvas: { bg: "#1a3028", text: "#34d399" },
};