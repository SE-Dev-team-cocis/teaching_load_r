import { useEffect, useMemo, useState } from "react";
import Departments from "./charts/Departments";
import TopCharts from "./charts/TopCharts";
import axios from "axios";
import useNewLoadStore21 from "../zustand/newLoadStore2";
import { fetchCentralDashboardData } from "../functions/Functions";

const CentralDashboard = () => {
  const setCentralDashboard = useNewLoadStore21(
    (state) => state.setCentralDashboard
  );

  const centralDashboard = useNewLoadStore21(state => state.centralDashboard)
  const [count, setCount] = useState(0);
  // const [staff, setStaff] = useState([]);
  // const [totalStaff, setTotalStaff] = useState([]);

  // const [collegeLoad, setCollegeLoad] = useState({});
  // const [departmentLoad, setDepartmentLoad] = useState([]);
  // const [courseSummary, setCourseSummary] = useState({});

  // const fetchSummary = async () => {
  //   try {
  //     const url = "https://teaching-load-api.onrender.com/api/dashboard";
  //     const response = await axios.get(url);
  //     // console.log(response.data)
  //     const loadCount = response.data?.count;
  //     if (loadCount === 0) {
  //       setCount(loadCount);
  //       return <p>{response.data.message}</p>;
  //     }

  //     // console.log("Central dashboard response: ", response.data);

  //     setStaff(response.data?.staff);
  //     setTotalStaff(response?.data?.total_staff);

  //     setCollegeLoad(response?.data?.overall_total_load);
  //     setDepartmentLoad(response?.data?.department_load);
  //     setCourseSummary(response.data?.course_summary);

  //     // console.log("Department load: ", departmentLoad)

  //     // setCentralDashboard(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   // fetchCentralDashboardData();
  //   // fetchSummary();
  // }, []);
  useEffect(()=>{
      fetchCentralDashboardData();
  }, [])
  return (
    <>
      {count > 0 ? (
        <p className="text-center mt-10 text-2xl">
          There is currently no broadcast load{" "}
        </p>
      ) : (
        <div>
          {/* <TopCharts
            collegeLoad={collegeLoad}
            totalStaff={totalStaff}
            courseSummary={courseSummary}
          /> */}
          <TopCharts />
          <div className="grid grid-cols-12 gap-2 px-5">
            {/* {departmentLoad?.map((department: any, index: number) => ( */}
            {centralDashboard.department_load?.map((department: any, index: number) => (

              <div key={index} className="col-span-3">
                <Departments department={department} staff={centralDashboard.staff} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CentralDashboard;
