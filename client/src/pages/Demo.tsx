import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Demo() {
  return (
    <div className="min-h-screen bg-[#060913] flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 relative overflow-hidden">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0EA5E9] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl w-full flex flex-col items-center space-y-10 lg:space-y-12 z-10 relative mt-[-5vh]">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold font-[family-name:var(--font-display)] text-center text-white tracking-tight leading-[1.15]">
          Building Your Med Spa's Custom <br className="hidden md:block"/> 
          <span className="text-[#0EA5E9]">Customer Acquisition System.</span>
        </h1>
        
        {/* Video Player */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(14,165,233,0.15)] border border-slate-800 bg-black flex items-center justify-center relative">
          <video 
            className="w-full h-full object-cover"
            controls 
            autoPlay 
            playsInline
            src="/Video%20Project%208.mp4?v=3"
            poster="/logo.png"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* CTA Button */}
        <div className="pt-2 w-full flex justify-center">
          <Link href="/book">
            <Button className="bg-[#0EA5E9] hover:bg-[#0284c7] hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] text-white font-[family-name:var(--font-display)] font-bold px-10 py-7 h-auto text-[22px] md:text-2xl rounded-xl transition-all duration-300 w-full sm:w-auto min-w-[320px] shadow-lg shadow-[#0ea5e9]/20 transform hover:-translate-y-1 border border-[#0EA5E9]/50 tracking-wide uppercase">
              Book a discovery call
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
