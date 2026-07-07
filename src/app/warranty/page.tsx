"use client";

import React, { useRef, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WarrantyPage() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !heroRef.current) return;
    
    // Hero Animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Cards Animation
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
        }
      }
    );

    // Detailed Content Animation
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // CTA Animation
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);

  return (
    <>
      <Header />
      <style>{`
        @keyframes float-soft {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          25% { transform: translate3d(2px, -4px, 0) rotate(0.5deg); }
          50% { transform: translate3d(-1px, -6px, 0) rotate(-0.5deg); }
          75% { transform: translate3d(-3px, -2px, 0) rotate(0.2deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          33% { transform: translate3d(-3px, -8px, 0) rotate(-1deg); }
          66% { transform: translate3d(3px, -5px, 0) rotate(1deg); }
        }
        @keyframes float-intense {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          30% { transform: translate3d(4px, -10px, 0) rotate(1.5deg); }
          70% { transform: translate3d(-4px, -7px, 0) rotate(-1deg); }
        }
        
        .warranty-card {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), 
                      box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.5s ease;
        }
        
        .warranty-card:hover {
          animation-play-state: paused !important;
          transform: translateY(-12px) scale(1.02) !important;
          z-index: 20;
          border-color: rgba(255, 122, 50, 0.5);
          box-shadow: 
            0 30px 60px -12px rgba(0,0,0,0.8),
            0 0 80px -20px rgba(255, 92, 25, 0.15),
            inset 0 0 0 1px rgba(255, 122, 50, 0.2);
        }

        .warranty-card .card-glow {
          position: absolute;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(255,122,50,0.15) 0%, rgba(255,122,50,0) 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 0;
        }

        .warranty-card:hover .card-glow {
          opacity: 1;
        }
        
        .card-content {
          position: relative;
          z-index: 10;
        }
      `}</style>
      <main ref={containerRef} className="min-h-screen bg-renox-black text-renox-ivory font-sans pt-40 pb-32 overflow-hidden">
        
        {/* Background ambient glow - fixed width to be safe on mobile */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-renox-copper/5 blur-[120px] pointer-events-none rounded-full"></div>

        {/* Hero Section */}
        <div ref={heroRef} className="w-[min(100%-32px,1000px)] mx-auto text-center mb-20 opacity-0 relative z-10 box-border">
          <span className="block text-renox-copper tracking-widest text-sm font-semibold uppercase mb-4">RENOXCARE</span>
          <h1 
            className="text-4xl md:text-6xl font-display font-bold text-renox-ivory mb-6 leading-tight w-full"
            style={{ 
              fontSize: "clamp(2rem, 8vw, 4.5rem)",
              textWrap: "balance", 
              wordBreak: "break-word"
            }}
          >
            Uncompromising Protection.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-renox-muted max-w-2xl mx-auto leading-relaxed">
            Every Renox One is engineered for perfection, and backed by a warranty designed to keep you creating without limits.
          </p>
        </div>

        {/* Core Benefits Grid */}
        <div className="w-[min(100%-32px,1200px)] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 relative z-10 box-border">
          
          <div 
            ref={el => { cardsRef.current[0] = el; }} 
            className="warranty-card opacity-0 bg-renox-charcoal border border-renox-line rounded-3xl p-6 sm:p-8 relative overflow-hidden w-full box-border"
            style={{ animation: 'float-medium 9s ease-in-out infinite' }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const glow = e.currentTarget.querySelector('.card-glow') as HTMLElement;
              if (glow) {
                glow.style.transform = `translate(${x - 125}px, ${y - 125}px)`;
              }
            }}
          >
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="w-12 h-12 bg-renox-surface border border-renox-line rounded-full flex items-center justify-center mb-6 text-renox-copper group-hover:bg-renox-copper/10 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-renox-ivory">2-Year Comprehensive</h3>
              <p className="text-renox-muted text-sm leading-relaxed">
                Extended hardware protection covering any manufacturing defects, battery degradation below 80%, and internal component failures globally.
              </p>
            </div>
          </div>

          <div 
            ref={el => { cardsRef.current[1] = el; }} 
            className="warranty-card opacity-0 bg-renox-charcoal border border-renox-line rounded-3xl p-6 sm:p-8 relative overflow-hidden w-full box-border"
            style={{ animation: 'float-intense 11s ease-in-out infinite' }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const glow = e.currentTarget.querySelector('.card-glow') as HTMLElement;
              if (glow) {
                glow.style.transform = `translate(${x - 125}px, ${y - 125}px)`;
              }
            }}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-renox-copper/10 blur-[40px] pointer-events-none rounded-full"></div>
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="w-12 h-12 bg-renox-surface border border-renox-line rounded-full flex items-center justify-center mb-6 text-renox-copper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-renox-ivory">6-Month Screen Protection</h3>
              <p className="text-renox-muted text-sm leading-relaxed">
                Complimentary, no-questions-asked replacement for accidental screen damage within the first 180 days of ownership.
              </p>
            </div>
          </div>

          <div 
            ref={el => { cardsRef.current[2] = el; }} 
            className="warranty-card opacity-0 bg-renox-charcoal border border-renox-line rounded-3xl p-6 sm:p-8 relative overflow-hidden w-full box-border"
            style={{ animation: 'float-soft 8s ease-in-out infinite' }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const glow = e.currentTarget.querySelector('.card-glow') as HTMLElement;
              if (glow) {
                glow.style.transform = `translate(${x - 125}px, ${y - 125}px)`;
              }
            }}
          >
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="w-12 h-12 bg-renox-surface border border-renox-line rounded-full flex items-center justify-center mb-6 text-renox-copper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-renox-ivory">VIP Doorstep Service</h3>
              <p className="text-renox-muted text-sm leading-relaxed">
                Experience seamless repairs with our complimentary nationwide secure pickup and drop-off service across major cities in Pakistan.
              </p>
            </div>
          </div>

        </div>

        {/* Detailed Coverage */}
        <div ref={contentRef} className="w-[min(100%-32px,900px)] mx-auto relative z-10 box-border">
          <div className="opacity-0 mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">What Is Covered</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-renox-surface/30 transition-colors w-full box-border">
                <div className="mt-1 text-renox-copper flex-shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg text-renox-ivory mb-1">Hardware Defects</h4>
                  <p className="text-renox-muted text-sm leading-relaxed">Any faults in materials, manufacturing, or workmanship under normal use.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-renox-surface/30 transition-colors w-full box-border">
                <div className="mt-1 text-renox-copper flex-shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg text-renox-ivory mb-1">Battery Health</h4>
                  <p className="text-renox-muted text-sm leading-relaxed">Free battery replacement if the maximum charging capacity drops below 80% within the 2-year period.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-renox-surface/30 transition-colors w-full box-border">
                <div className="mt-1 text-renox-copper flex-shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg text-renox-ivory mb-1">Included Accessories</h4>
                  <p className="text-renox-muted text-sm leading-relaxed">The original charging cable and power adapter are covered against defects for 1 year.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-0 mb-20">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">What Is Not Covered</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-renox-surface/30 transition-colors w-full box-border">
                <div className="mt-1 text-renox-muted flex-shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg text-renox-ivory mb-1">Liquid Damage</h4>
                  <p className="text-renox-muted text-sm leading-relaxed">While the Renox One is highly water-resistant, warranty coverage does not extend to failure caused by submersion or severe liquid damage.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-renox-surface/30 transition-colors w-full box-border">
                <div className="mt-1 text-renox-muted flex-shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg text-renox-ivory mb-1">Unauthorized Modifications</h4>
                  <p className="text-renox-muted text-sm leading-relaxed">Damage caused by repairs, physical modifications, or third-party software installed by unauthorized service providers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-renox-surface/30 transition-colors w-full box-border">
                <div className="mt-1 text-renox-muted flex-shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg text-renox-ivory mb-1">Cosmetic Wear</h4>
                  <p className="text-renox-muted text-sm leading-relaxed">Normal depletion of consumable parts such as protective coatings, or superficial scratches and dents that do not affect device functionality.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div ref={ctaRef} className="w-[min(100%-32px,1000px)] mx-auto opacity-0 relative z-10 box-border">
          <div className="bg-gradient-to-br from-[#121212] to-[#0a0a0a] border border-renox-copper/20 rounded-[32px] p-8 sm:p-10 md:p-16 text-center relative overflow-hidden group w-full box-border">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-renox-copper/5 blur-[100px] pointer-events-none group-hover:bg-renox-copper/10 transition-colors duration-700"></div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-renox-ivory mb-4 relative z-10" style={{ textWrap: "balance" }}>Need to make a claim?</h2>
            <p className="text-renox-muted text-base sm:text-lg mb-8 max-w-xl mx-auto relative z-10">
              Our VIP concierge team is ready to assist you. Contact us immediately to arrange a priority repair or replacement.
            </p>
            <div className="relative z-10">
              <Link href="/support" className="inline-flex items-center justify-center bg-renox-copper text-renox-black font-semibold tracking-wider uppercase text-sm px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:brightness-110 hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                Contact Concierge
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
