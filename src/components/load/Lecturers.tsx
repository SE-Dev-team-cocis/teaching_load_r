import { ChangeEvent, useState } from "react";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { useMemo } from "react";

type Lecturer = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role: string;
  isChecked: boolean;
};

type LecturersProps = {
  lecturers: Lecturer[];
};

const Lecturers = ({ lecturers }: LecturersProps) => {
  // console.log("Lecturers: ", lecturers);
  const setLecturers = useNewLoadStore21((state) => state.setLecturers);

  const setCheckedLecturers = useNewLoadStore21(
    (state) => state.setCheckedLecturers
  );

  // Getting all the lecturers from the store
  const allLecturers = useNewLoadStore21((state) => state.lecturers);

  useMemo(() => {
    setLecturers(lecturers);
  }, [lecturers]);

  function handleCheckedLecturer(id: number) {
    const newUpdatedLecturers: Lecturer[] = allLecturers.map(
      (lecturer: Lecturer) =>
        lecturer.id === id
          ? { ...lecturer, isChecked: !lecturer.isChecked }
          : lecturer
    );
    setLecturers(newUpdatedLecturers);
    const checkedOnes = newUpdatedLecturers.filter((lecturer) => {
      return lecturer.isChecked === true;
    });

    setCheckedLecturers(checkedOnes); // Setting only the checked lecturers
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
        {/* {updatedLecturers */}
        {allLecturers
          ?.filter((lecturer: Lecturer) => {
            return filterText.toLowerCase() === ""
              ? lecturer
              : lecturer.firstName.toLowerCase().includes(filterText) ||
                  lecturer.lastName.toLowerCase().includes(filterText);
          })
          .map((lecturer: Lecturer) => (
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

export default Lecturers;
