"use client";

import Link from "next/link";
import { ArrowLeft, Code, BookOpen, ExternalLink } from "lucide-react";
import { PageTransition } from "@/components/page-transition";

interface Project {
  title: string;
  description: string;
  tags: string[];
  date: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "Math Puzzles",
    description: "Interactive collection of mathematical puzzles from 'Mathematics for Human Flourishing'. Features 7 games including Sudoku variants, geometry challenges, and logic puzzles with beautiful animations.",
    tags: ["Next.js", "React", "Framer Motion", "TypeScript"],
    date: "Dec 2025",
    link: "/tinkering/math-puzzles"
  }
];

export default function TinkeringPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#faf9f7] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#f0eeea] via-[#faf9f7] to-[#faf9f7] pointer-events-none" />
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4a7c59]/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c45c3e]/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16">
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
            Tinkering
          </h1>
          <p 
            className="text-lg text-[#6b6b6b] leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Protoptyping, vibecoding, exploring AI tools and building
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((project, idx) => {
            const commonProps = {
              className: `block bg-white/50 border border-[#e5e5e5] rounded-lg p-6 hover:border-[#c45c3e]/30 hover:shadow-lg transition-all duration-300 ease-out group ${project.link ? 'cursor-pointer' : ''}`,
              style: {
                animation: `fadeInUp 0.4s ease-out ${idx * 0.1}s both`
              }
            };
            
            return project.link ? (
              <Link
                key={idx}                {...commonProps}
                href={project.link}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {project.link ? (
                      <BookOpen className="w-5 h-5 text-[#c45c3e] group-hover:rotate-6 transition-transform duration-300" />
                    ) : (
                      <Code className="w-5 h-5 text-[#c45c3e] group-hover:rotate-6 transition-transform duration-300" />
                    )}
                    <h2 
                      className="text-xl font-medium text-[#1a1a1a]" 
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {project.title}
                    </h2>
                    {project.link && (
                      <ExternalLink className="w-4 h-4 text-[#9a9a9a] group-hover:text-[#c45c3e] transition-colors" />
                    )}
                  </div>
                  <span 
                    className="text-xs text-[#9a9a9a] tracking-wide"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {project.date}
                  </span>
                </div>
                
                <p 
                  className="text-[#6b6b6b] leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 bg-[#f0eeea] text-[#4a4a4a] text-xs rounded-full border border-[#e5e5e5]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ) : (
              <div key={idx} {...commonProps}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-[#c45c3e] group-hover:rotate-6 transition-transform duration-300" />
                    <h2 
                      className="text-xl font-medium text-[#1a1a1a]" 
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {project.title}
                    </h2>
                  </div>
                  <span 
                    className="text-xs text-[#9a9a9a] tracking-wide"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {project.date}
                  </span>
                </div>
                
                <p 
                  className="text-[#6b6b6b] leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 bg-[#f0eeea] text-[#4a4a4a] text-xs rounded-full border border-[#e5e5e5]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
          
          {/* Updating, more coming soon */}
          <div
            className="bg-white/50 border-2 border-dashed border-[#e5e5e5] rounded-lg p-6 text-center"
            style={{
              animation: `fadeInUp 0.4s ease-out ${projects.length * 0.1}s both`
            }}
          >
            <p 
              className="text-[#9a9a9a] text-sm"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Updating, more coming soon
            </p>
          </div>
        </div>
      </main>
    </div>
    </PageTransition>
  );
}
