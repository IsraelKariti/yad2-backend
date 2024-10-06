import Papa from 'papaparse';
import fs from 'fs';
import iconv from 'iconv-lite';
import Axios from 'axios';

export const convertFileToObject = async (filePath, encoding = 'windows-1255')=>{
    // convert the file to a string
    const buffer = await fs.promises.readFile(filePath);
    // const data = iconv.decode(buffer, 'windows-1255');
    const data = iconv.decode(buffer, encoding);
    // convert the string to object
    const csvObj = await convertStringToObject(data);
    return csvObj;
}

const convertStringToObject = (data)=>{
    return new Promise((resolve, reject)=>{
      Papa.parse(data, {
        header: true,
        skipEmptyLines: true,
        complete: (results)=>{
          resolve(results.data);
        },
        error: (err)=>{
          reject(err);
        }
      });
    });
  }

export const getAreaAndNeighbourhood = async (cityId, streetId, houseNumber)=>{
    const url = `https://gw.yad2.co.il/address-master/house-number?result_type=extended&city_id=${cityId}&street_id=${streetId}&house_number=${houseNumber}&limit=10&page=1`;
    const response = await Axios.get(url);
    const area_heb = response.data.data.data[0].area_heb;
    const hood_heb = response.data.data.data[0].hood_heb;
    return {area_heb, hood_heb};
}