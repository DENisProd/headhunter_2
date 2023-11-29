import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
    profile: null,
    role: 0,
    portfolio: []
}

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload;
        },
        setUserData(state, action) {
            state.user = action.payload?.user;
            state.profile = action.payload?.profile;
        },
        setRole(state, action) {
            state.role = action.payload
        },
        setUserPortfolio(state, action) {
            state.portfolio = action.payload
        }
    },
})

export const {setIsAuth, setUserData, setRole, setUserPortfolio} = userSlice.actions;

export default userSlice.reducer