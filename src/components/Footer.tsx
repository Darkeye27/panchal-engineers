import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Twitter, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { label: "Home", to: "/" },
        { label: "About", to: "/about" },
        { label: "Products", to: "/products" },
        { label: "Contact", to: "/contact" },
      ]
    },
    {
      title: "Products",
      links: [
        { label: "Excavators", to: "/products" },
        { label: "Cranes", to: "/products" },
        { label: "Loaders", to: "/products" },
        { label: "Dozers", to: "/products" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Twitter, href: "#" },
  ];

  return (
    <footer className="relative border-t border-white/10 pt-20 pb-10 px-6">
      <div className="mx-auto max-w-7xl grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Panchal Logo" className="w-50 h-25 object-contain brightness-110" />
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm">Panchal Engineers — engineering the machines that build the modern world. Heavy industry, forged honestly since 1987.</p>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <div className="font-display text-sm tracking-widest mb-4 text-primary">{section.title}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to as any} className="hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <div className="font-display text-sm tracking-widest mb-4 text-primary">Connect</div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground group">
              <Phone size={16} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="font-mono hover:text-foreground transition-colors">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground group">
              <Mail size={16} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="hover:text-foreground transition-colors">sales@panchal.eng</span>
            </div>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-16 pt-6 border-t border-white/10 flex flex-wrap justify-between gap-4 text-xs text-muted-foreground uppercase tracking-widest">
        <span>© 2026 Panchal Engineers Pvt. Ltd.</span>
        <span>Forged in steel · Tested in fire</span>
      </div>
    </footer>
  );
}
