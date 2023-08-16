import DepartmentChart from "./DepartmentChart";

const Departments = ({ department, staff }: any) => {
  const data = [
    department.min_load,
    department.extra_load,
    department.under_load,
  ];

  // console.log(department, staff)
  return (
    <div className="rounded-lg p-2 col-span-3 department">
      <div className="">
        <div className="summary">
          <p className="text-center font-semibold text-lg mb-2 text-gray-800">
            {department.department_name}
          </p>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-600">Lecturer</p>
            <p className="font-semibold text-gray-600">Total load</p>
          </div>
          <div className="list">
            {staff?.map((staffMember: any, index: number) => {
              if (staffMember.deparment === department.department_name) {
                // {console.log("match", staffMember.staff)}
                return (
                  <div className="flex justify-between" key={index}>
                    <p>{staffMember.staff}</p>
                    <p className="mr-4">{staffMember.sum}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="details mt-2">
          <p>View details</p>
        </div>
        <div className="chart mt-2 text-center below-chart">
          <p className="pt-2">No. of lecturers Vs Total load</p>
          <DepartmentChart data={data} />
          {/* <p>Min load: {department.min_load}</p>
          <p className="mr-4">Extra load: {department.extra_load}</p>
          <p className="mr-4">Under load: {department.under_load}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Departments;
