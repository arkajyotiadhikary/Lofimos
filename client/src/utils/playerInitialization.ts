// playerInitialization.ts

import TrackPlayer from "react-native-track-player";
import { addTrack, setupPlayer } from "../trackPlayerServices";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPlayingSong } from "../features/song/songSlice";
import { RootState } from "../store";

const usePlayerInitialization = () => {
    const dispatch = useDispatch();
    const { audioIndex } = useSelector(
        (state: RootState) => state.currentPlayingReducer
    );

    const initializePlayer = async () => {
        try {
            // Setup TrackPlayer
            const isSetup = await setupPlayer();

            // Check if setup was successful and if the queue is empty
            if (isSetup) {
                const queue = await TrackPlayer.getQueue();
                if (queue.length === 0) {
                    await addTrack();
                }
            }

            // Retrieve the current queue and active track
            const currentSong = await TrackPlayer.getActiveTrack();

            // Dispatch the current song information
            if (currentSong) {
                const { artist = "", title = "", artwork } = currentSong;
                dispatch(
                    setCurrentPlayingSong({
                        artist,
                        title,
                        artwork: { uri: artwork },
                        audioIndex: audioIndex,
                        queue: await TrackPlayer.getQueue(),
                    })
                );
            }
        } catch (error) {
            console.error("Error during setup:", error);
        }
    };

    return { initializePlayer };
};

export default usePlayerInitialization;
