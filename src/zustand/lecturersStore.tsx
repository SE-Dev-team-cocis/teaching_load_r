import { create } from "zustand";
import { persist } from "zustand/middleware";

type Lecturer = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role?: string;
  // isChecked?: boolean;
};

type RealLecturer = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role?: string;
  isChecked?: boolean;
};

// const store =

const url = "http://127.0.0.1:8000/api/getStaff";

const useLecturerStore = create<{
  lecturers: Lecturer[];
  setLecturers: (lecturers: Lecturer[]) => void;
  // filteredLecturers: Lecturer[];

  filteredLecturers: RealLecturer[];

  // setFilteredLecturers: (lecturers: RealLecturer[]) => void;
  filterText: string;
  setFilterText: (text: string) => void;
  handleCheckedLecturer: (id: number) => void;
  realLecturers: RealLecturer[];
  setRealLecturers: (lecturers: RealLecturer[]) => void;
}>(
  persist(
    (set) => ({
      lecturers: [],
      // otherLecturers: [],
      // fetchLecturers: async (url) => {
      //   const response = await fetch(url);
      //   set({ otherLecturers: response.data.staff });
      //   // console.log(response.data.staff);
      // },
      setLecturers: (lecturers: Lecturer[]) => {
        // Adding the isChecked property to each lecturer
        const myLecturers: RealLecturer[] = lecturers.map((lecturer) => ({
          ...lecturer,
          isChecked: false,
        }));
        set((state) => ({
          // lecturers: lecturers, // setting the lecturers
          // lecturers: myLecturers, // setting the lecturers
          filteredLecturers: myLecturers,
          realLecturers: myLecturers,
          // filteredLecturers: lecturers,
        }));
      }, // Setting both the lecturers and the filtered lecturers to be the same value
      filterText: "",
      filteredLecturers: [],
      setFilterText(text: string) {
        const myFilteredLecturers: RealLecturer[] = this.realLecturers.filter(
          (lecturer) => {
            return text.toLowerCase() === ""
              ? lecturer
              : lecturer.firstName.toLowerCase().includes(text) ||
                  lecturer.lastName.toLowerCase().includes(text);
          }
        );
        set((state) => ({
          filterText: text, // setting the filter text to be the text we pass in
          filteredLecturers: myFilteredLecturers,
        }));
      },
      realLecturers: [],
      setRealLecturers(lecturers: RealLecturer[]) {
        set((state) => ({
          realLecturers: state.lecturers.map((lecturer) => ({
            ...lecturer,
            isChecked: false,
          })),
        }));
      },
      handleCheckedLecturer(id: number) {
        const myCheckedLecturers: RealLecturer[] = this.realLecturers.map(
          (lecturer) => {
            if (lecturer.id === id) {
              return {
                ...lecturer,
                isChecked: !lecturer.isChecked,
              };
            }
            return lecturer;
          }
        );
        set((state) => ({
          // filteredLecturers: state.lecturers.map((lecturer) => {
          // filteredLecturers: state.realLecturers.map((lecturer) => {
          // realLecturers: state.realLecturers.map((lecturer) => {
          filteredLecturers: myCheckedLecturers,
        }));
      },
    }),
    { name: "lecturers" }
  )
);

export default useLecturerStore;
