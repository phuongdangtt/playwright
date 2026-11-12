import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { globalData, profileData } from '../data/testData.js';
import { profileLocators } from '../locator/ProfilePage.js';

export class ProfilePage extends BasePage {
  async ensureOnProfile() {
    await this.ensureOnPage(profileData.profileURL);
  }

  async reloadProfilePage() {
    await this.reload();
    await this.ensureOnProfile();
  }

  async searchBook(name) {
    await this.inputText(profileLocators.searchBox, name);
  }

  async isBookPresent(name) {
    return this.isElementWithTextPresent(profileLocators.bookCell, name);
  }

  async waitForBookPresent(name, timeout = 3000) {
    await this.assertElementWithTextVisible(profileLocators.bookCell, name, { timeout });
  }

  async waitForBookAbsent(name, timeout = 3000) {
    await this.waitForElementAbsent(profileLocators.bookCell, { timeout });
  }

  async deleteBook(name) {
    await this.clickElement(profileLocators.deleteButton(name));
  }

  async confirmDeleteBook(timeout = 5000) {
    await this.assertElementVisible(profileLocators.confirmDialog, { timeout });
    await this.clickElement(profileLocators.confirmOkButton);
  }

  async waitForDeletedDialog(timeout) {
    try {
      await this.assertElementVisible(profileLocators.deletedDialog, { timeout });
      await this.assertElementVisible(profileLocators.deletedOkButton, { timeout });
      await this.clickElement(profileLocators.deletedOkButton);
      return true;
    } catch {
      return false;
    }
  }

  async getDisplayedUsername() {
    await this.assertElementVisible(profileLocators.profileUsername);
    return await this.getElementText(profileLocators.profileUsername);
  }

  async verifyUsernameDisplayed(expectedUsername) {
    const displayedUsername = await this.getDisplayedUsername();
    if (displayedUsername.trim() !== expectedUsername) {
      throw new Error(`Expected username to be "${expectedUsername}", but got "${displayedUsername.trim()}"`);
    }
    expect(displayedUsername.trim()).toBe(expectedUsername);
  }
}