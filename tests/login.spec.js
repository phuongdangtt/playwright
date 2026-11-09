// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { globalData,loginData } from '../data/testData.js';

test.describe('Login', () => {
    test('Verify user cannot login with invalid credentials', async ({ page }) => {
            const loginPage = new LoginPage(page);
        // Step 1: Navigate to the login page
            await loginPage.goto();

        // Step 2: Attempt to login with invalid credentials
            await loginPage.login(loginData.invalidUsername, loginData.invalidPassword);

        // Step 3: Verify that the error message content is correct
            await loginPage.verifyLoginErrorMessage(loginData.loginErrorMessage);
    })

    test('Verify user can login with valid credentials', async ({ page }) => {
            const loginPage = new LoginPage(page);
        // Step 1: Navigate to the login page
            await loginPage.goto();

        // Step 2: Attempt to login with valid credentials
            await loginPage.login(globalData.username, globalData.password);

        // Step 3: Verify that the login was successful
            // 3.1: Ensure that the user is redirected to the profile page
            const profilePage = new ProfilePage(page);
            await profilePage.ensureOnProfile();

            // 3.2: Verify that the username is displayed on the profile page
            await profilePage.verifyUsernameDisplayed(globalData.username);
    })
});