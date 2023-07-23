import express from 'express'
import { protect } from '../controllers/authController.js';
import { onSessionComplete, pay, success } from '../controllers/stripeController.js';
const stripeRouter = express.Router();

stripeRouter.post('', protect, pay);
stripeRouter.post('/success', protect, success);
stripeRouter.post('/hook', onSessionComplete)


export default stripeRouter;
