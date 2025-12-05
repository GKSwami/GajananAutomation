import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo');
  
  // Wait for the page to load
  await page.waitForTimeout(3000);
  
  // Find all range sliders
  const sliders = await page.$$eval('input[type="range"]', elements => 
    elements.map((el, index) => ({
      index: index,
      id: el.id,
      name: el.name,
      min: el.min,
      max: el.max,
      value: el.value,
      step: el.step
    }))
  );
  
  console.log('All range sliders found:');
  console.log(JSON.stringify(sliders, null, 2));
  
  // Find all output elements
  const outputs = await page.$$eval('output', elements => 
    elements.map((el, index) => ({
      index: index,
      id: el.id,
      text: el.textContent.trim()
    }))
  );
  
  console.log('\nAll output elements found:');
  console.log(JSON.stringify(outputs, null, 2));
  
  await browser.close();
})();
