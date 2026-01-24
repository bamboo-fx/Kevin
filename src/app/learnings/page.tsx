"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const studyCategories = [
  {
    title: "CS/Math and Bio",
    courses: [
      { code: "CSCI070", name: "Data Structures and Program Development" },
      { code: "CSCI105", name: "Computer Systems" },
      { code: "CSCI060", name: "Principles of Computer Science" },
      { code: "MATH055", name: "Discrete Mathematics" },
      { code: "MATH073", name: "Linear Algebra" },
      { code: "MATH019", name: "Multivariable Calculus" },
      { code: "MATH062", name: "Probability and Statistics" },
      { code: "MCBI118A", name: "Mathematical Biology" },
      { code: "MCBI118B", name: "Computational Biology" },
      { code: "BIOL046", name: "Biology" },
      { code: "BIOL101", name: "Comparative Physiology" }
    ]
  },
  {
    title: "Core Curriculum",
    courses: [
      { code: "ENGR079", name: "Engineering Systems" },
      { code: "PHYS024", name: "Physics Mechanics and Wave Motion" },
      { code: "PHYS023", name: "Special Relativity" },
      { code: "CHEM042", name: "Chemistry" },
      { code: "CORE099", name: "STEM & Social Impact" },
      { code: "WRIT001", name: "Academic Writing" }
    ]
  },
  {
    title: "Humanities, Social Sciences & Arts",
    courses: [
      { code: "PSYC052", name: "Psychology" },
      { code: "ECON050", name: "Principles of Economic Analysis" },
      { code: "ENTR179", name: "Enterprise and Entrepreneurship" },
      { code: "HSA 010", name: "Critical Inquiry" }
    ]
  }
];

const labs = [
  { code: "ENGR079P", name: "Engineering Practicum" },
  { code: "PHYS050", name: "Physics Laboratory" },
  { code: "BIOL023", name: "Biology Laboratory" },
  { code: "CHEM024", name: "Chemistry Laboratory" }
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

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-6 pb-12">
        <div className="sticky top-6 z-20 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#6b6b6b] hover:text-[#c45c3e] transition-colors duration-300 group bg-[#faf9f7]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#e5e2db]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm tracking-wide">Back to home</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <h2 
              className="text-2xl font-light text-[#1a1a1a] mb-4" 
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Studies
            </h2>
            <div className="space-y-4">
              {studyCategories.map((category, categoryIdx) => (
                <div key={categoryIdx}>
                  <h3 
                    className="text-base font-medium text-[#1a1a1a] mb-3"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {category.title}
                  </h3>
                  <div className="bg-white/50 border border-[#e5e2db] rounded-lg p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2.5">
                      {category.courses.map((course, idx) => (
                        <div
                          key={idx}
                          className="flex items-baseline gap-3 group"
                        >
                          <span 
                            className="text-xs font-mono text-[#6b6b6b] group-hover:text-[#c45c3e] transition-colors flex-shrink-0 w-22"
                            style={{ fontFamily: "monospace" }}
                          >
                            {course.code}
                          </span>
                          <span 
                            className="text-xs text-[#4a4a4a] group-hover:text-[#1a1a1a] transition-colors leading-relaxed"
                            style={{ fontFamily: "var(--font-sans)" }}
                          >
                            {course.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 
                className="text-2xl font-light text-[#1a1a1a] mb-4" 
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Labs
              </h2>
              <div className="bg-white/50 border border-[#e5e2db] rounded-lg p-5">
                <div className="space-y-2.5">
                  {labs.map((lab, idx) => (
                    <div
                      key={idx}
                      className="flex items-baseline gap-3 group"
                    >
                      <span 
                        className="text-xs font-mono text-[#6b6b6b] group-hover:text-[#4a7c59] transition-colors flex-shrink-0 w-22"
                        style={{ fontFamily: "monospace" }}
                      >
                        {lab.code}
                      </span>
                      <span 
                        className="text-xs text-[#4a4a4a] group-hover:text-[#1a1a1a] transition-colors leading-relaxed"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {lab.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 
                className="text-2xl font-light text-[#1a1a1a] mb-4" 
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Self Studies
              </h2>
              <div className="flex flex-wrap gap-3">
                {selfStudies.map((study, idx) => (
                  <a
                    key={idx}
                    href={study.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white border-2 border-[#e5e2db] rounded-full text-xs text-[#4a4a4a] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-all duration-300 cursor-pointer"
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
