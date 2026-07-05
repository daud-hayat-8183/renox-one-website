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

export default function PrivacyPage() {
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
          <h1 className="text-4xl md:text-6xl font-display font-bold text-renox-ivory mb-6 leading-tight">Privacy Policy</h1>
          <p className="text-lg md:text-xl text-renox-muted leading-relaxed mb-4">
            At Renox, we believe privacy is a fundamental human right. We design our hardware, software, and services to protect your personal information at every level.
          </p>
          <p className="text-sm text-renox-copper font-mono">Last Updated: July 2026</p>
        </div>

        <div ref={contentRef} className="max-w-[800px] mx-auto px-6 md:px-12 space-y-16">
          
          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">1. Data Minimization</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p>
                We collect only the data necessary to deliver and improve our premium products and services. When you browse the Renox website, purchase a Renox One, or interact with our concierge team, we collect specific details such as your name, email address, physical address, and payment information.
              </p>
              <p>
                We do not collect unnecessary tracking telemetry from your Renox One device without your explicit, opt-in consent.
              </p>
            </div>
          </section>

          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">2. Device Security</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p>
                Your personal data, including biometrics, passwords, and local files, are encrypted by default on the Renox One hardware. We do not hold the decryption keys to your personal on-device data. This means Renox cannot access your private files, and we cannot turn them over to third parties.
              </p>
            </div>
          </section>

          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">3. Data Sharing</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p>
                Renox does not sell your personal data. We only share data with trusted third-party service providers (such as secure payment processors and verified logistics partners) strictly for the purpose of fulfilling your orders. These partners are legally bound to protect your data with the same rigorous standards as Renox.
              </p>
            </div>
          </section>

          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">4. Cookies and Web Tracking</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p>
                Our website uses essential cookies required for basic functionality, such as maintaining your session during the checkout process. We use privacy-respecting, anonymized analytics to understand how our website performs. We do not use third-party invasive advertising trackers.
              </p>
            </div>
          </section>

          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">5. Your Privacy Rights</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p>
                Depending on your jurisdiction, you have the right to request access to, correction of, or deletion of the personal data we hold about you. You may also request a copy of your data in a structured, machine-readable format.
              </p>
              <p>
                For instructions on how to exercise these rights, please see the &quot;Contact Us&quot; section below or contact our privacy compliance team via the <Link href="/support" className="text-renox-copper hover:underline">Support Page</Link> with the subject &quot;Privacy Inquiry&quot;.
              </p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
