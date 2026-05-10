import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { v: 500, s: "+", l: "Cranes Deployed" },
  { v: 72, s: "", l: "Countries Served" },
  { v: 38, s: "Y", l: "Engineering Legacy" },
  { v: 99, s: "%", l: "Uptime Reliability" },
];

export function Metrics() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      root.current?.querySelectorAll<HTMLElement>("[data-num]").forEach((el) => {
        const target = Number(el.dataset.num);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => { el.textContent = Math.floor(obj.v).toString(); },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative -mt-24 z-20 mx-auto max-w-7xl px-6">
      <div className="bg-card/90 backdrop-blur-xl border border-white/10 [clip-path:polygon(2%_0,100%_0,98%_100%,0_100%)] px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-10 shadow-[0_50px_100px_-30px_color-mix(in_oklab,var(--primary)_30%,transparent)]">
        {stats.map((s, i) => (
          <div key={s.l} className={`relative ${i !== 0 ? "md:border-l md:border-white/10 md:pl-8" : ""}`}>
            <div className="font-display text-5xl md:text-6xl flex items-baseline">
              <span data-num={s.v}>0</span><span className="text-primary ml-1">{s.s}</span>
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
