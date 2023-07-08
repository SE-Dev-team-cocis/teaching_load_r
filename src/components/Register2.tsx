import { Field, Form, Formik, useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/react.svg";
// import TextField from "./utilities/TextField";
import TextField from "./utilities/form/TextField";
import LoginInput from "./utilities/form/LoginInput";
import GenericTextField from "./utilities/form/GenericTextField";

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

const Register2 = () => {
  const navigate = useNavigate();
  const customId: string = "login";

  //For the toast notification
  const notify = (message: string) => {
    toast.success(message, {
      toastId: customId,
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };
  const errorNotification = (message: string) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  // let initialValues = {
  //   username: "",
  //   password: "",
  // };

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

      //   //Submit login details data into the database
      //   const url = " http://localhost:4000/student/login";

      //   try {
      //     const response = await axios.post(url, student, {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     });
      //     if (response.data.login === false) {
      //       // initialValues = {}
      //       // errorNotification(response.data.message)
      //       errorNotification("Invalid login credentials");
      //       return;
      //     }
      //     if (response.data.login === true) {
      //       //   setComplaints(response.data.complaints);
      //       //   setUser(response.data.user);
      //       //   setLogin(true);
      //       //   setLoggedIn(true);

      //       localStorage.setItem(
      //         "token",
      //         JSON.stringify(response.data.token)
      //       );
      //       navigate("/student");
      //     }
      //   } catch (err) {
      //     // errorNotification(err.toString())
      //     errorNotification("503 | Bad Gateway");
      //   }
    },
    validationSchema: RegisterSchema,
  });

  // console.log("Errors: ", errors);
  return (
    <>
      <div className="login_form border-2 border-green-700 bg-white rounded-lg p-5">
        <header className="flex justify-center items-center flex-col">
          <img
            src={Logo}
            alt="logo"
            style={{ width: "200px", height: "200px" }}
            className="me-5 muk_logo"
          />
          <p className="text-green-700 font-semibold text-xl">
            MAKERERE UNIVERSITY
          </p>
          <p className="text-green-700 font-semibold">Teaching Load</p>
        </header>
        <div className="">
          <div className=" bg-white mt-2 rounded-md mb-5">
            <form className="" onSubmit={handleSubmit}>
              <h4 className="text-green-700 text-center text-xl font-semibold mb-5">
                Login into your account
              </h4>

              <div className="flex justify-between gap-2">
                <label htmlFor="" className="block">
                  First name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                />
              </div>
              <div>
                {/* <LoginInput
                  label="Password"
                  name="password"
                  type="password"
                  touched={touched}
                  errors={errors}
                  placeholder="Please enter your password name.."
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                {touched.password && errors.password ? (
                  <span className="text-red-500 block">{errors.password}</span>
                ) : (
                  ""
                )} */}
              </div>

              <div className="flex justify-center items-center w-full">
                {isSubmitting ? (
                  <button
                    className="w-full text-white px-4 rounded py-2 bg-green-400 mt-2 "
                    type="submit"
                    disabled
                  >
                    Registering...
                  </button>
                ) : (
                  <button
                    className="w-full text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95"
                    type="submit"
                  >
                    Register
                  </button>
                )}
              </div>
            </form>
            <p className="mt-3 text-dark">
              Don't have an account?{" "}
              <Link to="/register">
                <span className="text-green-700">Register</span>
              </Link>{" "}
              here
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register2;
