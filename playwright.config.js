// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries: 1,
  
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 15000
  },
  
  reporter: 'html',
  use: {

    browserName : 'chromium',
    headless : true,
    screenshot : 'on',
    trace : 'on',//off,on
  },

};

module.exports = config;
