import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import HttpError from './http.error.mjs';

let browserInstance;

// TODO errormaxxing
const launchBrowserInstance = async () => {
  browserInstance = await puppeteer.launch({ headless: true });
};

const getBrowserInstance = async () => {
  if (!browserInstance) {
    await launchBrowserInstance();
  }
  return browserInstance;
};

const loadPageContent = async (url) => {
  const browser = await getBrowserInstance();

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0'
  );
  const response = await page.goto(url);

  if (response.status() !== 200) {
    throw new HttpError('page not found', 404);
  }

  const cookiesButton = await page.$('button[data-testid="cookieBanner__acceptAllButton"]')
  await cookiesButton.click();

  // await page.evaluate(() => {
  //   window.scrollTo(0, document.body.scrollHeight); // Scroll to the bottom of the page
  // });

  const htmlContent = await page.content();
  page.close();

  const $ = cheerio.load(htmlContent);

  return $;
};

// scrollPage

export { launchBrowserInstance, getBrowserInstance, loadPageContent };
