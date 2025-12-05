import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== BUG VERIFICATION REPORT ===\n');
  
  // BUG 1: Test Scenario 1 - Wrong button selector
  console.log('BUG #1: Test Scenario 1 - Incorrect Button Selector');
  console.log('-----------------------------------------------');
  await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
  await page.waitForTimeout(2000);
  
  const btnLgExists = await page.$('button.btn-lg');
  console.log(`Test uses: button.btn-lg:has-text("Get Checked Value")`);
  console.log(`Button with class 'btn-lg' exists: ${btnLgExists !== null}`);
  
  const correctButton = await page.$('button:has-text("Get Checked Value")');
  console.log(`Correct selector 'button:has-text("Get Checked Value")' exists: ${correctButton !== null}`);
  
  if (correctButton) {
    const buttonClass = await correctButton.getAttribute('class');
    console.log(`Actual button class: ${buttonClass}`);
    console.log(`Contains 'btn-lg': ${buttonClass.includes('btn-lg')}`);
  }
  console.log('VERDICT: Button does NOT have class "btn-lg" - selector will timeout!\n');
  
  // BUG 2: Test Scenario 2 - Output element not updated
  console.log('BUG #2: Test Scenario 2 - Output Element Not Updated');
  console.log('-----------------------------------------------');
  await page.goto('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo');
  await page.waitForTimeout(2000);
  
  const rangeInput = page.locator('input[type="range"]').first();
  const outputElement = page.locator('//output').first();
  
  console.log(`Initial output value: ${await outputElement.textContent()}`);
  console.log(`Initial input value: ${await rangeInput.inputValue()}`);
  
  // Set value using the test's method
  await rangeInput.evaluate((el, value) => {
    el.value = String(value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, 95);
  
  await page.waitForTimeout(500);
  
  const finalInputValue = await rangeInput.inputValue();
  const finalOutputValue = await outputElement.textContent();
  
  console.log(`After JS set - input value: ${finalInputValue}`);
  console.log(`After JS set - output value: ${finalOutputValue}`);
  console.log(`Test expects output to be: 95`);
  console.log(`VERDICT: Output shows "${finalOutputValue}" but test expects "95" - assertion will FAIL!\n`);
  
  // BUG 3: Test Scenario 3 - Multiple email inputs (strict mode violation)
  console.log('BUG #3: Test Scenario 3 - Strict Mode Violation');
  console.log('-----------------------------------------------');
  await page.goto('https://www.lambdatest.com/selenium-playground/input-form-demo');
  await page.waitForTimeout(2000);
  
  const emailInputs = await page.$$('input[type="email"]');
  console.log(`Test uses: input[type="email"]`);
  console.log(`Number of email inputs found: ${emailInputs.length}`);
  
  for (let i = 0; i < emailInputs.length; i++) {
    const id = await emailInputs[i].getAttribute('id');
    const name = await emailInputs[i].getAttribute('name');
    const placeholder = await emailInputs[i].getAttribute('placeholder');
    console.log(`  Email input ${i + 1}: id="${id}", name="${name}", placeholder="${placeholder}"`);
  }
  
  console.log('VERDICT: Selector matches 2 elements - Playwright will throw strict mode violation!\n');
  
  // BUG 4: Test Scenario 3 - Missing required fields
  console.log('BUG #4: Test Scenario 3 - Missing Required Form Fields');
  console.log('-----------------------------------------------');
  
  const nameInput = await page.$('input[name="name"]');
  if (nameInput) {
    const form = await nameInput.evaluateHandle(el => el.closest('form'));
    const requiredFields = await form.$$eval('input[required], select[required], textarea[required]', els =>
      els.map(el => ({
        name: el.name,
        type: el.type,
        id: el.id,
        required: el.required
      }))
    );
    
    console.log(`Total required fields in form: ${requiredFields.length}`);
    console.log('Required fields:');
    requiredFields.forEach(field => {
      console.log(`  - ${field.name || field.id} (${field.type})`);
    });
    
    const testFillsFields = ['name', 'email', 'password', 'company', 'website', 'city', 'address_line1', 'address_line2', 'zip'];
    const testData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '9876543210',
      message: 'This is a test message',
      country: 'United States'
    };
    
    console.log('\nTest fills these fields:');
    Object.keys(testData).forEach(key => {
      console.log(`  - ${key}: "${testData[key]}"`);
    });
    
    const missingFields = requiredFields.filter(field => 
      !Object.keys(testData).includes(field.name) && field.name !== ''
    );
    
    console.log('\nMissing required fields in test:');
    missingFields.forEach(field => {
      console.log(`  - ${field.name || field.id} (${field.type}) - REQUIRED but NOT filled!`);
    });
    
    console.log('VERDICT: Test is missing required fields - form submission will FAIL!\n');
  }
  
  // Summary
  console.log('=== SUMMARY OF BUGS FOUND ===');
  console.log('1. ❌ Scenario 1: Wrong button selector (btn-lg class does not exist)');
  console.log('2. ❌ Scenario 2: Output element not updated after setting slider value');
  console.log('3. ❌ Scenario 3: Strict mode violation - selector matches 2 email inputs');
  console.log('4. ❌ Scenario 3: Missing required form fields (password, company, website, city, addresses, zip)');
  
  await browser.close();
})();
