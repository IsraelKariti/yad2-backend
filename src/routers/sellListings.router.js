import multer from 'multer';
import fs from 'fs';
import { Router } from "express";
import { authorizeToken } from "../auth/auth.js";
import { validateSellListing } from "../validators/sellListing.validator.js";
import { createSellListing, getSellListings, deleteListing, updateListing } from "../controllers/sellListings.controller.js";
import { checkIfListingBelongToUser } from '../middlewares/middlewares.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const email = req.email;
        fs.mkdirSync('tempUploads', {recursive: true});
        cb(null, 'tempUploads');
    },
    filename: function (req, file, cb) {
        const originalname = file.originalname;
        const nameParts = originalname.split('.');
        const fileType = nameParts[nameParts.length-1];
        cb(null, `${file.fieldname}.${fileType}`);
    }
});

const upload = multer({ storage: storage });

const cpUpload = upload.fields([{ name: 'video', maxCount: 1 }, { name: 'photos', maxCount: 10 }]);

export const sellListingsRouter = Router(); 
sellListingsRouter.post('/create', authorizeToken, cpUpload, validateSellListing, createSellListing);
sellListingsRouter.get('/', getSellListings);
sellListingsRouter.delete('/:listingId', authorizeToken, checkIfListingBelongToUser, deleteListing);
sellListingsRouter.patch('/:listingId', authorizeToken, checkIfListingBelongToUser, updateListing);