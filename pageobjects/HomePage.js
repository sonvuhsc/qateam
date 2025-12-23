const { expect } = require("@playwright/test");

class HomePage {
    constructor(page) {
        this.page = page;
        this.bannerHomePage = page.getByTestId('hero-section-container');
        this.getStartButton = page.getByRole('button', { name: 'Bắt đầu ngay' });
        this.getUsernameTb = page.getByTestId('login-username-input');
        this.getPasswordTb = page.getByTestId('login-password-input');
        this.getLoginButton = page.getByTestId('login-submit-button');
        this.getInputOtp = page.locator('[aria-label="PinInput"]');
        this.getTuVanLabel = page.getByRole('button', { name: 'Tư vấn' });
        this.footerHomePage = page.locator('#footer div').filter({ hasText: 'CÔNG TY CỔ PHẦN CHỨNG KHOÁNTHÀNH PHỐ HỒ CHÍ MINHTrụ sở chính:Tầng 2,3,5,6,7,11' }).first();
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
    // async clickLoginButton() {
    //     await this.getLoginButton.click();
    // }

    async validLogin(username, password, otp) {
        // await this.page.pause();
        await this.getUsernameTb.type(username, { delay: 200 });
        await this.page.waitForTimeout(300);
        await this.getPasswordTb.type(password, { delay: 200 });
        await this.page.waitForTimeout(300);
        // Log trạng thái
        console.log('Checking button status...');
        console.log(await this.getLoginButton.getAttribute('disabled'));
        await expect(this.getLoginButton).toBeEnabled({ timeout: 5000 });
        await this.getLoginButton.click();
        await this.page.waitForTimeout(300);
        // check otp is visible or not to input
        if (await this.getInputOtp.first().isVisible()) {
            for (let i = 0; i < otp.length; i++) {
                await this.getInputOtp.nth(i).fill(otp[i]);
            }
        } else {
            console.log('OTP input not visible, skipping OTP input.');
        }
    }
    // Click button Tu van to navigate back ONE Advisory page
    async clickTuVanButton() {
        await this.getTuVanLabel.click();
    }

    //validate after logged in
    async verifyAfterLoggedIn() {
        console.log('Verify after logged in...');
        await expect(this.getUsernameTb).not.toBeVisible();
        await expect(this.getPasswordTb).not.toBeVisible();
    }

    async verifyFooter() {
        await expect(this.footerHomePage).toBeVisible();
        console.log('Check footer display');
    }
}
module.exports = { HomePage };