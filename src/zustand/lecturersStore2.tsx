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
  isChecked: boolean;
};

const useLecturerStore2 = create<{
  lecturers: Lecturer[];
  setLecturers: (lecturers: Lecturer[]) => void;
  // filteredLecturers: Lecturer[];

  filteredLecturers: RealLecturer[];
  // setFilteredLecturers: (lecturers: RealLecturer[]) => void;
  filterText: string;
  setFilterText: (text: string) => void;
  handleCheckedLecturer: (id: number) => void;
  realLecturers: RealLecturer[];
  setRealLecturers: (lecturers: Lecturer[]) => void;
}>((set) => ({
  lecturers: [],
  filteredLecturers: [],
  setLecturers: (lecturers: Lecturer[]) => {
    //Adding the isChecked property to each lecturer
    const myLecturers: RealLecturer[] = lecturers.map((lecturer) => ({
      ...lecturer,
      isChecked: false,
    }));
    // console.log(myLecturers);
    set({
      lecturers: lecturers, // setting the lecturers
      filteredLecturers: myLecturers, // setting the filtered lecturers to be the initial got lecturers
      // realLecturers: myLecturers,
      // lecturers: lecturers, // setting the lecturers
      // filteredLecturers: lecturers, // setting the filtered lecturers to be the initial got lecturers
    });
  }, // Setting both the lecturers and the filtered lecturers to be the same value
  filterText: "",

  setFilterText(text: string) {
    set((state) => ({
      filterText: text, // setting the filter text to be the text we pass in
      // filteredLecturers: state.lecturers.filter((lecturer) => {
      // filteredLecturers: state.realLecturers.filter((lecturer) => {
      //   return text.toLowerCase() === ""
      //     ? lecturer
      //     : lecturer.firstName.toLowerCase().includes(text) ||
      //         lecturer.lastName.toLowerCase().includes(text);
      // }),
      // filteredLecturers: myFilteredLecturers,
    }));
  },
  realLecturers: [],
  // setRealLecturers(lecturers: RealLecturer[]) {
  //   set((state) => ({
  //     realLecturers: state.lecturers.map((lecturer) => ({
  //       ...lecturer,
  //       isChecked: false,
  //     })),
  //   }));
  // },
  handleCheckedLecturer(id: number) {
    // const myCheckedLecturers: RealLecturer[] = this.realLecturers.map(
    //   (lecturer) => {
    //     if (lecturer.id === id) {
    //       return {
    //         ...lecturer,
    //         isChecked: !lecturer.isChecked,
    //       };
    //     }
    //     return lecturer;
    //   }
    // );
    // const updatedList = this.filteredLecturers.map((lecturer) =>
    // const updatedList = this.realLecturers.map((lecturer) =>
    //   lecturer.id === id
    //     ? { ...lecturer, isChecked: !lecturer.isChecked }
    //     : lecturer
    // );
    set((state) => ({
      // filteredLecturers: state.lecturers.map((lecturer) => {
      // filteredLecturers: state.realLecturers.map((lecturer) => {
      // realLecturers: state.realLecturers.map((lecturer) => {

      filteredLecturers: state.realLecturers.map((lecturer) =>
        lecturer.id === id
          ? { ...lecturer, isChecked: !lecturer.isChecked }
          : lecturer
      ),
      realLecturers: state.realLecturers.map((lecturer) =>
        lecturer.id === id
          ? { ...lecturer, isChecked: !lecturer.isChecked }
          : lecturer
      ),

      //   realLecturers: state.realLecturers.map(
      //   (lecturer) => {
      //     if (lecturer.id === id) {
      //       return {
      //         ...lecturer,
      //         isChecked: !lecturer.isChecked,
      //       };
      //     }
      //     return lecturer;
      //   }
      // )
    }));
  },

  setRealLecturers(lecturers: Lecturer[]) {
    const myLecturers: RealLecturer[] = lecturers.map((lecturer) => ({
      ...lecturer,
      isChecked: false,
    }));
    set((state) => ({
      realLecturers: myLecturers,
    }));
  },
}));

export default useLecturerStore2;
