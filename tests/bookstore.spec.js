// @ts-check
import { test, expect } from '@playwright/test';
import { BookStorePage } from '../pages/BookStorePage.js';
import { bookstoreData } from '../data/testData.js';

test.describe('Search book', () => {
  test('Verify expected books for each configured search keyword', async ({ page }) => {
    //Step 1: Go to Bookstore page
    const bookstore = new BookStorePage(page);
    await bookstore.goto();
    await bookstore.ensureOnBookstore();

    //Step 2: Search for each keyword and verify the expected books are present in the results
    for (const keyword of bookstoreData.searchKeywords) {
      await test.step(`Search for "${keyword}"`, async () => {
        // Step 2.1: Search for the keyword
        await bookstore.searchBook(keyword);
        const bookTitles = await bookstore.getBookTitles();
        console.log(`Found ${bookTitles.length} books for keyword "${keyword}":`, bookTitles);

        // Step 2.2: Verify the expected books are present in the results
        await bookstore.assertExpectedBooksPresent(bookstoreData.expectedBooks);
      });
    }
  });
});