"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#050505] relative border-t border-white/10 overflow-hidden font-sans">
      
      {/* Subtle copper radial glow behind brand area */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-renox-copper/5 blur-[120px] pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-[72px] pb-[28px] relative z-10">
        
        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* LEFT BRAND AREA - 4 Columns */}
          <div className="col-span-1 md:col-span-12 lg:col-span-4 flex flex-col items-start relative">
            <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-renox-copper/50 to-transparent -ml-6 hidden lg:block"></div>
            
            <Link href="/" className="text-4xl font-display font-bold tracking-tight text-white mb-6">
              RENOX
            </Link>
            <h2 className="text-xl font-display font-semibold text-white mb-2 tracking-wide">
              Designed to Be Explored.
            </h2>
            <p className="text-renox-muted text-sm leading-relaxed mb-8 max-w-sm">
              Premium mobile technology, designed in Pakistan.
            </p>
            
            <div className="flex items-center gap-4 mt-auto">
              <a href="https://www.instagram.com/daud_hayat_/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-renox-line flex items-center justify-center text-renox-muted hover:text-renox-copper hover:border-renox-copper/50 hover:bg-renox-copper/10 hover:-translate-y-1 transition-all duration-300 shadow-[inset_0_0_0_0_rgba(255,122,50,0)] hover:shadow-[inset_0_0_20px_0_rgba(255,122,50,0.15)]" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/923295129250" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-renox-line flex items-center justify-center text-renox-muted hover:text-renox-copper hover:border-renox-copper/50 hover:bg-renox-copper/10 hover:-translate-y-1 transition-all duration-300 shadow-[inset_0_0_0_0_rgba(255,122,50,0)] hover:shadow-[inset_0_0_20px_0_rgba(255,122,50,0.15)]" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M16.5 16c-.5.5-1.5.5-2 .5-3-1.5-5-3.5-6.5-6.5-.5-.5-.5-1.5 0-2l.5-.5a2 2 0 0 0 0-2.8L7.1 3.3a2 2 0 0 0-2.8 0L3.8 3.8c-.5.5-.8 1.2-.5 2 1.5 6.5 6 11 12.5 12.5.8.3 1.5 0 2-.5l.5-.5a2 2 0 0 0 0-2.8l-1.4-1.4a2 2 0 0 0-2.8 0l-.6.6z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-renox-line flex items-center justify-center text-renox-muted hover:text-renox-copper hover:border-renox-copper/50 hover:bg-renox-copper/10 hover:-translate-y-1 transition-all duration-300 shadow-[inset_0_0_0_0_rgba(255,122,50,0)] hover:shadow-[inset_0_0_20px_0_rgba(255,122,50,0.15)]" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.4 5 4.3 3.1 5.8 1.6 7.6 1.6 8.5 1.5 12 1.2 15.5 1.5 16.4 1.6 18.2 1.6 20 3.1 21.5 5 23.4 7.1 23.5 12 23.5 12s0 4.9-1.9 7.1c-1.5 1.9-3.3 1.9-4.2 2-2.5.2-6.5.2-9 0-.9-.1-2.7-.1-4.2-2C1.5 16.9 1.5 12 1.5 12s0-4.9 1-4.9z"/><polygon points="9.5 8 9.5 16 16.5 12"/></svg>
              </a>
            </div>
          </div>

          {/* MIDDLE NAVIGATION AREA - 4 Columns */}
          <div className="col-span-1 md:col-span-6 lg:col-span-4 grid grid-cols-2 gap-8">
            {/* Shop */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-white mb-2">Shop</h3>
              <Link href="/cart" className="text-renox-muted hover:text-renox-copper text-sm transition-all duration-300 hover:translate-x-1">Renox One</Link>
              <Link href="/cart" className="text-renox-muted hover:text-renox-copper text-sm transition-all duration-300 hover:translate-x-1">Accessories</Link>
              <Link href="/order" className="text-renox-muted hover:text-renox-copper text-sm transition-all duration-300 hover:translate-x-1">Compare Variants</Link>
              <Link href="/order" className="text-renox-muted hover:text-renox-copper text-sm transition-all duration-300 hover:translate-x-1">Order Now</Link>
            </div>

            {/* Support */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-white mb-2">Support</h3>
              <Link href="/support" className="text-renox-muted hover:text-renox-copper text-sm transition-all duration-300 hover:translate-x-1">Contact Us</Link>
              <Link href="/warranty" className="text-renox-muted hover:text-renox-copper text-sm transition-all duration-300 hover:translate-x-1">Warranty</Link>
              <Link href="/returns" className="text-renox-muted hover:text-renox-copper text-sm transition-all duration-300 hover:translate-x-1">Delivery & Returns</Link>
              <Link href="/privacy" className="text-renox-muted hover:text-renox-copper text-sm transition-all duration-300 hover:translate-x-1">Privacy Policy</Link>
              <Link href="/terms" className="text-renox-muted hover:text-renox-copper text-sm transition-all duration-300 hover:translate-x-1">Terms & Conditions</Link>
            </div>
          </div>

          {/* RIGHT CONTACT AREA - 4 Columns */}
          <div className="col-span-1 md:col-span-6 lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-white mb-2">Contact</h3>
            
            <a href="https://www.instagram.com/daud_hayat_/" target="_blank" rel="noopener noreferrer" className="text-renox-muted hover:text-renox-copper text-sm transition-all duration-300 hover:translate-x-1 flex items-center gap-3 w-fit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span>@daud_hayat_</span>
            </a>
            
            <a href="https://wa.me/923295129250" target="_blank" rel="noopener noreferrer" className="text-renox-muted hover:text-renox-copper text-sm transition-all duration-300 hover:translate-x-1 flex items-center gap-3 w-fit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span>+92 329 5129250</span>
            </a>
            
            <a href="mailto:daudhayat51@gmail.com" className="text-renox-muted hover:text-renox-copper text-sm transition-all duration-300 hover:translate-x-1 flex items-center gap-3 w-fit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>daudhayat51@gmail.com</span>
            </a>
            
            <div className="text-renox-muted text-sm flex items-center gap-3 mt-1 cursor-default">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Pakistan</span>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-6 mt-16 flex flex-col md:flex-row justify-between items-center gap-6 relative">
          <p className="text-[#888888] text-[11px] tracking-wide order-2 md:order-1">
            © 2026 RENOX. All rights reserved.
          </p>
          <p className="text-[#888888] text-[11px] tracking-wide text-center order-1 md:order-2">
            Designed in Pakistan · Renox One availability and specifications may vary.
          </p>
        </div>

      </div>
    </footer>
  );
}
