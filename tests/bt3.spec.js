import { test, expect } from '@playwright/test';

test("bt3", async ({ page }) => {
await page.goto("https://vivainternational.vn/")
//câu 1
await page.locator('//form[contains(@class,"relative")]/descendant::input[contains(@class,"form-input")]').first().fill('cà phê');
await page.locator('//form[contains(@class,"relative")]/descendant::button[@type="submit"]').first().click();
// hiển thị 18 thẻ sản phẩm
await expect(page.locator('//div[contains(@class,"group") and contains(@class,"relative")]')).toHaveCount(18);
//câu 2
await page.locator('//button[@aria-label="cart"]').first().click();
await page.locator('//div[contains(@class,"drawer-content")]//button[contains(normalize-space(.),"Tiến hành thanh toán")]').click();
await page.locator('//div[contains(@class,"relative")]//descendant::input[contains(@name,"name")]').fill('Nguyễn Gia Hân');
await page.locator('//div[contains(@class,"relative")]//descendant::input[contains(@name,"contact")]').fill('0938656910');
await page.locator('//div[contains(@class,"relative")]//descendant::input[contains(@name,"address")]').fill('123 Đường ABC');    
await page.locator('//div[contains(@class,"relative")]//descendant::input[contains(@name,"ward")]').fill('phường XYZ');
await page.locator('//select[contains(@name,"city")]').selectOption('TP. Hồ Chí Minh');
await page.locator('//input[contains(@name,"shippingOption")]').first().check();
await page.locator('//input[contains(@name,"paymentMethod")]').first().check();
await page.locator('//button[@type="submit" and @title="Xác nhận đặt hàng"]').click();
//đặt hàng thành công
await expect(page.getByRole('heading', { name: 'Đặt hàng thành công!' })).toBeVisible();
});

