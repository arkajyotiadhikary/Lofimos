// TODO shuffle and repeat

import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../../styles/PlayerScreen/AudioController.style";

interface PlaybackControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    onSkip: () => void;
    onPrevious: () => void;
}

const PlaybackControls: FC<PlaybackControlsProps> = ({
    isPlaying,
    onPlayPause,
    onSkip,
    onPrevious,
}) => (
    <View style={styles.timelineControls}>
        {/* add shuffle */}
        <TouchableOpacity>
            <Entypo name="shuffle" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPrevious}>
            <Entypo name="controller-fast-backward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlayPause}>
            {isPlaying ? (
                <MaterialCommunityIcons name="pause" size={24} color="black" />
            ) : (
                <Entypo name="controller-play" size={24} color="black" />
            )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onSkip}>
            <Entypo name="controller-fast-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
            <MaterialCommunityIcons
                name="repeat-variant"
                size={26}
                color="black"
            />
        </TouchableOpacity>
    </View>
);

export default PlaybackControls;
