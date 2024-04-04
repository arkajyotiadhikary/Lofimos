import { configureStore } from "@reduxjs/toolkit";

// reducers
import {
    currentPlayingReducer,
    songControlsReducer,
    songQueueReducer,
} from "./features/song/songSlice";

import {
    likedSongsReducer,
    userAuthReducer,
    userDataReducer,
} from "./features/user/userSlice";

export const store = configureStore({
    reducer: {
        currentPlayingReducer,
        songControlsReducer,
        songQueueReducer,
        userAuthReducer,
        userDataReducer,
        likedSongsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
