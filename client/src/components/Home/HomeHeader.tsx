import React, { FC } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import logo from "../../../assets/images/Logo.jpg";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import styles from "../../styles/Home/Header";

const HomeHeader: FC = () => {
    return (
        <View style={styles.container}>
            {/* App Logo */}
            <View style={styles.headerLogo}>
                <Image style={styles.logo} source={logo} height={10} />
                <Text>LOFI</Text>
            </View>
            <View style={styles.rightSideHeader}>
                {/* Search Magnifine Logo */}
                <View>
                    <TouchableOpacity>
                        <Entypo
                            name="magnifying-glass"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                {/* User profile */}
                <View>
                    <TouchableOpacity>
                        <AntDesign
                            style={styles.userProfile}
                            name="user"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default HomeHeader;
