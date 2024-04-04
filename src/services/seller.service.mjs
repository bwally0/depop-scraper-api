import { scrapeSellerInfo, scrapeSellerProducts } from '../scrapers/seller.scraper.mjs';

const getSellerInfoService = async (sellerId) => {
  const sellerInfo = await scrapeSellerInfo(sellerId);
  return sellerInfo;
};

const getSellerProductsService = async (sellerId) => {
  const sellerProducts = await scrapeSellerProducts(sellerId);
  return sellerProducts;
}

export { getSellerInfoService, getSellerProductsService };