import { expect } from '@playwright/test';

export class BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  async goto(url, options = { waitUntil: 'domcontentloaded' }) {
    await this.page.goto(url, options);
  }

  async reload() {
    await this.page.reload();
  }

  async ensureOnPage(url) {
    await expect(this.page).toHaveURL(url, { timeout: 5000 });
  }

  /**
   * Asserts that the element is visible immediately (does not wait).
   * Use waitForElementVisible if you want to wait for visibility.
   */
  async assertElementVisible(locator, options = {timeout: 5000}) {
    const element = this.page.locator(locator);
    await expect(element).toBeVisible(options);
  }
  /**
   * Asserts that the element with the given text is visible immediately (does not wait).
   * Use waitForElementWithTextVisible if you want to wait for visibility.
   */
  async assertElementWithTextVisible(locator, text, options = {timeout: 5000}) {
    const element = this.page.locator(locator, { hasText: text });
    await expect(element, `Element with locator "${locator}" and text "${text}" is not visible`).toBeVisible(options);
  }

  async waitForElementAbsent(locator, options = {timeout: 5000}) {
    const element = this.page.locator(locator);
    await expect(element).toHaveCount(0, options);
  }

  async inputText(locator, text) {
    const inputElement = this.page.locator(locator);
    await this.assertElementVisible(locator);
    await inputElement.fill(text);
  }

  async clickElement(locator) {
    await this.assertElementVisible(locator);
    await this.page.locator(locator).click();
  }

  async waitForElementVisible(selector) {
    await this.page.locator(selector).waitFor({
        state: 'visible',
        timeout: 5000
    });
  }

  async getElementText(locator) {
    await this.assertElementVisible(locator);
    const element = this.page.locator(locator);
    return (await element.textContent())?.replace(/\s+/g, ' ').trim();
  }

  async assertElementText(locator, expectedText) {
    const actualText = await this.getElementText(locator);
    expect(actualText).toBe(expectedText.trim());
  }

  async isElementWithTextPresent(locator, text) {
      const element = this.page.locator(locator, { hasText: text });
      const count = await element.count();
      return count > 0;
    }

  async assertElementText(locator, expectedText) {
    await this.assertElementVisible(locator);

    const element = this.page.locator(locator);
    const actualText = (await element.textContent())?.replace(/\s+/g, ' ').trim();
    expect(actualText).toBe(expectedText.trim());
  }
    
  async searchElementByText(locator, searchText) {
    const element = this.page.locator(locator);
    await this.assertElementVisible(element);
    await element.fill(searchText);
  }

}
