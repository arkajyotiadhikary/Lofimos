import React, { FC } from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageSourcePropType,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import styles from "../../styles/Home/HomeAudioPlayer";
import { RootState } from "../../store";
import { play } from "react-native-track-player/lib/trackPlayer";

interface HomeAudioPlayerProps {
    play: () => void;
}

const HomeAudioPlayer: FC<HomeAudioPlayerProps> = () => {
    const { title, artist, artwork } = useSelector(
        (state: RootState) => state.songReducer
    );

    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={artwork as ImageSourcePropType}
                    style={styles.musicArt}
                />
            </View>
            <View>
                <Text>{title}</Text>
                <Text>{artist}</Text>
            </View>
            <View style={styles.playBtnHolder}>
                <TouchableOpacity style={styles.playBtn} onPress={play}>
                    <Entypo name="controller-play" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeAudioPlayer;
