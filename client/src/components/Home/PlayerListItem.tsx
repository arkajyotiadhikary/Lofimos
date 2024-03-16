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
    const dispatch = useDispatch();

    const handlePress = (): void => {
        dispatch(
            setCurrentPlayingSong({
                artist: artist ? artist : "",
                title: title ? title : "",
                artwork: coverArtPath as string,
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
