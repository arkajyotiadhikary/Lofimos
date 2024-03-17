import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import logo from "../../../assets/images/Logo.jpg";

import { type Track } from "react-native-track-player";

interface CurrentPlayingSong {
    title: string;
    artist: string;
    artwork: ImageSourcePropType;
    audioIndex: number;
    queue?: Queue;
}

type Queue = Track[];

const initialCurrentPlayingState: CurrentPlayingSong = {
    title: "Test",
    artist: "Test",
    artwork: logo,
    audioIndex: -1,
    queue: [],
};

const songSlice = createSlice({
    name: "song",
    initialState: initialCurrentPlayingState,
    reducers: {
        setCurrentPlayingSong(
            state,
            action: PayloadAction<CurrentPlayingSong>
        ) {
            state.title = action.payload.title;
            state.artist = action.payload.artist;
            state.artwork = action.payload.artwork;
            state.audioIndex = action.payload.audioIndex;
            state.queue = action.payload.queue;
        },
    },
});

export const { setCurrentPlayingSong } = songSlice.actions;
export default songSlice.reducer;
