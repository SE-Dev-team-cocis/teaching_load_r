import { useState } from "react";
import { FormikErrors, FormikTouched } from "formik";
import { BsEye, BsEyeSlash } from "react-icons/bs";

type InitialValues = {
  [key: string]: any;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  department: string;
};

type TextFieldPops = {
  label: string;
  name: string;
  type: string;
  options?: string[] | undefined;
  placeholder?: string;
  errors: FormikErrors<InitialValues>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  touched: FormikTouched<InitialValues>;
};

const TextField = ({
  label,
  name,
  type,
  options,
  placeholder,
  handleChange,
  handleBlur,
  touched,
  errors,
}: TextFieldPops) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [visible2, setVisible2] = useState<boolean>(true);

  const [inputType, setInputType] = useState<string>("password");
  const [inputType2, setInputType2] = useState<string>("password");

  const [inputName, setInputName] = useState(name);

  function handleToggle(_name: string) {
    if (name === "password") {
      setVisible((prev) => !prev);
      if (visible) {
        setInputType("text");
      } else {
        setInputType("password");
      }
    }
    if (name === "password_confirmation") {
      setVisible2((prev) => !prev);
      if (visible2) {
        setInputType2("text");
      } else {
        setInputType2("password");
      }
    }

    if (visible) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }

  return (
    <div>
      <label
        htmlFor={name}
        className="block font-normal text-sm mt-2 text-gray-700"
      >
        {label}
      </label>

      {options ? (
        <>
          <select
            name={name}
            className={`${
              errors[`${name}`] && touched[`${name}`]
                ? "focus:ring-1 focus:ring-red-500 border-red-500 focus:border-red-500"
                : "focus:ring-1 focus:ring-green-700 focus:border-teal-500"
            } focus:outline-none shadow-sm py-2 px-4 w-full rounded`}
            placeholder={placeholder}
            onChange={handleChange}
          >
            <option value="">Select a {name}</option>
            {options.map((option) => (
              <option key={option} value={option} onBlur={handleBlur}>
                {option}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          {name === "password" ? (
            <div className="relative">
              <input
                type={inputType}
                name={name}
                className={`${
                  errors[`${name}`] && touched[`${name}`]
                    ? "focus:ring-1 focus:ring-red-500 focus:border-red-500 border-red-500"
                    : "focus:ring-1 focus:ring-green-700 focus:border-teal-500"
                } outline-none shadow-sm py-2 px-4 w-full rounded`}
                autoComplete="off"
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span
                className="absolute right-2 top-3.5 text-green-700 w-5 h-5 cursor-pointer"
                onClick={() => handleToggle(inputName)}
              >
                {/* <Icon /> */}
                {visible ? (
                  <BsEye style={{ width: 20, height: 20 }} />
                ) : (
                  <BsEyeSlash style={{ width: 20, height: 20 }} />
                )}
              </span>
            </div>
          ) : name === "password_confirmation" ? (
            <div className="relative">
              <input
                type={inputType2}
                name={name}
                className={`${
                  errors[`${name}`] && touched[`${name}`]
                    ? "focus:ring-1 focus:ring-red-500 focus:border-red-500 border-red-500"
                    : "focus:ring-1 focus:ring-green-700 focus:border-teal-500"
                } outline-none shadow-sm py-2 px-4 w-full rounded`}
                autoComplete="off"
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span
                className="absolute right-2 top-3.5 text-green-700 w-5 h-5 cursor-pointer"
                onClick={() => handleToggle(inputName)}
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
                  ? "focus:ring-1 focus:ring-red-500 focus:border-red-500 border-red-500"
                  : "focus:ring-1 focus:ring-green-700 focus:border-teal-500"
              } outline-none shadow-sm py-2 px-4 w-full rounded`}
              autoComplete="off"
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
          {/* <BsEye /> */}
        </>
      )}
      <span className="block text-red-500">
        {errors[`${name}`] && touched[`${name}`] && <>{errors[`${name}`]}</>}
      </span>
    </div>
  );
};

export default TextField;
