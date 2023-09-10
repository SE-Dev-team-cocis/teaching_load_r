import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type Subgroup = {
  id: number;
  subgroup_name: string;
  course_id: number;
  no_of_students: number;
};

export type CourseType = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  assignee_id?: number;
  isChecked: boolean;
  subgroups?: Subgroup[];
};


type InitialStateType = {
    course: CourseType[]
}

const initialState: InitialStateType = {
    course: []
}
export const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setNewCourses: (state, action:PayloadAction<CourseType[]> ) =>{
            const data = action.payload
            state.course = data
        }
    }
})


// console.log("User: ", userSlice)

export const { setNewCourses } = courseSlice.actions
export default courseSlice.reducer