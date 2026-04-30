"use client";

import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiPrisma,
  SiPostgresql,
  SiGreensock,
} from "react-icons/si";

const skills = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Three.js", icon: SiThreedotjs },
  { name: "GSAP", icon: SiGreensock },
  { name: "Prisma", icon: SiPrisma },
  { name: "PostgreSQL", icon: SiPostgresql },
];

function MarqueeRow({ className = "", direction = 1 }) {
  return (
    <div
      className={`flex gap-6 w-max animate-marquee ${className}`}
      style={{
        animationDirection: direction === -1 ? "reverse" : "normal",
      }}
    >
      {[...skills, ...skills].map((s, i) => {
        const Icon = s.icon;

        return (
          <div
            key={i}
            className="flex items-center gap-3 px-5 py-3 rounded-full
                       bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <Icon className="text-[#3b82f6] text-xl" />
            <span className="text-white text-sm">{s.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Skills() {
  return (
    <section className="px-6 md:px-20 py-24 overflow-hidden relative">

      <h2 className="text-3xl font-bold mb-10 text-white">
        Tech <span className="text-[#3b82f6]">Stack</span>
      </h2>
   

        <div className="absolute inset-0 flex items-center gap-6 opacity-20 blur-[5px] overflow-hidden
        [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]
        [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <MarqueeRow direction={-1} />
          <MarqueeRow direction={-1} />
        </div>

        <div className="relative z-10 flex items-center gap-6 overflow-hidden
        [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]
        [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <MarqueeRow direction={1} />
          <MarqueeRow direction={1} />
        </div>
    </section>
  );
}