import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "../../styles/AudioPlayer";

interface ButtonGroupProps {
    play: () => void;
}

const ButtonGroup: FC<ButtonGroupProps> = ({ play }) => {
    return (
        <View style={styles.btnGrp}>
            <View style={styles.btn}>
                <TouchableOpacity style={styles.btnLogo}>
                    <Foundation name="previous" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity style={styles.btnLogo}>
                    <MaterialCommunityIcons
                        name="rewind-10"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity style={styles.btnLogo} onPress={play}>
                    <Foundation name="play" color="white" size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity style={styles.btnLogo}>
                    <MaterialCommunityIcons
                        name="fast-forward-10"
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity style={styles.btnLogo}>
                    <Foundation name="next" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ButtonGroup;
