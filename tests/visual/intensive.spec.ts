import { test, expect } from "@playwright/test";

test("intensive hero", async ({ page }) => {
  await page.goto("/intensive");
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(page.locator("main")).toBeVisible();
  await expect(page).toHaveScreenshot("intensive-hero.png", { fullPage: false });
});
