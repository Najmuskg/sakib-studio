"use client";

import { useLenis } from "@/gsap/useLenis";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";

export default function Page() {
  // useLenis();
  return (
    <main className="overflow-x-hidden">
      <Navbar />

      <Hero />

      <Projects id="work" />

      <Skills />

      <About />

      <Contact id="contact" />
    </main>
  );
}