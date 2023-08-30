import DynamicInput from "../DynamicInput";
export type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  isChecked: boolean;
};

type SubgroupProps = {
  checkedCourse: Course;
};

const CourseSubgroup = ({ checkedCourse }: SubgroupProps) => {
  return (
    <div className="my-modal">
        <DynamicInput id={checkedCourse?.id} name={checkedCourse?.course_name}/>
    </div>
  );
};

export default CourseSubgroup;
