import * as Yup from 'yup';
import YupPassword from 'yup-password'
import { badRequest } from '../responses/responses.js';
YupPassword(Yup) // extend yup

const userSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required'),
  lastName: Yup.string()
    .required('Last name is required'),
  phone: Yup.string()
    .required('Phone number is required'),
  email: Yup.string()
    .email('Email is not valid')
    .required('Email is required'),
  password: Yup.string()
    .password('Password should be stronger')
    .required('Password is required'),
  dob: Yup.date(),
  city: Yup.string(),
  street: Yup.string(),
  houseNumber: Yup.string()
});

export const validateUser = async (req, res, next)=>{
    try{
        const validtaion = await userSchema.validate(req.body);
        next();
    } 
    catch(e){
        badRequest(res, 'User data validation failed before controller'+e);
    }
}
