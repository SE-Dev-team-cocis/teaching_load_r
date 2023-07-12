import React from "react";
import useLecturerStore3 from "../zustand/lecturersStore3";

const NewHome = () => {
  const { fetchLecturers } = useLecturerStore3((state) => state.fetchLecturers);
  fetchLecturers();

  const lecturers = useLecturerStore3((state) => state.lecturers);
  console.log("Lecturers: ", lecturers);
  return <div>NewHome</div>;
};

export default NewHome;
