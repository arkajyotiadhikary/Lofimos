import React, { FC, useEffect, useState } from "react";
import { View, Text } from "react-native";

// track imports
import TrackPlayer from "react-native-track-player";
import { setupPlayer, addTrack } from "../trackPlayerServices";
import { type Track } from "react-native-track-player";

// Components
import PlayerList from "../components/Home/PlayerList";
import HomeHeader from "../components/Home/HomeHeader";
import HomeAudioPlayer from "../components/Home/HomeAudioPlayer";
// style
import styles from "../styles/Home/Home";
import { getAllSong } from "../services/songService";

const Home: FC = () => {
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

    return (
        <View style={styles.container}>
            <HomeHeader />
            <PlayerList queue={queue} />
            <HomeAudioPlayer />
            {/* <ButtonGroup play={TrackPlayer.play} /> */}
        </View>
    );
};

export default Home;
