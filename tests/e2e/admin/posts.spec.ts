import { test, expect } from '@playwright/test';

test.describe('Admin Posts', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'mathplusvolamcaithe');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin');
  });

  test('should load the posts management page', async ({ page }) => {
    await page.goto('/admin/posts');
    
    // Check if the heading is visible
    await expect(page.getByRole('heading', { name: /Quản lý bài viết/i }).first()).toBeVisible();
    
    // Check if the "Thêm bài viết" button exists
    const addBtn = page.getByRole('link', { name: /Thêm bài viết/i });
    if (await addBtn.isVisible()) {
      await expect(addBtn).toBeVisible();
    } else {
      const addBtnButton = page.getByRole('button', { name: /Thêm/i });
      await expect(addBtnButton).toBeVisible();
    }
  });
});
