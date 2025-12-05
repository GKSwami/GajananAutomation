/**
 * Test helper utilities
 */

/**
 * Wait for element and perform action with retry logic
 */
export async function waitAndClick(page, selector, timeout = 5000) {
  try {
    await page.waitForSelector(selector, { timeout });
    await page.click(selector);
    return true;
  } catch (error) {
    console.error(`Failed to click element: ${selector}`, error);
    return false;
  }
}

/**
 * Fill input field with retry logic
 */
export async function fillInput(page, selector, value, timeout = 5000) {
  try {
    await page.waitForSelector(selector, { timeout });
    const input = page.locator(selector);
    await input.fill(value);
    return true;
  } catch (error) {
    console.error(`Failed to fill input: ${selector}`, error);
    return false;
  }
}

/**
 * Get text content from element
 */
export async function getText(page, selector, timeout = 5000) {
  try {
    await page.waitForSelector(selector, { timeout });
    const text = await page.textContent(selector);
    return text;
  } catch (error) {
    console.error(`Failed to get text from: ${selector}`, error);
    return null;
  }
}

/**
 * Verify element visibility
 */
export async function isElementVisible(page, selector, timeout = 5000) {
  try {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    return true;
  } catch {
    return false;
  }
}

/**
 * Select option from dropdown
 */
export async function selectDropdown(page, selector, optionLabel, timeout = 5000) {
  try {
    const select = page.locator(selector);
    await select.waitFor({ state: 'visible', timeout });
    await select.selectOption({ label: optionLabel });
    return true;
  } catch (error) {
    console.error(`Failed to select option: ${optionLabel}`, error);
    return false;
  }
}

/**
 * Take screenshot for debugging
 */
export async function takeDebugScreenshot(page, name) {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `debug-${name}-${timestamp}.png`;
    await page.screenshot({ path: filename });
    console.log(`Screenshot saved: ${filename}`);
  } catch (error) {
    console.error('Failed to take screenshot', error);
  }
}
