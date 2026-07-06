/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { DraggableGrid } from "./DraggableGrid";
import { cn, getBasePath } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

function SectionHeading({ 
  eyebrow, 
  title, 
  description, 
  align = "left" 
}: { 
  eyebrow: string, 
  title: string, 
  description?: string,
  align?: "left" | "center" 
}) {
  return (
    <div className={cn("flex flex-col gap-4 mb-10 md:mb-16", align === "center" ? "text-center mx-auto items-center" : "text-center md:text-left")}>
      <span className="block text-renox-copper tracking-widest text-sm md:text-base font-semibold uppercase">{eyebrow}</span>
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-renox-ivory leading-tight">{title}</h2>
      {description && <p className="text-renox-muted text-lg md:text-xl lg:text-2xl max-w-3xl font-sans leading-relaxed">{description}</p>}
    </div>
  );
}

export function ProductIntro() {
  return (
    <section id="design" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-renox-black text-renox-ivory relative">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Reveal>
            <SectionHeading 
              eyebrow="A NEW OBJECT OF INTENT"
              title="Precision, from every angle."
              description="Renox One combines a satin-finished copper body, flat precision-machined rails, and a sculpted triple-lens camera system into one unmistakable silhouette."
            />
          </Reveal>
          <ul className="flex flex-col gap-4 text-base md:text-lg text-renox-muted tracking-wide mt-8">
            {["Sunset Copper", "Satin Ceramic Back", "Machined Aluminum Frame"].map((feature, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <li className="flex items-center justify-center md:justify-start gap-3 group cursor-default">
                  <div className="w-5 h-5 rounded-full bg-renox-copper/10 flex items-center justify-center flex-shrink-0 text-renox-copper transition-colors duration-300 group-hover:bg-renox-copper/20">
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                  <span className="transition-colors duration-300 group-hover:text-renox-ivory">{feature}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={200} duration="slow">
          <div className="relative aspect-[3/4] w-full bg-renox-surface-2 rounded-3xl border border-renox-line overflow-hidden group">
            <img 
              src={`${getBasePath()}/a-new-object-of-intent.png`} 
              alt="Renox One Rear View" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-premium"
            />
          </div>
        </Reveal>
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
    <section id="performance" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-renox-charcoal relative border-t border-renox-line/50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <SectionHeading 
            eyebrow="ENGINEERED FOR THE LONG DAY"
            title="Flagship power, kept under control."
            description="Grab and swap the cards below. Built for demanding work, gaming, capture, and everyday speed—without losing its calm."
            align="center"
          />
        </Reveal>
        
        <Reveal delay={200}>
          <DraggableGrid cards={specs} />
        </Reveal>
      </div>
    </section>
  );
}

export function CameraStory() {
  return (
    <section id="camera" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-renox-black relative border-t border-renox-line/50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal duration="slow" className="order-2 lg:order-1">
            <div className="relative w-full bg-renox-surface-2 rounded-3xl border border-renox-line overflow-hidden group">
              <img 
                src={`${getBasePath()}/three-lenses-one-vision.png`} 
                alt="Renox One Camera Lenses" 
                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700 ease-premium block"
              />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <SectionHeading 
                eyebrow="THREE LENSES. ONE VISION."
                title="A camera system built around detail."
                description="From wide city scenes to close-up texture, Renox One is designed to make the everyday look intentional."
              />
            </Reveal>
            
            <div className="flex flex-col gap-6 md:gap-8 mt-8 md:mt-12">
              {[
                { lens: "50MP Primary", desc: "Everyday clarity with controlled color and low-light confidence." },
                { lens: "50MP Ultra-Wide", desc: "More of the room, skyline, and story in every frame." },
                { lens: "12MP Telephoto", desc: "Bring focus closer without losing the feeling of the scene." },
                { lens: "AI Imaging Engine", desc: "Smart processing that supports detail, tone, and natural portraits." },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="flex flex-col gap-1 md:gap-2 border-l-2 border-renox-copper/30 pl-5 md:pl-6 hover:border-renox-copper transition-colors items-center text-center md:items-start md:text-left">
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-renox-ivory">{item.lens}</h3>
                    <p className="text-renox-muted text-base md:text-lg">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductGallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const images = [
    { src: `${getBasePath()}/gallery-1.png`, alt: "Camera Macro", title: "CAMERA ARCHITECTURE", classes: "md:col-span-4 md:row-span-1" },
    { src: `${getBasePath()}/gallery-5.png`, alt: "Side Profile", title: "PRECISION PROFILE", classes: "md:col-span-4 md:row-span-1" },
    { src: `${getBasePath()}/gallery-3.png`, alt: "Front Hero", title: "FRONT SIGNATURE", classes: "md:col-span-4 md:row-span-2" },
    { src: `${getBasePath()}/gallery-4.png`, alt: "Large Rear Float", title: "REAR SIGNATURE", classes: "md:col-span-4 md:row-span-2" },
    { src: `${getBasePath()}/gallery-2.png`, alt: "Dual-device Final", title: "RENOX ONE DUO", classes: "md:col-span-4 md:row-span-1" },
    { src: `${getBasePath()}/gallery-6.png`, alt: "Side Angle", title: "CRAFTED IN SUNSET COPPER", classes: "md:col-span-8 md:row-span-1" },
  ];

  return (
    <section id="gallery" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-renox-charcoal relative border-t border-renox-line/50 overflow-hidden">
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
          transition: transform 350ms ease, box-shadow 350ms ease, border-color 350ms ease;
        }
        
        .gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (min-width: 768px) {
          .gallery-card:hover {
            border-color: rgba(255, 122, 50, 0.6);
            z-index: 50;
            transform: translateY(-4px);
            box-shadow: 0 15px 40px -10px rgba(255, 92, 25, 0.4);
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
        
        @media (max-width: 767px) {
          .gallery-label {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <SectionHeading 
            eyebrow="EXPLORE THE FORM"
            title="Designed to be seen from every angle."
            description="A product silhouette shaped by light, metal, glass, and a deliberate point of view."
            align="center"
          />
        </Reveal>
        
        <div className="gallery-grid mt-12">
          {images.map((img, idx) => (
            <Reveal key={idx} delay={idx * 50} className={img.classes}>
              <div 
                className={cn("gallery-card cursor-pointer h-[350px] md:h-full w-full")}
                onClick={() => setActiveImage(img.src)}
              >
                <img src={img.src} alt={img.alt} />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none flex items-end p-6">
                  <span className="gallery-label text-xs tracking-[0.2em] font-medium text-white drop-shadow-md">
                    {img.title}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {activeImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 cursor-zoom-out bg-[#0a0a0a]/60 backdrop-blur-3xl backdrop-saturate-[200%] transition-all animate-in fade-in duration-300"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-screen flex items-center justify-center pointer-events-none">
             <img 
               src={activeImage}
               alt="Fullscreen View"
               className="max-w-[95vw] max-h-[85vh] rounded-3xl border border-renox-copper/60 shadow-[0_0_120px_rgba(255,92,25,0.5),inset_0_0_30px_rgba(255,92,25,0.3)] animate-in zoom-in-95 duration-300 ease-out pointer-events-auto"
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
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-renox-black relative border-t border-renox-line/50 pricing-section">
      <style>{`
        @media (min-width: 768px) {
          .pricing-section:hover .pricing-card:not(:hover):not(:focus-within) {
            opacity: 0.45;
            filter: blur(3px);
            transform: scale(0.98);
          }
        }
        
        .pricing-card {
          transition: transform 350ms ease, border-color 350ms ease, box-shadow 350ms ease, opacity 350ms ease, filter 350ms ease;
        }

        .pricing-card:hover,
        .pricing-card:focus-within,
        .pricing-card.is-selected {
          transform: translateY(-8px) scale(1.015);
          border-color: rgba(255, 122, 50, 0.72) !important;
          box-shadow: inset 0 1px 0 rgba(255, 181, 122, 0.20), inset 0 0 42px rgba(255, 92, 25, 0.14), 0 18px 48px rgba(0, 0, 0, 0.38);
        }
        
        .pricing-card:hover .card-glow,
        .pricing-card:focus-within .card-glow,
        .pricing-card.is-selected .card-glow {
          opacity: 1;
        }
      `}</style>
      <div className="max-w-[1150px] mx-auto">
        <Reveal>
          <SectionHeading 
            eyebrow="CHOOSE YOUR RENOX ONE"
            title="One device. Your configuration."
            description="Choose the official Renox One configuration that fits the way you create, store, and move."
            align="center"
          />
        </Reveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-7 mt-12 max-w-full">
          <Reveal delay={100}>
            <div 
              onClick={() => setSelectedCard(1)}
              tabIndex={0}
              className={cn(
                "pricing-card relative bg-[#121212] border border-white/10 rounded-[20px] p-6 md:p-8 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-renox-copper flex flex-col h-full",
                selectedCard === 1 && "is-selected text-center md:text-left",
                "text-center md:text-left items-center md:items-start"
              )}
            >
              <div className="card-glow absolute top-0 left-0 w-[150px] h-[150px] bg-renox-copper/20 blur-[50px] opacity-0 transition-opacity duration-350 pointer-events-none rounded-tl-[20px]"></div>
              
              <div className="relative z-10 flex flex-col h-full w-full items-center md:items-start">
                <span className="text-[11px] font-bold tracking-widest uppercase text-renox-muted mb-2">OFFICIAL CONFIGURATION</span>
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-renox-ivory mb-1">Renox One</h3>
                <p className="text-renox-muted text-sm md:text-base font-mono mb-6">12GB LPDDR5X RAM · 256GB Storage</p>
                
                <div className="text-3xl md:text-4xl font-mono text-renox-ivory mb-6">Rs. 129,999</div>
                
                <p className="text-sm md:text-base font-semibold mb-4 text-renox-copper-bright">Best for: Everyday flagship performance.</p>
                
                <ul className="flex flex-col gap-3 text-sm md:text-base text-renox-muted mb-10 w-full items-center md:items-start text-center md:text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-renox-copper mt-0.5">•</span> Android 16 with Renox OS
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-renox-copper mt-0.5">•</span> Smooth multitasking
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-renox-copper mt-0.5">•</span> Sunset Copper finish
                  </li>
                </ul>
                
                <div className="mt-auto pt-4 w-full">
                  <Link href="/order?variant=12-256" tabIndex={-1}>
                    <button className="group w-full flex items-center justify-center gap-2 bg-renox-copper text-renox-black py-3 px-6 rounded-full font-semibold hover:brightness-110 transition-all duration-300 min-h-[44px]">
                      Configure & Order
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div 
              onClick={() => setSelectedCard(2)}
              tabIndex={0}
              className={cn(
                "pricing-card relative bg-[#121212] border border-white/10 rounded-[20px] p-6 md:p-8 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-renox-copper flex flex-col h-full",
                selectedCard === 2 && "is-selected text-center md:text-left",
                "text-center md:text-left items-center md:items-start"
              )}
            >
              <div className="w-full flex justify-center md:justify-start mb-4 relative z-20">
                <div className="bg-renox-copper text-renox-black text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md inline-block">
                  Rs. 20,000 more storage & memory value
                </div>
              </div>

              <div className="card-glow absolute top-0 left-0 w-[150px] h-[150px] bg-renox-copper/20 blur-[50px] opacity-0 transition-opacity duration-350 pointer-events-none rounded-tl-[20px]"></div>
              
              <div className="relative z-10 flex flex-col h-full w-full items-center md:items-start">
                <span className="text-[11px] font-bold tracking-widest uppercase text-renox-copper-bright mb-2">MOST POWERFUL CONFIGURATION</span>
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-renox-ivory mb-1">Renox One Pro</h3>
                <p className="text-renox-muted text-sm md:text-base font-mono mb-6">16GB LPDDR5X RAM · 512GB Storage</p>
                
                <div className="text-3xl md:text-4xl font-mono text-renox-ivory mb-6">Rs. 149,999</div>
                
                <p className="text-sm md:text-base font-semibold mb-4 text-renox-copper-bright">Best for: Creators and larger libraries.</p>
                
                <ul className="flex flex-col gap-3 text-sm md:text-base text-renox-muted mb-10 w-full items-center md:items-start text-center md:text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-renox-copper mt-0.5">•</span> 16GB LPDDR5X RAM
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-renox-copper mt-0.5">•</span> 512GB high-speed storage
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-renox-copper mt-0.5">•</span> Built for demanding capture
                  </li>
                </ul>
                
                <div className="mt-auto pt-4 w-full">
                  <Link href="/order?variant=16-512" tabIndex={-1}>
                    <button className="group w-full flex items-center justify-center gap-2 bg-renox-copper text-renox-black py-3 px-6 rounded-full font-semibold hover:brightness-110 transition-all duration-300 min-h-[44px]">
                      Configure & Order
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-renox-charcoal relative border-t border-renox-line/50 overflow-hidden">
       <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-renox-copper/5 to-transparent pointer-events-none"></div>
       <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
         <Reveal className="text-center md:text-left">
            <span className="block text-renox-copper tracking-widest text-sm md:text-base font-semibold uppercase mb-4">THE FIRST FROM RENOX</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-renox-ivory mb-6 leading-tight">Renox One is ready when you are.</h2>
            <p className="text-xl md:text-2xl text-renox-muted mb-10 font-sans">Starting from Rs. 129,999.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[400px] sm:max-w-none mx-auto md:mx-0">
              <Link href="/order" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto min-h-[48px]">Order Renox One</Button>
              </Link>
              <Link href="/#pricing" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto min-h-[48px]">Compare Variants</Button>
              </Link>
            </div>
         </Reveal>
         
         <div className="flex flex-col gap-4">
            {[
              { title: "2-Year RenoxCare Warranty", desc: "Comprehensive coverage including accidental screen protection for the first 6 months of ownership.", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> },
              { title: "Priority Nationwide Delivery", desc: "Order before 2 PM for guaranteed next-day secure delivery across all major cities nationwide.", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /> },
              { title: "Premium Trade-in Program", desc: "Exchange your current smartphone and get up to Rs. 45,000 in instant credit towards your new Renox One.", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /> }
            ].map((feature, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-renox-surface/30 p-5 md:p-8 rounded-3xl border border-renox-line/50 hover:border-renox-copper/30 hover:bg-renox-surface/50 transition-colors flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-5 group">
                   <div className="bg-renox-black p-3 rounded-full border border-renox-line group-hover:border-renox-copper/50 transition-colors shrink-0">
                     <svg className="w-6 h-6 text-renox-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                       {feature.icon}
                     </svg>
                   </div>
                   <div>
                      <h4 className="text-base md:text-lg text-renox-ivory font-semibold mb-1">{feature.title}</h4>
                      <p className="text-renox-muted text-sm md:text-base leading-relaxed">{feature.desc}</p>
                   </div>
                </div>
              </Reveal>
            ))}
         </div>
       </div>
    </section>
  )
}
