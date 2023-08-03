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
  semesterList: Courses[];
  checkedCourses: CheckedCourses[];
  checkedSemesterList: Courses[];

  setCheckedCourses: (courses: CheckedCourses[]) => void;
  setCourses: (courses: Courses[]) => void;
  setLecturers: (courses: Lecturer[]) => void;
  setSemesterList: (courses: Courses[]) => void;
  setCheckedSemesterList: (courses: CheckedCourses[]) => void;
};
const useNewLoadStore21 = create<StoreType>()(
  persist(
    (set) => ({
      allCourses: [],
      lecturers: [],
      checkedCourses: [],
      checkedLecturers: [],
      semesterList: [],
      checkedSemesterList: [],
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
      setCheckedCourses: (courses: CheckedCourses[]) => {
        const checkedOnes: CheckedCourses[] = courses.filter(
          (course) => course.isChecked
        );
        set({ checkedCourses: checkedOnes });
      },
      setSemesterList: (courses: Courses[]) => {
        set({ semesterList: courses });
      },
      setCheckedSemesterList: (courses: CheckedCourses[]) => {
        const checkedOnes: CheckedCourses[] = courses.filter(
          (course) => course.isChecked
        );
        set({ checkedSemesterList: checkedOnes });
      },
    }),
    {
      name: "new-assign-rq-store",
    }
  )
);

export default useNewLoadStore21;
