"use client";

import Link from "next/link";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useTransition } from "@/contexts/transition-context";

export function Intro() {
  const { isInitialLoad } = useTransition();
  const { displayedText, isComplete } = useTypewriter(
    "I study CS + Math @ Harvey Mudd.",
    40,
    1000,
    !isInitialLoad
  );

  return (
    <section className="w-full max-w-2xl mx-auto px-6 py-6">
      <p className="text-lg md:text-xl text-[#6b6b6b] leading-relaxed min-h-[2.5rem]" style={{ fontFamily: "var(--font-sans)" }}>
        {displayedText.split(" ").map((word, idx) => {
          if (word === "CS" || word === "Math") {
            return (
              <span key={idx}>
                <span>{word}</span>{" "}
              </span>
            );
          }
          if (word.includes("Harvey") || word === "Mudd.") {
            return null;
          }
          return <span key={idx}>{word} </span>;
        })}
        {displayedText.includes("Harvey") && (
          <>
            <Link
              href="/learnings"
              className="text-[#1a1a1a] font-medium link-underline hover:text-[#c45c3e] transition-colors duration-200 ease-out"
            >
              Harvey Mudd
            </Link>.{" "}
          </>
        )}
        {!isComplete && <span className="animate-pulse">|</span>}
      </p>
    </section>
  );
}

export default Intro;