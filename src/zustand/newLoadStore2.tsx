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

// Types for the central dashboard
export type DepartmentLoad = {
  department_id: number;
  department_name: string;
  min_load: number;
  extra_load: number;
  under_load: number;
};

export type Staff = {
  department: string;
  staff: string;
  sum: number;
};
export type TotalStaff = number;
export type UnallocatedCourses = string[];
export type OverallTotalLoad = {
  min_load: number;
  extra_load: number;
  under_load: number;
};

export type CourseSummary = {
  all_courses: number;
  assigned_courses: number;
};

export type CentralDashboard = {
  count?: number;
  staff: Staff[];
  totalStaff: TotalStaff;
  collegeLoad: OverallTotalLoad;
  departmentLoad: DepartmentLoad[];
  courseSummary: CourseSummary;
  unAllocatedCourses: UnallocatedCourses;
};

// End of central dashboard types

type StoreType = {
  checkedLecturers: CheckedLecturer[];
  setCheckedLecturers: (lecturers: CheckedLecturer[]) => void;
  allCourses: Courses[];
  lecturers: Lecturer[];
  semesterList: any[];
  checkedCourses: CheckedCourses[];
  checkedSemesterList: Courses[];
  lecturerLoad: any[]; // For the specific lecturer load
  departments: any[];
  reassignLecturer: any; // for the lecturer to reassign
  centralDashboard: any; // for the central dashboard

  setCheckedCourses: (courses: CheckedCourses[]) => void;
  setCourses: (courses: Courses[]) => void;
  setLecturers: (courses: Lecturer[]) => void;
  setSemesterList: (courses: any[]) => void;
  setCheckedSemesterList: (courses: CheckedCourses[]) => void;
  setLecturerLoad: (_load: any[]) => void;
  setDepartments: (_department: any[]) => void;
  setReassignLecturer: (_lecturer: any) => void;

  setCentralDashboard: (_dashboard: any) => void;
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
      departments: [],
      reassignLecturer: {},
      centralDashboard: {},
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
      setDepartments: (_department: any[]) => {
        set({
          departments: _department,
        });
      },
      setReassignLecturer: (_lecturer: any) => {
        set({
          reassignLecturer: _lecturer,
        });
      },
      setCentralDashboard: (dashboard: any) => {
        set({ centralDashboard: dashboard,
        });
      },
    }),
    {
      name: "new-assign-rq-store",
    }
  )
);

export default useNewLoadStore21;
