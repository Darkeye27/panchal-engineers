import { createFileRoute, Link } from "@tanstack/react-router";
import { capabilities } from "@/data/capabilities";
import { products } from "@/data/products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight, Zap, Shield, Cpu, Gauge } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/capabilities/$capabilityId")({
  component: CapabilityDetail
});

function CapabilityDetail() {
  const { capabilityId } = Route.useParams();
  const navigate = useNavigate();
  const capability = capabilities.find(c => c.id === capabilityId);

  if (!capability) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-5xl mb-4">Capability Not Found</h1>
        <p className="text-muted-foreground mb-8">The engineering sector you are looking for is not in our directory.</p>
        <Link to="/" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Return Home
        </Link>
      </div>
    );
  }

  // Find products that match this capability category (heuristic mapping)
  const relatedProducts = products.filter(p => {
    if (capability.id === 'lift-systems') return p.category === 'Cranes';
    if (capability.id === 'earthmoving') return p.category === 'Excavators' || p.category === 'Dozers';
    if (capability.id === 'materials-handling') return p.category === 'Loaders';
    return false;
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-end pb-24 px-6 border-b border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-black z-0">
            <img 
              src={capability.image} 
              alt={capability.title} 
              className="w-full h-full object-cover opacity-40 mix-blend-screen grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 grid-bg opacity-20" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl w-full">
            <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft size={14} /> Back to Overview
            </Link>
            <div className="text-primary text-sm uppercase tracking-[0.2em] font-bold mb-4">{capability.tag}</div>
            <h1 className="font-display text-6xl md:text-8xl leading-none mb-6 tracking-tight">{capability.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {capability.shortDesc}
            </p>
          </div>
        </section>

        {/* Engineering Philosophy */}
        <section className="py-24 px-6 relative border-b border-white/5">
          <div className="mx-auto max-w-7xl">
             <div className="grid lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7">
                    <h2 className="font-display text-4xl mb-8">Engineering Philosophy</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-10 italic border-l-4 border-primary pl-6">
                      "{capability.longDesc}"
                    </p>
                    <div className="flex gap-4">
                        <MagneticButton onClick={() => navigate({ to: '/contact' })}>
                            Consult with Experts
                        </MagneticButton>
                    </div>
                </div>
                <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                    <div className="glass p-6 text-center">
                        <Cpu className="mx-auto mb-4 text-primary" size={32} />
                        <div className="font-display text-xl mb-1">Precision</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Micron Level Accuracy</div>
                    </div>
                    <div className="glass p-6 text-center">
                        <Shield className="mx-auto mb-4 text-primary" size={32} />
                        <div className="font-display text-xl mb-1">Security</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Fail-Safe Protocols</div>
                    </div>
                    <div className="glass p-6 text-center">
                        <Zap className="mx-auto mb-4 text-primary" size={32} />
                        <div className="font-display text-xl mb-1">Response</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Sub-ms Latency</div>
                    </div>
                    <div className="glass p-6 text-center">
                        <Gauge className="mx-auto mb-4 text-primary" size={32} />
                        <div className="font-display text-xl mb-1">Power</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Peak Load Optimization</div>
                    </div>
                </div>
             </div>
          </div>
        </section>

        {/* Core Technologies Bento */}
        <section className="py-24 px-6 bg-card/10">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-4xl mb-12 text-center">Proprietary Technologies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capability.features.map((feature, i) => (
                <div key={i} className="p-8 border border-white/10 bg-background/50 relative group hover:border-primary/50 transition-all">
                  <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />
                  <div className="text-primary text-xs font-mono mb-4">0{i+1}</div>
                  <h3 className="font-display text-xl mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Inventory */}
        {relatedProducts.length > 0 && (
            <section className="py-24 px-6">
                <div className="mx-auto max-w-7xl">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="font-display text-4xl">Related Arsenal</h2>
                            <p className="text-muted-foreground mt-2">Machinery utilizing these capabilities.</p>
                        </div>
                        <Link to="/products" className="text-primary flex items-center gap-2 group">
                            Full Catalog <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedProducts.slice(0, 3).map(p => (
                            <Link key={p.id} to={`/products/${p.id}`} className="group block overflow-hidden border border-white/5 bg-card/20">
                                <div className="aspect-video relative overflow-hidden">
                                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                                </div>
                                <div className="p-6">
                                    <h4 className="font-display text-xl">{p.name}</h4>
                                    <div className="text-xs text-primary uppercase tracking-widest mt-1">{p.category}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
