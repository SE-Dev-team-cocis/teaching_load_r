import * as yup from "yup";
import TextField from "./TextField";
import { useFormik } from "formik";

const NewInput = () => {
  const LoginSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    // lastName: yup.string().required("Password is required"),
  });
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    // values,
    errors,
    touched,
    getFieldProps,
    isSubmitting,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: LoginSchema,
  });

  console.log("errors: ", errors);

  return (
    <form action="" onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        name="firstName"
        type="text"
        touched={touched}
        errors={errors}
        placeholder="Please enter your first name.."
        handleChange={handleChange}
        handleBlur={handleBlur}
      />

      {isSubmitting ? (
        <>
          <button
            type="submit"
            className="mt-4 bg-blue-200 px-4 py-2 text-white font-semibold rounded disabled"
            disabled
          >
            Logging you in...
          </button>
        </>
      ) : (
        <button
          type="submit"
          className="mt-4 bg-blue-600 px-4 py-2 text-white font-semibold rounded"
        >
          Login
        </button>
      )}
    </form>
  );
};

export default NewInput;
