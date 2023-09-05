import { ChangeEvent, useState, useMemo, memo } from "react";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { Lecturer } from "../../zustand/api/apis";
import useUserstore from "../../zustand/userStore";

type LecturersProps = {
  lecturers: Lecturer[];
};

// const Lecturers = ({ lecturers }: LecturersProps) => {
const Lecturers = () => {
  const userDepartment = useUserstore((state) => state.user.department);
  // console.log("User department: ", userDepartment)

  const setLecturers = useNewLoadStore21((state) => state.setLecturers);
  const allLecturers = useNewLoadStore21((state) => state.lecturers);
  const setCheckedLecturers = useNewLoadStore21(
    (state) => state.setCheckedLecturers
  );

  // console.log(allLecturers)
  // let myLecturers: Lecturer[] = lecturers;

  // useMemo(() => {
  //   setLecturers(myLecturers);
  // }, [myLecturers]);

  function handleCheckedLecturer(id: number) {
    // console.log(id);

    const newUpdatedLecturers: Lecturer[] = allLecturers.map(
      (lecturer: Lecturer) => {
        if (lecturer.id === id) {
          return { ...lecturer, isChecked: !lecturer.isChecked };
        } else {
          return { ...lecturer, isChecked: false };
        }
      }
    );

    const newCheckedLecturers = allLecturers.filter((lecturer: Lecturer) => {
      return lecturer.isChecked === true;
    });
    setLecturers(newUpdatedLecturers);
    // console.log("new updated lecturers", newCheckedLecturers);

    setCheckedLecturers(newCheckedLecturers);
  }
  const [filterText, setFilterText] = useState("");

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
        {/* {allLecturers?.filter((lecturer) => {
            return lecturer.department === userDepartment;
        }) */}
        {allLecturers
          .filter((lecturer) => {
            return filterText.toLowerCase() === ""
              ? lecturer
              : lecturer.firstName.toLowerCase().includes(filterText) ||
                  lecturer.lastName.toLowerCase().includes(filterText);
          })
          .map((lecturer, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                className="mr-3 ml-2 h-4.5 w-4.5 text-green-700 cursor-pointer border-2 focus:bg-green-700 focus:ring-green-700 rounded-full"
                name="lecturer"
                checked={lecturer.isChecked}
                value={lecturer.id}
                onChange={() => handleCheckedLecturer(lecturer.id)}
              />
              {lecturer?.firstName} {lecturer?.lastName}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Lecturers;
