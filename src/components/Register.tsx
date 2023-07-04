import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/react.svg";
import TextField from "./TextField";
import SelectField from "./SelectField";

const Register = () => {
  const navigate = useNavigate();
  const customId: string = "Register";

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

  const departmentOptions: string[] = [
    "Networks",
    "Information Systems",
    "Computer Science",
  ];
  const roleOptions: string[] = ["Head of department", "Lecturer", "Dean"];

  return (
    <>
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

              //Submit Register details data into the database
              const url = " http://localhost:4000/student/Register";

              try {
                const response = await axios.post(url, student, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                if (response.data.Register === false) {
                  // initialValues = {}
                  // errorNotification(response.data.message)
                  errorNotification("Invalid Register credentials");
                  return;
                }
                if (response.data.Register === true) {
                  //   setComplaints(response.data.complaints);
                  //   setUser(response.data.user);
                  //   setRegister(true);
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
                    Create an account
                  </h4>

                  <div className="flex justify-between gap-1">
                    <TextField
                      name="firstName"
                      label="First name"
                      type="text"
                    />
                    <TextField name="lastName" label="Last name" type="text" />
                  </div>
                  <TextField
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="eg. example@gmail.com"
                  />
                  <div className="flex justify-between gap-1">
                    <div className="w-1/2">
                      <SelectField
                        name="Department"
                        label="Department"
                        options={departmentOptions}
                      />
                    </div>
                    <div className="w-1/2">
                      <SelectField
                        name="Role"
                        label="Role"
                        options={roleOptions}
                      />
                    </div>
                  </div>
                  <TextField type="password" name="password" label="Password" />
                  <TextField
                    type="password"
                    name="confirm_password"
                    label="Confirm password"
                    placeholder="Please confirm your password..."
                  />

                  <div className="flex justify-center items-center w-full">
                    {isSubmitting ? (
                      <button
                        className="w-full text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95"
                        type="submit"
                        disabled
                      >
                        Registering your account...
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
                </Form>
                <p className="mt-3 text-dark">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="text-green-700">Login</span>
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

export default Register;
