import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

let browserInstance;

// TODO ERRORMAXXING
const launchBrowserInstance = async () => {
  browserInstance = await puppeteer.launch();
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
    throw new Error('page not found');
  }

  const htmlContent = await page.content();
  page.close();

  const $ = cheerio.load(htmlContent);

  return $;
};

export { launchBrowserInstance, getBrowserInstance, loadPageContent };
