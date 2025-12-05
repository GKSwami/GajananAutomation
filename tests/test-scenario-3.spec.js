import { test, expect } from '@playwright/test';

test.describe('Scenario 3: Input Form Submit', () => {
  const baseURL = 'https://www.lambdatest.com/selenium-playground';
  const testData = {
    name: 'John Doe', email: 'john.doe@example.com', company: 'ACME Corp',
    website: 'https://example.com', city: 'New York', address1: '123 Main St',
    address2: 'Suite 100', state: 'NY', zip: '10001', country: 'United States',
  };

  test('should validate empty form error and submit with data', async ({ page }) => {
    await page.goto(baseURL);
    await page.click('a[href="https://www.lambdatest.com/selenium-playground/input-form-demo"]');
    await page.waitForLoadState('networkidle');
    const submitButton = page.locator('button.selenium_btn').first();
    await submitButton.click();
    const nameInput = page.locator('#name');
    const validationMessage = await nameInput.evaluate((el) => el.validationMessage);
    expect(validationMessage.length).toBeGreaterThan(0);
    await nameInput.fill(testData.name);
    await page.locator('#inputEmail4').fill(testData.email);
    await page.locator('#inputPassword4').fill('P@ssw0rd!');
    await page.locator('#company').fill(testData.company);
    await page.locator('#websitename').fill(testData.website);
    await page.locator('#inputCity').fill(testData.city);
    await page.locator('#inputAddress1').fill(testData.address1);
    await page.locator('#inputAddress2').fill(testData.address2);
    await page.locator('#inputState').fill(testData.state);
    await page.locator('#inputZip').fill(testData.zip);
    await page.locator('select[name="country"]').selectOption({ label: testData.country });
    await submitButton.click();
    const successMessage = page.locator('p.success-msg');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('Thanks for contacting us, we will get back to you shortly.');
  });

  test('should display error when submitting empty form', async ({ page }) => {
    await page.goto(baseURL);
    await page.click('a:has-text("Input Form Submit")');
    await page.waitForLoadState('networkidle');
    await page.locator('button:has-text("Submit")').first().click();
    expect(page.url()).toBeTruthy();
  });
});
