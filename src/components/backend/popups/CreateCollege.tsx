import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CollegeSchema, CollegeType } from '../functions/BackendSchemas';
type CreateCollegeProps = {
    closeModal: () => void
}
const CreateCollege = ({ closeModal }: CreateCollegeProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CollegeType>({
    resolver: zodResolver(CollegeSchema),
  });


  const handleCollege = (data: CollegeType) => {
      console.log(data)
  }

  return (
    <section className="outline-none">
      <p onClick={closeModal} className="cursor-pointer">
        X
      </p>
      <p className='text-center text-lg font-semibold text-green-700'>Create college</p>

      <form className="" onSubmit={handleSubmit(handleCollege)}>
      <div className="mb-3 mt-2">
        <label htmlFor="" className="block text-gray-500 text-sm">
          College Name
        </label>
        <input
          type="text"
          {...register("collegeName")}
          placeholder="Enter full college name"
          className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
            errors.collegeName?.message
              ? "border-red-500 focus:ring-red-700"
              : " focus:ring-blue-700 "
          } `}
        />
        {errors.collegeName && (
          <span className="text-red-500 mb-2">{`${errors.collegeName.message}`}</span>
        )}
      </div>
      <div className="">
        <label htmlFor="" className="block text-gray-500 text-sm">
          College Code
        </label>
        <input
          type="text"
          {...register("collegeCode")}
          placeholder="Enter college code eg. COCIS"
          className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
            errors.collegeCode?.message
              ? "border-red-500 focus:ring-red-700"
              : " focus:ring-blue-700 "
          } `}
        />
        {errors.collegeCode && (
          <span className="text-red-500 mb-2">{`${errors.collegeCode.message}`}</span>
        )}
      </div>


      <div className="flex justify-center items-center w-full mt-3">
        <button
          className="w-full text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95 disabled:bg-opacity-70"
          type="submit"
          // disabled={isSubmitting}
        >
          {/* {isSubmitting ? "Logging in..." : "Login"} */}
          Create College
        </button>
      </div>


      </form>
    </section>
  );
};

export default CreateCollege