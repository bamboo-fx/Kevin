"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/page-transition";

const books = [
  {
    title: "Hands-On Machine Learning with Scikit-Learn and TensorFlow",
    author: "Aurélien Géron",
    dateRead: "Jan 2026"
  },
  {
    title: "Mathematics for Human Flourishing",
    author: "Francis Su",
    dateRead: "Dec 2025"
  },
  {
    title: "100M Money Models",
    author: "Alex Hormozi",
    dateRead: "Dec 2025"
  },
  {
    title: "The Promise of Bitcoin",
    author: "Bobby C. Lee",
    dateRead: "Dec 2025"
  },
  {
    title: "The Third Door",
    author: "Alex Banayan",
    dateRead: "Dec 2025"
  },
  {
    title: "AI Engineering",
    author: "Chip Huyen",
    dateRead: "Dec 2025"
  }
];

export default function BooksPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#faf9f7] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#f0eeea] via-[#faf9f7] to-[#faf9f7] pointer-events-none" />
        
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4a7c59]/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c45c3e]/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <main className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-6 pb-16">
          <div className="sticky top-6 z-20 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#6b6b6b] hover:text-[#c45c3e] transition-colors duration-300 group bg-[#faf9f7]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#e5e2db]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm tracking-wide">Back to home</span>
            </Link>
          </div>

          <div className="mb-10">
            <h1 
              className="text-5xl font-light text-[#1a1a1a] mb-4 not-italic" 
              style={{ fontFamily: "var(--font-sans)", fontStyle: "normal", fontWeight: 300 }}
            >
              Books
            </h1>
            <p 
              className="text-lg text-[#6b6b6b] leading-relaxed not-italic"
              style={{ fontFamily: "var(--font-sans)", fontStyle: "normal", fontWeight: 400 }}
            >
              Actively trying to read more, send me any recommendations!
            </p>
          </div>

          <ul className="space-y-3">
            {books.map((book, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-[#c45c3e] mt-1">•</span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h2 
                      className="text-lg font-medium text-[#1a1a1a] not-italic" 
                      style={{ fontFamily: "var(--font-sans)", fontStyle: "normal", fontWeight: 500 }}
                    >
                      {book.title}
                    </h2>
                    <span 
                      className="text-[#6b6b6b] text-sm not-italic"
                      style={{ fontFamily: "var(--font-sans)", fontStyle: "normal", fontWeight: 400 }}
                    >
                      {book.author}
                    </span>
                    <span 
                      className="text-[#9a9a9a] text-xs not-italic"
                      style={{ fontFamily: "var(--font-sans)", fontStyle: "normal", fontWeight: 400 }}
                    >
                      {book.dateRead}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </PageTransition>
  );
}