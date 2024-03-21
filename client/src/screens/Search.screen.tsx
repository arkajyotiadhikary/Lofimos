import React, { FC, useState, useEffect } from "react";
import { View } from "react-native";
import { loadCachedResult } from "../utils/cachedResults";

// components
import Header from "../components/SearchScreen/Header.component";
import SearchResult from "../components/SearchScreen/SearchResult.component";
import { AddTrack } from "react-native-track-player";

import styles from "../styles/SearchScreen/SearchScreen.style";

const Search: FC = () => {
    // Store search results so that the user can access them later
    const [searchResult, setSearchResult] = useState<AddTrack[]>([]);
    const [list, setList] = useState<AddTrack[]>([]);
    const [querySong, setQuerySong] = useState<string>("");

    let cachedResults: AddTrack[] = [];

    useEffect(() => {
        (async () => {
            cachedResults = await loadCachedResult("searchResult");
            setSearchResult(cachedResults || []);
        })();
    }, []);

    useEffect(() => {
        if (querySong.trim() !== "") {
            const filteredResults = searchResult.filter((track) =>
                track.title?.toLowerCase().includes(querySong.toLowerCase())
            );
            setList(filteredResults);
        } else {
            setList([]);
        }
    }, [querySong, searchResult]);

    return (
        <View style={styles.container}>
            <Header
                searchResult={searchResult}
                setSearchResult={setSearchResult}
                setQuearySong={setQuerySong}
            />
            <SearchResult data={list} />
        </View>
    );
};

export default Search;
