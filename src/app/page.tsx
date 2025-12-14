"use client";

import { Header } from "@/components/sections/header";
import { Intro } from "@/components/sections/intro";
import { Bio } from "@/components/sections/bio";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f7] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#f0eeea] via-[#faf9f7] to-[#faf9f7] pointer-events-none" />
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c45c3e]/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4a7c59]/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <main className="relative z-10 flex flex-col items-center">
        <Header />
        <Intro />
        <Bio />
        <Footer />
      </main>
    </div>
  );
}
