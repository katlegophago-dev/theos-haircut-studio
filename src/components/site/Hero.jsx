import { useEffect, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { heroSlides, site } from "@/content/siteContent";
import { useAppointment } from "@/components/site/AppointmentContext";

export default function Hero() {
  const { request } = useAppointment();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, reducedMotion]);

  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#080808]">
      <div className="relative h-[clamp(520px,80svh,660px)] w-full lg:h-[76svh] lg:min-h-[540px] lg:max-h-[740px]">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden="true"
            className={cn(
              "hero-photo absolute bottom-0 right-0 top-[72px] aspect-[3/4] w-auto",
              i === index ? "hero-fade-in opacity-100" : "hero-fade-out opacity-0"
            )}
          >
            <Image
              src={slide.src}
              alt=""
              fittingType="cover"
              fetchPriority={i === 0 ? "high" : "low"}
              className="absolute inset-0 h-full w-full"
              style={{
                "--hero-focus-mobile": slide.heroFocus.mobile,
                "--hero-focus-desktop": slide.heroFocus.desktop,
              }}
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 bg-[#080808]/35 lg:hidden" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[38%] bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent lg:hidden" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#080808] via-[#080808]/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-[#080808] via-[#080808]/85 to-transparent lg:block" />

        <div className="relative mx-auto flex h-full w-full max-w-[1200px] flex-col justify-center px-5 pb-8 pt-[84px] sm:px-8">
          <div className="max-w-[560px]">
            <p className="eyebrow">{site.hero.eyebrow}</p>
            <h1 className="mt-3.5 font-heading text-[clamp(2.05rem,5.1vw,4.3rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.02em] text-[#F3EFE7]">
              {site.hero.headlineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-4 text-[16px] leading-relaxed text-[#D6D1C7] sm:text-[17px]">
              {site.hero.supporting}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => request()} className="btn-gold">
                {site.hero.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a href="#work" className="btn-outline">
                {site.hero.secondaryCta}
              </a>
            </div>

            <div className="mt-7 flex items-center gap-2.5" role="group" aria-label="Hero photos">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show photo ${i + 1} of ${heroSlides.length}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group inline-flex h-11 w-11 items-center justify-center"
                >
                  <span className={cn(
                    "block h-[3px] w-9 transition-colors duration-300",
                    i === index ? "bg-[#C4A263]" : "bg-white/30 group-hover:bg-white/60"
                  )} />
                </button>
              ))}
              {!reducedMotion && (
                <button
                  type="button"
                  onClick={() => setPaused((value) => !value)}
                  aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                  className="inline-flex h-11 w-11 items-center justify-center text-[#C0BBB1] hover:text-[#C4A263]"
                >
                  {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
