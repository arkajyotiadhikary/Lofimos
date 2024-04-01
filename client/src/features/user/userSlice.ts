import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
    isAuthenticated: boolean;
}

const initUserState: User = {
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState: initUserState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User>) {
            state.isAuthenticated = action.payload.isAuthenticated;
        },
    },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
