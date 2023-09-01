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
  const [message, setMessage] = useState()
  
  // const data =  fetchCentralDashboardData();

  // const [count, setCount] = useState(0);

  if(centralDashboard.count){
    console.log("We have count")
    setMessage(centralDashboard?.message)
    // return <p>{centralDashboard.message}</p>
  }

  // console.log("Central dashboard: ", message)
  
  // useMemo(()=>{
  // //  setCentralDashboard(data);
  // }, [])
  return (
    <>
      <p>
        {centralDashboard?.count === 0 ? (
          <p>{centralDashboard.message}</p>
        ) : (
          <div>
            <TopCharts />
            <div className="grid grid-cols-12 gap-2 px-5">
              {centralDashboard?.department_load?.map(
                (department: any, index: number) => (
                  <div key={index} className="col-span-3">
                    <Departments
                      department={department}
                      staff={centralDashboard.staff}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </p>
      {/* {count === 0 ? (<p>{centralDashboard.message}</p>): ""} */}
      {/* {count > 0 ? (
       {centralDashboard?.count === 0 ? ( 
        <p className="text-center mt-10 text-2xl">
          There is currently no broadcast load{" "}
        </p>
      ) : (
        <div>
          <TopCharts />
          <div className="grid grid-cols-12 gap-2 px-5">
            {centralDashboard?.department_load?.map(
              (department: any, index: number) => (
                <div key={index} className="col-span-3">
                  <Departments
                    department={department}
                    staff={centralDashboard.staff}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )} */}
    </>
  );
};

export default CentralDashboard;
