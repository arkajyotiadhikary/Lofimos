import React, { FC } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
} from "react-native";

import styles from "../../styles/Home/PlayerListItem";
import { Foundation } from "@expo/vector-icons";

interface PlayerListItemProps {
    index: number;
    title: string | undefined;
    artist: string | undefined;
    coverArtPath: ImageSourcePropType;
    isCurrent?: boolean | false;
}

const PlayerListItem: FC<PlayerListItemProps> = ({
    index,
    title,
    artist,
    coverArtPath,
    isCurrent,
}) => {
    return (
        <View style={styles.item}>
            <View style={styles.trackDetails}>
                <Image style={styles.coverArt} source={coverArtPath} />
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                    <Text>{artist}</Text>
                </View>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity>
                    <Foundation name="play" color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PlayerListItem;
