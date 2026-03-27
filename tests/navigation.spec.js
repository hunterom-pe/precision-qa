import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to the About page and back', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Precision QA/);
    await expect(page.locator('h1.hero-title')).toContainText('Ship SaaS');

    await page.click('nav a:has-text("About")');

    await page.waitForURL('**/about.html');

    await expect(page).toHaveTitle(/About Precision QA/);
    await expect(page.locator('h1.hero-title')).toContainText('Defining the Standard');

    await page.click('.logo a');

    await page.waitForURL('**/index.html*');
    await expect(page.locator('h1.hero-title')).toContainText('Ship SaaS');
  });

  test('anchor links should route to sections', async ({ page }) => {
    await page.goto('/');

    await page.click('nav a[href="#services"]');
    expect(page.url()).toContain('#services');
    
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeVisible();
  });
});
