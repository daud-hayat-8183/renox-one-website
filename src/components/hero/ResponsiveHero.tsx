"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import StaticHero from "./StaticHero";

// Lazy load the heavy Desktop video component
const DesktopVideoHero = dynamic(() => import("./DesktopVideoHero"), {
  ssr: false,
});

export function ResponsiveHero() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the device is a true desktop (wide enough, has hover, and fine pointer)
    const mediaQuery = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    
    // Set initial state
    setIsDesktop(mediaQuery.matches);

    // Update state if window resizes (e.g. rotating a large tablet or devtools)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    
    // Fallback for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  // While checking device capabilities on mount, we can show nothing or the static hero as a fallback to prevent hydration mismatch
  if (isDesktop === null) {
    return <div className="w-full min-h-[100svh] bg-renox-black" />; // Blank placeholder until client hydration determines device type
  }

  return isDesktop ? <DesktopVideoHero /> : <StaticHero />;
}
