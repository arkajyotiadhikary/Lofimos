import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../../styles/Home/PlayerListItem";
import { Foundation } from "@expo/vector-icons";

interface PlayerListItemProps {
    index: number;
    title: string | undefined;
    isCurrent?: boolean | false;
}

const PlayerListItem: FC<PlayerListItemProps> = ({
    index,
    title,
    isCurrent,
}) => {
    return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{title}</Text>
            <View style={styles.btn}>
                <TouchableOpacity>
                    <Foundation name="play" color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PlayerListItem;
