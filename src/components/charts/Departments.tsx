import { Link } from "react-router-dom";
import { useRef } from "react";
import DepartmentChart from "./DepartmentChart";
import DepartmentDetails from "../load/DepartmentDetails";

const Departments = ({ department, staff }: any) => {
  const detailsRef = useRef<HTMLDialogElement>(null)
  const data = [
    department.min_load,
    department.extra_load,
    department.under_load
  ];
  const available =
    data[0] === 0 && data[1] === 0 && data[2] === 0 ? false : true;

  return (
    <div className="rounded-lg p-2 col-span-3 department">
      <p className="text-center font-semibold text-lg mb-2 text-gray-800">
        {department.department_name}
      </p>
      {available ? (
        <div className="">
          <div className="summary">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-600">Lecturer</p>
              <p className="font-semibold text-gray-600">Total load</p>
            </div>
            <div
              className="list"
              style={{ height: 160, overflowY: "auto", overflowX: "hidden" }}
            >
              {staff?.map((staffMember: any, index: number) => {
                if (staffMember.deparment === department.department_name) {
                  return (
                    <div className="flex justify-between " key={index}>
                      <p>{staffMember.staff}</p>
                      <p className="mr-4">{staffMember.sum}</p>
                    </div>
                  );
                }
              })}
            </div>
            <p>
              {/* <Link to={`${department.department_name}`}>View details </Link> */}
              {/* <Link
                to={`${department.department_id}`}
                className="bg-green-700 px-3 py-1 text-white"
              >
                View details{" "}
              </Link> */}
              <button
                // to={`${department.department_id}`}
                className="bg-green-700 px-3 py-1 text-white outline-none rounded"
                onClick={() => {
                  detailsRef.current?.showModal();
                }}
              >
                View details{" "}
              </button>
            </p>
            {/* </dialog> */}
          </div>

          <div className="chart mt-2 text-center below-chart">
            <p className="pt-2">No. of lecturers Vs Total load</p>
            <DepartmentChart data={data} />
          </div>

          <dialog className=" department_dialog mydialog rounded-md outline-none" ref={detailsRef}>
            {/* This is my modal */}
            <DepartmentDetails id={department.department_id} />
          </dialog>
        </div>
      ) : (
        <p className="text-center">
          There is currently no available broadcast load in this department
        </p>
      )}
    </div>
  );
};

export default Departments;
