import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const RegisterationSchema = yup.object().shape({
  firstName: yup.string().required().label("First name"),
  lastName: yup.string().required().label("Last name"),
  role: yup.string().required().label("Role"),
  department: yup.string().required().label("Department"),
  email: yup.string().email().required().label("Email"),
  password: yup.string().min(8).required().label("Password"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
