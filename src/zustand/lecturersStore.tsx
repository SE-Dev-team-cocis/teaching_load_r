import { create } from "zustand";

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
}>((set) => ({
  lecturers: [],
  setLecturers: (lecturers: Lecturer[]) => {
    // Adding the isChecked property to each lecturer
    const myLecturers: RealLecturer[] = lecturers.map((lecturer) => ({
      ...lecturer,
      isChecked: false,
    }));
    set({
      lecturers: lecturers, // setting the lecturers
      // lecturers: myLecturers, // setting the lecturers
      filteredLecturers: myLecturers,
      realLecturers: myLecturers,
      // filteredLecturers: lecturers,
    });
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
}));

export default useLecturerStore;
