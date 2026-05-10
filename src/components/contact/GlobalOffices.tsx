import { MapPin, Clock } from "lucide-react";

const offices = [
  {
    city: "Ahmedabad",
    region: "Global Headquarters",
    address: "Phase 4, GIDC Vatva, Gujarat 382445, India",
    time: "IST (UTC +5:30)",
    contact: "+91 79 2589 XXXX"
  },
  {
    city: "Munich",
    region: "European Hub",
    address: "Industriestraße 45, 80807 München, Germany",
    time: "CET (UTC +1:00)",
    contact: "+49 89 318 XXXX"
  },
  {
    city: "Dubai",
    region: "Middle East Operations",
    address: "JAFZA South, Zone 2, Dubai, UAE",
    time: "GST (UTC +4:00)",
    contact: "+971 4 881 XXXX"
  }
];

export function GlobalOffices() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {offices.map((office, i) => (
        <div key={i} className="border border-white/5 bg-card/20 p-8 hover:border-primary/50 transition-colors group">
          <div className="w-10 h-10 bg-background flex items-center justify-center border border-white/10 mb-6 text-primary group-hover:bg-primary/10 transition-colors">
            <MapPin size={18} />
          </div>
          <h3 className="font-display text-2xl mb-1 text-white">{office.city}</h3>
          <p className="text-xs text-primary uppercase tracking-widest mb-6">{office.region}</p>
          
          <div className="space-y-4 text-sm text-muted-foreground">
            <p className="leading-relaxed h-10">{office.address}</p>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-white/40" />
              <span>{office.time}</span>
            </div>
            <div className="pt-4 border-t border-white/10">
              <span className="text-white font-mono">{office.contact}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
