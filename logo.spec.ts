import { test, expect } from '@playwright/test';

test('logo_should_redirect_to_landing_page', async ({ page }) => {
  await page.goto('/');
  const logo = page.locator('a[aria-label="Pluralsight"]');
  await expect(logo).toBeVisible();
  await logo.click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL('https://www.pluralsight.com/search');
  await page.waitForTimeout(3000);

 });