import { test, expect } from '@playwright/test';
import path from 'path';

test("User Registration", async ({ page }) => {
    //fill tất cả thông tin
  await page.goto("https://share.google/JFVR60ICNlRoOWOEl")
  await page.locator('//div[@id="parent"]/input').fill('Nguyễn Gia Hân');
  await page.locator('//div[@id="child"]/input').fill('nguyengiahan@gmail.com');
  await page.locator('//div[contains(@class,"form-group")]/descendant::input[@id="male"]').check();
  await page.locator('//div[contains(@class,"form-group")][label="Hobbies:"]/descendant::input[@id="reading"]').check();
  await page.locator('//div[contains(@class,"form-group")][label="Interests:"]/descendant::select[@id="interests"]').selectOption(['technology', 'music']);
  await page.locator('//div[contains(@class,"form-group")][label="Country:"]/descendant::select[@id="country"]').selectOption('uk');
  await page.locator('//div[contains(@class,"form-group")][label="Date of Birth:"]/descendant::input[@id="dob"]').fill('2000-05-15');
  await page.locator('//div[contains(@class,"form-group")][label[@for="profile"]]/descendant::input[@id="profile"]'
).setInputFiles(path.resolve('images/abc.jpg'));
  await page.locator('//div[contains(@class,"form-group")][label="Biography:"]/descendant::textarea[@id="bio"]').fill('Chuyên gia Playwright');
  await page.locator('//label[@for="rating"]/ancestor::div[contains(@class,"form-group")]//input[@id="rating"]').focus();
  await page.locator('//label[@for="rating"]/ancestor::div[contains(@class,"form-group")]//input[@id="rating"]').press('ArrowRight');
  await page.locator('//div[contains(@class,"form-group")][label="Favorite Color:"]/descendant::input[@id="favcolor"]').fill('#646f6f');
  await page.locator('//div[contains(@class,"form-group")][label[normalize-space()="Newsletter:"]]/descendant::input[@id="newsletter"]').check();
  await page.locator('//label[contains(@class,"switch")]/descendant::span[contains(@class,"slider")]').click();
  await page.locator('//div[contains(@class,"form-group")][label="Star Rating:"]/descendant::div[@id="starRating"]').click({ position: { x: 90, y: 10 } });
  const customDate = page.locator('//input[@id="customDate"]');
  await customDate.evaluate(el => el.removeAttribute('readonly'));
  await customDate.fill('2000-05-15');
    //click register
  await page.getByRole('button', { name: 'Register', exact: true }).click();

    // Kiểm tra Username và Email xuất hiện trong bảng
  const userRow = page.locator('//table[@id="userTable"]//tr').filter({
      hasText: 'Nguyễn Gia Hân'
  });

  await expect(userRow).toContainText('Nguyễn Gia Hân');
  await expect(userRow).toContainText('nguyengiahan@gmail.com');

  // Kiểm tra các thông tin đã đăng ký
  await expect(userRow).toContainText('Gender: male');
  await expect(userRow).toContainText('Hobbies: reading');
  await expect(userRow).toContainText('Country: uk');
  await expect(userRow).toContainText('Date of Birth: 2000-05-15');
  await expect(userRow).toContainText('Biography: Chuyên gia Playwright');
  await expect(userRow).toContainText('Rating: 6');
  await expect(userRow).toContainText('Favorite Color: #646f6f');
  await expect(userRow).toContainText('Newsletter: Yes');
  await expect(userRow).toContainText('Enable Feature: Yes');
  await expect(userRow).toContainText('Star Rating: 4.5');
  await expect(userRow).toContainText('Custom Date: 2000-05-15');
});