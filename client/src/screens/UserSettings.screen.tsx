// Here user will be able to edit and log out from the page
// basically the setting page
import { View, Text, TouchableOpacity, Image } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCurrentUserAuth } from "../features/user/userSlice";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../types";
import { RootState } from "../store";

import styles from "../styles/UserSettings.style";
import { Ionicons } from "@expo/vector-icons";

// modals
import ChangePassword from "../components/UserSettingsScreen/ChangePassword.modal";
import { useState } from "react";

const UserSettings = () => {
    const dispatch = useDispatch();
    const { username, profilePic } = useSelector(
        (state: RootState) => state.userDataReducer
    );
    const navigation = useNavigation<RootStackNavigationProp>();

    // state to open and close modals
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogOut = () => {
        (async () => {
            // delete access token from cache
            await AsyncStorage.removeItem("token");
            // and set userAuth in redux store to false
            dispatch(
                setCurrentUserAuth({
                    isAuthenticated: false,
                })
            );
            // redirect to login page
            navigation.navigate("Auth");
        })();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                        name="chevron-back-outline"
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>
            {/* Profile picture */}
            <View style={styles.userDeails}>
                <Image
                    style={styles.userProfilePic}
                    source={{ uri: profilePic }}
                />
                <Text style={styles.username}>{username}</Text>
            </View>

            {/* View/Edit Profile */}
            <View style={styles.listContainer}>
                <Text style={styles.listTitle}>Account Management</Text>
                <TouchableOpacity style={styles.listBtn}>
                    <Text>Change Username</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.listBtn}
                    onPress={() => setModalVisible(true)}
                >
                    <Text>Change Password</Text>
                    <ChangePassword
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.listBtn}>
                    <Text>Delete Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listBtn}>
                    <Text>Email</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                <Text style={styles.listTitle}>Subscription</Text>
            </View>
            <View style={styles.listContainer}>
                <Text style={styles.listTitle}>Security</Text>
                <TouchableOpacity style={styles.listBtn}>
                    <Text>Two Factor Authentication</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listBtn}>
                    <Text>Session Management</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                <Text style={styles.listTitle}>Help</Text>
                <TouchableOpacity style={styles.listBtn}>
                    <Text>Support</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                <Text style={styles.listTitle}>About</Text>
                <TouchableOpacity style={styles.listBtn}>
                    <Text>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listBtn}>
                    <Text>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listBtn}>
                    <Text>Terms of Service</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listBtn}>
                    <Text>Privacy Policy</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogOut}>
                <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserSettings;
