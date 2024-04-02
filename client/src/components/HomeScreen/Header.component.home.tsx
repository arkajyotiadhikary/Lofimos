import React, { FC } from "react";
import { View, Text, Image } from "react-native";
import logo from "../../../assets/images/Logo.jpg";

import styles from "../../styles/HomeScreen/HomeHeader.style";

// TODO setup user state manager

import getCurrentTime from "../../utils/getCurrentTime";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const HomeHeader: FC = () => {
    const user = useSelector((state: RootState) => state.userDataReducer);
    console.log(user);
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.userProfilePic} source={logo} />
            </View>
            <View>
                <Text style={styles.greetings}>{getCurrentTime()}</Text>
                <Text style={styles.username}>{user?.username}</Text>
            </View>
        </View>
    );
};

export default HomeHeader;
