import fs from 'fs';
import * as Yup from 'yup';
import { badRequest } from '../responses/responses.js';
import { propertyTypes, propertyConditions, openViews, roomsCount, showersCount, parkingSpotsCount, balconiesCount } from "../constants/enums.js";

const sellListingSchema = Yup.object().shape({
  city: Yup.string()
    .required('City is required'),

  street: Yup.string()
    .required('Street is required'),

  houseNumber: Yup.number()
    .required('Phone number is required'),

    floor: Yup.number()
      .required('floor is required'),

    totalFloors: Yup.number()
        .required('Total floors is required'),

    elevated: Yup.boolean(),

    hasElevator: Yup.boolean(),

    neighbourhood: Yup.string()
        .required('Listing must include neighbourhood'),

    countryArea: Yup.string()
        .required('Listing must include country area'),
    
    propertyType: Yup.string()
        .required('Listing must include type of the property')
        .oneOf(propertyTypes), 

    propertyCondition: Yup.string()
        .required('Listing must include condition of the property')
        .oneOf(propertyConditions),
    
    airDirections: Yup.number()
        .min(1, 'Listing must include at least 1 air direction')
        .max(4, 'Listing must include no more than 4 air directions'),
        
    openView: Yup.string()
        .oneOf(openViews),
    
    backfacing: Yup.boolean(),

    subscribeToEmailUpdates: Yup.boolean(),

    rooms: Yup.number()
        .required('Listing must includ the number of rooms')
        .oneOf(roomsCount),


    showers: Yup.number()
        .oneOf(showersCount),

    parkingSpots: Yup.number()
        .oneOf(parkingSpotsCount),
    
    balconies: Yup.number()
        .oneOf(balconiesCount),

    propertyDescription: Yup.string(),

    sqaureMetersBuilt: Yup.number()
        .min(1),

    sqaureMetersGarden: Yup.number()
    .min(1),

    sqaureMetersTotal: Yup.number()
        .required('Listing must contain the total of square meters of the property')
        .min(1),
    
    price: Yup.number()
        .min(10000),
    
    entranceDate: Yup.date()
        .required('Listing must include an entrance date'),

    immediateEntrance: Yup.boolean(),

    flexibleEntrance: Yup.boolean(),

    contactName: Yup.string()
        .required(),
    
    contactPhone: Yup.string()
        .required(),
    
    contanctName2: Yup.string(),
    
    contanctPhone2: Yup.string(),
    
    virtualPhone: Yup.boolean(),

    availableOnSaturday: Yup.boolean(),

    isVillage: Yup.boolean(),

    hasSafeRoom: Yup.boolean(),

    hasAirCondition: Yup.boolean(),

    hasStorage: Yup.boolean(),

    refurbished: Yup.boolean(),

    isAccessible: Yup.boolean(),

    barsOnWindows: Yup.boolean(),

    furnished: Yup.boolean(),

});

export const validateSellListing = async (req, res, next)=>{
    try{
        const validtaion = await sellListingSchema.validate(req.body);

        next();
    }
    catch(e){
        // remove the files (video and photos)
        await fs.promises.rm('tempUploads', { recursive: true});
        badRequest(res, 'User data validation failed before controller:\n'+e);
    }
}
