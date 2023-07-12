import axios from "axios";
import { ChangeEvent, useEffect } from "react";
import useLecturerStore from "../../zustand/lecturersStore2";

type Lecturer = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role?: string;
  isChecked?: boolean;
};

const Lecturers = () => {
  const {
    filterText,
    setFilterText,
    lecturers,
    setLecturers,
    filteredLecturers,
    // filteredLecturers,
    handleCheckedLecturer,
    realLecturers,

    setRealLecturers,
  } = useLecturerStore();

  const url = "http://127.0.0.1:8000/api/getStaff";

  const getStaff = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
        },
      });
      setLecturers(response.data.staff); // setting the lecturers using zustand
      setRealLecturers(response.data.staff); // setting the real lecturers using zustand
    } catch (err) {
      console.log("Error");
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  console.log("Other lecturers", lecturers);

  return (
    <div className="card p-3 bg-white ml-3 rounded-lg ">
      <p className="text-xl font-semibold">Lecturers</p>
      <input
        type="text"
        placeholder="Search for lecturer here..."
        className="
          focus:outline-none
          focus:ring-1
          focus:ring-green-700
          py-2
          px-4
          border
          border-gray
          focus:border-teal-500
          w-full
          rounded my-3"
        value={filterText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFilterText(e.target.value)
        }
      />

      <div className="list">
        {realLecturers
          .filter((lecturer) => {
            return filterText.toLowerCase() === ""
              ? lecturer
              : lecturer.firstName.toLowerCase().includes(filterText) ||
                  lecturer.lastName.toLowerCase().includes(filterText);
          })
          .map((lecturer) => (
            <p key={lecturer.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-3 ml-2 h-4 w-4 text-green-700 border-2 focus:bg-green-700 focus:ring-green-700 rounded"
                name="lecturers[]"
                checked={lecturer.isChecked}
                value={lecturer.id}
                onChange={() => handleCheckedLecturer(lecturer.id)}
              />
              {lecturer.firstName} {lecturer.lastName}
            </p>
          ))}
      </div>

      {/* Trial 2 */}

      {/* <div className="list">
        {filteredLecturers.map((lecturer) => (
          // {realLecturers.map((lecturer) => (
          <p key={lecturer.id} className="flex items-center">
            <input
              type="checkbox"
              className="mr-3 ml-2 h-3 w-3 text-green-700 border-2 focus:bg-green-700 focus:ring-green-700 rounded"
              name="lecturers[]"
              checked={lecturer.isChecked}
              value={lecturer.id}
              onChange={() => handleCheckedLecturer(lecturer.id)}
            />
            {lecturer.firstName} {lecturer.lastName}
          </p>
        ))}
      </div> */}

      {/* Trial 1 */}

      {/* <div className="list">
        {lecturers
          .filter((lecturer) => {
            return filterText.toLowerCase() === ""
              ? lecturer
              : lecturer.firstName.toLowerCase().includes(filterText) ||
                  lecturer.lastName.toLowerCase().includes(filterText);
          })
          .map((lecturer) => (
            <p key={lecturer.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-3 ml-2 h-3 w-3 text-green-700 border-2 focus:bg-green-700 focus:ring-green-700 rounded"
                name="lecturers[]"
                checked={lecturer.isChecked}
                value={lecturer.id}
                onChange={() => handleCheckBoxChange(lecturer.id)}
              />
              {lecturer.firstName} {lecturer.lastName}
            </p>
          ))}
      </div> */}
    </div>
  );
};

export default Lecturers;
