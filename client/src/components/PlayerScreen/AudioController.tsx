import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

import styles from "../../styles/PlayerScreen/AudioController";

const AudioController = () => {
    return (
        <View>
            <Slider
                style={styles.slider}
                thumbTintColor="black"
                maximumTrackTintColor="black"
                minimumTrackTintColor="black"
            />
            <View style={styles.timelineValues}>
                {/* current position */}
                <Text>0.02</Text>
                {/* total position */}
                <Text>4.03</Text>
            </View>
            <View style={styles.timelineControls}>
                <FontAwesome6
                    name="shuffle"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
                <AntDesign
                    name="stepbackward"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
                <FontAwesome
                    name="play"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
                <AntDesign
                    name="stepforward"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
                <FontAwesome
                    name="repeat"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
            </View>
        </View>
    );
};

export default AudioController;
