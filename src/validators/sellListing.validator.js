import * as Yup from 'yup';
import { badRequest } from '../responses/responses.js';
import { propertyTypes, propertyConditions, openViews, roomsCount, propertyCharacteristics, showersCount, parkingSpotsCount, balconiesCount } from "../constants/enums.js";

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
    
    propertyCharacteristics: Yup.array()
        .of(Yup.string().oneOf(propertyCharacteristics)),

    propertyDescription: Yup.string(),

    sqaureMetersBuilt: Yup.number()
        .min(1),

    sqaureMetersGarden: Yup.number()
    .min(1),

    sqaureMetersTotal: Yup.number()
        .min(1),
    
    price: Yup.number()
        .min(10000),
    
    entranceDate: Yup.date(),

    immediateEntrance: Yup.boolean(),

    flexibleEntrance: Yup.boolean(),

    contactName: Yup.string()
        .required(),
    
    contactPhone: Yup.string()
        .required(),
    
    contanctName2: Yup.string(),
    
    contanctPhone2: Yup.string(),
    
    virtualPhone: Yup.boolean(),

    availableOnSaturday: Yup.boolean()
});

export const validateSellListing = async (req, res, next)=>{
    try{
        const validtaion = await sellListingSchema.validate(req.body);
        next();
    }
    catch(e){
        badRequest(res, 'User data validation failed before controller'+e);
    }
}
