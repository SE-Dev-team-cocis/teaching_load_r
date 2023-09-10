import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { errorNotification, successNotification } from "../../utils/Toastify";
import useUserstore from "../../zustand/userStore";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser } from "../user/userSlice";
import { LoginSchema, LoginSchemaType } from "../zod/schemas/Schemas";

const Form = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(true);
  const [inputType, setInputType] = useState<string>("password");
  const setUser1 = useUserstore((state) => state.setUser);

  const dispatch = useAppDispatch(); // for redux toolkit

  const loggedOut = localStorage.getItem("logged_out");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data: LoginSchemaType) => {
    // console.log("Data: ", data);

    const url = "https://teaching-load-api.onrender.com/api/login";

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.login === false) {
        errorNotification(response.data.message);
        return;
      }
      if (response.data.login === true) {
        successNotification("You have logged in successfully");
        setUser1(response.data.user); // setting the user using zustand
        dispatch(setUser(response.data.user));

        //  console.log("Login response: ", response.data.user)
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.access_token)
        );
        localStorage.setItem(
          "loggedd_in", // setting the logged_in using zustand
          JSON.stringify(response.data.login)
        );
        navigate("/teaching-load");
      }
    } catch (error: any) {
      errorNotification(error.response);
    }
  };

  function handleToggle() {
    setVisible((prev) => !prev);
    if (visible) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }

  // console.log("Errors: ", errors);

  return (
    <form className="" onSubmit={handleSubmit(handleLogin)}>
      {/* <div className="grid grid-cols-12 gap-2"> */}
      <div className="">
        <label htmlFor="" className="block text-gray-500 text-sm">
          Email
        </label>
        <input
          type="text"
          {...register("email")}
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
      <div className="mt-2 relative">
        <label htmlFor="" className="block text-gray-500 text-sm">
          Password
        </label>
        <input
          type={inputType}
          {...register("password")}
          className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
            errors.password?.message
              ? "border-red-500 focus:ring-red-700"
              : " focus:ring-blue-700 "
          } `}
        />
        {errors.password && (
          <span className="text-red-500 mb-2">{`${errors.password.message}`}</span>
        )}
        <span
          className="absolute right-2 top-8 cursor-pointer text-green-700"
          onClick={handleToggle}
        >
          {visible ? (
            <BsEye style={{ width: 20, height: 20 }} />
          ) : (
            <BsEyeSlash style={{ width: 20, height: 20 }} />
          )}
        </span>
      </div>
      {/* </div> */}
      <div className="flex justify-center items-center w-full">
        <button
          className="w-full text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95 disabled:bg-opacity-70"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default Form;
