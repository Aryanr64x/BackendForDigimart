import express from 'express';
import assetRouter from "./routes/assetRouter.js";
import  cors from 'cors'
import {errorHandler} from "./controllers/errorController.js";
import authRouter from "./routes/authRouter.js";
import stripeRouter from './routes/stripeRouter.js';
import cartRouter from './routes/cartRouter.js';
import  stripe from 'stripe'

import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient()

export const s = stripe(process.env.STRIPE_SECRET)


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static('public'));

app.use('/api', authRouter);

app.use('/api/assets', assetRouter)



app.use('/api/payment', stripeRouter)


app.use('/api/cart', cartRouter)
app.use((req, res, next)=>{
    next(new Error("No Route Exists"))
});


app.use(errorHandler);






app.listen(8000, ()=>{
    console.log("The server has started")
});
