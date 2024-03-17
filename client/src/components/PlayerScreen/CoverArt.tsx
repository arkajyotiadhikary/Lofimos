import React from "react";
import { View, Image } from "react-native";

import logo from "../../../assets/images/Logo.jpg";

import styles from "../../styles/PlayerScreen/CoverArt";

const CoverArt = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={logo} />
        </View>
    );
};

export default CoverArt;
