import React, { useMemo, useRef, useState } from "react";
import { ChangeEvent } from "react";
import useNewLoadStore21 from "../../zustand/newLoadStore2";

type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  isChecked: boolean;
};

type CourseProps = {
  courses: Course[];
};

const Courses = ({ courses }: CourseProps) => {
  // const Courses = ({ courses }: CourseProps) => {

  // console.log("Courses: ", courses);
  const setCourses = useNewLoadStore21((state) => state.setCourses);
  const allCourses = useNewLoadStore21((state) => state.allCourses);
  const setCheckedCourses = useNewLoadStore21(
    (state) => state.setCheckedCourses
  );

  // console.log("All courses from the courses component: ", allCourses);

  useMemo(() => {
    setCourses(courses);
  }, [courses]);

  function handleCheckedCourses(id: number) {
    const updatedCourses: Course[] = allCourses.map((course: Course) =>
      course.id === id ? { ...course, isChecked: !course.isChecked } : course
    );
    // setMyCourses(updatedCourses);

    setCourses(updatedCourses);

    const checkedOnes = updatedCourses.filter((course) => {
      return course.isChecked === true;
    });

    setCheckedCourses(checkedOnes); // Setting only the checked courses
  }

  const [myCourses, setMyCourses] = useState<Course[]>(courses);
  const [filterText, setFilterText] = useState("");
  return (
    <div className="card p-3 bg-white ml-3 rounded-lg ">
      <p className="text-xl font-semibold">Courses</p>
      <input
        type="text"
        placeholder="Search for a course here..."
        className="
          focus:outline-none
          focus:ring-1
          focus:ring-green-700
          py-2
          px-4
          border
          border-gray
          focus:border-teal-500
          w-full
          rounded my-3"
        value={filterText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFilterText(e.target.value)
        }
      />
      <div className="list">
        {allCourses
          ?.filter((courseUnit: Course) => {
            return filterText.toLowerCase() === ""
              ? courseUnit
              : courseUnit.course_name.toLowerCase().includes(filterText);
          })
          .map((courseUnit: Course) => (
            <p key={courseUnit.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-3 ml-2 h-4 w-4 text-green-700 border-2 focus:bg-green-700 focus:ring-green-700 rounded"
                name="courseUnits[]"
                checked={courseUnit.isChecked}
                value={courseUnit.id}
                onChange={() => handleCheckedCourses(courseUnit.id)}
              />
              {courseUnit.course_name}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Courses;
