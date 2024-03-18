import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import styles from "../../../styles/PlayerScreen/AudioController";

interface PlaybackControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    onSkip: () => void;
}

const PlaybackControls: FC<PlaybackControlsProps> = ({
    isPlaying,
    onPlayPause,
    onSkip,
}) => (
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
            onPress={onSkip}
        />
        <TouchableOpacity onPress={onPlayPause}>
            {isPlaying ? (
                <AntDesign
                    name="pausecircleo"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
            ) : (
                <AntDesign name="playcircleo" size={24} color="black" />
            )}
        </TouchableOpacity>
        <AntDesign
            name="stepforward"
            size={24}
            color="black"
            style={styles.icon}
            onPress={onSkip}
        />
        <FontAwesome
            name="repeat"
            size={24}
            color="black"
            style={styles.icon}
        />
    </View>
);

export default PlaybackControls;
