import {
  FormikErrors,
  FieldConfig,
  FieldInputProps,
  FormikTouched,
} from "formik";

type InitialValues = {
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
  placeholder?: string;
  // getFieldProps: (
  //   nameOrOptions: string | FieldConfig<any>
  // ) => FieldInputProps<any>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  errors: FormikErrors<InitialValues>;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  touched: FormikTouched<InitialValues>;
};

const TextField = ({
  label,
  name,
  type,
  placeholder,
  handleChange,
  handleBlur,
  errors,
  touched,
}: // handleChange,
TextFieldPops) => {
  // const {handleChange} = getFieldProps
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
        className={`focus:outline-none focus:ring-1 focus:ring-green-700 shadow-sm py-2 px-4 bg-white border border-gray focus:border-teal-500 w-full rounded`}
        autoComplete="off"
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        // {...getFieldProps(name)}
      />
    </div>
  );
};

export default TextField;
