import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/react.svg";
import TextField from "./utilities/TextField";

import { useState } from "react";

import { RegisterationSchema } from "./YupSchemas/schema";

type InitialValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
  department: string;
};

const Register = () => {
  const navigate = useNavigate();
  const customId: string = "Register";

  const departmentOptions: string[] = [
    "Networks",
    "Information Systems",
    "Computer Science",
  ];
  const roleOptions: string[] = ["Head of department", "Lecturer", "Dean"];

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
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  const initialValues: InitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
    department: "",
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState(false);

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        //Submit login details data into the database
        const url = "http://127.0.0.1:8000/api/register";
        try {
          const response = await axios.post(url, values, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.data.register === true) {
            setLogin(true);
            localStorage.clear();

            localStorage.setItem(
              "token",
              JSON.stringify(response.data.access_token)
            );
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem(
              "user_id",
              JSON.stringify(response.data.user_id)
            );

            navigate("/teaching-load");
          }
          // console.log(response.data)
          if (response.data.register !== true) {
            setLogin(false);
            // setErrorMessage(response.data.message);
            errorNotification(
              response.data.message + ". If you are this user, Login instead"
            );
            return;
          }
        } catch (err) {
          errorNotification("503 | Bad Gateway");
        }
      },
      validationSchema: RegisterationSchema,
    });
  return (
    <div className="register_form border-2 border-green-700 rounded-lg p-5">
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
              Create an account
            </h4>

            {/* {login === false ? (
              <div className="text-center text-red-500 font-lg">
                {errorMessage}
                <Link to={"/login"} className="mr-2 underline">
                  Login, instead
                </Link>
              </div>
            ) : (
              ""
            )} */}

            <div className="flex justify-between gap-1">
              <TextField
                name="firstName"
                label="First name"
                type="text"
                handleBlur={handleBlur}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
              />
              <TextField
                name="lastName"
                label="Last name"
                type="text"
                handleBlur={handleBlur}
                handleChange={handleChange}
                errors={errors}
                touched={touched}
              />
            </div>
            <TextField
              name="email"
              label="Email"
              type="email"
              handleBlur={handleBlur}
              handleChange={handleChange}
              errors={errors}
              touched={touched}
            />
            <div className="flex justify-between gap-1">
              <div className="w-1/2">
                <TextField
                  type="select"
                  name="department"
                  label="Department"
                  options={departmentOptions}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className="w-1/2">
                <TextField
                  type="select"
                  name="role"
                  label="Role"
                  options={roleOptions}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
              </div>
            </div>
            <TextField
              type="password"
              name="password"
              label="Password"
              placeholder="Enter a strong password..."
              handleBlur={handleBlur}
              handleChange={handleChange}
              errors={errors}
              touched={touched}
            />
            <TextField
              type="password"
              name="password_confirmation"
              label="Confirm password"
              placeholder="Please confirm your password..."
              handleBlur={handleBlur}
              handleChange={handleChange}
              errors={errors}
              touched={touched}
            />

            <div className="flex justify-center items-center w-full">
              <button
                className="w-full text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-3 text-dark">
            Already have an account?
            <Link to="/">
              <span className="text-green-700 mx-2">Login</span>
            </Link>
            here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
