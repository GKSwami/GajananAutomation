export async function fillInput(page, selector, value) {
  await page.locator(selector).fill(value);
}

export async function getText(page, selector) {
  return await page.locator(selector).textContent();
}
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
