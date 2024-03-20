import React, { FC, useState, type Dispatch, type SetStateAction } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/SearchScreen/Header.style";
import { loadCachedResult, saveCachedResult } from "../../utils/cachedResults";
import { getSongsByName } from "../../services/songService";
import { type AddTrack } from "react-native-track-player";

interface HeaderParams {
    setSearchResult: Dispatch<SetStateAction<AddTrack[]>>;
}

const Header: FC<HeaderParams> = ({ setSearchResult }) => {
    const navigation = useNavigation();

    const [quearySong, setQuearySong] = useState("");

    // handle search
    const handleSearch = async (): Promise<void> => {
        try {
            const searchResults = await getSongsByName(quearySong);
            setSearchResult(searchResults || []);
        } catch (error) {}
    };

    const handleChange = (value: string): void => {
        setQuearySong(value);
        loadCachedResult("searchResult", setSearchResult);
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
