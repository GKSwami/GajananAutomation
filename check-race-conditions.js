import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== RACE CONDITION ANALYSIS ===\n');
  
  // Check Scenario 1 for race conditions
  console.log('SCENARIO 1: Simple Form Demo');
  console.log('-----------------------------');
  await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
  
  const messageInput = page.locator('input[placeholder="Please enter your Message"]');
  await messageInput.fill('Welcome to LambdaTest');
  
  // Check if button is immediately clickable
  const button = page.locator('button:has-text("Get Checked Value")');
  const isVisible = await button.isVisible();
  const isEnabled = await button.isEnabled();
  
  console.log(`Button visible: ${isVisible}`);
  console.log(`Button enabled: ${isEnabled}`);
  console.log('Test has NO explicit wait before clicking button');
  console.log('VERDICT: Potential race condition if page loads slowly\n');
  
  // Check Scenario 2 for race conditions
  console.log('SCENARIO 2: Drag & Drop Sliders');
  console.log('--------------------------------');
  await page.goto('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo');
  
  // Test waits for networkidle
  console.log('Test uses: await page.waitForLoadState("networkidle")');
  console.log('VERDICT: Good - has explicit wait for network idle\n');
  
  // Check Scenario 3 for race conditions
  console.log('SCENARIO 3: Input Form Submit');
  console.log('------------------------------');
  await page.goto('https://www.lambdatest.com/selenium-playground/input-form-demo');
  
  console.log('Test uses: await page.waitForLoadState("networkidle")');
  console.log('Test clicks submit button using .first()');
  
  // Check how many submit buttons exist
  const submitButtons = await page.$$('button:has-text("Submit")');
  console.log(`Number of "Submit" buttons found: ${submitButtons.length}`);
  
  for (let i = 0; i < submitButtons.length; i++) {
    const text = await submitButtons[i].textContent();
    const isVisible = await submitButtons[i].isVisible();
    console.log(`  Button ${i + 1}: text="${text.trim()}", visible=${isVisible}`);
  }
  
  console.log('Test uses .first() which may select wrong button if multiple exist');
  console.log('VERDICT: Potential issue - should use more specific selector\n');
  
  // Check for missing assertions
  console.log('=== MISSING ASSERTIONS ===\n');
  
  console.log('SCENARIO 1:');
  console.log('- ✓ URL validation present');
  console.log('- ✓ Message output validation present');
  console.log('- ✗ NO validation that button was actually clicked');
  console.log('- ✗ NO validation that input was filled correctly\n');
  
  console.log('SCENARIO 2:');
  console.log('- ✓ Input value validation present');
  console.log('- ✓ Output value validation present (but will fail due to bug)');
  console.log('- ✗ NO validation that slider moved visually\n');
  
  console.log('SCENARIO 3:');
  console.log('- ✓ Validation message check present');
  console.log('- ✓ Success message validation present');
  console.log('- ✗ NO validation that all fields were filled');
  console.log('- ✗ NO validation that country was selected correctly');
  console.log('- ✗ NO validation of form state before submission\n');
  
  await browser.close();
})();
