"use client";

import React, { useRef, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ReturnsPage() {
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
          <h1 className="text-4xl md:text-6xl font-display font-bold text-renox-ivory mb-6 leading-tight">Delivery & Returns</h1>
          <p className="text-lg md:text-xl text-renox-muted leading-relaxed">
            We are committed to providing a premium unboxing experience, starting from the moment your Renox One leaves our facility to the moment it arrives at your door.
          </p>
        </div>

        <div ref={contentRef} className="max-w-[800px] mx-auto px-6 md:px-12 space-y-16">
          
          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">1. Priority Nationwide Delivery</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p>
                Every Renox One order includes complimentary Priority Nationwide Delivery across all major cities in Pakistan. We partner exclusively with premium secure logistics providers to ensure your device is handled with the utmost care.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong className="text-renox-ivory">Dispatch Time:</strong> Orders placed before 2:00 PM (PKT) are dispatched the same business day.</li>
                <li><strong className="text-renox-ivory">Delivery Window:</strong> 1-2 business days for major metropolitan areas (Karachi, Lahore, Islamabad).</li>
                <li><strong className="text-renox-ivory">Secure Handover:</strong> Your delivery requires a matching ID signature upon arrival. We do not leave premium electronics unattended.</li>
              </ul>
            </div>
          </section>

          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">2. Order Tracking</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p>
                As soon as your Renox One is prepared for shipment, you will receive a dispatch confirmation email and a WhatsApp notification containing your secure tracking link. You can monitor the real-time location of your package through our logistics partner&apos;s portal.
              </p>
            </div>
          </section>

          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">3. The 14-Day Premium Return Policy</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p>
                We believe the Renox One will fundamentally change how you interact with technology. However, if you are not entirely satisfied with your purchase, you may initiate a return within 14 calendar days from the date of delivery.
              </p>
              <p className="text-renox-muted leading-relaxed">
                A full refund will be processed within 5-7 business days of receiving and inspecting the returned item. Refunds will be issued to the original payment method. Please note that original delivery charges are non-refundable unless the return is due to a defect on our part. We don&apos;t charge restocking fees.
              </p>
              <p>
                To qualify for a full refund, the device must meet the following criteria:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>The device must be in pristine, &quot;like-new&quot; cosmetic condition with no scratches, dents, or signs of wear.</li>
                <li>All original accessories (charging cables, adapters, manuals) must be included and undamaged.</li>
                <li>The device must be returned in its original, undamaged retail packaging.</li>
                <li>The device must be factory reset, and all personal accounts and locks must be removed prior to return.</li>
              </ul>
            </div>
          </section>

          <section className="legal-section opacity-0">
            <h2 className="text-2xl font-display font-bold text-renox-ivory mb-6 border-b border-renox-line pb-4">4. How to Initiate a Return</h2>
            <div className="space-y-4 text-renox-muted leading-relaxed">
              <p className="text-renox-muted leading-relaxed">
                For all return inquiries, please contact our support team at <a href="mailto:support@renox.com" className="text-renox-copper hover:underline">support@renox.com</a> or via WhatsApp with the subject &quot;Return Request - [Your Order Number]&quot;.
              </p>
              <p>
                Once approved, we will schedule a complimentary secure pickup from your location. You do not need to visit a shipping center. Upon receiving and inspecting the returned device at our facility, refunds are processed within 5-7 business days to the original payment method.
              </p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
