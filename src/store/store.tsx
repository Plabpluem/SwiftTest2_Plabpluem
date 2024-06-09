import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice
    }
})

const rootReducer = combineReducers({})
export type RootState = ReturnType<typeof rootReducer>