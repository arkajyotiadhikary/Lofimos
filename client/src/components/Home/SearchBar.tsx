import React, { FC } from "react";
import { View, TextInput } from "react-native";

import { Entypo } from "@expo/vector-icons";

// styles
import styles from "../../styles/Home/SearchBar";

const SearchBar: FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.inputHolder}>
                <Entypo name="magnifying-glass" size={24} color="black" />
                <TextInput
                    style={styles.input}
                    placeholder="What would you like to listen?"
                />
            </View>
        </View>
    );
};

export default SearchBar;
