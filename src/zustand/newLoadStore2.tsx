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

export type LecturerLoad = {
  total: number;
  id: number;
  staffId: number;
  staffName: Lecturer;
  assignee_id: number;
};

type StoreType = {
  checkedLecturers: CheckedLecturer[];
  setCheckedLecturers: (lecturers: CheckedLecturer[]) => void;
  allCourses: Courses[];
  lecturers: Lecturer[];
  semesterList: any[];
  checkedCourses: CheckedCourses[];
  checkedSemesterList: Courses[];
  lecturerLoad: any[]; // For the specific lecturer load

  setCheckedCourses: (courses: CheckedCourses[]) => void;
  setCourses: (courses: Courses[]) => void;
  setLecturers: (courses: Lecturer[]) => void;
  setSemesterList: (courses: any[]) => void;
  setCheckedSemesterList: (courses: CheckedCourses[]) => void;
  setLecturerLoad: (_load: any[]) => void;
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
      lecturerLoad: [],
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
      setSemesterList: (courses: any[]) => {
        set({ semesterList: courses });
      },
      setCheckedSemesterList: (courses: CheckedCourses[]) => {
        const checkedOnes: CheckedCourses[] = courses.filter(
          (course) => course.isChecked
        );
        set({ checkedSemesterList: checkedOnes });
      },
      setLecturerLoad: (_load: any[]) => {
        set({
          lecturerLoad: _load,
        });
      },
    }),
    {
      name: "new-assign-rq-store",
    }
  )
);

export default useNewLoadStore21;
