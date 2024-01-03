import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.js'
import resumeReducer from './slices/resumeSlice.js'
import {userApi} from "./api/userApi.js";
import {resumeApi} from "./api/resumeApi.js";
import errorMiddleware from "./api/errorMiddleware.js";

const rootReducer = combineReducers({
    userState: userReducer,
    resumeState: resumeReducer,
    [userApi.reducerPath]: userApi.reducer,
    [resumeApi.reducerPath]: resumeApi.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(errorMiddleware, userApi.middleware, resumeApi.middleware),
})