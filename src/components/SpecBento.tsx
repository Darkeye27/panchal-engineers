import { Wrench, ShieldCheck, Settings, Zap, HardHat, Truck } from "lucide-react";

const cards = [
  { icon: Wrench, title: "Forged Hydraulics", text: "Triple-sealed cylinders rated to 6,000 PSI sustained load.", span: "md:col-span-2" },
  { icon: ShieldCheck, title: "Armored Cabin", text: "ROPS/FOPS certified steel cage, ballistic glazing.", span: "" },
  { icon: Settings, title: "Modular Drivetrain", text: "Field-swappable powertrain in under 4 hours.", span: "" },
  { icon: Zap, title: "Hybrid Power", text: "Diesel-electric kinetic recovery — 28% fuel savings.", span: "md:col-span-2" },
  { icon: HardHat, title: "Operator HUD", text: "Augmented reality overlays for precision excavation.", span: "" },
  { icon: Truck, title: "Global Logistics", text: "Door-to-site delivery across 72 countries.", span: "md:col-span-2" },
];

export function SpecBento() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <div className="text-primary text-xs uppercase tracking-[0.3em] mb-3">/// Engineering Specs</div>
            <h2 className="font-display text-5xl md:text-6xl max-w-2xl">Spec'd For<br />The <span className="text-primary">Impossible.</span></h2>
          </div>
          <p className="max-w-md text-muted-foreground">Every IronForge machine is born from forty years of heavy-industry obsession — every weld, sensor, and bolt accounted for.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map(({ icon: Icon, title, text, span }) => (
            <div
              key={title}
              className={`group relative glass p-7 overflow-hidden ${span} hover:border-primary/40 transition-all duration-500`}
            >
              <div className="absolute -top-20 -right-20 w-48 h-48 spotlight opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
              <Icon className="text-primary mb-6" size={32} strokeWidth={1.5} />
              <h3 className="font-display text-2xl mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
              <div className="mt-6 h-px w-12 bg-primary group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
