/**
 * The root component of the app, responsible for setting up the user's
 * authentication state in Redux store and rendering the appropriate stack
 * based on that state. The app will start by validating the token stored in
 * AsyncStorage and setting up the Redux store accordingly. If the token is
 * valid, the user will be redirected to the `AppStack`, which is the main
 * stack of the app. If the token is invalid or unavailable, the user will
 * be redirected to the `AuthStack`, which is the stack for logging in and
 * signing up.
 */

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
    const userData = useSelector((state: RootState) => state.userDataReducer);
    const userLikedSongs = useSelector(
        (state: RootState) => state.likedSongsReducer
    );

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

                // if user data in redux store is empty thn only look for it in cache
                if (!userData.userID) {
                    console.log(
                        "No user data in redux store. Looking for it in cache"
                    );
                    // look it in cache
                    const userData = await loadCachedResult("userData");
                    // if user data is not there also set auth to false
                    if (!userData) {
                        console.log(
                            "No user data in cache setting auth to false"
                        );
                        dispatch(
                            setCurrentUserAuth({ isAuthenticated: false })
                        );
                    }
                    // or else set the user the from the cache
                    else {
                        console.log(
                            "User data in cache, setting it in redux store"
                        );
                        dispatch(setCurrentUserData(userData));

                        // If authenticated, get user's liked songs and set them up in the Redux store
                    }
                }

                // if user liked songs in redux store is empty thn only look for it in cache
                if (!userLikedSongs) {
                    console.log(
                        "No liked songs in redux store. Requesting from the server"
                    );
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
