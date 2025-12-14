"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Intro() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-2xl mx-auto px-6 py-6"
    >
      <p className="text-lg md:text-xl text-[#6b6b6b] leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
        I study{" "}
        <span className="text-[#1a1a1a] font-medium">CS + Math</span>
        {" "}@{" "}
        <Link
          href="https://www.hmc.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1a1a1a] font-medium link-underline hover:text-[#c45c3e] transition-colors duration-300"
        >
          Harvey Mudd
        </Link>
        .
      </p>
    </motion.section>
  );
}

export default Intro;
