import React from "react";

// navigaton import
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const stack = createStackNavigator();

// screens
import Home from "./screens/Home";
import Auth from "./screens/Auth";

export default function App() {
    return (
        <NavigationContainer>
            <stack.Navigator
                initialRouteName="Auth"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <stack.Screen name="Home" component={Home} />
                <stack.Screen name="Auth" component={Auth} />
            </stack.Navigator>
        </NavigationContainer>
    );
}
