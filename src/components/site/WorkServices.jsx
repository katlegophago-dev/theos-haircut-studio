import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/siteContent";
import ServicePanel from "@/components/site/ServicePanel";

export default function WorkServices({ onOpenGallery, onSelectGroup }) {
  return (
    <section id="work" className="py-10 lg:py-16">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-2 font-heading text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight tracking-[-0.01em] text-[#F3EFE7]">
              Work &amp; services
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenGallery}
            className="group inline-flex min-h-[44px] items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#C4A263] transition-colors duration-200 hover:text-[#F3EFE7]"
          >
            View all work
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-2 lg:mt-8 lg:h-[460px] lg:flex-row lg:gap-3">
          {site.services.map((service) => (
            <ServicePanel
              key={service.id}
              service={service}
              onOpenGallery={onOpenGallery}
              onSelectGroup={onSelectGroup}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
