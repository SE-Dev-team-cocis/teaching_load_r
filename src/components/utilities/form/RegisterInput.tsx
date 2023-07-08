import { FormikErrors, FormikTouched } from "formik";

type initialValues = {
  firstName: string;
  lastName: string;
  // username: string;
  password: string;
};

type TextFieldPops = {
  [key: string]:
    | FormikTouched<initialValues>
    | FormikErrors<initialValues>
    | any;
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  errors: FormikErrors<initialValues>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  touched: FormikTouched<initialValues>;
};

const RegisterInput = (props: TextFieldPops) => {
  const {
    name,
    label,
    type,
    placeholder,
    errors,
    handleBlur,
    handleChange,
    touched,
  } = props;

  return (
    <div>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors[name] ? <span>{errors[name]}</span> : ""}
    </div>
  );
};

export default RegisterInput;
