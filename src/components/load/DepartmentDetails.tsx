import { useParams } from "react-router-dom";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { Department, Lecturer } from "../../zustand/api/apis";

const DepartmentDetails = () => {
  const params = useParams();
  // const deptId = parseInt(+name);
  const lecturerLoad = useNewLoadStore21((state) => state.lecturerLoad);
  const lecturers = useNewLoadStore21((state) => state.lecturers);
  const oldDepartments = useNewLoadStore21((state) => state.departments);

  let dept: number;
  if (params.name !== undefined) {
    dept = +params.name;
  }

  const theDepartment: any = oldDepartments.filter((department) => {
    return department.id === dept;
  });

  const the_dept = oldDepartments.find((department) => {
    return department.id === dept;
  });
  // console.log("dept: ", the_dept.department_name); // getting the chosen department bu id

  const staffIds = lecturers.map((lecturer: Lecturer) => {
    return lecturer.id;
  });

  // console.log("Staff Ids: ", staffIds);

  const assignedLecturers = lecturerLoad.filter((load) => {
    return load.staff_id in staffIds;
  });

  // console.log("Assigned lecturers based on staff id: ", assignedLecturers);

  const assignedIds = assignedLecturers.map((lecturer) => {
    return lecturer.staff_id;
  });

  const lecturerDetails = lecturers.map((lecturer: Lecturer) => {
    if (assignedIds.includes(lecturer.id)) {
      return {
        id: lecturer.id,
        name: lecturer.firstName + " " + lecturer.lastName,
        role: lecturer.role,
        department: lecturer.department,
      };
    } else {
      return null;
    }
  });

  const assignedDetails = lecturerDetails.filter((name) => {
    return name !== null;
  });
  // console.log("Assigned lecturers' names : ", assignedDetails);

  const lecturerLoads = lecturerLoad.map((load) => {
    if (assignedIds.includes(load.staff_id)) {
      return load.CUs.reduce((a: number, b: number) => a + b, 0);
    } else {
      return null;
    }
  });

  // console.log("Assigned loads: ", lecturerLoads);

  const allData = assignedDetails
    .map((data, index) => {
      return {
        id: data?.id,
        name: data?.name,
        role: data?.role,
        department: data?.department,
        load: lecturerLoads[index],
      };
    })
    .filter((data) => {
      return data.department === the_dept.department_name;
    });
  // console.log("All details: ", allData);

  return (
    <div className="department_details">
      <p className="m-4 text-center">
        {" "}
        Details for {the_dept.department_name} department{" "}
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
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-left">
              Staff title
            </th>
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-left">
              Total Load
            </th>
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-400">
          {allData.map((data, index) => (
            <tr key={index}>
              <td className="p-2 text-sm text-gray-700 ">{index + 1}</td>
              <td className="p-2 text-sm text-gray-700 ">{data.name}</td>
              <td className="p-2 text-sm text-gray-700 ">{data.role}</td>
              <td className="p-2 text-sm text-gray-700 ">{data.load}</td>
              <td className="p-2 text-sm text-gray-700 ">
                <span className="text-blue-500">View</span>{" "}
                <span className="ml-2 mr-2 text-green-700">Edit</span>
                <span className="text-red-500">Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentDetails;
