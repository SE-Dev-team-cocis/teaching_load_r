import { useMemo, useState } from "react";
import { CollegeType } from "./functions/BackendSchemas";
import axios from "axios";

const Colleges = () => {

    const url =
    "https://teachingloadfive-82f4e24a-6a04-4f8b-8cae.cranecloud.io/api/college";

  const [colleges, setColleges] = useState<CollegeType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const response = await axios(url);
      setColleges(response.data.colleges);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useMemo(() => {
    fetchColleges();
  }, []);
  return (
    <section className="mt-4 px-4">
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
                College Code 
            </th>
            {/*                 <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
                  Action
                </th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-400">
          {colleges?.map((college: any, index) => (
            <tr key={index} className="hover:bg-green-400 hover:bg-opacity-20">
              <td className="p-2 text-sm text-gray-700 text-left">
                {index + 1}
              </td>
              <td className="p-2 text-sm text-gray-700 text-left">
                {college.college_name}
              </td>
           
              <td className="p-2 text-sm text-gray-700 text-left">
                {college.college_code}
              </td>
              {/* <td className="p-2 text-sm text-gray-700 text-center">
                    Delete
                  </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Colleges