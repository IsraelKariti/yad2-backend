import dotenv from 'dotenv';
import { app } from "./app.js";
import { connectToDB } from './src/db/db.js';
import { getMatchingCities } from './src/services/cities/cities.service.js';
import { getMatchingStreetsForCity } from './src/services/streets/streets.service.js';
import { getAreaAndNeighbourhood } from './src/utils/utils.js';
dotenv.config();

// const cities = await getMatchingCities('הר'); 
// const streets = await getMatchingStreetsForCity('הרצליה', 'הפ') // city name should be followed by space
// const areaAndNeighbourhood = await getAreaAndNeighbourhood('6400', '0548', '1'); 

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
    connectToDB();
});