import { configureStore } from "@reduxjs/toolkit";

// reducers
import {
    currentPlayingReducer,
    songControlsReducer,
} from "./features/song/songSlice";

export const store = configureStore({
    reducer: {
        currentPlayingReducer,
        songControlsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
