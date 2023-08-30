import { create } from "zustand";
import axios from "axios";

import { persist } from "zustand/middleware";

type Load = {
  id: number;
  courses: string[];
  staff_id: number;
  CUs: number[];
  setCourses: () => void;
  setCUs: () => void;
  data: LoadData[];
};

type LoadData = {
  //   id: number;
  staff_id: number;
  courses: string[];
  CUs: number[];
  data: LoadData[];
  loadRecord: Load[];
};
const useLoadStore = create<LoadData>()(
  persist(
    (set, get) => ({
      //   id: 0,
      courses: [],
      staff_id: 0,
      CUs: [],
      data: [],
      loadRecord: [],

      setCourses: async () => {
        const url = "http://127.0.0.1:8000/api/allAssign";
        try {
          const response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          const wholedata = response.data.assignments;
          const load = wholedata.forEach((load: Load) => {
            return {
              staff_id: load.staff_id,
              courses: load.courses,
              CUs: load.CUs,
              id: load.id,
            };
          });
        } catch (err) {
          console.log("Error");
        }
      },
      setCUs: async () => {},
    }),
    {
      name: "load",
    }
  )
);

export default useLoadStore;
