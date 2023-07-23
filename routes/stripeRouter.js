import express from 'express'
import { protect } from '../controllers/authController.js';
import { onSessionComplete, pay } from '../controllers/stripeController.js';
const stripeRouter = express.Router();

stripeRouter.post('', protect, pay);
stripeRouter.post('/hook',express.json() , onSessionComplete)


export default stripeRouter;
