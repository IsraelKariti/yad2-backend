import { propertyTypes } from "../../constants/enums.js";
import { SellListing } from "../../models/sellListing.model.js";
import { getSetBitIndices, extractListValuesByIndecis } from "../../utils/utils.js";


export const createSellListingInDB = async (listingInfo)=>{
    const newListing = new SellListing(listingInfo);
    const savedListing = await newListing.save();
    return savedListing._id;
}

const getPropertyTypeQueryFilter = (propertyTypes)=>{
    const propertyTypesSetBits = propertyTypes;
    const properyTypesIndecis = getSetBitIndices(propertyTypesSetBits);
    const propertyTypesValues = extractListValuesByIndecis(properyTypesIndecis, propertyTypes);
    const propertyTypesQueryFilter = { propertyType: { $in : propertyTypesValues} }
    return propertyTypesQueryFilter;
}

const getPriceQueryFilter = (price)=>{
    const prices = price.split('-');
    const minPrice = prices[0];
    const maxPrice = prices[1];
    const priceFilter = {
        price: {
          $gte: minPrice,
          $lte: maxPrice
        }
    };
    return priceFilter;
}

const getRoomsQueryFilter = (rooms)=>{
    const roomsList = rooms.split('-');
    const minRooms = roomsList[0];
    const maxRooms = roomsList[1];
    const roomsFilter = {
        rooms: {
            $gte: minRooms,
            $lte: maxRooms
        }
    }
    return roomsFilter;
}

export const getSellListingsFromDB = async (queryParams)=>{

    const queryFilters = [];
    // check all possible queries and convert to mongoose objects
    // 1. propertyTypes
    if(queryParams.propertyTypes != null){
        const propertyTypesQueryFilter = getPropertyTypeQueryFilter(queryParams.propertyTypes);
        queryFilters.push(propertyTypesQueryFilter);
    }
    if(queryParams.price != null){
        const priceQueryFilter = getPriceQueryFilter(queryParams.price);
        queryFilters.push(priceQueryFilter);
    }
    if(queryParams.rooms != null){
        const roomsQueryFilter = getRoomsQueryFilter(queryParams.rooms);
        queryFilters.push(roomsQueryFilter);
    }

    const listings = await SellListing.find({
        $and: queryFilters
    })
    return listings;
}