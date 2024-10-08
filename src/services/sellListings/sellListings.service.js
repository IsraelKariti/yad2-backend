import { propertyTypes } from "../../constants/enums.js";
import { SellListing } from "../../models/sellListing.model.js";
import { getSetBitIndices, extractListValuesByIndecis } from "../../utils/utils.js";


export const createSellListingInDB = async (listingInfo)=>{
    const newListing = new SellListing(listingInfo);
    const savedListing = await newListing.save();
    return savedListing._id;
}

const getPropertyTypeQueryFilter = (queryParams)=>{
    const propertyTypesSetBits = queryParams.propertyTypes;
    const properyTypesIndecis = getSetBitIndices(propertyTypesSetBits);
    const propertyTypesValues = extractListValuesByIndecis(properyTypesIndecis, propertyTypes);
    const propertyTypesQueryFilter = { propertyType: { $in : propertyTypesValues} }
    return propertyTypesQueryFilter;
}

export const getSellListingsFromDB = async (queryParams)=>{

    const queryFilters = [];
    // check all possible queries and convert to mongoose objects
    // 1. propertyTypes
    if(queryParams.propertyTypes != null){
        const propertyTypesQueryFilter = getPropertyTypeQueryFilter(queryParams);
        queryFilters.push(propertyTypesQueryFilter);
    }

    const listings = await SellListing.find({
        $and: queryFilters
    })
    return listings;
}