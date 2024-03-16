import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import TrackPlayer from "react-native-track-player";
import { setupPlayer, addTrack } from "../trackPlayerServices";
import { Track } from "react-native-track-player";
import PlayerList from "../components/Home/PlayerList";
import HomeHeader from "../components/Home/HomeHeader";
import HomeAudioPlayer from "../components/Home/HomeAudioPlayer";
import styles from "../styles/Home/Home";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPlayingSong } from "../features/song/songSlice";
import { RootState } from "../store";

const Home: FC = () => {
    const dispatch = useDispatch();
    const { audioIndex } = useSelector((state: RootState) => state.songReducer);

    const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
    const [queue, setQueue] = useState<Track[]>();

    useEffect(() => {
        // Function to setup TrackPlayer
        const setup = async () => {
            try {
                // Setup TrackPlayer
                let isSetup = await setupPlayer();
                // Check if queue is empty and add tracks if necessary
                const queueLength = (await TrackPlayer.getQueue()).length;
                if (isSetup && queueLength <= 0) {
                    await addTrack();
                }
                // Retrieve the current queue
                const currentQueue = await TrackPlayer.getQueue();
                // Set the queue state
                setQueue(currentQueue);
                // Set isPlayerReady state
                setIsPlayerReady(isSetup);
                // Retrieve the currently active track
                const currentSong = await TrackPlayer.getActiveTrack();
                // If a track is playing, dispatch it to the store
                if (currentSong) {
                    const { artist, title, artwork } = currentSong;
                    dispatch(
                        setCurrentPlayingSong({
                            artist: artist || "",
                            title: title || "",
                            artwork: { uri: artwork }, // Ensure artwork is provided as a URI
                            audioIndex: audioIndex,
                        })
                    );
                }
            } catch (error) {
                console.error("Error during setup:", error);
            }
        };
        // Call the setup function
        setup();
    }, []);

    useEffect(() => {
        // Function to load the selected track
        const loadTrack = async () => {
            try {
                // Skip to the selected track
                if (queue !== undefined) {
                    await TrackPlayer.skip(audioIndex);
                }
            } catch (error) {
                console.error("Error while loading track:", error);
            }
        };
        // Call the loadTrack function when audioIndex changes
        loadTrack();
    }, [audioIndex]);

    return (
        // Main container view
        <View style={styles.container}>
            {/* Header component */}
            <HomeHeader />
            {/* PlayerList component */}
            <PlayerList queue={queue} />
            {/* HomeAudioPlayer component */}
            <HomeAudioPlayer
                play={TrackPlayer.play}
                pause={TrackPlayer.pause}
            />
        </View>
    );
};

export default Home;
