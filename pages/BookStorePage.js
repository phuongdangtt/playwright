import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { bookstoreData } from '../data/testData.js';
import { bookstoreLocators } from '../locator/BookStorePage.js';

export class BookStorePage extends BasePage {
  async goto() {
    await super.goto(bookstoreData.bookstoreURL);
  }

  async ensureOnBookstore() {
      await expect(this.page).toHaveURL(bookstoreData.bookstoreURL);
    }

  async searchBook(keyword) {
    await this.inputText(bookstoreLocators.searchBox, keyword);
  }

  async getBookTitles() {
    const bookTitleCells = this.page.locator(bookstoreLocators.bookTitleCells);
    await expect(bookTitleCells.first()).toBeVisible();
    const total = await bookTitleCells.count();
    const titles = [];
    for (let i = 0; i < total; i++) {
      const t = (await bookTitleCells.nth(i).innerText()).trim();
      if (t !== '') titles.push(t);
    }
    return titles;
  }

  async waitForBookPresent(bookName, timeout = 5000) {
    const bookTitleCells = this.page.locator(bookstoreLocators.bookTitleCells);
    await expect(bookTitleCells).toContainText(bookName, { timeout });
  }

  // Assert that the bookstore results contain the specified book title.
  async assertExpectedBookPresent(bookName) {
    const bookTitleCells = this.page.locator(bookstoreLocators.bookTitleCells);
    await expect(bookTitleCells).toContainText(bookName, { timeout: 5000 });
  }

  // Assert that the results include every title in expectedBooks; extra titles are allowed.
  async assertExpectedBooksPresent(expectedBooks) {
    const bookTitles = await this.getBookTitles();
    expect(bookTitles).toEqual(
      expect.arrayContaining(expectedBooks)
    );
  }
}
