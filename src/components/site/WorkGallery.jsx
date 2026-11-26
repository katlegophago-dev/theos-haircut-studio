import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Image } from "@/components/ui/image";
import { gallery, site } from "@/content/siteContent";

export default function WorkGallery({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!isOpen) dialog.querySelectorAll("video").forEach((video) => video.pause());
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="site-dialog gallery-dialog"
      aria-label="Work gallery"
      onClose={onClose}
    >
      <div className="max-h-[calc(100svh-2rem)] overflow-y-auto border border-white/10 bg-[#0b0b0b]">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#0b0b0b]/95 px-4 py-3 backdrop-blur sm:px-5">
          <div>
            <p className="eyebrow">Work</p>
            <h2 className="mt-1 font-heading text-lg font-bold text-[#F3EFE7]">
              Cuts, colour and clips
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-[#C0BBB1] transition-colors duration-200 hover:text-[#C4A263]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-4 sm:p-5">
          <p className="eyebrow">Clips</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {site.reels.map((reel) => (
              <figure key={reel.id}>
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={reel.poster}
                  aria-label={reel.ariaLabel}
                  className="aspect-[9/16] w-full bg-black object-contain"
                >
                  {isOpen && <source src={reel.src} type="video/mp4" />}
                </video>
                <figcaption className="mt-1.5 text-[10.5px] uppercase tracking-[0.16em] text-[#C0BBB1]">
                  {reel.label}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="eyebrow mt-6">Photos</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {gallery.map((photo) => (
              <figure key={photo.id}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fittingType="cover"
                  loading="lazy"
                  className="aspect-[3/4] w-full bg-[#080808]"
                />
                <figcaption className="mt-1.5 text-[10.5px] leading-relaxed text-[#C0BBB1]">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}
