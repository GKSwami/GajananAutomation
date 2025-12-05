import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
  
  // Wait for the page to load
  await page.waitForTimeout(3000);
  
  // Find all buttons on the page
  const buttons = await page.$$eval('button', btns => 
    btns.map(btn => ({
      text: btn.textContent.trim(),
      class: btn.className,
      id: btn.id
    }))
  );
  
  console.log('All buttons found:');
  console.log(JSON.stringify(buttons, null, 2));
  
  // Find the input field
  const inputField = await page.$('input[placeholder="Please enter your Message"]');
  if (inputField) {
    console.log('\nInput field found with placeholder: "Please enter your Message"');
    
    // Find the closest form or parent container
    const parentForm = await inputField.evaluateHandle(el => el.closest('form') || el.closest('div'));
    
    // Find buttons within the same container
    const nearbyButtons = await parentForm.$$eval('button', btns => 
      btns.map(btn => ({
        text: btn.textContent.trim(),
        class: btn.className
      }))
    );
    
    console.log('\nButtons near the input field:');
    console.log(JSON.stringify(nearbyButtons, null, 2));
  }
  
  await browser.close();
})();
