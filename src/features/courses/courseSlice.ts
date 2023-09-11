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

export type SemesterListType = {
    course: CourseType,
    course_id: number,
    id: number,
    semester: number,
    staff_id: number,
    isChecked: boolean
};



type InitialStateType = {
    course: CourseType[],
    semList: SemesterListType[]
}

const initialState: InitialStateType = {
    course: [],
    semList: []
}
export const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setNewCourses: (state, action:PayloadAction<CourseType[]> ) =>{
            const data = action.payload
            state.course = data
        },
        setNewSemesterList: (state, action:PayloadAction<SemesterListType[]> ) =>{
            const data = action.payload
            state.semList = data
        }
    }
})


// console.log("User: ", userSlice)

export const { setNewCourses, setNewSemesterList } = courseSlice.actions
export default courseSlice.reducer