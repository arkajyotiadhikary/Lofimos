import React, { FC } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
} from "react-native";
import { useDispatch } from "react-redux";
import { setCurrentPlayingSong } from "../../features/song/songSlice";
import styles from "../../styles/HomeScreen/PlayerListItem.style";
import { Foundation } from "@expo/vector-icons";
import { type Track } from "react-native-track-player";

interface PlayerListItemProps {
    index: number;
    title: string | undefined;
    artist: string | undefined;
    coverArtPath: ImageSourcePropType;
    isCurrent?: boolean | false;
    queue?: Track[];
}

const PlayerListItem: FC<PlayerListItemProps> = ({
    index,
    title,
    artist,
    coverArtPath,
}) => {
    const dispatch = useDispatch();

    const handlePress = (): void => {
        dispatch(
            setCurrentPlayingSong({
                artist: artist ?? "",
                title: title ?? "",
                artwork: coverArtPath,
                audioIndex: index,
            })
        );
    };

    return (
        <TouchableOpacity onPress={handlePress}>
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
        </TouchableOpacity>
    );
};

export default PlayerListItem;
