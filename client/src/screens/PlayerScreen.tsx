import React, { FC } from "react";
import { View } from "react-native";

import styles from "../styles/PlayerScreen/PlayerScreen";

// components
import Header from "../components/PlayerScreen/Header";
import CoverArt from "../components/PlayerScreen/CoverArt";
import TrackDetails from "../components/PlayerScreen/TrackDetails";
import AudioController from "../components/PlayerScreen/AudioController";

const PlayerScreen: FC = () => {
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

export default PlayerScreen;
