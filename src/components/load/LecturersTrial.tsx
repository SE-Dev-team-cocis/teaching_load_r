import { ChangeEvent, useEffect } from "react";
import useLecturerTrialStore from "../../zustand/lecturerTrialStore";

type Lecturer = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role?: string;
  isChecked?: boolean;
};

const LecturersTrial = () => {
  const {
    fetchLecturers,
    mylecturers,
    myrealLecturers,
    myfilterText,
    setMyFilterText,
    handleCheckedLecturer,
  } = useLecturerTrialStore();

  useEffect(() => {
    console.log("Fetching data...");
    fetchLecturers();
  }, []);

  // console.log("My new zustand real lecturers", myrealLecturers);

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
        value={myfilterText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMyFilterText(e.target.value)
        }
      />

      <div className="list">
        {myrealLecturers
          .filter((lecturer) => {
            return myfilterText.toLowerCase() === ""
              ? lecturer
              : lecturer.firstName.toLowerCase().includes(myfilterText) ||
                  lecturer.lastName.toLowerCase().includes(myfilterText);
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
    </div>
  );
};

export default LecturersTrial;
