import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test('should load the about page', async ({ page }) => {
    await page.goto('/gioi-thieu');
    
    // Check if the heading is visible
    await expect(page.getByRole('heading', { name: /Về MathPlus/i }).first()).toBeVisible();
  });
});
