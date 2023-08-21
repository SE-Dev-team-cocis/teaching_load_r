import { Course } from "../../zustand/api/apis";
import useNewLoadStore21 from "../../zustand/newLoadStore2";

const UnassignedCourses = () => {
  const courses = useNewLoadStore21((state) => state.allCourses);
  return (
    <section className="flex justify-center items-center mt-10 rounded">
      <div
        className=" bg-white"
        style={{ width: 1000 }}
      >
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
            {courses?.map((course: Course, index: number) => (
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
