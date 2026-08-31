"use client";

import Link from "next/link";

export function Intro() {
  return (
    <section className="w-full max-w-2xl mx-auto px-6 pt-4 pb-0">
      <div className="group relative pl-4 border-l-2 border-[#e5e2db] hover:border-[#c45c3e]/50 transition-all duration-300 ease-out">
        <p className="text-[17px] leading-relaxed text-[#6b6b6b]" style={{ fontFamily: "var(--font-sans)" }}>
          Currently building{" "}
          <Link
            href="https://whistlelabs.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1a1a1a] font-medium link-underline hover:text-[#c45c3e] transition-colors duration-300"
          >
            Whistle
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Intro;
