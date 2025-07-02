import { test, expect } from '@playwright/test';

test('Searchbox_should_open_dropdown_with_list',async({page})=> {


    await page.goto('https://www.pluralsight.com/');

    // click on the search box first 
    const searchBox = await page.locator('#header_searchForm').getByRole('textbox');
    await searchBox.click();
    await page.waitForTimeout(3000);

    await searchBox.fill("java ");
    searchBox.press('Backspace');

    
    await page.waitForTimeout(5000);

    const dropdown = page.locator('#search-menu__results-dropdown').first();
    await expect (dropdown).toBeVisible();


   //  const dropdownItem = page.locator('//div[@id="header-search-results-all"]//a[@class="header_dropdown--resultInfoTitle" and @href="/search?q=java"]');
   //  await dropdownItem.click();


   // Wait for dropdown to appear
   //const dropdown = page.locator('//div[@id="header-search-results-all"]');
   //await expect(dropdown).toBeVisible();

   // Validate that the dropdown contains results
   //const dropdownItems = page.locator('//div[@id="header-search-results-all"]//a[@class="header_dropdown--resultInfoTitle"]');
  // await expect(dropdownItems).toHaveCount(1);

  // console.log("Dropdown is visible with results ✅");
     
});