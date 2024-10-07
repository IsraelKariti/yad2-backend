import { createSellListingInDB } from "../services/sellListings/sellListings.service.js";
import { addSellListingToUserInDB } from "../services/users/users.service.js";

export const createSellListing = async (req, res)=>{
    const userEmail = req.email;
    const listingInfo = req.body;

    // STEP 1: create the listing in the collection
    const listingId = await createSellListingInDB(listingInfo);

    // STEP 2: add the listing id in the user 
    addSellListingToUserInDB(userEmail, listingId);
}