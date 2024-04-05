import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack, AuthStack } from "../stacks/mAuth.stack";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
    setCurrentUserAuth,
    setCurrentUserData,
    setLikedSongs,
} from "../features/user/userSlice";
import { validateToken } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import chalk from "chalk";
import { loadCachedResult } from "../utils/cachedResults";
import { getLikedSongs } from "../services/userService";

const Router = () => {
    const userState = useSelector((state: RootState) => state.userAuthReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            console.log(
                chalk.green("Verifying token and setting up redux store")
            );

            // Validate user token stored in cache
            const isAuthenticated = await validateToken(
                (await AsyncStorage.getItem("token")) || ""
            );

            // If authenticated, set auth to isAuthenticated
            if (isAuthenticated) {
                dispatch(setCurrentUserAuth({ isAuthenticated }));

                // Check if the user data is available in cache; if not, set auth to false
                const userData = await loadCachedResult("userData");
                if (!userData) {
                    dispatch(setCurrentUserAuth({ isAuthenticated: false }));
                } else {
                    dispatch(setCurrentUserData(userData));

                    // If authenticated, get user's liked songs and set them up in the Redux store
                    const songs = await getLikedSongs(userData?.userID!);
                    const songIDArray = songs?.map((song) => song.SongID);
                    console.log("songs id array", songIDArray);
                    dispatch(setLikedSongs(songIDArray || []));
                }
            }
        })();
    }, []);

    return (
        <NavigationContainer>
            {userState.isAuthenticated ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Router;
