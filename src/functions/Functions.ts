import axios from "axios";
import useNewLoadStore21 from "../zustand/newLoadStore2";


export const fetchCentralDashboardData = async () => {
    const setCentralDashboard = useNewLoadStore21(state => state.setCentralDashboard)
     try {
      const url = "https://teaching-load-api.onrender.com/api/dashboard";
      const response = await axios.get(url);

    //   const loadCount = response.data?.count;
    //   if (loadCount === 0) {
    //     setCount(loadCount);
    //     return <p>{response.data.message}</p>;
    //   }
    //   console.log("Central dashboard response: ", response.data);
      setCentralDashboard(response?.data);
    } catch (error) {
      console.error(error);
    }
}