import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Foundation } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { RootStackNavigationProp } from "../../../types";
import styles from "../../styles/PlayerScreen/Header.style";

const Header: FC = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const { artist } = useSelector(
        (state: RootState) => state.currentPlayingReducer
    );

    const handleNavigateHome = () => {
        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigateHome}>
                <AntDesign name="down" size={24} color="black" />
            </TouchableOpacity>
            <Text>{artist}</Text>
            <TouchableOpacity>
                <Foundation name="info" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
