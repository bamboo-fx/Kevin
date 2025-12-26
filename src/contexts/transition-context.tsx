"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface TransitionContextType {
  isInitialLoad: boolean;
  hasLoaded: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  isInitialLoad: true,
  hasLoaded: false,
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if this is the first load
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    if (!hasVisited) {
      // First time visiting
      setIsInitialLoad(true);
      sessionStorage.setItem("hasVisited", "true");
      
      // Mark as loaded after initial animations complete
      const timer = setTimeout(() => {
        setHasLoaded(true);
      }, 5000); // After all initial animations
      
      return () => clearTimeout(timer);
    } else {
      // Already visited, this is a navigation
      setIsInitialLoad(false);
      setHasLoaded(true);
    }
  }, []);

  // Reset initial load flag when navigating away from home
  useEffect(() => {
    if (pathname !== "/") {
      setIsInitialLoad(false);
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ isInitialLoad, hasLoaded }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}







