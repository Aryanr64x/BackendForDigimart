import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';

import { prisma } from '../app.js';

export const get = asyncHandler(async (req, res) => {

    const { assets } = prisma.user.findUnique({
        where: { id: req.body.user.id },
        include: { assets }
    })

    res.status(200).json({ data: assets })

})


export const insert = asyncHandler(async (req, res) => {

    await prisma.user.update({
        where: { id: req.body.user.id },
        data:{
            assets:{
                connect: [{id: req.body.asset.id}]
                // i can also disconnect if i want in this implicit table
            }
        }
    })
    
    res.status(200).json("Success")
});