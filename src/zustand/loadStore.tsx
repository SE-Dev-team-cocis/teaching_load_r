import { create } from "zustand";

import { persist } from "zustand/middleware";
import axios, { all } from "axios";

type LoadData = {
  id: number;
  staff_id: number;
  courses: string[];
  CUs: number[];
};

type Load = {
  id: number;
  courses: string[];
  staff_id: number[];
  CUs: number[];
};

type Lecturer = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role: string;
};

type LoadResponse = {
  responseLoad: Load[];
  // CUsArray: number[];
  fetchLoad: () => void;
  totalLoad: number[];
  // setTotalLoad: () => void;
  // staffIDs: number[][];
  // setStaffIDs: () => void;
  mystaff: number[]; // array of staff ids
  setMyStaff: (staffArray: number[]) => void; // setting the staff ids
  lecturers: Lecturer[];
  setLecturers: (lecturers: Lecturer[]) => void;
};

const useLoadStore = create<LoadResponse>()(
  persist(
    (set, get) => ({
      responseLoad: [],
      totalLoad: [],
      mystaff: [],
      lecturers: [],
      fetchLoad: async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/allAssign",
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const allLoad = response.data.assignments;
          const myLoad: Load[] = allLoad.map((load: Load) => {
            return {
              staff_id: load.staff_id,
              courses: JSON.parse(load.courses),
              CUs: JSON.parse(load.CUs),
              id: load.id,
            };
          });
        } catch (err) {}
      },
      setMyStaff: (staffArray: number[]) => {
        set({
          mystaff: staffArray,
        });
      },
      setLecturers: (lecturers: Lecturer[]) => {
        set({
          lecturers: lecturers,
        });
      },
      // setTotalLoad: () => {
      //   set({
      // totalLoad: this.getState().responseLoad.map((load) => {
      //   return load.CUs.reduce((a: number, b: number) => a + b, 0);
      // }),
      //   });
      // },
      // setStaffIDs: () => {
      //   set({
      //     staffIDs: this.getState().responseLoad.map((load) => {
      //       return load.staff_id;
      //     }),
      //   });
      // },
    }),
    {
      name: "final_load",
    }
  )
);

export default useLoadStore;

// const useLoadStore = create<LoadResponse>()(
//   persist(
//     (set, get) => ({
//       assignments: [],
//       CUs: [],
//       totalLoad: 0,
//       fetchLoad: async () => {
//         const url = "http://127.0.0.1:8000/api/allAssign";
//         try {
//           const response = await axios.get(url, {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });
//           const allLoad = response.data.assignments;
//           const CusArray = allLoad.map((load: Load) => {
//             return JSON.parse(load.CUs);
//           });
//           const total = CusArray.reduce((a: number, b: number) => a + b, 0);

//           set({
//             assignments: allLoad,
//             CUs: CusArray,
//             totalLoad: total,
//           });
//         } catch (error) {
//           console.log("Error: ");
//         }
//       },
//     }),
//     {
//       name: "trial_load",
//     }
//   )
// );

// export default useLoadStore;

// const allLoad = response.data.assignments;
// const myLoad: Load[] = allLoad.map((load: Load) => {
//   return {
//     staff_id: load.staff_id,
//     courses: JSON.parse(load.courses),
//     CUs: JSON.parse(load.CUs),
//     id: load.id,
//   };
// });
