import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type StaffType = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role: string;
  email?: string;
  isChecked: boolean;
};

type InitialStateType = {
    staff: StaffType[]
}

const initialState: InitialStateType = {
    staff: []
}

export const fetchStaff = createAsyncThunk("staff/getStaff", async () => {

    const url = "https://teaching-load-api.onrender.com/api/getStaff";

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
    },
  });
  const mydata = response.data.staff;
  const data: StaffType[] = mydata.map((lecturer: StaffType) => {
    return {
      id: lecturer.id,
      firstName: lecturer.firstName,
      lastName: lecturer.lastName,
      department: lecturer.department,
      role: lecturer.role,
      email: lecturer.email,
      isChecked: false,
    };
  });

  return data;
})

export const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        setStaff: (state, action:PayloadAction<StaffType[]> ) =>{
            const data = action.payload        
            state.staff = data
        }
    }, 
    // extraReducers: {
    //     [fetchStaff.fulfilled]: (state, action:PayloadAction<StaffType[]>) => {
    //             state.staff = action.payload
    //     }
    // },
})


// console.log("User: ", loadSlice)

export const { setStaff } = staffSlice.actions
export default staffSlice.reducer