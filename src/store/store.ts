import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "../features/user/userSlice"
import LoadReducer from "../features/load/loadSlice";
import StaffReducer from "../features/load/staff/staffSlice";
import CourseReducer from "../features/courses/courseSlice";
import  CentralDashboardReducer  from "../features/dashboard/dashboardSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer, FLUSH, PERSIST, PAUSE, REGISTER, REHYDRATE, PURGE} from 'redux-persist'



const persistConfiguration = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
     user: UserReducer,
     load: LoadReducer,
     staff: StaffReducer,
     courses: CourseReducer,
     dashboard: CentralDashboardReducer
})

const persistedReducer = persistReducer(persistConfiguration, reducer)

export const store = configureStore({
    reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store