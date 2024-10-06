/**
* https://data.gov.il/dataset/321/resource/9ad3862c-8391-4b2f-84a4-2d4c68625f4b
*/
import { convertFileToObject } from "../../utils/utils.js";
import {fileURLToPath} from 'url';
import path from 'path';

const __scriptname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__scriptname);
const __csvpath = path.join(__dirname, 'streetsTable.csv');
const streetsPromise = convertFileToObject(__csvpath);

// cityName should be followd by space
export const getMatchingStreetsForCity = async (cityNameQuery, streetQuery)=>{
    const streets = await streetsPromise;
    const cityStreets = [];
    for(const street of streets){
        const cityName = street.שם_ישוב.trim();
        if(cityName === cityNameQuery){
            cityStreets.push(street);
        }
    }

    const streetsStartsWithQuerty = [];
    const streetsContainsQuery = [];
  
    for(const elem of cityStreets){
      const streetName = elem.שם_רחוב;
      let streetId = elem.סמל_רחוב.trim().padStart(4, '0');
      const streetInfo = {streetName, streetId};

      if(streetName.startsWith(streetQuery))
        streetsStartsWithQuerty.push(streetInfo)
      else if(streetName.includes(streetQuery))
        streetsContainsQuery.push(streetInfo);
    }
    const citiesWithQuery = [...streetsStartsWithQuerty, ...streetsContainsQuery];
    return citiesWithQuery;
  }