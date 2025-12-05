import { test, expect } from '@playwright/test';

test.describe('Scenario 1: Simple Form Demo', () => {
  const baseURL = 'https://www.lambdatest.com/selenium-playground';
  const testMessage = 'Welcome to LambdaTest';

  test('should fill form and validate message', async ({ page }) => {
    await page.goto(baseURL);
    await page.click('a[href="https://www.lambdatest.com/selenium-playground/simple-form-demo"]');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/simple-form-demo/);
    await page.locator('input#user-message').fill(testMessage);
    await page.locator('button#showInput').click();
    await expect(page.locator('#message')).toContainText(testMessage);
  });
});
