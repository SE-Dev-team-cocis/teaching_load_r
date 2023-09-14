import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { Lecturer, Load } from "../../zustand/api/apis";
import { useRef, useState } from "react";
import LecturerDetails from "./LecturerDetails";
import UnassignedCourses from "./UnassignedCourses";
import { useAppSelector } from "../../store/hooks";

type DepartmentDetailsProps = {
  id: number;
  closeModal: () => void;
};

const DepartmentDetails = ({ id, closeModal }: DepartmentDetailsProps) => {
  const lecturerRef = useRef<HTMLDialogElement>(null);
  const lecturerRef2 = useRef<HTMLDialogElement>(null);

  //RTK
  const staff = useAppSelector(state=>state.staff.staff)
  const load = useAppSelector((state) => state.load.load);
  // const depts = useAppSelector((state) => state.);

   function closeLecturerModal2() {
     lecturerRef2?.current?.close();
   }


  const closeLecturerModal = () => {
    lecturerRef.current?.close();
  };
  const showLecturerModal = () => {
    lecturerRef.current?.showModal();
  };

  const lecturerLoad = useNewLoadStore21((state) => state.lecturerLoad);

  const lecturers = useNewLoadStore21((state) => state.lecturers);
  const oldDepartments = useNewLoadStore21((state) => state.departments);

  const [lecturerId, setLecturerId] = useState<any>(0);

  function toggleDetailsDialog(lect_id: any, action: number) {
    if(action ===1 ){
      lect_id && lect_id !== undefined && setLecturerId(lect_id);
      showLecturerModal();
    }else{
       lect_id && lect_id !== undefined && setLecturerId(lect_id);
       lecturerRef2?.current?.showModal();
    }
  
  }

  let dept = id;

  // const the_dept = oldDepartments.find((department) => {
  //   return department.id === dept;
  // });

  const the_dept = oldDepartments.find((department: any) => {
    return department.id === dept;
  })


  // const staffIds = lecturers.map((lecturer: Lecturer) => {
  const staffIds = staff?.map((lecturer: Lecturer) => {

    return lecturer.id;
  });

  // const assignedLecturers = lecturerLoad?.filter((load) => {
  const assignedLecturers = load?.filter((load) => {

    return load.staff_id in staffIds;
  });

  const assignedIds = assignedLecturers.map((lecturer) => {
    return lecturer.staff_id;
  });

  // const lecturerDetails = lecturers.map((lecturer: Lecturer) => {
  const lecturerDetails = staff?.map((lecturer: Lecturer) => {

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

  // const lecturerLoads = lecturerLoad?.map((load: Load) => {
  const lecturerLoads = load?.map((load: Load) => {

    if (assignedIds.includes(load.staff_id)) {
      return {
        total: load?.CUs?.reduce((a: number, b: number) => a + b, 0),
        staff_id: load.staff_id,
      };
    } else {
      return null;
    }
  });

  // console.log("Lecturer loads: ", lecturerLoads)

  const allData = assignedDetails
    .map((data, index) => {
      const loads = lecturerLoads.map((load) => {
        if (data?.id === load?.staff_id) {
          return load?.total;
        }
      });
      return {
        id: data?.id,
        name: data?.name,
        role: data?.role,
        department: data?.department,
        load: lecturerLoads
          .map((load) => {
            if (data?.id === load?.staff_id) {
              return load?.total;
            }
          })
          .filter((load) => {
            return load !== undefined;
          }),

      };
    })
    .filter((data) => {
      return data.department === the_dept.department_name;
    });

  return (
    <div className="department_details">
      <p className="m-4 text-center text-2xl">
        {" "}
        Details for {the_dept.department_name} department{" "}
      </p>
      <p
        className=" bg-red-500 text-white text-center w-6 h-6 rounded-full absolute right-4 top-3 hover:scale-105 cursor-pointer"
        onClick={closeModal}
      >
        X
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
              Status
            </th>
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-400">
          {allData?.map((data: any, index) => (
            <tr key={index}>
              <td className="p-2 text-sm text-gray-700 pl-2 ">{index + 1}</td>
              <td
                className="p-2 text-sm text-gray-700 cursor-pointer"
                onClick={() => toggleDetailsDialog(data?.id, 1)}
              >
                {data.name}
              </td>
              <td className="p-2 text-sm text-gray-700 ">{data.role}</td>
              <td className="p-2 text-sm text-gray-700 text-center">
                {data.load}
              </td>

              <td className="p-2 text-sm text-center">
                {data?.load <= 8 ? (
                  <span className="p-1.5 tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">
                    {/* {data.status} */}
                    Underload
                  </span>
                ) : data?.load > 8 && data?.load <= 12 ? (
                  <span className="p-1.5 tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                    {/* {data.status} */}
                    Minumun load
                  </span>
                ) : (
                  <span className="p-1.5 tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                    {/* {data.status} */}
                    Extra load
                  </span>
                )}
              </td>
              <td className="p-2 text-sm text-gray-700 text-center">
                <span
                  className="text-blue-500 cursor-pointer "
                  onClick={() => toggleDetailsDialog(data?.id, 1)}
                >
                  View
                </span>
                <span
                  className="ml-2 mr-2 text-green-700 cursor-pointer px-3"
                  // onClick={() => lecturerRef2.current?.showModal()}
                  onClick={() => toggleDetailsDialog(data?.id, 2)}
                >
                  Edit
                </span>
                <span className="text-red-500 cursor-pointer">Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <dialog
        className="lecturer_dialog outline-none rounded-md"
        ref={lecturerRef}
      >
        <LecturerDetails
          lectID={lecturerId}
          closeModal={closeLecturerModal}
          edit={false}
        />
      </dialog>
      <dialog
        ref={lecturerRef2}
        className="lecturer_dialog outline-none rounded-md"
      >
        <LecturerDetails
          lectID={lecturerId}
          closeModal={closeLecturerModal2}
          edit={true}
        />
      </dialog>
    </div>
  );
};

export default DepartmentDetails;
