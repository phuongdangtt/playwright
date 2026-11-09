import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { loginData } from '../data/testData.js';
import { loginLocators } from '../locator/LoginPage.js';

export class LoginPage extends BasePage {
  async goto() {
    await super.goto(loginData.loginURL);
  }

  async login(username, password) {
    await this.page.locator(loginLocators.usernameInput).fill(username);
    await this.page.locator(loginLocators.passwordInput).fill(password);
    await this.page.locator(loginLocators.loginButton).click();
  }

  async verifyLoginErrorMessage(expectedMessage) {
    // Wait for the error message to be visible
    const errorMessageLocator = this.page.locator(loginLocators.loginErrorMessage);
    await expect(errorMessageLocator).toBeVisible();

    // Get the text content of the error message and compare it with the expected message
    const actualMessage = await errorMessageLocator.textContent();
    if (actualMessage.trim() !== expectedMessage) {
      throw new Error(`Expected error message to be "${expectedMessage}", but got "${actualMessage.trim()}"`);
    }
    expect(actualMessage.trim()).toBe(expectedMessage);
  }
}