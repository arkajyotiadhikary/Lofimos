import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

import styles from "../../styles/PlayerScreen/AudioController";

const AudioController = () => {
    return (
        <View>
            <Slider />
            <View style={styles.timelineValues}>
                {/* current position */}
                <Text>0.02</Text>
                {/* total position */}
                <Text>4.03</Text>
            </View>
            <View style={styles.timelineControls}>
                <FontAwesome6 name="shuffle" size={24} color="black" />
                <FontAwesome name="step-backward" size={24} color="black" />
                <FontAwesome name="play" size={24} color="black" />
                <FontAwesome name="step-forward" size={24} color="black" />
                <FontAwesome name="repeat" size={24} color="black" />
            </View>
        </View>
    );
};

export default AudioController;
