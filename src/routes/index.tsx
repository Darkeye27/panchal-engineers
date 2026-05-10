import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { About } from "@/components/About";
import { Capabilities } from "@/components/Capabilities";
import { SpecBento } from "@/components/SpecBento";
import { MachineryGallery } from "@/components/MachineryGallery";
import { Durability } from "@/components/Durability";
import { Timeline } from "@/components/Timeline";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Panchal Engineers — Heavy Industrial Machinery" },
      { name: "description", content: "Panchal Engineers manufactures the heaviest, most reliable construction & mining machinery. Forged in steel since 1987. Tested in fire." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <About />
        <Capabilities />
        <SpecBento />
        <MachineryGallery />
        <Durability />
        <Timeline />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
