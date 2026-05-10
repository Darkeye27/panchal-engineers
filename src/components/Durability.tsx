import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import terrain from "@/assets/terrain.jpg";
import { ShieldCheck, Mountain, Thermometer } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Durability() {
  const root = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bg.current, { scale: 1 }, {
        scale: 1.3, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[110vh] overflow-hidden clip-slant-up">
      <img ref={bg} src={terrain} alt="Mountain quarry terrain" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex items-center">
        <div className="max-w-2xl">
          <div className="text-primary text-xs uppercase tracking-[0.3em] mb-4">/// Built for hell</div>
          <h2 className="font-display text-6xl md:text-8xl leading-[0.9] mb-6">
            Where Others<br />Break, We <span className="text-primary">Begin.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl">
            From -40°C arctic mining to 55°C desert quarries, every IronForge frame is stress-tested
            beyond the limits any operator will ever encounter.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { i: Mountain, t: "Altitude 5,000m+" },
              { i: Thermometer, t: "−40°C to 55°C" },
              { i: ShieldCheck, t: "Mil-Spec Frame" },
            ].map(({ i: I, t }) => (
              <div key={t} className="glass px-5 py-4 flex items-center gap-3">
                <I className="text-primary" size={20} />
                <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
