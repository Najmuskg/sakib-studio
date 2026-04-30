"use client";
import LogoIcon from "@/components/logo/IconLogo";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/10 bg-black/20 backdrop-blur-2xl"
            : ""
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-12 py-5">

          <div className="flex items-center gap-2">
            <LogoIcon />
            <span className="text-white font-bold tracking-widest">
              SAKIB<span className="text-blue-500">.STUDIO</span>
            </span>
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn"
          >
            Start Project
          </button>
        </div>
      </header>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-lg animate-fadeIn">

          {/* Glow background layer */}
          <div className="absolute w-[500px] h-[500px] bg-[#3b82f6]/20 blur-[120px] rounded-full" />

          {/* Modal */}
          <div
            className="relative w-[92%] max-w-md rounded-2xl 
                 border border-[#3b82f6]/30 
                 bg-white/5 backdrop-blur-2xl
                 shadow-[0_0_60px_rgba(59,130,246,0.25)]
                 p-6 animate-popIn"
          >
            {/* Title */}
            <h2 className="text-xl font-bold text-white mb-2 tracking-wide">
              🚀 Start a New Project
            </h2>

            <p className="text-white/60 text-sm mb-5">
              Turn your idea into reality
            </p>

            {/* Inputs */}
            <input
              placeholder="Project name..."
              className="w-full mb-3 px-4 py-3 rounded-lg 
                   bg-black/30 border border-white/10 
                   text-white outline-none
                   focus:border-[#3b82f6]/60 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            />

            <textarea
              placeholder="Describe your idea..."
              className="w-full h-28 px-4 py-3 rounded-lg 
                   bg-black/30 border border-white/10 
                   text-white outline-none resize-none
                   focus:border-[#3b82f6]/60 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="btn"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  alert("Project Created 🚀");
                  setOpen(false);
                }}
                className="btn bg-blue-600!"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}