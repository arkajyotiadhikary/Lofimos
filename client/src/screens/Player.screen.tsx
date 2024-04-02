import React, { FC, useEffect } from "react";
import { View } from "react-native";

import TrackPlayer from "react-native-track-player";

import styles from "../styles/PlayerScreen/PlayerScreen.style";

// components
import Header from "../components/PlayerScreen/Header.component.player";
import CoverArt from "../components/PlayerScreen/CoverArt.component.player";
import TrackDetails from "../components/PlayerScreen/TrackDetails.component.player";
import AudioController from "../components/PlayerScreen/AudioController.component.player";

const Player: FC = () => {
    return (
        <View style={styles.container}>
            <Header />
            <CoverArt />
            <View>
                <TrackDetails />
                <AudioController />
            </View>
        </View>
    );
};

export default Player;
