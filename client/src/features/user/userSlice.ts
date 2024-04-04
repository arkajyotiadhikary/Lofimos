import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserAuth {
    isAuthenticated: boolean;
}
interface UserData {
    userID: number;
    username: string;
    email: string;
    role: string;
}

const initUserAuthState: UserAuth = {
    isAuthenticated: false,
};

const initUserDataState: UserData = {
    userID: 0,
    username: "",
    email: "",
    role: "",
};

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: initUserAuthState,
    reducers: {
        setCurrentUserAuth(state, action: PayloadAction<UserAuth>) {
            state.isAuthenticated = action.payload.isAuthenticated;
        },
    },
});

export const userDataSlice = createSlice({
    name: "userData",
    initialState: initUserDataState,
    reducers: {
        setCurrentUserData(state, action: PayloadAction<UserData>) {
            state.userID = action.payload.userID;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.username = action.payload.username;
        },
    },
});

export const { setCurrentUserAuth } = userAuthSlice.actions;
export const { setCurrentUserData } = userDataSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
export const userDataReducer = userDataSlice.reducer;
