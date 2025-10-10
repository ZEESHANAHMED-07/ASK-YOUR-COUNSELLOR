"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import Hero from "../../components/sections/Hero";
import Features from "../../components/sections/Features";
import Testimonials from "../../components/sections/Testimonials";
import Intro from "../../components/sections/Intro";
import Highlights from "../../components/sections/Highlights";
import CTA from "../../components/sections/CTA";

export default function HomePage() {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/sign-in");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <div className="font-sans">
      <div className="w-full flex justify-end px-4 pt-4">
        <button
          onClick={onLogout}
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-[color-mix(in_oklch,var(--background),black_6%)]"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
      <Hero />
      <Intro />
      <Highlights />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
}
