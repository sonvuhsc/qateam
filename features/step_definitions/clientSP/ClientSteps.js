const { exec } = require("child_process")

const { defineParameterType, When, And, Given, Then } = require("@cucumber/cucumber")
const path = require("path")
let poManager
const playwright = require('@playwright/test');
const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../pageobjects/POManager');
const assert = require("assert")
const binDir = path.resolve(__dirname, "../../bin")
console.log(binDir)

// SP Client
Given('I visit the homepage', { timeout: 20000 }, async function () {
    await this.page.goto("https://sp-sit.hsc.com.vn/");
    const size = await this.page.viewportSize();
    console.log('🔎 Current viewport:', size);
    console.log(await this.page.title());

});

Then('I should see the banner displayed correctly', async function () {

    poManager = new POManager(this.page);
    const homePage = poManager.getHomePage();
    // await this.page.pause();
    await homePage.verifyBanner();

});

Then('I click on the {string} button', async function (getStart) {
    poManager = new POManager(this.page);
    const homePage = poManager.getHomePage();
    const context = this.page.context();
    [this.newPage] = await Promise.all([
        context.waitForEvent('page'),
        homePage.clickGetStartButton(getStart)
    ]);

});

Then("I should navigate to new tab with url {string} in case not login", async function (expectedUrl) {
    await this.newPage.waitForLoadState('domcontentloaded');
    const actualUrl = this.newPage.url();
    expect(actualUrl).toBe(expectedUrl);

});


Then('I login with {string} and {string} and {string}', { timeout: 100 * 1000 }, async function (username, password, otp) {
    poManager = new POManager(this.page);
    const homePage = poManager.getHomePage();
    await homePage.clickLoginButton();
    await homePage.validLogin(username, password, otp);
});

Then('I should see the menu item {string}', { timeout: 100 * 1000 }, async function (menuItem) {
    const locator = this.page.locator(`text="${menuItem}"`);
    await expect((locator).first()).toBeVisible();
});