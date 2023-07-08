import * as yup from "yup";
import { useFormik } from "formik";
import RegisterInput from "./RegisterInput";

type InitialValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  department: string;
};
const initialRegisterValues: InitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  department: "",
};

const Register = () => {
  const RegisterSchema = yup.object().shape({
    firstName: yup.string().required().label("First name"),
    lastName: yup.string().required().label("Last name"),
    role: yup.string().required().label("Role"),
    department: yup.string().required().label("First name"),

    // username: yup.string().required().label("Username"),
    password: yup.string().min(8).required().label("Password"),
    confirmPassword: yup.string().min(8).required().label("Password"),
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    setTouched,
    errors,
    touched,
    getFieldProps,
    setSubmitting,
    isSubmitting,
  } = useFormik({
    initialValues: initialRegisterValues,
    onSubmit: (values) => {
      setTimeout(() => {
        setSubmitting(false);
        console.log(values);
      }, 3000);
    },
    validationSchema: RegisterSchema,
  });

  return (
    <form onSubmit={handleSubmit}>
      <p>Register form</p>
      <RegisterInput
        handleBlur={handleBlur}
        handleChange={handleChange}
        errors={errors}
        touched={touched}
      />
    </form>
  );
};

export default Register;
