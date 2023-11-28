import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
    role: 0
}

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload;
        },
        setUserData(state, action) {
            state.user = action.payload;
        },
        setRole(state, action) {
            state.role = action.payload
        }
    },
})

export const {setIsAuth, setUserData, setRole} = userSlice.actions;

export default userSlice.reducer