import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, CheckCircle2, Shield, Settings, Zap } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetail
});

function ProductDetail() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-5xl mb-4">Model Not Found</h1>
        <p className="text-muted-foreground mb-8">The machinery you are looking for does not exist in our catalog.</p>
        <Link to="/products" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main className="pt-20">
        {/* Product Hero */}
        <section className="relative h-[70vh] min-h-[600px] flex items-end pb-24 px-6 border-b border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-black z-0">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover opacity-50 mix-blend-screen grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute bottom-0 right-0 w-1/2 h-[70%] bg-gradient-to-l from-primary/10 to-transparent mix-blend-overlay" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl w-full">
            <Link to="/products" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft size={14} /> Back to {product.category}
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-primary text-sm uppercase tracking-[0.2em] font-bold">{product.category} Series</div>
              <div className="h-px w-12 bg-primary/50" />
              <div className="text-xs text-muted-foreground font-mono">ID: {product.id.toUpperCase()}</div>
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-none mb-6 tracking-tight">{product.name}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {product.shortDesc}
            </p>
          </div>
        </section>

        {/* Product Details Layout */}
        <section className="py-24 px-6 relative">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-16">
            
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="mb-20">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="text-primary" size={24} />
                  <h2 className="font-display text-4xl">Engineering Overview</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.longDesc}
                </p>
              </div>

              {/* Detailed Data Sections */}
              <div className="grid md:grid-cols-2 gap-12 mb-20">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="text-primary" size={20} />
                    <h3 className="font-display text-2xl">Durability & Chassis</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Constructed using specialized high-tensile steel alloys, this model is stress-tested to endure continuous heavy-duty cycles without micro-fracturing. The undercarriage is fully sealed and lubricated for life.
                  </p>
                  <ul className="space-y-3">
                    {["X-Ray Inspected Welds", "Sealed Undercarriage", "Anti-Corrosion Plating"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="text-primary shrink-0 mt-0.5 opacity-80" size={16} />
                        <span className="text-sm text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="text-primary" size={20} />
                    <h3 className="font-display text-2xl">Performance Metrics</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Powered by a next-generation variable-geometry turbocharged engine, it delivers peak torque at extremely low RPMs. This drastically reduces fuel consumption while maximizing breakout force and lifting speed.
                  </p>
                  <ul className="space-y-3">
                    {["Low-RPM Torque Curve", "Smart Energy Recovery", "Tier 4 Final Emissions"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="text-primary shrink-0 mt-0.5 opacity-80" size={16} />
                        <span className="text-sm text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-8 border border-white/10 bg-card/20 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <h3 className="font-display text-2xl mb-4">Operator Command Center</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The completely redesigned pressurized cabin features a 360-degree augmented reality heads-up display. Sound levels are maintained below 68 decibels, and the active suspension seat ensures operator alertness during long shifts.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Climate Control", "AR Telemetry", "Vibration Damping", "ROPS Certified"].map((feature) => (
                    <div key={feature} className="bg-background/50 border border-white/5 p-3 text-center text-xs text-muted-foreground">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Spec Sidebar */}
            <div className="lg:col-span-4">
              <div className="glass p-8 border-t-2 border-primary sticky top-32 shadow-[0_0_50px_rgba(255,87,34,0.1)]">
                <div className="absolute top-0 right-8 w-16 h-16 bg-primary/10 blur-xl rounded-full" />
                <h3 className="font-display text-2xl mb-8">Technical Specs</h3>
                
                <div className="space-y-5 mb-12">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="border-b border-white/10 pb-3">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-primary/80 mb-1">{spec.label}</div>
                      <div className="font-mono text-xl text-white tracking-tight">{spec.value}</div>
                    </div>
                  ))}
                </div>
                
                <MagneticButton onClick={() => navigate({ to: '/contact' })} className="w-full justify-center !py-5 text-lg shadow-xl shadow-primary/20">
                  Request Quote
                </MagneticButton>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-white/5 pb-2">
                    <span>Global Availability</span>
                    <span className="text-emerald-500 font-bold">In Stock</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-white/5 pb-2">
                    <span>Commissioning</span>
                    <span className="text-white">On-site globally</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pb-2">
                    <span>Standard Warranty</span>
                    <span className="text-white">5 Years / 10,000 Hrs</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
