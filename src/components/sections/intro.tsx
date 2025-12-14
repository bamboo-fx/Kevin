"use client";

import Link from "next/link";

export function Intro() {
  return (
    <section className="w-full max-w-2xl mx-auto px-6 py-6">
      <p className="text-lg md:text-xl text-[#6b6b6b] leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
        I study CS + Math @{" "}
        <Link
          href="/learnings"
          className="text-[#1a1a1a] font-medium link-underline hover:text-[#c45c3e] transition-colors duration-200 ease-out"
        >
          Harvey Mudd
        </Link>.
      </p>
    </section>
  );
}

export default Intro;