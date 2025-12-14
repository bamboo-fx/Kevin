"use client";

import { useState, useEffect } from "react";

export function useTypewriter(text: string, speed: number = 30, delay: number = 0, skip: boolean = false) {
  const [displayedText, setDisplayedText] = useState(skip ? text : "");
  const [isComplete, setIsComplete] = useState(skip);

  useEffect(() => {
    if (skip) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const startTimeout = setTimeout(() => {
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeNextChar, speed);
        } else {
          setIsComplete(true);
        }
      };

      typeNextChar();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, skip]);

  return { displayedText, isComplete };
}
