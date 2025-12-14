"use client";

import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import { PageTransition } from "@/components/page-transition";

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

export default function BooksPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#faf9f7] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#f0eeea] via-[#faf9f7] to-[#faf9f7] pointer-events-none" />
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4a7c59]/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c45c3e]/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#6b6b6b] hover:text-[#c45c3e] transition-colors duration-300 mb-12 group"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm tracking-wide">Back to home</span>
          </Link>
        </div>

        <div className="mb-12">
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
            Actively trying to read more, send me any recommendations!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-[#fff9e6] via-[#fffef5] to-[#fff9e6] border-2 border-[#e5d4a3] rounded-sm p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out cursor-pointer relative group hover:-translate-y-1"
              style={{ 
                transform: `rotate(${idx % 2 === 0 ? -1 : 1}deg)`,
                animation: `fadeInUp 0.4s ease-out ${idx * 0.1}s both`
              }}
            >
              <div className="absolute top-2 right-2 opacity-40 group-hover:opacity-60 transition-opacity">
                <Quote className="w-3.5 h-3.5 text-[#c45c3e]" />
              </div>
              
              <div className="mb-2 pr-6">
                <h2 
                  className="text-sm font-medium text-[#1a1a1a] mb-0.5 leading-tight" 
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {book.title}
                </h2>
                <p 
                  className="text-[#9a9a9a] text-[10px] tracking-wide"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {book.author}
                </p>
              </div>

              <div className="space-y-2">
                {book.quotes.map((quote, quoteIdx) => (
                  <div
                    key={quoteIdx}
                    className="border-l-2 border-[#c45c3e]/30 pl-1.5"
                  >
                    <p 
                      className="text-[#4a4a4a] text-xs leading-snug"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      "{quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
    </PageTransition>
  );
}