
type LecturerDetailsProps = {
    id: number;
}

const LecturerDetails = ({id}:LecturerDetailsProps) => {
  return (
    // <div>LecturerDetails page for staff with id = {id}</div>
       <div className="department_details">
      <p className="m-4 text-center">
       
        Details for {id} lecturer
      </p>
      <table className="w-full border-2 border-b-gray-400">
        <thead className="bg-gray-50 bottom-2 border-gray-200">
          <tr>
{/*             <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-left">
              No.
            </th> */}
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-left">
              Course name
            </th>
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-left">
              Course code
            </th>
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
              Course Credit units
            </th>
            <th className=" w-10 p-2 text-sm font-semibold tracking-wide text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-400">
            <tr>
                <td className="p-2 text-sm text-gray-700 ">Distributed Systems</td>
                  <td className="p-2 text-sm text-gray-700 text-center">
                    BSSE 1234
                  </td>
                <td className="p-2 text-sm text-gray-700 text-center">
                   34
                </td>
            </tr>
            <tr>
                <td className="p-2 text-sm text-gray-700 ">Embedded Systems</td>
                  <td className="p-2 text-sm text-gray-700 text-center">
                    BSSE 12364
                  </td>
                <td className="p-2 text-sm text-gray-700 text-center">
                   12
                </td>
            </tr>
{/*           {allData.map((data, index) => (
            <tr key={index}>
              <td className="p-2 text-sm text-gray-700 pl-2 ">{index + 1}</td>
              <td
                className="p-2 text-sm text-gray-700 cursor-pointer"
                onClick={() => lecturerRef.current?.showModal()}
              >
                {data.name}
              </td>
              <td className="p-2 text-sm text-gray-700 ">{data.role}</td>
              <td className="p-2 text-sm text-gray-700 text-center">
                {data.load}
              </td>
              <td className="p-2 text-sm text-gray-700 text-center">
                <span
                  className="text-blue-500 cursor-pointer "
                  onClick={() => lecturerRef.current?.showModal()}
                >
                  View
                </span>
                <span className="ml-2 mr-2 text-green-700 cursor-pointer px-3">
                  Edit
                </span>
                <span className="text-red-500 cursor-pointer">Delete</span>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
  )
}

export default LecturerDetails
