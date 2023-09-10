import React from "react";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";


type FormInputProps = {
  name: string;
  type: string;
  label: string;
  register: UseFormRegister<FieldValues>;
};

const FormInput = ({ name, type, label, register }: FormInputProps) => {
// const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm()

  return (
    <>
      <label
        htmlFor={name}
        className="block font-normal text-sm mt-2 text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        // {...register(name)}
        className="focus:ring-1 focus:ring-green-700 focus:border-teal-500 outline-none shadow-sm py-2 px-4 w-full rounded"
        autoComplete="off"
      />
      {/* {errors.otherName && (
        <span className="text-red-500 mb-2">{`${errors.otherName.message}`}</span>
      )} */}
    </>
  );
};

export default FormInput;
