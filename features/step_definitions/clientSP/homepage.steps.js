const { exec } = require("child_process")
const { defineParameterType, When, And, Given, Then } = require("@cucumber/cucumber")
const path = require("path")
let poManager
const playwright = require('@playwright/test');
const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../pageobjects/POManager');
const assert = require("assert")
const binDir = path.resolve(__dirname, "../../bin")
const env = require('../../../tests/config/env');
console.log(binDir)

function normalize(text) {
  return text.normalize('NFC');
}
async function slowScrollToBottom(page, {
  step = 300,      // px mỗi lần scroll
  delay = 150      // ms giữa mỗi lần
} = {}) {
  await page.evaluate(
    async ({ step, delay }) => {
      const sleep = ms => new Promise(r => setTimeout(r, ms));

      let currentScroll = 0;
      const totalHeight = document.body.scrollHeight;

      while (currentScroll < totalHeight) {
        window.scrollBy(0, step);
        currentScroll += step;
        await sleep(delay);
      }
    },
    { step, delay }
  );
}

async function slowScrollToBottomForObservation(page) {
  await page.evaluate(async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const step = 120;      // small scroll step
    const delay = 300;     // slow delay (ms)
    const maxScrolls = 40; // total scroll steps (~12 seconds)

    for (let i = 0; i < maxScrolls; i++) {
      window.scrollBy(0, step);
      await sleep(delay);
    }
  });
}


// SP Client
Given('I visit the homepage', { timeout: 20000 }, async function () {
  await this.page.goto(env.baseURL);
  const size = await this.page.viewportSize();
  console.log('===== Current viewport:=====', size);
  console.log(await this.page.title());

});

Then('I should see the banner displayed correctly', async function () {
  poManager = new POManager(this.page);
  const homePage = poManager.getHomePage();
  // await this.page.pause();
  await homePage.verifyBanner();
});

// Verify submenu
Then(
  'the {string} menu should have submenu {string}', { timeout: 60 * 1000 },
  async function (menu, submenu) {
    const menuText = normalize(menu);
    const submenuText = normalize(submenu);

    // hover menu cha
    const menuLocator = this.page.getByText(menuText, { exact: true }).first();
    await expect(menuLocator).toBeVisible();
    await menuLocator.hover();

    // dropdown đang mở
    const dropdown = this.page.locator(
      'div.mantine-Menu-dropdown[role="menu"]'
    );
    await expect(dropdown).toBeVisible();
    // verify submenu
    const submenuLocator = dropdown.getByText(submenuText, { exact: true }).first();
    await expect(submenuLocator).toBeVisible();

    // CLICK
    await submenuLocator.click();
    await this.page.keyboard.press('Escape');
    // await slowScrollToBottomForObservation(this.page);
    // Lấy baseUrl từ URL hiện tại
    const baseUrl = new URL(await this.page.url()).origin;

    const links = await this.page.$$eval('a[href]', anchors =>
      anchors.map(a => a.href)
    );
    // Lọc link nội bộ hợp lệ
    const internalLinks = [...new Set(links)].filter(href =>
      href.startsWith(baseUrl) &&
      !href.includes('#') &&
      !href.includes('javascript')
    );
    console.log(`Found ${internalLinks.length} internal links`);
    // Check từng link
    for (const url of internalLinks) {
      console.log(`Checking: ${url}`);
      const response = await this.page.goto(url, {
        waitUntil: 'domcontentloaded'
      });
      // HTTP status
      expect(response.status(), `HTTP error at ${url}`)
        .toBeLessThan(400);
      // Không có error text
      await expect(
        this.page.getByText(/404|page not found/i)
      ).toHaveCount(0);

      await expect(
        this.page.getByText(/something went wrong/i)
      ).toHaveCount(0);
    }
  }
);
// ONE Trading
Then(
  'I verify ONE Trading menu works correctly',
  { timeout: 60 * 1000 },
  async function () {

    const menuCongCu = normalize('Công cụ');
    // hover menu cha
    const menuLocator = this.page.getByText(menuCongCu, { exact: true }).first();
    await expect(menuLocator).toBeVisible();
    await menuLocator.hover();
    const dropdown = this.page.locator(
      'div.mantine-Menu-dropdown[role="menu"]'
    );
    await expect(dropdown).toBeVisible();
    const oneTrading = dropdown.getByText('ONE Trade', { exact: true }).first();
    await oneTrading.scrollIntoViewIfNeeded();
    // click
    await oneTrading.click();
    // FINAL ASSERT (IMPORTANT)
    await expect(this.page).toHaveURL(/\/sp$/);
    // optional: no error page
    await expect(
      this.page.getByText(/Something went wrong!/i)
    ).toHaveCount(0);
  }
);

// ONE Pro
Then(
  'I verify ONE Pro menu opens new tab',
  { timeout: 60 * 1000 },
  async function () {
    const menuCongCu = normalize('Công cụ');
    // hover menu cha
    const menuLocator = this.page.getByText(menuCongCu, { exact: true }).first();
    await expect(menuLocator).toBeVisible();
    await menuLocator.hover();
    const dropdown = this.page.locator(
      'div.mantine-Menu-dropdown[role="menu"]'
    );
    await expect(dropdown).toBeVisible();
    const onePro = dropdown.getByText('ONE PRO', { exact: true });
    await onePro.scrollIntoViewIfNeeded();
    // wait for new tab
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      onePro.click()
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    // ASSERT NEW TAB URL
    await expect(newPage).toHaveURL(/^https:\/\/onepro\.hsc\.com\.vn/);
    // optional: bring it to front for observation
    await newPage.bringToFront();
  }
);

Then(
  'I verify Winner Trade menu opens new tab',
  { timeout: 60 * 1000 },
  async function () {
    const menuCongCu = normalize('Công cụ');
    // hover menu cha
    const menuLocator = this.page.getByText(menuCongCu, { exact: true }).first();
    await expect(menuLocator).toBeVisible();
    await menuLocator.hover();
    const dropdown = this.page.locator(
      'div.mantine-Menu-dropdown[role="menu"]'
    );
    await expect(dropdown).toBeVisible();
    const winnerTrade = dropdown.getByText('Winner Trade', { exact: true });
    await winnerTrade.scrollIntoViewIfNeeded();
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      winnerTrade.click()
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    // ASSERT
    await expect(newPage).toHaveURL(/^https:\/\/winnertrade\.hsc\.com\.vn/);
    await newPage.bringToFront();
  }
);

Then('I click on the {string} button', async function (getStart) {
  poManager = new POManager(this.page);
  const homePage = poManager.getHomePage();
  const context = this.page.context();
  [this.newPage] = await Promise.all([
    context.waitForEvent('page'),
    homePage.clickGetStartButton(getStart)
  ]);
});
// Check url navigate
Then("I should navigate to new tab with url {string} in case not login", async function (expectedUrl) {
  await this.newPage.waitForLoadState('domcontentloaded');
  const actualUrl = this.newPage.url();
  expect(actualUrl).toBe(expectedUrl);
});
// Check login
Then('I login with {string} and {string} and {string}', { timeout: 100 * 1000 }, async function (username, password, otp) {
  poManager = new POManager(this.page);
  const homePage = poManager.getHomePage();
  await homePage.clickLoginButton();
  await homePage.validLogin(username, password, otp);
});
// Check menu display
Then('I should see the menu item {string}', { timeout: 100 * 1000 }, async function (menuItem) {
  const locator = this.page.locator(`text="${menuItem}"`);
  await expect((locator).first()).toBeVisible();
});
// Check footer display
Then('I should see the footer displayed correctly', async function () {
  poManager = new POManager(this.page);
  const homePage = poManager.getHomePage();
  // await this.page.pause();
  await homePage.verifyFooter();
});