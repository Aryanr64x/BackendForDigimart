
import asyncHandler from 'express-async-handler'
import { prisma } from "../app.js";
import { s } from '../app.js'

export const getAssets = asyncHandler(async (req, res) => {
    const assets = await prisma.asset.findMany();
    res.status(200).json({
        data: assets
    });
});

export const getAsset = asyncHandler(async (req, res) => {
    const asset = await prisma.asset.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            reviews: {
                include: { user: {} }
            }
        }
    });
    res.status(200).json({
        data: asset
    })

})


const computeNewAverage = (x, z, y) => {
    return (x * z + y) / (z + 1)
}


export const createReview = asyncHandler(async (req, res) => {


    const asset = await prisma.asset.findUnique({
        where: { id: parseInt(req.params.id) },
    })


    const newRating = computeNewAverage(asset.average_rating, asset.reviews_count, req.body.rating)

    await prisma.asset.update({
        where: { id: parseInt(req.params.id) }, data: {
            average_rating: newRating, reviews_count: { increment: 1 }
        }
    })

    await prisma.review.create({ data: { body: req.body.text, asset_id: parseInt(req.params.id), user_id: req.body.user.id } });


    const newAsset = await prisma.asset.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            reviews: {
                include: { user: {} }
            }
        }
    });



    res.status(200).json({
        data: newAsset
    })
})




export const createAsset = (asyncHandler(async (req, res) => {

    const product = await s.products.create({
        name: req.body.title,
        description: req.body.summary,
        type: 'service', // You can use 'good' for physical products
    });


    const price = await s.prices.create({
        unit_amount: req.body.price * 10, // Amount in cents (e.g., $10.00)
        currency: 'usd',
        product: product.id, // Use the product ID from the created product

    });

    const asset = await prisma.asset.create({
        data: {
            description: req.body.description,
            price: req.body.price,
            summary: req.body.summary,
            title: req.body.title,
            dp: req.body.dp,
            creator_id: req.body.user.id,     
            priceId: price.id
        }
    })
    
    res.json("Success")
}))