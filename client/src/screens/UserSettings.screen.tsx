// Here user will be able to edit and log out from the page
// basically the setting page
import { View, Text, TouchableOpacity } from "react-native";

import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCurrentUserAuth } from "../features/user/userSlice";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../types";

const UserSettings = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<RootStackNavigationProp>();
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
        <View>
            <Text>Settings</Text>
            <TouchableOpacity onPress={handleLogOut}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserSettings;
