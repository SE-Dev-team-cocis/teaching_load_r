import DynamicInput from "../DynamicInput";

export type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  isChecked: boolean;
};

type SubgroupProps = {
  checkedCourse: Course[];
};

const CourseSubgroup = ({ checkedCourse }: SubgroupProps) => {
  console.log("Checked course", checkedCourse);
  return (
    <div className="my-modal">
      <p className="text-center text-lg mb-3">
        Course subgroup details for {checkedCourse?.course_name}
      </p>

      <span className="close">x</span>

      <DynamicInput id={checkedCourse?.id} />
    </div>
  );
};

export default CourseSubgroup;
