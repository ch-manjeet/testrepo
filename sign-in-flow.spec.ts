import { test, expect, Page } from '@playwright/test';

const signInMenus = [
    {name: 'Skills', menuLocator: '//a[@class="menu-dropdown-skills"]', expectedUrl: 'https://app.pluralsight.com/id' },
    {name:'ACG', menuLocator: '//a[@class="menu-dropdown-cloud-guru"]',expectedUrl: 'https://auth.acloud.guru/login?*'},
    {name:'Flow',menuLocator: '//a[@class="menu-dropdown-flow"]',expectedUrl: 'https://app.pluralsight.com/id?redirectTo=https%3a%2f%2fflow.pluralsight.com%2f'}
];

test.describe('Pluralsight Sign-in Tests', () => {

    test('SignIn_Link_should_visible', async ({ page }) =>{
        // todo: check the visibility of Menu dropdown, by checking style block of dropdown

        await page.goto('/');
        
        const signInButton = page.locator('//div[@class="g3p-signin-wrapper"]//span[contains(text(), "Sign in")]');
        await expect(signInButton).toBeVisible();

    });
    
    signInMenus.forEach((data, index)=> {
        test(`Sign_Into_${data.name}_ Dropdown_and_Redirects`, async ({ page }) =>{

            await page.goto('/');
        
            const signInButton = page.locator('//div[@class="g3p-signin-wrapper"]//span[contains(text(), "Sign in")]');
                await expect(signInButton).toBeVisible();
                await signInButton.click();
        
                const signInToSkills = page.locator(data.menuLocator);
                await expect(signInToSkills).toBeVisible();
                await signInToSkills.click();
        
                await page.waitForLoadState('networkidle');
                await expect(page).toHaveURL(data.expectedUrl,{ignoreCase:true})
        
                await page.waitForTimeout(5000);
        
        });
    })
});



