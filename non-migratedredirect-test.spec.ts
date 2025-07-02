import { test, expect, Browser, BrowserContext, firefox, webkit, Page } from '@playwright/test';
import { chromium } from 'playwright';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

interface UrlPair {
  source: string;
  redirected: string;
}

const testUrls:UrlPair[] = parse(fs.readFileSync("./tests/source/blog-data/non-migrated-urls-prod.csv"), {
  columns: true,
  skip_empty_lines: true,
});


test.describe('Blog Url migration',  async () => {

  testUrls.forEach((url, index)=> {
    
    test(`Test: ${url.source}`, async ({browserName}) => {
      
      let browser : Browser
      let context: BrowserContext
      if(browserName =="webkit"){
        browser = await webkit.launch({ headless: true });
        context= await browser.newContext({
          httpCredentials: {
              username: 'earlybird', 
              password: 'ps2022',  
          }
      });
      }
      else if(browserName == "firefox"){
        browser = await firefox.launch({headless: true});
        context= await browser.newContext({
          httpCredentials: {
              username: 'earlybird', 
              password: 'ps2022',  
          }
      });
      }
      else{
        browser = await chromium.launch({ headless: true });
        context= await browser.newContext({
          httpCredentials: {
              username: 'earlybird', 
              password: 'ps2022',  
          }
      });
      }
    
        const page: Page = await context.newPage();
    
        await page.goto(url.source)

         // Get the final URL after redirection
        const finalUrl = page.url();

        // Compare the final URL with the expected redirected URL
        if (finalUrl === url.redirected) {
          console.log(`Test passed: ${url.source} redirected to ${url.redirected}`);
        } else {
          console.log(`Test failed: ${url.source} did not redirect to ${url.redirected}, instead redirected to ${finalUrl}`);
        }

        // Assert that the redirection is correct
        expect(finalUrl).toBe(url.redirected);


      
          // Close the browser
        await browser.close();
    })      
})


});


// test.describe('Redirection validation of non-migrated blogs', () => {

//   test('Test URL redirection', async ({ browserName }) => {
//     const browser = await chromium.launch({ headless: true });
//     const context = await browser.newContext({
//       httpCredentials: {
//         username: 'earlybird',
//         password: 'ps2022'
//       }
//     });
//     const page = await context.newPage();

//     for (const { source, redirected } of urlMappings) {
//       console.log(`Testing redirection from ${source} to ${redirected}`);

//       // Navigate to the source URL
//       await page.goto(source);

//       // Get the final URL after redirection
//       const finalUrl = page.url();

//       // Compare the final URL with the expected redirected URL
//       if (finalUrl === redirected) {
//         console.log(`Test passed: ${source} redirected to ${redirected}`);
//       } else {
//         console.log(`Test failed: ${source} did not redirect to ${redirected}, instead redirected to ${finalUrl}`);
//       }

//       // Assert that the redirection is correct
//       expect(finalUrl).toBe(redirected);
//     }

//     await browser.close();
//   });

// });
