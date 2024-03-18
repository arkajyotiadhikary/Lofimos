// playerInitialization.ts

import TrackPlayer from "react-native-track-player";
import { addTrack, setupPlayer } from "../trackPlayerServices";
import { useDispatch, useSelector } from "react-redux";
import {
    setCurrentPlayingSong,
    setSongQueue,
} from "../features/song/songSlice";
import { RootState } from "../store";

const usePlayerInitialization = () => {
    const dispatch = useDispatch();
    const { audioIndex } = useSelector(
        (state: RootState) => state.currentPlayingReducer
    );

    const initializePlayer = async (): Promise<void> => {
        const isSetup = await setupPlayer();
        if (!isSetup) return;

        await ensureQueueNotEmpty();
        await dispatchCurrentSong();
    };

    const ensureQueueNotEmpty = async (): Promise<void> => {
        const queue = await TrackPlayer.getQueue();
        if (queue.length === 0) {
            await addTrack();
        }
    };

    const dispatchCurrentSong = async (): Promise<void> => {
        const currentSong = await TrackPlayer.getActiveTrack();
        if (currentSong) {
            const { artist = "", title = "", artwork } = currentSong;
            dispatch(
                setCurrentPlayingSong({
                    artist,
                    title,
                    artwork: { uri: artwork },
                    audioIndex: audioIndex,
                })
            );
            const queue = await TrackPlayer.getQueue();
            dispatch(setSongQueue(queue));
        }
    };

    return { initializePlayer };
};

export default usePlayerInitialization;
