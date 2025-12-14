"use client";

import { useEffect } from "react";
import { useTransition } from "@/contexts/transition-context";

export function BodyTransition() {
  const { hasLoaded } = useTransition();

  useEffect(() => {
    if (hasLoaded) {
      document.body.classList.add("has-loaded");
    } else {
      document.body.classList.remove("has-loaded");
    }
  }, [hasLoaded]);

  return null;
}

