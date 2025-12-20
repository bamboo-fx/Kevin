"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { BookOpen, Lightbulb, Code } from "lucide-react";
import { useTransition } from "@/contexts/transition-context";

const sections = [
  {
    label: "Thoughts",
    href: "/thoughts",
    icon: Lightbulb,
  },
  {
    label: "Books",
    href: "/books",
    icon: BookOpen,
  },
  {
    label: "Tinkering",
    href: "/tinkering",
    icon: Code,
  }
];

export function SectionTabs() {
  const { isInitialLoad } = useTransition();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isInitialLoad) {
      setVisible(true);
      return;
    }

    const delay = 1800;
    setTimeout(() => setVisible(true), delay);
  }, [isInitialLoad]);

  return (
    <nav className="flex items-center justify-center gap-1 mb-4">
      {sections.map((section, idx) => {
        const Icon = section.icon;
        const isActive = pathname === section.href;
        
        return (
          <Link
            key={section.label}
            href={section.href}
            className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            } ${
              isActive
                ? 'bg-[#c45c3e]/10 text-[#c45c3e] border border-[#c45c3e]/20'
                : 'text-[#6b6b6b] hover:text-[#1a1a1a] hover:bg-white/50 border border-transparent hover:border-[#e5e2db]'
            }`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Icon className={`w-3.5 h-3.5 transition-colors duration-200 ${
              isActive ? 'text-[#c45c3e]' : 'text-[#6b6b6b] group-hover:text-[#1a1a1a]'
            }`} />
            <span>{section.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}





