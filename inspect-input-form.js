import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.lambdatest.com/selenium-playground/input-form-demo');
  
  // Wait for the page to load
  await page.waitForTimeout(3000);
  
  // Find all form inputs
  const inputs = await page.$$eval('input, textarea, select', elements => 
    elements.map(el => ({
      tag: el.tagName,
      type: el.type,
      name: el.name,
      id: el.id,
      placeholder: el.placeholder,
      required: el.required
    }))
  );
  
  console.log('All form fields found:');
  console.log(JSON.stringify(inputs, null, 2));
  
  // Find submit button
  const buttons = await page.$$eval('button', btns => 
    btns.map(btn => ({
      text: btn.textContent.trim(),
      type: btn.type,
      class: btn.className
    }))
  );
  
  console.log('\nAll buttons found:');
  console.log(JSON.stringify(buttons, null, 2));
  
  await browser.close();
})();
