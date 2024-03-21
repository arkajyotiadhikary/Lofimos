import React, { FC, useState, type Dispatch, type SetStateAction } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/SearchScreen/Header.style";
import { loadCachedResult, saveCachedResult } from "../../utils/cachedResults";
import { getSongsByName } from "../../services/songService";
import { type AddTrack } from "react-native-track-player";

interface HeaderParams {
    searchResult: AddTrack[];
    setSearchResult: Dispatch<SetStateAction<AddTrack[]>>;
    setQuearySong: Dispatch<SetStateAction<string>>;
}

const Header: FC<HeaderParams> = ({
    searchResult,
    setSearchResult,
    setQuearySong,
}) => {
    const navigation = useNavigation();
    const [_querySong, _setQuerySong] = useState<string>("");
    // handle search
    const handleSearch = async (): Promise<void> => {
        try {
            const response = await getSongsByName(_querySong);
            const updatedResults = [...searchResult, ...(response || [])];
            setSearchResult(updatedResults);
            saveCachedResult("searchResult", updatedResults);
        } catch (error) {
            // Handle error if needed
            console.error("Error occurred during search:", error);
        }
    };
    const handleChange = (value: string): void => {
        setQuearySong(value);
        _setQuerySong(value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="black"
                        style={styles.backButtonIcon}
                    />
                </TouchableOpacity>
                <TextInput
                    placeholder="What would you like to listen?"
                    style={styles.searchInput}
                    onChangeText={handleChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearch}
                >
                    <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;
