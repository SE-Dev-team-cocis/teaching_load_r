import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import MukLogo from "../assets/images/muk_logo.png";
import TextField from "./utilities/TextField";

import { RegisterationSchema } from "./YupSchemas/schema";
import useUserstore from "../zustand/userStore";
import {
  successNotification,
  errorNotification,
} from "./utilities/toastify/Toastify";
import { useMemo, useState } from "react";

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
  const [departments, setDepartments] = useState<any>([]);

  async function fetchDepts() {
    try {
      const url = "https://teaching-load-api.onrender.com/api/department";
      const response = await axios.get(url);
      console.log(response.data?.departments);
      // setDepartments(response.data?.departments);
      const depts = response.data?.departments.map((dep: any) => {
        return {
          name: dep.department,
          id: dep.id,
          slug: dep.department_code,
          collegeId: dep.college_id,
        };
      });
      setDepartments(depts);
    } catch (error) {
      console.error(error);
    }
  }

  useMemo(() => {
    fetchDepts();
  }, []);

  
  // console.log("Departments: ", departments)

  const departmentOptions: string[] = [
    "Networks",
    "Information Systems",
    "Computer Science",
  ];
  const roleOptions: string[] = ["Head of department", "Lecturer", "Dean"];
  const initialValues: InitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
    department: "",
  };

  const setUser = useUserstore((state) => state.setUser);

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        const url = "https://teaching-load-api.onrender.com/api/register";
        try {
          const response = await axios.post(url, values, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.data.register === true) {
            localStorage.clear();

            localStorage.setItem(
              "token",
              JSON.stringify(response.data.access_token)
            );
            successNotification("You have registered successfully");
            setUser(response.data.user);
            navigate("/teaching-load");
          }
          if (response.data.register !== true) {
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
              Create an account
            </h4>
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
                  // options={departmentOptions}
                  options={departments.map((dept: any) => dept.name)}
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
