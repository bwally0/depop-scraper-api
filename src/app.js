import express from 'express';
import bodyParser from 'body-parser';
import testRoutes from './routes/test.router.mjs';
import sellerRoutes from './routes/seller.router.mjs';
import productRoutes from './routes/product.router.mjs';
import { launchBrowserInstance } from './utils/scraper.utils.mjs';

const app = express();
const port = 3000;

launchBrowserInstance();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/test', testRoutes);
app.use('/seller', sellerRoutes);
app.use('/product', productRoutes);

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
