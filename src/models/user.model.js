import mongoose from 'mongoose';
import validator from 'validator';

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
    }
})

export const User = mongoose.model('USER', userSchema);