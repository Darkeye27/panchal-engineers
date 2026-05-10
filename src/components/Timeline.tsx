import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { y: "1987", t: "The Forge Begins", d: "Rajesh Panchal opens a 400 sqm fabrication unit in Ahmedabad." },
  { y: "1998", t: "First Excavator", d: "Delivers the PE-100, India's first fully indigenous mid-tonnage excavator." },
  { y: "2009", t: "Global Expansion", d: "Opens distribution across the Middle East, Africa, and Southeast Asia." },
  { y: "2018", t: "Hybrid Powertrains", d: "Launches the EcoForge series — diesel-electric kinetic recovery." },
  { y: "2026", t: "Autonomous Fleet", d: "Unveils the Titan-X autonomous mining platform." },
];

export function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tl-item", {
        opacity: 0, y: 60, duration: 0.8, ease: "power3.out", stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.fromTo(".tl-line", { scaleX: 0 }, {
        scaleX: 1, ease: "none", transformOrigin: "left center",
        scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 30%", scrub: 1 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] spotlight blur-3xl opacity-60" />
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <div className="text-primary text-xs uppercase tracking-[0.3em] mb-3">/// Heritage</div>
          <h2 className="font-display text-5xl md:text-7xl">Forty Years, <span className="text-primary">One Forge.</span></h2>
        </div>

        <div className="relative">
          <div className="absolute top-12 left-0 right-0 h-px bg-white/10" />
          <div className="tl-line absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-primary via-primary to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {items.map((it) => (
              <div key={it.y} className="tl-item relative pt-20">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-primary shadow-[0_0_30px_color-mix(in_oklab,var(--primary)_60%,transparent)]" />
                <div className="text-center">
                  <div className="font-display text-3xl text-primary mb-2">{it.y}</div>
                  <div className="font-display text-lg mb-2">{it.t}</div>
                  <div className="text-xs text-muted-foreground">{it.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
