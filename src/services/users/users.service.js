import { User } from "../../models/user.model.js";
import bcrypt from 'bcrypt';


export const createUser = async (userInfo)=>{
    const password = userInfo.password;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({...userInfo, hash}).save();
    return newUser;
}

export const getUser = async (email, password)=>{
    const user = await User.findOne({email});
    if(user == null)
        return null;

    const hash = user.hash;
    const isCorrectPassword = await bcrypt.compare(password, hash);
    return isCorrectPassword ? user : null;
}

export const updateUserInDB = async (email, userInfo)=>{
    const updatedUser = await User.findOneAndUpdate(
        {email},
        {...userInfo},
        {new: true, runValidators: true});
}

export const addSellListingToUserInDB = async (email, sellListingId)=>{
    const updatedUser = await User.findOneAndUpdate(
        {email},
        {$push: {SellListings: sellListingId}}
    )
}

export const deleteListingFromUserInDB = async (email, listingId)=>{
    await User.findOneAndUpdate(
        {email},
        {$pull: {SellListings: listingId}}
    )
}