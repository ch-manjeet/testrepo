//Open the browser
//Open page
//Enter URL : https://www.pluralsight.com/
// Create Locators for contact sales form "First name" "Lat name" "Email Address" "Company" "JobTitle"  "Phone" 
// "Country"  "License from dropdown" 
// Input fiels 
//click submit button
//verify submission message
//Take SS & close browser

import {test, expect, Browser, Page, Locator} from '@playwright/test'
import { chromium } from 'playwright'

test("contact sales",async ()=>{
    const browser:Browser= await chromium.launch({headless:false});
    const page:Page= await  browser.newPage();
    await page.goto("https://www.pluralsight.com/")
    //const Acceptall =await page.locator('button[class="Accept all"]').click
    // if (await Acceptall.isVisible()) {
    //     await Acceptall.click();
    //   }



    const contactsalesbutton = await page.locator("//a[@href='#contact-sales']")
    console.log(contactsalesbutton)
    await contactsalesbutton.click();

    //await page.waitForTimeout(5000)

   
  const form = await page.locator('#marketoForm_1298')
     await form.getByLabel('*First Name').fill("MR Test")
     await form.getByLabel('*Last Name').fill("Sales form ")
     await form.getByLabel('*Email').fill("testcontactsalesform@pstest.com")
     await form.getByLabel('*Company').fill("Pluralsight")
    //await form.getByLabel('*Job Title').fill("Test")
     await form.getByLabel('*Phone').fill("1234567890")
     await form.getByLabel('*Country').selectOption({label:"United States"})
     await form.getByLabel('*How many licenses').selectOption({label:"2 to 10"})
     await form.getByRole('button', { name: /Submit/i }).click();
    
   
   


   
   await page.waitForTimeout(5000)



    //browser.close();

});