/**
 * https://info.data.gov.il/datagov/home/
 */
import { convertFileToObject } from '../../utils/utils.js';
import {fileURLToPath} from 'url';
import path from 'path';

const __scriptname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__scriptname);
const __csvpath = path.join(__dirname, 'citiesTable.csv');
const citiesPromise = convertFileToObject(__csvpath);

export const getMatchingCities = async (query)=>{
  const cities = await citiesPromise;
  const citiesStartsWithQuerty = [];
  const citiesContainsQuery = [];

  for(const elem of cities){
    const cityName = elem.שם_ישוב;
    const cityId = elem.סמל_ישוב;
    const cityInfo = {cityName, cityId};
    if(cityName.startsWith(query))
      citiesStartsWithQuerty.push(cityInfo)
    else if(cityName.includes(query))
      citiesContainsQuery.push(cityInfo);
  }
  const citiesWithQuery = [...citiesStartsWithQuerty, ...citiesContainsQuery];
  return citiesWithQuery;
}
