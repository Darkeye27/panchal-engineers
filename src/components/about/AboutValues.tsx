import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldAlert, Zap, Cog } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: ShieldAlert,
    title: "Unyielding Quality",
    desc: "Every weld, every joint, every bolt is rigorously tested. We build machines that outlast the generations that operate them."
  },
  {
    icon: Cog,
    title: "Precision Engineering",
    desc: "Sub-millimeter accuracy in components weighing tons. Our CNC facilities redefine industrial tolerances."
  },
  {
    icon: Zap,
    title: "Extreme Durability",
    desc: "Designed for the harshest environments on Earth. From minus forty to fifty degrees celsius, our steel doesn't blink."
  }
];

export function AboutValues() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".val-card", 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" }
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32 px-6 bg-card/20 border-b border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="font-display text-4xl text-foreground mb-4">Engineering Philosophy</h2>
          <p className="text-muted-foreground max-w-xl">We don't compromise. Our standards are written in the iron we forge.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div key={i} className="val-card glass p-8 border-t-2 border-transparent hover:border-primary transition-all duration-500 group">
              <div className="w-12 h-12 bg-background border border-white/10 flex items-center justify-center mb-6 text-muted-foreground group-hover:text-primary transition-colors">
                <v.icon size={20} />
              </div>
              <h3 className="font-display text-xl mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
