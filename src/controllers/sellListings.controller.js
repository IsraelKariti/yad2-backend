import { ok, created, serverError } from "../responses/responses.js";
import { createSellListingInDB, getSellListingsFromDB } from "../services/sellListings/sellListings.service.js";
import { addSellListingToUserInDB } from "../services/users/users.service.js";

export const createSellListing = async (req, res)=>{
    const userEmail = req.email;
    const listingInfo = req.body;

    // STEP 1: create the listing in the collection
    const listingId = await createSellListingInDB(listingInfo);

    // STEP 2: add the listing id in the user 
    await addSellListingToUserInDB(userEmail, listingId);
    created(res, 'Successfully created a sell listing');
}

export const getSellListings = async (req, res)=>{
    const queryParams = req.query;
    try{
        const listings = await getSellListingsFromDB(queryParams);
        ok(res, listings);
    }catch(e){
        serverError(res, 'Cant get listings: '+e);
    }
}