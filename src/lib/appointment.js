const STUDIO_TIME_ZONE = "Africa/Johannesburg";

export function studioToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-ZA", {
    timeZone: STUDIO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function isValidPreferredDate(value, today = studioToday()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value && value >= today;
}

export function formatPreferredDate(value) {
  return new Intl.DateTimeFormat("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: STUDIO_TIME_ZONE,
  }).format(new Date(`${value}T12:00:00Z`));
}

export function appointmentMessage({ service, date, time, note, surcharge }) {
  let message = `Hi Theo's Haircut Studio, I'd like to request an appointment for ${service} on ${formatPreferredDate(date)}`;
  if (time) message += `, preferably ${time}`;
  message += ".";
  if (note?.trim()) message += ` Note: ${note.trim()}`;
  message += ` Please confirm availability and the total including the R${surcharge} appointment surcharge.`;
  return message;
}
