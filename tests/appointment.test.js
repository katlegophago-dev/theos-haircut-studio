import test from "node:test";
import assert from "node:assert/strict";
import { appointmentMessage, isValidPreferredDate, studioToday } from "../src/lib/appointment.js";

test("booking dates use Johannesburg's day across UTC midnight", () => {
  assert.equal(studioToday(new Date("2026-11-26T22:30:00Z")), "2026-11-27");
  assert.equal(studioToday(new Date("2026-12-31T22:01:00Z")), "2027-01-01");
});

test("past and impossible dates cannot reach the WhatsApp request", () => {
  assert.equal(isValidPreferredDate("2026-11-26", "2026-11-27"), false);
  assert.equal(isValidPreferredDate("2026-02-30", "2026-01-01"), false);
  assert.equal(isValidPreferredDate("2026-13-01", "2026-01-01"), false);
  assert.equal(isValidPreferredDate("", "2026-01-01"), false);
  assert.equal(isValidPreferredDate("2026-11-27", "2026-11-27"), true);
  assert.equal(isValidPreferredDate("2028-02-29", "2028-02-28"), true);
});

test("the request preserves the service, time and note and uses the configured surcharge", () => {
  const message = appointmentMessage({
    service: "Cut and wash", date: "2026-11-27", time: "14:30", note: "  A low fade  ", surcharge: 75,
  });
  assert.match(message, /Cut and wash/);
  assert.match(message, /27 November 2026/);
  assert.match(message, /preferably 14:30/);
  assert.match(message, /Note: A low fade/);
  assert.match(message, /R75 appointment surcharge/);
  assert.match(message, /Please confirm availability/);
  assert.equal(decodeURIComponent(encodeURIComponent(message)), message);
});
