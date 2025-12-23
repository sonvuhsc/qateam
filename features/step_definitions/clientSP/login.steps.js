const { Given, Then } = require("@cucumber/cucumber")
const { expect } = require('@playwright/test');
const { POManager } = require('../../../pageobjects/POManager');
const env = require('../../../tests/config/env');
const { normalize } = require('../../../utils/stringUtils');
const { slowScrollToBottom, slowScrollToBottomForObservation } = require('../../../utils/scrollUtils');

let poManager

// Check login
Then('I login with {string} and {string} and {string}', { timeout: 100 * 1000 }, async function (username, password, otp) {
  poManager = new POManager(this.page);
  const homePage = poManager.getHomePage();
//   await homePage.clickLoginButton();
  await homePage.validLogin(username, password, otp);
});

Then('I should see the ONE MASS page', { timeout: 15000 }, async function () {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).toHaveURL(env.loginRedirectURL);
});

Then('I navigate back to ONE Advisory page', { timeout: 20000 }, async function () {
    const homePage = poManager.getHomePage();
    await homePage.clickTuVanButton();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).toHaveURL(env.baseURL);
    await homePage.verifyAfterLoggedIn();
    await homePage.verifyFooter();
    await slowScrollToBottomForObservation(this.page);
});