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
  filteredLecturers: Lecturer[];
  filterText: string;
  setFilterText: (text: string, realLecturers: RealLecturer[]) => void;
  handleCheckedLecturer: (id: number) => void;
  realLecturers: RealLecturer[];
  setRealLecturers: (lecturers: RealLecturer[]) => void;
}>((set) => ({
  lecturers: [],
  setLecturers: (lecturers: Lecturer[]) => {
    const myLecturers: RealLecturer[] = lecturers.map((lecturer) => ({
      ...lecturer,
      isChecked: false,
    }));
    set({
      lecturers,
      filteredLecturers: myLecturers,
      realLecturers: myLecturers,
      // filteredLecturers: lecturers,
    });
  }, // Setting both the lecturers and the filtered lecturers to be the same value
  filterText: "",
  filteredLecturers: [],
  setFilterText(text: string, realLecturers: RealLecturer[]) {
    const myFilteredLecturers: RealLecturer[] = realLecturers.filter(
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
    set((state) => ({
      // filteredLecturers: state.lecturers.map((lecturer) => {
      // filteredLecturers: state.realLecturers.map((lecturer) => {
      // realLecturers: state.realLecturers.map((lecturer) => {
      filteredLecturers: state.realLecturers.map((lecturer) => {
        if (lecturer.id === id) {
          return {
            ...lecturer,
            isChecked: !lecturer.isChecked,
          };
        }
        return lecturer;
      }),
    }));
  },
}));

export default useLecturerStore;
