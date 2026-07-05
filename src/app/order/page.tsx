"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { renoxOneVariants, renoxOneAddOns } from "@/data/renoxOne";
import { cn, formatPrice } from "@/lib/utils";
import { generateWhatsAppMessage } from "@/lib/whatsapp";
import { Check, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const CAROUSEL_IMAGES = [
  { id: 1, src: "/products/carousel/dual-device.png", label: "Rear Signature", objectPosition: "center 20%" },
  { id: 2, src: "/products/carousel/camera-macro.png", label: "Camera Architecture", objectPosition: "center center" },
  { id: 3, src: "/products/carousel/side-profile.png", label: "Precision Profile", objectPosition: "center center" },
];

export default function OrderPage() {
  const router = useRouter();
  
  // Configuration State
  const [selectedVariantId, setSelectedVariantId] = useState<string>("12-256");
  const [selectedColor, setSelectedColor] = useState<string>("Sunset Copper");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Derived State (Synchronous Calculation)
  const selectedVariant = renoxOneVariants.find((v) => v.id === selectedVariantId) || renoxOneVariants[0];
  const addonsTotal = selectedAddOns.reduce((sum, addOnId) => {
    const addOn = renoxOneAddOns.find(a => a.id === addOnId);
    return sum + (addOn?.price || 0);
  }, 0);
  const totalPrice = selectedVariant.basePrice + addonsTotal;

  // Carousel State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);

  // Carousel Logic
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1));
  }, []);

  // GSAP Entry Animations
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in from left for the carousel
      gsap.fromTo(leftColumnRef.current, 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
      );
      
      // Stagger fade up for right panel items
      if (rightColumnRef.current) {
        const items = rightColumnRef.current.querySelectorAll('.config-panel-item');
        gsap.fromTo(items,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isHoveringCarousel || isDragging) return;
    const interval = setInterval(() => {
      nextImage();
    }, 4500); // 4.5 seconds per image
    return () => clearInterval(interval);
  }, [isHoveringCarousel, isDragging, nextImage]);

  // Drag handlers for desktop
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || dragStartX.current === null) return;
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = dragStartX.current - currentX;
    
    // threshold to swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
      setIsDragging(false); // end drag after trigger
      dragStartX.current = null;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    dragStartX.current = null;
  };

  // Keyboard navigation for carousel
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    // Save state to local storage
    const cartData = {
      variantId: selectedVariantId,
      color: selectedColor,
      addOns: selectedAddOns,
      quantity: 1,
      totalPrice
    };
    localStorage.setItem("renoxCart", JSON.stringify(cartData));
    
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
      router.push("/cart");
    }, 1200); // Brief toast before redirect
  };

  const handleWhatsAppOrder = () => {
    generateWhatsAppMessage({
      variantId: selectedVariantId,
      color: selectedColor,
      addOns: selectedAddOns,
      quantity: 1,
      totalPrice
    });
  };

  return (
    <div className="min-h-screen bg-renox-black text-renox-ivory font-sans pb-32 md:pb-0">
      <Header />

      <main className="pt-24 md:pt-32 pb-20 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* ========================================== */}
        {/* LEFT COLUMN: PRODUCT CAROUSEL (48%)        */}
        {/* ========================================== */}
        <div ref={leftColumnRef} className="lg:col-span-6 flex flex-col gap-6 opacity-0">
          <div className="lg:sticky lg:top-32 flex flex-col gap-6">
            
            {/* Main Image Viewport */}
            <div 
              className="relative w-full aspect-[4/5] md:aspect-square bg-[#050505] rounded-3xl overflow-hidden border border-white/10 group shadow-[0_0_50px_rgba(255,122,50,0.03)] focus:outline-none focus:ring-2 focus:ring-renox-copper/50"
              onMouseEnter={() => setIsHoveringCarousel(true)}
              onMouseLeave={() => { setIsHoveringCarousel(false); handleDragEnd(); }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              {/* Copper Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-renox-copper/5 to-transparent pointer-events-none"></div>

              {/* Images */}
              {CAROUSEL_IMAGES.map((img, idx) => (
                <div 
                  key={img.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    idx === currentImageIndex ? "opacity-100 translate-x-0" : 
                    idx < currentImageIndex ? "opacity-0 -translate-x-full" : "opacity-0 translate-x-full"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={img.src} 
                    alt={img.label} 
                    className="w-full h-full object-cover pointer-events-none"
                    style={{ objectPosition: img.objectPosition }}
                    draggable="false"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                  {/* Label Overlay */}
                  <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <p className="text-xs tracking-wider text-renox-ivory font-medium">{img.label}</p>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows (Desktop Hover) */}
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-renox-copper/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-renox-copper hover:text-black hidden md:flex z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-renox-copper/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-renox-copper hover:text-black hidden md:flex z-10"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Mobile Pagination Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden z-10">
                {CAROUSEL_IMAGES.map((_, idx) => (
                  <div key={idx} className={cn("h-1.5 rounded-full transition-all duration-300", idx === currentImageIndex ? "w-6 bg-renox-copper" : "w-2 bg-white/30")} />
                ))}
              </div>
            </div>

            {/* Thumbnail Strip with Interactive Cursor Glow */}
            <div 
              className="relative group/strip p-2 -m-2 rounded-2xl"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              {/* Mouse-tracking Outer Glow */}
              <div 
                className="pointer-events-none absolute -inset-2 opacity-0 transition-opacity duration-500 group-hover/strip:opacity-100 z-0"
                style={{
                  background: 'radial-gradient(120px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,122,50,0.25), transparent 60%)'
                }}
              ></div>

              <div className="grid grid-cols-3 gap-4 relative z-10">
                {CAROUSEL_IMAGES.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={cn(
                      "relative aspect-video rounded-xl overflow-hidden border transition-all duration-300 backdrop-blur-md",
                      idx === currentImageIndex 
                        ? "border-renox-copper shadow-[0_0_15px_rgba(255,122,50,0.1),inset_0_0_20px_rgba(255,122,50,0.1)] opacity-100" 
                        : "border-white/10 opacity-65 hover:opacity-100 bg-black/40"
                    )}
                    aria-label={`View ${img.label}`}
                  >
                    <div className={cn("absolute inset-0 bg-renox-copper/10 transition-opacity", idx === currentImageIndex ? "opacity-100" : "opacity-0")}></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={`Thumbnail ${img.id}`} className="w-full h-full object-cover mix-blend-screen opacity-90" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ========================================== */}
        {/* RIGHT COLUMN: CONFIGURATION PANEL (52%)    */}
        {/* ========================================== */}
        <div ref={rightColumnRef} className="lg:col-span-6 flex flex-col gap-10 mt-8 lg:mt-0">
          
          <div className="config-panel-item opacity-0">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 tracking-tight">CONFIGURE RENOX ONE</h1>
            <p className="text-renox-muted text-sm md:text-base">Build yours exactly how you need it.</p>
          </div>

          {/* 01. COLOUR */}
          <div className="config-panel-item opacity-0 flex flex-col gap-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-3 text-renox-muted">01. Colour</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sunset Copper */}
              <div 
                className={cn(
                  "p-5 rounded-2xl border flex flex-col gap-4 cursor-pointer transition-all duration-300 relative overflow-hidden",
                  selectedColor === "Sunset Copper" 
                    ? "border-renox-copper bg-[#110d0a] shadow-[0_4px_30px_rgba(255,122,50,0.08)]" 
                    : "border-white/10 bg-renox-charcoal hover:border-renox-copper/50"
                )}
                onClick={() => setSelectedColor("Sunset Copper")}
              >
                <div className="flex justify-between items-start">
                  <div className={cn("w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9A66] to-[#E56A2B] shadow-[0_0_15px_rgba(255,122,50,0.4)]")}></div>
                  {selectedColor === "Sunset Copper" && (
                    <div className="w-5 h-5 rounded-full bg-renox-copper flex items-center justify-center text-black">
                      <Check size={12} strokeWidth={4} />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[15px] text-white">Sunset Copper</p>
                </div>
              </div>
              
              {/* Midnight Navy */}
              <div className="p-5 rounded-2xl border border-white/5 bg-[#0a0a0c] flex flex-col gap-4 cursor-not-allowed opacity-60">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A2A42] to-[#0A1220]"></div>
                  <div className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase tracking-wider text-white">Coming Soon</div>
                </div>
                <div>
                  <p className="font-semibold text-[15px] text-white">Midnight Navy</p>
                  <p className="text-[11px] text-renox-muted mt-1">Availability to be announced.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 02. MEMORY & STORAGE */}
          <div className="config-panel-item opacity-0 flex flex-col gap-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-3 text-renox-muted">02. Memory & Storage</h3>
            <div className="flex flex-col gap-4">
              {renoxOneVariants.map((variant) => {
                const isSelected = selectedVariantId === variant.id;
                return (
                  <div 
                    key={variant.id}
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={cn(
                      "p-5 rounded-2xl border cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300 relative overflow-hidden",
                      isSelected 
                        ? "border-renox-copper bg-[#110d0a] shadow-[inset_0_0_30px_rgba(255,122,50,0.05)]" 
                        : "border-white/10 bg-[#0a0a0a] hover:border-white/30"
                    )}
                  >
                    {/* Inner Copper Glow Effect */}
                    {isSelected && <div className="absolute inset-0 bg-gradient-to-r from-renox-copper/5 to-transparent pointer-events-none"></div>}

                    <div className="flex gap-4 items-start relative z-10">
                      <div className={cn("mt-1 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors", 
                        isSelected ? "border-renox-copper bg-renox-copper text-black" : "border-white/20"
                      )}>
                        {isSelected && <Check size={12} strokeWidth={4} />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[15px] text-white">{variant.ram} + {variant.storage}</h4>
                        <p className={cn("text-[13px] mt-0.5 transition-colors", isSelected ? "text-renox-copper/90" : "text-renox-muted")}>{variant.name}</p>
                        <p className="text-[12px] text-renox-muted/80 mt-1">{variant.bestFor}</p>
                      </div>
                    </div>
                    <div className="sm:text-right w-full sm:w-auto pl-9 sm:pl-0 relative z-10">
                      <p className={cn("font-mono text-[15px] transition-colors", isSelected ? "text-white font-semibold" : "text-renox-muted")}>
                        {formatPrice(variant.basePrice)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 03. ADD-ONS */}
          <div className="config-panel-item opacity-0 flex flex-col gap-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-3 text-renox-muted">03. Add-ons</h3>
            <div className="flex flex-col gap-3">
              {renoxOneAddOns.map(addon => {
                const isSelected = selectedAddOns.includes(addon.id);
                return (
                  <div 
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={cn(
                      "p-4 md:px-5 md:py-4 rounded-[14px] border cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center transition-all duration-300 group hover:-translate-y-[1px]",
                      isSelected 
                        ? "border-renox-copper bg-[#110d0a] shadow-[inset_0_0_15px_rgba(255,122,50,0.02)]" 
                        : "border-white/10 bg-[#080808] hover:border-renox-copper/40 hover:bg-[#0a0807]"
                    )}
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
                      <div className={cn("w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors", 
                        isSelected ? "border-renox-copper bg-renox-copper text-black" : "border-white/20 group-hover:border-renox-copper/50"
                      )}>
                        {isSelected && <Check size={12} strokeWidth={4} />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className={cn("font-semibold text-[14px] transition-colors", isSelected ? "text-white" : "text-white/90")}>{addon.name}</h4>
                          {isSelected && <span className="text-[9px] uppercase tracking-wider bg-renox-copper/20 text-renox-copper px-2 py-0.5 rounded-sm">Added</span>}
                        </div>
                        <p className="text-[12px] text-renox-muted mt-0.5 leading-relaxed pr-2">{addon.description}</p>
                      </div>
                    </div>
                    
                    <div className="sm:text-right pl-9 sm:pl-0 w-full sm:w-auto">
                      <p className={cn("font-mono text-[14px] transition-colors", isSelected ? "text-white" : "text-renox-muted")}>
                        {formatPrice(addon.price)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 04. ORDER SUMMARY & ACTIONS (Static on Desktop) */}
          <div className="config-panel-item opacity-0 flex flex-col gap-5 relative z-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-3 text-renox-muted hidden lg:block">04. Order Summary</h3>
            
            <div className="bg-[#050505] border border-white/10 rounded-[20px] p-6 md:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              {/* Decorative Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-renox-copper/10 blur-[60px] rounded-full pointer-events-none"></div>

              <div className="flex flex-col gap-4 mb-7 relative z-10">
                <div className="flex justify-between items-end pb-3 border-b border-white/5">
                   <div>
                     <p className="text-[11px] uppercase tracking-widest text-renox-muted mb-0.5">Base Price</p>
                     <p className="font-medium text-[14px] text-white/90">Renox One ({selectedVariant.storage})</p>
                   </div>
                   <p className="font-mono text-[14px] text-white/90">{formatPrice(selectedVariant.basePrice)}</p>
                </div>
                
                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between items-end pb-3 border-b border-white/5">
                     <div>
                       <p className="text-[11px] uppercase tracking-widest text-renox-muted mb-0.5">Add-ons</p>
                       <p className="font-medium text-[14px] text-renox-copper/90">{selectedAddOns.length} Item(s) Selected</p>
                     </div>
                     <p className="font-mono text-[14px] text-renox-copper/90">
                       {formatPrice(totalPrice - selectedVariant.basePrice)}
                     </p>
                  </div>
                )}

                <div className="flex justify-between items-end pt-2">
                   <div>
                     <p className="text-[12px] uppercase tracking-widest text-white/60 mb-1">Estimated Total</p>
                   </div>
                   {/* Key to force re-render animation on price change */}
                   <p key={totalPrice} className="font-mono text-3xl font-bold text-white tracking-tight animate-fade-up" style={{ animationDuration: '300ms' }}>
                     {formatPrice(totalPrice)}
                   </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-renox-copper hover:bg-[#ff8f4a] text-black font-semibold text-[15px] py-3.5 rounded-[12px] flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] shadow-[0_10px_20px_rgba(255,122,50,0.15)]"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-transparent border border-renox-copper/30 hover:border-renox-copper text-white hover:text-renox-copper font-medium text-[15px] py-3.5 rounded-[12px] flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_0_15px_rgba(255,122,50,0.1)] group"
                >
                  <svg className="w-[18px] h-[18px] text-white/80 group-hover:text-renox-copper transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M16.5 16c-.5.5-1.5.5-2 .5-3-1.5-5-3.5-6.5-6.5-.5-.5-.5-1.5 0-2l.5-.5a2 2 0 0 0 0-2.8L7.1 3.3a2 2 0 0 0-2.8 0L3.8 3.8c-.5.5-.8 1.2-.5 2 1.5 6.5 6 11 12.5 12.5.8.3 1.5 0 2-.5l.5-.5a2 2 0 0 0 0-2.8l-1.4-1.4a2 2 0 0 0-2.8 0l-.6.6z"/></svg>
                  Order on WhatsApp
                </button>
              </div>
              <p className="text-center text-[11px] text-renox-muted mt-5">Prices shown in PKR. Delivery charges may apply.</p>
            </div>
          </div>

        </div>
      </main>

      {/* Success Toast */}
      {isAddedToCart && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-[#050505] border border-renox-copper/50 text-white px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(255,122,50,0.15)] z-50 flex items-center gap-3 animate-fade-up backdrop-blur-xl">
          <div className="w-6 h-6 rounded-full bg-renox-copper text-black flex items-center justify-center">
             <Check size={14} strokeWidth={4} />
          </div>
          <span className="font-medium text-sm tracking-wide">Renox One added to your cart.</span>
        </div>
      )}

      {/* Mobile Bottom Purchase Bar (only visible on mobile screens below lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#050505]/90 backdrop-blur-xl border-t border-white/10 p-4 pb-safe z-40 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <p className="text-[10px] text-renox-muted uppercase tracking-wider mb-0.5">{selectedVariant.storage} | {selectedColor}</p>
          <p className="text-lg font-mono font-bold text-white">{formatPrice(totalPrice)}</p>
        </div>
        <button 
          onClick={handleAddToCart}
          className="bg-renox-copper text-black font-semibold text-sm px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(255,122,50,0.2)] active:scale-95 transition-transform"
        >
          Add to Cart
        </button>
      </div>

      <Footer />
    </div>
  );
}
