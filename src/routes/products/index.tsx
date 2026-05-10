import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products, Category } from "@/data/products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Fleet & Machinery | Panchal Engineers" },
      { name: "description", content: "Explore our full catalog of high-performance industrial machinery, including excavators, cranes, and loaders." }
    ]
  }),
  component: ProductsIndex
});

function ProductsIndex() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  
  const categories: (Category | "All")[] = ["All", "Excavators", "Loaders", "Cranes", "Dozers"];
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-20">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-6 py-20 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h2 className="font-display text-2xl mb-6">Fleet Categories</h2>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-2 border-l-2 transition-colors ${
                      activeCategory === cat 
                        ? "border-primary bg-primary/10 text-primary font-medium" 
                        : "border-transparent text-muted-foreground hover:border-white/10 hover:bg-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-10">
            <h1 className="font-display text-5xl md:text-6xl mb-4">
              {activeCategory === "All" ? "Heavy Machinery" : activeCategory}
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Browse our complete catalog of industrial-grade machinery. Built for extreme durability and precision engineering.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {filteredProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/products/${product.id}`}
                className="group border border-white/10 bg-card/20 overflow-hidden hover:border-primary/50 transition-colors flex flex-col"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-black">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-[10px] uppercase tracking-widest text-primary mb-1">{product.category}</div>
                    <div className="font-display text-2xl">{product.name}</div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    {product.shortDesc}
                  </p>
                  <div className="space-y-2 mt-auto">
                    {product.specs.slice(0, 2).map(spec => (
                      <div key={spec.label} className="flex justify-between items-end border-b border-white/5 pb-1">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{spec.label}</span>
                        <span className="font-mono text-sm text-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
