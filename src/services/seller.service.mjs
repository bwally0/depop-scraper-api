import { scrapeSellerInfo, scrapeSellerProducts, scrapeSellerFeedback } from '../scrapers/seller.scraper.mjs';

const getSellerInfoService = async (sellerId) => {
  const sellerInfo = await scrapeSellerInfo(sellerId);
  return sellerInfo;
};

const getSellerProductsService = async (sellerId) => {
  const sellerProducts = await scrapeSellerProducts(sellerId);
  return sellerProducts;
}

const getSellerFeedbackService = async (sellerId) => {
  const sellerFeedback = await scrapeSellerFeedback(sellerId);
  return sellerFeedback;
}

export { getSellerInfoService, getSellerProductsService, getSellerFeedbackService };