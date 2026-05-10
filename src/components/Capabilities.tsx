import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { capabilities } from "@/data/capabilities";

gsap.registerPlugin(ScrollTrigger);

export function Capabilities() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cap-card", 
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="text-primary text-xs uppercase tracking-[0.3em] mb-3">/// Capabilities</div>
          <h2 className="font-display text-5xl md:text-7xl">Industrial-Grade <span className="text-primary">Solutions</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((s) => (
            <Link key={s.id} to={`/capabilities/${s.id}`} className="cap-card group relative overflow-hidden border border-white/10 bg-card hover:border-primary/40 transition-all block">
              <div className="relative h-72 overflow-hidden">
                <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1">{s.tag}</div>
              </div>
              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl">{s.title}</h3>
                  <ArrowUpRight className="text-primary group-hover:rotate-45 group-hover:scale-110 group-hover:text-white transition-all" />
                </div>
                <p className="text-sm text-muted-foreground mt-3">{s.shortDesc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
