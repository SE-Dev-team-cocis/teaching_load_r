import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import MukLogo from "../assets/images/muk_logo.png";

import LoginInput from "./utilities/form/LoginInput";
import { useState } from "react";
import useUserstore from "../zustand/userStore";

type InitialValues = {
  username: string;
  password: string;
};
const initialLoginValues: InitialValues = {
  username: "",
  password: "",
};

// type LoginDetails = {
//   email: string;
//   password: string;
// };

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

const errorNotification = async (message: string) => {
  await toast.error(message, {
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

const Login = () => {
  const navigate = useNavigate();

  const user = useUserstore((state) => state.user);
  const setUser = useUserstore((state) => state.setUser);

  const LoginSchema = yup.object().shape({
    username: yup.string().required().label("Username"),
    password: yup.string().required().label("Password"),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState(false);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: initialLoginValues,
    onSubmit: async (values) => {
      const url = "http://127.0.0.1:8000/api/login";

      try {
        const response = await axios.post(
          url,
          { email: values.username, password: values.password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.login === false) {
          // console.log(response.data);
          setLogin(false);
          setErrorMessage(response.data.message);
          await errorNotification(response.data.message);
          return;
        }
        if (response.data.login === true) {
          setUser(response.data.user); // setting the user using zustand
          localStorage.setItem(
            "access_token",
            JSON.stringify(response.data.access_token)
          );
          setLogin(true);
          navigate("/teaching-load");
        }
      } catch (err) {
        errorNotification("503 | Bad Gateway");
      }
    },
    validationSchema: LoginSchema,
  });

  return (
    <>
      <div className="login_form border-2 border-green-700 bg-white rounded-lg p-5 mx-auto">
        <header className="flex justify-center items-center flex-col">
          <img
            src={MukLogo}
            alt="logo"
            style={{ width: "200px", height: "200px" }}
            className="me-5 muk_logo"
            loading="lazy"
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
              <div>
                <LoginInput
                  label="Email"
                  name="username"
                  type="text"
                  touched={touched}
                  errors={errors}
                  placeholder="Please enter your username here..."
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </div>
              <div>
                <LoginInput
                  label="Password"
                  name="password"
                  type="password"
                  touched={touched}
                  errors={errors}
                  placeholder="Please enter your password name.."
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </div>

              <div className="flex justify-center items-center w-full">
                {isSubmitting ? (
                  <button
                    className="w-full text-white px-4 rounded py-2 bg-green-400 mt-2 "
                    type="submit"
                    disabled
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="w-full text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95"
                    type="submit"
                  >
                    Login
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

export default Login;
