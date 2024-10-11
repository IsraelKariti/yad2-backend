import { propertyConditions, propertyTypes } from "../../constants/enums.js";
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
const getPropertyConditionQueryFilter = (propertyCondition)=>{
    const propertyConditionString = propertyConditions[propertyCondition-1];
    const filter = {propertyCondition: propertyConditionString}
    return filter;
}
const getFloorQueryFilter = (floor)=>{
    const parts = floor.split('-');
    const minFloor = parts[0];
    const maxFloor = parts[1];
    const filter = {floor: {$gte: minFloor, $lte: maxFloor}}
    return filter;
}
const getSqaureMetersQueryFilter = (sqaureMeters)=>{
    const parts = sqaureMeters.split('-');
    const minSqr = parts[0];
    const maxSqr = parts[1];
    const filter = {sqaureMetersTotal: {$gte: minSqr, $lte: maxSqr}}
    return filter;
}
const getEntranceDateFilter = (dediredEntranceDate)=>{
    return {entranceDate : {$lte : dediredEntranceDate}}
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
    if(queryParams.hasMedia != null){
        const hasMediaQueryFilter = { hasMedia: true}
        queryFilters.push(hasMediaQueryFilter);
    }
    if(queryParams.hasPrice != null){
        const hasPriceQueryFilter = { price: { $gt: 0 }}
        queryFilters.push(hasPriceQueryFilter);
    }
    if(queryParams.isVillage != null){
        const isVillageQueryFilter = { isVillage: true}
        queryFilters.push(isVillageQueryFilter);
    }
    if(queryParams.hasParking != null){
        const hasParkingQueryFilter = { parkingSpots: {$gte: 1}}
        queryFilters.push(hasParkingQueryFilter);
    }
    if(queryParams.hasElevator != null){
        const hasElevatorQueryFilter = { elevator: true}
        queryFilters.push(hasElevatorQueryFilter);
    }
    if(queryParams.hasSafeRoom != null){
        const hasSafeRoomQueryFilter = { hasSafeRoom: true}
        queryFilters.push(hasSafeRoomQueryFilter);
    }
    if(queryParams.hasBalcony != null){
        const hasBalconyQueryFilter = {balconies: {$gte: 1}}
        queryFilters.push(hasBalconyQueryFilter);
    }
    if(queryParams.hasAirCondition != null){
        const hasAirConditionQueryFilter = {hasAirCondition: true}
        queryFilters.push(hasAirConditionQueryFilter);
    }
    if(queryParams.hasStorage != null)
        queryFilters.push({hasStorage: true})
    if(queryParams.refurbished != null)
        queryFilters.push({refurbished: true})
    if(queryParams.isAccessible!=null)
        queryFilters.push({isAccessible: true});
    if(queryParams.barsOnWindows!=null)
        queryFilters.push({barsOnWindows: true});
    if(queryParams.furnished != null)
        queryFilters.push({furnished: true});
    if(queryParams.propertyCondition != null){
        const propertyConditionQueryFilter = getPropertyConditionQueryFilter(queryParams.propertyCondition);
        queryFilters.push(propertyConditionQueryFilter);
    }
    if(queryParams.floor != null){
        const floorQueryFilter = getFloorQueryFilter(queryParams.floor);
        queryFilters.push(floorQueryFilter);
    }
    if(queryParams.sqaureMetersTotal!=null){
        const sqaureMetersQueryFilter = getSqaureMetersQueryFilter(queryParams.sqaureMetersTotal);
        queryFilters.push(sqaureMetersQueryFilter);
    }
    if(queryParams.immediateEntrance != null){
        queryFilters.push({immediateEntrance: true})
    }
    if(queryParams.entranceDate != null){
        const entranceDateFilter = getEntranceDateFilter(queryParams.entranceDate);
        queryFilters.push(entranceDateFilter);
    }
    if(queryParams.propertyDescription != null){
        const textualPropertyDescription = queryParams.propertyDescription;
        const propertyDescriptionFilter = {propertyDescription : {$regex: textualPropertyDescription, $options: 'i'}};
        queryFilters.push(propertyDescriptionFilter);
    }


    const listings = await SellListing.find({
        $and: queryFilters
    })
    return listings;
}

export const deleteListingInDB = async (listingId)=>{
    await SellListing.findByIdAndDelete(listingId)
}