# LambdaTest Playwright Automation

A comprehensive Playwright test automation project for LambdaTest Selenium Playground with HyperExecute cloud integration, parallel execution, and Gitpod support.

## 📋 Table of Contents

- [Overview](#overview)
- [Test Scenarios](#test-scenarios)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Gitpod Setup](#gitpod-setup)
- [HyperExecute Integration](#hyperexecute-integration)
- [Features](#features)
- [CI/CD Integration](#cicd-integration)

## 🎯 Overview

This project contains automated end-to-end tests for LambdaTest Selenium Playground using Playwright. It demonstrates best practices in test automation including:

- Multiple locator strategies (CSS selectors, XPath, text-based selectors)
- Parallel test execution on different browsers and OS combinations
- HyperExecute cloud grid integration
- Artifact management and logging
- Secret management for sensitive credentials
- Gitpod single-click development environment

## 📝 Test Scenarios

### Scenario 1: Simple Form Demo
Tests form input and message validation:

1. Open LambdaTest Selenium Playground
2. Click "Simple Form Demo"
3. Validate URL contains "simple-form-demo"
4. Create a variable with string value "Welcome to LambdaTest"
5. Enter the value in "Enter Message" text box
6. Click "Get Checked Value"
7. Validate the message displays in "Your Message:" section

**Test File**: `tests/test-scenario-1.spec.js`

**Locators Used**:
- Link text selector: `a:has-text("Simple Form Demo")`
- Placeholder attribute selector: `input[placeholder="Please enter your Message"]`
- CSS class selector: `button.btn-lg:has-text("Get Checked Value")`

### Scenario 2: Drag & Drop Sliders
Tests slider interaction and value validation:

1. Open LambdaTest Selenium Playground
2. Click "Drag & Drop Sliders"
3. Select slider with default value 15
4. Drag the slider to value 95
5. Validate range value shows 95

**Test File**: `tests/test-scenario-2.spec.js`

**Locators Used**:
- Link text selector: `a:has-text("Drag & Drop Sliders")`
- Type attribute selector: `input[type="range"]`
- XPath selector: `//input[@type="range"]`

### Scenario 3: Input Form Submit
Tests form validation and submission:

1. Open LambdaTest Selenium Playground
2. Click "Input Form Submit"
3. Click Submit without filling information
4. Assert "Please fill out this field." error
5. Fill Name, Email, and other required fields
6. Select "United States" from Country dropdown
7. Click Submit
8. Validate success message: "Thanks for contacting us, we will get back to you shortly."

**Test File**: `tests/test-scenario-3.spec.js`

**Locators Used**:
- Link text selector: `a:has-text("Input Form Submit")`
- CSS class and text selector: `button:has-text("Submit")`
- Attribute selectors: `input[name="name"]`, `input[type="email"]`, `input[type="tel"]`

## 📁 Project Structure

```
.
├── tests/
│   ├── test-scenario-1.spec.js      # Simple Form Demo tests
│   ├── test-scenario-2.spec.js      # Drag & Drop Slider tests
│   └── test-scenario-3.spec.js      # Form Submit tests
├── utils/                            # Utility functions (extensible)
├── playwright-reports/               # Generated HTML reports
├── .github/
│   └── copilot-instructions.md       # AI agent instructions
├── .gitpod.yml                       # Gitpod configuration
├── .hyperexecute.yaml                # HyperExecute YAML config
├── .hyperexecute-parallel.yaml       # Parallel execution config
├── .env                              # Environment variables (local)
├── .env.example                      # Example environment template
├── playwright.config.js              # Playwright configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## 🔧 Prerequisites

### Local Development
- **Node.js**: v16 or higher
- **npm**: v7 or higher
- **Git**: For version control

### For HyperExecute
- **LambdaTest Account**: Create at https://www.lambdatest.com
- **HyperExecute Access**: Request from LambdaTest
- **Environment Variables**: `LAMBDA_USERNAME` and `LAMBDA_ACCESS_KEY`

## 📦 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/GKSwami/lambdatest-playwright-automation.git
cd lambdatest-playwright-automation
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Install Playwright Browsers

```bash
npx playwright install
```

### Step 4: Configure Environment Variables

Copy `.env.example` to `.env` and fill in your LambdaTest credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
LAMBDA_USERNAME=your_lambdatest_username
LAMBDA_ACCESS_KEY=your_lambdatest_access_key
```

## 🚀 Running Tests

### Local Execution

**Run all tests (headless)**
```bash
npm test
```

**Run tests in headed mode** (see browser)
```bash
npm run test:local
```

**Run tests in debug mode**
```bash
npm run test:debug
```

**Run specific browser**
```bash
# Chrome only
npm run test:chrome

# Firefox only
npm run test:firefox

# Safari/WebKit only
npm run test:webkit
```

**Generate and view HTML report**
```bash
npm run test:report
```

### Test Report Output

After running tests, reports are generated in:
- **HTML Report**: `playwright-reports/index.html`
- **JSON Report**: `test-results.json`
- **JUnit Report**: `junit-results.xml`

View HTML report:
```bash
npx playwright show-report
```

## 🌐 Gitpod Setup

### Quick Start with Gitpod

Gitpod provides a cloud-based development environment that's pre-configured and ready to use. No local setup required!

**Click the button below to open this project in Gitpod:**

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/GKSwami/GajananAutomation)

### What Happens When You Open in Gitpod?

1. **Automatic Workspace Creation**: Gitpod creates a cloud-based VS Code environment
2. **Dependency Installation**: Automatically runs `npm install`
3. **Browser Installation**: Installs Chromium, Firefox, and WebKit browsers
4. **Ready to Test**: Environment is fully configured and ready to run tests

### Running Tests in Gitpod

Once the workspace is ready (you'll see a welcome message in the terminal), you can run:

```bash
# Run all tests across all browsers
npm test

# Run tests in specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Generate and view HTML report
npm run test:report
npx playwright show-report
```

### Viewing Test Reports in Gitpod

After running tests, view the HTML report:

```bash
npx playwright show-report
```

Gitpod will automatically open a preview window with the test results.

### Gitpod Configuration Details

The `.gitpod.yml` file configures:

- **Pre-installed Extensions**:
  - Playwright Test for VS Code
  - GitLens for Git integration
  - Prettier for code formatting
  - ESLint for code quality

- **Automatic Setup**:
  - Node.js environment
  - npm dependencies
  - Playwright browsers with system dependencies
  - Port forwarding for report viewing

- **Environment Variables**:
  Set in Gitpod dashboard under Settings → Variables:
  ```
  LAMBDA_USERNAME=your_username
  LAMBDA_ACCESS_KEY=your_access_key
  ```

### Manual Setup in Gitpod (if needed)

If you need to manually set up or reset the environment:

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Run tests
npm test

# View reports
npx playwright show-report
```

### Gitpod Features

✅ **Zero Configuration**: Everything is pre-configured
✅ **Cloud-Based**: No local resources needed
✅ **Consistent Environment**: Same setup for all team members
✅ **Fast Startup**: Pre-built images for quick initialization
✅ **Integrated IDE**: Full VS Code experience in browser
✅ **Port Forwarding**: Automatic preview of test reports

### Troubleshooting in Gitpod

**If tests don't run:**
```bash
# Check if browsers are installed
npx playwright --version

# Reinstall browsers if needed
npx playwright install --with-deps
```

**If dependencies are missing:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**To view workspace logs:**
```bash
# Check Gitpod initialization logs
cat /workspace/.gitpod/prebuild-log-*
```

## 🎪 HyperExecute Integration

### Prerequisites
- HyperExecute CLI installed
- LambdaTest credentials set as environment variables
- `.hyperexecute.yaml` or `.hyperexecute-parallel.yaml` configured

### Setup HyperExecute

1. **Install HyperExecute CLI**
   ```bash
   # Windows
   choco install hyperexecute

   # macOS
   brew install hyperexecute

   # Linux
   Download from https://hyperexecute.lambdatest.com
   ```

2. **Set Environment Variables**
   ```bash
   # Windows PowerShell
   $env:LAMBDA_USERNAME = "your_username"
   $env:LAMBDA_ACCESS_KEY = "your_access_key"

   # Linux/Mac
   export LAMBDA_USERNAME="your_username"
   export LAMBDA_ACCESS_KEY="your_access_key"
   ```

3. **Run Tests on HyperExecute**
   ```bash
   # Using default config
   hyperexecute --config .hyperexecute.yaml

   # Using parallel config (Windows 10 Chrome & Linux Firefox)
   hyperexecute --config .hyperexecute-parallel.yaml
   ```

### HyperExecute Features Used

#### 1. **Parallel Execution**
Tests run in parallel on different browser/OS combinations:
- Windows 10 with Chrome
- Linux with Firefox
- Multiple concurrent executions

#### 2. **Artifact Management**
Automatically collects and stores:
- HTML test reports
- JSON test results
- JUnit XML reports
- Screenshots and videos
- Console logs

```bash
# Access artifacts from HyperExecute dashboard after job completion
```

#### 3. **Secret Management**
Secure credential handling for:
- `LAMBDA_USERNAME`
- `LAMBDA_ACCESS_KEY`

Secrets are injected at runtime without storing in code.

#### 4. **Environment Variables**
Runtime variable injection:
```yaml
envConfig:
  SCREENSHOT_ENABLED: "true"
  VIDEO_ENABLED: "true"
  TRACE_ENABLED: "true"
```

#### 5. **Dependency Caching**
Pre-steps and caching optimize execution:
```yaml
cacheKey: '{{ checksum "package-lock.json" }}'
cacheDirectories:
  - node_modules
pre:
  - npm ci --prefer-offline
```

#### 6. **Pre & Post Steps**
Commands executed before/after test run:
```yaml
pre:
  - npm ci
  - echo "Setup completed"

post:
  - echo "Collecting artifacts..."
```

### Sample HyperExecute Job Run

```bash
# Execute with specific run config
hyperexecute --config .hyperexecute.yaml --runson windows-10

# View job status and job ID
hyperexecute --status 1234567890
```

After execution, you'll receive a **Job ID** like: `1234567890`

## 🎨 Features

✅ **Multiple Locator Strategies**
- CSS selectors with class and attribute targeting
- XPath for complex element selection
- Text-based selectors with `has-text()`
- Attribute selectors for form inputs

✅ **Comprehensive Reporting**
- HTML reports with screenshots
- JSON format for CI/CD integration
- JUnit XML for test management tools
- Video recordings of test execution

✅ **Parallel Execution**
- Run tests simultaneously on multiple configurations
- Browser combinations: Chrome, Firefox, Safari
- OS combinations: Windows, Linux, macOS

✅ **Cloud Integration**
- HyperExecute cloud grid support
- Scalable test execution
- Distributed artifact collection

✅ **Environment Management**
- `.env` file for local configuration
- Secret management for credentials
- Dynamic environment variables

✅ **Developer Experience**
- Gitpod single-click setup
- Debug mode for test development
- Headed mode to watch tests run

## 🔄 CI/CD Integration

### GitHub Actions (Optional Setup)

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Run tests
        run: npm test
      
      - name: Upload reports
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-reports
          path: playwright-reports/
```

### Trigger HyperExecute via GitHub Actions

Create `.github/workflows/hyperexecute.yml`:

```yaml
name: HyperExecute Tests

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run tests on HyperExecute
        run: |
          hyperexecute --config .hyperexecute-parallel.yaml \
            --runson windows-10,linux
        env:
          LAMBDA_USERNAME: ${{ secrets.LAMBDA_USERNAME }}
          LAMBDA_ACCESS_KEY: ${{ secrets.LAMBDA_ACCESS_KEY }}
```

## 📊 Test Execution Metrics

After running tests, check:
- **Total Tests**: 3 scenarios with multiple test cases
- **Locators Used**: 9+ different locator strategies demonstrated
- **Browsers Tested**: Chromium, Firefox, WebKit
- **Operating Systems**: Windows, Linux (via HyperExecute)
- **Parallel Jobs**: Up to 2 concurrent executions

## 🐛 Troubleshooting

### Common Issues

**Tests not finding elements**
- Verify the website structure hasn't changed
- Check selector validity in browser DevTools
- Use `page.pause()` for debugging

**HyperExecute authentication fails**
- Verify `LAMBDA_USERNAME` and `LAMBDA_ACCESS_KEY` are set
- Check credentials at https://account.lambdatest.com/profile

**Gitpod timeout**
- Increase timeout in `playwright.config.js` use section
- Run fewer tests in parallel

**Drag & Drop slider not working**
- Slider implementation may vary; use inspector to verify element type
- Alternative: Use direct value setting via `fill()` method

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [LambdaTest Selenium Playground](https://www.lambdatest.com/selenium-playground)
- [HyperExecute Documentation](https://www.lambdatest.com/support/docs/hyperexecute/)
- [Gitpod Documentation](https://www.gitpod.io/docs)

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🤝 Support

For issues and questions:
- Create an issue on GitHub
- Contact LambdaTest support
- Check HyperExecute documentation

---

**Last Updated**: December 5, 2025

**Project Maintainer**: GKSwami

**Repository**: https://github.com/GKSwami/lambdatest-playwright-automation
