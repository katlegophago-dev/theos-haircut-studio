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
    <section id="top" className="hero relative isolate overflow-hidden bg-[#080808]">
      <div className="hero-stage">
        <div className="hero-light" aria-hidden="true" />
        <div className="hero-art" aria-hidden="true">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.id}
              aria-hidden="true"
              className={cn(
                "hero-photo",
                i === index ? "hero-fade-in opacity-100" : "hero-fade-out opacity-0"
              )}
            >
              <Image
                src={slide.heroSrc}
                alt=""
                fittingType="cover"
                fetchPriority={i === 0 ? "high" : "low"}
                className="hero-portrait"
              />
            </div>
          ))}
        </div>

        <div className="hero-shade" aria-hidden="true" />

        <div className="hero-content site-container">
          <div className="hero-copy">
            <p className="eyebrow">{site.hero.eyebrow}</p>
            <h1 className="hero-title mt-3.5 font-heading font-extrabold uppercase leading-[0.96] tracking-[-0.02em] text-[#F3EFE7]">
              {site.hero.headlineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="hero-supporting mt-5 text-[15px] leading-relaxed text-[#E2DDD4] sm:text-[17px]">
              {site.hero.supporting}
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#B8B1A5] sm:text-[14px]">
              {site.hero.experience}
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

            <div className="mt-5 flex items-center gap-2.5" role="group" aria-label="Hero photos">
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
