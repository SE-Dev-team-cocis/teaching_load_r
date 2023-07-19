// import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import useNewLoadStore21 from "../../zustand/newLoadStore2";

type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  isChecked: boolean;
};

const SemesterCourses = () => {
  //   const queryClient = useQueryClient();

  //   const data = queryClient.getQueryData(["lecturers"]);

  const allcourses = useNewLoadStore21((state) => state.allCourses);
  const setCheckedCourses = useNewLoadStore21(
    (state) => state.setCheckedCourses
  );
  const [filterText, setFilterText] = useState("");

  function handleCheckedCourses(id: number) {
    const updatedCourses: Course[] = allcourses.map((course: Course) =>
      course.id === id ? { ...course, isChecked: !course.isChecked } : course
    );
    // setMyCourses(updatedCourses);

    setCheckedCourses(updatedCourses);

    const checkedOnes = updatedCourses.filter((course) => {
      return course.isChecked === true;
    });

    setCheckedCourses(checkedOnes); // Setting only the checked courses
  }

  //   console.log("Cached data: ", allcourses);
  console.log("Filtered text: ", filterText);

  return (
    <div style={{ width: "600px" }}>
      <p className="text-center text-lg mt-4">Create Semester list</p>

      <div className="text-right">
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
          w-50
          rounded my-3
                   
          "
          value={filterText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFilterText(e.target.value)
          }
        />
      </div>

      <div className="flex justify-between items-center">
        <p className="pl-5 ml-4">Course code</p>
        <p>Course name</p>
        <p>Credit units</p>
      </div>

      {allcourses.map((course) => (
        <div key={course.id}>
          <div className="flex justify-between items-center flex-row">
            {/* <div key={course.id}> */}

            <div key={course.course_code}>
              <input
                type="checkbox"
                className="mr-3 ml-2 h-4 w-4 text-green-700 border-2 focus:bg-green-700 focus:ring-green-700 rounded"
                name="courseUnits[]"
                checked={course.isChecked}
                value={course.id}
                onChange={() => handleCheckedCourses(course.id)}
              />
              {course.course_code}
            </div>
            <p key={course.course_code} className="text-left">
              {course.course_name}
            </p>
            <p key={course.course_code} className="text-center mr-5 pr-5">
              {+course.course_cus}
            </p>

            {/* </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SemesterCourses;
