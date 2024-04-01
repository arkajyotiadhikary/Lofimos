import { NavigationContainer } from "@react-navigation/native";
import { AppStack, AuthStack } from "../stacks/mAuth.stack";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Router = () => {
    const userState = useSelector((state: RootState) => state.userReducer);
    return (
        <NavigationContainer>
            {userState.isAuthenticated ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Router;
