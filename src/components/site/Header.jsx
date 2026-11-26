import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/content/siteContent";
import { useAppointment } from "@/components/site/AppointmentContext";
import LogoImage from "@/components/site/LogoImage";

function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoImage crop={site.logo.monogramCrop} height={38} alt="" />
      <span className="block leading-none">
        <span className="block font-heading text-[17px] font-extrabold tracking-[-0.01em] text-[#F3EFE7]">
          Theo&rsquo;s
        </span>
        <span className="mt-[3px] block text-[7px] uppercase tracking-[0.3em] text-[#C0BBB1]">
          Haircut Studio
        </span>
      </span>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);
  const { request } = useAppointment();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const previousFocus = document.activeElement;
    menu?.querySelector("a, button")?.focus();
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", onBreakpoint);
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key === "Tab" && menu) {
        const controls = [...menu.querySelectorAll("a[href], button:not([disabled])")];
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.offsetParent !== null) previousFocus.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-[#C4A263] focus:px-4 focus:py-3 focus:text-[11px] focus:uppercase focus:tracking-[0.16em] focus:text-[#080808]"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled || menuOpen
            ? "border-b border-white/10 bg-[#080808]/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="site-container flex h-[68px] items-center justify-between gap-4">
          <a href="#top" aria-label="Theo's Haircut Studio — back to top" className="shrink-0">
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] uppercase tracking-[0.16em] text-[#C0BBB1] transition-colors duration-200 hover:text-[#F3EFE7]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => request()}
              className="btn-gold h-11 min-h-0 px-4 text-[10.5px] tracking-[0.14em]"
            >
              {site.hero.primaryCta}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              ref={menuToggleRef}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              aria-label="Open menu"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-[#F3EFE7] transition-colors duration-200 hover:border-[#C4A263] hover:text-[#C4A263] lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-[#080808] lg:hidden"
        >
          <div className="site-container flex h-[68px] items-center justify-between">
            <a href="#top" onClick={() => setMenuOpen(false)}>
              <Wordmark />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-[#F3EFE7] transition-colors duration-200 hover:border-[#C4A263] hover:text-[#C4A263]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="site-container flex flex-1 flex-col justify-center gap-1 pb-16">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[60px] items-center justify-between border-b border-white/10 font-heading text-2xl font-bold text-[#F3EFE7] transition-colors duration-200 hover:text-[#C4A263]"
              >
                {item.label}
              </a>
            ))}

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                request();
              }}
              className="btn-gold mt-7 w-full"
            >
              {site.hero.primaryCta}
            </button>
            <a
              href={site.contact.phoneHref}
              className="mt-3 flex min-h-[44px] items-center justify-center text-[11px] uppercase tracking-[0.16em] text-[#C0BBB1]"
            >
              Call {site.contact.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
