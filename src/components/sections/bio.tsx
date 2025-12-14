"use client";

import { motion } from "framer-motion";

const bioItems = [
  {
    text: "Previously vibecoding apps at",
    links: [
      { label: "VibeCode", href: "https://www.vibecodeapp.com/" }
    ],
    suffix: "and Research at",
    moreLinks: [
      { label: "UCD ECE", href: "https://ece.ucdavis.edu/" },
      { label: "UCD MCB", href: "https://www.mcb.ucdavis.edu/" }
    ]
  },
  {
    text: "Created content and grew my",
    links: [
      { label: "personal brand", href: "https://www.instagram.com/kev_xia/" }
    ],
    suffix: "from 0-70k in 2 months (retired for now)."
  },
  {
    text: "Also touching grass at",
    links: [
      { label: "CMS", href: "https://www.instagram.com/stagsmsoccer/?hl=en" }
    ],
    suffix: "."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export function Bio() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto px-6 py-4"
    >
      <div className="space-y-4">
        {bioItems.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative pl-4 border-l-2 border-[#e5e2db] hover:border-[#c45c3e]/50 transition-colors duration-300"
          >
            <p className="text-[17px] leading-relaxed text-[#6b6b6b]" style={{ fontFamily: "var(--font-sans)" }}>
              {item.text}{" "}
              {item.links.map((link, linkIndex) => (
                <span key={linkIndex}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a1a1a] font-medium link-underline hover:text-[#c45c3e] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                  {linkIndex < item.links.length - 1 && " "}
                </span>
              ))}
              {item.suffix && ` ${item.suffix}`}
              {item.moreLinks && (
                <>
                  {" "}
                  {item.moreLinks.map((link, linkIndex) => (
                    <span key={linkIndex}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1a1a1a] font-medium link-underline hover:text-[#c45c3e] transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                      {linkIndex < item.moreLinks!.length - 1 && " and "}
                    </span>
                  ))}
                  .
                </>
              )}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Bio;
