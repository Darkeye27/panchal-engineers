import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutFacilities } from "@/components/about/AboutFacilities";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { MachineAnatomy } from "@/components/about/MachineAnatomy";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Panchal Engineers" },
      { name: "description", content: "Learn about the heritage, engineering capabilities, and history of Panchal Engineers." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="pt-20">
        <AboutHero />
        <AboutValues />
        <AboutFacilities />
        <MachineAnatomy />
        <AboutLeadership />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
