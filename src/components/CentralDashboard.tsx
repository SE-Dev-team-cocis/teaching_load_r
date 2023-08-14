import { useEffect, useMemo, useState } from "react";
import Departments from "./charts/Departments";
import TopCharts from "./charts/TopCharts";
import axios from "axios";

const CentralDashboard = () => {
  const [staff, setStaff] = useState([]);
  const [totalStaff, setTotalStaff] = useState([]);

  const [collegeLoad, setCollegeLoad] = useState({});
  const [departmentLoad, setDepartmentLoad] = useState([]);

  const fetchSummary = async () => {
    try {
      const url = "https://teaching-load-api.onrender.com/api/dashboard";
      const response = await axios.get(url);
      setStaff(response.data?.staff);
      setTotalStaff(response?.data?.total_staff);

      setCollegeLoad(response?.data?.overall_total_load);
      setDepartmentLoad(response?.data?.department_load);

      console.log(totalStaff);
    } catch (error) {
      console.error(error);
    }
  };

  useMemo(() => {
    fetchSummary();
  }, []);
  console.log(collegeLoad);
  return (
    <div>
      <TopCharts collegeLoad={collegeLoad} totalStaff={totalStaff} />

      <div className="grid grid-cols-12 gap-2 px-5">
        {departmentLoad?.map((department: any) => (
          <div key={department.department_department_name} className="col-span-3">
            <Departments department={department} staff={staff} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CentralDashboard;
