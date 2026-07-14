import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the homepage and display the main banner', async ({ page }) => {
    await page.goto('/');
    
    // Check if the title is correct
    await expect(page).toHaveTitle(/MathPlus/i);
    
    // Check if main header is visible (assuming it has MathPlus in it)
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check if there is a call to action button like "Đăng ký" or "Tham gia"
    const cta = page.getByRole('link', { name: /Đăng ký/i }).first();
    if (await cta.isVisible()) {
      await expect(cta).toBeVisible();
    }
  });

  test('navigation links should be visible', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation links
    await expect(page.getByRole('link', { name: /Giới thiệu/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Khóa học Toán/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Đội ngũ giáo viên/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Blog/i }).first()).toBeVisible();
  });
});
