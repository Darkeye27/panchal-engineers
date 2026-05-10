import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bulldozer from "@/assets/bulldozer.jpg";

gsap.registerPlugin(ScrollTrigger);

export function AboutFacilities() {
  const root = useRef<HTMLDivElement>(null);
  const counters = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".fac-text", 
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 60%" } }
      );
      gsap.fromTo(".fac-img", 
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power4.out", scrollTrigger: { trigger: root.current, start: "top 60%" } }
      );

      const targets = [120000, 72, 450, 100];
      counters.current.forEach((el, i) => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targets[i],
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
          onUpdate: () => {
            if (el) el.textContent = Math.round(obj.val).toLocaleString();
          }
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32 px-6 overflow-hidden border-b border-white/5">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="fac-text text-primary text-xs uppercase tracking-[0.2em] mb-4">Global Reach</div>
          <h2 className="fac-text font-display text-5xl mb-6">Manufacturing Might.</h2>
          <p className="fac-text text-muted-foreground mb-10 leading-relaxed text-lg">
            Our state-of-the-art facility in Ahmedabad spans over 120,000 square feet, equipped with the latest heavy-duty CNC routing, laser cutting, and automated welding systems.
          </p>
          <div className="grid grid-cols-2 gap-8">
            {[
              { val: 120000, label: "Sq Ft Facility", prefix: "", suffix: "+" },
              { val: 72, label: "Export Nations", prefix: "", suffix: "" },
              { val: 450, label: "Engineers", prefix: "", suffix: "+" },
              { val: 100, label: "In-house QC Tests", prefix: "", suffix: "%" }
            ].map((s, i) => (
              <div key={i} className="fac-text border-l border-primary/30 pl-4">
                <div className="font-display text-3xl">
                  {s.prefix}
                  <span ref={el => { counters.current[i] = el; }}>0</span>
                  {s.suffix}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="fac-img relative aspect-square lg:aspect-[4/5] border border-white/10 group overflow-hidden">
          <img src={bulldozer} alt="Factory Floor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 glass p-4 text-xs font-mono text-muted-foreground border-l-2 border-primary">
            STATUS: ACTIVE <br/>
            COORD: 23.0225° N, 72.5714° E <br/>
            SHIFT: 24/7 PRODUCTION
          </div>
        </div>
      </div>
    </section>
  );
}
