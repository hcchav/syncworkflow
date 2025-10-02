import { test, expect } from '@playwright/test';

test.describe('WheelSpin E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/wheel-demo');
  });

  test('should render wheel and be interactive', async ({ page }) => {
    // Check if wheel is visible
    const wheel = page.getByRole('button', { name: /spin the wheel/i });
    await expect(wheel).toBeVisible();

    // Check if segments are rendered
    await expect(page.getByText('Coffee')).toBeVisible();
    await expect(page.getByText('Sticker Pack')).toBeVisible();
    await expect(page.getByText('10% Off')).toBeVisible();
  });

  test('should spin when clicked', async ({ page }) => {
    const wheel = page.getByRole('button', { name: /spin the wheel/i });
    const spinButton = page.getByRole('button', { name: /spin the wheel!/i });

    // Click spin button
    await spinButton.click();

    // Check if wheel becomes busy
    await expect(wheel).toHaveAttribute('aria-busy', 'true');

    // Wait for spin to complete
    await expect(wheel).toHaveAttribute('aria-busy', 'false', { timeout: 10000 });

    // Check if result is displayed
    await expect(page.getByText(/Result:/)).toBeVisible();
  });

  test('should be keyboard accessible', async ({ page }) => {
    const wheel = page.getByRole('button', { name: /spin the wheel/i });

    // Focus the wheel
    await wheel.focus();
    await expect(wheel).toBeFocused();

    // Press Enter to spin
    await wheel.press('Enter');

    // Check if wheel becomes busy
    await expect(wheel).toHaveAttribute('aria-busy', 'true');

    // Wait for completion
    await expect(wheel).toHaveAttribute('aria-busy', 'false', { timeout: 10000 });
  });

  test('should handle Space key', async ({ page }) => {
    const wheel = page.getByRole('button', { name: /spin the wheel/i });

    await wheel.focus();
    await wheel.press(' ');

    await expect(wheel).toHaveAttribute('aria-busy', 'true');
    await expect(wheel).toHaveAttribute('aria-busy', 'false', { timeout: 10000 });
  });

  test('should change skins', async ({ page }) => {
    // Click on Modern Helm skin
    await page.getByRole('button', { name: /modern helm/i }).click();

    // Verify wheel is still visible and functional
    const wheel = page.getByRole('button', { name: /spin the wheel/i });
    await expect(wheel).toBeVisible();

    // Click on Minimal skin
    await page.getByRole('button', { name: /minimal/i }).click();
    await expect(wheel).toBeVisible();

    // Click on Casino skin
    await page.getByRole('button', { name: /casino/i }).click();
    await expect(wheel).toBeVisible();
  });

  test('should perform targeted spins', async ({ page }) => {
    // Click on "Coffee" targeted spin button
    await page.getByRole('button', { name: 'Coffee' }).click();

    const wheel = page.getByRole('button', { name: /spin the wheel/i });
    
    // Wait for spin to complete
    await expect(wheel).toHaveAttribute('aria-busy', 'true');
    await expect(wheel).toHaveAttribute('aria-busy', 'false', { timeout: 10000 });

    // Check if result shows Coffee
    await expect(page.getByText(/Coffee/)).toBeVisible();
  });

  test('should toggle no-repeat mode', async ({ page }) => {
    const noRepeatCheckbox = page.getByRole('checkbox', { name: /no repeat until exhausted/i });
    
    // Toggle no-repeat mode
    await noRepeatCheckbox.check();
    await expect(noRepeatCheckbox).toBeChecked();

    // Spin the wheel
    const spinButton = page.getByRole('button', { name: /spin the wheel!/i });
    await spinButton.click();

    const wheel = page.getByRole('button', { name: /spin the wheel/i });
    await expect(wheel).toHaveAttribute('aria-busy', 'false', { timeout: 10000 });

    // Verify result is shown
    await expect(page.getByText(/Result:/)).toBeVisible();
  });

  test('should toggle weighted selection', async ({ page }) => {
    const weightedCheckbox = page.getByRole('checkbox', { name: /weighted selection/i });
    
    // Toggle weighted selection
    await weightedCheckbox.check();
    await expect(weightedCheckbox).toBeChecked();

    // Spin the wheel
    const spinButton = page.getByRole('button', { name: /spin the wheel!/i });
    await spinButton.click();

    const wheel = page.getByRole('button', { name: /spin the wheel/i });
    await expect(wheel).toHaveAttribute('aria-busy', 'false', { timeout: 10000 });

    // Verify result is shown
    await expect(page.getByText(/Result:/)).toBeVisible();
  });

  test('should show spin history', async ({ page }) => {
    const spinButton = page.getByRole('button', { name: /spin the wheel!/i });
    
    // Perform a spin
    await spinButton.click();

    const wheel = page.getByRole('button', { name: /spin the wheel/i });
    await expect(wheel).toHaveAttribute('aria-busy', 'false', { timeout: 10000 });

    // Check if history section shows the result
    const historySection = page.locator('text=Recent Results').locator('..');
    await expect(historySection).toBeVisible();
    
    // Should show at least one result in history
    await expect(historySection.locator('div').filter({ hasText: /#/ })).toHaveCount(1);
  });

  test('should prevent multiple simultaneous spins', async ({ page }) => {
    const spinButton = page.getByRole('button', { name: /spin the wheel!/i });
    const wheel = page.getByRole('button', { name: /spin the wheel/i });

    // Start first spin
    await spinButton.click();
    await expect(wheel).toHaveAttribute('aria-busy', 'true');

    // Try to start another spin - button should be disabled
    await expect(spinButton).toBeDisabled();

    // Wait for spin to complete
    await expect(wheel).toHaveAttribute('aria-busy', 'false', { timeout: 10000 });
    
    // Button should be enabled again
    await expect(spinButton).toBeEnabled();
  });

  test('should respect reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });

    const spinButton = page.getByRole('button', { name: /spin the wheel!/i });
    const wheel = page.getByRole('button', { name: /spin the wheel/i });

    // Spin should still work but complete faster
    await spinButton.click();
    await expect(wheel).toHaveAttribute('aria-busy', 'true');
    
    // Should complete faster with reduced motion
    await expect(wheel).toHaveAttribute('aria-busy', 'false', { timeout: 3000 });
  });

  test('should display code example', async ({ page }) => {
    // Check if code example is visible
    await expect(page.getByText('Usage Example')).toBeVisible();
    await expect(page.locator('pre')).toBeVisible();
    
    // Check if code contains expected content
    const codeBlock = page.locator('pre');
    await expect(codeBlock).toContainText('WheelSpin');
    await expect(codeBlock).toContainText('useRef');
    await expect(codeBlock).toContainText('WheelSpinRef');
  });
});
