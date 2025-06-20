const { expect } = require("@playwright/test");

class HomePage {
    constructor(page) {
        this.page = page;
        this.bannerHomePage = page.locator('.my-auto');
        this.getStartButton = page.getByRole('button', { name: 'Bắt đầu ngay' });
        this.getLoginButton = page.getByRole('button', { name: 'Đăng nhập' });
        this.getUsernameTb = page.getByRole('textbox', { name: 'Mã khách hàng' });
        this.getPasswordTb = page.getByRole('textbox', { name: 'Mật khẩu' });
        this.getInputOtp = page.locator('[aria-label="PinInput"]');
        this.footerHomePage = page.locator('div').filter({ hasText: 'CÔNG TY CỔ PHẦN CHỨNG KHOÁN THÀNH PHỐ HỒ CHÍ MINHTrụ sở:Tầng 2,5,6,7,11 và 12 T' }).nth(3);

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
    
    async verifyFooter() {
        await expect(this.footerHomePage).toBeVisible();
        console.log('Check footer display');
    }
}
module.exports = { HomePage };