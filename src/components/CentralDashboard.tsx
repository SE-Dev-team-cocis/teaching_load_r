import { useState } from "react";
import Departments from "./charts/Departments";
import TopCharts from "./charts/TopCharts";

import useNewLoadStore21 from "../zustand/newLoadStore2";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const CentralDashboard = () => {
  const centralDashboardData = useAppSelector(
    (state) => state.dashboard.allData
  );

  console.log("Central dashboard data: ", centralDashboardData)

  //const url = "https://teachingloadfive-82f4e24a-6a04-4f8b-8cae.cranecloud.io/api/department";


  const centralDashboard = useNewLoadStore21((state) => state.centralDashboard);
  const [message, setMessage] = useState();

  if (centralDashboard?.count) {
    // console.log("We have count");
    setMessage(centralDashboard?.message);
    // return <p>{centralDashboard.message}</p>
  }


  //  const lecturerId = useAppSelector(
  //    (state) => state.dashboard.allData
  //  );

  //  console.log("Lecturer id: ", lecturerId);
  return (
    
      <section>
        {centralDashboard?.count === 0 ? (
          <section className="flex flex-col items-center">
            <p className="text-center mt-11 text-2xl">
              {centralDashboard.message}
              {/* There is currently no broadcast load */}
            </p>

            <p className="">
              <button className="bg-green-700 text-white px-4 py-2 rounded-md mt-3 hover:scale-105 duration-100">
                <Link to="/teaching-load/new">Create Load</Link>
              </button>
            </p>
          </section>
        ) : (
          <div>
            <TopCharts />
            <div className="grid grid-cols-12 gap-2 px-5">
              {centralDashboardData?.department_load?.map(
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
      </section>

  );
};

export default CentralDashboard;
