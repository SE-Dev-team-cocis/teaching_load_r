import { ChangeEvent, useState, useMemo, memo } from "react";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { Lecturer } from "../../zustand/api/apis";

type LecturersProps = {
  lecturers: Lecturer[];
};

const Lecturers = ({ lecturers }: LecturersProps) => {
  const setLecturers = useNewLoadStore21((state) => state.setLecturers);
  const allLecturers = useNewLoadStore21((state) => state.lecturers);
  const setCheckedLecturers = useNewLoadStore21((state) => state.setCheckedLecturers)
  let myLecturers: Lecturer[] = lecturers;

  useMemo(() => {
    setLecturers(myLecturers);
  }, [myLecturers]);

  function handleCheckedLecturer(id: number) {
    const newUpdatedLecturers: Lecturer[] = myLecturers.map(
      (lecturer: Lecturer) =>
        lecturer.id === id
          ? { ...lecturer, isChecked: !lecturer.isChecked }
          : lecturer
    );
    setLecturers(newUpdatedLecturers);

    const newCheckedLecturers: Lecturer[] = newUpdatedLecturers.filter((lecturer: Lecturer) => lecturer.isChecked === true)
    setCheckedLecturers(newCheckedLecturers)
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
        {allLecturers
          ?.filter((lecturer) => {
            return filterText.toLowerCase() === ""
              ? lecturer
              : lecturer.firstName.toLowerCase().includes(filterText) ||
                  lecturer.lastName.toLowerCase().includes(filterText);
          })
          .map((lecturer) => (
            <p key={lecturer.id} className="flex items-center">
              <input
                type="radio"
                className="mr-3 ml-2 h-4.5 w-4.5 text-green-700 cursor-pointer border-2 focus:bg-green-700 focus:ring-green-700 rounded-full"
                name="lecturers"
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

export default memo(Lecturers);
