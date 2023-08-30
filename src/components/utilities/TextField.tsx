import { FormikErrors, FormikTouched } from "formik";

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
        </>
      )}
      <span className="block text-red-500">
        {errors[`${name}`] && touched[`${name}`] && <>{errors[`${name}`]}</>}
      </span>
    </div>
  );
};

export default TextField;
