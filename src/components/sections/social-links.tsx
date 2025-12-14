"use client";

import { useState, useEffect } from "react";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

const socials = [
  {
    label: "Twitter",
    href: "https://x.com/bamboo_farmer",
    icon: Twitter,
    hoverColor: "hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30"
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kev_xia/",
    icon: Instagram,
    hoverColor: "hover:text-[#E4405F] hover:border-[#E4405F]/30"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kevin-xia22",
    icon: Linkedin,
    hoverColor: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30"
  },
  {
    label: "GitHub",
    href: "https://github.com/bamboo-fx",
    icon: Github,
    hoverColor: "hover:text-[#333] hover:border-[#333]/30"
  }
];

export function SocialLinks() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const titleDelay = 3200;
    const itemDelay = 3400;
    const stagger = 80;

    setTimeout(() => setShowTitle(true), titleDelay);

    socials.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, itemDelay + index * stagger);
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
        Connect
      </h2>
      <nav className="flex flex-wrap items-center justify-center gap-3">
        {socials.map((social, idx) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#e5e2db] bg-white text-[#6b6b6b] transition-all duration-300 ${social.hoverColor} hover:shadow-md hover:-translate-y-0.5 ${
                visibleItems.includes(idx) ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
            >
              <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                {social.label}
              </span>
            </a>
          );
        })}
      </nav>
    </section>
  );
}

export default SocialLinks;