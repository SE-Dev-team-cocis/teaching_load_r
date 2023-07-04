type TextFieldPops = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  handleChange?: (e: React.ChangeEvent<any>) => void;
};

const TextField = ({
  label,
  name,
  type,
  placeholder,
  handleChange,
}: TextFieldPops) => {
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
      />
    </div>
  );
};

export default TextField;
