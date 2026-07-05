"use client";

import React, { useRef, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TermsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !heroRef.current) return;
    
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    if (contentRef.current) {
      const sections = contentRef.current.querySelectorAll('.legal-section');
      sections.forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            }
          }
        );
      });
    }
  }, []);

  return (
    <>
      <Header />
      <main ref={containerRef} className="min-h-screen bg-renox-black text-renox-ivory font-sans pt-40 pb-32">
        
        <div ref={heroRef} className="max-w-[800px] mx-auto px-6 md:px-12 mb-20 opacity-0">
          <span className="block text-renox-copper tracking-widest text-sm font-semibold uppercase mb-4">RENOX POLICIES</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-renox-ivory mb-6 leading-tight">Terms of Service</h1>
          <p className="text-lg md:text-xl text-renox-muted leading-relaxed mb-4">
            These terms govern your use of the Renox website, products, and VIP concierge services. By purchasing a Renox device or accessing our platform, you agree to these legal terms.
          </p>
          <p className="text-sm text-renox-copper font-mono">Last Updated: July 2026</p>
        </div>

        <div ref={contentRef} className="max-w-[800px] mx-auto px-6 md:px-12 space-y-16">
          
          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">1. Agreement to Terms</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p>
                By accessing this website, purchasing the Renox One, or utilizing any Renox software or services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services or purchase our products.
              </p>
            </div>
          </section>

          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">2. Product Purchases & Pricing</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p>
                All prices are listed in Pakistani Rupees (PKR) and include applicable local taxes unless stated otherwise. We reserve the right to modify prices, product specifications, and availability without prior notice. 
              </p>
              <p>
                A purchase contract is only formed when we dispatch your device and send a dispatch confirmation. We reserve the right to refuse or cancel any order for reasons including, but not limited to, suspected fraud, bulk purchasing violations, or stock limitations.
              </p>
            </div>
          </section>

          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">3. Intellectual Property</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p className="text-renox-muted leading-relaxed">
                All content included on the Website, such as text, graphics, logos, images, audio clips, video clips, data compilations, and software, is the exclusive property of RENOX or its content suppliers and is protected by international copyright and trademark laws. You may not extract, reproduce, or use any of the contents without our express written consent. &quot;RENOX&quot; and &quot;Renox One&quot; are registered trademarks.
              </p>
            </div>
          </section>

          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">4. Limitation of Liability</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p>
                To the maximum extent permitted by law, Renox shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or services, including data loss or business interruption.
              </p>
              <p>
                Our total liability shall not exceed the total amount paid by you for the specific product or service causing the claim.
              </p>
            </div>
          </section>

          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">5. Governing Law</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p>
                These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in Islamabad, Pakistan.
              </p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
