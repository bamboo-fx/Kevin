"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTransition } from "@/contexts/transition-context";

const interests = [
  {
    label: "Tinkering",
    href: "/tinkering",
    description: "Projects & experiments",
    gradient: "from-[#8b5cf6]/10 to-[#6366f1]/10"
  },
  {
    label: "Books",
    href: "/books",
    description: "What I'm reading",
    gradient: "from-[#4a7c59]/10 to-[#3d5a80]/10"
  }
];

export function Interests() {
  const { isInitialLoad } = useTransition();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    if (!isInitialLoad) {
      // Show all items immediately if not initial load
      setShowTitle(true);
      setVisibleItems(interests.map((_, index) => index));
      return;
    }

    const titleDelay = 2500;
    const cardDelay = 2700;
    const stagger = 120;

    setTimeout(() => setShowTitle(true), titleDelay);

    interests.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, cardDelay + index * stagger);
    });
  }, [isInitialLoad]);

  return (
    <section className="w-full max-w-2xl mx-auto px-6 py-8">
      <h2
        className={`text-sm uppercase tracking-[0.2em] text-[#9a9a9a] mb-6 font-medium text-center transition-all duration-300 ease-out ${
          showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Explore
      </h2>
      <div className="flex gap-4 items-stretch">
        {interests.map((item, idx) => {
          return (
            <div
              key={item.label}
              className={`flex-1 flex transition-all duration-300 ease-out ${
                visibleItems.includes(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link
                href={item.href}
                className="group flex flex-col w-full p-5 bg-white border border-[#e5e2db] hover:border-[#c45c3e]/40 hover:shadow-sm transition-all duration-200 ease-out"
              >
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-[#1a1a1a] group-hover:text-[#c45c3e] transition-colors duration-200" style={{ fontFamily: "var(--font-sans)" }}>
                    {item.label}
                  </h3>
                </div>
                <p className="text-xs text-[#9a9a9a] leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
                  {item.description}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Interests;