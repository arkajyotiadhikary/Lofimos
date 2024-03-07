import React from "react";

// navigaton import
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const stack = createStackNavigator();

// screens
import Home from "./screens/Home";

export default function App() {
    return (
        <NavigationContainer>
            <stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: "black",
                    },
                }}
            >
                <stack.Screen name="Home" component={Home} />
            </stack.Navigator>
        </NavigationContainer>
    );
}
