import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup
        .string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is Required"),
    email: yup
        .string()
        .email("Email must be valid")
        .required("Email is required"),
    password: yup    
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is Required"),
    terms: yup
        .boolean()
        .oneOf([true])
        .required("Terms of Service must be checked")
})

export default formSchema