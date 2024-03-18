import React, { FC } from "react";
import { View, Text } from "react-native";

import styles from "../../../styles/PlayerScreen/AudioController";

interface TimeDisplayProps {
    position: number;
    duration: number;
}
const TimeDisplay: FC<TimeDisplayProps> = ({ position, duration }) => (
    <View style={styles.timelineValues}>
        <Text>{(position / 1000).toFixed(2)}</Text>
        <Text>{(duration / 1000).toFixed(2)}</Text>
    </View>
);

export default TimeDisplay;
