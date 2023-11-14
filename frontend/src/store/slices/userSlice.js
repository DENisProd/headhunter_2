import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null
}

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload;
        },
        setUserData(state, action) {
            state.data = action.payload;
        }
    },
})

export const {setIsAuth, setUserData} = userSlice.actions;

export default userSlice.reducer