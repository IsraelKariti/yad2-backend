import multer from 'multer';
import fs from 'fs';
import { Router } from "express";
import { authorizeToken } from "../auth/auth.js";
import { validateSellListing } from "../validators/sellListing.validator.js";
import { createSellListing, getSellListings } from "../controllers/sellListings.controller.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const email = req.email;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const listingDirPath = `uploads/${email}/${uniqueSuffix}`;
        req.body.mediaDirPath = listingDirPath;
        fs.mkdirSync(listingDirPath, {recursive: true});
        cb(null, listingDirPath);
    },
    filename: function (req, file, cb) {
        const originalname = file.originalname;
        const nameParts = originalname.split('.');
        const fileType = nameParts[nameParts.length-1];
        cb(null, `${file.fieldname}.${fileType}`);
    }
});

const upload = multer({ storage: storage })

const cpUpload = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'photos', maxCount: 10 }]);

export const sellListingsRouter = Router(); 
sellListingsRouter.post('/create', authorizeToken, cpUpload, validateSellListing, createSellListing);
sellListingsRouter.get('/', getSellListings);

/**
 * {
    "city": "הרצליה",
    "street": "הפרחים",
    "houseNumber": 24,
    "floor": 1,
    "totalFloors": 1,
    "neighbourhood": "מרכז",
    "countryArea": "גוש דן",
    "propertyType": "דירה",
    "propertyCondition": "חדש",
    "rooms": 4,
    "sqaureMetersTotal": 64,
    "contactName": "srul",
    "contactPhone": "0506839593",
    "price": "200000"
}
 */