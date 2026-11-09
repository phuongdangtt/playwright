import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { globalData, profileData } from '../data/testData.js';
import { profileLocators } from '../locator/ProfilePage.js';

export class ProfilePage extends BasePage {
  async ensureOnProfile() {
    await expect(this.page).toHaveURL(profileData.profileURL);
  }

  async reload() {
    await this.page.reload();
    await this.ensureOnProfile();
  }

  async searchBook(name) {
    const searchBook = this.page.locator(profileLocators.searchBox);
    await expect(searchBook).toBeVisible();
    await searchBook.fill(name);
  }

  async isBookPresent(name) {
    const bookCell = this.page.locator(profileLocators.bookCell, { hasText: name });
    const count = await bookCell.count();
    return count > 0;
  }

  async waitForBookPresent(name, timeout = 10000) {
    const bookCell = this.page.locator(profileLocators.bookCell, { hasText: name });
    await expect(bookCell).toBeVisible({ timeout });
  }

  async waitForBookAbsent(name, timeout = 10000) {
    const bookCell = this.page.locator(profileLocators.bookCell, { hasText: name });
    await expect(bookCell).toHaveCount(0, { timeout });
  }

  async deleteBook(name) {
    const deleteButton = this.page.locator(profileLocators.deleteButton(name));
    await deleteButton.click();
  }

  async confirmDelete(timeout = 5000) {
    const confirmDialog = this.page.locator(profileLocators.confirmDialog);
    const confirmOkButton = this.page.locator(profileLocators.confirmOkButton);
    await expect(confirmDialog).toBeVisible({ timeout });
    await confirmOkButton.click();
  }

  async waitForDeletedDialog(timeout) {
    const deletedDialog = this.page.locator(profileLocators.deletedDialog);
    try {
      await expect(deletedDialog).toBeVisible({ timeout });
      const okButton = this.page.locator(profileLocators.deletedOkButton);
      await okButton.click();
      return true;
    } catch {
      return false;
    }
  }

  async getDisplayedUsername() {
    const usernameLocator = this.page.locator(profileLocators.profileUsername);
    await expect(usernameLocator).toBeVisible();
    return await usernameLocator.textContent();
  }

  async verifyUsernameDisplayed(expectedUsername) {
    const displayedUsername = await this.getDisplayedUsername();
    if (displayedUsername.trim() !== expectedUsername) {
      throw new Error(`Expected username to be "${expectedUsername}", but got "${displayedUsername.trim()}"`);
    }
    expect(displayedUsername.trim()).toBe(expectedUsername);
  }
}