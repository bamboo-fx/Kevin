"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, FlaskConical } from "lucide-react";

const studies = [
  "Data Structures",
  "Computability and Logic",
  "Probability and Statistics",
  "Engineering Systems",
  "Linear Algebra",
  "Multivariable Calculus",
  "Discrete Math",
  "Computational Biology",
  "Mathematical Biology",
  "Enterprise and Entrepreneurship",
  "Physics Mechanics and Wave Motion",
  "IP Law for Engineers",
  "Chemistry",
  "Biology",
  "Special Relativity Physics",
  "STEM & Social Impact",
  "Principles of Economic Analysis",
  "Psychology",
  "English with an Accent",
  "Academic Writing"
];

const labs = [
  "Engineering Systems",
  "Physics",
  "Biology",
  "Chemistry"
];

export default function HarveyMuddPage() {
  return (
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

        <div className="mb-16">
          <h1 
            className="text-5xl font-light text-[#1a1a1a] mb-2" 
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Harvey Mudd College
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-[#c45c3e]" />
              <h2 
                className="text-3xl font-light text-[#1a1a1a]" 
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Studies
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {studies.map((study, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-white border-2 border-[#e5e2db] rounded-full text-sm text-[#4a4a4a] hover:border-[#c45c3e] hover:text-[#c45c3e] transition-all duration-300 cursor-default"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {study}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <FlaskConical className="w-6 h-6 text-[#4a7c59]" />
              <h2 
                className="text-3xl font-light text-[#1a1a1a]" 
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Labs
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {labs.map((lab, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-white border-2 border-[#e5e2db] rounded-full text-sm text-[#4a4a4a] hover:border-[#4a7c59] hover:text-[#4a7c59] transition-all duration-300 cursor-default"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {lab}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
