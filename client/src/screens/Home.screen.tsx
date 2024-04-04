import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import TrackPlayer from "react-native-track-player";
import usePlayerInitialization from "../utils/playerInitialization";
import HomeHeader from "../components/HomeScreen/Header.component.home";
import HomeAudioPlayer from "../components/HomeScreen/AudioPlayer.component.home";
import PlayerList from "../components/HomeScreen/PlayerList.component.home";
import SearchBar from "../components/HomeScreen/SearchBar.componenthome";
import styles from "../styles/HomeScreen/Home.style";
import { RootState } from "../store";
import { registerSongPlay } from "../services/songService";

const Home: FC = () => {
    const { audioIndex } = useSelector(
        (state: RootState) => state.currentPlayingReducer
    );
    const user = useSelector((state: RootState) => state.userDataReducer);
    const userAuth = useSelector((state: RootState) => state.userAuthReducer);
    const queue = useSelector((state: RootState) => state.songQueueReducer);
    const { initializePlayer } = usePlayerInitialization();

    useEffect(() => {
        initializePlayer();
    }, []);

    useEffect(() => {}, [user, userAuth]);

    useEffect(() => {
        const loadSelectedTrack = async () => {
            try {
                if (queue?.length || 0 > 0) {
                    await TrackPlayer.skip(audioIndex || 0);
                }
            } catch (error) {
                console.error("Error while loading track:", error);
            }
        };
        loadSelectedTrack();
        (async () => {
            const activeTrack = await TrackPlayer.getActiveTrack();
            if (activeTrack) {
                registerSongPlay(user.userID, activeTrack.songId);
            }
        })();
    }, [audioIndex]);

    return (
        <View style={styles.container}>
            <HomeHeader />
            <SearchBar />
            <PlayerList queue={queue} />
            <HomeAudioPlayer />
        </View>
    );
};

export default Home;
