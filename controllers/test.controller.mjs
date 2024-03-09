import { getSellerInfoService } from '../services/test.service.mjs';

const getSellerInfoController = async (req, res) => {
  try {
    const sellerId = req.query.sellerId;
    const sellerInfo = await getSellerInfoService(sellerId);

    res.status(200).json(sellerInfo);
  } catch (error) {
    console.error('CONTROLLER error fetching seller info:', error);
    res.status(500).json({ error: 'internal server error' });
  }
};

export { getSellerInfoController };
