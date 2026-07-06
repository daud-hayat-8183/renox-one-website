"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getBasePath } from "@/lib/utils";

export default function StaticHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section 
      id="hero-section" 
      className="relative w-full min-h-[100svh] bg-renox-black flex flex-col items-center justify-between overflow-hidden"
    >
      <h1 className="sr-only">Renox One — Designed to Be Explored</h1>

      {/* Hero Image Area (Mobile & Tablet) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-start justify-center">
        <picture className="w-full h-full">
          {/* Tablet Image */}
          <source 
            media="(min-width: 768px)" 
            srcSet={`${getBasePath()}/media/tab_version.png`} 
          />
          {/* Mobile Image */}
          <img 
            src={`${getBasePath()}/media/mobile_version.png`} 
            alt="Renox One smartphone shown from front and rear" 
            className="w-full h-full object-contain object-top transition-opacity duration-1000 ease-out"
            style={{ opacity: mounted ? 1 : 0 }}
          />
        </picture>
        
        {/* Soft bottom fade to blend into the action area naturally */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-renox-black via-renox-black/80 to-transparent"></div>
      </div>

      {/* Action Area (CTA Buttons) */}
      <div className="relative z-10 w-full flex flex-col justify-end pb-[calc(2rem+env(safe-area-inset-bottom))] px-6 md:px-12 mt-auto min-h-[100svh]">
        <div 
          className="flex flex-col md:flex-row gap-4 w-full max-w-[400px] md:max-w-[500px] mx-auto transition-all duration-700 delay-300 ease-out"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <Link href="#design" className="w-full">
            <Button size="lg" variant="secondary" className="w-full py-4 text-base rounded-[24px]">
              Explore Renox One
            </Button>
          </Link>
          <Link href="/order" className="w-full">
            <Button size="lg" variant="primary" className="w-full py-4 text-base rounded-[24px]">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
