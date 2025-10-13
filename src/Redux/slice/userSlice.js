import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userIdentifier: localStorage.getItem("loggedInUser") || null,
};

const userSlice = createSlice( {
    name: "user",
    initialState,
    reducers: {
        login: (state, action)=> {  
            state.userIdentifier = action.payload;
            localStorage.setItem("loggedInUser", action.payload);
        },
        logout: (state) => {
            state.userIdentifier = null;
            localStorage.removeItem("loggedInUser");
        }
    }
})

export const { login, logout} =  userSlice.actions;
export default userSlice.reducer;