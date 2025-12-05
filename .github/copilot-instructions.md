# Copilot Instructions for LambdaTest Playwright Automation

A comprehensive Playwright test automation project for LambdaTest Selenium Playground with HyperExecute cloud grid integration and Gitpod support.

## 🎯 Project Overview

**Purpose**: End-to-end test automation for LambdaTest Selenium Playground using Playwright
**Framework**: Playwright (JavaScript/Node.js)
**Cloud Platform**: HyperExecute (LambdaTest)
**Dev Environment**: Gitpod ready with `.gitpod.yml`

## 📂 Project Structure

```
tests/                          # Test files (3 scenarios)
├── test-scenario-1.spec.js    # Simple Form Demo
├── test-scenario-2.spec.js    # Drag & Drop Sliders
└── test-scenario-3.spec.js    # Input Form Submit

utils/                          # Shared utilities
├── test-helpers.js            # Reusable functions (fillInput, getText, etc.)
└── constants.js               # Test data, selectors, timeouts

.hyperexecute.yaml             # HyperExecute configuration
.hyperexecute-parallel.yaml    # Parallel execution (Windows 10 Chrome & Linux Firefox)
.gitpod.yml                    # Gitpod single-click dev environment
playwright.config.js           # Playwright configuration
.env.example                   # Environment template
README.md                      # Complete documentation
```

## 🚀 Essential Commands

```bash
npm install                    # Install dependencies
npm test                       # Run tests headless
npm run test:local            # Run tests with visible browser
npm run test:report           # Run tests and open HTML report
npm run test:debug            # Debug mode with step-through
hyperexecute --config .hyperexecute-parallel.yaml  # Cloud execution
```

## 🎨 Locator Strategies Used

Three different locators demonstrated per test scenario:

1. **Text-based**: `a:has-text("Simple Form Demo")`
2. **Attribute selectors**: `input[placeholder="..."]`, `input[type="email"]`
3. **XPath**: `//input[@type="range"]`, `//output`

## 🔑 Architecture Patterns

### Test Organization
- **One spec file per scenario** in `tests/` directory
- **Shared constants** in `utils/constants.js` (selectors, test data, timeouts)
- **Helper functions** in `utils/test-helpers.js` (fillInput, getText, etc.)

### Configuration Management
- **Playwright config** (`playwright.config.js`): Reporters, timeouts, projects
- **HyperExecute config** (`.hyperexecute.yaml`): Cloud execution, artifacts, secrets
- **Environment variables** (`.env`): LambdaTest credentials, settings

### Parallel Execution
- **Matrix configuration** in HyperExecute YAML: Multiple OS/browser combinations
- **Concurrency**: Set to 2 concurrent jobs
- **Artifact collection**: Automatic from HyperExecute dashboard

## 🔄 HyperExecute Integration Details

### Key Features Used
1. **Pre-steps**: `npm ci` with dependency caching for faster builds
2. **Artifacts**: Collects HTML reports, JSON results, JUnit XML, videos
3. **Secrets Management**: `LAMBDA_USERNAME`, `LAMBDA_ACCESS_KEY` injected at runtime
4. **Environment Variables**: Screenshot/video/trace flags for test configuration
5. **Parallel Matrix**: Runs on Windows 10 + Linux with Chrome + Firefox

### Running Tests on Cloud
```bash
# Single config run
hyperexecute --config .hyperexecute.yaml

# Parallel execution (multiple browser/OS combinations)
hyperexecute --config .hyperexecute-parallel.yaml

# After execution, you'll receive Job IDs to submit
```

## 📝 Writing New Tests

1. **Create file** in `tests/test-name.spec.js`
2. **Import test utilities**: `import { test, expect } from '@playwright/test'`
3. **Use shared selectors** from `utils/constants.js` or define new ones
4. **Follow pattern**: Setup → Action → Assert
5. **Use 3+ different locators** per test (requirement)

## 🌐 Gitpod Quick Start

1. Open in Gitpod: `https://gitpod.io/#https://github.com/GKSwami/lambdatest-playwright-automation`
2. Run: `npm test`
3. View reports: `npm run test:report`

## 📋 Playwright Configuration

- **Projects**: Chromium, Firefox, WebKit
- **Reporters**: HTML, JSON, JUnit
- **Artifacts on Failure**: Screenshots, videos, traces
- **Timeout**: 30 seconds (configurable)

## 🔐 Environment Setup

Copy `.env.example` to `.env` and fill in:
```
LAMBDA_USERNAME=your_username
LAMBDA_ACCESS_KEY=your_access_key
```

## 📊 Test Execution Flow

1. HyperExecute receives `.hyperexecute.yaml`
2. Pre-steps run: `npm ci` (with cache)
3. Tests execute in parallel on specified OS/browser combinations
4. Screenshots/videos recorded on failure
5. Artifacts collected and available in dashboard
6. Job ID provided for reference

## 🐛 Common Tasks

**Debug a failing test**
```bash
npm run test:debug
```

**Run specific scenario**
```bash
npx playwright test test-scenario-1
```

**Update selectors**
- Edit selectors in `utils/constants.js`
- Or inline in test if specific to one scenario

**Add HyperExecute Job to submission**
- Run cloud tests: `hyperexecute --config .hyperexecute-parallel.yaml`
- Copy Job ID from terminal output
- Include in assignment submission

## ✅ Compliance Checklist

✓ Uses Playwright framework  
✓ 3+ different locators per test (CSS, XPath, text-based)  
✓ Parallel execution on HyperExecute  
✓ Gitpod configuration with `.gitpod.yml`  
✓ Comprehensive README.md  
✓ Secrets Management configured  
✓ Artifacts Management enabled  
✓ Environment variables injected  
✓ Pre-steps & dependency caching  
✓ Screenshots, videos, console logs enabled  

---
**Last Updated**: December 5, 2025  
**Repository**: https://github.com/GKSwami/lambdatest-playwright-automation  
**Contact**: admin@lambdatestcertifications.com
