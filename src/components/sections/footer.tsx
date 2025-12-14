"use client";

import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="w-full max-w-2xl mx-auto px-6 py-12 mt-8"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#e5e2db] to-transparent" />
        <p className="text-sm text-[#9a9a9a] tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
          © {currentYear} Kevin Xia
        </p>
        <motion.div
          className="flex items-center gap-1.5 text-xs text-[#bbb]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Made with</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            className="text-[#c45c3e]"
          >
            ♥
          </motion.span>
          <span>in California</span>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
