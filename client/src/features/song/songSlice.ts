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
interface SongControls {
    isPlaying: boolean;
}

type Queue = Track[];

const initialCurrentPlayingState: CurrentPlayingSong = {
    title: "Test",
    artist: "Test",
    artwork: logo,
    audioIndex: -1,
    queue: [],
};

const initialSongControlsState: SongControls = {
    isPlaying: false,
};

const currentPlayingSlice = createSlice({
    name: "currentPlaying",
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
const songControlsSlice = createSlice({
    name: "songControls",
    initialState: initialSongControlsState,
    reducers: {
        setCurrentAudioControls(state, action: PayloadAction<SongControls>) {
            state.isPlaying = action.payload.isPlaying;
        },
    },
});

export const { setCurrentPlayingSong } = currentPlayingSlice.actions;
export const { setCurrentAudioControls } = songControlsSlice.actions;
export const currentPlayingReducer = currentPlayingSlice.reducer;
export const songControlsReducer = songControlsSlice.reducer;
