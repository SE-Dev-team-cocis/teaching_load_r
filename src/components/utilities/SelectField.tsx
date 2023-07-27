import { Field } from "formik";
type SelectFieldProps = {
  name: string;
  label: string;
  options: string[];
};

const SelectField = ({ name, label, options }: SelectFieldProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-normal text-sm mt-2 text-gray-700"
      >
        {label}
      </label>
      <Field
        as="select"
        name={name}
        className=" block focus:outline-none focus:ring-1 focus:ring-green-700 shadow-sm py-2 px-2 bg-white border border-gray focus:border-teal-500 w-full rounded"
      >
        {options.map((option) => (
          <option key={name} value={option}>
            {option}
          </option>
        ))}
      </Field>
    </div>
  );
};

export default SelectField;
