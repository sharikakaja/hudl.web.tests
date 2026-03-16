import { Page } from "@playwright/test";
export const loginPageSelectors = {
  userEmailSelector: "#username",
  userPasswordSelector: "#password",
};

export class LoginPage {
  constructor(public page: Page) {}
  async navigateToLogin() {
    await this.page.goto("/login");
  }
  get usernameInput() {
    return this.page.locator(loginPageSelectors.userEmailSelector);
  }
  get passwordInput() {
    return this.page.locator(loginPageSelectors.userPasswordSelector);
  }
  get continueButton() {
    return this.page.getByRole("button", { name: "Continue", exact: true });
  }
  get errorMessageText() {
     return this.page.getByText('Incorrect username or password.');    
  }
  get emailErrorMessage() {
    return this.page.locator("#error-cs-email-invalid");
  }
  get passwordErrorMessage() {
    return this.page.locator("#error-cs-password-required");
  }
  get emailRequiredMessage() {
    return this.page.locator("#error-cs-username-required");
  }
  get editusernameLink() {
    return this.page.getByRole("link", { name: "Edit email address" });
  }
  async login(username: string, password: string) {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.click();
    await this.usernameInput.fill(username);

    await this.continueButton.click();
    
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.click();
    await this.passwordInput.fill(password);    
  }
}
