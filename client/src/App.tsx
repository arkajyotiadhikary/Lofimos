import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Router from "./routes/Router";
import { View } from "react-native";
export default function App() {
    return (
        <View style={{ flex: 1 }}>
            <Provider store={store}>
                <Router />
            </Provider>
        </View>
    );
}
