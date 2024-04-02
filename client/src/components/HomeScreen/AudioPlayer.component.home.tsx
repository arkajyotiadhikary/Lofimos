import React, { FC } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setCurrentAudioControls } from "../../features/song/songSlice";
import styles from "../../styles/HomeScreen/HomeAudioPlayer.style";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../../types";
import TrackPlayer from "react-native-track-player";

const HomeAudioPlayer: FC = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const dispatch = useDispatch();

    const { title, artist, artwork } = useSelector(
        (state: RootState) => state.currentPlayingReducer
    );
    const isPlaying = useSelector(
        (state: RootState) => state.songControlsReducer.isPlaying
    );

    const handlePlayPause = () => {
        if (isPlaying) {
            TrackPlayer.pause();
        } else {
            TrackPlayer.play();
        }
        dispatch(setCurrentAudioControls({ isPlaying: !isPlaying }));
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("Player")}
        >
            <View>
                <Image source={artwork} style={styles.musicArt} />
            </View>
            <View>
                <Text>{title}</Text>
                <Text>{artist}</Text>
            </View>
            <View style={styles.playBtnHolder}>
                <TouchableOpacity
                    style={styles.playBtn}
                    onPress={handlePlayPause}
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
        </TouchableOpacity>
    );
};

export default HomeAudioPlayer;
