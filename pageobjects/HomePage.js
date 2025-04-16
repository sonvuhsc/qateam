const { expect } = require("@playwright/test");

class HomePage {
    constructor(page) {
        this.page = page;
        this.bannerHomePage = page.locator('.my-auto');
        this.getStartButton = page.getByRole('button', { name: 'Bắt đầu ngay' });
        this.getLoginButton = page.getByRole('button', { name: 'Đăng nhập' });
        this.getUsernameTb = page.getByRole('textbox', { name: 'Mã khách hàng' });
        this.getPasswordTb = page.getByRole('textbox', { name: 'Mật khẩu' });
        this.getInputOtp = page.locator('#mantine-pv7yh696q');

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

    async clickLoginButton() {
        await this.getLoginButton.click();
    }


    async validLogin(username, password, otp) {
        await this.getUsernameTb.fill(username);
        await this.getPasswordTb.fill(password);
        await page.waitForTimeout(500); // đợi JS xử lý
        await expect(this.getLoginButton).toBeEnabled();
        await this.getLoginButton.click();
        await this.page.waitForLoadState('networkidle');
        for (let i = 0; i < otp.length; i++) {
            const inputId = `#${this.getInputOtp}-${i + 1}`;
            await this.page.locator(inputId).fill(otp[i]);
        }

    }



}
module.exports = { HomePage };