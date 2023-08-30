import { useMemo, useState } from "react";
import { Lecturer, User } from "../../zustand/api/apis";
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
  
  return (
  <div className="p-4">
        <table className="w-full border-2 border-b-gray-400 rounded">
            <thead className="bg-gray-50 bottom-2 border-gray-200">
              <tr>
                <th className="w-10 p-2 text-sm font-semibold tracking-wide text-left">
                  No.
                </th>
                <th className=" w-20 p-2 text-sm font-semibold tracking-wide text-left">
                  Name
                </th>
                <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-left">
                 Role
                </th>
                <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-left">
                 Department
                </th>
{/*                 <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-400">
              {lecturers.map((lecturer: any, index) => (
                <tr key={index} className="hover:bg-green-400 hover:bg-opacity-20">
                  <td className="p-2 text-sm text-gray-700 text-left">
                    {index + 1}
                  </td>
                  <td className="p-2 text-sm text-gray-700 text-left">
                    {lecturer.firstName} {lecturer.lastName}
                  </td>
                  <td className="p-2 text-sm text-gray-700 text-left">
                    {lecturer.role}
                  </td>
                  <td className="p-2 text-sm text-gray-700 text-left">
                    {lecturer.department}
                  </td>
                  {/* <td className="p-2 text-sm text-gray-700 text-center">
                    Delete
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
  </div>);
};

export default AdminHome;
