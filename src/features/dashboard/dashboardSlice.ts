// import { PayloadAction, createSlice } from "@reduxjs/toolkit";


// export type LoadType = {
//   id: number;
//   courses: string;
//   staff_id: number;
//   CUs: number[];
//   assignee_id: number;
//   department_id: number;
// };

// type CourseSummary = {
//     allocated_courses: number,
//     all_courses: number
// }

// type Department = {
//     department_id: number,
//     department_name: string,
//     extra_load: number,
//     min_load: number,
//     under_load: number

// }
// type DepartmentLoad = {
//    department_load: Department[]
// }

// type OverallTotalLoad = {
//     extra_load: number,
//     min_load: number,
//     under_load: number
// }

// type Staff = {
//     staff: string,
//     sum: number,
//     deparment: string
// }

// type StaffLoad = {
//     staff: Staff[]
// }

// type UnallocatedCourses = {
//     unallocated_courses: string[]
// }


// type InitialStateType = {
//      centralDashboard: {
//         course_summary: CourseSummary,
//         department_load: DepartmentLoad,
//         overall_total_load: OverallTotalLoad,
//         staff: StaffLoad,
//         unallocated_courses: UnallocatedCourses,
//         total_staff: number

//     }
// }

// const initialState: InitialStateType = {
//     centralDashboard: {}
// }

// export const loadSlice = createSlice({
//     name: "load",
//     initialState,
//     reducers: {
//         setLoad: (state, action:PayloadAction<LoadType[]> ) =>{
//             const data = action.payload        
//             state.centralDashboard = data
//         }
//     }
// })


// // console.log("User: ", loadSlice)

// export const { setLoad } = loadSlice.actions
// export default loadSlice.reducer