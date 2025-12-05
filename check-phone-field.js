import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== PHONE FIELD ANALYSIS ===\n');
  
  await page.goto('https://www.lambdatest.com/selenium-playground/input-form-demo');
  await page.waitForTimeout(2000);
  
  // Check phone input
  const phoneInputs = await page.$$('input[type="tel"]');
  console.log(`Number of phone inputs found: ${phoneInputs.length}`);
  
  for (let i = 0; i < phoneInputs.length; i++) {
    const id = await phoneInputs[i].getAttribute('id');
    const name = await phoneInputs[i].getAttribute('name');
    const placeholder = await phoneInputs[i].getAttribute('placeholder');
    console.log(`  Phone input ${i + 1}: id="${id}", name="${name}", placeholder="${placeholder}"`);
  }
  
  // Check if phone field is in the correct form
  const nameInput = await page.$('input[name="name"]');
  if (nameInput) {
    const form = await nameInput.evaluateHandle(el => el.closest('form'));
    const phoneInForm = await form.$('input[type="tel"]');
    
    if (phoneInForm) {
      const name = await phoneInForm.getAttribute('name');
      console.log(`\nPhone field in correct form has name: "${name}"`);
      console.log(`Test uses: input[type="tel"]`);
      
      if (name !== 'phone') {
        console.log(`WARNING: Phone field name is "${name}", not "phone"`);
      }
    }
  }
  
  await browser.close();
})();
