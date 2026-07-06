/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DraggableGrid } from "./DraggableGrid";
import { cn, getBasePath } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function SectionHeading({ eyebrow, title, description }: { eyebrow: string, title: string, description?: string }) {
  return (
    <div className="flex flex-col gap-4 mb-16">
      <span className="block text-renox-copper tracking-widest text-sm md:text-base font-semibold uppercase">{eyebrow}</span>
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-renox-ivory leading-tight">{title}</h2>
      {description && <p className="text-renox-muted text-lg md:text-xl lg:text-2xl max-w-3xl font-sans leading-relaxed">{description}</p>}
    </div>
  );
}

export function ProductIntro() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !imageRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", // Starts fading in when the top of section is 75% down viewport
        end: "bottom 25%", // Gives it a nice window
        toggleActions: "play reverse play reverse", // Play on scroll down, reverse on scroll past, and reverse on scroll back up
      }
    });

    tl.fromTo(textRef.current, 
      { opacity: 0, y: 60 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .from(featureRefs.current,
      { opacity: 0, x: -20, duration: 0.6, stagger: 0.15, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(imageRef.current,
      { opacity: 0, scale: 0.9, y: 60 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
      "-=0.7"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} id="design" className="py-32 px-6 md:px-20 bg-renox-black text-renox-ivory relative">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div ref={textRef}>
          <SectionHeading 
            eyebrow="A NEW OBJECT OF INTENT"
            title="Precision, from every angle."
            description="Renox One combines a satin-finished copper body, flat precision-machined rails, and a sculpted triple-lens camera system into one unmistakable silhouette."
          />
          <ul className="flex flex-col gap-4 text-base md:text-lg text-renox-muted tracking-wide mt-8">
            {["Sunset Copper", "Satin Ceramic Back", "Machined Aluminum Frame"].map((feature, idx) => (
              <li 
                key={idx} 
                ref={(el) => { featureRefs.current[idx] = el; }}
                className="flex items-center gap-3 group cursor-default"
              >
                <div className="w-5 h-5 rounded-full bg-renox-copper/10 flex items-center justify-center flex-shrink-0 text-renox-copper transition-colors duration-300 group-hover:bg-renox-copper/20">
                  <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <span className="transition-colors duration-300 group-hover:text-renox-ivory">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div ref={imageRef} className="opacity-0 relative aspect-[3/4] w-full bg-renox-surface-2 rounded-3xl border border-renox-line overflow-hidden group">
          <img 
            src={`${getBasePath()}/a-new-object-of-intent.png`} 
            alt="Renox One Rear View" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-premium"
          />
        </div>
      </div>
    </section>
  );
}

export function SpecificationGrid() {
  const specs = [
    { id: "1", title: "Snapdragon 8 Elite Gen 5", label: "Flagship responsiveness for demanding apps, capture, and gaming.", metric: "Elite Performance" },
    { id: "2", title: "Up to 16GB LPDDR5X", label: "Built to keep more of your day moving at once.", metric: "16GB Memory" },
    { id: "3", title: "Up to 512GB high-speed storage", label: "More room for video, images, apps, and your next idea.", metric: "512GB Storage" },
    { id: "4", title: "Vapor Chamber Cooling", label: "Designed to sustain performance during long sessions.", metric: "Thermal Control" },
    { id: "5", title: "6.78\" AMOLED · up to 144Hz", label: "Smooth visual motion, deep contrast, and rapid touch response.", metric: "Immersive Display" },
    { id: "6", title: "5,500mAh · 80W wired", label: "Power designed for the pace of the day.", metric: "Fast Charge" }
  ];

  return (
    <section id="performance" className="py-32 px-6 md:px-20 bg-renox-charcoal relative border-t border-renox-line/50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading 
          eyebrow="ENGINEERED FOR THE LONG DAY"
          title="Flagship power, kept under control."
          description="Grab and swap the cards below. Built for demanding work, gaming, capture, and everyday speed—without losing its calm."
        />
        
        <DraggableGrid cards={specs} />
      </div>
    </section>
  );
}

export function CameraStory() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !imageRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play reverse play reverse",
      }
    });

    tl.fromTo(imageRef.current,
      { opacity: 0, scale: 0.9, x: -60 },
      { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(textRef.current, 
      { opacity: 0, x: 60 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(featureRefs.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
      "-=0.6"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} id="camera" className="py-32 px-6 md:px-20 bg-renox-black relative border-t border-renox-line/50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={imageRef} className="opacity-0 relative w-full bg-renox-surface-2 rounded-3xl border border-renox-line overflow-hidden group">
            <img 
              src={`${getBasePath()}/three-lenses-one-vision.png`} 
              alt="Renox One Camera Lenses" 
              className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700 ease-premium block"
            />
          </div>
          <div>
            <div ref={textRef} className="opacity-0">
              <SectionHeading 
                eyebrow="THREE LENSES. ONE VISION."
                title="A camera system built around detail."
                description="From wide city scenes to close-up texture, Renox One is designed to make the everyday look intentional."
              />
            </div>
            
            <div className="flex flex-col gap-8 mt-12">
              {[
                { lens: "50MP Primary", desc: "Everyday clarity with controlled color and low-light confidence." },
                { lens: "50MP Ultra-Wide", desc: "More of the room, skyline, and story in every frame." },
                { lens: "12MP Telephoto", desc: "Bring focus closer without losing the feeling of the scene." },
                { lens: "AI Imaging Engine", desc: "Smart processing that supports detail, tone, and natural portraits." },
              ].map((item, i) => (
                <div 
                  key={i} 
                  ref={(el) => { featureRefs.current[i] = el; }}
                  className="flex flex-col gap-2 border-l-2 border-renox-copper/30 pl-6 hover:border-renox-copper transition-colors opacity-0"
                >
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-renox-ivory">{item.lens}</h3>
                  <p className="text-renox-muted text-base md:text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeImage, setActiveImage] = React.useState<string | null>(null);

  const images = [
    { src: `${getBasePath()}/gallery-1.png`, alt: "Camera Macro", title: "CAMERA ARCHITECTURE", classes: "md:col-span-4 md:row-span-1" },
    { src: `${getBasePath()}/gallery-5.png`, alt: "Side Profile", title: "PRECISION PROFILE", classes: "md:col-span-4 md:row-span-1" },
    { src: `${getBasePath()}/gallery-3.png`, alt: "Front Hero", title: "FRONT SIGNATURE", classes: "md:col-span-4 md:row-span-2" },
    { src: `${getBasePath()}/gallery-4.png`, alt: "Large Rear Float", title: "REAR SIGNATURE", classes: "md:col-span-4 md:row-span-2" },
    { src: `${getBasePath()}/gallery-2.png`, alt: "Dual-device Final", title: "RENOX ONE DUO", classes: "md:col-span-4 md:row-span-1" },
    { src: `${getBasePath()}/gallery-6.png`, alt: "Side Angle", title: "CRAFTED IN SUNSET COPPER", classes: "md:col-span-8 md:row-span-1" },
  ];

  useEffect(() => {
    if (!containerRef.current || !headingRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play reverse play reverse",
      }
    });

    tl.fromTo(headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    ).fromTo(cardRefs.current,
      { opacity: 0, scale: 0.95, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={containerRef} id="gallery" className="py-32 px-6 md:px-20 bg-renox-charcoal relative border-t border-renox-line/50 overflow-hidden">
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 12px;
        }
        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(12, minmax(0, 1fr));
            grid-auto-flow: dense;
            gap: 16px;
            grid-auto-rows: minmax(280px, auto);
          }
        }
        
        .gallery-card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.10);
          background: #0d0d0f;
          transition:
            transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 350ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 350ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        @keyframes floatPhysics {
          0% { transform: scale(1.03) translate(0px, -6px); box-shadow: inset 0 0 30px rgba(255, 122, 50, 0.15), 0 25px 60px -10px rgba(255, 92, 25, 0.6); }
          25% { transform: scale(1.03) translate(3px, -10px); box-shadow: inset 0 0 30px rgba(255, 122, 50, 0.15), 0 35px 70px -12px rgba(255, 92, 25, 0.7); }
          50% { transform: scale(1.03) translate(-2px, -3px); box-shadow: inset 0 0 30px rgba(255, 122, 50, 0.15), 0 15px 40px -8px rgba(255, 92, 25, 0.4); }
          75% { transform: scale(1.03) translate(-4px, -8px); box-shadow: inset 0 0 30px rgba(255, 122, 50, 0.15), 0 30px 65px -10px rgba(255, 92, 25, 0.6); }
          100% { transform: scale(1.03) translate(0px, -6px); box-shadow: inset 0 0 30px rgba(255, 122, 50, 0.15), 0 25px 60px -10px rgba(255, 92, 25, 0.6); }
        }

        @media (min-width: 768px) {
          .gallery-card:hover {
            border-color: rgba(255, 122, 50, 0.6);
            animation: floatPhysics 5s ease-in-out infinite;
            z-index: 50;
          }
          
          .gallery-card:hover img {
            transform: scale(1.06);
          }
        }

        .gallery-label {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 350ms ease, transform 350ms ease;
        }

        .gallery-card:hover .gallery-label {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Mobile fallback for labels */
        @media (max-width: 767px) {
          .gallery-label {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto">
        <div ref={headingRef} className="opacity-0">
          <SectionHeading 
            eyebrow="EXPLORE THE FORM"
            title="Designed to be seen from every angle."
            description="A product silhouette shaped by light, metal, glass, and a deliberate point of view."
          />
        </div>
        
        {/* Strict 12-Column CSS Grid Layout */}
        <div className="gallery-grid mt-12">
          {images.map((img, idx) => (
            <div 
              key={idx}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className={cn("gallery-card opacity-0 cursor-pointer h-[350px] md:h-full", img.classes)}
              onClick={() => setActiveImage(img.src)}
            >
              <img 
                src={img.src}
                alt={img.alt}
              />
              
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none flex items-end p-6">
                <span className="gallery-label text-xs tracking-[0.2em] font-medium text-white drop-shadow-md">
                  {img.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Blur Overlay) */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 cursor-zoom-out bg-[#0a0a0a]/60 backdrop-blur-3xl backdrop-saturate-[200%] transition-all animate-in fade-in duration-300"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-screen flex items-center justify-center pointer-events-none">
             <img 
               src={activeImage}
               alt="Fullscreen View"
               className="max-w-[95vw] max-h-[85vh] rounded-3xl border border-renox-copper/60 shadow-[0_0_120px_rgba(255,92,25,0.5),inset_0_0_30px_rgba(255,92,25,0.3)] animate-in zoom-in-95 duration-500 ease-out pointer-events-auto"
               onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(null);
               }}
             />
          </div>
        </div>
      )}
    </section>
  );
}

export function VariantCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  // Mobile selected state
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set([eyebrowRef.current, headingRef.current, descRef.current, card1Ref.current, card2Ref.current], {
        opacity: 1,
        y: 0,
        x: 0
      });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      }
    });

    tl.fromTo(eyebrowRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" })
      .fromTo(headingRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, "-=0.8")
      .fromTo(descRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, "-=0.8")
      .fromTo(card1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(card2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.65");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-32 px-6 md:px-20 bg-renox-black relative border-t border-renox-line/50 pricing-section">
      <style>{`
        @media (min-width: 768px) {
          .pricing-section:hover .pricing-card:not(:hover):not(:focus-within) {
            opacity: 0.45;
            filter: blur(3px);
            transform: scale(0.98);
          }
        }
        
        .pricing-card {
          transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1), 
                      border-color 350ms ease, 
                      box-shadow 350ms ease,
                      opacity 350ms ease,
                      filter 350ms ease;
        }

        .pricing-card:hover,
        .pricing-card:focus-within,
        .pricing-card.is-selected {
          transform: translateY(-8px) scale(1.015);
          border-color: rgba(255, 122, 50, 0.72) !important;
          box-shadow:
            inset 0 1px 0 rgba(255, 181, 122, 0.20),
            inset 0 0 42px rgba(255, 92, 25, 0.14),
            0 18px 48px rgba(0, 0, 0, 0.38);
        }
        
        .pricing-card:hover .card-glow,
        .pricing-card:focus-within .card-glow,
        .pricing-card.is-selected .card-glow {
          opacity: 1;
        }
      `}</style>
      <div className="max-w-[1150px] mx-auto">
        <div className="flex flex-col gap-4 mb-16 max-w-3xl">
          <span ref={eyebrowRef} className="block text-renox-copper tracking-widest text-sm md:text-base font-semibold uppercase opacity-0">CHOOSE YOUR RENOX ONE</span>
          <h2 ref={headingRef} className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-renox-ivory leading-tight opacity-0">One device. Your configuration.</h2>
          <p ref={descRef} className="text-renox-muted text-lg md:text-xl lg:text-2xl font-sans leading-relaxed opacity-0">Choose the official Renox One configuration that fits the way you create, store, and move.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-7 mt-12 max-w-full">
          {/* Card 1 */}
          <div 
            ref={card1Ref}
            onClick={() => setSelectedCard(1)}
            tabIndex={0}
            className={cn(
              "pricing-card relative bg-[#121212] border border-white/10 rounded-[20px] p-[22px] md:p-[28px] overflow-visible opacity-0 outline-none focus-visible:ring-2 focus-visible:ring-renox-copper",
              selectedCard === 1 && "is-selected"
            )}
          >
            {/* Top-left subtle highlight & inner glow */}
            <div className="card-glow absolute top-0 left-0 w-[150px] h-[150px] bg-renox-copper/20 blur-[50px] opacity-0 transition-opacity duration-350 pointer-events-none rounded-tl-[20px]"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-widest uppercase text-renox-muted mb-2">OFFICIAL CONFIGURATION</span>
              <h3 className="text-2xl md:text-3xl font-display font-semibold text-renox-ivory mb-1">Renox One</h3>
              <p className="text-renox-muted text-sm md:text-base font-mono mb-6">12GB LPDDR5X RAM · 256GB Storage</p>
              
              <div className="text-3xl md:text-4xl font-mono text-renox-ivory mb-6">Rs. 129,999</div>
              
              <p className="text-sm md:text-base font-semibold mb-4 text-renox-copper-bright">Best for: Everyday flagship performance.</p>
              
              <ul className="flex flex-col gap-3 text-sm md:text-base text-renox-muted mb-10">
                <li className="flex items-start gap-2">
                  <span className="text-renox-copper mt-0.5">•</span> 
                  Android 16 with Renox OS
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-renox-copper mt-0.5">•</span> 
                  Smooth multitasking and high-speed storage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-renox-copper mt-0.5">•</span> 
                  Sunset Copper finish
                </li>
              </ul>
              
              <div className="mt-auto pt-4">
                <Link href="/order?variant=12-256" tabIndex={-1}>
                  <button className="group w-full flex items-center justify-center gap-2 bg-renox-copper text-renox-black py-3 px-6 rounded-full font-semibold hover:brightness-110 transition-all duration-300">
                    Configure & Order
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            ref={card2Ref}
            onClick={() => setSelectedCard(2)}
            tabIndex={0}
            className={cn(
              "pricing-card relative bg-[#121212] border border-white/10 rounded-[20px] p-[22px] md:p-[28px] overflow-visible opacity-0 outline-none focus-visible:ring-2 focus-visible:ring-renox-copper",
              selectedCard === 2 && "is-selected"
            )}
          >
            <div className="absolute -top-3 right-6 bg-renox-copper text-renox-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-20 shadow-md">
              Rs. 20,000 more storage and memory value
            </div>

            <div className="card-glow absolute top-0 left-0 w-[150px] h-[150px] bg-renox-copper/20 blur-[50px] opacity-0 transition-opacity duration-350 pointer-events-none rounded-tl-[20px]"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <span className="text-[11px] font-bold tracking-widest uppercase text-renox-copper-bright mb-2">MOST POWERFUL CONFIGURATION</span>
              <h3 className="text-2xl md:text-3xl font-display font-semibold text-renox-ivory mb-1">Renox One Pro Memory</h3>
              <p className="text-renox-muted text-sm md:text-base font-mono mb-6">16GB LPDDR5X RAM · 512GB Storage</p>
              
              <div className="text-3xl md:text-4xl font-mono text-renox-ivory mb-6">Rs. 149,999</div>
              
              <p className="text-sm md:text-base font-semibold mb-4 text-renox-copper-bright">Best for: Creators, heavy users, and larger libraries.</p>
              
              <ul className="flex flex-col gap-3 text-sm md:text-base text-renox-muted mb-10">
                <li className="flex items-start gap-2">
                  <span className="text-renox-copper mt-0.5">•</span> 
                  16GB LPDDR5X RAM
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-renox-copper mt-0.5">•</span> 
                  512GB high-speed storage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-renox-copper mt-0.5">•</span> 
                  Built for demanding capture and multitasking
                </li>
              </ul>
              
              <div className="mt-auto pt-4">
                <Link href="/order?variant=16-512" tabIndex={-1}>
                  <button className="group w-full flex items-center justify-center gap-2 bg-renox-copper text-renox-black py-3 px-6 rounded-full font-semibold hover:brightness-110 transition-all duration-300">
                    Configure & Order
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !leftContentRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      }
    });

    tl.fromTo(leftContentRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    ).fromTo(rightCardsRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.6"
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-20 bg-renox-charcoal relative border-t border-renox-line/50 overflow-hidden">
       <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-renox-copper/5 to-transparent pointer-events-none"></div>
       <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
         <div ref={leftContentRef} className="opacity-0">
            <span className="block text-renox-copper tracking-widest text-sm md:text-base font-semibold uppercase mb-4">THE FIRST FROM RENOX</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-renox-ivory mb-6 leading-tight">Renox One is ready when you are.</h2>
            <p className="text-2xl text-renox-muted mb-10 font-sans">Starting from Rs. 129,999.</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/order">
                <Button size="lg" variant="primary" className="w-full sm:w-auto">Order Renox One</Button>
              </Link>
              <Link href="/#pricing">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">Compare Variants</Button>
              </Link>
            </div>
         </div>
         
         <div className="flex flex-col gap-4">
            <div ref={(el) => { rightCardsRef.current[0] = el; }} className="opacity-0 bg-renox-surface/30 p-6 md:p-8 rounded-3xl border border-renox-line/50 hover:border-renox-copper/30 hover:bg-renox-surface/50 transition-colors flex items-start gap-5 group">
               <div className="bg-renox-black p-3 rounded-full border border-renox-line group-hover:border-renox-copper/50 transition-colors shrink-0">
                 <svg className="w-6 h-6 text-renox-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                 </svg>
               </div>
               <div>
                  <h4 className="text-lg text-renox-ivory font-semibold mb-1">2-Year RenoxCare Warranty</h4>
                  <p className="text-renox-muted text-sm md:text-base leading-relaxed">Comprehensive coverage including accidental screen protection for the first 6 months of ownership.</p>
               </div>
            </div>

            <div ref={(el) => { rightCardsRef.current[1] = el; }} className="opacity-0 bg-renox-surface/30 p-6 md:p-8 rounded-3xl border border-renox-line/50 hover:border-renox-copper/30 hover:bg-renox-surface/50 transition-colors flex items-start gap-5 group">
               <div className="bg-renox-black p-3 rounded-full border border-renox-line group-hover:border-renox-copper/50 transition-colors shrink-0">
                 <svg className="w-6 h-6 text-renox-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                 </svg>
               </div>
               <div>
                  <h4 className="text-lg text-renox-ivory font-semibold mb-1">Priority Nationwide Delivery</h4>
                  <p className="text-renox-muted text-sm md:text-base leading-relaxed">Order before 2 PM for guaranteed next-day secure delivery across all major cities nationwide.</p>
               </div>
            </div>

            <div ref={(el) => { rightCardsRef.current[2] = el; }} className="opacity-0 bg-renox-surface/30 p-6 md:p-8 rounded-3xl border border-renox-line/50 hover:border-renox-copper/30 hover:bg-renox-surface/50 transition-colors flex items-start gap-5 group">
               <div className="bg-renox-black p-3 rounded-full border border-renox-line group-hover:border-renox-copper/50 transition-colors shrink-0">
                 <svg className="w-6 h-6 text-renox-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                 </svg>
               </div>
               <div>
                  <h4 className="text-lg text-renox-ivory font-semibold mb-1">Premium Trade-in Program</h4>
                  <p className="text-renox-muted text-sm md:text-base leading-relaxed">Exchange your current smartphone and get up to Rs. 45,000 in instant credit towards your new Renox One.</p>
               </div>
            </div>
         </div>
       </div>
    </section>
  )
}
