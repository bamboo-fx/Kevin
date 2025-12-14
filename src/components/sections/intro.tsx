"use client";

import Link from "next/link";
import { useTypewriter } from "@/hooks/useTypewriter";

export function Intro() {
  const { displayedText, isComplete } = useTypewriter(
    "I study CS + Math @ Harvey Mudd.",
    40,
    1000
  );

  return (
    <section className="w-full max-w-2xl mx-auto px-6 py-6">
      <p className="text-lg md:text-xl text-[#6b6b6b] leading-relaxed min-h-[2.5rem]" style={{ fontFamily: "var(--font-sans)" }}>
        {displayedText.split(" ").map((word, idx) => {
          if (word === "CS" || word === "Math" || word === "Mudd." || word.includes("Harvey")) {
            const cleanWord = word.replace("Mudd.", "");
            const isMudd = word === "Mudd.";
            return (
              <span key={idx}>
                {word.includes("Harvey") ? (
                  <Link
                    href="https://www.hmc.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a1a1a] font-medium link-underline hover:text-[#c45c3e] transition-colors duration-300"
                  >
                    Harvey Mudd
                  </Link>
                ) : isMudd ? (
                  <>
                    <Link
                      href="https://www.hmc.edu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1a1a1a] font-medium link-underline hover:text-[#c45c3e] transition-colors duration-300"
                    >
                      Mudd
                    </Link>
                    .
                  </>
                ) : (
                  <span className="text-[#1a1a1a] font-medium">{word}</span>
                )}{" "}
              </span>
            );
          }
          return <span key={idx}>{word} </span>;
        })}
        {!isComplete && <span className="animate-pulse">|</span>}
      </p>
    </section>
  );
}

export default Intro;