"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { renoxOneVariants, renoxOneAddOns } from "@/data/renoxOne";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { generateWhatsAppMessage } from "@/lib/whatsapp";
import gsap from "gsap";

type CartData = {
  variantId: string;
  color: string;
  addOns: string[];
  quantity: number;
  totalPrice: number;
};

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState<CartData | null>(null);

  const cartLeftRef = React.useRef<HTMLDivElement>(null);
  const cartRightRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const savedCart = localStorage.getItem("renoxCart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted || !cart) return;
    const ctx = gsap.context(() => {
      if (cartLeftRef.current) {
        gsap.fromTo(cartLeftRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.1 }
        );
      }
      if (cartRightRef.current) {
        gsap.fromTo(cartRightRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
        );
      }
    });
    return () => ctx.revert();
  }, [mounted, cart]);

  const removeAddOn = (idToRemove: string) => {
    if (!cart) return;
    const newAddOns = cart.addOns.filter(id => id !== idToRemove);
    const variant = renoxOneVariants.find(v => v.id === cart.variantId) || renoxOneVariants[0];
    const newTotal = variant.basePrice + newAddOns.reduce((sum, id) => {
      const addon = renoxOneAddOns.find(a => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);

    const newCart = { ...cart, addOns: newAddOns, totalPrice: newTotal };
    setCart(newCart);
    localStorage.setItem("renoxCart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart(null);
    localStorage.removeItem("renoxCart");
  };

  const handleWhatsAppCheckout = () => {
    if (!cart) return;
    const variant = renoxOneVariants.find(v => v.id === cart.variantId);
    if (!variant) return;

    generateWhatsAppMessage({
      variantId: cart.variantId,
      color: cart.color,
      addOns: cart.addOns,
      quantity: cart.quantity,
      totalPrice: cart.totalPrice
    });
  };

  if (!mounted) return null; // Prevent hydration mismatch

  if (!cart) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-20">
          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-white/20">
            <ShoppingBag size={40} strokeWidth={1} />
          </div>
          <h1 className="text-3xl font-display font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-renox-muted max-w-md mx-auto mb-8">
            You haven&apos;t configured a Renox One yet. Discover the ultimate flagship experience.
          </p>
          <Link 
            href="/order"
            className="bg-renox-copper hover:bg-[#ff8f4a] text-black font-semibold text-sm px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,122,50,0.15)] hover:-translate-y-0.5"
          >
            Configure Renox One
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const variant = renoxOneVariants.find(v => v.id === cart.variantId) || renoxOneVariants[0];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 pt-32 pb-24">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
          <h1 className="text-3xl md:text-4xl font-display font-bold">Review Your Bag.</h1>
          <Link href="/order" className="text-sm text-renox-copper hover:text-[#ff8f4a] transition-colors hidden md:block">
            Continue Configuring
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: Cart Items (7 cols) */}
          <div ref={cartLeftRef} className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Main Product */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-8 relative overflow-hidden group opacity-0">
               <div className="absolute top-4 right-4 z-10">
                 <button onClick={clearCart} className="text-renox-muted hover:text-red-400 transition-colors p-2" aria-label="Remove Product">
                   <Trash2 size={16} />
                 </button>
               </div>
               
               <div className="w-full md:w-40 aspect-square bg-black rounded-xl border border-white/5 flex items-center justify-center overflow-hidden flex-shrink-0 p-4 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/products/carousel/dual-device.png" alt="Renox One" className="w-full h-full object-contain object-center scale-110" />
               </div>
               
               <div className="flex flex-col flex-1 justify-center">
                 <h2 className="text-xl font-bold mb-1">Renox One</h2>
                 <p className="text-sm text-renox-muted mb-4">{variant.name}</p>
                 
                 <div className="flex flex-col gap-1 mb-6">
                   <p className="text-xs text-renox-muted"><span className="text-white/70">Colour:</span> {cart.color}</p>
                   <p className="text-xs text-renox-muted"><span className="text-white/70">Memory:</span> {variant.ram}</p>
                   <p className="text-xs text-renox-muted"><span className="text-white/70">Storage:</span> {variant.storage}</p>
                 </div>
                 
                 <div className="mt-auto font-mono text-lg font-semibold text-white">
                   {formatPrice(variant.basePrice)}
                 </div>
               </div>
            </div>

            {/* Add-ons */}
            {cart.addOns.length > 0 && (
              <div className="flex flex-col gap-4 opacity-0">
                <h3 className="text-xs font-bold uppercase tracking-widest text-renox-muted">Included Add-ons</h3>
                
                {cart.addOns.map(addonId => {
                  const addon = renoxOneAddOns.find(a => a.id === addonId);
                  if (!addon) return null;
                  
                  return (
                    <div key={addon.id} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 flex items-center gap-4 group">
                      <div className="flex-1">
                        <p className="text-base font-semibold">{addon.name}</p>
                        <p className="font-mono text-sm text-renox-copper mt-1">{formatPrice(addon.price)}</p>
                      </div>
                      <button 
                        onClick={() => removeAddOn(addon.id)}
                        className="text-renox-muted/50 hover:text-white transition-colors p-2"
                        aria-label="Remove Add-on"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            
            <Link href="/order" className="text-sm text-renox-copper hover:text-[#ff8f4a] transition-colors md:hidden text-center mt-4">
              Continue Configuring
            </Link>
          </div>

          {/* RIGHT: Order Summary (5 cols) */}
          <div ref={cartRightRef} className="lg:col-span-5 opacity-0">
            <div className="bg-[#050505] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl sticky top-32">
              <h3 className="text-lg font-bold mb-6">Summary</h3>
              
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-renox-muted">Subtotal</span>
                  <span className="font-mono text-white">{formatPrice(variant.basePrice)}</span>
                </div>
                {cart.addOns.length > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-renox-muted">Add-ons ({cart.addOns.length})</span>
                    <span className="font-mono text-white">
                      {formatPrice(cart.totalPrice - variant.basePrice)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-renox-muted">Delivery</span>
                  <span className="text-white">Calculated next</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-end">
                <span className="text-base font-semibold">Total</span>
                <span className="text-2xl font-mono font-bold">{formatPrice(cart.totalPrice)}</span>
              </div>

              <button 
                onClick={handleWhatsAppCheckout}
                className="w-full bg-renox-copper hover:bg-[#ff8f4a] text-black font-semibold text-[15px] py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_10px_20px_rgba(255,122,50,0.15)] group"
              >
                Checkout via WhatsApp
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-[11px] text-renox-muted text-center mt-4 leading-relaxed">
                You will be redirected to WhatsApp to confirm delivery details with our team. No payment is taken right now.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
