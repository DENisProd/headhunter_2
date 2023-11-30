import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice.js'
import {userApi} from "./api/userApi.js";
import errorMiddleware from "./api/errorMiddleware.js";

const rootReducer = combineReducers({
    userState: userReducer,
    [userApi.reducerPath]: userApi.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(errorMiddleware, userApi.middleware),
})