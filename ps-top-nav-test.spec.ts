import { test, expect } from '@playwright/test';

test.describe('Pluralsight Top Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.pluralsight.com/');
        await page.waitForLoadState('domcontentloaded');
    });

    test('Verify and Click Pluralsight Logo', async ({ page }) => {
        const logo = page.locator('a[aria-label="Pluralsight"]');
        await expect(logo).toBeVisible();
        await logo.click();
        await expect(page).toHaveURL('https://www.pluralsight.com/');
    });

//     test('Search Bar Functionality', async ({ page }) => {
//         const searchIcon = page.locator('button[aria-label="Search"]');
//         await expect(searchIcon).toBeVisible();
//         await searchIcon.click();

//         const searchInput = page.locator('input[type="search"]');
//         await expect(searchInput).toBeVisible();

//         await searchInput.fill('Playwright Testing');
//         await searchInput.press('Enter');

//         await page.waitForLoadState('networkidle');
//         await expect(page).toHaveURL(/search/);
//     });

//     test('Sign In Dropdown and Redirects', async ({ page }) => {
//         const signInButton = page.locator('a:has-text("Sign in")');
//         await expect(signInButton).toBeVisible();
//         await signInButton.click();

//         await page.waitForLoadState('networkidle');
//         await expect(page).toHaveURL(/signin/);
//     });

//     test('Navigation Links Functionality', async ({ page }) => {
//         const navLinks = [
//             { name: 'Individuals', url: '/individuals' },
//             { name: 'Business', url: '/business' },
//             { name: 'Public Sector', url: '/public-sector' },
//             { name: 'Courses', url: '/courses' },
//             { name: 'Resources', url: '/resources' },
//         ];

//         for (const link of navLinks) {
//             const navElement = page.locator(`nav >> text=${link.name}`);
//             await expect(navElement).toBeVisible();
//             await navElement.click();
//             await page.waitForLoadState('networkidle');
//             await expect(page).toHaveURL(new RegExp(link.url));
//             await page.goBack();
//         }
//     });
// });