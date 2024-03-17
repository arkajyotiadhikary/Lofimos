import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

import styles from "../../styles/PlayerScreen/Header";

const Header: FC = () => {
    return (
        <View style={styles.container}>
            {/* down arrow */}
            <TouchableOpacity>
                <AntDesign name="down" size={24} color="black" />
            </TouchableOpacity>
            {/* artist name */}
            <View>
                <Text>Artist Name</Text>
            </View>
            <View>
                <Foundation name="info" size={24} color="black" />
            </View>
        </View>
    );
};

export default Header;
