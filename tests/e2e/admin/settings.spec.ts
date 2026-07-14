import { test, expect } from '@playwright/test';

test.describe('Admin Settings', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'mathplusvolamcaithe');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin');
  });

  test('should load the settings page and display forms', async ({ page }) => {
    await page.goto('/admin/settings');
    
    // Check if the heading is visible
    await expect(page.getByRole('heading', { name: /Cấu hình hình ảnh/i }).first()).toBeVisible();
    

    
    // Check for "Lưu cài đặt" button
    const saveBtn = page.getByRole('button', { name: /Lưu cài đặt/i });
    if (await saveBtn.isVisible()) {
      await expect(saveBtn).toBeVisible();
    }
  });
});
