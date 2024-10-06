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