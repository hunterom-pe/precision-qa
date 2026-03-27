import { test, expect } from '@playwright/test';

test.describe('Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('FAQ accordion toggles visibility properly', async ({ page }) => {
    const firstFaq = page.locator('.faq-item').first();
    const firstQuestion = firstFaq.locator('.faq-question');

    // Ensure it starts closed
    await expect(firstFaq).not.toHaveClass(/active/);
    
    // Click to open
    await firstQuestion.click();
    await expect(firstFaq).toHaveClass(/active/);

    // Click subsequent item
    const secondFaq = page.locator('.faq-item').nth(1);
    const secondQuestion = secondFaq.locator('.faq-question');

    await secondQuestion.click();

    // Verify the visual accordion "solo mode" logic operates (only one open at a time)
    await expect(firstFaq).not.toHaveClass(/active/);
    await expect(secondFaq).toHaveClass(/active/);
  });
});
