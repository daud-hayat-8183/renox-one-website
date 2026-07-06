"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getBasePath } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function DesktopVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textIntroRef = useRef<HTMLDivElement>(null);
  const textOutroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    let displayedTime = 0;
    let targetTime = 0;
    
    // Attempt to preload video
    videoRef.current.preload = "auto";
    videoRef.current.load();

    const updateVideoTime = () => {
      if (!videoRef.current || isNaN(videoRef.current.duration)) {
        return;
      }

      // Use a much smaller lerp factor (0.05 instead of 0.16) for buttery smooth follow-through
      displayedTime += (targetTime - displayedTime) * 0.05;

      // Only seek if we have a meaningful difference AND the browser isn't busy seeking already
      if (
        Math.abs(videoRef.current.currentTime - displayedTime) > 0.01 &&
        !videoRef.current.seeking &&
        videoRef.current.readyState >= 2
      ) {
        videoRef.current.currentTime = displayedTime;
      }
    };

    gsap.ticker.add(updateVideoTime);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
        onUpdate: (self) => {
          if (videoRef.current && !isNaN(videoRef.current.duration)) {
             targetTime = self.progress * videoRef.current.duration;
          }
          gsap.set("#scroll-progress-bar", { scaleY: self.progress });
        },
      }
    });

    // Intro text fades out
    tl.to(textIntroRef.current, {
      opacity: 0,
      y: -50,
      ease: "none",
      duration: 0.2
    }, 0.1);

    // Outro text fades in at the end
    tl.fromTo(textOutroRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, ease: "none", duration: 0.2 }, 
      0.8
    );

    return () => {
      gsap.ticker.remove(updateVideoTime);
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="hero-section" ref={containerRef} className="relative w-full h-[400vh] md:h-[500vh] bg-renox-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Video Canvas */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          aria-label="Renox One cinematic product film"
        >
          <source src={`${getBasePath()}/media/renox-one-hero-scroll.mp4`} type="video/mp4" />
        </video>

        {/* Intro Overlay */}
        <div 
          ref={textIntroRef} 
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 z-10 bg-gradient-to-r from-renox-black/80 via-renox-black/40 to-transparent pointer-events-none"
        >
          <div className="pointer-events-auto max-w-3xl mt-20 md:mt-0">
            <span className="block text-renox-copper tracking-widest text-sm md:text-base font-semibold mb-4 uppercase">Renox Presents</span>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-display font-bold leading-none mb-6 text-renox-ivory drop-shadow-lg">
              Renox<br/>One
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-renox-ivory/90 mb-10 font-sans font-light tracking-wide drop-shadow-md">
              Designed to Be Explored.
            </p>
            <Link href="/order">
              <Button size="lg" variant="primary" className="text-lg px-10 py-4">Order Now</Button>
            </Link>
          </div>
        </div>

        {/* Outro Overlay (Buttons Only, No Text) */}
        <div 
          ref={textOutroRef}
          className="absolute inset-x-0 bottom-0 pb-12 md:pb-16 px-6 md:px-20 flex justify-start z-10 bg-gradient-to-t from-renox-black/50 to-transparent opacity-0 pointer-events-none"
        >
          <div className="pointer-events-auto flex flex-col sm:flex-row gap-4">
            <Link href="#design">
              <Button size="default" variant="secondary" className="w-full sm:w-auto px-6 py-2">Explore Renox One</Button>
            </Link>
            <Link href="/order">
              <Button size="default" variant="primary" className="w-full sm:w-auto px-6 py-2">Order Now</Button>
            </Link>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20 hidden md:flex">
          <div className="w-[2px] h-32 bg-renox-line relative rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-renox-copper h-full origin-top transform scale-y-0" id="scroll-progress-bar" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-renox-muted" style={{ writingMode: 'vertical-rl' }}>
            Scroll to explore
          </span>
        </div>

      </div>
    </section>
  );
}
