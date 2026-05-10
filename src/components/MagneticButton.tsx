import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import gsap from "gsap";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
}

export function MagneticButton({ children, variant = "primary", className = "", ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power3.out" });
  };
  const onLeave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  const base =
    "relative inline-flex items-center gap-3 px-7 py-4 font-display uppercase tracking-widest text-sm transition-colors duration-300 will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklab,var(--primary)_85%,white)] shadow-[0_20px_40px_-15px_color-mix(in_oklab,var(--primary)_70%,transparent)] [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]"
      : "border border-white/20 text-foreground hover:border-primary hover:text-primary [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]";

  return (
    <button ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}
