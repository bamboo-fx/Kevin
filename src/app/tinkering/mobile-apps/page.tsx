"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { PageTransition } from "@/components/page-transition";

interface VideoProject {
  title: string;
  description: string;
  videoId: string;
}

const videoProjects: VideoProject[] = [
  {
    title: "Academic Papers Reader",
    description: "An app for reading academic papers and staying up to date with latest trends in AI.",
    videoId: "5XGdLkGpn_Q"
  },
  {
    title: "Hater Rolodex",
    description: "Track when others hate, light hearted external motivation.",
    videoId: "XB1WCpxTK2U"
  },
  {
    title: "Technical Interview Prep for Investment Banking",
    description: "Prepare for technical interviews in investment banking with this comprehensive practice tool.",
    videoId: "74FYRm0LM4k"
  },
  {
    title: "Book Finder App",
    description: "Discover and find books with this interactive book finder application.",
    videoId: "Md2dNXarJxU"
  },
  {
    title: "Twitter Meme Generator",
    description: "Search trending tweets and create your own memes with this interactive Twitter meme generator tool.",
    videoId: "LaCKhbajQMQ"
  },
  {
    title: "Daily Mandarin Practice",
    description: "A daily practice tool for learning Mandarin Chinese through interactive exercises and visual learning.",
    videoId: "foXPTrGrS48"
  }
];

export default function MobileAppsPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#faf9f7] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#f0eeea] via-[#faf9f7] to-[#faf9f7] pointer-events-none" />
        
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4a7c59]/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c45c3e]/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
          <div className="mb-8">
            <Link
              href="/tinkering"
              className="inline-flex items-center gap-2 text-[#6b6b6b] hover:text-[#c45c3e] transition-colors duration-300 group"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm tracking-wide">Back to tinkering</span>
            </Link>
          </div>

          <div className="mb-12">
            <h1 
              className="text-5xl font-light text-[#1a1a1a] mb-4" 
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Mobile Apps
            </h1>
            <p 
              className="text-lg text-[#6b6b6b] leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              A collection of mobile applications built with React Native and Expo on{" "}
              <a 
                href="https://vibecode.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#1a1a1a] hover:text-[#c45c3e] transition-colors font-medium"
              >
                @vibecodeapp
              </a>
            </p>
            <div className="flex flex-wrap gap-2">
              {["Expo SDK 53", "React Native 0.76.7", "TypeScript", "Nativewind", "Zustand", "React Navigation", "React Native Reanimated", "OpenAI", "Anthropic", "Grok", "Bun"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#f0eeea] text-[#4a4a4a] text-xs rounded-full border border-[#e5e5e5]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoProjects.map((project) => (
              <div
                key={project.videoId}
                onClick={() => handleVideoClick(project.videoId)}
                className="bg-white/50 border border-[#e5e5e5] rounded-lg p-6 hover:border-[#c45c3e]/30 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <h3 
                  className="text-lg font-medium text-[#1a1a1a] mb-2" 
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {project.title}
                </h3>
                <p 
                  className="text-sm text-[#6b6b6b] leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </main>

        {/* Video Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleCloseVideo}
          >
            <div 
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseVideo}
                className="absolute -top-12 right-0 text-white hover:text-[#c45c3e] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="aspect-[9/16] w-full bg-black rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}`}
                  title={videoProjects.find(p => p.videoId === selectedVideo)?.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

