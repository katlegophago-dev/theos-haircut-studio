// ---------------------------------------------------------------------------
// THEO'S HAIRCUT STUDIO — single source of truth for content and media.
// Swap photo / video URLs, captions, prices or copy here.
// ---------------------------------------------------------------------------

const MEDIA = {
  photo1:
    "/media/theo-photo-1.jpg",
  photo2:
    "/media/theo-photo-2.jpg",
  photo3:
    "/media/theo-photo-3.jpg",
  photo4:
    "/media/theo-photo-4.jpg",
  photo5:
    "/media/theo-photo-5.jpg",
  photo6:
    "/media/theo-photo-6.jpg",
  reelTextured:
    "/media/theo-reel-textured.mp4",
  reelColour:
    "/media/theo-reel-colour.mp4",
  logo:
    "/media/theo-logo.jpg",
};

const WHATSAPP_NUMBER = "27627656050";
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

export const site = {
  name: "Theo's Haircut Studio",
  shortName: "Theo's",
  suburb: "Lyttelton",

  meta: {
    title: "Theo's Haircut Studio | Lyttelton",
    description:
      "Haircut studio in Lyttelton offering cuts, colour, locs and finishing services. Browse the work, compare prices and request an appointment on WhatsApp.",
  },

  contact: {
    phoneDisplay: "062 765 6050",
    phoneHref: "tel:+27627656050",
    whatsappBase: WHATSAPP_BASE,
    whatsappMessage: `${WHATSAPP_BASE}?text=${encodeURIComponent(
      "Hi Theo's Haircut Studio, I'd like to ask about booking an appointment."
    )}`,
  },

  address: {
    line1: "102 Napier Road",
    line2: "Lyttelton, South Africa",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=102+Napier+Road%2C+Lyttelton%2C+South+Africa",
  },

  socials: {
    instagram: { label: "Instagram", handle: "@theocutz_", href: "https://www.instagram.com/theocutz_/" },
    tiktok: { label: "TikTok", handle: "@theo_cutz", href: "https://www.tiktok.com/@theo_cutz" },
  },

  surcharge: {
    amount: 50,
    label: "Appointments: R50 extra.",
    note: "Confirm availability and your total with the studio.",
  },

  // Original gold lockup. The crop boxes are fractions of the source image,
  // measured from the artwork so nothing is redrawn or distorted.
  logo: {
    src: MEDIA.logo,
    alt: "Theo's Haircut Studio",
    monogramCrop: { x0: 0.3037, x1: 0.6963, y0: 0.1556, y1: 0.6148 },
    lockupCrop: { x0: 0.2074, x1: 0.7926, y0: 0.1556, y1: 0.8593 },
  },

  payments: "Card, EFT and PayShap accepted.",

  nav: [
    { label: "Work", href: "#work" },
    { label: "Prices", href: "#prices" },
    { label: "Visit", href: "#visit" },
  ],

  hero: {
    eyebrow: "Theo's Haircut Studio · Lyttelton",
    headlineLines: ["Precision.", "Style.", "Confidence."],
    supporting: "Your next look starts here.",
    primaryCta: "Book a cut",
    secondaryCta: "Explore the work",
    slideKeys: ["p4", "p2", "p5"],
  },

  photos: {
    p1: {
      id: "photo-1",
      src: MEDIA.photo1,
      alt: "Client portrait looking downward, showing soft waves through the top of the hair.",
      caption: "Waves, seen from above",
    },
    p2: {
      id: "photo-2",
      src: MEDIA.photo2,
      alt: "Client portrait showing waves and a precisely shaped hairline.",
      caption: "Waves and a precise hairline",
      heroFocus: { mobile: "52% 42%", desktop: "52% 38%" },
    },
    p3: {
      id: "photo-3",
      src: MEDIA.photo3,
      alt: "Client portrait showing a light-coloured short cut, finished with clippers visible in frame.",
      caption: "Light colour, finished with clippers",
    },
    p4: {
      id: "photo-4",
      src: MEDIA.photo4,
      alt: "Client portrait showing a finished haircut and shaped beard.",
      caption: "Finished cut and shaped beard",
      heroFocus: { mobile: "54% 40%", desktop: "54% 36%" },
    },
    p5: {
      id: "photo-5",
      src: MEDIA.photo5,
      alt: "Client portrait showing a braided style with a defined hairline.",
      caption: "Braided style, defined hairline",
      heroFocus: { mobile: "48% 44%", desktop: "48% 40%" },
    },
    p6: {
      id: "photo-6",
      src: MEDIA.photo6,
      alt: "Client portrait showing a short cut with a clean hairline.",
      caption: "Short cut, clean hairline",
    },
  },

  services: [
    {
      id: "precision-cuts",
      title: "Precision cuts",
      copy: "Clean lines. A sharp finish.",
      photoKey: "p2",
      focus: "50% 0%",
      action: { kind: "price", groupId: "cuts", label: "Cuts & styling prices" },
    },
    {
      id: "colour",
      title: "Colour",
      copy: "Colour with a clean finish.",
      photoKey: "p3",
      focus: "52% 0%",
      action: { kind: "price", groupId: "colour", label: "Colour prices" },
    },
    {
      id: "textured-styles",
      title: "Textured styles",
      copy: "Braids, locs and individual style.",
      photoKey: "p5",
      focus: "48% 2%",
      action: { kind: "gallery", label: "View the work" },
    },
  ],

  reels: [
    {
      id: "reel-textured",
      poster: "/media/reel-textured-poster.jpg",
      label: "Textured styles",
      src: MEDIA.reelTextured,
      ariaLabel: "Vertical studio clip showing a textured haircut.",
    },
    {
      id: "reel-colour",
      poster: "/media/reel-colour-poster.jpg",
      label: "Colour",
      src: MEDIA.reelColour,
      ariaLabel: "Vertical studio clip showing a warm-coloured textured cut.",
    },
  ],

  priceGroups: [
    {
      id: "cuts",
      label: "Cuts & Styling",
      items: [
        { name: "Standard cut", price: "R150" },
        { name: "Cut and wash", price: "R180" },
        { name: "Razor chiscop", price: "R100" },
        { name: "Chiscop", price: "R70" },
        { name: "Pixie cut", price: "R400" },
      ],
    },
    {
      id: "colour",
      label: "Colour",
      items: [
        { name: "Cut and dye", price: "R250" },
        { name: "Cut and bleach", price: "R300" },
        { name: "Cut and grey", price: "R350" },
      ],
    },
    {
      id: "locs",
      label: "Locs",
      items: [
        { name: "Cut and dreads", price: "R400" },
        { name: "Dreadlocks", price: "R300" },
        { name: "Crotchet and cut", price: "R700" },
        { name: "Crotchet", price: "R600" },
      ],
    },
    {
      id: "details",
      label: "Details",
      items: [
        { name: "Eyebrow tint and design", price: "R150" },
        { name: "Eyebrow tweezing", price: "R50" },
        { name: "Piercing", price: "R200" },
      ],
    },
  ],
};

// Hero rotation: three of the studio portraits.
export const heroSlides = site.hero.slideKeys.map((key) => site.photos[key]);

// Gallery: all six photos.
export const gallery = [site.photos.p4, site.photos.p5, site.photos.p2, site.photos.p3, site.photos.p1, site.photos.p6];
