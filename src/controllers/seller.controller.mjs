import { getSellerInfoService } from '../services/seller.service.mjs';

const getSellerInfoController = async (req, res) => {
  try {
    const sellerId = req.query.sellerId;

    if (!sellerId) {
      return res.status(400).json({ message: 'sellerId parameter missing' });
    }

    const sellerInfo = await getSellerInfoService(sellerId);

    return res.status(200).json(sellerInfo);
  } catch (error) {

    return res.status(500).json({ message: `${error}` });
  }
};

export { getSellerInfoController };
