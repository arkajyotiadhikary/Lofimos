import React, { FC, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { type AddTrack } from "react-native-track-player";

import styles from "../../styles/SearchScreen/SearchResult.style";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
interface SearchResultParams {
    data: AddTrack[];
}
// ! Temp data . Delete it later.
const _data: AddTrack[] = [
    {
        title: "Title 1",
        artist: "Artist 1",
        artwork:
            "https://i.scdn.co/image/ab67616d0000b2739a7d5a3f6f0a7b8f7d6a0b6c",
        url: "https://i.scdn.co/image/ab67616d0000b2739a7d5a3f6f0a7b8f7d6a0b6c",
        duration: 100,
    },
    {
        title: "Title 2",
        artist: "Artist 2",
        artwork:
            "https://i.scdn.co/image/ab67616d0000b2739a7d5a3f6f0a7b8f7d6a0b6c",
        url: "https://i.scdn.co/image/ab67616d0000b2739a7d5a3f6f0a7b8f7d6a0b6c",
        duration: 200,
    },
];
const SearchResult: FC<SearchResultParams> = ({ data }) => {
    return (
        <View style={styles.container}>
            {data.length > 0 ? (
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.listItem}>
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
                    <Text>No Results</Text>
                </View>
            )}
        </View>
    );
};

export default SearchResult;
