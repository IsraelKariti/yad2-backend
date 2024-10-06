import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, getUser } from "../services/users/users.service.js";
import { ok, created, badRequest, serverError } from "../responses/responses.js";
dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

export const signup = async (req, res)=>{
    const email = req.body.email;
    try{
        const newUser =  await createUser(req.body);
        const token = jwt.sign({email}, jwt_secret);
        created(res, token);
    }catch(e){
        console.log(e);
        if(e.code === 11000)
            badRequest(res, 'Email must be unique');
        else
            serverError(res, 'Could not sign up');
    }
}

export const login = async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    if(email == null || password == null){
        badRequest(res, 'Email or password are invalid');
        return;
    }

    const user = await getUser(email, password);
    if(user == null){
        badRequest(res, 'Email or password are invalid');
        return;
    }
    const token = jwt.sign({email}, jwt_secret);
    ok(res, token);
}