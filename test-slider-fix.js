import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo');
  await page.waitForTimeout(2000);
  
  const targetValue = 95;
  const rangeLocator = page.locator('input[type="range"]').first();
  const displayValue = page.locator('//output').first();
  
  console.log('Initial output value:', await displayValue.textContent());
  console.log('Initial input value:', await rangeLocator.inputValue());
  
  // Try the current approach
  await rangeLocator.evaluate((el, value) => {
    el.value = String(value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, targetValue);
  
  await page.waitForTimeout(500);
  
  console.log('After JS set - output value:', await displayValue.textContent());
  console.log('After JS set - input value:', await rangeLocator.inputValue());
  
  // Check if there's a specific output element tied to the first slider
  const outputId = await displayValue.getAttribute('id');
  console.log('Output element ID:', outputId);
  
  await browser.close();
})();
