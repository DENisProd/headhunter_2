import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
    profile: null,
    role: "",
    portfolio: [],
    balance: 0.0,
    notifies: [
        {
            title: 'aboba'
        }
    ]
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
            state.role = action.payload?.userType
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