import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppointmentProvider } from "@/components/site/AppointmentContext";
import AppointmentDialog from "@/components/site/AppointmentDialog";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import WorkServices from "@/components/site/WorkServices";
import Prices from "@/components/site/Prices";
import VisitBook from "@/components/site/VisitBook";
import WorkGallery from "@/components/site/WorkGallery";
import { site } from "@/content/siteContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: site.meta.title },
      { name: "description", content: site.meta.description },
      { property: "og:title", content: site.meta.title },
      { property: "og:description", content: site.meta.description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [priceGroup, setPriceGroup] = useState("cuts");
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <AppointmentProvider>
      <div className="min-h-screen bg-[#080808] text-[#F3EFE7] antialiased">
        <Header />
        <main>
          <Hero />
          <WorkServices onOpenGallery={() => setGalleryOpen(true)} onSelectGroup={setPriceGroup} />
          <Prices activeGroup={priceGroup} onChange={setPriceGroup} />
          <VisitBook />
        </main>
        <AppointmentDialog />
        <WorkGallery isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
      </div>
    </AppointmentProvider>
  );
}
