import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  RegistrationSchema,
  RegistrationSchemaType,
} from "../../components/zod/schemas/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../store/hooks";
import { errorNotification, successNotification } from "../../utils/Toastify";
import { setUser } from "../user/userSlice";
import { useState } from "react";

const Form = () => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationSchemaType>({
    resolver: zodResolver(RegistrationSchema),
  });

  const [message, setMessage] = useState<string>("")
  const navigate = useNavigate();

  const departmentOptions: string[] = [
    "Networks",
    "Information Systems",
    "Computer Science",
  ];

  const handleRegistration =  async (data: RegistrationSchemaType) => {
    console.log("Data: ", data);
      const url = "https://teaching-load-api.onrender.com/api/register";
      try {
        // setRegistering(true);
        const response = await axios.post(
          url,
          { password_confirmation : data.confirmPassword, ...data},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      // console.log("Response: ", response.data)
      // setMessage(response.data?.message)

        if (response.data.register === true) {
          localStorage.clear();

          localStorage.setItem(
            "token",
            JSON.stringify(response.data.access_token)
          );
          successNotification("You have registered successfully");
          dispatch(setUser(response.data?.user));
          navigate("/teaching-load");
          // setRegistering(false);
        }
        if (response.data.register !== true) {
          setMessage(response.data.message)
          errorNotification(
            response.data.message + ". If you are this user, Login instead"
          );
          return;
        }
      } catch (err) {
        
        errorNotification(message);
        // console.error(err)
      }
 
 
  };

//   console.log("Errors: ", errors);

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

            <div className="col-span-6">
              <label htmlFor="" className="block text-gray-500 text-sm">
                Password
              </label>
              <input
                type="password"
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
            </div>

            <div className="col-span-6">
              <label htmlFor="" className="block text-gray-500 text-sm">
                Confirm password
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
                  errors.confirmPassword?.message
                    ? "border-red-500 focus:ring-red-700"
                    : " focus:ring-blue-700 "
                } `}
              />
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
