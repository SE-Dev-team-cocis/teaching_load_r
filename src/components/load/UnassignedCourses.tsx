import axios from "axios";
import { Course } from "../../zustand/api/apis";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { useMemo, useState } from "react";

const UnassignedCourses = () => {
  const courses = useNewLoadStore21((state) => state.allCourses);
  const [theCourses, setTheCourses] = useState<any>([]);

  // console.log("Course names: ", courseNames)

  let data: any = [];
  const fetchUnallocated = async () => {
    try {
      const url = "https://teaching-load-api.onrender.com/api/dashboard";
      const response = await axios.get(url);
      // console.log("Unallocated: ", response?.data.unallocated_courses);
      const unallocatedCourses = response?.data.unallocated_courses;
      setTheCourses(unallocatedCourses);
      // console.log("Unallocated: ", unallocatedCourses);
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  useMemo(() => {
    fetchUnallocated();
  }, []);

  // console.log("the courses: ", theCourses)

  courses?.map((course: any, index: number) => {
    if (theCourses?.includes(course.course_name)) {
      // console.log("Course: ", course)
      data.push(course);
    }
    const courseId = course.id;
    const courseName = course.course_name;
    const courseCode = course.course_code;
    const courseCus = course.course_cus;
    // const courseObj = {
    //   course_id: courseId,
    //   course_name: courseName,
    //   course_code: courseCode,
    //   course_cus: courseCus
    // }
    // data.push(courseObj)
  });

  console.log("Data: ", data);

  return (
    <section className="flex justify-center items-center mt-10 rounded">
      <div className=" bg-white" style={{ width: 1000 }}>
        <p className="m-4 text-center text-2xl uppercase">Unassigned courses</p>
        <table className="w-full border-2 border-b-gray-400">
          <thead className="bg-gray-50 bottom-2 border-gray-200">
            <tr>
              <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-left">
                No.
              </th>
              <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-left">
                Name
              </th>
              <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
                Code
              </th>
              <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
                Credit units
              </th>
              <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-400">
            {data?.map((course: Course, index: number) => (
              <tr key={index}>
                <td className="p-2 text-sm text-gray-700 text-left">
                  {index + 1}
                </td>
                <td className="p-2 text-sm text-gray-700 text-left">
                  {course.course_name}
                </td>
                <td className="p-2 text-sm text-gray-700 text-center">
                  {course.course_code}
                </td>
                <td className="p-2 text-sm text-gray-700 text-center">
                  {course.course_cus}
                </td>
                <td className="p-2 text-sm text-gray-700 text-center">
                  <button className="bg-green-400 text-white px-4 py-2 rounded">
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UnassignedCourses;
