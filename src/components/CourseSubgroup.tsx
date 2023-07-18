type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  isChecked: boolean;
};

const CourseSubgroup = ({ checkedCourse }) => {
  console.log("Checked course", checkedCourse);
  return (
    <div className="my-modal">
      <p className="text-center text-lg mb-3">
        Course subgroup details for {checkedCourse?.course_name}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {/* <div className="flex justify-start items-left flex-col "> */}
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="block font-normal text-m mt-2 text-gray-700 mb-0"
          >
            Subgroup name
          </label>
          <input
            type="text"
            placeholder="Enter your subgroup name"
            className="
          focus:outline-none
          focus:ring-1
          focus:ring-green-700
          py-1
          px-3
          border
          border-gray
          focus:border-teal-500
          mt-0
          rounded my-3"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="block font-normal text-m mt-2 text-gray-700 mb-0"
          >
            Number of students
          </label>
          <input
            type="text"
            placeholder="Enter number of students"
            className="
            focus:outline-none
            focus:ring-1
            focus:ring-green-700
            py-1
            px-3
            border    
            border-gray
            focus:border-teal-500
            mt-0
            rounded my-3"
          />
        </div>
      </div>

      <span className="close">x</span>

      <div className="flex justify-center items-center">
        <button
          className="text-white px-5 rounded py-2 bg-green-700 mt-2 hover:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          type="button"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CourseSubgroup;
