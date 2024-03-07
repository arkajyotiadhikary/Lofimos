import React from "react";
import { View, Image } from "react-native";

import styles from "../../styles/SongThumbnail";

const SongThumbnail = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../../assets/adaptive-icon.png")}
                style={styles.img}
            />
        </View>
    );
};

export default SongThumbnail;
