import { useEffect, useState } from "react";
import { ArrowUpRight, Instagram, MapPin, Music2, Phone } from "lucide-react";
import { site } from "@/content/siteContent";
import { useAppointment } from "@/components/site/AppointmentContext";
import LogoImage from "@/components/site/LogoImage";

export default function VisitBook() {
  const { request } = useAppointment();
  const [year, setYear] = useState("");

  useEffect(() => setYear(String(new Date().getFullYear())), []);

  const actions = [
    { label: `Call ${site.contact.phoneDisplay}`, href: site.contact.phoneHref, icon: Phone },
    {
      label: "Get directions",
      href: site.address.directionsUrl,
      icon: MapPin,
      external: true,
    },
    {
      label: `Instagram ${site.socials.instagram.handle}`,
      href: site.socials.instagram.href,
      icon: Instagram,
      external: true,
    },
    {
      label: `TikTok ${site.socials.tiktok.handle}`,
      href: site.socials.tiktok.href,
      icon: Music2,
      external: true,
    },
  ];

  return (
    <section id="visit" className="border-t border-white/10 py-9 lg:py-12">
      <div className="site-container">
        <div className="grid gap-7 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Visit &amp; book</p>
            <h2 className="mt-1.5 font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight tracking-[-0.01em] text-[#F3EFE7]">
              Find the studio
            </h2>

            <address className="mt-3 not-italic text-[15px] leading-relaxed text-[#C0BBB1]">
              <span className="block text-[#F3EFE7]">{site.address.line1}</span>
              {site.address.line2}
            </address>

            <button type="button" onClick={() => request()} className="btn-gold mt-5">
              {site.hero.primaryCta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <p className="mt-4 text-[13px] text-[#C0BBB1]">{site.payments}</p>
          </div>

          <div className="lg:pt-9">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <li key={action.label}>
                    <a
                      href={action.href}
                      {...(action.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex min-h-[52px] items-center justify-between gap-4 text-sm text-[#F3EFE7] transition-colors duration-200 hover:text-[#C4A263]"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0 text-[#C4A263]" aria-hidden="true" />
                        <span className="truncate">{action.label}</span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-[#C0BBB1] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <footer className="mt-9 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <LogoImage crop={site.logo.lockupCrop} height={128} />
            <div className="text-[11px] leading-relaxed text-[#C0BBB1]">
              <p className="font-heading text-[13px] font-bold tracking-[-0.01em] text-[#F3EFE7]">
                {site.name}
              </p>
              <p className="mt-1">
                &copy; {year} &middot; Lyttelton
              </p>
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#C0BBB1]">
            Cuts &middot; Colour &middot; Locs &middot; Details
          </p>
        </footer>
      </div>
    </section>
  );
}
