import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Play, Zap, Activity, Crosshair, Cpu, Gauge, Shield } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import loader from "@/assets/loader.jpg";
import { useNavigate } from "@tanstack/react-router";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger text reveals
      gsap.from("[data-stagger]", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.09,
        delay: 0.2,
      });

      gsap.from("[data-panel]", { xPercent: -120, duration: 1.4, ease: "power4.out" });
      gsap.from("[data-panel-r]", { xPercent: 120, duration: 1.4, ease: "power4.out" });
      gsap.from("[data-bg-word]", { opacity: 0, scale: 1.15, duration: 1.8, ease: "power3.out" });

      // Animated counters
      const targets = [38, 72];
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targets[i],
          duration: 2,
          delay: 0.8 + i * 0.15,
          ease: "power2.out",
          onUpdate: () => {
            if (el) el.textContent = Math.round(obj.val).toString();
          },
        });
      });

      // Scan line animation on right panel
      gsap.to(".scan-beam", {
        y: "100%",
        duration: 2.8,
        ease: "none",
        repeat: -1,
        delay: 0.5,
      });

      // Pulsing ring
      gsap.to(".ring-pulse", {
        scale: 1.35,
        opacity: 0,
        duration: 1.8,
        ease: "power2.out",
        repeat: -1,
        stagger: 0.6,
      });

      // Orbit rotation
      gsap.to(".orbit-track", {
        rotation: 360,
        duration: 18,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
      });
      gsap.to(".orbit-track-r", {
        rotation: -360,
        duration: 26,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
      });

      // Floating HUD cards subtle bob (left side only)
      gsap.to(".hud-float-a", { y: -8, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".hud-float-b", { y: 10, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });

      // Bar chart bars animate up
      gsap.from(".bar-item", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 1.2,
      });

      // Marquee ticker
      gsap.to(".marquee-inner", {
        x: "-50%",
        duration: 18,
        ease: "none",
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const stats = [
    { val: "38+", label: "Years", unit: "" },
    { val: "72", label: "Countries", unit: "" },
    { val: "ISO", label: "Certified", unit: "" },
  ];

  const barData = [35, 68, 52, 88, 61, 79, 44];

  return (
    <section ref={root} className="relative pt-28 pb-36 overflow-hidden grid-bg">
      {/* Ambient gradient panels */}
      <div
        data-panel
        className="absolute -left-40 top-1/4 w-[60%] h-[65%] bg-gradient-to-br from-primary/25 via-primary/5 to-transparent -skew-x-12 blur-sm"
      />
      <div
        data-panel-r
        className="absolute -right-48 top-0 w-[52%] h-[85%] bg-gradient-to-bl from-card/90 to-transparent skew-x-12"
      />

      {/* Massive BG wordmark */}
      <h1
        data-bg-word
        aria-hidden
        className="pointer-events-none select-none absolute inset-x-0 top-16 text-center font-display font-black text-[24vw] leading-none text-stroke opacity-30 tracking-tight"
      >
        FORCE
      </h1>

      {/* Horizontal ticker */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-primary/20 overflow-hidden h-9 flex items-center bg-background/60 backdrop-blur-sm z-20">
        <div className="marquee-inner flex whitespace-nowrap gap-12 text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>⬡ Panchal Engineers</span>
              <span className="text-primary">★ ISO 9001:2015</span>
              <span>⬡ 38+ Years of Excellence</span>
              <span className="text-primary">★ 72 Nations</span>
              <span>⬡ Zero Defect Manufacturing</span>
              <span className="text-primary">★ Steel. Precision. Power.</span>
              <span>⬡ Ahmedabad, India</span>
              <span className="text-primary">★ Heavy Equipment Specialists</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-8 items-center min-h-[72vh]">

        {/* ── LEFT CONTENT ── */}
        <div className="lg:col-span-6 relative z-10">
          <div
            data-stagger
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/40 bg-primary/10 text-primary text-xs uppercase tracking-[0.22em] mb-7"
          >
            <Zap size={11} />
            Forging Industry Since 1987
          </div>

          <h2
            data-stagger
            className="font-display text-6xl md:text-[5.5rem] leading-[0.88] mb-6 tracking-tight"
          >
            Built To{" "}
            <span className="relative inline-block">
              <span className="text-primary">Move</span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-primary/40" />
            </span>
            <br />
            Mountains.
          </h2>

          <p data-stagger className="text-muted-foreground max-w-lg text-[1.05rem] leading-relaxed mb-10">
            Panchal Engineers manufactures the heaviest, most reliable construction
            machinery on Earth. Engineered in steel. Tested in fire. Trusted worldwide.
          </p>

          <div data-stagger className="flex flex-wrap gap-4 mb-14">
            <MagneticButton onClick={() => navigate({ to: '/products' })}>
              Explore Fleet <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => navigate({ to: '/contact' })}>
              <Play size={15} /> Watch Reel
            </MagneticButton>
          </div>

          {/* Stats row */}
          <div data-stagger className="grid grid-cols-3 gap-5 max-w-sm">
            {[
              { prefix: "", val: 0, suffix: "+", label: "Years", idx: 0 },
              { prefix: "", val: 1, suffix: "", label: "Countries", idx: 1 },
              { prefix: "ISO", val: -1, suffix: "", label: "Certified", idx: 2 },
            ].map((s, i) => (
              <div key={i} className="border-l-2 border-primary pl-4 group">
                <div className="font-display text-2xl tracking-tight">
                  {s.prefix}
                  {s.val >= 0 && (
                    <span ref={(el) => { counterRefs.current[s.idx] = el; }}>0</span>
                  )}
                  {s.suffix}
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Feature pills */}
          <div data-stagger className="flex flex-wrap gap-2 mt-8">
            {[
              { icon: Cpu, label: "Precision CNC" },
              { icon: Shield, label: "Zero Defect" },
              { icon: Gauge, label: "240T Capacity" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-card/60 border border-white/10 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors duration-300"
              >
                <Icon size={11} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL — FULLY STATIC, NO CURSOR TRACKING ── */}
        <div className="lg:col-span-6 relative h-[620px] flex items-center justify-center">

          {/* Blueprint radial grid */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[520px] h-[520px] rounded-full border border-primary/10"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--primary) 6%, transparent) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Orbit rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="orbit-track w-[460px] h-[460px] rounded-full border border-dashed border-primary/15 relative">
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary/80 shadow-[0_0_10px_var(--primary)]" />
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/40" />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="orbit-track-r w-[340px] h-[340px] rounded-full border border-primary/10 relative">
              <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary/60 shadow-[0_0_8px_var(--primary)]" />
            </div>
          </div>

          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="ring-pulse absolute w-24 h-24 rounded-full border border-primary/30"
                style={{ animationDelay: `${n * 0.6}s` }}
              />
            ))}
          </div>

          {/* Main image with static clip */}
          <div className="relative w-[68%] h-[70%] group z-10">
            {/* Corner crosshairs */}
            <Crosshair className="absolute -top-5 -left-5 text-primary w-7 h-7 opacity-60" />
            <Crosshair className="absolute -bottom-5 -right-5 text-primary w-7 h-7 opacity-60" />
            <Crosshair className="absolute -top-5 -right-5 text-primary/30 w-5 h-5" />
            <Crosshair className="absolute -bottom-5 -left-5 text-primary/30 w-5 h-5" />

            {/* Image container */}
            <div
              className="w-full h-full relative overflow-hidden border border-white/10 group-hover:border-primary/40 transition-colors duration-700"
              style={{ clipPath: "polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)" }}
            >
              <img
                src={loader}
                alt="Panchal Engineers Heavy Loader"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
              />
              {/* Scan beam */}
              <div className="scan-beam absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none mix-blend-overlay" />
              {/* Scanline texture */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-25 mix-blend-overlay pointer-events-none" />
              {/* Bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent pointer-events-none" />
              {/* Side fade */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/30 pointer-events-none" />
            </div>

            {/* Model tag on image */}
            <div className="absolute top-4 left-6 font-mono text-[10px] text-primary/70 tracking-widest uppercase">
              Model: HD-9K ▸ 2024
            </div>
          </div>

          {/* BG model text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="font-display text-[9rem] font-black text-stroke opacity-[0.12] tracking-tighter leading-none select-none">
              HD-9K
            </div>
          </div>

          {/* HUD Card A — Max Payload (top right, static float) */}
          <div className="hud-float-a absolute top-8 right-2 glass px-5 py-4 border-l-2 border-l-primary flex items-center gap-4 z-20 shadow-xl shadow-black/30">
            <div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground mb-1">
                Max Payload
              </div>
              <div className="font-display text-4xl text-foreground leading-none">
                240<span className="text-primary text-xl">T</span>
              </div>
              <div className="text-[9px] text-primary/60 mt-0.5 tracking-widest">RATED CAPACITY</div>
            </div>
            <Activity className="text-primary w-7 h-7 opacity-80 animate-pulse" />
          </div>

          {/* HUD Card B — Live Telemetry (bottom left, static float) */}
          <div className="hud-float-b absolute bottom-16 left-2 glass px-5 py-4 z-20 shadow-xl shadow-black/30 min-w-[160px]">
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <div className="text-[9px] uppercase tracking-widest text-primary font-bold">
                Live Telemetry
              </div>
            </div>
            <div className="font-mono text-[11px] text-foreground/70 leading-5">
              ENG: <span className="text-white font-semibold">OPTIMAL</span>
            </div>
            <div className="font-mono text-[11px] text-foreground/70 leading-5">
              HYD: <span className="text-white font-semibold">STABLE</span>
            </div>
            <div className="font-mono text-[11px] text-foreground/70 leading-5">
              TMP: <span className="text-primary font-semibold">74°C</span>
            </div>

            {/* Animated bar chart */}
            <div className="flex items-end gap-[3px] mt-3 h-8">
              {barData.map((h, i) => (
                <div
                  key={i}
                  className="bar-item flex-1 bg-primary/20 rounded-t-sm relative overflow-hidden"
                  style={{ height: `${h}%` }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm"
                    style={{ height: "55%" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* HUD badge — bottom center */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 border border-primary/30 bg-background/80 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Real-time diagnostic active
            </span>
          </div>

          {/* Depth floor grid */}
          <div
            className="absolute inset-x-4 bottom-4 h-40 opacity-25 pointer-events-none z-0"
            style={{
              transform: "rotateX(72deg)",
              backgroundImage:
                "linear-gradient(color-mix(in oklab, var(--primary) 45%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--primary) 45%, transparent) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
              maskImage: "linear-gradient(to top, black 20%, transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}