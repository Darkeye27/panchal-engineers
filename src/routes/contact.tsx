import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { GlobalOffices } from "@/components/contact/GlobalOffices";
import { SupportDirectory } from "@/components/contact/SupportDirectory";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Panchal Engineers" },
      { name: "description", content: "Get in touch with our global offices, sales teams, and 24/7 technical support." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="pt-20">
        <ContactHero />
        
        <section className="py-24 px-6 relative">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-16">
            
            {/* Left Column: Direct Inquiry */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <ContactForm />
              </div>
            </div>

            {/* Right Column: Information & Directory */}
            <div className="lg:col-span-7 space-y-20">
              <div>
                <h2 className="font-display text-4xl mb-8">Global Operations</h2>
                <GlobalOffices />
              </div>

              <div>
                <h2 className="font-display text-4xl mb-8">Support Directory</h2>
                <SupportDirectory />
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
