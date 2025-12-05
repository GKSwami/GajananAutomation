# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests Locally
```bash
npm test                    # Headless (all browsers)
npm run test:local         # Headed (see browser)
npm run test:report        # Generate HTML report
```

### 3. View Reports
```bash
npx playwright show-report
```

## 🎪 Running on HyperExecute Cloud

### Prerequisites
```bash
# Set environment variables
$env:LAMBDA_USERNAME = "your_username"
$env:LAMBDA_ACCESS_KEY = "your_access_key"

# Install HyperExecute CLI
choco install hyperexecute  # Windows
# OR
brew install hyperexecute   # Mac
```

### Execute Tests
```bash
# Single config
hyperexecute --config .hyperexecute.yaml

# Parallel execution (Windows + Linux, Chrome + Firefox)
hyperexecute --config .hyperexecute-parallel.yaml
```

### Collect Job ID
After execution completes, copy the **Job ID** from terminal output
Example: `1234567890`

## 🌐 Gitpod One-Click Setup

Click button in README.md or use this URL:
```
https://gitpod.io/#https://github.com/GKSwami/lambdatest-playwright-automation
```

Then run:
```bash
npm install
npm test
```

## 📊 Test Scenarios Overview

| Scenario | File | Locators | Purpose |
|----------|------|----------|---------|
| 1: Simple Form | `test-scenario-1.spec.js` | Text, Placeholder, Class | Form input validation |
| 2: Drag & Drop | `test-scenario-2.spec.js` | Text, Type, XPath | Slider interaction |
| 3: Form Submit | `test-scenario-3.spec.js` | Text, Attribute, Select | Form submission & validation |

## 🔑 Key Files

- **Tests**: `tests/*.spec.js` - All test scenarios
- **Selectors**: `utils/constants.js` - Centralized selector definitions
- **Helpers**: `utils/test-helpers.js` - Utility functions
- **Config**: `playwright.config.js` - Playwright settings
- **HyperExecute**: `.hyperexecute-parallel.yaml` - Cloud execution
- **Gitpod**: `.gitpod.yml` - Dev environment

## 📋 Locator Examples (3+ per test)

### Test 1 - Different Strategies
```javascript
// Text-based
await page.click('a:has-text("Simple Form Demo")');

// Attribute selector
await page.fill('input[placeholder="Please enter your Message"]', message);

// CSS class
await page.click('button.btn-lg:has-text("Get Checked Value")');
```

### Test 2 - Range Finding
```javascript
// Text-based
await page.click('a:has-text("Drag & Drop Sliders")');

// Type selector
const slider = page.locator('input[type="range"]');

// XPath
const output = page.locator('//output');
```

### Test 3 - Form Elements
```javascript
// Text-based
await page.click('a:has-text("Input Form Submit")');

// Type attributes
await page.fill('input[type="email"]', email);
await page.fill('input[type="tel"]', phone);

// Name attribute
await page.selectOption('select[name="country"]', { label: 'United States' });
```

## 🎬 Video/Screenshot Capture

Automatically captured on test failure:
- Screenshots: `playwright-reports/test-results/`
- Videos: `playwright-reports/test-videos/`
- Traces: `playwright-reports/traces/`

## 📊 Reports Generated

After running tests:
- **HTML**: `playwright-reports/index.html` - Interactive report
- **JSON**: `test-results.json` - CI/CD integration
- **JUnit**: `junit-results.xml` - Test management tools

## ❓ Troubleshooting

**Tests not running?**
```bash
npm install
npx playwright install
npm test
```

**Can't find elements?**
Use debug mode:
```bash
npm run test:debug
```

**HyperExecute fails?**
- Check credentials are set
- Verify `.hyperexecute-parallel.yaml` syntax
- Review HyperExecute logs in dashboard

---

**For full documentation**, see `README.md`
