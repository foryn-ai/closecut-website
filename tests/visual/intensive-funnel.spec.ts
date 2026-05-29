import { test, expect } from "@playwright/test";

test("intensive funnel smoke", async ({ page }) => {
  await page.goto("/intensive");

  await expect(page.getByRole("heading", { name: "Intensive" })).toBeVisible();

  const waitlistCta = page.getByRole("link", { name: "Join the waitlist" }).first();
  await expect(waitlistCta).toBeVisible();
  await expect(waitlistCta).toHaveAttribute("href", "#conversion");

  await waitlistCta.click();
  await expect(page).toHaveURL(/#conversion$/);

  const conversionSection = page.locator("#conversion");
  await expect(conversionSection).toBeVisible();
});
