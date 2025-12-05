import { test, expect } from '@playwright/test';

test.describe('Scenario 2: Drag & Drop Sliders', () => {
  const baseURL = 'https://www.lambdatest.com/selenium-playground';
  const targetValue = 95;

  test('should set slider to 95 (robust)', async ({ page }) => {
    // Step 1: Open LambdaTest Selenium Playground
    await page.goto(baseURL);

    // Step 2: Click "Drag & Drop Sliders" using href (more reliable)
    // Wait for navigation triggered by the link, then locate the slider on the new page
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('a[href="https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo"]'),
    ]);

    // Re-select the slider after navigation and wait until it's visible/attached
    const rangeLocator = page.locator('#slider3 input[type="range"]');
    await rangeLocator.waitFor({ state: 'visible' });

    // Robustly scroll into view and get bounding box (retry a couple times if detached)
    let sliderBox = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await rangeLocator.scrollIntoViewIfNeeded();
        sliderBox = await rangeLocator.boundingBox();
        if (sliderBox) break;
      } catch (err) {
        // If it's a transient detached error, wait and retry
        if (attempt === 2) throw err;
        await page.waitForTimeout(150);
      }
    }
    if (!sliderBox) throw new Error('Slider bounding box not found after retries');

    // Read min/max/current values from the element
    const { min: minStr, max: maxStr, value: currentStr } = await rangeLocator.evaluate((el) => ({
      min: el.min || '0',
      max: el.max || '100',
      value: el.value || el.defaultValue || '0',
    }));
    const min = Number(minStr);
    const max = Number(maxStr);
    const currentValue = Number(currentStr);

    // Calculate start and target positions on the slider track
    // Start at the current thumb position for a natural drag
    const startX = sliderBox.x + ((currentValue - min) / (max - min)) * sliderBox.width;
    const centerY = sliderBox.y + sliderBox.height / 2;
    const targetX = sliderBox.x + ((targetValue - min) / (max - min)) * sliderBox.width;

    // Move mouse to start, press, move to target, release
    await page.mouse.move(startX, centerY);
    await page.mouse.down();
    // Smoothly move in steps to mimic user drag
    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      const intermediateX = startX + ((targetX - startX) * i) / steps;
      await page.mouse.move(intermediateX, centerY, { steps: 2 });
    }
    await page.mouse.up();

    // Verify the input's value updated to target (allow short delay for UI to react)
    await page.waitForTimeout(200);
    let actualValue = await rangeLocator.inputValue();
    console.log(`Range input value after drag: ${actualValue}`);
    
    // If value is off by 1-2, make a small adjustment drag to fine-tune
    let attempts = 0;
    while (Math.abs(Number(actualValue) - targetValue) > 1 && attempts < 3) {
      const diff = Number(actualValue) - targetValue;
      const direction = diff > 0 ? -1 : 1; // move left if too high, right if too low
      const adjustX = targetX + (direction * sliderBox.width * 0.02); // 2% of track width
      
      await page.mouse.move(adjustX, centerY);
      await page.mouse.down();
      await page.mouse.move(adjustX, centerY, { steps: 1 });
      await page.mouse.up();
      
      await page.waitForTimeout(100);
      actualValue = await rangeLocator.inputValue();
      console.log(`Adjusted value (attempt ${attempts + 1}): ${actualValue}`);
      attempts++;
    }
    
    await expect(actualValue).toBe(String(targetValue));

    // Verify the displayed output (`#rangeSuccess`) shows the target value
    const displayValue = page.locator('#rangeSuccess');
    await expect(displayValue).toContainText(String(targetValue));
    console.log(`✓ Slider validation passed: Range value is ${targetValue}`);
  });
});
