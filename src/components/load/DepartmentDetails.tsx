import { useParams } from "react-router-dom";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { Lecturer } from "../../zustand/api/apis";
import { useRef, useState } from "react";
import LecturerDetails from "./LecturerDetails";

const DepartmentDetails = ({ id }: any) => {
  const params = useParams();
  const lecturerRef = useRef<HTMLDialogElement>(null);
  const [lecturerId, setLecturerId] = useState<number>(0);

  const lecturerLoad = useNewLoadStore21((state) => state.lecturerLoad);
  const lecturers = useNewLoadStore21((state) => state.lecturers);
  const oldDepartments = useNewLoadStore21((state) => state.departments);


  function toggleModal(lectId: number | undefined) {
    lectId !== undefined && setLecturerId(lectId);
    // setLecturerId(id)
    // console.log("Lecturer id: ", lectId);
    console.log("Department id: ", id);

    lecturerRef.current?.showModal();
  }

  // let dept: number;
  // if (params.name !== undefined) {
  //   dept = +params.name;
  // }

  let dept = id;
  const theDepartment: any = oldDepartments.filter((department) => {
    return department.id === dept;
  });
  const the_dept = oldDepartments.find((department) => {
    return department.id === dept;
  });
  const staffIds = lecturers.map((lecturer: Lecturer) => {
    return lecturer.id;
  });
  const assignedLecturers = lecturerLoad.filter((load) => {
    return load.staff_id in staffIds;
  });
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

  const lecturerLoads = lecturerLoad.map((load) => {
    if (assignedIds.includes(load.staff_id)) {
      return load.CUs.reduce((a: number, b: number) => a + b, 0);
    } else {
      return null;
    }
  });

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


    // console.log("Id: ", lecturerId)

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
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
              Total Load
            </th>
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-400">
          {/* {clecturerId} */}
          {allData.map((data, index) => (
            <tr key={index}>
              <td className="p-2 text-sm text-gray-700 pl-2 ">{index + 1}</td>
              <td
                className="p-2 text-sm text-gray-700 cursor-pointer"
                onClick={() => lecturerRef.current?.showModal()}
              >
                {data.name}
              </td>
              <td className="p-2 text-sm text-gray-700 ">{data.role}</td>
              <td className="p-2 text-sm text-gray-700 text-center">
                {data.load}
              </td>
              <td className="p-2 text-sm text-gray-700 text-center">
                <span
                  className="text-blue-500 cursor-pointer "
                  onClick={() => toggleModal(data?.id)}
                >
                  View
                </span>
                <span className="ml-2 mr-2 text-green-700 cursor-pointer px-3">
                  Edit
                </span>
                <span className="text-red-500 cursor-pointer">Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog className="lecturer_dialog" ref={lecturerRef}>
        <LecturerDetails id={lecturerId} />
      </dialog>
    </div>
  );
};

export default DepartmentDetails;
