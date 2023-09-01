import {  useState } from "react";
import Departments from "./charts/Departments";
import TopCharts from "./charts/TopCharts";

import useNewLoadStore21 from "../zustand/newLoadStore2";


const CentralDashboard = () => {
 
  const centralDashboard = useNewLoadStore21(state => state.centralDashboard)
  const [message, setMessage] = useState()
  

  if(centralDashboard.count){
    console.log("We have count")
    setMessage(centralDashboard?.message)
    // return <p>{centralDashboard.message}</p>
  }
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
    
    </>
  );
};

export default CentralDashboard;
