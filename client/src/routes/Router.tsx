import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack, AuthStack } from "../stacks/mAuth.stack";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
    setCurrentUserAuth,
    setCurrentUserData,
} from "../features/user/userSlice";
import { validateToken } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import chalk from "chalk";
import { loadCachedResult } from "../utils/cachedResults";

const Router = () => {
    const userState = useSelector((state: RootState) => state.userAuthReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            console.log(
                chalk.green("Verifiying token and setting up redux store")
            );
            const isAuthenticated = await validateToken(
                (await AsyncStorage.getItem("token")) || ""
            );
            if (isAuthenticated) {
                dispatch(
                    setCurrentUserAuth({
                        isAuthenticated,
                    })
                );
                // Getting data from cache
                const userData = await loadCachedResult("userData");
                if (!userData) {
                    dispatch(
                        setCurrentUserAuth({
                            isAuthenticated: false,
                        })
                    );
                }
                dispatch(setCurrentUserData(userData));
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
