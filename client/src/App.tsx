import React from "react";

// navigaton import
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const stack = createStackNavigator<RootStackNavigationProp>();

// state store
import { Provider } from "react-redux";
import { store } from "./store";

// screens
import Home from "./screens/Home.screen";
import Auth from "./screens/Auth.screen";
import PlayerScreen from "./screens/Player.screen";
import Search from "./screens/Search.screen";
import { RootStackNavigationProp } from "../types";

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <stack.Screen name="Home" component={Home} />
                    <stack.Screen name="Auth" component={Auth} />
                    <stack.Screen
                        name="PlayerScreen"
                        component={PlayerScreen}
                    />
                    <stack.Screen name="Search" component={Search} />
                </stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
