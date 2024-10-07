import { SellListing } from "../../models/sellListing.model.js";

export const createSellListingInDB = async (listingInfo)=>{
    const newListing = new SellListing(listingInfo);
    const savedListing = await newListing.save();
    return savedListing._id;
}