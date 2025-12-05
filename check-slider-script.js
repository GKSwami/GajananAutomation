import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo');
  await page.waitForTimeout(2000);
  
  // Check the page source for the slider update logic
  const pageContent = await page.content();
  
  // Look for script tags or event listeners
  const scripts = await page.$$eval('script', scripts => 
    scripts.map(s => s.textContent).filter(t => t && (t.includes('range') || t.includes('output') || t.includes('slider')))
  );
  
  console.log('Scripts related to slider:');
  scripts.forEach((script, idx) => {
    console.log(`\n--- Script ${idx + 1} ---`);
    console.log(script.substring(0, 500));
  });
  
  // Try to manually update the output element
  const result = await page.evaluate(() => {
    const range = document.querySelector('input[type="range"]');
    const output = document.querySelector('#range');
    
    // Set the value
    range.value = '95';
    
    // Manually update the output (this is what the page script should do)
    output.textContent = range.value;
    
    return {
      inputValue: range.value,
      outputValue: output.textContent
    };
  });
  
  console.log('\n\nAfter manual update:', result);
  
  await browser.close();
})();
