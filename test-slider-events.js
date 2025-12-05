import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo');
  await page.waitForTimeout(2000);
  
  const targetValue = 95;
  const rangeLocator = page.locator('input[type="range"]').first();
  const displayValue = page.locator('#range');
  
  console.log('Initial output value:', await displayValue.textContent());
  
  // Check what events are attached
  const eventInfo = await rangeLocator.evaluate((el) => {
    const events = [];
    for (let key in el) {
      if (key.startsWith('on')) {
        events.push(key);
      }
    }
    return events;
  });
  console.log('Event handlers:', eventInfo);
  
  // Try different event combinations
  await rangeLocator.evaluate((el, value) => {
    el.value = String(value);
    
    // Try all possible events
    const events = ['input', 'change', 'click', 'mouseup', 'touchend'];
    events.forEach(eventType => {
      el.dispatchEvent(new Event(eventType, { bubbles: true }));
    });
  }, targetValue);
  
  await page.waitForTimeout(500);
  console.log('After all events - output value:', await displayValue.textContent());
  
  // Check if output is updated by a script watching the input
  const outputUpdateMethod = await page.evaluate(() => {
    const range = document.querySelector('input[type="range"]');
    const output = document.querySelector('#range');
    
    // Check if there's a direct relationship
    return {
      outputValue: output.textContent,
      inputValue: range.value,
      outputHTML: output.outerHTML
    };
  });
  console.log('Output info:', outputUpdateMethod);
  
  await browser.close();
})();
