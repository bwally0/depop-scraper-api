import express from 'express';
import { getSellerInfoController } from '../controllers/test.controller.mjs';
const test = express.Router();

test.get('/seller/info', getSellerInfoController);

export default test;
