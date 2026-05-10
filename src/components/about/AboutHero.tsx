import { useEffect, useRef } from "react";
import gsap from "gsap";
import crane from "@/assets/crane.jpg";
import { Crosshair } from "lucide-react";

export function AboutHero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-animate]", 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2
        }
      );
      gsap.to(".bg-img", {
        scale: 1.1,
        duration: 10,
        ease: "none",
        repeat: -1,
        yoyo: true
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-background/90 z-10" />
      <img src={crane} alt="Heavy Engineering Crane" className="bg-img absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" />
      <div className="absolute inset-0 grid-bg opacity-20 z-10" />
      
      <Crosshair className="absolute top-10 left-10 text-primary/40 w-6 h-6 z-20" />
      <Crosshair className="absolute bottom-10 right-10 text-primary/40 w-6 h-6 z-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/50 to-transparent z-20" />

      <div className="relative z-20 text-center max-w-4xl px-6 mt-10">
        <div data-animate className="inline-block border border-primary/30 bg-primary/10 px-4 py-2 text-xs text-primary uppercase tracking-[0.3em] mb-8">
          The Panchal Legacy
        </div>
        <h1 data-animate className="font-display text-5xl md:text-8xl text-foreground leading-[0.85] tracking-tight mb-8">
          Forged in Gujarat.<br/>
          <span className="text-primary">Deployed Globally.</span>
        </h1>
        <p data-animate className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          For over three decades, we haven't just built machines; we've built the backbone of modern infrastructure. Engineering that commands respect.
        </p>
      </div>
      
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}
