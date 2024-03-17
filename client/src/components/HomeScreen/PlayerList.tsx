import React, { FC, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { type Track } from "react-native-track-player";
import PlayerListItem from "./PlayerListItem";

// styles
import styles from "../../styles/HomeScreen/PlayerList";

interface PlayListParams {
    queue: Track[] | undefined;
}

const PlayerList: FC<PlayListParams> = ({ queue }) => {
    return (
        <View style={styles.list}>
            <FlatList
                data={queue}
                renderItem={({ item, index }) => (
                    <PlayerListItem
                        index={index}
                        title={item.title}
                        artist={item.artist}
                        coverArtPath={{ uri: item.artwork }}
                        queue={queue}
                    />
                )}
            />
        </View>
    );
};

export default PlayerList;
