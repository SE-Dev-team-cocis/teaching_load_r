import { all } from "axios";
import useNewLoadStore21 from "../../zustand/newLoadStore2";

type LecturerDetailsProps = {
  id: number;
};

const LecturerDetails = ({ id }: LecturerDetailsProps) => {
  const lecturerLoad = useNewLoadStore21((state) => state.lecturerLoad);
  const allcourses = useNewLoadStore21((state) => state.allCourses);
  const lecturers = useNewLoadStore21((state) => state.lecturers);

  // console.log("lecturerLoad", lecturerLoad);
  const lecturerLoadDetails = lecturerLoad.filter(
    (load) => load.staff_id === id
  );

  // Personal details of the lecturer
  const lecturer = lecturers.find((lecturer) => lecturer.id === id);

  // const name = lecturerLoadDetails[0]?.name;

  // const details = lecturerLoadDetails[0]?.courses;


  // console.log("lecturerLoadDetails", JSON.parse(details));

  const assignedCourses = lecturerLoadDetails?.map((load: any) => {
    return {
      courses: JSON.parse(load.courses),
    };
  });

  console.log("Assigned courses: ", assignedCourses)
  // const assignedCourses =details?.courses
  // console.log("Assigned courses: ", JSON.parse(assignedCourses));

  const theCoursesOnly = assignedCourses?.map((cs: any) => {
    return cs.courses;
  });

  console.log("the courses only: ", theCoursesOnly[0]);

  const courseDetails = allcourses?.filter((course) => {
    if (theCoursesOnly[0]?.includes(course.course_name)) {
      return {
        course_name: course.course_name,
        course_code: course.course_code,
        CUs: course.course_cus,
      };
    }
  });

  console.log("Course details: ", courseDetails);

  // const mycourses = lecturerLoadDetails.map((load) => {
  //   return {
  //     courses: JSON.parse(load.courses),
  //     creditUnits: load.CUs,
  //     // courseCode: allcourses.filter(
  //     //   (course) => course.course_name in courseDetails.courses
  //     // ),
  //   };
  // });
  // // console.log("Courses", mycourses);

  return (
    <div className="lecturer_details">
      <p className="m-4 text-center">
        Details for {lecturer?.firstName} {lecturer?.lastName}
      </p>
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
          {/* <tr>
            <td className="p-2 text-sm text-gray-700 text-left">1</td>
            <td className="p-2 text-sm text-gray-700 text-left">
              Distributed Systems
            </td>
            <td className="p-2 text-sm text-gray-700 text-center">BSSE 1234</td>
            <td className="p-2 text-sm text-gray-700 text-center">34</td>
            <td className="p-2 text-sm text-gray-700 text-center">Delete</td>
          </tr>
          <tr>
            <td className="p-2 text-sm text-gray-700 text-left">1</td>
            <td className="p-2 text-sm text-gray-700 text-left ">
              Embedded Systems
            </td>
            <td className="p-2 text-sm text-gray-700 text-center">
              BSSE 12364
            </td>
            <td className="p-2 text-sm text-gray-700 text-center">12</td>
            <td className="p-2 text-sm text-gray-700 text-center">Delete</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default LecturerDetails;
