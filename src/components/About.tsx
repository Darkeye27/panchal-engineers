import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Cog, Factory } from "lucide-react";
import loader from "@/assets/loader.jpg";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-fade", {
        y: 50, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.fromTo(".about-img", { scale: 1.15 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="absolute -inset-6 bg-gradient-to-br from-primary/30 to-transparent blur-3xl" />
          <div className="relative h-[540px] overflow-hidden [clip-path:polygon(0_5%,100%_0,100%_95%,0_100%)] border border-white/10">
            <img src={loader} alt="Panchal Engineers manufacturing floor" loading="lazy" className="about-img w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-transparent to-primary/20" />
          </div>
          <div className="absolute -bottom-8 -right-4 glass px-6 py-5 max-w-[230px]">
            <div className="font-display text-4xl text-primary">38+</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Years forging India's heaviest equipment</div>
          </div>
          <div className="absolute -top-6 left-6 glass px-5 py-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Est.</div>
            <div className="font-display text-xl">1987 · Gujarat</div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="about-fade text-primary text-xs uppercase tracking-[0.3em] mb-3">/// About Panchal Engineers</div>
          <h2 className="about-fade font-display text-5xl md:text-6xl leading-[0.95] mb-6">
            Three Generations Of <span className="text-primary">Steel.</span>
          </h2>
          <p className="about-fade text-muted-foreground text-lg mb-8 max-w-xl">
            From a small fabrication unit in 1987 to a global manufacturer of heavy industrial machinery —
            Panchal Engineers has spent four decades earning the trust of the world's most demanding operators.
          </p>

          <div className="about-fade space-y-5 mb-10">
            {[
              { i: Factory, t: "In-house Foundry", d: "Vertically integrated steel pour to final assembly under one roof." },
              { i: Cog, t: "Custom Engineering", d: "Bespoke configurations engineered to your site's exact specifications." },
              { i: Award, t: "ISO 9001 + CE Certified", d: "Audited quality systems trusted across 72 countries." },
            ].map(({ i: I, t, d }) => (
              <div key={t} className="flex items-start gap-4 group">
                <div className="shrink-0 w-12 h-12 grid place-items-center bg-primary/10 border border-primary/30 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <I size={20} />
                </div>
                <div>
                  <div className="font-display text-lg">{t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="about-fade flex items-center gap-6 pt-6 border-t border-white/10">
            <div className="font-display italic text-2xl">— Rajesh Panchal</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Founder & Chief Engineer</div>
          </div>
        </div>
      </div>
    </section>
  );
}
