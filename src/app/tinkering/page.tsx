"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Youtube } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  date: string;
  link?: string;
  external?: boolean;
  linkName?: string;
  githubLink?: string;
  youtubeLink?: string;
}

const projects: Project[] = [
  {
    title: "Loopyter",
    description: "Better Jupyter Notebook with Pyodide and PyAssembly runtime in the web. AI agents for data visualization and feature modeling, automatic machine learning model recommendations. Built at YC Better Hacks Hackathon",
    tags: ["React", "TypeScript", "Pyodide", "AI", "Machine Learning"],
    date: "Feb 2026",
    link: "https://qdgeunmohdit.dev.vibecode.run/",
    external: true,
    githubLink: "https://github.com/bamboo-fx/loopyter",
    youtubeLink: "https://www.youtube.com/watch?v=ZcCpBsnSVRc"
  },
  {
    title: "CoachBooks",
    description: "D3 Athletics Expense Tracker - A comprehensive platform for managing athletic expenses and budgets for Division III athletics programs.",
    tags: ["Next.js", "React", "TypeScript"],
    date: "Feb 2026",
    link: "https://playbook.vibecode.run/landing",
    external: true,
    linkName: "coachbooks.us"
  },
  {
    title: "MatchMyTrial",
    description: "Smart matching for relevant clinical trials - An intelligent platform that connects patients with relevant clinical trial opportunities. Built at YC Hack the Stackathon",
    tags: ["Next.js", "React", "TypeScript"],
    date: "Jan 2026",
    link: "https://matchtrial.vibecode.run/",
    external: true,
    linkName: "matchmytrial.xyz",
    githubLink: "https://github.com/bamboo-fx/fam"
  },
  {
    title: "Mobile Apps",
    description: "A collection of mobile applications built with React Native and Expo, including tools for reading academic papers, tracking motivation, interview prep, book finding, meme generation, and language learning.",
    tags: ["Expo SDK 53", "React Native", "TypeScript", "Nativewind", "Zustand", "React Navigation", "OpenAI", "Anthropic", "Grok"],
    date: "Jan 2026",
    link: "/tinkering/mobile-apps"
  },
  {
    title: "Math Puzzles",
    description: "Interactive collection of mathematical puzzles from 'Mathematics for Human Flourishing'. Features 7 games including Sudoku variants, geometry challenges, and logic puzzles with beautiful animations.",
    tags: ["Next.js", "React", "Framer Motion", "TypeScript"],
    date: "Dec 2025",
    link: "/tinkering/math-puzzles"
  }
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const hasMainLink = project.link && !project.githubLink && !project.youtubeLink;
  
  const cardContent = (
    <motion.div
      className={`relative group flex-shrink-0 w-[360px] h-[380px] bg-white border border-[#e5e2db] rounded-lg overflow-hidden transition-all duration-300 ${
        hasMainLink ? 'cursor-pointer hover:border-[#c45c3e]/30' : ''
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1
      }}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Header with category and year */}
        <div className="flex items-start justify-between mb-4">
          <span 
            className="text-xs uppercase tracking-wider text-[#9a9a9a]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            TINKERING
          </span>
          <span 
            className="text-xs text-[#9a9a9a] tracking-wide"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {project.date}
          </span>
        </div>

        {/* Title */}
        <h2 
          className="text-xl font-medium text-[#1a1a1a] mb-3 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {project.title}
        </h2>

        {/* Description */}
        <p 
          className="text-sm text-[#6b6b6b] leading-relaxed flex-1 line-clamp-4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {project.description}
        </p>

        {/* Footer with links */}
        {(project.link || project.githubLink || project.youtubeLink) && (
          <div className="mt-auto pt-3 border-t border-[#e5e2db]">
            <div className="flex items-center gap-4">
              {/* Main link */}
              {project.link && (
                <a
                  href={project.link}
                  target={project.external ? "_blank" : undefined}
                  rel={project.external ? "noopener noreferrer" : undefined}
                  onClick={(e) => !project.external && e.stopPropagation()}
                  className="inline-flex items-center gap-2 text-[#9a9a9a] hover:text-[#c45c3e] transition-colors"
                >
                  <span 
                    className="text-xs uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {project.external ? 'Visit' : 'Explore'}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              
              {/* GitHub and YouTube links */}
              {(project.githubLink || project.youtubeLink) && (
                <div className="flex items-center gap-3 ml-auto">
                  {/* GitHub link */}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#f0eeea] hover:bg-[#c45c3e]/10 text-[#6b6b6b] hover:text-[#c45c3e] transition-all duration-200 group"
                      title="View on GitHub"
                    >
                      <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span 
                        className="text-xs font-medium"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        GitHub
                      </span>
                    </a>
                  )}
                  
                  {/* YouTube link */}
                  {project.youtubeLink && (
                    <a
                      href={project.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#f0eeea] hover:bg-[#c45c3e]/10 text-[#6b6b6b] hover:text-[#c45c3e] transition-all duration-200 group"
                      title="Watch on YouTube"
                    >
                      <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span 
                        className="text-xs font-medium"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        Demo
                      </span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  // If there's a main link (non-GitHub/YouTube), wrap the card
  if (project.link && !project.githubLink && !project.youtubeLink) {
    if (project.external) {
      return (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {cardContent}
        </a>
      );
    } else {
      return (
        <Link href={project.link} className="block">
          {cardContent}
        </Link>
      );
    }
  }

  // If only GitHub/YouTube links, don't wrap the whole card
  return cardContent;
}

function ScrollIndicator({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const checkScroll = () => {
      setCanScroll(element.scrollWidth > element.clientWidth);
    };

    const handleScroll = () => {
      const scrollLeft = element.scrollLeft;
      const scrollWidth = element.scrollWidth - element.clientWidth;
      setScrollProgress(scrollWidth > 0 ? scrollLeft / scrollWidth : 0);
    };

    checkScroll();
    element.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [scrollRef]);

  if (!canScroll) return null;

  const indicatorWidth = 60;
  const maxPosition = 100 - indicatorWidth;

  return (
    <div className="mt-6 relative">
      <div className="flex items-center justify-between mb-2">
        <span 
          className="text-xs uppercase tracking-wider text-[#9a9a9a]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Scroll to explore
        </span>
        <span 
          className="text-xs text-[#9a9a9a]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {projects.length} {projects.length === 1 ? 'PROJECT' : 'PROJECTS'}
        </span>
      </div>
      <div className="relative h-[2px] bg-[#e5e2db]">
        <motion.div
          className="absolute top-0 h-[2px] bg-[#c45c3e]"
          style={{
            width: `${indicatorWidth}%`,
            left: `${scrollProgress * maxPosition}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}

export default function TinkeringPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <PageTransition>
      <div className="h-screen bg-[#faf9f7] relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#f0eeea] via-[#faf9f7] to-[#faf9f7] pointer-events-none" />
        
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4a7c59]/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c45c3e]/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-4 pb-8">
          {/* Back button */}
          <motion.div 
            className="sticky top-4 z-20 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#6b6b6b] hover:text-[#c45c3e] transition-colors duration-300 group bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-[#e5e2db] shadow-sm hover:shadow-md"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm tracking-wide">Back to home</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 
              className="text-4xl md:text-5xl font-light text-[#1a1a1a] mb-2 leading-tight uppercase tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Tinkering
            </h1>
            <p 
              className="text-base text-[#6b6b6b] leading-relaxed italic"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Prototyping, vibecoding, exploring AI tools and building
            </p>
          </motion.div>

          {/* Horizontal scrolling projects */}
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {projects.map((project, idx) => (
                <ProjectCard key={idx} project={project} index={idx} />
              ))}
            </div>
            
            {/* Scroll indicator */}
            <ScrollIndicator scrollRef={scrollRef} />
          </div>
        </main>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </PageTransition>
  );
}