import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import sellerRoutes from './routes/seller.router.mjs';
import productRoutes from './routes/product.router.mjs';
import { launchBrowserInstance } from './utils/scraper.utils.mjs';
import { scrapeSellerProducts } from './scrapers/seller.scraper.mjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

launchBrowserInstance();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/seller', sellerRoutes);
app.use('/product', productRoutes);

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
