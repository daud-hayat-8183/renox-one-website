"use client";

import React, { useState, useRef, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SupportPage() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

    // Form Animation
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // FAQ Animation
    if (faqRef.current) {
      gsap.fromTo(faqRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "71b458fc-2f8f-444b-89c7-ea92b3580eca");
    formData.append("subject", "New VIP Support Inquiry from Renox Website");
    formData.append("from_name", "Renox VIP Concierge");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormState("success");
      } else {
        console.error("Web3Forms Error:", data);
        setFormState("idle");
        alert("We encountered an error dispatching your request. Please try emailing us directly.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setFormState("idle");
      alert("Network error. Please check your connection and try again.");
    }
  };

  const faqs = [
    {
      question: "How does the 2-Year RenoxCare Warranty work?",
      answer: "Every Renox One comes with our comprehensive 2-Year RenoxCare Warranty. This covers any manufacturing defects worldwide. Additionally, the first 6 months of ownership include complimentary accidental screen protection."
    },
    {
      question: "How can I track my device delivery?",
      answer: "Once your Renox One has been crafted and dispatched, you will receive a secure tracking link via email and WhatsApp. Our priority nationwide delivery ensures you receive your device by the next business day after dispatch."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 14-day premium return window. If your Renox One does not perfectly fit your creative lifestyle, simply contact our support team to arrange a secure, complimentary return pickup in its original packaging."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we offer priority direct-to-door delivery across all major cities in Pakistan. We are rapidly expanding our distribution networks for global delivery. Contact our VIP support for special international export requests."
    }
  ];

  return (
    <>
      <Header />
      <main ref={containerRef} className="min-h-screen bg-renox-black text-renox-ivory font-sans pt-40 pb-32">
        
        {/* Hero Section */}
        <div ref={heroRef} className="max-w-[1200px] mx-auto px-6 md:px-20 text-center mb-24 opacity-0">
          <span className="block text-renox-copper tracking-widest text-sm md:text-base font-semibold uppercase mb-4">RENOX VIP SUPPORT</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-renox-ivory mb-6 leading-tight">We are here for you.</h1>
          <p className="text-xl md:text-2xl text-renox-muted max-w-2xl mx-auto">
            Exceptional products demand exceptional service. Reach out to our dedicated support concierges for any assistance.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          
          <a ref={el => { cardsRef.current[0] = el; }} href="https://wa.me/923295129250" target="_blank" rel="noopener noreferrer" className="opacity-0 group bg-renox-charcoal border border-renox-line rounded-3xl p-8 hover:border-renox-copper/50 hover:bg-renox-surface transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-renox-surface border border-renox-line rounded-full flex items-center justify-center mb-6 group-hover:border-renox-copper group-hover:text-renox-copper text-renox-ivory transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </div>
            <h3 className="text-xl font-display font-semibold mb-2 text-renox-ivory">WhatsApp</h3>
            <p className="text-renox-muted text-sm mb-4">Instant priority messaging with our concierge team.</p>
            <p className="text-renox-copper font-mono text-sm">+92 329 5129250</p>
          </a>

          <a ref={el => { cardsRef.current[1] = el; }} href="mailto:daudhayat51@gmail.com" className="opacity-0 group bg-renox-charcoal border border-renox-line rounded-3xl p-8 hover:border-renox-copper/50 hover:bg-renox-surface transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-renox-surface border border-renox-line rounded-full flex items-center justify-center mb-6 group-hover:border-renox-copper group-hover:text-renox-copper text-renox-ivory transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <h3 className="text-xl font-display font-semibold mb-2 text-renox-ivory">Email</h3>
            <p className="text-renox-muted text-sm mb-4">For detailed inquiries, press, and enterprise orders.</p>
            <p className="text-renox-copper font-mono text-sm">daudhayat51@gmail.com</p>
          </a>

          <a ref={el => { cardsRef.current[2] = el; }} href="https://www.instagram.com/daud_hayat_/" target="_blank" rel="noopener noreferrer" className="opacity-0 group bg-renox-charcoal border border-renox-line rounded-3xl p-8 hover:border-renox-copper/50 hover:bg-renox-surface transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-renox-surface border border-renox-line rounded-full flex items-center justify-center mb-6 group-hover:border-renox-copper group-hover:text-renox-copper text-renox-ivory transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
            <h3 className="text-xl font-display font-semibold mb-2 text-renox-ivory">Instagram</h3>
            <p className="text-renox-muted text-sm mb-4">Follow our journey and shoot us a direct message.</p>
            <p className="text-renox-copper font-mono text-sm">@daud_hayat_</p>
          </a>

        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Contact Form */}
          <div ref={formRef} className="opacity-0 bg-renox-charcoal p-8 md:p-12 rounded-[32px] border border-renox-line relative overflow-hidden">
             {/* Glow */}
             <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-renox-copper/10 blur-[80px] pointer-events-none rounded-full"></div>
             
             <h2 className="text-3xl font-display font-bold text-renox-ivory mb-2">Send us a message</h2>
             <p className="text-renox-muted mb-8">Our concierge team aims to respond to all inquiries within 2 hours during business hours.</p>

             {formState === "success" ? (
               <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                 <div className="w-16 h-16 bg-renox-copper/10 border border-renox-copper text-renox-copper rounded-full flex items-center justify-center mb-6">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                 </div>
                 <h3 className="text-2xl font-display font-bold text-renox-ivory mb-2">Message Sent</h3>
                 <p className="text-renox-muted">Thank you for reaching out. A Renox representative will be with you shortly.</p>
                 <button 
                   onClick={() => setFormState("idle")}
                   className="mt-8 text-renox-copper hover:text-renox-ivory transition-colors text-sm font-semibold tracking-wider uppercase"
                 >
                   Send another message
                 </button>
               </div>
             ) : (
               <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div className="flex flex-col gap-2">
                     <label className="text-xs font-semibold tracking-wider text-renox-muted uppercase">First Name</label>
                     <input required name="First Name" type="text" className="bg-[#080808] border border-renox-line rounded-xl px-4 py-3 text-renox-ivory focus:outline-none focus:border-renox-copper/60 transition-colors placeholder:text-renox-muted/40" placeholder="John" />
                   </div>
                   <div className="flex flex-col gap-2">
                     <label className="text-xs font-semibold tracking-wider text-renox-muted uppercase">Last Name</label>
                     <input required name="Last Name" type="text" className="bg-[#080808] border border-renox-line rounded-xl px-4 py-3 text-renox-ivory focus:outline-none focus:border-renox-copper/60 transition-colors placeholder:text-renox-muted/40" placeholder="Doe" />
                   </div>
                 </div>
                 
                 <div className="flex flex-col gap-2">
                   <label className="text-xs font-semibold tracking-wider text-renox-muted uppercase">Email Address</label>
                   <input required name="Email" type="email" className="bg-[#080808] border border-renox-line rounded-xl px-4 py-3 text-renox-ivory focus:outline-none focus:border-renox-copper/60 transition-colors placeholder:text-renox-muted/40" placeholder="hello@example.com" />
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-xs font-semibold tracking-wider text-renox-muted uppercase">Inquiry Type</label>
                   <div className="relative">
                     <select required name="Inquiry Type" className="w-full bg-[#080808] border border-renox-line rounded-xl px-4 py-3 text-renox-ivory appearance-none focus:outline-none focus:border-renox-copper/60 transition-colors">
                       <option value="">Select a topic</option>
                       <option value="Sales & Ordering">Sales & Ordering</option>
                       <option value="Technical Support">Technical Support</option>
                       <option value="Warranty Claim">Warranty Claim</option>
                       <option value="Press & Other">Press & Other</option>
                     </select>
                     <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-renox-muted">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                     </div>
                   </div>
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-xs font-semibold tracking-wider text-renox-muted uppercase">Message</label>
                   <textarea required name="Message" rows={4} className="bg-[#080808] border border-renox-line rounded-xl px-4 py-3 text-renox-ivory focus:outline-none focus:border-renox-copper/60 transition-colors placeholder:text-renox-muted/40 resize-none" placeholder="How can we help you today?"></textarea>
                 </div>

                 <button 
                   type="submit" 
                   disabled={formState === "submitting"}
                   className="mt-4 w-full bg-renox-copper text-renox-black font-semibold py-4 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                 >
                   {formState === "submitting" ? (
                     <>
                       <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-renox-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       Processing...
                     </>
                   ) : "Submit Request"}
                 </button>
               </form>
             )}
          </div>

          {/* FAQs */}
          <div ref={faqRef} className="opacity-0 flex flex-col justify-center">
             <span className="block text-renox-copper tracking-widest text-sm font-semibold uppercase mb-4">KNOWLEDGE BASE</span>
             <h2 className="text-3xl font-display font-bold text-renox-ivory mb-8">Frequently Asked Questions</h2>
             
             <div className="flex flex-col gap-4">
               {faqs.map((faq, index) => (
                 <div 
                   key={index} 
                   className={cn(
                     "border border-renox-line rounded-2xl overflow-hidden transition-colors duration-300",
                     openFaq === index ? "bg-renox-charcoal border-renox-copper/30" : "bg-transparent hover:border-renox-line/80"
                   )}
                 >
                   <button 
                     onClick={() => setOpenFaq(openFaq === index ? null : index)}
                     className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                   >
                     <span className="font-semibold text-renox-ivory">{faq.question}</span>
                     <div className={cn(
                       "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ml-4",
                       openFaq === index ? "border-renox-copper text-renox-copper bg-renox-copper/10" : "border-renox-line text-renox-muted"
                     )}>
                       {openFaq === index ? (
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                       ) : (
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                       )}
                     </div>
                   </button>
                   <div 
                     className={cn(
                       "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                       openFaq === index ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                     )}
                   >
                     <p className="text-renox-muted text-sm leading-relaxed">{faq.answer}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
