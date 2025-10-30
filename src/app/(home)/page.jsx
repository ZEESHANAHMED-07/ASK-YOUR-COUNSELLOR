"use client";

import Hero from "../../components/sections/Hero";
import Features from "../../components/sections/Features";
import Testimonials from "../../components/sections/Testimonials";
import Intro from "../../components/sections/Intro";
import Highlights from "../../components/sections/Highlights";
import CTA from "../../components/sections/CTA";

export default function HomePage() {
  return (
    <div className="font-sans">
      <Hero />
      <Intro />
      <Highlights />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
}
