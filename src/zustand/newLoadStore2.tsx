import { create } from "zustand";
import { persist } from "zustand/middleware";

type CheckedLecturer = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role: string;
  isChecked: boolean;
};
type Lecturer = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role: string;
  isChecked: boolean;
};

type CheckedCourses = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  isChecked: boolean;
};

type Courses = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  isChecked: boolean;
};

type StoreType = {
  checkedLecturers: CheckedLecturer[];
  setCheckedLecturers: (lecturers: CheckedLecturer[]) => void;
  allCourses: Courses[];
  lecturers: Lecturer[];
  checkedCourses: CheckedCourses[];
  setCheckedCourses: (courses: CheckedCourses[]) => void;
  setCourses: (courses: Courses[]) => void;
  setLecturers: (courses: Lecturer[]) => void;
  // fetchLecturers: () => void;
};
const useNewLoadStore21 = create<StoreType>()(
  persist(
    (set, get) => ({
      allCourses: [],
      lecturers: [],
      checkedCourses: [],
      checkedLecturers: [],
      setCourses: (courses: Courses[]) => {
        set({ allCourses: courses });
      },
      setLecturers: (lecturers: Lecturer[]) => {
        set({ lecturers: lecturers });
      },
      setCheckedLecturers: (lecturers: CheckedLecturer[]) => {
        const checkedOnes: CheckedLecturer[] = lecturers.filter(
          (lecturer) => lecturer.isChecked
        );
        set({ checkedLecturers: checkedOnes });
      },
      setCheckedCourses: (lecturers: CheckedCourses[]) => {
        const checkedOnes: CheckedCourses[] = lecturers.filter(
          (lecturer) => lecturer.isChecked
        );
        set({ checkedCourses: checkedOnes });
      },
    }),
    {
      name: "new-assign-rq-store",
    }
  )
);

export default useNewLoadStore21;
