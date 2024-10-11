import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {badRequest} from '../responses/responses.js';

dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

export const authorizeToken = (req, res, next)=>{
    const auth = req.headers['auth'];
    if(auth == null)
        badRequest(res, 'Request headers should contain an auth key, and a token beared as value')
    const token = auth.split(' ')[1];
    try{
        const decoded = jwt.verify(token, jwt_secret);
        const email = decoded.email;
        req.email = email;
        next();
    }
    catch(e){
        badRequest(res, 'Unauthorized access')
    }
}