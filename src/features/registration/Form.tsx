import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../store/hooks";
import { errorNotification, successNotification } from "../../utils/Toastify";
import { setUser } from "../user/userSlice";
import { useState } from "react";
import {
  RegistrationSchema,
  RegistrationSchemaType,
} from "../zod/schemas/Schemas";

const Form = () => {
  const navigate = useNavigate();
  //RTK
  const dispatch = useAppDispatch();

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationSchemaType>({
    resolver: zodResolver(RegistrationSchema),
  });

  // showing password
  const [visible, setVisible] = useState<boolean>(true);
  const [inputType, setInputType] = useState<string>("password");
  const [visible1, setVisible1] = useState<boolean>(true);
  const [inputType1, setInputType1] = useState<string>("password");

  function handleToggle() {
    setVisible((prev) => !prev);
    if (visible && inputType === "password") {
      setInputType("text");
    } else {
      // setVisible((prev) => !prev);
      setInputType("password");
    }
  }

  function handleToggle1() {
    setVisible1((prev) => !prev);
    if (visible1 && inputType1 === "password") {
      setInputType1("text");
    } else {
      // setVisible((prev) => !prev);
      setInputType1("password");
    }
  }

  const departmentOptions: string[] = [
    "Networks",
    "Information Systems",
    "Computer Science",
  ];

  const handleRegistration = async (data: RegistrationSchemaType) => {
    console.log("Data: ", data);
    // const url = "https://teaching-load-api.onrender.com/api/register";

      const url =
        "https://teachingloadfive-82f4e24a-6a04-4f8b-8cae.cranecloud.io/api/register";

    try {
      const response = await axios.post(
        url,
        { password_confirmation: data.confirmPassword, ...data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response: ", response)

      if (response.data.register !== true) {
        // setMessage(response.data.message);
        errorNotification(
          response.data.message + ". If you are this user, Login instead"
        );
        return;
      }
      // if (response.data.register === true) {
      localStorage.clear();

      localStorage.setItem("token", JSON.stringify(response.data.access_token));
      successNotification("You have registered successfully");
      dispatch(setUser(response.data?.user));
      // navigate("/teaching-load");
      // setRegistering(false);
      // }
    } catch (err) {
      errorNotification("Cannot connect to the server. Try again later!");

      // console.error(err)
    }
  };

  return (
    <form className="" onSubmit={handleSubmit(handleRegistration)}>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-6">
          <label htmlFor="" className="block text-gray-500 text-sm">
            First Name
          </label>
          <input
            type="text"
            {...register("firstName")}
            placeholder="Enter your first name"
            className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
              errors.firstName?.message
                ? "border-red-500 focus:ring-red-700"
                : " focus:ring-blue-700 "
            } `}
          />
          {errors.firstName && (
            <span className="text-red-500 mb-2">{`${errors.firstName.message}`}</span>
          )}
        </div>
        <div className="col-span-6">
          <label htmlFor="" className="block text-gray-500 text-sm">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName")}
            placeholder="Enter your last name"
            className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
              errors.lastName?.message
                ? "border-red-500 focus:ring-red-700"
                : " focus:ring-blue-700 "
            } `}
          />
          {errors.lastName && (
            <span className="text-red-500 mb-2">{`${errors.lastName.message}`}</span>
          )}
        </div>
      </div>

      <div className="col-span-6">
        <label htmlFor="" className="block text-gray-500 text-sm">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          placeholder="Enter your university email address"
          className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
            errors.email?.message
              ? "border-red-500 focus:ring-red-700"
              : " focus:ring-blue-700 "
          } `}
        />
        {errors.email && (
          <span className="text-red-500 mb-2">{`${errors.email.message}`}</span>
        )}
      </div>

      <div className="">
        <label htmlFor="" className="block text-gray-500 text-sm">
          Department
        </label>
        <select
          {...register("department")}
          className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
            errors.department?.message
              ? "border-red-500 focus:ring-red-700"
              : " focus:ring-blue-700 "
          } `}
        >
          {departmentOptions.map((dept: string, index) => (
            <option value={dept} key={index}>
              {dept}
            </option>
          ))}
        </select>

        {errors.department && (
          <span className="text-red-500 mb-2">{`${errors.department.message}`}</span>
        )}
      </div>

      <div className="col-span-6 relative">
        <label htmlFor="" className="block text-gray-500 text-sm">
          Password
        </label>
        <input
          type={inputType}
          // type="password"
          {...register("password")}
          placeholder="Enter your password"
          className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
            errors.password?.message
              ? "border-red-500 focus:ring-red-700"
              : " focus:ring-blue-700 "
          } `}
        />
        <span
          className="absolute right-2 top-8 cursor-pointer text-green-700"
          onClick={handleToggle}
          // onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? (
            <BsEye style={{ width: 20, height: 20 }} />
          ) : (
            <BsEyeSlash style={{ width: 20, height: 20 }} />
          )}
        </span>
        {errors.password && (
          <span className="text-red-500 mb-2">{`${errors.password.message}`}</span>
        )}
      </div>

      <div className="col-span-6 relative">
        <label htmlFor="" className="block text-gray-500 text-sm">
          Confirm password
        </label>
        <input
          // type="password"
          type={inputType1}
          {...register("confirmPassword")}
          placeholder="Confirm your password"
          className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
            errors.confirmPassword?.message
              ? "border-red-500 focus:ring-red-700"
              : " focus:ring-blue-700 "
          } `}
        />
        <span
          className="absolute right-2 top-8 cursor-pointer text-green-700"
          onClick={handleToggle1}
          // onClick={() => setVisible1((prev) => !prev)}
        >
          {visible1 ? (
            <BsEye style={{ width: 20, height: 20 }} />
          ) : (
            <BsEyeSlash style={{ width: 20, height: 20 }} />
          )}
        </span>
        {errors.confirmPassword && (
          <span className="text-red-500 mb-2">{`${errors.confirmPassword.message}`}</span>
        )}
      </div>

      <div className="flex justify-center items-center w-full">
        <button
          className="w-full text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95 disabled:bg-opacity-70"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering account..." : "Register"}
        </button>
      </div>
    </form>
  );
};

export default Form;
