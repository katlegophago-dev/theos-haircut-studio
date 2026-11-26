import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { site } from "@/content/siteContent";
import { useAppointment } from "@/components/site/AppointmentContext";
import { appointmentMessage, isValidPreferredDate, studioToday } from "@/lib/appointment";

export default function AppointmentDialog() {
  const { isOpen, presetService, close } = useAppointment();
  const dialogRef = useRef(null);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(studioToday());
  }, []);

  useEffect(() => {
    if (isOpen) {
      setToday(studioToday());
      setService(presetService || "");
      setError("");
    }
  }, [isOpen, presetService]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!service) {
      setError("Please choose a service.");
      return;
    }
    if (!date) {
      setError("Please choose a preferred date.");
      return;
    }
    if (!isValidPreferredDate(date)) {
      setError("Please choose today or a future date.");
      return;
    }

    const message = appointmentMessage({ service, date, time, note, surcharge: site.surcharge.amount });

    window.open(
      `${site.contact.whatsappBase}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <dialog
      ref={dialogRef}
      className="site-dialog"
      aria-label="Request an appointment"
      onClose={close}
    >
      <div className="max-h-[calc(100svh-2rem)] overflow-y-auto border border-white/15 bg-[#0b0b0b] p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Request an appointment</p>
            <h2 className="mt-3 font-heading text-2xl font-bold leading-tight tracking-[-0.01em] text-[#F3EFE7]">
              Tell the studio what you&rsquo;re after.
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close appointment request"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-[#C0BBB1] transition-colors duration-200 hover:text-[#C4A263]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#C0BBB1]">
          Your request opens in WhatsApp. Theo&rsquo;s confirms availability and the total there —
          nothing is booked until the studio replies.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="appointment-service"
              className="block text-[10.5px] uppercase tracking-[0.2em] text-[#C0BBB1]"
            >
              Service
            </label>
            <select
              id="appointment-service"
              value={service}
              onChange={(event) => {
                setService(event.target.value);
                setError("");
              }}
              className="site-field mt-2"
            >
              <option value="">Select a service</option>
              {site.priceGroups.map((group) => (
                <optgroup key={group.id} label={group.label}>
                  {group.items.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name} — {item.price}
                    </option>
                  ))}
                </optgroup>
              ))}
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="appointment-date"
                className="block text-[10.5px] uppercase tracking-[0.2em] text-[#C0BBB1]"
              >
                Preferred date
              </label>
              <input
                id="appointment-date"
                type="date"
                value={date}
                min={today || undefined}
                onChange={(event) => {
                  setDate(event.target.value);
                  setError("");
                }}
                className="site-field mt-2"
              />
            </div>
            <div>
              <label
                htmlFor="appointment-time"
                className="block text-[10.5px] uppercase tracking-[0.2em] text-[#C0BBB1]"
              >
                Preferred time <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <input
                id="appointment-time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="site-field mt-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="appointment-note"
              className="block text-[10.5px] uppercase tracking-[0.2em] text-[#C0BBB1]"
            >
              Note <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <textarea
              id="appointment-note"
              rows={3}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="The look you have in mind, or anything the studio should know."
              className="site-field mt-2 resize-none"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-[#E0A88E]">
              {error}
            </p>
          )}

          <button type="submit" className="btn-gold w-full">
            Continue on WhatsApp
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <p className="text-center text-[11px] leading-relaxed text-[#C0BBB1]/65">
            {site.surcharge.label} {site.surcharge.note}
          </p>
        </form>
      </div>
    </dialog>
  );
}
