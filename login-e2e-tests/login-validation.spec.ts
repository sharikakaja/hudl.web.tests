import test, { expect } from "@playwright/test";
import { loginInfo } from "./data-files/loginInfo";

test.describe('Login Page Tests', () => {
  
  test('login with valid credentials succeeds', async ({ page }) => {    
    await page.goto(' https://www.hudl.com/login');
    await page.locator('#username').click();
    await page.locator('#username').fill(loginInfo.username);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.locator('#password').click();
    await page.locator('#password').fill(loginInfo.password);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page).toHaveURL('https://www.hudl.com/home');
    await page.waitForTimeout(3000);
  });
});