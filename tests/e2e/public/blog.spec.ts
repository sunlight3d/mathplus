import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
  test('should load the blog page', async ({ page }) => {
    await page.goto('/blog');
    
    // Check if the heading is visible
    await expect(page.getByRole('heading', { name: /Góc Chia Sẻ & Tin Tức/i }).first()).toBeVisible();
  });
});
