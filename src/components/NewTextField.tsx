import { ErrorMessage, useField } from "formik";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={field.name} className="block font-semibold text-lg mt-2">
        {label}
      </label>
      <input
        className={`focus:outline-none focus:ring-1 focus:ring-green-700 shadow-sm py-2 px-4 bg-white border border-gray focus:border-teal-500 w-full rounded ${
          meta.touched && meta.error && "border-red-600 "
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="span"
        name={field.name}
        className="error text-sm"
      />
    </div>
  );
};
