import { scrapeSellerInfo } from '../scrapers/seller.scraper.mjs';

const getSellerInfoService = async (sellerId) => {
  const sellerInfo = await scrapeSellerInfo(sellerId);
  return sellerInfo;
};

export { getSellerInfoService };