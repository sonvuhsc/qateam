const { After, Before, AfterStep, Status } = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const devices = playwright.devices;

Before(async function (scenario) {
  console.log('Before scenario:', scenario.pickle.name);

  const tags = scenario.pickle.tags.map(t => t.name.toLowerCase());
  let deviceConfig = null;

  if (tags.includes('@iphone13')) {
    deviceConfig = devices['iPhone 13'];
    console.log('📱 Using iPhone 13 config');
  } else if (tags.includes('@pixel')) {
    deviceConfig = devices['Pixel 5'];
    console.log('📱 Using Pixel 5 config');
  }else if (tags.includes('@ipad')) {
    deviceConfig = devices['iPad Mini'];
    console.log('📱 Using iPad Mini config');
  }


  if (tags.includes('@edge')) {
    executablePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
    console.log('🌐 Running on Microsoft Edge');
  } else if (tags.includes('@chrome')) {
    console.log('🌐 Running on Google Chrome');
  }


  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...(deviceConfig || {}) // use device emulation if matched
  });

  this.browser = browser;
  this.context = context;
  this.page = await context.newPage();
});


AfterStep(async function ({ result }) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    const buffer = await this.page.screenshot();
    // await this.page.screenshot({ path: 'screenshot1.png' });
    await this.page.screenshot({ path: `screenshots/${deviceName}.png` });
    this.attach(buffer.toString('base64'), 'base64:image/png');
    console.log("Screenshot logged")

  }
});
After(async function () {
  // Assuming this.driver is a selenium webdriver
  console.log("i am last");

  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();

});


