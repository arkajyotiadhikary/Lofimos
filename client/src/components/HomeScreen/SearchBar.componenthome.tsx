import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Entypo } from "@expo/vector-icons";

// styles
import styles from "../../styles/HomeScreen/SearchBar.style";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../../types";

const SearchBar: FC = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.inputHolder}
                onPress={() => {
                    navigation.navigate("Search");
                }}
            >
                <Entypo name="magnifying-glass" size={24} color="black" />
                <Text style={styles.text}>What would you like to listen?</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SearchBar;
