import fs from 'fs';
import { ok, created, serverError } from "../responses/responses.js";
import { createSellListingInDB, getSellListingsFromDB, deleteListingInDB, updateListingInDB } from "../services/sellListings/sellListings.service.js";
import { addSellListingToUserInDB, deleteListingFromUserInDB } from "../services/users/users.service.js";
import { copyFilesBetweenDirectories } from '../utils/utils.js';
import { SellListing } from '../models/sellListing.model.js';

const doesMediaExist = async ()=>{
    const files = await fs.promises.readdir('tempUploads');
    return files.length > 0;
}

export const createSellListing = async (req, res)=>{
    const userEmail = req.email;
    const mediaDir = 'uploads';
    const userMediaDir = `uploads/${userEmail}`;
    if(!fs.existsSync(mediaDir))
        await fs.promises.mkdir(mediaDir);
    if(!fs.existsSync(userMediaDir))
        await fs.promises.mkdir(userMediaDir);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const listingDirPath = `uploads/${userEmail}/${uniqueSuffix}`;
    
    // STEP 1: create the listing in the collection
    const listingInfo = req.body;
    listingInfo.mediaDirPath = listingDirPath;
    listingInfo.hasMedia = await doesMediaExist();
    listingInfo.hasPrice = listingInfo.price != 0;
    const listingId = await createSellListingInDB(listingInfo);

    // STEP 2: add the listing id in the user 
    await addSellListingToUserInDB(userEmail, listingId);

    // STEP 3: change the name of the files folder temp
    await copyFilesBetweenDirectories('./tempUploads', listingDirPath);

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

export const deleteListing = async (req, res)=>{
    const listingId = req.params.listingId;
    const userEmail = req.email;

    try{
        await deleteListingInDB(listingId);
        await deleteListingFromUserInDB(userEmail, listingId);
        ok(res, 'Listing was deleted successfully');
    }
    catch(e){
        serverError(res, 'Cant delte listing in DB')
    }
}

export const updateListing = async (req, res)=>{
    const listingId = req.params.listingId;
    const updatedInfo = req.body;

    try{
        await updateListingInDB(listingId, updatedInfo);
        ok(res, 'Successfully updated listing in database');
    }
    catch(e){
        serverError(res, 'Could not update the listing in the database')
    }

}