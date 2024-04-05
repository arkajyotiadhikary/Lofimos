import React, { FC, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import TrackPlayer from "react-native-track-player";
import usePlayerInitialization from "../utils/playerInitialization";

import styles from "../styles/HomeScreen/Home.style";
import { RootState } from "../store";
import { registerSongPlay } from "../services/songService";

// Components
import HomeHeader from "../components/HomeScreen/Header.component.home";
import HomeAudioPlayer from "../components/HomeScreen/AudioPlayer.component.home";
import PlayerList from "../components/HomeScreen/PlayerList.component.home";
import SearchBar from "../components/HomeScreen/SearchBar.componenthome";
import HorizontalSongList from "../components/HomeScreen/HorizontalSongList.component";

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
            <FlatList
                data={[
                    { key: "SearchBar" },
                    { key: "PlayerList" },
                    { key: "Recently Played" },
                    { key: "Summer Vibes" },
                    { key: "Most Played" },
                ]}
                renderItem={({ item }) => {
                    switch (item.key) {
                        case "SearchBar":
                            return <SearchBar />;
                        case "PlayerList":
                            return <PlayerList queue={queue} />;
                        case "Recently Played":
                            return (
                                <HorizontalSongList
                                    headerTitle="Recently Played"
                                    songs={queue}
                                />
                            );
                        case "Summer Vibes":
                            return (
                                <HorizontalSongList
                                    headerTitle="Summer Vibes"
                                    songs={queue}
                                />
                            );
                        case "Most Played":
                            return (
                                <HorizontalSongList
                                    headerTitle="Most Played"
                                    songs={queue}
                                />
                            );
                        default:
                            return null;
                    }
                }}
                keyExtractor={(item) => item.key}
            />
            <HomeAudioPlayer />
        </View>
    );
};

export default Home;
