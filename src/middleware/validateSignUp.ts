// validation.ts
import * as yup from 'yup';

// Validation schema for sign-up form
export const signUpSchema = yup.object({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long'),
  phoneNumber: yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(10, 'Phone number must be at least 10 digits long'),
  email: yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
  // Add additional fields and validation rules as needed
}).required();
