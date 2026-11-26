import { cn } from "@/lib/utils";
import { site } from "@/content/siteContent";

export default function Prices({ activeGroup, onChange }) {
  const group = site.priceGroups.find((entry) => entry.id === activeGroup) ?? site.priceGroups[0];

  return (
    <section id="prices" className="border-t border-white/10 bg-[#151515] py-10 lg:py-14">
      <div className="mx-auto w-full max-w-[960px] px-5 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <div>
            <p className="eyebrow">Prices</p>
            <h2 className="mt-1.5 font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight tracking-[-0.01em] text-[#F3EFE7]">
              Price list
            </h2>
          </div>
          <p className="text-[13px] font-medium text-[#C4A263]">{site.surcharge.label}</p>
        </div>

        <div className="mt-5 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div
            role="tablist"
            aria-label="Price categories"
            className="flex min-w-max gap-1 border-b border-white/10"
          >
            {site.priceGroups.map((entry) => (
              <button
                key={entry.id}
                type="button"
                role="tab"
                id={`price-tab-${entry.id}`}
                aria-selected={entry.id === group.id}
              aria-controls="price-panel"
              tabIndex={entry.id === group.id ? 0 : -1}
                onClick={() => onChange(entry.id)}
              onKeyDown={(event) => {
                const current = site.priceGroups.findIndex((item) => item.id === group.id);
                let next;
                if (event.key === "ArrowRight") next = (current + 1) % site.priceGroups.length;
                if (event.key === "ArrowLeft") next = (current - 1 + site.priceGroups.length) % site.priceGroups.length;
                if (event.key === "Home") next = 0;
                if (event.key === "End") next = site.priceGroups.length - 1;
                if (next === undefined) return;
                event.preventDefault();
                const id = site.priceGroups[next].id;
                onChange(id);
                document.getElementById(`price-tab-${id}`)?.focus();
              }}
                className={cn(
                  "min-h-[44px] whitespace-nowrap border-b-2 px-3 text-[11px] uppercase tracking-[0.14em] transition-colors duration-200",
                  entry.id === group.id
                    ? "border-[#C4A263] text-[#F3EFE7]"
                    : "border-transparent text-[#C0BBB1] hover:text-[#F3EFE7]"
                )}
              >
                {entry.label}
              </button>
            ))}
          </div>
        </div>

        <div
          role="tabpanel"
          id="price-panel"
          tabIndex={0}
          aria-labelledby={`price-tab-${group.id}`}
        >
          <ul>
            {group.items.map((item) => (
              <li
                key={item.name}
                className="flex min-h-[48px] items-center justify-between gap-6 border-b border-white/10 py-2"
              >
                <span className="text-[15px] text-[#F3EFE7]">{item.name}</span>
                <span className="shrink-0 text-[15px] font-medium tabular-nums text-[#F3EFE7]">
                  {item.price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-[12px] leading-relaxed text-[#C0BBB1]">{site.surcharge.note}</p>
      </div>
    </section>
  );
}
