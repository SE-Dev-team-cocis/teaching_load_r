import axios from "axios";
import useNewLoadStore21 from "../zustand/newLoadStore2";
import { errorNotification } from "../components/utilities/toastify/Toastify";
import { useState } from "react";


export const fetchCentralDashboardData = async () => {
    const setCentralDashboard = useNewLoadStore21(state => state.setCentralDashboard)
    const [data, setData] = useState();
    //  try {
      // const url = "https://teaching-load-api.onrender.com/api/dashboard";

       const url =
        "https://teachingloadfive-82f4e24a-6a04-4f8b-8cae.cranecloud.io/api/dashboard";
      const response = await axios.get(url);

      // console.log(response.data)

      const loadCount = response.data?.count;
      if (loadCount === 0) {
        // setCount(loadCount);
        // return (<p>{response.data.message}</p>);
        errorNotification(response.data.message)
        // return response.data
        setData(response.data)
      }else {
        // console.log("Central dashboard response: ", response.data);
        // setCentralDashboard(response?.data);
        // return response?.data
        setData(response.data)
      }
      return data
     
    // } catch (error) {
    //   console.error(error);
    // }

}