import express from 'express';
const seller = express.Router();

/*
seller information:
/seller/info?sellerId        get: general info about seller
/seller/feedback?sold        get: seller sold reviews
/seller/feedback?purchased   get: seller purchased reviews
/seller/products?            get: list of seller products
? /seller/followers            get: seller's followers list
? /seller/following            get: seller's following list
*/

seller.get('/', (req, res) => {
  res.send('seller endpoint');
})

// seller.get('/info', getSellerInfoController);
// seller.get('/feedback', getSellerFeedbackController);
// seller.get('/products', getSellerProductsController);
// seller.get('/followers', getSellerFollowersController);
// seller.get('/following', getSellerFollowingController);


export default seller;