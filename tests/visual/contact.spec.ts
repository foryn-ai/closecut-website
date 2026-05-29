import { test, expect } from "@playwright/test";

test("contact form", async ({ page }) => {
  await page.goto("/contact");
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(page.locator("main")).toBeVisible();
  await expect(page).toHaveScreenshot("contact-form.png", { fullPage: true });
});
