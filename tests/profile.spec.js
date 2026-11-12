// @ts-check
import { test } from '@playwright/test';
import { addBookByName } from '../api/book.api.js';
import { LoginPage } from '../pages/LoginPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { globalData, profileData } from '../data/testData.js';

test.describe('Delete book', () => {
    test('Verify user can delete added book in his profile', async ({ page }) => {
        const bookName = profileData.bookName;
        const loginPage = new LoginPage(page);
        // Step 1: Navigate to login page and login with valid credentials
        await loginPage.goto();
        await loginPage.login(globalData.username, globalData.password);

        // Step 2: Ensure that the user is on the profile page and search for the book
        const profile = new ProfilePage(page);
        await profile.ensureOnProfile();
        await profile.searchBook(bookName);
            //If the book is not present, add it through the API and verify it is present
        if (!(await profile.isBookPresent(bookName))) {
            console.log(`Book "${bookName}" is not in the profile. Trying to add it through the API.`);
            const added = await addBookByName(bookName);
            if (!added) {
                console.warn(`API did not add "${bookName}"; checking whether it is already in the profile.`);
            }

            await profile.reload();
            await profile.searchBook(bookName);
            await profile.waitForBookPresent(bookName);
        }
        // Step 3: Delete the book and verify it is deleted
        await profile.deleteBook(bookName);
        await profile.confirmDeleteBook();
        const deletedShown = await profile.waitForDeletedDialog(3000);
        if (!deletedShown) {
            console.warn('Book Deleted dialog was not detected.');
        }
        // Step 4: Verify that the book is no longer present in the profile
        await profile.searchBook(bookName);
        await profile.waitForBookAbsent(bookName);
        console.log(`✅ Book "${bookName}" is deleted successfully.`);
    });
});