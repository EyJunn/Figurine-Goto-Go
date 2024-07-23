import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";



export const schema = yup.object({
    firstName: yup.string().required("Your firstname is required"),
    lastName: yup.string().required("Your lastname is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("le champs est obligatoire")
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
});