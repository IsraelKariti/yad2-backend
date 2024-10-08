import { Router } from "express";
import { authorizeToken } from "../auth/auth.js";
import { validateSellListing } from "../validators/sellListing.validator.js";
import { createSellListing, getSellListings } from "../controllers/sellListings.controller.js";

export const sellListingsRouter = Router();

sellListingsRouter.post('/create', authorizeToken, validateSellListing, createSellListing);
sellListingsRouter.get('/', getSellListings);