/**
 * Test configuration and constants
 */

export const BASE_URL = 'https://www.lambdatest.com/selenium-playground';

export const TEST_DATA = {
  simpleForm: {
    message: 'Welcome to LambdaTest',
  },
  slider: {
    targetValue: 95,
  },
  inputForm: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '9876543210',
    message: 'This is a test message',
    country: 'United States',
  },
};

export const SELECTORS = {
  // Scenario 1: Simple Form Demo
  simpleFormLink: 'a:has-text("Simple Form Demo")',
  messageInput: 'input[placeholder="Please enter your Message"]',
  getCheckButton: 'button.btn-lg:has-text("Get Checked Value")',
  messageOutput: '#message',

  // Scenario 2: Drag & Drop
  dragDropLink: 'a:has-text("Drag & Drop Sliders")',
  rangeSlider: 'input[type="range"]',
  sliderOutput: '//output',

  // Scenario 3: Input Form Submit
  inputFormLink: 'a:has-text("Input Form Submit")',
  nameInput: 'input[name="name"]',
  emailInput: 'input[type="email"]',
  phoneInput: 'input[type="tel"]',
  messageTextarea: 'textarea[name="message"]',
  countrySelect: 'select[name="country"]',
  submitButton: 'button:has-text("Submit")',
  successMessage: 'p:has-text("Thanks for contacting us, we will get back to you shortly.")',
};

export const TIMEOUTS = {
  navigation: 30000,
  element: 10000,
  interaction: 5000,
};
