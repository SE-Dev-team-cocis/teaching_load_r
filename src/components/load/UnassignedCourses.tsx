import axios from "axios";
import { Course, Load } from "../../zustand/api/apis";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCentralDashboardData } from "../../features/dashboard/dashboardSlice";
import { LoadType, setLoad } from "../../features/load/loadSlice";

type UnassignedProps = {
  id: number;
  close: () => void;
};

const UnassignedCourses = ({ id, close }: UnassignedProps) => {
  // console.log("lecturer id: ", id)
  // RTK
  const dispatch = useAppDispatch();
  const rtkUnallocated = useAppSelector(
    (state) => state.dashboard.allData.unallocated_courses
  );
  const rtkCourses = useAppSelector((state) => state.courses.course);
  const load = useAppSelector((state) => state.load.load);

  const selectedLecturer = useAppSelector(state => state.dashboard.newSelectedLecturer)

  // console.log("Lecturer id: ", selectedLecturer);

  // const theLect = load?.map((load) => {
  //   if (load.staff_id === id) {
  //     return load;
  //   }
  //   // load.staff_id === id;
  // })[0]

    // const theLect = load.filter(
    //   (load: LoadType) => load.staff_id === id
    // );

     const theLect = load?.filter(
       (load: LoadType) => load.staff_id === selectedLecturer.staff_id);

       const newStaffId = theLect[0].staff_id

    // console.log("The kect: ", theLect)




  // if(theLect !== undefined){
    
  // }
  // console.log("The selected lecturer: ", theLect);

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

  // courses?.map((course: any, index: number) => {
  rtkCourses?.map((course: any, index: number) => {
    // if (theCourses?.includes(course.course_name)) {
    if (rtkUnallocated?.includes(course.course_name)) {
      data.push(course);
    }
  });

  const handleAssign = async (
    courseName: string,
    courseCus: number,
    staffId: number
  ) => {
    // console.log("selected lecturer: ", selectedLecturer);

    // const data: any = reassignLecturer?.map((load: Load) => {
    const data = reassignLecturer?.map((load: Load) => {
      return {
        courses: JSON.parse(load?.courses),
        CUs: load?.CUs,
      };
    })

    const newCus = theLect[0]?.CUs
    let newCourses = JSON.parse(theLect[0].courses);

    // console.log("New courses: ", newCourses)

    const theNewRealCourses = JSON.stringify([...newCourses, courseName]);
    const theNewRealCUs = JSON.stringify([...newCus, +courseCus]);


    // console.log("Data to reasiign", theNewRealCourses, theNewRealCUs);

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
        // {
        //   courses: theRealCourses,
        //   CUs: theRealCUs,
        //   staff_id: staffId,
        // },
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

      // console.log("Reponse: ", response.data);

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

      setLecturerLoad(load);
      setReassignLecturer([]);
      setCentralDashboard(centralDashboardData);

      // RTK
      dispatch(setCentralDashboardData(centralDashboardData));
      dispatch(setLoad(load));

      setAssigning(false);
      //TODO: Resetting the central dashboard data

      close();
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  useMemo(() => {
    // fetchUnallocated();
  }, []);

  // console.log("RTK unallocated courses: ", rtkUnallocated)

  return (
    <section>
      {/* <div className=" bg-white relative" style={{ width: 1000 }}> */}
      <div className=" bg-white relative">
        <p className="m-4 text-center text-3xl uppercase">Unassigned courses</p>

        <p>{id}</p>

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
                    className="hover:bg-green-700 text-green-700 hover:text-white border-2 border-green-700 px-4 py-2 rounded duration-200 disabled:bg-opacity-30"
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
