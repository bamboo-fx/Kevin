"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/page-transition";

export default function HaterRolodexPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#faf9f7] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#f0eeea] via-[#faf9f7] to-[#faf9f7] pointer-events-none" />
        
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4a7c59]/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c45c3e]/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <main className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16">
          <div className="mb-8">
            <Link
              href="/tinkering"
              className="inline-flex items-center gap-2 text-[#6b6b6b] hover:text-[#c45c3e] transition-colors duration-300 group"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm tracking-wide">Back to tinkering</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 
              className="text-5xl font-light text-[#1a1a1a] mb-4" 
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Hater Rolodex
            </h1>
            <p 
              className="text-lg text-[#6b6b6b] leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Track when others hate, light hearted external motivation
            </p>
          </div>

          <div className="bg-white/50 border border-[#e5e5e5] rounded-lg p-8 shadow-lg">
            <div className="aspect-[9/16] max-w-md mx-auto">
              <iframe
                src="https://www.youtube.com/embed/XB1WCpxTK2U"
                title="Hater Rolodex"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-lg"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}

