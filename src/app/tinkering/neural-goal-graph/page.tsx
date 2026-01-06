"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import App from "./App";

export default function NeuralGoalGraphPage() {
  return (
    <PageTransition>
      <div className="fixed inset-0 w-screen h-screen">
        <div className="absolute top-6 left-6 z-[300]">
          <Link
            href="/tinkering"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 group glass px-4 py-2 rounded-full"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm tracking-wide">Back to tinkering</span>
          </Link>
        </div>
        <App />
      </div>
    </PageTransition>
  );
}



