import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// export type Lecturer = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   department: string;
//   role: string;
//   email?: string;
//   isChecked: boolean;
// };

export type LoadType = {
  id: number;
  courses: string;
  staff_id: number;
  CUs: number[];
  assignee_id: number;
//   staffName?: Lecturer;
//   staff?: Lecturer;

  department_id: number;
};


type InitialStateType = {
    load: LoadType[]
}

const initialState: InitialStateType = {
    load: []
}

export const loadSlice = createSlice({
    name: "load",
    initialState,
    reducers: {
        setLoad: (state, action:PayloadAction<LoadType[]> ) =>{
            const data = action.payload        
            state.load = data
        }
    }
})


// console.log("RTK load 1: ", loadSlice)

export const { setLoad } = loadSlice.actions
export default loadSlice.reducer