import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack, AuthStack } from "../stacks/mAuth.stack";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setCurrentUserAuth } from "../features/user/userSlice";
import { validateToken } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Router = () => {
    const userState = useSelector((state: RootState) => state.userAuthReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            dispatch(
                setCurrentUserAuth({
                    isAuthenticated: await validateToken(
                        (await AsyncStorage.getItem("token")) || ""
                    ),
                })
            );
        })();
    }, []);

    return (
        <NavigationContainer>
            {userState.isAuthenticated ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Router;
