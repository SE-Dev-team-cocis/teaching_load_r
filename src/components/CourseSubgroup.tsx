import DynamicInput from "./DynamicInput";

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

      <span className="close">x</span>

      <DynamicInput />
      {/* <div className="flex justify-center items-center">
        <button
          className="text-white px-5 rounded py-2 bg-green-700 mt-2 hover:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          type="button"
        >
          Create
        </button>
      </div> */}
    </div>
  );
};

export default CourseSubgroup;
