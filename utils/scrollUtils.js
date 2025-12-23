/**
 * Utility functions for scrolling operations in Playwright tests
 */

/**
 * Slowly scrolls to the bottom of the page with customizable step and delay
 * @param {import('playwright').Page} page - Playwright page object
 * @param {Object} options - Scroll options
 * @param {number} options.step - Pixels to scroll each step (default: 300)
 * @param {number} options.delay - Delay between steps in ms (default: 150)
 */
async function slowScrollToBottom(page, {
  step = 300,
  delay = 150
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

/**
 * Slowly scrolls to the bottom for observation with fixed parameters
 * Scrolls 120px every 300ms for 40 steps (~12 seconds total)
 * @param {import('playwright').Page} page - Playwright page object
 */
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

module.exports = {
  slowScrollToBottom,
  slowScrollToBottomForObservation
};