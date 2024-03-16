import React, { FC, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import TrackPlayer, {
    useTrackPlayerEvents,
    Event,
    State,
} from "react-native-track-player";

import { type Track } from "react-native-track-player";

import PlayerListItem from "./PlayerListItem";

// styles
import styles from "../../styles/Home/PlayerList";

interface PlayListParams {
    queue: Track[] | undefined;
}

const events: Event[] = [
    Event.PlaybackError,
    Event.PlaybackState,
    Event.PlaybackActiveTrackChanged,
];

const PlayerList: FC<PlayListParams> = ({ queue }) => {
    const [currentTrack, setCurrentTrack] = useState<number | undefined>();

    useTrackPlayerEvents(events, async (event) => {
        if (event.type == Event.PlaybackState) {
            let index = await TrackPlayer.getActiveTrackIndex();
            setCurrentTrack(index);
        }
    });

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
                    />
                )}
            />
        </View>
    );
};

export default PlayerList;
