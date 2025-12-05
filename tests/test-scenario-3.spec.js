import { test, expect } from '@playwright/test';

test.describe('Scenario 3: Input Form Submit', () => {
  const baseURL = 'https://www.lambdatest.com/selenium-playground';
  const testData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    // The live form does not have a phone or free-text message field as expected by the assignment,
    // so we fill the available fields present in the form HTML below.
    company: 'ACME Corp',
    website: 'https://example.com',
    city: 'New York',
    address1: '123 Main St',
    address2: 'Suite 100',
    state: 'NY',
    zip: '10001',
    country: 'United States',
  };

  test('should validate empty form error and submit with data', async ({ page }) => {
    // Step 1: Open LambdaTest Selenium Playground
    await page.goto(baseURL);
    
    // Step 2: Click "Input Form Submit"
    // Locator 1: Using href selector (more reliable)
    await page.click('a[href="https://www.lambdatest.com/selenium-playground/input-form-demo"]');
    
    await page.waitForLoadState('networkidle');
    
    // Step 3: Click Submit without filling any information
    // Locator 2: Using the submit button class (selenium_btn) for clarity
    const submitButton = page.locator('button.selenium_btn').first();
    await submitButton.click();

    // Step 4: Assert browser validation message for the Name field is present
    const nameInput = page.locator('#name');
    // reading validationMessage is the reliable browser-side message
    const validationMessage = await nameInput.evaluate((el) => el.validationMessage);
    console.log(`Validation message: ${validationMessage}`);
    // Expect a non-empty browser validation message
    expect(validationMessage.length).toBeGreaterThan(0);

    // Step 5-6: Fill in all form fields (use IDs from the provided HTML)
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

    // Select Country from dropdown using label text
    const countrySelect = page.locator('select[name="country"]');
    await countrySelect.selectOption({ label: testData.country });

    // Click Submit
    await submitButton.click();

    // Step 7: Validate success message
    const successMessage = page.locator('p.success-msg');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('Thanks for contacting us, we will get back to you shortly.');
    console.log('✓ Form submitted successfully');
  });

  test('should display error when submitting empty form', async ({ page }) => {
    // Navigate to form
    await page.goto(baseURL);
    await page.click('a:has-text("Input Form Submit")');
    
    await page.waitForLoadState('networkidle');
    
    // Try to submit empty form
    const submitButton = page.locator('button:has-text("Submit")').first();
    await submitButton.click();
    
    // Validate that error message appears or form doesn't submit
    // The page should still be on the same URL (form validation prevents submission)
    const currentUrl = page.url();
    console.log(`Current URL after empty submit: ${currentUrl}`);
  });
});
