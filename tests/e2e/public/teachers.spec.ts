import { test, expect } from '@playwright/test';

test.describe('Teachers Page', () => {
  test('should load the teachers page', async ({ page }) => {
    await page.goto('/doi-ngu-giao-vien');
    
    // Check if the heading is visible
    await expect(page.getByRole('heading', { name: /Đội ngũ giáo viên/i }).first()).toBeVisible();
    
    // Wait for network idle or teachers to load
    await page.waitForLoadState('networkidle');
    
    // Check if at least one teacher card is rendered
    const images = page.locator('img');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);
  });
});
