export default function About() {
  return (
    <section className="relative px-6 md:px-20 py-28">
      {/* background glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto">
        {/* header */}
        <div className="mb-10">
          <span className="text-sm text-blue-400 uppercase tracking-widest">
            Who I am
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            About <span className="text-blue-500">Me</span>
          </h2>
        </div>

        {/* content card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-md">
          <p className="text-gray-300 leading-relaxed text-lg">
            I build immersive digital experiences using modern frontend
            technologies, focusing on performance, animation, and scalable UI systems.
            I enjoy turning complex problems into clean, interactive interfaces.
          </p>

          {/* highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold">Frontend</h3>
              <p className="text-gray-400 text-sm mt-1">
                React, Next.js, Tailwind
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold">Animations</h3>
              <p className="text-gray-400 text-sm mt-1">
                GSAP, Three.js, Motion UI
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold">Backend</h3>
              <p className="text-gray-400 text-sm mt-1">
                Prisma, PostgreSQL, APIs
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}