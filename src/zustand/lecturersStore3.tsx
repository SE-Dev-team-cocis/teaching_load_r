import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

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

const url = "http://127.0.0.1:8000/api/getStaff";

const useLecturerStore3 = create((set) => ({
  lecturers: [],
  fetchLecturers: async () => {
    const response = await fetch(url);
    set({ lecturers: response.data.staff });
    // console.log(response.data.staff);
  },
}));

export default useLecturerStore3;
