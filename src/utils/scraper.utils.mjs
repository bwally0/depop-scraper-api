import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import HttpError from './http.error.mjs';

let browserInstance;

// TODO errormaxxing
const launchBrowserInstance = async () => {
  browserInstance = await puppeteer.launch({ headless: false });
};

const getBrowserInstance = async () => {
  if (!browserInstance) {
    await launchBrowserInstance();
  }
  return browserInstance;
};

const loadPageContent = async (url) => {
  try {
    const browser = await getBrowserInstance();

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0'
    );

    const response = await page.goto(url);

    if (response.status() !== 200) {
      throw new HttpError('page not found', 404);
    }

    // const cookiesButton = await page.$('button[data-testid="cookieBanner__acceptAllButton"]')
    // await cookiesButton.click();

    // await page.evaluate(() => {
    //   window.scrollTo(0, document.body.scrollHeight); // Scroll to the bottom of the page
    // });

    await page.waitForSelector('ol[class="styles_productGrid__3vl3U"]');
    const htmlContent = await page.content();
    // page.close();

    const $ = cheerio.load(htmlContent);

    return $;
  } catch (error) {

    throw error;
  }
};

const openReviews = async (url) =>  { 
  try {
    const browser = await getBrowserInstance();

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0'
    );

    const response = await page.goto(url);

    if (response.status() !== 200) {
      throw new HttpError('page not found', 404);
    }

    try {
      const cookies = 'button[data-testid="cookieBanner__acceptAllButton"]'
      await page.click(cookies)
    } catch (error) {

    }

    try {
      const button = 'button[data-testid="buttonLink"]'
      await page.waitForSelector(button, { timeout: 1000 });
      await page.click(button);
    } catch (error) {
      
    }

    try { const button = 'button[data-testid="feedback-btn"]'
    await page.waitForSelector(button, { timeout: 5000 });
    await page.click(button);
    } catch (error) {

    }

    await page.waitForSelector('div[class="styles_container__bdAwq"]');
    
    const htmlContent = await page.content();

    const $ = cheerio.load(htmlContent);

    // page.close();

    return $;

  } catch (error) {
    throw error;
  }
};


// scrollPage

export { launchBrowserInstance, getBrowserInstance, loadPageContent, openReviews };
