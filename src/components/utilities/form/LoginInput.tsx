import { FormikTouched, FormikErrors } from "formik";
import usePasswordToggle from "../../../hooks/usePasswordToggle";
import { BsEye, BsEyeSlash, BsSlash } from "react-icons/bs";
import { useState } from "react";


type initialValues = {
  [key: string]: any;
  username: string;
  password: string;
};
type LoginInputPops = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  errors: FormikErrors<initialValues>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  touched: FormikTouched<initialValues>;
};

const LoginInput = ({
  label,
  name,
  type,
  placeholder,
  handleChange,
  handleBlur,
  touched,
  errors,
}: LoginInputPops) => {
  // const [inputType, Icon] = usePasswordToggle();
  const [visible, setVisible] = useState<boolean>(true)
  const [inputType, setInputType] = useState<string>("password")
  // let inputType;

  // visible ? inputType === "text" : inputType === "password"

  function handleToggle(){
    setVisible(prev => !prev)
    if(visible){
      // setVisible(true)
      setInputType("text")
    }else{
      // setVisible(false)
      setInputType("password")
    }

    // console.log("Visible: ", visible)
    // console.log("Input type: ", inputType)
  }

  // function togglePassword() {}

  return (
    <div>
      <label
        htmlFor={name}
        className="block font-normal text-sm mt-2 text-gray-700"
      >
        {label}
      </label>
      {type === "password" ? (
        <div className="relative">
          <input
            type={inputType}
            name={name}
            className={`${
              errors[`${name}`] && touched[`${name}`]
                ? "focus:ring-1 focus:ring-red-500 border-red-500 focus:border-red-500"
                : "focus:ring-1 focus:ring-green-700 focus:border-teal-500"
            } focus:outline-none shadow-sm py-2 px-4 w-full rounded`}
            autoComplete="off"
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span
            className="absolute right-2 top-2.5 cursor-pointer text-green-700"
            onClick={handleToggle}
          >
            {/* <Icon /> */}
            {visible ? (
              <BsEye style={{ width: 20, height: 20 }} />
            ) : (
              <BsEyeSlash style={{ width: 20, height: 20 }} />
            )}
          </span>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          className={`${
            errors[`${name}`] && touched[`${name}`]
              ? "focus:ring-1 focus:ring-red-500 border-red-500 focus:border-red-500"
              : "focus:ring-1 focus:ring-green-700 focus:border-teal-500"
          } focus:outline-none shadow-sm py-2 px-4 w-full rounded`}
          autoComplete="off"
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      )}

      <span className="block text-red-500">
        {errors[`${name}`] && touched[`${name}`] && <>{errors[`${name}`]}</>}
      </span>
    </div>
  );
};

export default LoginInput;
