"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { PageTransition } from "@/components/page-transition";

const thoughts = [
  {
    title: "On Building in Public",
    date: "Dec 2024",
    content: "There's something magical about sharing your journey as you build. The feedback loop, the accountability, the connections you make - it all compounds. Sure, it's scary to show unfinished work, but that's where the real growth happens. Every feature you ship, every bug you fix, every lesson you learn becomes part of a larger story that others can learn from."
  },
  {
    title: "The Joy of Breaking Things",
    date: "Nov 2024",
    content: "My best learning moments came from breaking things spectacularly. Crashed production? Learned about proper deployment strategies. Infinite loop that hung the browser? Understood recursion deeply. Lost data? Now I'm obsessed with backups. Each failure is a masterclass disguised as a disaster. Embrace the breaks."
  },
  {
    title: "Why Small Projects Matter",
    date: "Oct 2024",
    content: "Not everything needs to be a unicorn startup. Sometimes the best projects are the tiny tools that solve your own annoying problems. That script that saves you 10 minutes a day. That Chrome extension for your workflow. These 'toy' projects teach you more than any tutorial because you're solving real problems for real users (yourself)."
  },
  {
    title: "The Myth of Perfect Code",
    date: "Sep 2024",
    content: "I used to obsess over writing perfect code. Every variable name agonized over, every function meticulously crafted. Then I realized: shipped code beats perfect code every time. You learn more from one messy project in production than ten perfect projects in your local environment. Perfectionism is just fear wearing a fancy hat."
  },
  {
    title: "On Learning New Tech",
    date: "Aug 2024",
    content: "The tech landscape moves fast, and that's okay. You don't need to learn every new framework that drops. Instead, focus on fundamentals: how does the web work? What makes good software? Master one stack deeply, then branch out when you hit real limitations. Depth beats breadth, especially early on."
  }
];

export default function ThoughtsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#faf9f7] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#f0eeea] via-[#faf9f7] to-[#faf9f7] pointer-events-none" />
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4a7c59]/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c45c3e]/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 py-16">
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
            Thoughts
          </h1>
          <p 
            className="text-lg text-[#6b6b6b] leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Random musings on code, life, and everything in between
          </p>
        </div>

        <div className="space-y-8">
          {thoughts.map((thought, idx) => (
            <article
              key={idx}
              className="bg-white/50 border border-[#e5e5e5] rounded-lg p-8 hover:border-[#4a7c59]/30 hover:shadow-lg transition-all duration-300 ease-out group"
              style={{
                animation: `fadeInUp 0.4s ease-out ${idx * 0.1}s both`
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-5 h-5 text-[#4a7c59] group-hover:scale-110 transition-transform duration-300" />
                <h2 
                  className="text-2xl font-light text-[#1a1a1a]" 
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {thought.title}
                </h2>
              </div>
              
              <span 
                className="text-xs text-[#9a9a9a] tracking-wide mb-4 block"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {thought.date}
              </span>

              <p 
                className="text-[#4a4a4a] leading-relaxed text-base"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {thought.content}
              </p>
            </article>
          ))}
        </div>
      </main>
    </div>
    </PageTransition>
  );
}
