import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { site } from "@/content/siteContent";

const actionClass =
  "inline-flex min-h-[44px] items-center gap-1.5 text-[10.5px] uppercase tracking-[0.16em] text-[#C4A263] transition-colors duration-200 hover:text-[#F3EFE7]";

export default function ServicePanel({ service, onOpenGallery, onSelectGroup }) {
  const photo = site.photos[service.photoKey];
  const isPrice = service.action.kind === "price";

  return (
    <article className="group relative isolate flex min-h-[260px] grow overflow-hidden bg-[#151515] transition-[flex-grow] duration-500 ease-out lg:min-h-0 lg:hover:grow-[1.55] lg:focus-within:grow-[1.55]">
      <Image
        src={photo.src}
        alt={photo.alt}
        fittingType="cover"
        loading="lazy"
        className="panel-photo absolute inset-0 h-full w-full"
        style={{ "--panel-focus": service.focus }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-[#080808]/10" />

      <div className="relative mt-auto flex w-full flex-col p-5">
        <h3 className="font-heading text-xl font-bold tracking-[-0.01em] text-[#F3EFE7]">
          {service.title}
        </h3>
        <p className="mt-1.5 min-h-[3.3em] text-[13px] leading-relaxed text-[#C0BBB1]">
          {service.copy}
        </p>

        {isPrice ? (
          <a
            href="#prices"
            onClick={() => onSelectGroup(service.action.groupId)}
            className={`mt-1 ${actionClass}`}
          >
            {service.action.label}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : (
          <button
            type="button"
            onClick={onOpenGallery}
            className={`mt-1 ${actionClass}`}
          >
            {service.action.label}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
}
