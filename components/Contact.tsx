
"use client";

import { useState } from "react";

export default function Contact({ id }: { id?: string }) {
  const [openForm, setOpenForm] = useState(false);
  return (
    <section
      id={id}
      className="relative px-6 md:px-20 py-28 text-center"
    >
      {/* background glow */}
      <div className="absolute inset-0 " />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full" />

      <div className="relative max-w-3xl mx-auto">
        {/* label */}
        <span className="text-sm text-blue-400 uppercase tracking-widest">
          Contact
        </span>

        {/* heading */}
        <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
          Let’s Build Something{" "}
          <span className="text-blue-500">Elite</span>
        </h2>

        {/* description */}
        <p className="text-gray-400 mt-6 text-lg">
          Available for freelance & full-time opportunities. Let’s turn ideas
          into high-performance digital products.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => setOpenForm(true)} type="button" className="btn bg-blue-600!">
            Contact Me
          </button>

          <button type="button" className="btn">
            View Projects
          </button>
        </div>

        {/* email / social */}
        <div className="mt-12 text-sm text-gray-500">
          or reach me at{" "}
          <a href="mailto:najmuskg@email.com" className="text-white hover:text-blue-400 transition">
            najmuskg@email.com
          </a>
        </div>
      </div>

      {/* ---------------- INTERACTIVE FORM ---------------- */}
      {openForm && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-lg animate-[fadeIn_0.2s_ease-out]">

          {/* glow */}
          <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />

          {/* MODAL CARD */}
          <div
            className="
        relative w-[92%] max-w-md rounded-2xl
        border border-blue-500/20
        bg-white/5 backdrop-blur-2xl
        shadow-[0_0_60px_rgba(59,130,246,0.25)]
        p-6

        animate-[modalIn_0.35s_cubic-bezier(0.16,1,0.3,1)]
        origin-center
      "
          >
            {/* header */}
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-white text-lg font-medium">
                Send Message
              </h3>

              <button
                onClick={() => setOpenForm(false)}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* form */}
            <div className="space-y-3">
              <input
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-md bg-black/30 border border-blue-500/10 text-white outline-none focus:border-blue-500"
              />

              <input
                placeholder="Email"
                className="w-full px-4 py-2 rounded-md bg-black/30 border border-blue-500/10 text-white outline-none focus:border-blue-500"
              />

              <textarea
                placeholder="Your message..."
                rows={4}
                className="w-full px-4 py-2 rounded-md bg-black/30 border border-blue-500/10 text-white outline-none focus:border-blue-500"
              />

              <button
                type="button"
                className="w-full py-3 btn bg-blue-600!"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}