import React, { FC } from "react";
import { View, Text, Image } from "react-native";
import logo from "../../../assets/images/Logo.jpg";

import styles from "../../styles/HomeScreen/HomeHeader.style";

import getCurrentTime from "../../utils/getCurrentTime";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const HomeHeader: FC = () => {
    const { username } = useSelector(
        (state: RootState) => state.userDataReducer
    );
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.userProfilePic} source={logo} />
            </View>
            <View>
                <Text style={styles.greetings}>{getCurrentTime()}</Text>
                <Text style={styles.username}>{username}</Text>
            </View>
        </View>
    );
};

export default HomeHeader;
