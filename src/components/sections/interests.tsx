"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Lightbulb } from "lucide-react";

const interests = [
  {
    label: "Thoughts",
    href: "/blog",
    description: "Ideas, reflections & learnings",
    icon: Lightbulb,
    gradient: "from-[#c45c3e]/10 to-[#d4a03a]/10"
  },
  {
    label: "Books",
    href: "/books",
    description: "What I'm reading",
    icon: BookOpen,
    gradient: "from-[#4a7c59]/10 to-[#3d5a80]/10"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.6
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export function Interests() {
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
        transition={{ delay: 0.5 }}
        className="text-sm uppercase tracking-[0.2em] text-[#9a9a9a] mb-6 font-medium"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Explore
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {interests.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.label} variants={itemVariants}>
              <Link
                href={item.href}
                className="group block p-5 rounded-xl bg-white border border-[#e5e2db] hover:border-[#c45c3e]/30 transition-all duration-300 card-hover relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#f0eeea] group-hover:bg-white/80 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#6b6b6b] group-hover:text-[#c45c3e] transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#1a1a1a] group-hover:text-[#c45c3e] transition-colors duration-300" style={{ fontFamily: "var(--font-serif)" }}>
                        {item.label}
                      </h3>
                      <p className="text-sm text-[#9a9a9a]" style={{ fontFamily: "var(--font-sans)" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#9a9a9a] group-hover:text-[#c45c3e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

export default Interests;
