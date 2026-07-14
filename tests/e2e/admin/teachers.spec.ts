import { test, expect } from '@playwright/test';

test.describe('Admin Teachers', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'mathplusvolamcaithe');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin');
  });

  test('should load the teachers management page', async ({ page }) => {
    await page.goto('/admin/teachers');
    
    // Check if the heading is visible
    await expect(page.getByRole('heading', { name: /Quản lý giáo viên/i }).first()).toBeVisible();
    
    // Check if the "Thêm giáo viên" button exists
    const addBtn = page.getByRole('link', { name: /Thêm giáo viên/i });
    if (await addBtn.isVisible()) {
      await expect(addBtn).toBeVisible();
    } else {
      const addBtnButton = page.getByRole('button', { name: /Thêm/i });
      await expect(addBtnButton).toBeVisible();
    }
  });
});
