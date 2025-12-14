"use client";

import Image from "next/image";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useTransition } from "@/contexts/transition-context";
import { useState, useEffect } from "react";
import { Instagram, Linkedin, Github, Mail } from "lucide-react";

// Custom X.com icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Lightbulb, Code } from "lucide-react";

const socials = [
  {
    label: "X",
    href: "https://x.com/bamboo_farmer",
    icon: XIcon,
    hoverColor: "#000000"
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kev_xia/",
    icon: Instagram,
    hoverColor: "#E4405F"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kevin-xia22",
    icon: Linkedin,
    hoverColor: "#0A66C2"
  },
  {
    label: "GitHub",
    href: "https://github.com/bamboo-fx",
    icon: Github,
    hoverColor: "#333"
  },
  {
    label: "Email",
    href: "mailto:kevinxia2024@gmail.com",
    icon: Mail,
    hoverColor: "#c45c3e"
  }
];

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

export function Header() {
  const { isInitialLoad } = useTransition();
  const pathname = usePathname();
  const { displayedText, isComplete } = useTypewriter("Kevin Xia", 100, 0, !isInitialLoad);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [tabsVisible, setTabsVisible] = useState(false);

  useEffect(() => {
    if (!isInitialLoad) {
      setVisibleItems(socials.map((_, index) => index));
      setTabsVisible(true);
      return;
    }

    const delay = 2000;
    const stagger = 80;
    const tabsDelay = 1800;

    setTimeout(() => setTabsVisible(true), tabsDelay);

    socials.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, delay + index * stagger);
    });
  }, [isInitialLoad]);

  return (
    <header className="w-full max-w-2xl mx-auto flex flex-col items-center pt-12 pb-8">
      <div className="relative mb-6 group">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#c45c3e]/20 via-transparent to-[#4a7c59]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div className="absolute inset-0 rounded-full animate-pulse-ring bg-[#c45c3e]/10" style={{ animationDuration: '3s' }} />
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df71bbd5-005b-41eb-b943-ebe2131d758c-kevinxia-xyz/assets/images/profile-CdwEI0Qm-1.png"
            alt="Kevin Xia"
            width={140}
            height={140}
            className="rounded-full border-2 border-[#e5e2db] shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
            priority
            style={{ width: "140px", height: "140px", objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-3 min-h-[3.5rem]" style={{ fontFamily: "var(--font-serif)" }}>
          {displayedText}
          {!isComplete && <span className="animate-pulse">|</span>}
        </h1>
        <div
          className="h-[2px] bg-gradient-to-r from-transparent via-[#c45c3e] to-transparent mx-auto transition-all duration-500 ease-out mb-4"
          style={{ width: isComplete ? "3rem" : "0" }}
        />
      </div>
      
      {/* Section Tabs and Social Links - Same line */}
      <div className="w-full max-w-2xl mx-auto px-6 flex items-center justify-between mt-4">
        {/* Section Tabs - Left, aligned with intro text */}
        <nav className="flex items-center gap-2">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            const isActive = pathname === section.href;
            
            return (
              <Link
                key={section.label}
                href={section.href}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-out border border-[#e5e2db] bg-white ${
                  tabsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                } ${
                  isActive
                    ? 'bg-[#c45c3e]/10 text-[#c45c3e] border-[#c45c3e]/30'
                    : 'text-[#6b6b6b] hover:text-[#1a1a1a] hover:bg-white hover:border-[#c45c3e]/20'
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

        {/* Social Links - Right */}
        <nav className="flex items-center gap-3">
          {socials.map((social, idx) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group transition-all duration-200 ease-out ${
                  visibleItems.includes(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
                aria-label={social.label}
              >
                <div 
                  className="p-2 border bg-white transition-all duration-200 rounded"
                  style={{
                    borderColor: '#e5e2db',
                    color: '#6b6b6b'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = social.hoverColor;
                    e.currentTarget.style.color = social.hoverColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e2db';
                    e.currentTarget.style.color = '#6b6b6b';
                  }}
                >
                  <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                </div>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Header;