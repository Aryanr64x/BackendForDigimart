
import asyncHandler from 'express-async-handler'
import { prisma } from "../app.js";

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


    const newAsset =  await prisma.asset.findUnique({
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