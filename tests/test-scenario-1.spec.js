import { test, expect } from '@playwright/test';

test.describe('Scenario 1: Simple Form Demo', () => {
  const baseURL = 'https://www.lambdatest.com/selenium-playground';
  const testMessage = 'Welcome to LambdaTest';

  test('should fill form and validate message', async ({ page }) => {
    // Step 1: Open LambdaTest Selenium Playground
    await page.goto(baseURL);
    
    // Step 2: Click "Simple Form Demo"
    // Locator 1: Using href attribute selector (direct link)
    await page.click('a[href="https://www.lambdatest.com/selenium-playground/simple-form-demo"]');
    
    // Step 3: Validate URL contains "simple-form-demo"
    await expect(page).toHaveURL(/simple-form-demo/);
    console.log(`✓ URL validation passed: ${page.url()}`);
    
    // Step 4 & 5: Create variable and enter message in text box
    // Locator 2: Using placeholder attribute selector
    const messageInput = page.locator('input[placeholder="Please enter your Message"]');
    await messageInput.fill(testMessage);
    
    // Step 6: Click "Get Checked Value" button
    // Locator 3: Using CSS class selector
    const getCheckButton = page.locator('button.btn-lg:has-text("Get Checked Value")');
    await getCheckButton.click();
    
    // Step 7: Validate message appears in "Your Message:" section
    const messageOutput = page.locator('#message');
    await expect(messageOutput).toContainText(testMessage);
    console.log(`✓ Message validation passed: "${testMessage}" is displayed`);
  });
});
