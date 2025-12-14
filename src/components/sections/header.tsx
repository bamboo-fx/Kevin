"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="w-full max-w-2xl mx-auto flex flex-col items-center pt-20 pb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative mb-8 group"
      >
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#c45c3e]/20 via-transparent to-[#4a7c59]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div className="absolute inset-0 rounded-full animate-pulse-ring bg-[#c45c3e]/10" style={{ animationDuration: '3s' }} />
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/df71bbd5-005b-41eb-b943-ebe2131d758c-kevinxia-xyz/assets/images/profile-CdwEI0Qm-1.png"
            alt="Kevin Xia"
            width={160}
            height={160}
            className="rounded-full border-2 border-[#e5e2db] shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
            priority
            style={{ width: "160px", height: "160px", objectFit: "cover" }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-normal tracking-tight mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          Kevin Xia
        </h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "3rem" }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="h-[2px] bg-gradient-to-r from-transparent via-[#c45c3e] to-transparent mx-auto"
        />
      </motion.div>
    </header>
  );
}

export default Header;
