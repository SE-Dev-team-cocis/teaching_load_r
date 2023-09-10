import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "../features/user/userSlice"
import LoadSlice from "../features/load/loadSlice";
import StaffSlice from "../features/load/staff/staffSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer, FLUSH, PERSIST, PAUSE, REGISTER, REHYDRATE, PURGE} from 'redux-persist'



const persistConfiguration = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
     user: UserReducer,
     load: LoadSlice,
     staff: StaffSlice,
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