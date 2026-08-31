"use client";

import Image from "next/image";
import { Linkedin, Github } from "lucide-react";

const socials = [
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

export function Header() {
  return (
    <header className="w-full max-w-2xl mx-auto flex flex-col items-center pt-12 pb-8">
      <div className="relative mb-6 group">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#c45c3e]/20 via-transparent to-[#4a7c59]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
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
        <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          Kevin Xia
        </h1>
        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-[#c45c3e] to-transparent mx-auto mb-4" />
      </div>
      
      {/* Social Links */}
      <div className="w-full max-w-2xl mx-auto px-6 flex items-center justify-center mt-4">
        <nav className="flex items-center gap-2">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
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
