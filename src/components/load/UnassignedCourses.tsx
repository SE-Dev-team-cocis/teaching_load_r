import axios from "axios";
import { Course, Load } from "../../zustand/api/apis";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { useMemo, useState } from "react";

type UnassignedProps = {
  id: number;
  close: () => void;
};

const UnassignedCourses = ({ id, close }: UnassignedProps) => {
  const courses = useNewLoadStore21((state) => state.allCourses);
  const setLecturerLoad = useNewLoadStore21((state) => state.setLecturerLoad);
  const [theCourses, setTheCourses] = useState<any>([]);
  const lecturerLoad = useNewLoadStore21((state) => state.lecturerLoad);
  const [selectedLecturer, setSelectedLecturer] = useState<any>(null);

  // console.log("Id: ", id);

  function selectedOne() {
    const theLecturer = lecturerLoad?.filter((load: Load) => {
      if (load.staff_id === id) {
        return load;
      }
    });
    // console.log("Lecturer: ", theLecturer)
    setSelectedLecturer(theLecturer);
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

  // console.log("Unassigned full course: ", data)

  const handleAssign = async (
    courseName: string,
    courseCus: number,
    staffId: number
  ) => {
    // console.log("selected lecturer: ", selectedLecturer);

    const data: any = selectedLecturer?.map((load: Load) => {
      return {
        courses: load?.courses,
        CUs: load?.CUs,
      };
    });

    console.log("courses: ", data[0]?.courses);

    const theData = data[0];
    const theCus: any[] = theData?.CUs;
    const realCUs = [...theCus, +courseCus];
    console.log("The real Cus: ", realCUs)

    const theCourses: any[] = theData?.courses;
    // console.log("Initial courses: ", typeof theCourses);
    const theRealCourses = JSON.stringify([...theCourses, courseName]);
    const theRealCUs = JSON.stringify(realCUs);

    // console.log("Data: ", theRealCourses, theRealCUs);

    // console.log("Data: ", JSON.parse(theData?.courses));

    try {

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

      const theData = response.data?.load;

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

      // console.log("Response data: ", load);
      setLecturerLoad(load);
      close();
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
        <div className=" bg-white relative" style={{ width: 1000 }}>
          <p className="m-4 text-center text-2xl uppercase">
            Unassigned courses
          </p>

          <p
            className="absolute w-5 h-5 rounded-full bg-red-500 text-white text-center cursor-pointer right-3 top-2"
            onClick={close}
          >
            X
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
                          handleAssign(
                            course.course_name,
                            course.course_cus,
                            id
                          )
                        // console.log("button clicked", course.course_name, course.course_cus)
                      }
                    >
                      {/* Assign {course.course_cus} {course.course_name} */}
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
