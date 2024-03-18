import React, { FC } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import logo from "../../../assets/images/Logo.jpg";

import styles from "../../styles/HomeScreen/HomeHeader";

// TODO setup user state manager

const HomeHeader: FC = () => {
    return (
        <View style={styles.container}>
            {/* profile pic */}
            <View>
                <Image style={styles.userProfilePic} source={logo} />
            </View>
            <View>
                {/* good mornign or ... according to time */}
                <Text style={styles.greetings}>Good Morning</Text>
                {/* user name */}
                <Text style={styles.username}>Test Arka</Text>
            </View>
        </View>
    );
};

export default HomeHeader;
