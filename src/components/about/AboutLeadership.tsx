import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AboutLeadership() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".lead-text", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%" } }
      );
      gsap.fromTo(".lead-line", 
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: "top", duration: 1.5, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 75%" } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32 px-6 bg-card/10">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="mx-auto max-w-4xl text-center relative z-10">
        <div className="lead-line w-px h-24 bg-primary mx-auto mb-10" />
        <h2 className="lead-text font-display text-4xl md:text-5xl mb-10 leading-tight">
          "We do not build for the next quarter.<br/>We build for the next century."
        </h2>
        <div className="lead-text">
          <div className="text-xl font-display text-foreground">Rajesh Panchal</div>
          <div className="text-sm text-primary uppercase tracking-widest mt-1">Founder & Chief Engineer</div>
        </div>
      </div>
    </section>
  );
}
