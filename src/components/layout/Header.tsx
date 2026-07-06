"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { MoreVertical, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const heroSection = document.getElementById("hero-section");
      
      let hideThreshold = window.innerHeight * 3.5; // Fallback
      if (heroSection) {
        // Hide the header for the *entire* duration of the hero section
        hideThreshold = heroSection.offsetTop + heroSection.offsetHeight;
      }
      
      // Hide header completely during the cinematic hero video scroll
      if (y > 100 && y < hideThreshold - window.innerHeight / 2) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Design", href: "/#design" },
    { label: "Performance", href: "/#performance" },
    { label: "Camera", href: "/#camera" },
    { label: "Gallery", href: "/#gallery" },
  ];

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-300 ease-premium w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-[1200px] left-1/2 -translate-x-1/2",
        !isVisible ? "-translate-y-[150%] opacity-0 pointer-events-none" : "translate-y-0 opacity-100",
        "top-[calc(1rem+env(safe-area-inset-top))] md:top-[calc(1.5rem+env(safe-area-inset-top))] bg-[#0a0a0a]/30 backdrop-blur-3xl backdrop-saturate-[200%] backdrop-contrast-[110%] backdrop-brightness-[115%] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-full h-16 md:h-[72px]"
      )}
    >
      {/* Liquid Glass Noise & Distortion Overlay */}
      <div 
        className={cn(
          "absolute inset-0 mix-blend-overlay pointer-events-none transition-opacity duration-300 rounded-[inherit]",
          isVisible ? "opacity-[0.25]" : "opacity-0"
        )} 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      ></div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-display font-bold tracking-widest text-renox-ivory">
          RENOX
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-sans text-renox-muted hover:text-renox-ivory transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/order">
            <Button size="sm" variant="primary">Order Now</Button>
          </Link>
        </div>

        <button
          className="md:hidden text-renox-ivory p-3 -mr-3 flex items-center justify-center min-w-[44px] min-h-[44px] transition-transform active:scale-95"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={28} /> : <MoreVertical size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay - Liquid Glass */}
      <div 
        className={cn(
          "fixed right-4 md:hidden z-40 w-[240px] flex flex-col px-5 py-6 rounded-3xl border transition-all duration-200 origin-top-right",
          "bg-[#0c0c0f]/60 backdrop-blur-[16px] backdrop-saturate-[140%] border-[rgba(255,176,104,0.18)] shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,176,104,0.05)]",
          isMenuOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        )}
        style={{
          top: "calc(env(safe-area-inset-top) + 80px)"
        }}
      >
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-lg font-display text-renox-ivory border-b border-renox-line/30 pb-3 hover:text-renox-copper transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex flex-col gap-4">
          <Link href="/order" onClick={() => setIsMenuOpen(false)}>
            <Button size="default" className="w-full font-semibold">Order Now</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
