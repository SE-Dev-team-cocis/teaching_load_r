import { create } from "zustand";
import axios from "axios";

import { persist } from "zustand/middleware";

type Lecturer = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role: string;
};
type RealLecturer = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role: string;
  isChecked: boolean;
};

type MyStore = {
  mylecturers: Lecturer[];
  myrealLecturers: RealLecturer[];
  fetchLecturers: () => void;
  handleCheckedLecturer: (id: number) => void;
  myfilterText: string;
  setMyFilterText: (text: string) => void;
};

const url = "http://127.0.0.1:8000/api/getStaff";

const useLecturersStore = create<MyStore>()(
  persist(
    (set, get) => ({
      mylecturers: [],
      myrealLecturers: [],
      fetchLecturers: async () => {
        try {
          const response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
              // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
            },
          });
          const data = response.data.staff;
          const initialRealLecturers: RealLecturer[] = data.map(
            (lecturer: Lecturer) => {
              return { ...lecturer, isChecked: false };
            }
          );

          set({
            mylecturers: response.data.staff,
            myrealLecturers: initialRealLecturers,
          });
        } catch (err) {
          console.log("Error");
        }
      },
      handleCheckedLecturer: (id: number) => {
        const updatedList: RealLecturer[] = get().myrealLecturers.map(
          (lecturer) =>
            lecturer.id === id
              ? { ...lecturer, isChecked: !lecturer.isChecked }
              : lecturer
        );
        set({ myrealLecturers: updatedList });
      },
      myfilterText: "",
      setMyFilterText(text: string) {
        set({ myfilterText: text });
      },
    }),
    {
      name: "lecturers-trial-store",
    }
  )
);

export default useLecturersStore;
