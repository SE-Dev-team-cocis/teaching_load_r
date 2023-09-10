import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserType = {
    id: 0,
    firstName: string,
    lastName: string,
    email: string,
    // password: string,
    role: string
    department: string
}

type InitialStateType = {
    user: UserType
}

const initialState: InitialStateType = {
    user: {
        id: 0,
        firstName: "looor",
        lastName: "",
        email: "",
        // password: "",
        role: "",
        department: ""
    }
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action:PayloadAction<UserType> ) =>{
            const data = action.payload
            state.user = data
        }
    }
})


// console.log("User: ", userSlice)

export const { setUser } = userSlice.actions
export default userSlice.reducer