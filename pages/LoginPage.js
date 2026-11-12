import { BasePage } from './BasePage.js';
import { loginData } from '../data/testData.js';
import { loginLocators } from '../locator/LoginPage.js';

export class LoginPage extends BasePage {
  async goto() {
    await super.goto(loginData.loginURL);
  }

  async login(username, password) {
    await this.inputText(loginLocators.usernameInput, username);
    await this.inputText(loginLocators.passwordInput, password);
    await this.clickElement(loginLocators.loginButton);
  }

  async verifyLoginErrorMessage(expectedMessage) {
    // Wait for the error message to be visible
    await this.waitForElementVisible(loginLocators.loginErrorMessage);

    // Verify the error message when the login attempt fails
    await this.assertElementText(loginLocators.loginErrorMessage, expectedMessage);
  }
}