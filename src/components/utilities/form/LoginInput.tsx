import { FormikTouched, FormikErrors } from "formik";

type initialValues = {
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
  // const myname = name;
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-normal text-sm mt-2 text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="focus:outline-none focus:ring-1 focus:ring-green-700 shadow-sm py-2 px-4 bg-white border border-gray focus:border-teal-500 w-full rounded"
        // focus:ring-red-600 border-red-600"
        autoComplete="off"
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default LoginInput;
