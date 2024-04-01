import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import Home from "../screens/Home.screen";
import Auth from "../screens/Auth.screen";

const Stack = createStackNavigator<RootStackParamList>();

export const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
};

export const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
    );
};
