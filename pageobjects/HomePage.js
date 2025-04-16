const { expect } = require("@playwright/test");

class HomePage {
    constructor(page) {
        this.page = page;
        this.bannerHomePage = page.locator('.my-auto');
        this.getStartButton = page.getByRole('button', { name: 'Bắt đầu ngay' });

    }

    async verifyBanner() {
        await expect(this.bannerHomePage).toBeVisible();
        console.log('Check banner display')
    }

    async clickGetStartButton(getStart) {
        await expect(this.getStartButton).toHaveText(getStart);
        const text = await this.getStartButton.textContent();
        console.log('Button text:', text);
        await this.getStartButton.click();
    }

}
module.exports = { HomePage };