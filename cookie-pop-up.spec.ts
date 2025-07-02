import{test,expect} from '@playwright/test'

test('cookie_pop_up',async ({page}) => {

    page.setViewportSize({ width: 1512, height: 510 });


    await page.goto("https://www.pluralsight.com/businesses/pricing")

    await page.waitForTimeout(3000);
    
    page.keyboard.down('Shift');
    page.keyboard.press('Tab');

    await page.keyboard.up('Shift');
    page.keyboard.press('Enter');

    await expect(page).toHaveScreenshot({ fullPage: true });




 await page.waitForTimeout(3000);

    

  





    

   





});
