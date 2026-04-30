"use client";

import { motion } from "framer-motion";
import HeroScene from "./HeroScene";
// import InfrastructureScene from "./InfrastructureScene";

export default function Hero() {
  return (
    <section className="h-screen relative flex items-center justify-center text-center px-6 overflow-hidden">

      {/* 3D BACKGROUND */}
      <div className="absolute inset-0 w-full h-full z-0">
        <HeroScene />
        {/* <InfrastructureScene /> */}
      </div>

      {/* CONTENT */}
      <div className="relative z-10">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-400 mb-4"
        >
          PREMIUM FRONTEND ENGINEER
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold"
        >
          Crafting Immersive <br />
          <span className="text-blue-500">3D Experiences</span>
        </motion.h1>

        <p className="text-gray-400 mt-6 max-w-xl mx-auto">
          High-end interactive websites with motion, 3D and modern UI systems.
        </p>

        <div className="flex gap-4 mt-8 justify-center">

          <button
            type="button"
            onClick={() => {
              document.getElementById("work")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="btn bg-blue-600!"
          >
            View Work
          </button>

          <button
            type="button"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="btn"
          >
            Contact
          </button>

        </div>
      </div>
    </section>
  );
}