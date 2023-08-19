import { useParams } from "react-router-dom";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { Lecturer } from "../../zustand/api/apis";

const DepartmentDetails = () => {
  const { name } = useParams();
  const lecturerLoad = useNewLoadStore21((state) => state.lecturerLoad);
  const lecturers = useNewLoadStore21((state) => state.lecturers);

  const staffIds = lecturers.map((lecturer: Lecturer) => {
    return lecturer.id;
  });

  const assignedLecturers = lecturerLoad.filter((load) => {
    return load.staff_id in staffIds;
  });

  const assignedIds = assignedLecturers.map((lecturer) => {
    return lecturer.staff_id;
  });

  const lecturerNames = lecturers.map((lecturer: Lecturer) => {
    if (assignedIds.includes(lecturer.id)) {
      return lecturer.firstName + " " + lecturer.lastName;
    } else {
      return null;
    }
  });

  const assignedNames = lecturerNames.filter((name) => {
    return name !== null;
  });

  const lecturerTitles = lecturers.filter((lecturer: Lecturer) =>{
    return lecturer.department === name; //filtering lecturers by department
  }).map((lecturer: Lecturer) => {
    if (assignedIds.includes(lecturer.id)) {
      return lecturer.role; //getting the role of the lecturer
    } else {
      return null;
    }
  });
  const assignedTitles = lecturerTitles.filter((title) => {
    return title !== null;
  });

  const lecturerLoads = lecturerLoad.map((load) => {
    if (assignedIds.includes(load.staff_id)) {
      return load.CUs.reduce((a: number, b: number) => a + b, 0);
    } else {
      return null;
    }
  });

  const departments = lecturers.map((lecturer: Lecturer) => {
    return lecturer.department;
  })

  const assigneeIds = lecturerLoad.map((load) => {
    if (assignedIds.includes(load.staff_id)) {
      return load.assignee_id;
    } else {
      return null;
    }
  });

  const allData = [];
  for (let i = 0; i < assignedNames.length; i++) {
    allData.push({
      name: assignedNames[i],
      title: assignedTitles[i],
      load: lecturerLoads[i],
      assignee_id: assigneeIds[i],
      department: departments[i]

    });
  }

  const departmentData = allData.filter((data) => {
    return data.department === name;
  })

  console.log(assignedNames);
  return (
    <div className="department_details">
      <p className="m-4 text-center"> Details for {name} department </p>
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
          {departmentData.map((data, index) => (
            <tr key={index}>
               <td className="p-2 text-sm text-gray-700 ">
                 {index+1}
                </td>
               <td className="p-2 text-sm text-gray-700 ">
                 {data.name}
                </td>
              <td className="p-2 text-sm text-gray-700 ">
                 {data.title}
                </td>
              <td className="p-2 text-sm text-gray-700 ">
                 {data.load}
                </td>
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