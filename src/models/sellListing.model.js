import mongoose from "mongoose";
import { propertyTypes, propertyConditions, openViews, roomsCount, propertyCharacteristics, showersCount, parkingSpotsCount, balconiesCount } from "../constants/enums.js";

const sellListingSchema = mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    houseNumber: {
        type: Number,
        required: true,
        min: [1, 'House number must be greater than or equal to 1']
    },
    floor: {
        type: Number,
        required: true,
        min: [0, 'Floor must be greater than or equal to 0'],
    },
    totalFloors: {
        type: Number,
        required: true,
        min: [0, 'Number of total floors must be greater than or equal to 0'],
    },
    elevated: {
        type: Boolean,
    },
    neighbourhood: {
        type: String,
        required: true,
    },
    countryArea: {
        type: String,
        required: true,
    },
    propertyType: {
        type: String,
        required: true,
        enum: propertyTypes,
        message: '{VALUE} is not a valid property type',
    },
    propertyCondition: {
        type: String, 
        required: true,
        enum: propertyConditions,
        message: '{VALUE} is not a valid property condition',
    },
    airDirections: {
        type: Number,
        min: [1, 'Air directions should be at least 1'],
        max: [4, 'Air directions should be at most 4'],
    },
    openView: {
        type: String,
        enum: openViews,
        message: '{VALUE} is not a valid open view',
    },
    backfacing: {
        type: Boolean,
    },
    subscribeToEmailUpdates: {
        type: Boolean,
    },
    rooms: {
        type: Number,
        required: true,
        enum: roomsCount
    }, 
    showers: {
        type: Number, 
        enum: showersCount
    },
    parkingSpots: {
        type: Number, 
        enum: parkingSpotsCount
    }, 
    balconies: {
        type: Number,
        enum: balconiesCount
    },
    propertyCharacteristics: {
        type: [String],
        enum: propertyCharacteristics,
    },
    propertyDescription: {
        type: String
    },
    sqaureMetersBuilt: {
        type: Number
    },
    sqaureMetersGarden: {
        type: Number
    },
    sqaureMetersTotal: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        min: [10000, 'Cost must be at least 10000']
    },
    entranceDate: {
        type: Date, 
    },
    immediateEntrance: {
        type: Boolean,
    },
    flexibleEntrance: {
        type: Boolean,
    },
    contactName: {
        type: String,
        required: true,
    },
    contactPhone: {
        type: String,
        required: true,
    },
    contactName2: {
        type: String,
    },
    contactPhone2: {
        type: String,
    },
    virtualPhone: {
        type: Boolean,
    },
    availableOnSaturday: {
        type: Boolean,
    }
});

export const SellListing = mongoose.model('SellListing', sellListingSchema);