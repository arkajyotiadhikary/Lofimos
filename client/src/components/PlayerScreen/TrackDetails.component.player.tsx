import React, { FC, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import styles from "../../styles/PlayerScreen/TrackDetails.style";
import { RootState } from "../../store";

const TrackDetails: FC = () => {
    // Select artist and title from Redux store
    const { artist, title } = useSelector(
        (state: RootState) => state.currentPlayingReducer
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
            <TouchableOpacity onPress={() => console.log("Like pressed")}>
                <Entypo name="heart" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default TrackDetails;
