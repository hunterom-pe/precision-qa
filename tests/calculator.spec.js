import { test, expect } from '@playwright/test';

test.describe('Flaky Test Cost Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('calculates correct default value', async ({ page }) => {
    const lossValue = await page.locator('#annual-loss').textContent();
    expect(lossValue).toBe('$1,092,000');
  });

  test('updates value when sliders change', async ({ page }) => {
    const teamSlider = page.locator('#team-size');
    const hoursSlider = page.locator('#hours-wasted');

    // Simulate user sliding inputs
    await teamSlider.evaluate((el) => {
        el.value = 100;
        el.dispatchEvent(new Event('input', { bubbles: true }));
    });

    await hoursSlider.evaluate((el) => {
        el.value = 5;
        el.dispatchEvent(new Event('input', { bubbles: true }));
    });

    // 100 * 5 * 52 * 70 * 2 = 3,640,000
    const lossValue = await page.locator('#annual-loss').textContent();
    expect(lossValue).toBe('$3,640,000');
    
    // Check that displayed text values match the new slider bounds
    await expect(page.locator('#team-size-val')).toHaveText('100');
    await expect(page.locator('#hours-wasted-val')).toHaveText('5');
  });
});
