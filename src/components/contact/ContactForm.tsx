import { useState } from "react";
import { MagneticButton } from "@/components/MagneticButton";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="glass p-8 md:p-12 border-t-2 border-primary shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-12 w-32 h-32 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
      
      <h2 className="font-display text-3xl mb-8">Direct Inquiry</h2>
      
      {submitted ? (
        <div className="h-64 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-primary/20 text-primary flex items-center justify-center rounded-full mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display text-2xl mb-2">Message Transmitted</h3>
          <p className="text-muted-foreground">An engineering specialist will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</label>
              <input required type="text" className="w-full bg-background/50 border border-white/10 p-4 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Company</label>
              <input required type="text" className="w-full bg-background/50 border border-white/10 p-4 text-white focus:outline-none focus:border-primary transition-colors" placeholder="HeavyCorp Industries" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Email Address</label>
              <input required type="email" className="w-full bg-background/50 border border-white/10 p-4 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@company.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Inquiry Type</label>
              <select className="w-full bg-background/50 border border-white/10 p-4 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                <option value="sales">Fleet Sales</option>
                <option value="parts">Spare Parts</option>
                <option value="support">Technical Support</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
            <textarea required rows={4} className="w-full bg-background/50 border border-white/10 p-4 text-white focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Provide details regarding your operational requirements..." />
          </div>

          <MagneticButton className="w-full justify-center !py-4 text-lg">
            Initialize Transmission
          </MagneticButton>
        </form>
      )}
    </div>
  );
}
