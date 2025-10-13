import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/slice/userSlice"

export const store = configureStore( {
    reducer: {
        user: userReducer,
    },
});  

/**
 * configureStore() creates a central Redux store (the global data manager).

We’ll soon define userSlice to handle login info.
 */  