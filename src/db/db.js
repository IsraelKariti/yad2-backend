import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongo_url = process.env.MONGO_URL;

export const connectToDB = async ()=>{
    try{

        await mongoose.connect(mongo_url);
        console.log('Successfully connected to mongodb');
        
    }
    catch(e){
        console.log('Error connection to mongodb: '+e);
    }
}