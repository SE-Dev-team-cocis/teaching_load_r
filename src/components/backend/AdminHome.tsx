import { useMemo, useState } from "react";
import { User } from "../../zustand/api/apis";
import axios from "axios";

const AdminHome = () => {

  const url = "https://teaching-load-api.onrender.com/api/getStaff"
  const [lecturers, setLecturers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLecturers = async () => {
    try {
      setLoading(true);
      const response = await axios(url);
      // console.log("Response:", response.data)
      setLecturers(response.data.staff);
      // setLoading(false);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  useMemo(()=>{
    fetchLecturers();
  }, [])
  
  return <div>Admin home page</div>;
};

export default AdminHome;
