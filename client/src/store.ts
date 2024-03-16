import { configureStore } from "@reduxjs/toolkit";

// reducers
import songReducer from "./features/song/songSlice";

export const store = configureStore({
    reducer: {
        songReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
