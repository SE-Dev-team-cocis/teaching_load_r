import { useState, ChangeEvent, useEffect } from "react";
import useCoursesStore from "../../zustand/coursesStore";

const CourseUnits = () => {
  const {
    setFilterText,
    filterText,
    realCourses,
    fetchCourses,
    handleCheckedCourse,
  } = useCoursesStore();

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="card p-3 bg-white ml-3 rounded-lg ">
      <p className="text-xl font-semibold">Course Units</p>
      <input
        type="text"
        placeholder="Search for lecturer here..."
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
        {realCourses
          .filter((courseUnit) => {
            return filterText.toLowerCase() === ""
              ? courseUnit
              : courseUnit.course_name.toLowerCase().includes(filterText);
          })
          .map((courseUnit) => (
            <p key={courseUnit.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-3 ml-2 h-4 w-4 text-green-700 border-2 focus:bg-green-700 focus:ring-green-700 rounded"
                name="courseUnits[]"
                checked={courseUnit.isChecked}
                value={courseUnit.id}
                onChange={() => handleCheckedCourse(courseUnit.id)}
              />
              {courseUnit.course_name}
            </p>
          ))}
      </div>
    </div>
  );
};

export default CourseUnits;
