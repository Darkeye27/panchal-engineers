import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import excavator from "@/assets/excavator.jpg";
import { Plus, X, Zap, Cpu, Settings2, ShieldCheck } from "lucide-react";

const nodes = [
  {
    id: "arm",
    x: 65,
    y: 35,
    title: "Titanium-Alloy Boom",
    desc: "Forged from ultra-high-strength steel, capable of lifting 40+ tons without micro-fracturing.",
    icon: ShieldCheck,
    stats: [["Lift Capacity", "42T"], ["Tensile Strength", "1200 MPa"]]
  },
  {
    id: "engine",
    x: 30,
    y: 48,
    title: "V12 Diesel Core",
    desc: "Twin-turbocharged power plant delivering sustained torque at extreme altitudes and temperatures.",
    icon: Zap,
    stats: [["Power Output", "850 HP"], ["Displacement", "24.0 L"]]
  },
  {
    id: "hydraulics",
    x: 48,
    y: 60,
    title: "Tri-Core Hydraulics",
    desc: "A closed-loop smart hydraulic system that recycles kinetic energy for 20% greater efficiency.",
    icon: Settings2,
    stats: [["Max Pressure", "5500 PSI"], ["Flow Rate", "800 L/min"]]
  },
  {
    id: "cab",
    x: 42,
    y: 28,
    title: "Command Module",
    desc: "Pressurized, noise-isolated cabin with augmented reality HUD overlays for precision operation.",
    icon: Cpu,
    stats: [["Noise Level", "< 68 dB"], ["Visibility", "360° FOV"]]
  }
];

export function MachineAnatomy() {
  const [active, setActive] = useState<string | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background scanline animation
      gsap.to(".scan-line", {
        y: "100vh",
        duration: 4,
        ease: "none",
        repeat: -1
      });

      // Ambient pulse for nodes
      gsap.to(".node-core", {
        scale: 1.3,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.out",
        stagger: 0.2
      });
    }, container);
    return () => ctx.revert();
  }, []);

  // When active changes, animate the panel
  useEffect(() => {
    if (active) {
      gsap.fromTo(".info-panel", 
        { opacity: 0, x: -30, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "back.out(1.2)" }
      );
      gsap.fromTo(".info-line", 
        { width: 0 },
        { width: 60, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [active]);

  return (
    <section ref={container} className="relative py-32 bg-black overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,87,34,0.1)_0%,black_80%)]" />
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      {/* Scanline */}
      <div className="scan-line absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none mix-blend-screen" />

      <div className="relative mx-auto max-w-7xl px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1.5 text-[10px] text-primary uppercase tracking-[0.3em] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Interactive X-Ray
        </div>
        <h2 className="font-display text-4xl md:text-6xl text-white tracking-tight">
          Anatomy of a Titan
        </h2>
      </div>

      <div className="relative mx-auto max-w-6xl aspect-[4/3] md:aspect-[21/9] border border-white/5 bg-black/60 shadow-2xl">
        {/* The Machine Image */}
        <div className="absolute inset-0 p-8 flex items-center justify-center">
          <img 
            src={excavator} 
            alt="Machine Blueprint" 
            className="w-full h-full object-contain grayscale contrast-150 opacity-40 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-color pointer-events-none" />
        </div>

        {/* Interactive Nodes */}
        {nodes.map((node) => {
          const isActive = active === node.id;
          return (
            <div 
              key={node.id}
              className="absolute z-20 transition-all duration-300"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {/* Node Button */}
              <button 
                onClick={() => setActive(isActive ? null : node.id)}
                className={`relative w-8 h-8 md:w-10 md:h-10 -ml-4 -mt-4 md:-ml-5 md:-mt-5 rounded-full flex items-center justify-center transition-colors duration-300 focus:outline-none ${isActive ? 'bg-primary text-black scale-110' : 'bg-black/80 border border-primary/50 text-primary hover:bg-primary/30'}`}
              >
                {!isActive && <div className="node-core absolute inset-0 rounded-full border border-primary" />}
                {isActive ? <X size={16} /> : <Plus size={16} />}
              </button>

              {/* Data Panel */}
              {isActive && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 flex items-center z-30 ml-2 md:ml-4">
                  <div className="info-line h-px bg-primary w-[60px] shadow-[0_0_8px_var(--primary)] hidden md:block" />
                  <div className="info-panel w-64 md:w-80 glass p-5 border-l-2 border-primary shadow-[0_0_40px_rgba(255,87,34,0.15)] bg-background/95 backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <node.icon size={16} />
                      </div>
                      <div className="font-display text-lg leading-tight text-white">{node.title}</div>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed mb-5">{node.desc}</p>
                    <div className="space-y-3">
                      {node.stats.map(([label, val]) => (
                        <div key={label} className="flex justify-between items-end border-b border-white/10 pb-1.5">
                          <span className="text-[10px] uppercase tracking-widest text-white/50">{label}</span>
                          <span className="font-mono text-sm text-primary font-bold">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
