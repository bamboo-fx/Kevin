"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const studyCategories = [
  {
    title: "CS/Math",
    courses: [
      "Data Structures and Program Development",
      "Computer Systems",
      "Discrete Mathematics",
      "Linear Algebra",
      "Multivariable Calculus",
      "Principles of Computer Science",
      "Probability and Statistics",
      "Mathematical Biology",
      "Computational Biology"
    ]
  },
  {
    title: "Core Curriculum",
    courses: [
      "Engineering Systems",
      "Physics Mechanics and Wave Motion",
      "Special Relativity",
      "Chemistry",
      "Biology",
      "STEM & Social Impact",
      "Academic Writing"
    ]
  },
  {
    title: "Humanities, Social Sciences & Arts",
    courses: [
      "Psychology",
      "Principles of Economic Analysis",
      "Enterprise and Entrepreneurship",
      "Critical Inquiry"
    ]
  }
];

const labs = [
  "Engineering Systems",
  "Physics",
  "Biology",
  "Chemistry"
];

const selfStudies = [
  {
    title: "Stanford CS146S",
    url: "https://themodernsoftware.dev/"
  },
  {
    title: "MIT 15.482x",
    url: "https://openlearninglibrary.mit.edu/courses/course-v1:MITx+15.482x+1T2019/about"
  },
  {
    title: "MIT 6.S191",
    url: "https://introtodeeplearning.com/"
  }
];

export default function HarveyMuddPage() {
  return (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <h2 
                className="text-3xl font-light text-[#1a1a1a]" 
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Studies
              </h2>
            </div>
            <div className="space-y-6">
              {studyCategories.map((category, categoryIdx) => (
                <div key={categoryIdx}>
                  <h3 
                    className="text-lg font-medium text-[#1a1a1a] mb-3"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.courses.map((course, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2 bg-white border-2 border-[#e5e2db] rounded-full text-sm text-[#4a4a4a] hover:border-[#c45c3e] hover:text-[#c45c3e] transition-all duration-300 cursor-default"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="mb-4">
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

            <div>
              <div className="mb-4">
                <h2 
                  className="text-3xl font-light text-[#1a1a1a]" 
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Self Studies
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {selfStudies.map((study, idx) => (
                  <a
                    key={idx}
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white border-2 border-[#e5e2db] rounded-full text-sm text-[#4a4a4a] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-all duration-300 cursor-pointer"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {study.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
