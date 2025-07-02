import { test, Page, Browser, BrowserContext, webkit, firefox, expect } from '@playwright/test';
import { chromium } from 'playwright';
import * as fs from 'fs';

function getBlogUrls(filePath: string): string[] {
  const urls: string[] = [];

  // Read the file synchronously
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

  // Split the file content into lines
  const lines = fileContent.split('\n');

  // Skip the header line and parse the remaining lines
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      const url = line.split(',')[0]; // Assuming URL is in the first column
      urls.push(url);
    }
  }

  return urls;
}

test.describe('Blog Tag tests', () => {

  const filePath = './tests/source/blog-urls-author-prod.csv';  // Updated file path
  const urls =  getBlogUrls(filePath);


  urls.forEach((url, index)=> {
    test(`Find author-by-line-text for: ${url}`, async ({browserName}) => {
      
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

        // Navigate to the URL
        await page.goto(url, { timeout: 60000 });
  
        // Define the selector for author-by-line-text
        const authorByLineSelector = '.author-by-line-text';
  
        // Wait for the author-by-line-text element to be visible
        const authorByLine = await page.locator(authorByLineSelector);
        const isVisible = await authorByLine.isVisible();
  
        // Log the URL
        console.log(`URL: ${url}`);
  
        // Check if the author-by-line-text is visible and log it
        if (isVisible) {
          const authorText = await authorByLine.textContent();
          console.log(`Author by line text found: ${authorText?.trim()}`);
        } else {
          console.log('Author by line text not found');
        }

        expect(isVisible).toBeTruthy();


        await browser.close();
    })      
  })
});
