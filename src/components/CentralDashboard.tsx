import { useEffect, useMemo, useState } from "react";
import Departments from "./charts/Departments";
import TopCharts from "./charts/TopCharts";
import axios from "axios";

const CentralDashboard = () => {
  const [count, setCount] = useState(0);
  const [staff, setStaff] = useState([]);
  const [totalStaff, setTotalStaff] = useState([]);

  const [collegeLoad, setCollegeLoad] = useState({});
  const [departmentLoad, setDepartmentLoad] = useState([]);

  const fetchSummary = async () => {
    try {
      const url = "https://teaching-load-api.onrender.com/api/dashboard";
      const response = await axios.get(url);

      // console.log(response?.data?.overall_total_load);
      if (response.data?.count === 0) {
        setCount(1);
        return <p>{response.data.message}</p>;
      }
      setStaff(response.data?.staff);
      setTotalStaff(response?.data?.total_staff);

      setCollegeLoad(response?.data?.overall_total_load);
      setDepartmentLoad(response?.data?.department_load);

      // console.log(totalStaff);
      console.log(departmentLoad);
    } catch (error) {
      console.error(error);
    }
  };

  useMemo(() => {
    fetchSummary();
  }, []);
  console.log(count);
  return (
    <>
      {count === 1 ? (
        <p className="text-center mt-10 text-2xl">
          There is currently no broadcast load{" "}
        </p>
      ) : (
        <div>
          <TopCharts collegeLoad={collegeLoad} totalStaff={totalStaff} />
          <div className="grid grid-cols-12 gap-2 px-5">
            {departmentLoad?.map((index: number, department: any) => (
              <div key={index} className="col-span-3">
                <Departments department={department} staff={staff} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CentralDashboard;
