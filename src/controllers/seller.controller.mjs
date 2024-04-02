import { getSellerInfoService } from '../services/seller.service.mjs';
import HttpError from '../utils/http.error.mjs';

const getSellerInfoController = async (req, res) => {
  try {
    const sellerId = req.query.sellerId;

    if (!sellerId) {
      return res.status(400).json({ message: 'sellerId parameter missing' });
    }

    const sellerInfo = await getSellerInfoService(sellerId);

    return res.status(200).json(sellerInfo);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.status).json({ message: `${error.message}`});
    }

    return res.status(500).json({ message: `${error}` });
  }
};

export { getSellerInfoController };
