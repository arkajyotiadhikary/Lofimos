import React, { FC, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import logo from "../../../assets/images/Logo.jpg";

import styles from "../../styles/HomeScreen/HomeHeader.style";

import getCurrentTime from "../../utils/getCurrentTime";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../../types";

const HomeHeader: FC = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const { username } = useSelector(
        (state: RootState) => state.userDataReducer
    );

    const [headerName, setHeaderName] = useState(username);

    useEffect(() => {
        setHeaderName(username);
    }, [username]);

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("UserSettings")}
            style={styles.container}
        >
            <View>
                <Image style={styles.userProfilePic} source={logo} />
            </View>
            <View>
                <Text style={styles.greetings}>{getCurrentTime()}</Text>
                <Text style={styles.username}>{headerName}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default HomeHeader;
