"use client";

import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import AnimationGallery from "@/components/AnimationGallery";

export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />

      <Hero />
      <AnimationGallery />

      <Projects id="work" />

      <Skills />

      <About />

      <Contact id="contact" />
    </main>
  );
}