import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== SCENARIO 1: Simple Form Demo ===');
  await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
  await page.waitForTimeout(2000);
  
  // Check for button with class btn-lg
  const btnLgButtons = await page.$$eval('button.btn-lg', btns => 
    btns.map(btn => ({
      text: btn.textContent.trim(),
      class: btn.className
    }))
  );
  console.log('Buttons with class btn-lg:', JSON.stringify(btnLgButtons, null, 2));
  
  // Check for all buttons containing "Get"
  const getButtons = await page.$$eval('button', btns => 
    btns.filter(btn => btn.textContent.includes('Get')).map(btn => ({
      text: btn.textContent.trim(),
      class: btn.className,
      id: btn.id
    }))
  );
  console.log('Buttons containing "Get":', JSON.stringify(getButtons, null, 2));
  
  // Check the output element
  const outputElement = await page.$('#message');
  if (outputElement) {
    console.log('Output element #message found');
  } else {
    console.log('Output element #message NOT found');
    // Try to find similar elements
    const possibleOutputs = await page.$$eval('[id*="message"], [class*="message"]', els =>
      els.map(el => ({
        tag: el.tagName,
        id: el.id,
        class: el.className
      }))
    );
    console.log('Possible output elements:', JSON.stringify(possibleOutputs, null, 2));
  }
  
  console.log('\n=== SCENARIO 3: Input Form ===');
  await page.goto('https://www.lambdatest.com/selenium-playground/input-form-demo');
  await page.waitForTimeout(2000);
  
  // Count email inputs
  const emailInputs = await page.$$('input[type="email"]');
  console.log(`Number of email inputs found: ${emailInputs.length}`);
  
  // Get details of all email inputs
  const emailDetails = await page.$$eval('input[type="email"]', inputs =>
    inputs.map((input, idx) => ({
      index: idx,
      id: input.id,
      name: input.name,
      placeholder: input.placeholder
    }))
  );
  console.log('Email input details:', JSON.stringify(emailDetails, null, 2));
  
  // Check for the correct form (the one with name="name")
  const nameInput = await page.$('input[name="name"]');
  if (nameInput) {
    const formElement = await nameInput.evaluateHandle(el => el.closest('form'));
    const formInputs = await formElement.$$eval('input, textarea, select', els =>
      els.map(el => ({
        tag: el.tagName,
        type: el.type,
        name: el.name,
        id: el.id,
        required: el.required
      }))
    );
    console.log('\nInputs in the correct form (with name="name"):', JSON.stringify(formInputs, null, 2));
  }
  
  await browser.close();
})();
