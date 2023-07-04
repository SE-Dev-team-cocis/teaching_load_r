import { Form, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/react.svg";

const Login = () => {
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

  let initialValues = {
    username: "",
    password: "",
  };

  const validate = yup.object({
    username: yup.number().required("Username is required"),
    password: yup.string().required("Password is required"),
  });
  return (
    <>
      <div className="login_form border-2 border-green-700 rounded-lg p-5">
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

        {/* <div className="flex justify-center items-center flex-col"> */}
        <div className="">
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              const username = values.username;
              const password = values.password;

              const student = {
                studentNo: username,
                password: password,
              };

              //Submit login details data into the database
              const url = " http://localhost:4000/student/login";

              try {
                const response = await axios.post(url, student, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                if (response.data.login === false) {
                  // initialValues = {}
                  // errorNotification(response.data.message)
                  errorNotification("Invalid login credentials");
                  return;
                }
                if (response.data.login === true) {
                  //   setComplaints(response.data.complaints);
                  //   setUser(response.data.user);
                  //   setLogin(true);
                  //   setLoggedIn(true);

                  localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.token)
                  );
                  navigate("/student");
                }
              } catch (err) {
                // errorNotification(err.toString())
                errorNotification("503 | Bad Gateway");
              }
            }}
            validationSchema={validate}
          >
            {({ isSubmitting }) => (
              <div className=" bg-white mt-2 rounded-md mb-5">
                <Form className="">
                  <h4 className="text-green-700 text-center text-xl font-semibold mb-5">
                    Login into your account
                  </h4>

                  <div>
                    {/* <input
                      className={`focus:outline-none focus:ring-1 focus:ring-green-700 shadow-sm py-2 px-4 bg-white border border-gray focus:border-teal-500 w-full rounded ${
                        meta.touched && meta.error && "border-red-600 "
                      }`}
                      {...field}
                      {...props}
                      autoComplete="off"
                    /> */}
                    <label
                      htmlFor="username"
                      className="block font-normal text-sm mt-2 text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      className={`focus:outline-none focus:ring-1 focus:ring-green-700 shadow-sm py-2 px-4 bg-white border border-gray focus:border-teal-500 w-full rounded`}
                      autoComplete="off"
                    />

                    <label
                      htmlFor="password"
                      className="block font-normal text-sm mt-2 text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className={`focus:outline-none focus:ring-1 focus:ring-green-700 shadow-sm py-2 px-4 bg-white border border-gray focus:border-teal-500 w-full rounded`}
                      autoComplete="off"
                    />
                    {/* <ErrorMessage
                      component="span"
                      name={field.name}
                      className="error text-sm"
                    /> */}
                  </div>
                  {/* <TextField
                    label="Username"
                    name="username"
                    type="number"
                    placeholder="Enter your username"
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                  /> */}

                  <div className="flex justify-center items-center w-full">
                    {isSubmitting ? (
                      <button
                        className="w-full text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95"
                        type="submit"
                        disabled
                      >
                        Logging you in...
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
                </Form>
                <p className="mt-3 text-dark">
                  Don't have an account?{" "}
                  <Link to="/register">
                    <span className="text-green-700">Register</span>
                  </Link>{" "}
                  here
                </p>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
