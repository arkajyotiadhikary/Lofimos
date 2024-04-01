import { configureStore } from "@reduxjs/toolkit";

// reducers
import {
    currentPlayingReducer,
    songControlsReducer,
    songQueueReducer,
} from "./features/song/songSlice";

import { userReducer } from "./features/user/userSlice";

export const store = configureStore({
    reducer: {
        currentPlayingReducer,
        songControlsReducer,
        songQueueReducer,
        userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
