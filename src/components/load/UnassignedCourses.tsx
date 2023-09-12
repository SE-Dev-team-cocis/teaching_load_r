import axios from "axios";
import { Course, Load } from "../../zustand/api/apis";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { useEffect, useMemo, useState } from "react";

type UnassignedProps = {
  id: number;
  close: () => void;
};

const UnassignedCourses = ({ id, close }: UnassignedProps) => {
  const [assigning, setAssigning] = useState(false);
  const courses = useNewLoadStore21((state) => state.allCourses);
  const setLecturerLoad = useNewLoadStore21((state) => state.setLecturerLoad);
  const [theCourses, setTheCourses] = useState<any>([]);

  const reassignLecturer = useNewLoadStore21((state) => state.reassignLecturer);
  const setReassignLecturer = useNewLoadStore21(
    (state) => state.setReassignLecturer
  );
  const setCentralDashboard = useNewLoadStore21(
    (state) => state.setCentralDashboard
  );

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

  // console.log("Unassigned full course: ", data)

  const handleAssign = async (
    courseName: string,
    courseCus: number,
    staffId: number
  ) => {
    // console.log("selected lecturer: ", selectedLecturer);

    const data: any = reassignLecturer?.map((load: Load) => {
      return {
        courses: JSON.parse(load?.courses),
        CUs: load?.CUs,
      };
    });

    const theData = data[0];
    const theCus: any[] = theData?.CUs;
    const realCUs: any[] = [...theCus, +courseCus];

    const theCourses: any[] = theData?.courses;
    const theRealCourses = JSON.stringify([...theCourses, courseName]);
    const theRealCUs = JSON.stringify(realCUs);

    try {
      setAssigning(true);
      const response = await axios.put(
        "https://teaching-load-api.onrender.com/api/assign",
        {
          courses: theRealCourses,
          CUs: theRealCUs,
          staff_id: staffId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Reponse: ", response.data);

      const theData = response.data?.load;
      const centralDashboardData = response.data?.others;

      // console.log("Response: ", response.data)
      const load = theData?.map((load: any) => {
        return {
          id: load.id,
          staff_id: load.staff_id,
          courses: load.courses,

          CUs: load.CUs,
          assignee_id: load.assignee_id,
          semester: load.semester,
        };
      });

      setLecturerLoad(load);
      setReassignLecturer([]);
      setCentralDashboard(centralDashboardData);

      setAssigning(false);
      //TODO: Resetting the central dashboard data

      close();
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  useMemo(() => {
    fetchUnallocated();
  }, []);

  return (
    <section>
      {/* <div className=" bg-white relative" style={{ width: 1000 }}> */}
      <div className=" bg-white relative">
        <p className="m-4 text-center text-3xl uppercase">Unassigned courses</p>

        <p
          className="absolute w-6 h-6 rounded-full bg-red-500 text-white text-center cursor-pointer right-3 -top-2"
          onClick={close}
        >
          X
        </p>
        {/* <p>Lecturer id: {id}</p> */}
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
                    className="hover:bg-green-700 text-green-700 hover:text-white border-2 border-green-700 px-4 py-2 rounded duration-200"
                    onClick={() =>
                      handleAssign(course.course_name, course.course_cus, id)
                    }
                    disabled={assigning}
                  >
                    {/* {assigning ? "Assigning..." : "Assign"} */}
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
