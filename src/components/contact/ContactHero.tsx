import { useEffect, useRef } from "react";
import gsap from "gsap";
import terrain from "@/assets/terrain.jpg";

export function ContactHero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-animate]", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-background/90 z-10" />
      <img src={terrain} alt="Global Terrain" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale" />
      <div className="absolute inset-0 grid-bg opacity-20 z-10" />
      
      <div className="relative z-20 max-w-7xl mx-auto">
        <div data-animate className="inline-block border border-primary/30 bg-primary/10 px-4 py-2 text-xs text-primary uppercase tracking-[0.3em] mb-8">
          Global Communications
        </div>
        <h1 data-animate className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.85] tracking-tight mb-8">
          Global Reach.<br/>
          <span className="text-primary">Immediate Response.</span>
        </h1>
        <p data-animate className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
          Our engineering specialists and support teams are stationed across the globe. Whether you need an emergency part or a multi-million dollar fleet, we are standing by.
        </p>
      </div>
      
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}
