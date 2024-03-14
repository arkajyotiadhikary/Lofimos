import React, { FC } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

// test image for now for song player
import img from "../../../assets/images/Logo.jpg";

import styles from "../../styles/Home/HomeAudioPlayer";

const HomeAudioPlayer: FC = () => {
    return (
        <View style={styles.container}>
            {/* music cover art */}
            <View>
                {/*
                    in future the song will be at the state from there we
                    will be able to get the image
                */}
                <Image source={img} style={styles.musicArt} />
            </View>
            <View>
                {/* song name */}
                <Text>Test Music Name</Text>
                {/* artist */}
                <Text>Test Artist Name</Text>
                {/* play pause btn */}
            </View>
            <View style={styles.playBtnHolder}>
                <TouchableOpacity style={styles.playBtn}>
                    <Entypo name="controller-play" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeAudioPlayer;
