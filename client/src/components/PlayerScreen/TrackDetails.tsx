import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import styles from "../../styles/PlayerScreen/TrackDetails";

const TrackDetails: FC = () => {
    // TODO impleament liking the song/track

    return (
        <View style={styles.container}>
            <View>
                {/* Track Title */}
                <Text style={styles.textTitle}>Track Title</Text>
                {/* Artist Name */}
                <Text>Artist Name</Text>
            </View>
            {/* Like Button a heart icon */}
            <TouchableOpacity>
                <Entypo name="heart" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default TrackDetails;
