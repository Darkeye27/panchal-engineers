import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-t-2 border-primary backdrop-blur-md bg-background/60">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-display text-xl tracking-wider">
          <img src={logo} alt="Panchal Logo" className="w-50 h-25 object-contain brightness-110 contrast-125" />

        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
          {links.map((l) => (
            <Link key={l.label} to={l.to as any} className="relative text-muted-foreground hover:text-foreground transition-colors group [&.active]:text-foreground [&.active]:font-bold">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone size={14} className="text-primary" /> +1 (555) 010-IRON
          </div>
          <button
            onClick={() => navigate({ to: '/contact' })}
            className="bg-primary text-primary-foreground px-5 py-2.5 text-xs font-display tracking-widest uppercase [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)] hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
          >
            Get Quote
          </button>
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground"><Menu /></button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-background/95 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => <Link key={l.label} to={l.to as any} className="text-sm">{l.label}</Link>)}
        </div>
      )}
    </header>
  );
}
