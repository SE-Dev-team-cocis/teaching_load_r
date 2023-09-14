import { useRef } from "react";
import UnassignedCourses from "./UnassignedCourses";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LoadType } from "../../features/load/loadSlice";
import { setNewSelectedLecturer } from "../../features/dashboard/dashboardSlice";

type LecturerDetailsProps = {
  lectID: number;
  closeModal: () => void;
  edit?: boolean
};

const LecturerDetails = ({ lectID, closeModal, edit }: LecturerDetailsProps) => {
  //RTK
  const rtkLoad = useAppSelector((state) => state.load.load);
  const courses = useAppSelector((state) => state.courses.course);
  const staff = useAppSelector((state) => state.staff.staff);
  const dispatch = useAppDispatch();

  const unassignedRef = useRef<HTMLDialogElement>(null);

  const lecturerLoadDetails = rtkLoad.filter(
    (load: LoadType) => load.staff_id === lectID
  );

  function showUnassigned() {
    //RTK
    dispatch(setNewSelectedLecturer(lecturerLoadDetails[0]));

    unassignedRef?.current?.showModal();
  }
  function closeUnassigned() {
    unassignedRef?.current?.close();
  }

  // Personal details of the lecturer
  const lecturer = staff?.find((lecturer) => lecturer.id === lectID);

  const assignedCourses = lecturerLoadDetails?.map((load: any) => {
    return {
      courses: load.courses,
    };
  });

  const theCoursesOnly = assignedCourses?.map((cs: any) => {
    return cs.courses;
  });

  // const courseDetails = allcourses?.filter((course) => {
  const courseDetails = courses?.filter((course) => {
    if (theCoursesOnly[0]?.includes(course.course_name)) {
      return {
        course_name: course.course_name,
        course_code: course.course_code,
        CUs: course.course_cus,
      };
    }
  });

  function addCourse() {
    console.log("button clicked");
  }

  return (
    <section>
      <div className="lecturer_details">
        <p className="mt-2 text-center text-3xl">
          Details for {lecturer?.firstName} {lecturer?.lastName}
        </p>
        <p
          className=" bg-red-500 text-white text-center w-6 h-6 rounded-full absolute right-4 top-3 hover:scale-105 cursor-pointer"
          onClick={closeModal}
        >
          X
        </p>
        {edit && (
          <button
            className="bg-green-700 text-white px-4 py-2 rounded outline-none my-2"
            onClick={showUnassigned}
          >
            Add course
          </button>
        )}

        <table className="w-full border-2 border-b-gray-400 rounded ">
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
              {/* <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
                Action
              </th> */}
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
                {/* <td className="p-2 text-sm text-red-700 text-center">
                  Delete
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog ref={unassignedRef} className="unassigned_dialog rounded-md">
        <UnassignedCourses close={closeUnassigned} />
      </dialog>
    </section>
  );
};

export default LecturerDetails;
