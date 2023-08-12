import { useEffect, useState } from "react";
import Departments from "./charts/Departments";
import TopCharts from "./charts/TopCharts";
import axios from "axios";

const CentralDashboard = () => {
  const [staff, setStaff] = useState([]);
  const [collegeLoad, setCollegeLoad] = useState([]);
  const [departmentLoad, setDepartmentLoad] = useState([]);

  const fetchSummary = async () => {
    const url = "https://teaching-load-api.onrender.com/api/dashboard";
    try {
      const response = await axios.get(url);
      setStaff(response.data?.staff);
      setCollegeLoad(response.data?.overall_total_load);
      setDepartmentLoad(response.data.department_load);

      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);
  console.log(departmentLoad);
  return (
    <div>
      <TopCharts collegeLoad={collegeLoad} />

      <div className="grid grid-cols-12 gap-2 px-5">
        {departmentLoad?.map((department: any) => (
          <div key={department.department} className="col-span-3">
            <Departments department={department} staff={staff} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CentralDashboard;
