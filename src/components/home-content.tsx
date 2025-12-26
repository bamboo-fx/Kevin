"use client";

import { useEffect, useState } from "react";
import { useTransition } from "@/contexts/transition-context";

interface HomeContentProps {
  children: React.ReactNode;
}

export function HomeContent({ children }: HomeContentProps) {
  const { isInitialLoad } = useTransition();
  const [visible, setVisible] = useState(!isInitialLoad);

  useEffect(() => {
    if (!isInitialLoad) {
      setVisible(true);
      return;
    }

    // Single unified fade-in after a brief delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isInitialLoad]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}








