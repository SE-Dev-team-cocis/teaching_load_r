import { create } from "zustand";
import axios from "axios";

import { persist, devtools } from "zustand/middleware";

type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: string;
};
type RealCourse = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: string;
  isChecked: boolean;
};

type MyStore = {
  courses: Course[];
  realCourses: RealCourse[];
  fetchCourses: () => void;
  handleCheckedCourse: (id: number) => void;
  filterText: string;
  setFilterText: (text: string) => void;
};

const url = "http://127.0.0.1:8000/api/courseUnits";

// const useLecturerTrialStore = create<MyStore>(persist(
const useCoursesStore = create<MyStore>()(
  persist(
    (set, get) => ({
      courses: [],
      realCourses: [],
      fetchCourses: async () => {
        try {
          const response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
              // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
            },
          });
          const data = response.data.course_units;
          const initialCourses: RealCourse[] = data.map(
            (course: RealCourse) => {
              return { ...course, isChecked: false };
            }
          );

          set({
            courses: response.data.course_units,
            realCourses: initialCourses,
          });
        } catch (err) {
          console.log("Error");
        }
      },
      handleCheckedCourse: (id: number) => {
        const updatedList: RealCourse[] = get().realCourses.map((lecturer) =>
          lecturer.id === id
            ? { ...lecturer, isChecked: !lecturer.isChecked }
            : lecturer
        );
        set({ realCourses: updatedList });
      },
      filterText: "",
      setFilterText(text: string) {
        set({ filterText: text });
      },
    }),
    {
      name: "courses",
    }
  )
);

export default useCoursesStore;
