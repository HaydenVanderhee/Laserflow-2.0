import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Activity, Check, ChevronDown, Target, Magnet, Zap, PhoneOff, UserCheck, LayoutTemplate, Database, Star, Search } from "lucide-react";
import { Link } from "wouter";
import { LogoIcon } from "../components/LogoIcon";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);


  // B. Hero Interactivity State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // C. FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    {
      question: "Do you make personalised services for us?",
      answer: "Nothing we deliver is copy and paste. Every ad campaign, AI agent, and system we build starts from a proven niche-specific blueprint tailored to your exact service type — whether that's LHR, Botox, fillers, or skincare — and is then custom-built around your clinic's unique brand, pricing, and workflows."
    },
    {
      question: "Can I customize the AI responses for my clinic?",
      answer: "Yes. We don't use generic templates. We train the AI specifically on your clinic's pricing, your specific clinic's services, down to the tools you use, and your cancellation policies."
    },
    {
      question: "What happens if a lead asks a complex medical question?",
      answer: "The AI is strictly bound by your medical guidelines. If a patient asks a complex clinical question, the system instantly pauses and routes the conversation to your staff dashboard for human review."
    },
    {
      question: "Will this replace my front desk staff?",
      answer: "No. This system relieves your staff from answering the same 15 pricing questions all day. It handles the 24/7 triage so your team can focus on in-person patient care and closing high-ticket packages."
    },
    {
      question: "How fast can you set this up for my clinic?",
      answer: "Once we map your workflows on our Strategy Call, the entire acquisition engine is typically built, tested, and deployed within 14 days."
    },
    {
      question: "How does LaserFlow integrate with my existing systems?",
      answer: "We integrate directly with major CRM and booking platforms to drop appointments right onto your active calendar without double-booking."
    },
    {
      question: "Is my client data secure and HIPAA compliant?",
      answer: "Absolutely. Our architecture utilizes enterprise-grade encryption and HIPAA-compliant data routing to ensure all patient information remains strictly confidential."
    },
    {
      question: "Do you offer a guarantee?",
      answer: "Yes. We exclusively partner with aesthetic clinics, which means our system is proven. We guarantee we will increase your bookings by 30% in 90 days, or we work with you for free until you do."
    }
  ];

  // D. Feature 1: Triage Engine Cards State
  const [triageCards, setTriageCards] = useState([
    { id: 1, time: "23:42", name: "Sarah M.", intent: "Botox - Forehead & Frown", status: "Booked" },
    { id: 2, time: "21:15", name: "Jessica T.", intent: "Full Body LHR", status: "Booked" },
    { id: 3, time: "19:30", name: "Emily R.", intent: "Dermal Filler - Lips", status: "Booked" },
  ]);

  useEffect(() => {
    const services = ["LHR Consultation", "Botox - Forehead", "Dermal Filler - Lips", "Skin Rejuvenation", "Anti-Wrinkle Consult", "Full Body LHR", "Lip Filler Top-Up"];
    let serviceIndex = 0;
    const interval = setInterval(() => {
      setTriageCards((prev) => {
        const newCard = {
          id: Date.now(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          name: "New Lead",
          intent: services[serviceIndex % services.length],
          status: "Processing"
        };
        serviceIndex++;
        return [newCard, ...prev.slice(0, 2)];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // C. Feature 2: Typing Text State
  const [typingText, setTypingText] = useState("");
  const fullSms = "Hi Sarah, completely understand. Many of our clients feel the exact same way initially! Our machines use advanced cooling tech so it's practically painless, and our nurses are incredibly discreet. Would you like to hop on a quick 5-min phone call to chat about it?";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTypingText(fullSms.slice(0, i));
      i++;
      if (i > fullSms.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    // A. Navbar Scroll Effect
    ScrollTrigger.create({
      start: "top -50",
      end: 99999,
      toggleClass: { className: "bg-[#0D0D12]/60 backdrop-blur-xl border-white/10 shadow-xl", targets: ".laser-nav" }
    });

    // B. Hero Animation
    gsap.from(".hero-element", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2
    });

    // D. Philosophy Reveal
    gsap.from(".philosophy-text", {
      scrollTrigger: {
        trigger: ".philosophy-section",
        start: "top 70%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    });

    // E. Protocol Stacking Cards (Removed for static infographic layout)
  }, { scope: container });

  return (
    <div ref={container} className="bg-[#0D0D12] min-h-screen text-[#FAF8F5] selection:bg-[#48CFCB] selection:text-[#0D0D12] font-['Inter',sans-serif] overflow-clip">



      {/* B. HERO SECTION */}
      <section
        className="relative min-h-[85dvh] w-full flex items-center pt-24 pb-16 px-6 md:px-20 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Interactive Mouse Glow */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(72,207,203,0.15), transparent 45%)`
          }}
        />

        {/* Abstract Floating Data Nodes */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-[#48CFCB]/40 rounded-full shadow-[0_0_15px_#48CFCB] animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute top-[60%] left-[10%] w-1 h-1 bg-[#48CFCB]/30 rounded-full shadow-[0_0_10px_#48CFCB] animate-[pulse_3s_ease-in-out_infinite_reverse]" />
          <div className="absolute top-[30%] right-[20%] w-3 h-3 bg-[#48CFCB]/20 rounded-full shadow-[0_0_20px_#48CFCB] animate-[pulse_5s_ease-in-out_infinite]" />
          <div className="absolute top-[70%] right-[15%] w-1.5 h-1.5 bg-[#48CFCB]/50 rounded-full shadow-[0_0_10px_#48CFCB] animate-[pulse_6s_ease-in-out_infinite_reverse]" />
        </div>

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(72,207,203,0.15),transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>

        <div className="relative z-20 w-full max-w-4xl mx-auto text-center">
          <p className="hero-element font-bold text-[#48CFCB] tracking-widest uppercase mb-6 text-[11px] md:text-xs border border-[#48CFCB]/30 bg-[#0D0D12]/80 backdrop-blur-sm shadow-[0_0_15px_rgba(72,207,203,0.15)] inline-block px-5 py-2.5 rounded-full relative overflow-hidden group">
            <span className="relative z-10">Stop Losing After-Hours Leads to Competitors</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#48CFCB]/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </p>
          <h1 className="hero-element font-['Space_Grotesk',sans-serif] text-5xl md:text-6xl font-bold leading-[1.1] mb-8 text-[#FAF8F5]">
            Double Your Clinic Consults. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-gray-300 to-gray-600">Zero Extra Staff.</span>
          </h1>
          <p className="hero-element text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            We install a 24/7 intelligent triage system that instantly answers pricing questions, handles pain objections, and books qualified appointments even while your clinic is closed.
          </p>
          <div className="hero-element flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-[#48CFCB] text-[#0D0D12] px-8 py-4 rounded-full font-bold text-sm md:text-base hover:scale-[1.03] transition-transform flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(72,207,203,0.2)] hover:shadow-[0_0_40px_rgba(72,207,203,0.4)]">
                Book Your Strategy Call <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#21212B] text-white px-8 py-4 rounded-full font-bold text-sm md:text-base hover:scale-[1.03] hover:bg-[#2A2A35] transition-all flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"
            >
              How does it work?
            </button>
          </div>
        </div>
      </section>

      {/* C. FEATURES */}
      <section className="py-32 px-6 md:px-20 bg-[#0D0D12] relative z-20">
        <div id="how-it-works" className="max-w-7xl mx-auto scroll-mt-24">
          <div className="flex flex-col md:flex-row gap-6 mb-16 items-end justify-between">
            <div>
              <h2 className="font-['Space_Grotesk',sans-serif] text-4xl md:text-5xl font-bold mb-4">The 24/7 <span className="text-[#48CFCB]">Acquisition Engine</span></h2>
              <p className="text-gray-400 text-lg max-w-2xl">Stop relying on overwhelmed front desk staff. We deploy specialized AI agents to handle every phase of the client journey.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* 1. The Triage Engine */}
            <div className="bg-[#2A2A35]/40 border border-white/5 rounded-[2rem] p-8 hover:border-[#48CFCB]/30 transition-colors flex flex-col h-[450px] overflow-hidden relative">
              <div className="mb-12 relative z-10">
                <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-bold mb-2">The 24/7 Triage Agent</h3>
                <p className="text-sm text-gray-400">Instantly replies to late-night ad leads, qualifying their intent and capturing their info while your clinic sleeps.</p>
              </div>
              <div className="relative flex-1 w-full pt-4">
                {triageCards.map((c, i) => (
                  <div key={c.id} className="absolute left-0 right-0 w-full bg-[#1A1A24] border border-white/10 p-5 rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl"
                    style={{
                      top: `${i * 24}px`,
                      scale: 1 - i * 0.04,
                      opacity: 1 - i * 0.15,
                      zIndex: 10 - i
                    }}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-['JetBrains_Mono',monospace] text-[#48CFCB] text-xs font-semibold">{c.time}</span>
                      <span className="text-[10px] font-bold px-2 py-1 bg-[#48CFCB]/10 text-[#48CFCB] rounded-md tracking-wider uppercase">{c.status}</span>
                    </div>
                    <p className="font-medium text-base mb-1">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.intent}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Follow-Up Protocol */}
            <div className="bg-[#2A2A35]/40 border border-white/5 rounded-[2rem] p-8 hover:border-[#48CFCB]/30 transition-colors flex flex-col h-[450px]">
              <div className="mb-6">
                <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-bold mb-2">Objection Handling Protocol</h3>
                <p className="text-sm text-gray-400">Automatically answers vulnerable questions about pain levels, pricing, and body hair to recover ghosted prospects.</p>
              </div>
              <div className="flex-1 bg-[#14141C] rounded-2xl border border-white/5 p-6 font-['JetBrains_Mono',monospace] text-sm text-gray-300 leading-relaxed overflow-hidden relative shadow-inner">
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-600 ml-2">sms_server.log</span>
                </div>
                <span className="text-[#48CFCB]">&gt; system.execute_sms_recovery(lead_492)</span><br /><br />
                <span className="opacity-90">{typingText}</span>
                <span className="animate-pulse inline-block w-2 h-4 bg-[#48CFCB] ml-1 align-middle opacity-80" />
              </div>
            </div>

            {/* 3. ROI Matrix */}
            <div className="bg-[#2A2A35]/40 border border-white/5 rounded-[2rem] p-8 hover:border-[#48CFCB]/30 transition-colors flex flex-col h-[450px]">
              <div className="mb-6">
                <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-bold mb-2">The ROI Telemetry</h3>
                <p className="text-sm text-gray-400">Total operational clarity. See exactly which ad campaigns are actually turning into booked appointments.</p>
              </div>
              <div className="flex-1 relative bg-[#14141C] w-full rounded-full lg:rounded-2xl border border-white/5 overflow-hidden shadow-inner flex items-center justify-center p-6">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Animated SVG Curve */}
                <svg className="absolute inset-x-0 bottom-0 w-full h-[80%]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="roiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#48CFCB" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#48CFCB" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0 90 Q 20 80, 40 50 T 100 10 L 100 100 L 0 100 Z" fill="url(#roiGrad)" />
                  <path d="M 0 90 Q 20 80, 40 50 T 100 10" fill="none" stroke="#48CFCB" strokeWidth="2" className="drop-shadow-[0_0_12px_rgba(72,207,203,0.8)]" />
                </svg>

                {/* Nodes */}
                <div className="absolute w-2 h-2 rounded-full bg-white left-[25%] top-[72%] shadow-[0_0_10px_white]" />
                <div className="absolute w-2 h-2 rounded-full bg-white left-[55%] top-[45%] shadow-[0_0_10px_white]" />
                <div className="absolute w-[3px] h-full bg-[#48CFCB]/20 left-[75%]" />
                <div className="absolute w-3 h-3 rounded-full bg-[#48CFCB] shadow-[0_0_20px_#48CFCB] left-[75%] top-[24%] -translate-x-1/2 -translate-y-1/2 z-10 animate-pulse" />

                {/* Tags */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between font-['JetBrains_Mono',monospace] text-xs bg-[#0D0D12]/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 shadow-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500">SPEND</span>
                    <span className="text-white font-bold">$240.50</span>
                  </div>
                  <div className="w-[1px] bg-white/10" />
                  <div className="flex flex-col gap-1 items-end">
                    <span className="text-[#48CFCB]">BOOKED</span>
                    <span className="text-[#48CFCB] font-bold">8 CONSULTS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. PHILOSOPHY */}
      <section className="philosophy-section py-20 px-6 md:px-20 bg-[#0D0D12] border-y border-white/5 relative z-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <p className="philosophy-text text-lg md:text-xl text-gray-500 mb-6 font-medium tracking-wide">
            Most marketing agencies focus on: cheap leads and zero clinic visibility.
          </p>
          <p className="philosophy-text font-['Space_Grotesk',sans-serif] text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight">
            We focus on: delivering <span className="text-[#48CFCB] relative inline-block">
              autonomous systems
              <svg className="absolute w-full h-3 left-0 -bottom-2 text-[#48CFCB]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,15 100,5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span> that double your actual bookings.
          </p>
        </div>
      </section>

      {/* E. PROTOCOL - Static Infographic Layout */}
      <section id="protocol" className="bg-[#0D0D12] relative py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Card 1: New Ads Step */}
            <div className="bg-[#12121A] rounded-3xl border border-white/10 p-8 md:p-12 relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[500px] group hover:border-[#48CFCB]/30 transition-colors duration-500">
              <div className="absolute top-6 left-6 font-['JetBrains_Mono',monospace] text-[#48CFCB] text-xs font-bold tracking-widest bg-[#48CFCB]/10 px-3 py-1.5 rounded-full border border-[#48CFCB]/20 z-10 transition-colors group-hover:bg-[#48CFCB]/20">Step 01</div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(72,207,203,0.08),transparent_50%)] pointer-events-none" />

              <div className="mt-12 mb-8 relative z-10 w-full md:w-[85%]">
                <h2 className="font-['Space_Grotesk',sans-serif] text-4xl md:text-5xl font-bold mb-4 leading-tight">Precision Ad Campaigns<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48CFCB] to-blue-400">For Your Services.</span></h2>
                <p className="text-lg text-gray-400 leading-relaxed">High-converting, fully customized ad creatives designed specifically to attract premium med spa clientele, keeping your calendar full of high-intent buyers.</p>
              </div>

              {/* Abstract Ad Animation */}
              <div className="relative w-full h-[200px] border border-white/5 bg-[#0D0D12]/80 backdrop-blur rounded-xl p-6 flex flex-col gap-4 overflow-hidden shadow-inner">
                {/* Simulated Ad UI */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#48CFCB] to-blue-500 animate-[spin_4s_linear_infinite]" />
                  <div className="flex flex-col gap-1.5">
                    <div className="h-2 w-24 bg-white/20 rounded-full" />
                    <div className="h-1.5 w-16 bg-white/10 rounded-full" />
                  </div>
                </div>
                <div className="flex-1 w-full rounded-lg bg-gradient-to-br from-white/5 to-transparent border border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(72,207,203,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite_linear]" />
                </div>
                <div className="h-6 w-full bg-[#48CFCB]/10 rounded border border-[#48CFCB]/20 flex items-center justify-center">
                  <span className="font-['JetBrains_Mono',monospace] text-[8px] text-[#48CFCB] tracking-widest">SPONSORED_CONTENT_ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Card 2 (Old Card 1) */}
            <div className="bg-[#1A1A24] rounded-3xl border border-white/10 p-8 md:p-12 relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[500px] group hover:border-[#48CFCB]/30 transition-colors duration-500">
              <div className="absolute top-6 left-6 font-['JetBrains_Mono',monospace] text-[#48CFCB] text-xs font-bold tracking-widest bg-[#48CFCB]/10 px-3 py-1.5 rounded-full border border-[#48CFCB]/20 z-10">Step 02</div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(72,207,203,0.05),transparent_60%)] pointer-events-none" />

              <div className="mt-12 mb-8 relative z-10 w-full md:w-[85%]">
                <h2 className="font-['Space_Grotesk',sans-serif] text-4xl md:text-5xl font-bold mb-4 leading-tight">The 24/7 Triage<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Integration.</span></h2>
                <p className="text-lg text-gray-400 leading-relaxed">Deep API integration connecting your lead sources directly to our parsing engine. Millisecond response times ensure no weekend lead ever goes cold.</p>
              </div>

              {/* Data parsing abstract animation */}
              <div className="relative w-full h-[200px] border border-white/5 bg-[#0D0D12]/80 backdrop-blur rounded-xl p-6 font-['JetBrains_Mono',monospace] text-[10px] text-green-500 overflow-hidden shadow-inner">
                <div className="animate-[slideUp_20s_linear_infinite] opacity-70 whitespace-pre">
                  {`> recv: POST /webhook/lead\n> payload: { \n    name: 'Emma W.',\n    phone: '+1 (555)...',\n    source: 'FB_Ad_v3'\n  }\n> status: 200 OK\n> init: agent_protocol_LHR\n> parsing intent...\n> intent: Full_Legs\n> match_score: 0.98\n> action: dispatch_sms\n> status: delivered\n\n`.repeat(5)}
                </div>
              </div>
            </div>

            {/* Card 3 (Old Card 2) */}
            <div className="bg-[#12121A] rounded-3xl border border-white/10 p-8 md:p-12 relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[500px] group hover:border-[#48CFCB]/30 transition-colors duration-500">
              <div className="absolute top-6 left-6 font-['JetBrains_Mono',monospace] text-[#48CFCB] text-xs font-bold tracking-widest bg-[#48CFCB]/10 px-3 py-1.5 rounded-full border border-[#48CFCB]/20 z-10">Step 03</div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(72,207,203,0.05),transparent_60%)] pointer-events-none" />

              <div className="mt-12 mb-8 relative z-10 w-full md:w-[85%]">
                <h2 className="font-['Space_Grotesk',sans-serif] text-4xl md:text-5xl font-bold mb-4 leading-tight">The Autonomous<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Funnel.</span></h2>
                <p className="text-lg text-gray-400 leading-relaxed">Intelligent conversation flows that handle pain objections, answer complex pricing questions, and confidently push for the calendar deposit.</p>
              </div>

              {/* Abstract SVG animation */}
              <div className="relative w-full h-[200px] flex items-center justify-center">
                <div className="absolute w-[180px] h-[180px] rounded-full border border-[#48CFCB]/10 animate-[spin_10s_linear_infinite] border-t-[#48CFCB]/40" />
                <div className="absolute w-[120px] h-[120px] rounded-full border border-[#48CFCB]/20 animate-[spin_6s_linear_infinite_reverse] border-b-[#48CFCB]/50" />
                <div className="absolute w-[60px] h-[60px] rounded-full bg-[#48CFCB]/5 border border-[#48CFCB] shadow-[0_0_30px_rgba(72,207,203,0.3)] flex items-center justify-center">
                  <div className="w-5 h-5 bg-[#48CFCB] rounded-full animate-pulse shadow-[0_0_15px_#48CFCB]" />
                </div>
              </div>
            </div>
            {/* Card 4 (Now regular width) */}
            <div className="bg-[#1A1A24] rounded-3xl border border-[#48CFCB]/20 p-8 md:p-12 relative overflow-hidden flex flex-col justify-between shadow-[0_0_50px_rgba(72,207,203,0.03)] min-h-[500px] group hover:border-[#48CFCB]/30 transition-colors duration-500">
              <div className="absolute top-6 left-6 font-['JetBrains_Mono',monospace] text-[#48CFCB] text-xs font-bold tracking-widest bg-[#48CFCB]/10 px-3 py-1.5 rounded-full border border-[#48CFCB]/20 z-10">Step 04</div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(72,207,203,0.05),transparent_60%)] pointer-events-none" />

              <div className="mt-12 mb-8 relative z-10 w-full md:w-[85%]">
                <h2 className="font-['Space_Grotesk',sans-serif] text-4xl md:text-5xl font-bold mb-4 leading-tight">Total Operational<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Clarity.</span></h2>
                <p className="text-lg text-gray-400 leading-relaxed">Real-time visibility into every conversation, ad dollar, and booked appointment. Stop guessing what your marketing is doing.</p>
              </div>

              {/* Pulsing telemetry block */}
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="bg-[#12121A] p-6 rounded-2xl border border-white/5 flex flex-col shadow-lg">
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] text-gray-500 mb-2 tracking-wider">CONVERSION</span>
                  <span className="font-['Space_Grotesk',sans-serif] text-4xl text-white font-bold">42%</span>
                </div>
                <div className="bg-[#12121A] p-6 rounded-2xl border border-white/5 flex flex-col shadow-lg">
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] text-gray-500 mb-2 tracking-wider">COST/LEAD</span>
                  <span className="font-['Space_Grotesk',sans-serif] text-4xl text-[#48CFCB] font-bold">$14</span>
                </div>
                <div className="bg-[#12121A] col-span-2 p-6 rounded-2xl border border-[#48CFCB]/20 flex flex-col items-center justify-center overflow-hidden relative shadow-[0_0_20px_rgba(72,207,203,0.05)]">
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#48CFCB] shadow-[0_0_10px_#48CFCB]" />
                  <Activity className="text-[#48CFCB] w-6 h-6 mb-2 animate-pulse" />
                  <span className="font-['JetBrains_Mono',monospace] text-xs text-[#48CFCB] font-bold tracking-widest">SYSTEM_NOMINAL</span>
                </div>
              </div>
            </div>

            {/* Card 5: Scaleable Partnership (Full Width Row) */}
            <div className="bg-[#12121A] md:col-span-2 rounded-3xl border border-white/10 p-8 md:p-12 relative overflow-hidden flex flex-col justify-between shadow-xl group hover:border-[#48CFCB]/30 transition-colors duration-500">
              <div className="absolute top-6 left-6 font-['JetBrains_Mono',monospace] text-[#48CFCB] text-xs font-bold tracking-widest bg-[#48CFCB]/10 px-3 py-1.5 rounded-full border border-[#48CFCB]/20 z-10 transition-colors group-hover:bg-[#48CFCB]/20">Step 05</div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(72,207,203,0.05),transparent_60%)] pointer-events-none" />

              <div className="mt-12 mb-4 relative z-10 w-full max-w-4xl mx-auto text-center md:text-left md:ml-0">
                <h2 className="font-['Space_Grotesk',sans-serif] text-4xl md:text-5xl font-bold mb-6 leading-tight flex flex-col md:flex-row md:items-center">
                  Scaleable
                  <span className="text-transparent md:ml-2 bg-clip-text bg-gradient-to-r from-[#48CFCB] to-blue-400">Partnership.</span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  This step is about helping your clinic scale aggressively <em>after</em> the initial AI agents and ad campaigns are deployed. We transition into a long-term growth partner dedicated to filling new physical clinic locations, developing custom website architectures, algorithmically reactivating old lead databases, and building specialized operational software crafted strictly for your unique needs.
                </p>
              </div>

              {/* Minimal abstract data grid to act as a sleek visual anchor */}
              <div className="relative w-full h-[120px] mt-8 border border-white/5 bg-[#0D0D12]/80 backdrop-blur rounded-xl p-6 flex flex-col justify-center overflow-hidden shadow-inner">
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
                 <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#48CFCB]/40 to-transparent mx-8 -translate-y-1/2" />
                 <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#48CFCB] rounded-full shadow-[0_0_20px_#48CFCB] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                 <div className="absolute top-1/2 left-[25%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] -translate-x-1/2 -translate-y-1/2" />
                 <div className="absolute top-1/2 left-[75%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] -translate-x-1/2 -translate-y-1/2" />
                 <span className="absolute bottom-4 right-6 font-['JetBrains_Mono',monospace] text-[10px] text-[#48CFCB]/70 tracking-widest">SCALING_PROTOCOL_INITIATED</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHAT WE OFFER SECTION */}
      <section className="py-24 px-6 md:px-20 bg-[#060913] relative z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <h2 className="font-['Space_Grotesk',sans-serif] text-4xl md:text-5xl font-bold mb-4 text-center">
              What We <span className="text-[#48CFCB]">Offer</span>
            </h2>
            <p className="text-gray-400 text-center text-lg max-w-2xl mx-auto leading-relaxed">
              We deploy the complete architecture needed to rapidly scale premium aesthetic clinics without overwhelming your staff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Personalised Ads",
                description: "High-converting, fully customized ad creatives designed specifically to attract premium specific service med spa clientele.",
                image: "/images/purple-dashboard.png",
                mockup: "none"
              },
              {
                title: "Lead Capture",
                description: "Intelligent systems that capture, qualify, and nurture inbound prospects 24/7. Never miss an opportunity again.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
                mockup: "laptop"
              },
              {
                title: "Instant Responses",
                description: "AI-powered texting responses to client inquiries within seconds, maintaining high engagement around the clock.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
                mockup: "phone"
              },
              {
                title: "OOO Handling",
                description: "Seamless call and message management when you're away. Your AI assistant handles inquiries professionally on weekends.",
                image: "",
                mockup: "ai-agent"
              },
              {
                title: "Client Onboarding",
                description: "Streamlined onboarding workflows that gently guide new clients through clinic forms, consents, and preparation.",
                image: "",
                mockup: "sms-chat"
              },
              {
                title: "Custom Websites",
                description: "Stunning, high-performance web architecture that not only looks incredible but actively drives patient conversions.",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
                mockup: "laptop"
              },
              {
                title: "CRM Management",
                description: "Deep API integrations connecting your active lead sources directly to our parsing engine for total operational visibility.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
                mockup: "none"
              },
              {
                title: "Google Review Management",
                description: "Automated text protocols to capture 5-star reviews from satisfied patients while intercepting negative private feedback.",
                image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=600&q=80",
                mockup: "phone"
              },
              {
                title: "SEO Optimization",
                description: "Long-term organic growth strategies ensuring your specific local clinic ranks #1 for high-intent nearby search traffic.",
                image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
                mockup: "laptop"
              }
            ].map((service, index) => {
              return (
              <div key={index} className="bg-[#0B0D15] rounded-3xl border border-white/5 p-6 md:p-8 flex flex-col hover:border-[#48CFCB]/40 transition-colors duration-500 group shadow-lg">
                {/* Image / Mockup Container */}
                <div className={`w-full h-48 md:h-56 rounded-2xl bg-gradient-to-b from-[#161822] to-[#0B0D15] overflow-hidden relative border border-white/5 mb-8 flex flex-col shadow-inner group-hover:from-[#1C1E2B] transition-colors ${service.mockup === 'none' ? 'p-0' : 'items-center justify-end px-4 pt-6'}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(72,207,203,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {service.mockup === "laptop" && (
                    <div className="relative w-full max-w-[280px] mx-auto transform group-hover:-translate-y-1 transition-transform duration-500 z-10 flex flex-col items-center">
                      <div className="w-full aspect-[16/10] bg-[#12121A] border-[3px] border-[#2A2A35] rounded-t-xl relative overflow-hidden shadow-2xl flex flex-col">
                        <div className="w-full h-3 bg-[#1A1A24] border-b border-[#2A2A35] flex items-center px-1.5 space-x-1 shrink-0">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]"></div>
                        </div>
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="w-[115%] h-2.5 bg-[#2A2A35] rounded-b-lg shadow-2xl relative flex justify-center mt-[-1px]">
                        <div className="w-12 h-1 bg-[#1A1A24] rounded-b-sm absolute top-0"></div>
                      </div>
                    </div>
                  )}

                  {service.mockup === "phone" && (
                    <div className="relative w-[35%] max-w-[120px] mx-auto transform group-hover:-translate-y-1 transition-transform duration-500 z-10 mt-auto mb-2">
                      <div className="w-full aspect-[9/19] bg-black border-[4px] border-[#2A2A35] rounded-[1.5rem] relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 inset-x-0 h-3 bg-black rounded-b-lg w-[40%] mx-auto z-20"></div>
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  )}

                  {service.mockup === "none" && (
                    <div className="w-full h-full relative">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D15] via-transparent to-transparent opacity-90 z-20 pointer-events-none" />
                    </div>
                  )}

                  {/* AI Agent - Dark techy robot */}
                  {service.mockup === "ai-agent" && (
                    <div className="w-full h-full flex items-center justify-center relative z-10">
                      <div className="relative flex flex-col items-center">
                        {/* Phone frame */}
                        <div className="w-28 h-44 bg-[#1A1C2E] border-[3px] border-[#2E3148] rounded-2xl relative overflow-hidden shadow-[0_0_40px_rgba(72,207,203,0.15)]">
                          <div className="absolute top-1 inset-x-0 w-8 h-1.5 bg-[#2E3148] rounded-full mx-auto"></div>
                          {/* Robot face */}
                          <div className="flex flex-col items-center justify-center h-full pt-3">
                            <div className="w-14 h-12 bg-gradient-to-b from-[#48CFCB] to-[#3BA8A5] rounded-xl flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(72,207,203,0.3)]">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-[#0B0D15] rounded-full"></div>
                                <div className="w-3 h-3 bg-[#0B0D15] rounded-full"></div>
                              </div>
                            </div>
                            <div className="w-5 h-5 border-2 border-[#48CFCB] rounded-full flex items-center justify-center mb-2">
                              <div className="w-1.5 h-2 bg-[#48CFCB] rounded-sm"></div>
                            </div>
                            {/* Waveform */}
                            <div className="flex items-end space-x-0.5 h-4">
                              {[3,6,4,8,5,7,3,6,4].map((h,i) => (
                                <div key={i} className="w-1 bg-[#48CFCB]/60 rounded-full animate-pulse" style={{height: `${h*2}px`, animationDelay: `${i*0.1}s`}}></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Antenna */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
                          <div className="w-2 h-2 bg-[#48CFCB] rounded-full shadow-[0_0_8px_rgba(72,207,203,0.6)]"></div>
                          <div className="w-0.5 h-2 bg-[#2E3148]"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SMS Chat mockup */}
                  {service.mockup === "sms-chat" && (
                    <div className="w-full h-full flex items-center justify-center relative z-10 p-3">
                      <div className="w-full max-w-[260px] flex flex-col space-y-1.5">
                        {/* Header */}
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-5 h-5 rounded-full bg-[#48CFCB] flex items-center justify-center">
                            <span className="text-[7px] font-bold text-[#0B0D15]">AI</span>
                          </div>
                          <div className="w-20 h-2 bg-gray-600/40 rounded-full"></div>
                        </div>
                        {/* AI message */}
                        <div className="self-start w-[80%] bg-[#1E2035] rounded-2xl rounded-tl-sm px-3 py-2.5 flex flex-col space-y-1">
                          <div className="w-full h-1.5 bg-gray-500/20 rounded-full"></div>
                          <div className="w-3/4 h-1.5 bg-gray-500/20 rounded-full"></div>
                        </div>
                        {/* User message */}
                        <div className="self-end w-[65%] bg-[#48CFCB] rounded-2xl rounded-tr-sm px-3 py-2.5 flex flex-col space-y-1">
                          <div className="w-full h-1.5 bg-[#0B0D15]/20 rounded-full"></div>
                          <div className="w-1/2 h-1.5 bg-[#0B0D15]/20 rounded-full"></div>
                        </div>
                        {/* AI message */}
                        <div className="self-start w-[85%] bg-[#1E2035] rounded-2xl rounded-tl-sm px-3 py-2.5 flex flex-col space-y-1">
                          <div className="w-full h-1.5 bg-gray-500/20 rounded-full"></div>
                          <div className="w-5/6 h-1.5 bg-gray-500/20 rounded-full"></div>
                        </div>
                        {/* User message */}
                        <div className="self-end w-[55%] bg-[#48CFCB] rounded-2xl rounded-tr-sm px-3 py-2.5 flex flex-col space-y-1">
                          <div className="w-full h-1.5 bg-[#0B0D15]/20 rounded-full"></div>
                        </div>
                        {/* AI message */}
                        <div className="self-start w-[70%] bg-[#1E2035] rounded-2xl rounded-tl-sm px-3 py-2.5 flex flex-col space-y-1">
                          <div className="w-full h-1.5 bg-gray-500/20 rounded-full"></div>
                          <div className="w-2/3 h-1.5 bg-gray-500/20 rounded-full"></div>
                        </div>
                        {/* User message */}
                        <div className="self-end w-[60%] bg-[#48CFCB] rounded-2xl rounded-tr-sm px-3 py-2.5 flex flex-col space-y-1">
                          <div className="w-full h-1.5 bg-[#0B0D15]/20 rounded-full"></div>
                          <div className="w-1/3 h-1.5 bg-[#0B0D15]/20 rounded-full"></div>
                        </div>
                        {/* AI message */}
                        <div className="self-start w-[75%] bg-[#1E2035] rounded-2xl rounded-tl-sm px-3 py-2.5 flex flex-col space-y-1">
                          <div className="w-full h-1.5 bg-gray-500/20 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col text-center items-center flex-grow">
                  <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-white mb-3 tracking-wide">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 font-light opacity-80">
                    {service.description}
                  </p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* F. FAQ SECTION */}
      <section className="py-24 px-6 md:px-20 bg-[#0D0D12] relative z-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="font-['Space_Grotesk',sans-serif] text-4xl md:text-5xl font-bold mb-12 text-center">Frequently Asked <span className="text-[#48CFCB]">Questions</span></h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#12121A] border border-[#2A2A35] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#48CFCB]/50 hover:ring-1 hover:ring-[#48CFCB]/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-lg md:text-xl focus:outline-none min-h-[80px]"
                >
                  {faq.question}
                  <ChevronDown className={`w-5 h-5 text-[#48CFCB] transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className="px-6 text-gray-400 leading-relaxed overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    maxHeight: openFaq === index ? '300px' : '0px',
                    opacity: openFaq === index ? 1 : 0,
                    paddingBottom: openFaq === index ? '1.5rem' : '0'
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* INDUSTRY BENCHMARKS */}
      <section className="py-24 px-6 md:px-20 bg-[#0D0D12] relative z-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h2 className="font-['Space_Grotesk',sans-serif] text-3xl md:text-5xl font-bold mb-4 text-center">
            INDUSTRY BENCHMARKS: <br className="md:hidden" /><span className="text-[#48CFCB]">WHY AUTOMATION WINS</span>
          </h2>
          <p className="text-gray-400 text-center text-lg max-w-3xl mx-auto mb-16 leading-relaxed">
            Data proves that speed and persistence are the deciding factors in high-ticket aesthetic bookings. Here is the operational gap between manual clinics and automated systems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
            {/* Card 1 */}
            <div className="bg-[#12121A] border border-[#2A2A35] rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#48CFCB]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-opacity group-hover:bg-[#48CFCB]/20" />
              <div className="relative z-10">
                <h3 className="text-[#48CFCB] text-4xl font-bold font-['Space_Grotesk',sans-serif] mb-2 leading-tight">
                  8X Higher<br />Conversion Rates
                </h3>
                <h4 className="text-white font-bold text-xl mb-4">The 5-Minute Lead Deterioration</h4>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Industry data confirms that engaging LHR inquiries immediately, rather than waiting for staff availability, exponentially increases the likelihood of a booked consultation.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#12121A] border border-[#2A2A35] rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#48CFCB]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-opacity group-hover:bg-[#48CFCB]/20" />
              <div className="relative z-10">
                <h3 className="text-[#48CFCB] text-4xl font-bold font-['Space_Grotesk',sans-serif] mb-2 leading-tight">
                  ~45% of Inquiries<br />occur Nights/Weekends
                </h3>
                <h4 className="text-white font-bold text-xl mb-4">Capturing The 'Ghost Hours'</h4>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Manual clinics lose nearly half their potential lead volume simply by being closed. Autonomous triage captures revenue that currently goes to competitors open 24/7 digitally.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#12121A] border border-[#2A2A35] rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#48CFCB]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-opacity group-hover:bg-[#48CFCB]/20" />
              <div className="relative z-10">
                <h3 className="text-[#48CFCB] text-4xl font-bold font-['Space_Grotesk',sans-serif] mb-2 leading-tight">
                  7-12 Touchpoints<br />needed for closure.
                </h3>
                <h4 className="text-white font-bold text-xl mb-4">Long-Tail Objection Handling</h4>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Human staff average only 2-3 follow-ups before giving up on a lead. AI maintains consistent, personalized nurture infinitely until the prospect is ready to book.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <p className="text-gray-400 text-lg mb-6">Want to see more success stories?</p>
            <Link href="/contact">
              <button className="px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 hover:border-white/40 transition-all flex items-center justify-center">
                Request Our Internal Case Study Portfolio <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* G. THE GUARANTEE */}
      < section id="guarantee" className="py-40 px-6 md:px-20 bg-[#0D0D12] relative overflow-hidden flex items-center justify-center min-h-[90vh]" >
        {/* Radial glow */}
        < div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#48CFCB]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e18690c5e561?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] mix-blend-overlay" />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#48CFCB]/30 bg-[#48CFCB]/10 text-[#48CFCB] font-['JetBrains_Mono',monospace] text-sm tracking-widest mb-10 font-bold uppercase shadow-[0_0_20px_rgba(72,207,203,0.1)]">
            <LogoIcon className="w-4 h-4" /> THE PERFORMANCE GUARANTEE
          </div>
          <h2 className="font-['Space_Grotesk',sans-serif] text-4xl md:text-6xl lg:text-[5.5rem] font-bold mb-8 leading-[1.05] tracking-tight">
            Increase Your Bookings by 30% <br className="hidden xl:block" />in 90 Days. <br className="xl:hidden" />
            <span className="text-gray-500 text-3xl md:text-5xl lg:text-[3.5rem] mt-4 block">Or We Work for Free Until You Do.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl text-center mb-16 leading-relaxed">
            Stop losing weekend leads and burning out your front desk. Implement a 24/7 acquisition architecture that autonomously turns clicks into booked consultations.
          </p>
          <Link href="/book">
            <button className="group relative px-12 py-6 bg-[#48CFCB] text-[#0D0D12] rounded-full font-bold text-xl hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-3 font-['Inter',sans-serif] shadow-[0_0_50px_rgba(72,207,203,0.3)] hover:shadow-[0_0_80px_rgba(72,207,203,0.5)]">
              <span>Book your Strategy Call</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 rounded-full border border-white/50 scale-[1.02] opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
            </button>
          </Link>
        </div>
      </section >

      {/* Required basic global CSS inject for slide animations */}
      < style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(-100%); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}
      } />
    </div >
  );
}
