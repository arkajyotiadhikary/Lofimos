import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import logo from "../../../assets/images/Logo.jpg";

interface CurrentPlayingSong {
    title: string;
    artist: string;
    artwork: string | number;
    audioIndex: number;
}

const initialState: CurrentPlayingSong = {
    title: "Test",
    artist: "Test",
    artwork: logo,
    audioIndex: -1,
};

const songSlice = createSlice({
    name: "song",
    initialState,
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

export const { setCurrentPlayingSong } = songSlice.actions;
export default songSlice.reducer;
