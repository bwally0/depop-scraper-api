import express from 'express';
import { getSellerInfoController, getSellerProductsController } from '../controllers/seller.controller.mjs';
const seller = express.Router();

/*
seller information:
/seller/info?sellerId        get: general info about seller
/seller/products             get: list of seller products
/seller/feedback?sold        get: seller sold reviews
/seller/feedback?purchased   get: seller purchased reviews
? /seller/followers            get: seller's followers list
? /seller/following            get: seller's following list
*/

seller.get('/info', getSellerInfoController);
seller.get('/products', getSellerProductsController);
// seller.get('/feedback', getSellerFeedbackController);

// seller.get('/followers', getSellerFollowersController);
// seller.get('/following', getSellerFollowingController);

export default seller;