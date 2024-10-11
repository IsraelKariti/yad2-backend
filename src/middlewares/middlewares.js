import { badRequest } from "../responses/responses.js";
import { User } from "../models/user.model.js";

export const checkIfListingBelongToUser = async (req, res, next)=>{
    const email = req.email;
    const listingId = req.params.listingId;

    const user = await User.findOne({email});
    if(user.SellListings.includes(listingId)){
        next();
    }
    else{
        badRequest(res, 'This user does not any listing with that id');
    }
}