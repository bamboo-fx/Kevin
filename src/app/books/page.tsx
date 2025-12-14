"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Quote } from "lucide-react";

const books = [
  {
    title: "Mathematics for Human Flourishing",
    author: "Francis Su",
    quotes: [
      "The skills society needs from math may change, but the virtues needed from math will not.",
      "Exploration stimulates the virtue of creativity.",
      "Even wrong ideas soften the soil in which good ideas can grow.",
      "Stories are an essential part of retaining new knowledge. It is much easier to remember things when they make sense in a story.",
      "Mathematics is the science of patterns and the art of engaging the meaning of those patterns."
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#f0eeea] via-[#faf9f7] to-[#faf9f7] pointer-events-none" />
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4a7c59]/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c45c3e]/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-3xl mx-auto px-6 py-16"
      >
        <motion.div variants={itemVariants}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#6b6b6b] hover:text-[#c45c3e] transition-colors duration-300 mb-12 group"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm tracking-wide">Back to home</span>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <h1 
            className="text-5xl font-light text-[#1a1a1a] mb-4" 
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Books
          </h1>
          <p 
            className="text-lg text-[#6b6b6b] leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Books I've read and favorite quotes that resonated with me.
          </p>
        </motion.div>

        <div className="space-y-12">
          {books.map((book, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/60 backdrop-blur-sm border border-[#e5e2db] rounded-2xl p-8 hover:border-[#c45c3e]/30 transition-all duration-500 group"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#4a7c59]/10 to-[#3d5a80]/10 group-hover:from-[#4a7c59]/20 group-hover:to-[#3d5a80]/20 transition-all duration-500">
                  <Quote className="w-6 h-6 text-[#4a7c59]" />
                </div>
                <div>
                  <h2 
                    className="text-2xl font-medium text-[#1a1a1a] mb-1" 
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {book.title}
                  </h2>
                  <p 
                    className="text-[#9a9a9a] text-sm tracking-wide"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {book.author}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {book.quotes.map((quote, quoteIdx) => (
                  <motion.div
                    key={quoteIdx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.4 + (quoteIdx * 0.1),
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="relative pl-6 border-l-2 border-[#e5e2db] hover:border-[#c45c3e]/50 transition-colors duration-300 py-1"
                  >
                    <p 
                      className="text-[#4a4a4a] leading-relaxed italic"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      "{quote}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
    </div>
  );
}
