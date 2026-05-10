import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import { Link } from "@tanstack/react-router";

gsap.registerPlugin(ScrollTrigger);

export function MachineryGallery() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - window.innerWidth + 96;
      const tl = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.to(".gallery-card", {
        skewX: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: true,
        },
      });
      return () => { tl.kill(); };
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-10 left-0 right-0 z-10 px-12 flex items-end justify-between">
        <div>
          <div className="text-primary text-xs uppercase tracking-[0.3em] mb-2">/// Fleet 2026</div>
          <h2 className="font-display text-5xl md:text-7xl">The <span className="text-primary">Arsenal</span>.</h2>
        </div>
        <div className="hidden md:block text-xs uppercase tracking-widest text-muted-foreground">Scroll to traverse →</div>
      </div>

      <div className="absolute inset-0 flex items-center">
        <div ref={track} className="flex gap-8 pl-12 pr-24 will-change-transform">
          {products.map((it, i) => (
            <Link key={it.id} to={`/products/${it.id}`} className="gallery-card relative shrink-0 w-[460px] h-[560px] overflow-hidden border border-white/10 group block">
              <img src={it.image} alt={it.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute top-5 left-5 text-xs font-mono text-primary">0{i + 1} / 0{products.length}</div>
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{it.category}</div>
                <div className="flex items-end justify-between">
                  <h3 className="font-display text-3xl">{it.name}</h3>
                  <div className="font-display text-xl text-primary">{it.specs[0]?.value}</div>
                </div>
                <div className="mt-4 h-px w-full bg-white/10 group-hover:bg-primary/20 transition-colors">
                  <div className="h-full w-1/3 bg-primary group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
