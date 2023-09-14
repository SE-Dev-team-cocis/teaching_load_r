import axios from "axios";
import { Course } from "../../zustand/api/apis";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCentralDashboardData } from "../../features/dashboard/dashboardSlice";
import { LoadType, setLoad } from "../../features/load/loadSlice";

type UnassignedProps = {
  // id: number;
  close: () => void;
};

// const UnassignedCourses = ({ id, close }: UnassignedProps) => {
const UnassignedCourses = ({ close }: UnassignedProps) => {
  // RTK
  const dispatch = useAppDispatch();
  const rtkUnallocated = useAppSelector(
    (state) => state.dashboard.allData.unallocated_courses
  );
  const rtkCourses = useAppSelector((state) => state.courses.course);
  const load = useAppSelector((state) => state.load.load);

  const selectedLecturer = useAppSelector(
    (state) => state.dashboard.newSelectedLecturer
  );

  const theLect = load?.filter(
    (load: LoadType) => load.staff_id === selectedLecturer.staff_id
  );

  const newStaffId = theLect[0]?.staff_id;

  const [assigning, setAssigning] = useState(false);

  let data: any = [];

  // courses?.map((course: any, index: number) => {
  rtkCourses?.map((course: any, index: number) => {
    // if (theCourses?.includes(course.course_name)) {
    if (rtkUnallocated?.includes(course.course_name)) {
      data.push(course);
    }
  });

  const handleAssign = async (
    courseName: string,
    courseCus: number
    // staffId: number
  ) => {
    const newCus = theLect[0]?.CUs;
    let newCourses = JSON.parse(theLect[0].courses);

    const theNewRealCourses = JSON.stringify([...newCourses, courseName]);
    const theNewRealCUs = JSON.stringify([...newCus, +courseCus]);

    try {
      setAssigning(true);
      const response = await axios.put(
        "https://teaching-load-api.onrender.com/api/assign",
        {
          courses: theNewRealCourses,
          CUs: theNewRealCUs,
          staff_id: newStaffId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const theData = response.data?.load;
      const centralDashboardData = response.data?.others;

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

      // RTK
      dispatch(setCentralDashboardData(centralDashboardData));
      dispatch(setLoad(load));

      setAssigning(false);

      close();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

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
                    className="hover:bg-green-700 text-green-700 hover:text-white border-2 border-green-700 px-4 py-2 rounded duration-200 disabled:bg-opacity-30"
                    onClick={() =>
                      handleAssign(course.course_name, course.course_cus)
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
