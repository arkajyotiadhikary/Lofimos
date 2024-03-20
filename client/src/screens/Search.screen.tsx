import React, { FC, useState, useEffect } from "react";
import { View } from "react-native";
import { loadCachedResult } from "../utils/cachedResults";

// components
import Header from "../components/SearchScreen/Header.component";
import SearchResult from "../components/SearchScreen/SearchResult.component";
import { AddTrack } from "react-native-track-player";

import styles from "../styles/SearchScreen/SearchScreen.style";

const Search: FC = () => {
    const [searchResult, setSearchResult] = useState<AddTrack[]>([]);

    useEffect(() => {
        loadCachedResult("searchResult", setSearchResult);
    });

    return (
        <View style={styles.container}>
            <Header setSearchResult={setSearchResult} />
            <SearchResult data={searchResult} />
        </View>
    );
};

export default Search;
