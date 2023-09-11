import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type LoadType = {
  id: number;
  courses: string;
  staff_id: number;
  CUs: number[];
  assignee_id: number;
  department_id: number;
};

type CourseSummary = {
    allocated_courses: number,
    all_courses: number
}

type Department = {
    department_id: number,
    department_name: string,
    extra_load: number,
    min_load: number,
    under_load: number

}
type DepartmentLoad = {
   department_load: Department[]
}

type OverallTotalLoad = {
    extra_load: number,
    min_load: number,
    under_load: number
}

type Staff = {
    staff: string,
    sum: number,
    deparment: string
}

type StaffLoad = {
    staff: Staff[]
}

type UnallocatedCourses = {
    unallocated_courses: string[]
}

type CentralDashboard = {
    course_summary: CourseSummary,
    department_load: DepartmentLoad,
    overall_total_load: OverallTotalLoad,
    staff: StaffLoad,
    unallocated_courses: UnallocatedCourses,
    total_staff: number
}

type InitialStateType = {
    allData: CentralDashboard
}

const initialState: InitialStateType = {
    allData: {} as CentralDashboard
}

export const centralDashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setCentralDashboardData: (state, action:PayloadAction<CentralDashboard> ) =>{
            const data = action.payload        
            state.allData = data
        }
    }
})


// // console.log("User: ", loadSlice)

export const { setCentralDashboardData } = centralDashboardSlice.actions
export default centralDashboardSlice.reducer