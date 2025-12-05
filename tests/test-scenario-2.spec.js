import { test, expect } from '@playwright/test';

test.describe('Scenario 2: Drag & Drop Sliders', () => {
  const baseURL = 'https://www.lambdatest.com/selenium-playground';
  const targetValue = 95;

  test('should set slider to 95 (robust)', async ({ page }) => {
    await page.goto(baseURL);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('a[href="https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo"]'),
    ]);

    const rangeLocator = page.locator('#slider3 input[type="range"]');
    await rangeLocator.waitFor({ state: 'visible' });

    let sliderBox = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await rangeLocator.scrollIntoViewIfNeeded();
        sliderBox = await rangeLocator.boundingBox();
        if (sliderBox) break;
      } catch (err) {
        if (attempt === 2) throw err;
        await page.waitForTimeout(150);
      }
    }
    if (!sliderBox) throw new Error('Slider bounding box not found');

    const { min: minStr, max: maxStr, value: currentStr } = await rangeLocator.evaluate((el) => ({
      min: el.min || '0', max: el.max || '100', value: el.value || el.defaultValue || '0',
    }));
    const min = Number(minStr), max = Number(maxStr), currentValue = Number(currentStr);
    const startX = sliderBox.x + ((currentValue - min) / (max - min)) * sliderBox.width;
    const centerY = sliderBox.y + sliderBox.height / 2;
    const targetX = sliderBox.x + ((targetValue - min) / (max - min)) * sliderBox.width;

    await page.mouse.move(startX, centerY);
    await page.mouse.down();
    for (let i = 1; i <= 10; i++) {
      const intermediateX = startX + ((targetX - startX) * i) / 10;
      await page.mouse.move(intermediateX, centerY, { steps: 2 });
    }
    await page.mouse.up();
    await page.waitForTimeout(200);
    
    let actualValue = await rangeLocator.inputValue();
    let attempts = 0;
    while (Math.abs(Number(actualValue) - targetValue) > 1 && attempts < 3) {
      const diff = Number(actualValue) - targetValue;
      const direction = diff > 0 ? -1 : 1;
      const adjustX = targetX + (direction * sliderBox.width * 0.02);
      await page.mouse.move(adjustX, centerY);
      await page.mouse.down();
      await page.mouse.move(adjustX, centerY, { steps: 1 });
      await page.mouse.up();
      await page.waitForTimeout(100);
      actualValue = await rangeLocator.inputValue();
      attempts++;
    }
    
    await expect(actualValue).toBe(String(targetValue));
    await expect(page.locator('#rangeSuccess')).toContainText(String(targetValue));
  });
});
