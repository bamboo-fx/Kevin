"use client";

import { useState, useEffect } from "react";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { useTransition } from "@/contexts/transition-context";

const socials = [
  {
    label: "Twitter",
    href: "https://x.com/bamboo_farmer",
    icon: Twitter,
    hoverColor: "#1DA1F2"
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
  }
];

export function SocialLinks() {
  const { isInitialLoad } = useTransition();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    if (!isInitialLoad) {
      // Show all items immediately if not initial load
      setShowTitle(true);
      setVisibleItems(socials.map((_, index) => index));
      return;
    }

    const titleDelay = 3200;
    const itemDelay = 3400;
    const stagger = 80;

    setTimeout(() => setShowTitle(true), titleDelay);

    socials.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, itemDelay + index * stagger);
    });
  }, [isInitialLoad]);

  return (
    <section className="w-full px-6 pb-2">
      <h2
        className={`text-xs uppercase tracking-[0.2em] text-[#9a9a9a] mb-3 font-medium text-center transition-all duration-300 ${
          showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Connect
      </h2>
      <nav className="flex items-center justify-center gap-4">
        {socials.map((social, idx) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center gap-1.5 transition-all duration-200 ease-out ${
                visibleItems.includes(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <div 
                className="p-2 border bg-white transition-all duration-200"
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
                <Icon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-105" />
              </div>
              <span 
                className="text-[10px] font-medium tracking-wide transition-colors duration-200" 
                style={{ 
                  fontFamily: "var(--font-sans)",
                  color: '#6b6b6b'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = social.hoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#6b6b6b';
                }}
              >
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