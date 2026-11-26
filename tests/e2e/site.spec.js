import { test, expect } from "@playwright/test";

test("hero portraits load, can be selected while paused, and respect reduced motion", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Cuts, Xbox and pool at Theo’s.", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Pause slideshow", exact: true }).click();
  const thirdSlide = page.getByRole("button", { name: "Show photo 3 of 3", exact: true });
  await thirdSlide.click();
  await expect(thirdSlide).toHaveAttribute("aria-current", "true");
  await expect(page.locator(".hero-photo").nth(2)).toHaveCSS("opacity", "1");
  await expect.poll(() => page.locator(".hero-portrait").evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true);
  await expect(page.getByRole("button", { name: "Play slideshow", exact: true })).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByRole("button", { name: "Play slideshow", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Show photo 1 of 3", exact: true }).click();
  await expect(page.locator(".hero-photo").first()).toHaveCSS("opacity", "1");
});

test("the migrated page renders, loads local media and never calls the former platform", async ({ page }, testInfo) => {
  const platformRequests = [];
  const errors = [];
  page.on("request", (request) => {
    if (/base44|wixstatic/i.test(request.url())) platformRequests.push(request.url());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle("Theo's Haircut Studio | Lyttelton");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Precision.Style.Confidence.");
  await expect(page.getByRole("heading", { name: "Work & services" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Price list" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Find the studio" })).toBeVisible();
  await page.locator("#visit").scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator("img").evaluateAll((images) => images.filter((img) => img.loading !== "lazy" && (!img.complete || img.naturalWidth === 0)).length)).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(platformRequests).toEqual([]);
  expect(errors).toEqual([]);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: testInfo.outputPath("page.png"), fullPage: true });
});

test("service panels select the right prices and pricing tabs support the keyboard", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Colour prices" }).click();
  await expect(page.getByRole("tab", { name: "Colour", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Cut and bleach");
  await expect(page.getByRole("tabpanel")).toContainText("R300");
  await page.getByRole("tab", { name: "Colour", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Locs", exact: true })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Crotchet and cut");
});

test("booking rejects past dates and creates the correct WhatsApp request without sending it", async ({ page }) => {
  await page.addInitScript(() => {
    window.open = (url) => { window.__appointmentUrl = url; return null; };
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Book a cut", exact: true }).first().click();
  const dialog = page.getByRole("dialog", { name: "Request an appointment", exact: true });
  await expect(dialog).toBeVisible();
  await page.getByLabel("Service", { exact: true }).selectOption("Standard cut");
  await page.getByLabel("Preferred date", { exact: true }).fill("2020-01-01");
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  await expect(page.getByRole("alert")).toHaveText("Please choose today or a future date.");
  expect(await page.evaluate(() => window.__appointmentUrl)).toBeUndefined();
  await page.getByLabel("Preferred date", { exact: true }).fill("2099-12-01");
  await page.getByLabel("Preferred time", { exact: false }).fill("14:30");
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  const url = new URL(await page.evaluate(() => window.__appointmentUrl));
  expect(url.origin + url.pathname).toBe("https://wa.me/27627656050");
  expect(url.searchParams.get("text")).toContain("Standard cut");
  expect(url.searchParams.get("text")).toContain("14:30");
  expect(url.searchParams.get("text")).toContain("R50 appointment surcharge");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("gallery opens with local videos and closing it pauses playback", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator("video source").count()).toBe(0);
  await page.getByRole("button", { name: "View all work", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Work gallery", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("figure")).toHaveCount(8);
  await expect(dialog.locator("video source")).toHaveCount(2);
  const video = page.locator('dialog[aria-label="Work gallery"] video').first();
  await video.evaluate(async (element) => { element.muted = true; await element.play(); });
  await expect.poll(() => video.evaluate((element) => element.paused)).toBe(false);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  expect(await video.evaluate((element) => element.paused)).toBe(true);
});

test("mobile menu supports focus, closes after navigation, and restores scrolling", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile navigation only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  const menu = page.getByRole("dialog", { name: "Menu", exact: true });
  await expect(menu).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await menu.getByRole("link", { name: "Prices", exact: true }).click();
  await expect(menu).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Open menu", exact: true })).toBeFocused();
});
