import React, { FC, useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ImageSourcePropType,
} from "react-native";
import { type AddTrack } from "react-native-track-player";
import { useNavigation } from "@react-navigation/native";

import styles from "../../styles/SearchScreen/SearchResult.style";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { RootStackNavigationProp } from "../../../types";

import { setCurrentPlayingSong } from "../../features/song/songSlice";
import { useDispatch } from "react-redux";

interface SearchResultParams {
    data: AddTrack[];
}

const SearchResult: FC<SearchResultParams> = ({ data }) => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const dispatch = useDispatch();

    // Open up the song in the audio player
    const handleClick = (item: AddTrack) => {
        console.log("Open up song in the audio player");
        // set current playing songs
        dispatch(
            setCurrentPlayingSong({
                songID: item.id,
                title: item.title!,
                artist: item.artist!,
                artwork: { uri: item.artwork! },
                audioIndex: 0,
            })
        );
        navigation.navigate("Player");
    };

    return (
        <View style={styles.container}>
            {data.length > 0 ? (
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.listItem}
                            onPress={() => handleClick(item)}
                        >
                            <View style={styles.listItemContent}>
                                <AntDesign
                                    name="search1"
                                    size={18}
                                    color="black"
                                />
                                <Text style={styles.listItemText}>
                                    {item.title}{" "}
                                </Text>
                            </View>
                            <Feather
                                name="arrow-up-left"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    )}
                    style={styles.list}
                />
            ) : (
                <View>
                    <Text style={styles.noResults}>No Results</Text>
                </View>
            )}
        </View>
    );
};

export default SearchResult;
