import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
    },
    hash: {
        type: String,
        required: [true, 'Hashed password is required'],
    },
    dob: {
        type: Date,
    },
    city: {
        type: String,
    },
    street: {
        type: String,
    },
    houseNumber: {
        type: String
    },
    SellListings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SellListing', // This is the name of the other collection (Listing)
    }],
    RentListings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RentListing', // This is the name of the other collection (Listing)
    }]
})

export const User = mongoose.model('User', userSchema);