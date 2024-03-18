import { configureStore } from "@reduxjs/toolkit";

// reducers
import {
    currentPlayingReducer,
    songControlsReducer,
    songQueueReducer,
} from "./features/song/songSlice";

export const store = configureStore({
    reducer: {
        currentPlayingReducer,
        songControlsReducer,
        songQueueReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
