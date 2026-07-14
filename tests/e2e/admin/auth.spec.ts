import { test, expect } from '@playwright/test';

test.describe('Admin Login', () => {
  test('should display error on invalid login', async ({ page }) => {
    await page.goto('/admin/login');
    
    await page.fill('input[name="username"]', 'wronguser');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');
    
    // Should see error message
    await expect(page.locator('text=không chính xác').first()).toBeVisible();
  });

  test('should login successfully and redirect to admin dashboard', async ({ page }) => {
    await page.goto('/admin/login');
    
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'mathplusvolamcaithe');
    await page.click('button[type="submit"]');
    
    // Should be redirected to /admin
    await page.waitForURL('**/admin');
    
    // Should see Dashboard elements
    await expect(page.getByRole('heading', { name: /Quản lý hệ thống/i }).first()).toBeVisible();
    await expect(page.getByText('Tổng quan').first()).toBeVisible();
  });
});
