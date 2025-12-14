"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, BookOpen, Lightbulb, Code } from "lucide-react";

const interests = [
  {
    label: "Thoughts",
    href: "/thoughts",
    description: "Ideas, reflections & learnings",
    icon: Lightbulb,
    gradient: "from-[#c45c3e]/10 to-[#d4a03a]/10"
  },
  {
    label: "Books",
    href: "/books",
    description: "What I'm reading",
    icon: BookOpen,
    gradient: "from-[#4a7c59]/10 to-[#3d5a80]/10"
  },
  {
    label: "Vibecoding",
    href: "/vibecoding",
    description: "Projects & experiments",
    icon: Code,
    gradient: "from-[#8b5cf6]/10 to-[#6366f1]/10"
  }
];

export function Interests() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const titleDelay = 2500;
    const cardDelay = 2700;
    const stagger = 120;

    setTimeout(() => setShowTitle(true), titleDelay);

    interests.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, cardDelay + index * stagger);
    });
  }, []);

  return (
    <section className="w-full max-w-2xl mx-auto px-6 py-8">
      <h2
        className={`text-sm uppercase tracking-[0.2em] text-[#9a9a9a] mb-6 font-medium text-center transition-all duration-300 ${
          showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Explore
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {interests.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`transition-all duration-300 ${
                visibleItems.includes(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link
                href={item.href}
                className="group block p-4 rounded-xl bg-white border border-[#e5e2db] hover:border-[#c45c3e]/30 transition-all duration-300 card-hover relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative flex flex-col items-center text-center gap-2">
                  <div className="p-2 rounded-lg bg-[#f0eeea] group-hover:bg-white/80 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#6b6b6b] group-hover:text-[#c45c3e] transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-base text-[#1a1a1a] group-hover:text-[#c45c3e] transition-colors duration-300" style={{ fontFamily: "var(--font-serif)" }}>
                      {item.label}
                    </h3>
                    <p className="text-xs text-[#9a9a9a] mt-1" style={{ fontFamily: "var(--font-sans)" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Interests;