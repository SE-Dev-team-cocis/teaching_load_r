import { create } from "zustand";

type Lecturer = {
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
  setFilterText: (text: string) => void;
  handleCheckedLecturer: (id: number) => void;
}>((set) => ({
  lecturers: [],
  setLecturers: (lecturers: Lecturer[]) =>
    set({ lecturers, filteredLecturers: lecturers }), // Setting both the lecturers and the filtered lecturers to be the same value
  filterText: "",
  filteredLecturers: [],
  setFilterText(text: string) {
    set((state) => ({
      filterText: text, // setting the filter text to be the text we pass in
      filteredLecturers: state.lecturers.filter((lecturer) => {
        // filtering the lecturers array
        lecturer.firstName.toLowerCase().includes(text) ||
          lecturer.firstName.toLowerCase().includes(text);
      }),
    }));
  },
  handleCheckedLecturer(id: number) {
    set((state) => ({
      filteredLecturers: state.filteredLecturers.map((lecturer) => {
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
