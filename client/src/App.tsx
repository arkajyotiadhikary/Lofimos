import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./store";
import Router from "./routes/router";

export default function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}
