import { test, expect } from '@playwright/test';

test.describe('Scenario 2: Drag & Drop Sliders', () => {
  const baseURL = 'https://www.lambdatest.com/selenium-playground';
  const targetValue = 95;

  test('should set slider to 95 (robust)', async ({ page }) => {
    // Step 1: Open LambdaTest Selenium Playground
    await page.goto(baseURL);

    // Step 2: Click "Drag & Drop Sliders" using href (more reliable)
    await page.click('a[href="https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo"]');

    // Wait for slider to load
    await page.waitForLoadState('networkidle');

    // Step 3: Locate the first range input and set its value via JS
    const rangeLocator = page.locator('input[type="range"]').first();

    // Use evaluate to set the value and dispatch input/change events (robust and fast)
    await rangeLocator.evaluate((el, value) => {
      el.value = String(value);
      // dispatch input and change events so any attached listeners update UI
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, targetValue);

    // Verify the input's value
    const actualValue = await rangeLocator.inputValue();
    console.log(`Range input value set to: ${actualValue}`);
    await expect(actualValue).toBe(String(targetValue));

    // Verify the displayed output (if present) shows the target value
    const displayValue = page.locator('//output').first();
    await expect(displayValue).toContainText(String(targetValue));
    console.log(`✓ Slider validation passed: Range value is ${targetValue}`);
  });
});
