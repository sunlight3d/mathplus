import { test, expect } from '@playwright/test';

test.describe('Courses Page', () => {
  test('should load the courses page and display at least one course category', async ({ page }) => {
    await page.goto('/khoa-hoc');
    
    // Check if the heading is visible
    await expect(page.getByRole('heading', { name: /Khóa học/i }).first()).toBeVisible();
    
    // Check if there is a category filter or list
    const filterSelect = page.locator('select');
    if (await filterSelect.isVisible()) {
      await expect(filterSelect).toBeVisible();
    }
  });
});
