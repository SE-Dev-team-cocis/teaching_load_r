import { useForm } from "react-hook-form";
import { CourseSchema, CourseType } from "../functions/BackendSchemas";
import { zodResolver } from "@hookform/resolvers/zod";


type CreateCourseProps = {
  closeModal: () => void
};

const CreateCourse = ({closeModal}: CreateCourseProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseType>({
    resolver: zodResolver(CourseSchema),
  });


  const handleCollege = (data: CourseType) => {
      console.log(data)
  }

  return (
    <section className="outline-none relative">
    <span onClick={closeModal} className="cursor-pointer absolute right-0 w-6 h-6 bg-red-500 text-center text-white rounded-full font-semibold">
      X
    </span>
    <p className='text-center text-lg font-semibold text-green-700'>Create Course</p>

    <form className="" onSubmit={handleSubmit(handleCollege)}>
    <div className="mb-3 mt-2">
      <label htmlFor="" className="block text-gray-500 text-sm">
        College Name
      </label>
      <input
        type="text"
        {...register("course_name")}
        placeholder="Enter full college name"
        className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
          errors.course_name?.message
            ? "border-red-500 focus:ring-red-700"
            : " focus:ring-blue-700 "
        } `}
      />
      {errors.course_name && (
        <span className="text-red-500 mb-2">{`${errors.course_name.message}`}</span>
      )}
    </div>
    <div className="grid grid-cols-12 gap-2">
    <div className="col-span-6">
      <label htmlFor="" className="block text-gray-500 text-sm">
        Course Code
      </label>
      <input
        type="text"
        {...register("course_code")}
        placeholder="Enter college code eg. COCIS"
        className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
          errors.course_code?.message
            ? "border-red-500 focus:ring-red-700"
            : " focus:ring-blue-700 "
        } `}
      />
      {errors.course_code && (
        <span className="text-red-500 mb-2">{`${errors.course_code.message}`}</span>
      )}
    </div>
    <div className="col-span-6">
      <label htmlFor="" className="block text-gray-500 text-sm">
        Course Credit units
      </label>
      <input
        type="number"
        {...register("course_cus")}
        placeholder="Enter college code eg. COCIS"
        className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
          errors.course_cus?.message
            ? "border-red-500 focus:ring-red-700"
            : " focus:ring-blue-700 "
        } `}
      />
      {errors.course_cus && (
        <span className="text-red-500 mb-2">{`${errors.course_cus.message}`}</span>
      )}
    </div>
    </div>

      <div className="">
      <label htmlFor="" className="block text-gray-500 text-sm">
        Department
      </label>
      <input
        type="number"
        {...register("departmentId")}
        placeholder="Enter college code eg. COCIS"
        className={`border-2 rounded-md p-2 outline-none w-full focus:ring-1 ${
          errors.course_cus?.message
            ? "border-red-500 focus:ring-red-700"
            : " focus:ring-blue-700 "
        } `}
      />
      {errors.course_cus && (
        <span className="text-red-500 mb-2">{`${errors.course_cus.message}`}</span>
      )}
    </div>
   


    <div className="flex justify-center items-center w-full mt-3">
      <button
        className="w-full text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95 disabled:bg-opacity-70"
        type="submit"
        // disabled={isSubmitting}
      >
        {/* {isSubmitting ? "Logging in..." : "Login"} */}
        Create Course
      </button>
    </div>


    </form>
  </section>
  );
};

export default CreateCourse;
