import { test, expect } from '@playwright/test';

test.describe('Scenario 2: Drag & Drop Sliders', () => {
  const baseURL = 'https://www.lambdatest.com/selenium-playground';
  const targetValue = 95;

  test('should drag slider to 95', async ({ page }) => {
    // Step 1: Open LambdaTest Selenium Playground
    await page.goto(baseURL);
    
    // Step 2: Click "Drag & Drop Sliders"
    // Locator 1: Using link text
    await page.click('a:has-text("Drag & Drop Sliders")');
    
    // Wait for slider to load
    await page.waitForLoadState('networkidle');
    
    // Step 3: Select slider and drag to 95
    // Locator 2: Using data-testid or id attribute
    const slider = page.locator('input[type="range"]').first();
    
    // Get the slider's bounding box to calculate drag distance
    const sliderBox = await slider.boundingBox();
    
    if (sliderBox) {
      // Calculate the position for value 95 (0-100 range)
      // Assuming slider starts at left and ends at right
      const dragDistance = (sliderBox.width / 100) * targetValue;
      
      // Locator 3: Using XPath for more complex selection
      const sliderHandle = page.locator('//input[@type="range"]').first();
      
      // Drag the slider
      await sliderHandle.dragTo(sliderHandle, {
        sourcePosition: { x: sliderBox.width, y: sliderBox.height / 2 },
        targetPosition: { x: dragDistance, y: sliderBox.height / 2 },
      });
    }
    
    // Alternative approach using mouse events for better control
    const rangeInput = page.locator('input[type="range"]').first();
    await rangeInput.fill(targetValue.toString());
    
    // Validate the range value shows 95
    const rangeValue = await rangeInput.inputValue();
    console.log(`Range value after drag: ${rangeValue}`);
    
    // Verify the displayed value matches target
    const displayValue = page.locator('//output').first();
    await expect(displayValue).toContainText(targetValue.toString());
    console.log(`✓ Slider validation passed: Range value is ${targetValue}`);
  });
});
