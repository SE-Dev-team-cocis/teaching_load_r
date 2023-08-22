import { all } from "axios";
import {useRef} from "react"
import useNewLoadStore21 from "../../zustand/newLoadStore2";

type LecturerDetailsProps = {
  lectID: number;
};

const LecturerDetails = forwardRef<HTMLDialogElement, LecturerDetailsProps>(({ lectID }, ref) => {
  const lecturerLoad = useNewLoadStore21((state) => state.lecturerLoad);
  const allcourses = useNewLoadStore21((state) => state.allCourses);
  const lecturers = useNewLoadStore21((state) => state.lecturers);

  const lecturerLoadDetails = lecturerLoad.filter(
    (load) => load.staff_id === lectID
  );

  // Personal details of the lecturer
  const lecturer = lecturers.find((lecturer) => lecturer.id === lectID);

  const assignedCourses = lecturerLoadDetails?.map((load: any) => {
    return {
      courses: JSON.parse(load.courses),
    };
  });

  const theCoursesOnly = assignedCourses?.map((cs: any) => {
    return cs.courses;
  });

  const courseDetails = allcourses?.filter((course) => {
    if (theCoursesOnly[0]?.includes(course.course_name)) {
      return {
        course_name: course.course_name,
        course_code: course.course_code,
        CUs: course.course_cus,
      };
    }
  });

  function addCourse(){
    console.log("button clicked")
  }

  return (
   <div className="lecturer_details">
     
      <p className="m-4 text-center text-2xl">
        Details for {lecturer?.firstName} {lecturer?.lastName}
      </p>
      <p className=" bg-red-500 text-white text-center w-6 h-6 rounded-full absolute right-4 top-3 hover:scale-105" onClick={ref.curent?.closeModal()}>X</p>
       <button className="bg-green-700 text-white px-4 py-2 rounded outline-none my-2" onClick={addCourse}>
        Add course
      </button>
      <table className="w-full border-2 border-b-gray-400 rounded">
        <thead className="bg-gray-50 bottom-2 border-gray-200">
          <tr>
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-left">
              No.
            </th>
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-left">
              Course name
            </th>
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
              Course code
            </th>
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
              Course Credit units
            </th>
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-400">
          {courseDetails.map((load, index) => (
            <tr key={index}>
              <td className="p-2 text-sm text-gray-700 text-left">
                {index + 1}
              </td>
              <td className="p-2 text-sm text-gray-700 text-left">
                {load.course_name}
              </td>
              <td className="p-2 text-sm text-gray-700 text-center">
                {load.course_code}
              </td>
              <td className="p-2 text-sm text-gray-700 text-center">
                {load.course_cus}
              </td>
              <td className="p-2 text-sm text-gray-700 text-center">Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default LecturerDetails;
