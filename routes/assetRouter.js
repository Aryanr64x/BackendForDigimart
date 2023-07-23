import express from "express";
import { createAsset, createReview, getAsset, getAssets } from "../controllers/assetController.js";
import { protect } from "../controllers/authController.js";
const assetRouter = express.Router();

assetRouter.get("", getAssets);
assetRouter.post("", protect, createAsset)
assetRouter.get("/:id", getAsset);
assetRouter.post('/:id/review', protect, createReview)

export default assetRouter;