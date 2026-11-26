import { site } from "@/content/siteContent";

/**
 * Shows a measured region of the original logo artwork (monogram or full
 * lockup) without redrawing or stretching it. The source is a square image,
 * so the region is revealed by scaling the image up and shifting the crop
 * into view inside a clipped, correctly proportioned box.
 */
export default function LogoImage({ crop, height, alt = site.logo.alt, className = "" }) {
  const { x0, x1, y0, y1 } = crop;
  const width = height * ((x1 - x0) / (y1 - y0));
  const scale = 1 / (x1 - x0);

  return (
    <span
      className={`relative block shrink-0 overflow-hidden ${className}`}
      style={{ height, width }}
    >
      <img
        src={site.logo.src}
        alt={alt}
        className="absolute left-0 top-0 w-full max-w-none"
        style={{
          transform: `scale(${scale}) translate(${-x0 * 100}%, ${-y0 * 100}%)`,
          transformOrigin: "top left",
        }}
      />
    </span>
  );
}
