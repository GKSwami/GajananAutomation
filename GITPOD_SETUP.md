# 🚀 Gitpod Setup Guide for Playwright Tests

This guide provides detailed instructions for running the Playwright test automation suite in Gitpod.

## 📋 Table of Contents

- [What is Gitpod?](#what-is-gitpod)
- [Quick Start](#quick-start)
- [Step-by-Step Instructions](#step-by-step-instructions)
- [Running Tests](#running-tests)
- [Viewing Test Reports](#viewing-test-reports)
- [Configuration Details](#configuration-details)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## 🎯 What is Gitpod?

Gitpod is a cloud-based development environment that provides:
- Pre-configured VS Code in your browser
- Automatic dependency installation
- Consistent development environment
- No local setup required
- Free tier available (50 hours/month)

## ⚡ Quick Start

### Option 1: One-Click Launch

Click this button to launch the project in Gitpod:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/GKSwami/GajananAutomation)

### Option 2: Manual URL

1. Go to: `https://gitpod.io/#https://github.com/GKSwami/GajananAutomation`
2. Sign in with GitHub, GitLab, or Bitbucket
3. Wait for workspace initialization (2-3 minutes)

## 📝 Step-by-Step Instructions

### Step 1: Launch Gitpod Workspace

1. **Click the "Open in Gitpod" button** from the README or use the URL method
2. **Sign in** to Gitpod (if not already signed in)
3. **Authorize** Gitpod to access your GitHub account
4. **Wait** for workspace creation (you'll see a loading screen)

### Step 2: Workspace Initialization

Gitpod will automatically:

```bash
# 1. Clone the repository
git clone https://github.com/GKSwami/GajananAutomation.git

# 2. Install npm dependencies
npm install

# 3. Install Playwright browsers
npx playwright install --with-deps chromium firefox webkit
```

**Expected output:**
```
🚀 Installing dependencies...
✓ Dependencies installed
📦 Installing Playwright browsers...
✓ Playwright browsers installed

╔════════════════════════════════════════════════════════════╗
║  🎭 Playwright Test Automation - Gitpod Environment       ║
╚════════════════════════════════════════════════════════════╝

✅ Workspace is ready for testing!
```

### Step 3: Verify Setup

Check that everything is installed correctly:

```bash
# Check Node.js version
node --version
# Expected: v18.x or higher

# Check npm version
npm --version
# Expected: v9.x or higher

# Check Playwright version
npx playwright --version
# Expected: Version 1.40.0

# List installed browsers
npx playwright install --dry-run
# Expected: chromium, firefox, webkit already installed
```

## 🧪 Running Tests

### Run All Tests

Execute all test scenarios across all browsers:

```bash
npm test
```

**Expected output:**
```
Running 9 tests using 3 workers

  ✓ [chromium] › test-scenario-1.spec.js:7:3 › should fill form and validate message
  ✓ [chromium] › test-scenario-2.spec.js:7:3 › should set slider to 95
  ✓ [chromium] › test-scenario-3.spec.js:15:3 › should validate empty form error
  ✓ [firefox] › test-scenario-1.spec.js:7:3 › should fill form and validate message
  ✓ [firefox] › test-scenario-2.spec.js:7:3 › should set slider to 95
  ✓ [firefox] › test-scenario-3.spec.js:15:3 › should validate empty form error
  ✓ [webkit] › test-scenario-1.spec.js:7:3 › should fill form and validate message
  ✓ [webkit] › test-scenario-2.spec.js:7:3 › should set slider to 95
  ✓ [webkit] › test-scenario-3.spec.js:15:3 › should validate empty form error

  9 passed (45s)
```

### Run Tests by Browser

**Chrome/Chromium only:**
```bash
npm run test:chrome
```

**Firefox only:**
```bash
npm run test:firefox
```

**WebKit/Safari only:**
```bash
npm run test:webkit
```

### Run Specific Test File

```bash
# Run only Scenario 1
npx playwright test test-scenario-1.spec.js

# Run only Scenario 2
npx playwright test test-scenario-2.spec.js

# Run only Scenario 3
npx playwright test test-scenario-3.spec.js
```

### Debug Mode

Run tests with Playwright Inspector:

```bash
npm run test:debug
```

This opens the Playwright Inspector where you can:
- Step through tests
- Inspect elements
- View console logs
- Take screenshots

## 📊 Viewing Test Reports

### HTML Report

After running tests, generate and view the HTML report:

```bash
# Generate report and open in browser
npm run test:report
```

Or manually open the report:

```bash
# Generate report
npm test

# View report
npx playwright show-report
```

Gitpod will automatically:
1. Generate the report in `playwright-reports/`
2. Start a local server
3. Open a preview window with the report

### Report Contents

The HTML report includes:
- ✅ Test pass/fail status
- ⏱️ Execution time per test
- 📸 Screenshots on failure
- 🎥 Video recordings
- 📋 Detailed error messages
- 🔍 Step-by-step execution logs

### Other Report Formats

**JSON Report:**
```bash
cat test-results.json
```

**JUnit XML Report:**
```bash
cat junit-results.xml
```

## ⚙️ Configuration Details

### Gitpod Configuration (.gitpod.yml)

```yaml
tasks:
  - name: Setup & Install Dependencies
    init: |
      npm install
      npx playwright install --with-deps chromium firefox webkit
    command: |
      echo "✅ Workspace is ready for testing!"

vscode:
  extensions:
    - ms-playwright.playwright@1.0.4
    - eamodio.gitlens@14.10.0
    - esbenp.prettier-vscode@10.1.0
    - dbaeumer.vscode-eslint@2.4.2

ports:
  - port: 3000
    onOpen: ignore
  - port: 9323
    onOpen: ignore
```

### Playwright Configuration (playwright.config.js)

Key settings:
- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled
- **Retries**: 2 on CI, 0 locally
- **Reporters**: HTML, JSON, JUnit, List
- **Screenshots**: On failure
- **Videos**: On failure
- **Trace**: On first retry

### Environment Variables

Set environment variables in Gitpod:

1. Go to: https://gitpod.io/user/variables
2. Add variables:
   - `LAMBDA_USERNAME`: Your LambdaTest username
   - `LAMBDA_ACCESS_KEY`: Your LambdaTest access key
3. Scope: `GKSwami/GajananAutomation` (or `*/*` for all repos)

## 🔧 Troubleshooting

### Issue: Tests Not Running

**Symptom:** `playwright: command not found`

**Solution:**
```bash
# Reinstall dependencies
npm install

# Verify Playwright is installed
npx playwright --version
```

### Issue: Browsers Not Installed

**Symptom:** `browserType.launch: Executable doesn't exist`

**Solution:**
```bash
# Install browsers with system dependencies
npx playwright install --with-deps

# Or install specific browser
npx playwright install chromium --with-deps
```

### Issue: Tests Timeout

**Symptom:** Tests fail with timeout errors

**Solution:**
```bash
# Increase timeout in playwright.config.js
# Or run with increased timeout
npx playwright test --timeout=60000
```

### Issue: Port Already in Use

**Symptom:** Cannot view report, port conflict

**Solution:**
```bash
# Kill process on port 9323
lsof -ti:9323 | xargs kill -9

# View report on different port
npx playwright show-report --port 9324
```

### Issue: Workspace Initialization Failed

**Symptom:** Gitpod workspace doesn't start properly

**Solution:**
1. Stop the workspace
2. Delete the workspace
3. Create a new workspace from the repository
4. Check Gitpod status: https://www.gitpodstatus.com/

### Issue: Out of Gitpod Hours

**Symptom:** "You've used all your hours"

**Solution:**
- Free tier: 50 hours/month
- Upgrade to paid plan for more hours
- Wait for monthly reset
- Use local development environment

## 💡 Best Practices

### 1. Commit Changes Regularly

```bash
# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "Add new test scenarios"

# Push to GitHub
git push origin main
```

### 2. Use Gitpod Snapshots

Create snapshots of your workspace:
1. Click Gitpod menu (top left)
2. Select "Share Workspace Snapshot"
3. Share URL with team members

### 3. Optimize Workspace Startup

Pre-build workspaces for faster startup:
1. Enable prebuilds in `.gitpod.yml`
2. Gitpod will build workspace on every commit
3. New workspaces start instantly

### 4. Use Environment Variables

Never commit secrets:
```bash
# ❌ Don't do this
LAMBDA_ACCESS_KEY=abc123

# ✅ Do this
# Set in Gitpod dashboard
# Access via process.env.LAMBDA_ACCESS_KEY
```

### 5. Clean Up Workspaces

Delete unused workspaces:
1. Go to: https://gitpod.io/workspaces
2. Stop inactive workspaces
3. Delete old workspaces
4. Saves hours and resources

## 📚 Additional Resources

- **Gitpod Documentation**: https://www.gitpod.io/docs
- **Playwright Documentation**: https://playwright.dev
- **LambdaTest Playground**: https://www.lambdatest.com/selenium-playground
- **GitHub Repository**: https://github.com/GKSwami/GajananAutomation

## 🆘 Getting Help

If you encounter issues:

1. **Check Gitpod Logs**:
   ```bash
   cat /workspace/.gitpod/prebuild-log-*
   ```

2. **Check Playwright Logs**:
   ```bash
   DEBUG=pw:api npm test
   ```

3. **Create GitHub Issue**:
   - Go to repository
   - Click "Issues"
   - Describe the problem with logs

4. **Contact Support**:
   - Gitpod Support: https://www.gitpod.io/support
   - LambdaTest Support: https://www.lambdatest.com/support

---

**Last Updated**: December 2024

**Maintained By**: GKSwami

**Repository**: https://github.com/GKSwami/GajananAutomation
