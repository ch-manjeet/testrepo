

import { test,  Page, expect, Browser, } from '@playwright/test';
import { chromium } from 'playwright';
import * as fs from 'fs';

  function getBlogUrls(): string[] {
    const filePath:string = "./tests//source/blog-urls.csv"
    const urls: string[] = [];
  
    // Read the file synchronously
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
  
    // Split the file content into lines
    const lines = fileContent.split('\n');
  
    // Skip the header line and parse the remaining lines
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const url = line.split(',')[0]; // Assuming URL is in the first column
        urls.push(url);
      }
    }
  
    return urls;
  }


test.describe('Blog Tag tests', () => {

    //const urls: string[]= await getBlogUrls();
    const urls: string[] = getBlogUrls()

    urls.forEach((url, index)=> {
        test(`Test: ${url}`, async () => {
            // Launch browser and navigate to the page
            const browser:Browser = await chromium.launch({ headless: true });
            const context = await browser.newContext({
                httpCredentials: {
                    username: 'earlybird',  
                    password: 'ps2022',  
                }
            });
        
            const page: Page = await context.newPage();
        
            await page.goto(url)
        
            // Define the new tags to check
            const unifiedTags = [  'Cloud',  'azure',  'AWS',  'Tech Operations',  'AI & Data',  'Business & Leadership',  'Software Development',  'Cybersecurity',  'News',  'Upskilling',  'chrome developer tools',  'kubernetes',  'python',  'power bi',  'react',  'javascript',  'docker',  'ruby',  'sql',  'salesforce',  'unity',  'r',  'java',  'devops',  'entity framework core',  'angluar',  'c++',  'c#'];

            // Define the old tags to checl
            const oldTags = [  'Public Sector',  'IT Ops',  'Engineering Leadership',  'Data',  'Security',  'Business',  'Developer Experience',  'Professional Development',  'Software Delivery Process',  'Team Development',  'Product & UX',  'AI & Machine Learning',  'Learning & Development',  'Pluralsight One'];


            const tagListExists = await page.waitForSelector('.tag-list-item', { timeout: 5000, state: 'attached' }).catch(() => null);

            test.skip(!tagListExists, 'Skipping this test as there is no tag available');
            
            // Retrieve all tag elements
            const tagElements = await page.$$('.tag-list-item');
            
            // Extract text from each tag element
            const blogTags = await Promise.all(tagElements.map(async (tag) => {
                return tag.textContent();
            }));
            

            // Check if any of the unifiedTags tags are present
            const foundTags = blogTags.filter(tag => tag && unifiedTags.includes(tag));

            //check if any of the oldTags are present
            const oldTagsFound = blogTags.some(tagText => tagText && oldTags.includes(tagText));

            // Print found tags
           if (foundTags.length > 0) {
              console.log('Found unified tags:', foundTags);
             } else {
             console.log('No unified tags found');
      }


            // Assert that we found the new required tags
            await expect(foundTags.length, "Unified tag exists").toBeGreaterThan(0)
            

            // Assert that we should not found the old required tags
            await expect(!oldTagsFound, "Unified tag exists").toBeTruthy()
         
            // Close the browser
            await browser.close();
        })      
    })
   
  });
