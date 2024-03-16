import React from "react";

// navigaton import
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const stack = createStackNavigator();

// state store
import { Provider } from "react-redux";
import { store } from "./store";

// screens
import Home from "./screens/Home";
import Auth from "./screens/Auth";

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
                </stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
