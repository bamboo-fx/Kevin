"use client";

import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.7
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export function SocialLinks() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto px-6 py-8"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="text-sm uppercase tracking-[0.2em] text-[#9a9a9a] mb-6 font-medium text-center"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Connect
      </motion.h2>
      <nav className="flex flex-wrap items-center justify-center gap-3">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.label}
              variants={itemVariants}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#e5e2db] bg-white text-[#6b6b6b] transition-all duration-300 ${social.hoverColor} hover:shadow-md`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                {social.label}
              </span>
            </motion.a>
          );
        })}
      </nav>
    </motion.section>
  );
}

export default SocialLinks;
