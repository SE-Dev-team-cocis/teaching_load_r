import { all } from "axios";
import useNewLoadStore21 from "../../zustand/newLoadStore2";

type LecturerDetailsProps = {
  lectID: number;
};

const LecturerDetails = ({ lectID }: LecturerDetailsProps) => {
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

  return (
    <div className="lecturer_details">
     
      <p className="m-4 text-center text-2xl">
        Details for {lecturer?.firstName} {lecturer?.lastName}
      </p>
       <button className="bg-green-700 text-white px-2 py-3 rounded outline-none my-2">
        Add course
      </button>
      <table className="w-full border-2 border-b-gray-400">
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
};

export default LecturerDetails;
