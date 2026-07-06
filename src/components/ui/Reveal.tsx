"use client";

import React, { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "in-place";
  duration?: "fast" | "normal" | "slow";
}

export function Reveal({ children, className, delay = 0, direction = "up", duration = "normal" }: RevealProps) {
  const ref = useReveal({ threshold: 0.1, rootMargin: "0px 0px -8% 0px" });

  const directionClass = {
    "up": "translate-y-8",
    "left": "-translate-x-8",
    "right": "translate-x-8",
    "in-place": "scale-95",
  }[direction];

  const durationClass = {
    "fast": "duration-300",
    "normal": "duration-500",
    "slow": "duration-700",
  }[duration];

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 transition-all ease-premium",
        directionClass,
        durationClass,
        "fill-mode-forwards",
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      <style jsx>{`
        .revealed {
          opacity: 1 !important;
          transform: translate(0, 0) scale(1) !important;
        }
      `}</style>
      {children}
    </div>
  );
}
