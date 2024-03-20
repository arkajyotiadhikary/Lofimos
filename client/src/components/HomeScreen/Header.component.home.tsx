import React, { FC } from "react";
import { View, Text, Image } from "react-native";
import logo from "../../../assets/images/Logo.jpg";

import styles from "../../styles/HomeScreen/HomeHeader.style";

// TODO setup user state manager

import getCurrentTime from "../../utils/getCurrentTime";

const HomeHeader: FC = () => {
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.userProfilePic} source={logo} />
            </View>
            <View>
                <Text style={styles.greetings}>{getCurrentTime()}</Text>
                <Text style={styles.username}>Test Arka</Text>
            </View>
        </View>
    );
};

export default HomeHeader;
