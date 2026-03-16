import test, { expect } from "@playwright/test";
import { loginInfo } from "./data-files/loginInfo";
import { LoginPage } from "./page-objects/login-page";
import { generateEmail } from "./data-files/testData";

test.describe("Login Page Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test("UserLogin_WithValidCredentials_ShouldSucceed", async ({ page }) => {
    //Arrange & Act
    await loginPage.login(loginInfo.username, loginInfo.password);  
    await Promise.all([
      page.waitForURL("**/home", {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      }),
      loginPage.continueButton.click()      
    ]);

    // Assertion
    await expect(page).toHaveURL(/\/home/);
     // Logout after successful login     
    await page.goto("/logout", { waitUntil: "commit" });    
  });
  test("UserLogin_WithInvalidEmailFormat_DisplaysErrorMessage", async () => {
    //Arrange & Act
    await loginPage.usernameInput.click();
    await loginPage.usernameInput.fill("testuser@example");
    await loginPage.continueButton.click();
    //Assertion
    await expect(loginPage.emailErrorMessage).toContainText(
      "Enter a valid email.",
    );
  });

  test("UserLogin_WithNonRegisteredEmail_DisplaysErrorMessage", async ({ page }) => {
    //Arrange & Act
    const email = generateEmail();
    await loginPage.login(email, "invalidpassword");

    await Promise.all([
      page.waitForResponse(res => 
        res.url().includes("/login") && res.status() === 400, // wait for failed auth response
      ),
      loginPage.continueButton.click()
    ]);
    //Assert
    await expect(loginPage.errorMessageText).toBeVisible({ timeout: 10000 });
  });

  test("UserLogin_WithNoPasswordValue_DisplaysErrorMessage", async () => {
    //Arrange & Act
    await loginPage.usernameInput.click();
    await loginPage.usernameInput.fill("testuser@example.com");
    await loginPage.continueButton.click();
    await loginPage.continueButton.click();
    //Assertion
    await expect(loginPage.passwordErrorMessage).toContainText(
      "Enter your password.",
    );
  });
  test("UserLogin_WithNoEmailValue_DisplaysErrorMessage", async () => {
    //Arrange & Act
    await loginPage.continueButton.click();
    //Assertion
    await expect(loginPage.emailRequiredMessage).toContainText(
      "Enter an email address",
    );
  });
  test("UserLogin_EditUsername_Functionality_ShouldSucceed", async ({ page }) => {
    //Arrange & Act
    await loginPage.usernameInput.click();
    await loginPage.usernameInput.fill("testuser@example.com");
    await loginPage.continueButton.click();
    await loginPage.editusernameLink.click();

    await loginPage.login(loginInfo.username, loginInfo.password);    

    await Promise.all([
      page.waitForURL("**/home", {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      }),
      loginPage.continueButton.click()      
    ]);
    // Assertion
    await expect(page).toHaveURL(/\/home/);

    // Logout after successful login
    await page.goto("/logout", { waitUntil: "commit" });
  });
});
