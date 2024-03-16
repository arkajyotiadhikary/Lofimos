import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import TrackPlayer from "react-native-track-player";
import { setupPlayer, addTrack } from "../trackPlayerServices";
import { Track } from "react-native-track-player";
import PlayerList from "../components/Home/PlayerList";
import HomeHeader from "../components/Home/HomeHeader";
import HomeAudioPlayer from "../components/Home/HomeAudioPlayer";
import styles from "../styles/Home/Home";
import { useSelector } from "react-redux"; // Correct import statement
import { RootState } from "../store";

const Home: FC = () => {
    const { audioIndex } = useSelector((state: RootState) => state.songReducer);

    const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
    const [queue, setQueue] = useState<Track[]>();

    useEffect(() => {
        const setup = async () => {
            let isSetup = await setupPlayer();
            const queueLength = (await TrackPlayer.getQueue()).length;
            if (isSetup && queueLength <= 0) {
                await addTrack();
            }
            setQueue(await TrackPlayer.getQueue());
            setIsPlayerReady(isSetup);
        };
        setup();
    }, []);

    useEffect(() => {
        const loadTrack = async () => {
            if (queue !== undefined) await TrackPlayer.load(queue[audioIndex]);
        };
        loadTrack();
    }, [audioIndex]);

    return (
        <View style={styles.container}>
            <HomeHeader />
            <PlayerList queue={queue} />
            <HomeAudioPlayer play={TrackPlayer.play} />
        </View>
    );
};

export default Home;
