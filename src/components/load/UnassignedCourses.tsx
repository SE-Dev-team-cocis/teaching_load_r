import axios from "axios";
import { Course, Load } from "../../zustand/api/apis";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { useMemo, useState } from "react";

const UnassignedCourses = ({ id }: any) => {
  const courses = useNewLoadStore21((state) => state.allCourses);
  const setLecturerLoad = useNewLoadStore21((state) => state.setLecturerLoad);
  const [theCourses, setTheCourses] = useState<any>([]);
  const lecturerLoad = useNewLoadStore21((state) => state.lecturerLoad);
  const [selectedLecturer, setSelectedLecturer] = useState<any>(null);

  // console.log("courses: ", lecturerLoad);

  function selectedOne() {
    const selectedLecturer = lecturerLoad?.filter((load: Load) => {
      if (load.staff_id === id) {
        return load;
      }
    });

    // console.log("Selected one: ", selectedLecturer)

    setSelectedLecturer(selectedLecturer);
  }

  let data: any = [];
  const fetchUnallocated = async () => {
    try {
      const url = "https://teaching-load-api.onrender.com/api/dashboard";
      const response = await axios.get(url);
      const unallocatedCourses = response?.data?.unallocated_courses;
      setTheCourses(unallocatedCourses);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // console.log("The courses: ", theCourses)

  courses?.map((course: any, index: number) => {
    if (theCourses?.includes(course.course_name)) {
      data.push(course);
    }
  });

  const handleAssign = async (courseName: string, courseCus: number) => {
    // console.log("selected lecturer: ", selectedLecturer);
    const data: any = selectedLecturer?.map((load: Load) => {
      return {
        courses: JSON.parse(load.courses),
        CUs: load.CUs,
      };
    });

    try {
      const response = await axios.put(
        "https://teaching-load-api.onrender.com/api/assign",
        {
          courses: JSON.stringify([...data[0]?.courses, courseName]),
          CUs: [...data[0].CUs, +courseCus],
          staff_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const load = response.data?.load?.map((load: any) => {
        return {
          id: load.id,
          staff_id: load.staff_id,
          courses: JSON.parse(load.courses),
          CUs: load.CUs,
          assignee_id: load.assignee_id,
          semester: load.semester,
        };
      });

      console.log("Response data: ", load);
      setLecturerLoad(load);
      // console.log("Load reassigned successfully", response.data);
      // // const result = response.data.loads
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  useMemo(() => {
    fetchUnallocated();
    selectedOne();
    // console.log("Data: ", data);
  }, []);

  return (
    <>
      <section className="flex justify-center items-center mt-10 rounded">
        <div className=" bg-white" style={{ width: 1000 }}>
          <p className="m-4 text-center text-2xl uppercase">
            Unassigned courses
          </p>
          <p>Lecturer id: {id}</p>
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
                    <button
                      className="bg-green-400 text-white px-4 py-2 rounded"
                      onClick={
                        () =>
                          handleAssign(course.course_name, course.course_cus)
                        // console.log("button clicked", course.course_name, course.course_cus)
                      }
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default UnassignedCourses;
