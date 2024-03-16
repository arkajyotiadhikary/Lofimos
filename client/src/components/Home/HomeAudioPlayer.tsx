import React, { FC, useState } from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageSourcePropType,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux"; // Import useDispatch
import { RootState } from "../../store";
import { pause, play } from "react-native-track-player/lib/trackPlayer";

import styles from "../../styles/Home/HomeAudioPlayer";

interface HomeAudioPlayerProps {
    play: () => void;
    pause: () => void;
}

const HomeAudioPlayer: FC<HomeAudioPlayerProps> = () => {
    const { title, artist, artwork } = useSelector(
        (state: RootState) => state.songReducer
    );

    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    };

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
                <TouchableOpacity
                    style={styles.playBtn}
                    onPress={handlePlayPause} // Call handlePlayPause function on press
                >
                    {isPlaying ? (
                        <Entypo
                            name="controller-paus"
                            size={24}
                            color="black"
                        />
                    ) : (
                        <Entypo
                            name="controller-play"
                            size={24}
                            color="black"
                        />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeAudioPlayer;
