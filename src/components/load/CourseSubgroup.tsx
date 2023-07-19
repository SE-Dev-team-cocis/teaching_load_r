import DynamicInput from "../DynamicInput";

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
    </div>
  );
};

export default CourseSubgroup;
