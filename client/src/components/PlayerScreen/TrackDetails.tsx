import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { UseSelector, useSelector } from "react-redux";

import styles from "../../styles/PlayerScreen/TrackDetails";
import { RootState } from "../../store";

const TrackDetails: FC = () => {
    // TODO impleament liking the song/track

    const { artist, title } = useSelector(
        (state: RootState) => state.songReducer
    );

    return (
        <View style={styles.container}>
            <View>
                {/* Track Title */}
                <Text style={styles.textTitle}>{title}</Text>
                {/* Artist Name */}
                <Text>{artist}</Text>
            </View>
            {/* Like Button a heart icon */}
            <TouchableOpacity>
                <Entypo name="heart" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default TrackDetails;
