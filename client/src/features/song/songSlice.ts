import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import logo from "../../../assets/images/Logo.jpg";

import { type Track } from "react-native-track-player";

interface CurrentPlayingSong {
    title: string;
    artist: string;
    artwork: ImageSourcePropType;
    audioIndex: number;
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
};

const initialSongControlsState: SongControls = {
    isPlaying: false,
};

const initialQueueState: Queue = [];

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

const songQueueSlice = createSlice({
    name: "songQueue",
    initialState: initialQueueState,
    reducers: {
        setSongQueue(state, action: PayloadAction<Queue>) {
            state.push(...action.payload);
        },
    },
});

export const { setCurrentPlayingSong } = currentPlayingSlice.actions;
export const { setCurrentAudioControls } = songControlsSlice.actions;
export const { setSongQueue } = songQueueSlice.actions;
export const currentPlayingReducer = currentPlayingSlice.reducer;
export const songControlsReducer = songControlsSlice.reducer;
export const songQueueReducer = songQueueSlice.reducer;
