import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";
import { ArrowRight, Crosshair } from "lucide-react";
import terrain from "@/assets/terrain.jpg";
import { useNavigate } from "@tanstack/react-router";

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const root = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-panel",
        { y: 80, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 80%" } }
      );
      gsap.fromTo(".cta-content",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.3, scrollTrigger: { trigger: root.current, start: "top 80%" } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32 px-6">
      <div className="cta-panel mx-auto max-w-7xl relative overflow-hidden border border-primary/40 shadow-[0_40px_80px_rgba(255,87,34,0.15)] group">

        {/* Background Base with Slanted Clip */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-background/90 [clip-path:polygon(3%_0,100%_0,97%_100%,0_100%)]" />

        {/* Terrain Texture Blend */}
        <img
          src={terrain}
          alt="Terrain Texture"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 pointer-events-none transition-transform duration-[2s] ease-out group-hover:scale-105"
        />

        {/* Grid and Overlays */}
        <div className="absolute inset-0 grid-bg opacity-30 mix-blend-color-burn pointer-events-none" />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-background/90 via-background/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-overlay" />

        {/* Industrial Structural Accents */}
        <Crosshair className="absolute top-5 left-5 text-primary-foreground/50 w-6 h-6" />
        <Crosshair className="absolute bottom-5 right-5 text-background/50 w-6 h-6" />
        <div className="absolute top-0 left-16 w-32 h-1 bg-primary-foreground/30" />
        <div className="absolute bottom-0 right-16 w-32 h-1 bg-primary/30" />

        {/* Content */}
        <div className="relative px-8 md:px-16 py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="cta-content inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] mb-6 text-primary-foreground bg-black/30 px-3 py-1.5 backdrop-blur-md border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
              /// Start the project
            </div>
            <h2 className="cta-content font-display text-5xl md:text-7xl text-primary-foreground leading-[0.85] tracking-tight">
              Move The Earth.<br />
              <span className="text-black/70 text-stroke-none block mt-2">Talk To Engineering.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-8 relative">
            {/* Watermark */}
            <div className="absolute -top-24 -right-10 font-display text-[10rem] text-white/5 font-black pointer-events-none select-none tracking-tighter mix-blend-overlay">
              ACT
            </div>

            <p className="cta-content text-white max-w-sm lg:text-right text-lg leading-relaxed relative z-10">
              Custom configurations, financing, and on-site commissioning. Our heavy-industry specialists respond within 4 hours globally.
            </p>

            <div className="cta-content relative z-10">
              <MagneticButton onClick={() => navigate({ to: '/contact' })} className="!bg-background !text-foreground hover:!bg-background/90 !border-white/10 px-8 py-7 text-lg group/btn shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                Request a Quote
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
