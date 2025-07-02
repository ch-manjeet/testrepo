import { test, expect } from '@playwright/test';

test('searchbox_should_redirect_with_keyword', async ({ page }) => {
  await page.goto('/');
  //await page.locator('#transcend-consent-manager').click();
  await page.waitForTimeout(3000);

  const form = await page.locator('#header_searchForm')
  const searchBox = form.getByRole('textbox');

  const keyword= "java";
  searchBox.fill(keyword);
  searchBox.press("Enter");

  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(`https://www.pluralsight.com/search?q=${keyword}`);

 });


 test('Searchbox_should_open_dropdown_with_list',async({page})=> {
    await page.goto('/');

    // click on the search box first 
    const searchBox = await page.locator('#header_searchForm').getByRole('textbox');
    await searchBox.click();
    await page.waitForTimeout(3000);

    await searchBox.fill("java ");
    searchBox.press('Backspace');

    
    await page.waitForTimeout(5000);

   // Wait for dropdown to appear
   const dropdown = page.locator('//div[@id="header-search-results-all"]');
   await expect(dropdown).toBeVisible();

   // Validate that the dropdown contains results
   const dropdownItems = page.locator('//div[@id="header-search-results-all"]//a[@class="header_dropdown--resultInfoTitle"]');
   await expect(dropdownItems).toHaveCount(5);

   console.log("Dropdown is visible with results ✅");
     
});



   

