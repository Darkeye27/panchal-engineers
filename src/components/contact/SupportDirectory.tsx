import { AlertTriangle, Wrench, Globe } from "lucide-react";

const directory = [
  {
    icon: AlertTriangle,
    title: "24/7 Emergency Response",
    desc: "For critical machinery failure in active sites.",
    action: "Call +1 (800) 999-EMRG",
    highlight: true
  },
  {
    icon: Wrench,
    title: "Global Parts Logistics",
    desc: "Order authentic replacement parts with expedited shipping.",
    action: "parts@panchal.eng",
    highlight: false
  },
  {
    icon: Globe,
    title: "Dealer Network",
    desc: "Apply to become an authorized regional distributor.",
    action: "dealer.portal@panchal.eng",
    highlight: false
  }
];

export function SupportDirectory() {
  return (
    <div className="space-y-4">
      {directory.map((item, i) => (
        <div key={i} className={`p-6 border flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors ${item.highlight ? 'border-primary/50 bg-primary/5' : 'border-white/5 bg-card/20 hover:border-white/20'}`}>
          <div className="flex items-start gap-4">
            <div className={`mt-1 ${item.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
              <item.icon size={24} />
            </div>
            <div>
              <h4 className="font-display text-xl text-white mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
          <div className={`font-mono text-sm shrink-0 ${item.highlight ? 'text-primary font-bold' : 'text-white'}`}>
            {item.action}
          </div>
        </div>
      ))}
    </div>
  );
}
