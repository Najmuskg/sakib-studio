import Link from "next/link";

const projects = [
  {
    title: "AI Legal Assistant",
    desc: "Enterprise AI system for document analysis and legal automation.",
    tags: ["Next.js", "AI", "Prisma"],
  },
  {
    title: "SOS App",
    desc: "Real-time emergency GPS tracking and alert system.",
    tags: ["React Native", "Maps", "Realtime"],
  },
  {
    title: "Admin Dashboard",
    desc: "Analytics dashboard with dynamic charts and role-based access.",
    tags: ["Next.js", "PostgreSQL", "Charts"],
  },
];

export default function Projects({ id }: { id?: string }) {
  return (
    <section id={id} className="px-6 md:px-20 py-28">
      <div className="flex items-end justify-between mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Selected <span className="text-blue-500">Work</span>
        </h2>

        <button className="btn">
          Some recent builds
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <Link href="#"
            key={i}
            className="group relative rounded-2xl border border-white/10
                       bg-white/5 backdrop-blur-md overflow-hidden
                       hover:bg-white/10 transition-all duration-300"
          >
            {/* glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-600/10 to-purple-600/10" />

            {/* image placeholder */}
            <div className="h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/10" />

            <div className="p-6 relative z-10">
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                {p.title}
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                {p.desc}
              </p>

              {/* tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full
                               bg-white/10 border border-white/10 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition">
                View Project →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}