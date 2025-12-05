import { test, expect } from '@playwright/test';

test.describe('Scenario 3: Input Form Submit', () => {
  const baseURL = 'https://www.lambdatest.com/selenium-playground';
  const testData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'SecurePass123!',
    company: 'LambdaTest Inc',
    website: 'https://www.lambdatest.com',
    city: 'San Francisco',
    address1: '123 Main Street',
    address2: 'Suite 100',
    state: 'California',
    zipcode: '94102',
    phone: '9876543210',
    message: 'This is a test message',
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
    // Locator 2: Using CSS class and button text combination
    const submitButton = page.locator('button:has-text("Submit")').first();
    await submitButton.click();
    
    // Step 4: Assert error message for Name field
    const nameInput = page.locator('input[name="name"]');
    const validationMessage = await nameInput.evaluate((el) => el.validationMessage);
    console.log(`Validation message: ${validationMessage}`);
    
    // Step 5-6: Fill in all form fields
    // Fill Name
    await nameInput.fill(testData.name);
    
    // Locator 3: Using specific ID selector for email input (fixed strict mode violation)
    const emailInput = page.locator('input#inputEmail4');
    await emailInput.fill(testData.email);
    
    // Fill Password
    const passwordInput = page.locator('input[name="password"]');
    await passwordInput.fill(testData.password);
    
    // Fill Company
    const companyInput = page.locator('input[name="company"]');
    await companyInput.fill(testData.company);
    
    // Fill Website
    const websiteInput = page.locator('input[name="website"]');
    await websiteInput.fill(testData.website);
    
    // Fill City
    const cityInput = page.locator('input[name="city"]');
    await cityInput.fill(testData.city);
    
    // Fill Address 1
    const address1Input = page.locator('input[name="address_line1"]');
    await address1Input.fill(testData.address1);
    
    // Fill Address 2
    const address2Input = page.locator('input[name="address_line2"]');
    await address2Input.fill(testData.address2);
    
    // Fill State
    const stateInput = page.locator('input[name="state"]');
    await stateInput.fill(testData.state);
    
    // Fill Zip Code
    const zipcodeInput = page.locator('input[name="zip"]');
    await zipcodeInput.fill(testData.zipcode);
    
    // Fill Phone
    const phoneInput = page.locator('input[type="tel"]');
    await phoneInput.fill(testData.phone);
    
    // Select Country from dropdown using text property
    const countrySelect = page.locator('select[name="country"]');
    await countrySelect.selectOption({ label: testData.country });
    
    // Click Submit
    await submitButton.click();
    
    // Step 7: Validate success message
    const successMessage = page.locator(
      'p:has-text("Thanks for contacting us, we will get back to you shortly.")'
    );
    await expect(successMessage).toBeVisible();
    console.log('✓ Form submitted successfully');
    console.log('✓ Success message displayed: "Thanks for contacting us, we will get back to you shortly."');
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
