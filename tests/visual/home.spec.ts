import { test, expect } from "@playwright/test";

test("home hero", async ({ page }) => {
  await page.goto("/");
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(page.locator("main")).toBeVisible();
  await expect(page).toHaveScreenshot("home-hero.png", { fullPage: false });
});
