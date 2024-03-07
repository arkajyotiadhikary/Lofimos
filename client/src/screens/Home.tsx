import React, { FC, useEffect, useState } from "react";
import { View, Text } from "react-native";

// track imports
import TrackPlayer from "react-native-track-player";
import { setupPlayer, addTrack } from "../trackPlayerServices";
import { type Track } from "react-native-track-player";

// Components
import ButtonGroup from "../components/Home/ButtonGroup";
import PlayerList from "../components/Home/PlayerList";
import SongThumbnail from "../components/Home/SongThumbnail";

// style
import styles from "../styles/Home";

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
            <SongThumbnail />
            <PlayerList queue={queue} />
            <ButtonGroup play={TrackPlayer.play} />
        </View>
    );
};

export default Home;
