import React from "react";
import { View, Image } from "react-native";

import styles from "../../styles/PlayerScreen/CoverArt";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

const CoverArt = () => {
    const { artwork } = useSelector(
        (state: RootState) => state.currentPlayingReducer
    );

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={artwork} />
        </View>
    );
};

export default CoverArt;
