import { Link } from "react-router-dom";
import DepartmentChart from "./DepartmentChart";

const Departments = ({ department, staff }: any) => {
  const data = [
    department.min_load,
    department.extra_load,
    department.under_load,
  ];
  const available =
    data[0] === 0 && data[1] === 0 && data[2] === 0 ? false : true;
  console.log(department);

  // console.log(department, staff)
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
            <div className="list">
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
          </div>
          <div className="details mt-2">
            <p>
              <Link to={`${department.department_name}`}>View details </Link>
            </p>
          </div>
          <div className="chart mt-2 text-center below-chart">
            <p className="pt-2">No. of lecturers Vs Total load</p>
            <DepartmentChart data={data} />
          </div>
        </div>
      ) : (
        <p className="text-center">
          {" "}
          There is currently no available broadcast load in this department
        </p>
      )}
    </div>
  );
};

export default Departments;
